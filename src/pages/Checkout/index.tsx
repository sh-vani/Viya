import { useState, useEffect } from "react";
import { Minus, Plus, Check, ArrowLeft, ShieldCheck, Sparkles, MapPin, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/hooks/useCart";
import { checkoutApi, orderApi, paymentApi, profileApi } from "@/lib/api";
import { loadRazorpayScript } from "@/lib/razorpay";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, updateQuantity, totalPrice } = useCart();
    const [showDiscountInput, setShowDiscountInput] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [customerDetails, setCustomerDetails] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phone: ""
    });
    const [shippingAddress, setShippingAddress] = useState({
        address: "",
        city: "",
        postalCode: "",
        state: "",
        country: "India"
    });
    const [shippingOption] = useState("standard");
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [paymentGateways, setPaymentGateways] = useState<any[]>([]);
    const [fetchingGateways, setFetchingGateways] = useState(false);

    const [checkoutData, setCheckoutData] = useState<any>(null);
    const [fetchingCheckout, setFetchingCheckout] = useState(false);
    const [placedOrderData, setPlacedOrderData] = useState<any>(null);
    const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

    // Address Management State
    const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
    const [fetchingAddresses, setFetchingAddresses] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

    const fetchAddresses = async () => {
        setFetchingAddresses(true);
        try {
            const response = await profileApi.getAddressList();
            const addresses = response.data?.addresses || [];
            setSavedAddresses(addresses);
            if (addresses.length > 0) {
                const defaultAddress = addresses.find((a: any) => a.is_default_shipping) || addresses[0];
                setSelectedAddressId(defaultAddress.id);
                // Pre-fill form for robustness, although we'll use ID
                setShippingAddress({
                    address: defaultAddress.address,
                    city: defaultAddress.city,
                    state: defaultAddress.state,
                    postalCode: defaultAddress.postal_code,
                    country: defaultAddress.country || "India"
                });
                // Autofill customer details from default address
                setCustomerDetails({
                    firstName: defaultAddress.name?.split(" ")[0] || "",
                    lastName: defaultAddress.name?.split(" ").slice(1).join(" ") || "",
                    email: defaultAddress.email || "",
                    phone: defaultAddress.phone || ""
                });
            } else {
                setIsAddingNewAddress(true);
            }
        } catch (error) {
            console.error("Failed to fetch addresses", error);
            setIsAddingNewAddress(true);
        } finally {
            setFetchingAddresses(false);
        }
    };
    const [billingAddress, setBillingAddress] = useState({
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India"
    });


    const fetchCheckoutData = async () => {
        setFetchingCheckout(true);
        try {
            const response = await checkoutApi.getCheckout();
            setCheckoutData(response.data);
        } catch (error) {
            console.error("Failed to fetch checkout calculation", error);
        } finally {
            setFetchingCheckout(false);
        }
    };

    const fetchGateways = async () => {
        setFetchingGateways(true);
        try {
            const response = await paymentApi.getPaymentGateways();
            if (response.data?.gateways) {
                setPaymentGateways(response.data.gateways);
            }
        } catch (error) {
            console.error("Failed to fetch gateways", error);
        } finally {
            setFetchingGateways(false);
        }
    };

    useEffect(() => {
        // Redirect if not authenticated
        const token = localStorage.getItem("auth_token");
        if (!token) {
            navigate("/account?redirect=/checkout");
            return;
        }

        // Pre-fill user details from localStorage for new user flow
        const savedName = localStorage.getItem("user_name");
        const savedEmail = localStorage.getItem("user_email");
        const savedPhone = localStorage.getItem("user_phone");

        if (savedName || savedEmail || savedPhone) {
            const nameParts = savedName ? savedName.split(" ") : ["", ""];
            setCustomerDetails(prev => ({
                ...prev,
                firstName: nameParts[0] || prev.firstName,
                lastName: nameParts.slice(1).join(" ") || prev.lastName,
                email: savedEmail || prev.email,
                phone: savedPhone || prev.phone
            }));
        }

        fetchCheckoutData();
        fetchGateways();
        fetchAddresses();
    }, []);

    const handleApplyCoupon = async () => {
        if (!discountCode) return;
        try {
            await checkoutApi.applyCoupon({
                coupon_code: discountCode,
                shopping_amount: subtotal
            });
            toast.success("Coupon Applied!");
            fetchCheckoutData();
        } catch (error) {
            toast.error("Failed to apply coupon");
        }
    };

    const getShippingCost = () => {
        if (subtotal >= 999) return 0;
        switch (shippingOption) {
            case "express": return 99;
            default: return 49;
        }
    };

    const subtotal = checkoutData?.total_shopping_amount || totalPrice;
    const shipping = checkoutData?.total_shipping_cost !== undefined ? checkoutData.total_shipping_cost : getShippingCost();
    const tax = checkoutData?.total_tax || 0;
    const discount = checkoutData?.total_discount || 0;
    const total = checkoutData?.total_amount || (subtotal + shipping + tax - discount);

    const handlePlaceOrder = async () => {
        if (!customerDetails.email || !customerDetails.firstName || !shippingAddress.address) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsProcessing(true);
        try {
            // Check if user is authenticated
            const token = localStorage.getItem("auth_token");
            if (!token) {
                toast.error("Please login to place an order.");
                setIsProcessing(false);
                return;
            }

            // Check for price updates before finalizing
            await checkoutApi.checkPriceUpdate({
                shopping_amount: subtotal,
                shipping_cost: shipping,
                tax: tax,
                total_amount: total
            });

            // Handle Address Storage first for new addresses (Strict Sequence)
            let finalAddressId = selectedAddressId;
            if (isAddingNewAddress || !selectedAddressId) {
                console.log("📍 Saving new address before order placement...");
                try {
                    const addressRes = await profileApi.storeAddress({
                        name: `${customerDetails.firstName} ${customerDetails.lastName}`,
                        email: customerDetails.email,
                        address: shippingAddress.address,
                        phone: customerDetails.phone,
                        city: shippingAddress.city,
                        state: shippingAddress.state,
                        country: shippingAddress.country,
                        postal_code: shippingAddress.postalCode
                    });

                    // Extract ID - handle different nested response structures
                    finalAddressId = addressRes.data?.address?.id || addressRes.data?.id;

                    if (!finalAddressId) {
                        throw new Error("Address stored but ID not received");
                    }
                    console.log("✅ New Address Saved. ID:", finalAddressId);
                } catch (error) {
                    console.error("❌ Failed to save address", error);
                    toast.error("Could not save address. Order placement halted.");
                    setIsProcessing(false);
                    return;
                }
            }

            // Prepare enriched order payload with the confirmed address ID
            const orderPayload = {
                customer_email: customerDetails.email || "",
                customer_phone: customerDetails.phone || "",
                payment_method: String(paymentMethod === 'cod' ? "1" : (paymentGateways.find(g => g.method === paymentMethod)?.id || "1")),
                customer_shipping_address: finalAddressId,
                customer_billing_address: finalAddressId,
                shipping_address: shippingAddress.address,
                shipping_city: shippingAddress.city,
                shipping_state: shippingAddress.state,
                shipping_postcode: shippingAddress.postalCode,
                shipping_country: shippingAddress.country,
                billing_address: billingSameAsShipping ? shippingAddress.address : billingAddress.address,
                billing_city: billingSameAsShipping ? shippingAddress.city : billingAddress.city,
                billing_state: billingSameAsShipping ? shippingAddress.state : billingAddress.state,
                billing_postcode: billingSameAsShipping ? shippingAddress.postalCode : billingAddress.postalCode,
                billing_country: billingSameAsShipping ? shippingAddress.country : billingAddress.country,
                grand_total: Number(total),
                sub_total: Number(subtotal),
                discount_total: Number(discount),
                shipping_total: Number(shipping),
                number_of_package: 1,
                number_of_item: Number(cartItems.length),
                payment_id: "PAY-ID-123", // Placeholder for initial order
                tax_total: Number(tax),
                shipping_cost: [Number(shipping)],
                delivery_date: ["2024-03-24"],
                shipping_method: [1],
                packagewiseTax: [0]
            };

            console.log("🚀 Placing Order with ID:", finalAddressId);
            const response = await orderApi.placeOrder(orderPayload);
            console.log("📥 Order Placed Successfully:", response.data);

            const orderData = response.data?.order || response.data;
            setPlacedOrderData(orderData);

            if (paymentMethod.toLowerCase().includes('razorpay') || paymentMethod === 'razorpay') {
                const res = await loadRazorpayScript();
                if (!res) {
                    toast.error("Razorpay SDK failed to load.");
                    return;
                }

                const options: any = {
                    key: orderData.razorpay_key || import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_Wt9uDBVijEMhhU",
                    amount: Math.round(total * 100), // Ensure integer
                    currency: "INR",
                    name: "Viya Collective",
                    description: `Payment for Order #${orderData.order_number || 'New'}`,
                    image: "/logo.png",
                    handler: async function (response: any) {
                        console.log("💳 Razorpay Payment Received. Response Object:", JSON.stringify(response, null, 2));
                        try {
                            const capturePayload = {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                order_id: orderData.id // Ensure internal order ID is sent
                            };

                            console.log("🛫 Sending Capture Payload:", JSON.stringify(capturePayload, null, 2));

                            const captureRes = await paymentApi.captureRazorpayPayment(capturePayload);
                            console.log("✅ Payment Capture Success Response:", captureRes.data);

                            toast.success("Payment Verified Successfully!");
                            setOrderComplete(true);
                        } catch (err: any) {
                            console.error("❌ Payment verification failed.");
                            console.error("❌ Error Status:", err.response?.status);
                            console.error("❌ Error Data:", JSON.stringify(err.response?.data, null, 2));
                            toast.error(err.response?.data?.message || "Payment Capture Failed. Please contact support.");
                        }
                    },
                    prefill: {
                        name: `${customerDetails.firstName} ${customerDetails.lastName}`,
                        email: customerDetails.email,
                        contact: customerDetails.phone
                    },
                    theme: { color: "#E5B876" }
                };

                if (orderData.razorpay_order_id) {
                    options.order_id = orderData.razorpay_order_id;
                }

                const rzp = new (window as any).Razorpay(options);
                rzp.open();
            } else {
                setOrderComplete(true);
                toast.success("Order Placed Successfully!");
            }
        } catch (error: any) {
            console.error("❌ Order placement error:", error);
            const errorMessage = error.response?.data?.message || "There was an issue with your order.";
            toast.error(errorMessage);
            fetchCheckoutData();
        } finally {
            setIsProcessing(false);
        }
    };



    if (orderComplete) {
        return (
            <div className="min-h-screen bg-[#FBF9F6] dark:bg-black">
                <ViyaHeader />
                <main className="pt-32 pb-24 px-4">
                    <div className="container mx-auto max-w-2xl text-center space-y-8 animate-in zoom-in duration-700">
                        <div className="relative">
                            <div className="w-32 h-32 bg-[#E5B876]/10 rounded-full flex items-center justify-center mx-auto relative z-10">
                                <Check className="h-16 w-16 text-[#E5B876]" />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#E5B876]/5 rounded-full blur-3xl"></div>
                        </div>

                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1612]/5 rounded-full">
                                <Sparkles className="h-3 w-3 text-[#E5B876]" />
                                <span className="text-[9px] uppercase tracking-[0.4em] text-[#1A1612] dark:text-white font-bold">Transaction Complete</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-medium text-[#1A1612] dark:text-white">
                                Order <span className="italic text-[#E5B876] font-serif">Confirmed.</span>
                            </h1>
                            <p className="text-[#8C8276] dark:text-gray-400 font-light max-w-md mx-auto leading-relaxed">
                                Thank you for choosing Viya. Your journey with this exquisite piece begins now. A confirmation email has been sent to your sanctuary.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-black rounded-[2.5rem] p-10 border border-[#F0EBE3] dark:border-gray-800 shadow-sm max-w-md mx-auto text-left space-y-4">
                            <div className="flex justify-between items-center text-sm border-b border-[#F0EBE3] dark:border-gray-800 pb-4">
                                <span className="text-[#A69D91] font-medium uppercase tracking-widest text-[10px]">Order Number</span>
                                <span className="text-[#1A1612] dark:text-white font-bold">#{placedOrderData?.order_number || `VIYA-${(Math.random() * 100000).toFixed(0)}`}</span>

                            </div>
                            <div className="flex justify-between items-center text-sm pt-2">
                                <span className="text-[#A69D91] font-medium uppercase tracking-widest text-[10px]">Total Amount</span>
                                <span className="text-[#1A1612] dark:text-white font-bold text-xl">₹{total.toLocaleString()}</span>
                            </div>
                        </div>

                        <Link to="/new-arrivals" className="inline-block mt-8">
                            <Button className="h-16 px-12 bg-[#1A1612] text-white rounded-2xl flex items-center gap-4 font-bold text-[11px] uppercase tracking-[0.3em] hover:bg-black transition-all shadow-2xl">
                                Continue Discovering <ArrowRight size={14} />
                            </Button>
                        </Link>
                    </div>
                </main>
                <ViyaFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FBF9F6] dark:bg-black">
            <ViyaHeader />

            <main className="pt-24 md:pt-32 pb-24">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="flex items-center gap-2 mb-12 animate-in slide-in-from-left-4 duration-1000">
                        <Link to="/cart" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#8C8276] dark:text-gray-400 hover:text-[#1A1612] dark:hover:text-white transition-colors group">
                            <ArrowLeft className="h-3.5 w-3.5 mr-2 transition-transform group-hover:-translate-x-1" />
                            Return to Selection
                        </Link>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-medium text-[#1A1612] dark:text-white mb-16 px-2">
                        Complete your <span className="italic text-[#E5B876] font-serif">Journey</span>
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
                        {/* Forms Area */}
                        <div className="lg:col-span-7 space-y-12 animate-in slide-in-from-bottom-8 duration-1000">
                            {/* Customer Details */}
                            <section className="bg-white dark:bg-black rounded-[2.5rem] p-8 md:p-12 border border-[#F0EBE3] dark:border-gray-800 shadow-sm space-y-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5B876]/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-1000"></div>

                                <div className="flex items-center gap-4 border-b border-[#F0EBE3] dark:border-gray-800 pb-8">
                                    <div className="w-12 h-12 bg-[#1A1612] rounded-full flex items-center justify-center text-white shrink-0">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <h2 className="text-2xl font-display font-medium text-[#1A1612] dark:text-white">Secure Identity</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                    <div className="space-y-3">
                                        <Label htmlFor="firstName" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91] dark:text-gray-400 ml-2">First Name</Label>
                                        <Input
                                            id="firstName"
                                            value={customerDetails.firstName}
                                            onChange={(e) => setCustomerDetails({ ...customerDetails, firstName: e.target.value })}
                                            className="h-14 rounded-2xl border-[#F0EBE3] dark:border-gray-800 focus:border-[#E5B876] focus:ring-[#E5B876]/10 px-6 transition-all"
                                            placeholder="Aria"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="lastName" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91] dark:text-gray-400 ml-2">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            value={customerDetails.lastName}
                                            onChange={(e) => setCustomerDetails({ ...customerDetails, lastName: e.target.value })}
                                            className="h-14 rounded-2xl border-[#F0EBE3] dark:border-gray-800 focus:border-[#E5B876] focus:ring-[#E5B876]/10 px-6 transition-all"
                                            placeholder="Sharma"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-3">
                                        <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91] dark:text-gray-400 ml-2">Email Sanctuary</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={customerDetails.email}
                                            onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                                            className="h-14 rounded-2xl border-[#F0EBE3] dark:border-gray-800 focus:border-[#E5B876] focus:ring-[#E5B876]/10 px-6 transition-all"
                                            placeholder="aria@viya.com"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-3">
                                        <Label htmlFor="phone" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91] dark:text-gray-400 ml-2">Phone Link</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={customerDetails.phone}
                                            onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                                            className="h-14 rounded-2xl border-[#F0EBE3] dark:border-gray-800 focus:border-[#E5B876] focus:ring-[#E5B876]/10 px-6 transition-all"
                                            placeholder="+91 9977 123456"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Shipping Address */}
                            <section className="bg-white dark:bg-black rounded-[2.5rem] p-8 md:p-12 border border-[#F0EBE3] dark:border-gray-800 shadow-sm space-y-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5B876]/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-1000"></div>

                                <div className="flex items-center justify-between border-b border-[#F0EBE3] dark:border-gray-800 pb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#1A1612] rounded-full flex items-center justify-center text-white shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <h2 className="text-2xl font-display font-medium text-[#1A1612] dark:text-white">Delivery Coordinates</h2>
                                    </div>
                                    {!isAddingNewAddress && savedAddresses.length > 0 && (
                                        <Button
                                            variant="ghost"
                                            onClick={() => setIsAddingNewAddress(true)}
                                            className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#E5B876] hover:bg-[#E5B876]/10"
                                        >
                                            + Use New Address
                                        </Button>
                                    )}
                                    {isAddingNewAddress && savedAddresses.length > 0 && (
                                        <Button
                                            variant="ghost"
                                            onClick={() => setIsAddingNewAddress(false)}
                                            className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91]"
                                        >
                                            Select Saved
                                        </Button>
                                    )}
                                </div>

                                {fetchingAddresses ? (
                                    <div className="py-12 flex justify-center items-center gap-3">
                                        <Loader2 className="h-5 w-5 animate-spin text-[#E5B876]" />
                                        <span className="text-[10px] uppercase tracking-widest text-[#8C8276]">Seeking Lore...</span>
                                    </div>
                                ) : !isAddingNewAddress && savedAddresses.length > 0 ? (
                                    <div className="space-y-4 pt-4">
                                        <RadioGroup value={String(selectedAddressId)} onValueChange={(val) => {
                                            const addr = savedAddresses.find(a => String(a.id) === val);
                                            if (addr) {
                                                setSelectedAddressId(Number(val));
                                                setShippingAddress({
                                                    address: addr.address,
                                                    city: addr.city,
                                                    state: addr.state,
                                                    postalCode: addr.postal_code,
                                                    country: addr.country || "India"
                                                });
                                                setCustomerDetails({
                                                    firstName: addr.name?.split(" ")[0] || "",
                                                    lastName: addr.name?.split(" ").slice(1).join(" ") || "",
                                                    email: addr.email || "",
                                                    phone: addr.phone || ""
                                                });
                                            }
                                        }}>
                                            {savedAddresses.map((addr) => (
                                                <div
                                                    key={addr.id}
                                                    className={`p-6 border-2 transition-all cursor-pointer rounded-2xl ${selectedAddressId === addr.id
                                                        ? 'border-[#E5B876] bg-[#E5B876]/5 ring-1 ring-[#E5B876]/20'
                                                        : 'border-[#F0EBE3] dark:border-gray-800 hover:border-[#E5B876]/50'
                                                        }`}
                                                    onClick={() => {
                                                        setSelectedAddressId(addr.id);
                                                        setShippingAddress({
                                                            address: addr.address,
                                                            city: addr.city,
                                                            state: addr.state,
                                                            postalCode: addr.postal_code,
                                                            country: addr.country || "India"
                                                        });
                                                        setCustomerDetails({
                                                            firstName: addr.name?.split(" ")[0] || "",
                                                            lastName: addr.name?.split(" ").slice(1).join(" ") || "",
                                                            email: addr.email || "",
                                                            phone: addr.phone || ""
                                                        });
                                                    }}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <RadioGroupItem value={String(addr.id)} id={String(addr.id)} className="text-[#E5B876] mt-1" />
                                                        <div className="flex-1 space-y-1">
                                                            <div className="flex items-center justify-between">
                                                                <Label htmlFor={String(addr.id)} className="font-bold text-sm cursor-pointer text-[#1A1612] dark:text-white">
                                                                    {addr.name || 'Saved Address'}
                                                                </Label>
                                                                {addr.is_default_shipping && (
                                                                    <span className="text-[8px] uppercase tracking-[0.2em] font-black bg-[#1A1612] text-white px-2 py-0.5 rounded-full">Default</span>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-[#8C8276] dark:text-gray-400 leading-relaxed">
                                                                {addr.address}, {addr.city}, {addr.state} - {addr.postal_code}
                                                            </p>
                                                            <p className="text-[10px] text-[#A69D91] font-medium">{addr.phone}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                ) : (
                                    <div className="space-y-8 pt-4 animate-in fade-in slide-in-from-top-4">
                                        <div className="space-y-3">
                                            <Label htmlFor="address" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91] dark:text-gray-400 ml-2">Full Address</Label>
                                            <Input
                                                id="address"
                                                value={shippingAddress.address}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                                                className="h-14 rounded-2xl border-[#F0EBE3] dark:border-gray-800 focus:border-[#E5B876] focus:ring-[#E5B876]/10 px-6 transition-all"
                                                placeholder="House No., Street, Neighborhood"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <Label htmlFor="city" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91] dark:text-gray-400 ml-2">City</Label>
                                                <Input
                                                    id="city"
                                                    value={shippingAddress.city}
                                                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                                    className="h-14 rounded-2xl border-[#F0EBE3] dark:border-gray-800 focus:border-[#E5B876] focus:ring-[#E5B876]/10 px-6 transition-all"
                                                    placeholder="New Delhi"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="state" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91] dark:text-gray-400 ml-2">State</Label>
                                                <Input
                                                    id="state"
                                                    value={shippingAddress.state}
                                                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                                                    className="h-14 rounded-2xl border-[#F0EBE3] dark:border-gray-800 focus:border-[#E5B876] focus:ring-[#E5B876]/10 px-6 transition-all"
                                                    placeholder="Delhi"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <Label htmlFor="postalCode" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91] dark:text-gray-400 ml-2">Pin Code</Label>
                                                <Input
                                                    id="postalCode"
                                                    value={shippingAddress.postalCode}
                                                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                                    className="h-14 rounded-2xl border-[#F0EBE3] dark:border-gray-800 focus:border-[#E5B876] focus:ring-[#E5B876]/10 px-6 transition-all"
                                                    placeholder="110001"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="country" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91] dark:text-gray-400 ml-2">Country</Label>
                                                <Input
                                                    id="country"
                                                    value={shippingAddress.country}
                                                    disabled
                                                    className="h-14 rounded-2xl border-[#F0EBE3] dark:border-gray-800 bg-[#FBF9F6] dark:bg-gray-900 px-6 text-[#1A1612] dark:text-white font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* New Simplified Payment Section */}
                            <section className="bg-white dark:bg-black rounded-[2.5rem] p-8 md:p-10 border border-[#F0EBE3] dark:border-gray-800 shadow-sm space-y-6">
                                <div>
                                    <h3 className="text-xl font-display font-medium text-[#1A1612] dark:text-white mb-1">Payment</h3>
                                    <p className="text-xs text-[#8C8276] dark:text-gray-400">All transactions are secure and encrypted.</p>
                                </div>

                                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-0 -space-y-[1px]">
                                    {/* Razorpay Option */}
                                    <div className={`p-6 border-2 transition-all cursor-pointer rounded-t-2xl ${paymentMethod !== 'cod'
                                        ? 'border-[#E5B876] bg-[#E5B876]/5 z-10 relative'
                                        : 'border-[#F0EBE3] dark:border-gray-800'
                                        }`}>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <RadioGroupItem value="razorpay" id="razorpay" className="text-[#E5B876]" />
                                                <Label htmlFor="razorpay" className="font-bold text-sm cursor-pointer text-[#1A1612] dark:text-white">
                                                    Razorpay Secure (UPI, Cards, Wallets)
                                                </Label>
                                            </div>
                                            <div className="flex gap-2 items-center opacity-60">
                                                <div className="h-4 w-6 bg-gray-100 rounded text-[6px] flex items-center justify-center font-bold">UPI</div>
                                                <div className="h-4 w-6 bg-gray-100 rounded text-[6px] flex items-center justify-center font-bold">VISA</div>
                                                <div className="h-4 w-6 bg-gray-100 rounded text-[6px] flex items-center justify-center font-bold">MC</div>
                                                <span className="text-[8px] text-gray-400">+18</span>
                                            </div>
                                        </div>

                                        {paymentMethod !== 'cod' && (
                                            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl text-center animate-in fade-in slide-in-from-top-2">
                                                <p className="text-xs text-[#8C8276] dark:text-gray-400 leading-relaxed">
                                                    You'll be redirected to Razorpay Secure to complete your purchase.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* COD Option */}
                                    <div className={`p-6 border-2 transition-all cursor-pointer rounded-b-2xl ${paymentMethod === 'cod'
                                        ? 'border-[#E5B876] bg-[#E5B876]/5 z-10 relative'
                                        : 'border-[#F0EBE3] dark:border-gray-800'
                                        }`}>
                                        <div className="flex items-center space-x-3">
                                            <RadioGroupItem value="cod" id="cod" className="text-[#E5B876]" />
                                            <Label htmlFor="cod" className="font-bold text-sm cursor-pointer text-[#1A1612] dark:text-white">
                                                Cash on Delivery (COD)
                                            </Label>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </section>

                            {/* New Billing Address Section */}
                            <section className="bg-white dark:bg-black rounded-[2.5rem] p-8 md:p-10 border border-[#F0EBE3] dark:border-gray-800 shadow-sm space-y-6">
                                <h3 className="text-xl font-display font-medium text-[#1A1612] dark:text-white">Billing address</h3>

                                <RadioGroup
                                    value={billingSameAsShipping ? 'same' : 'different'}
                                    onValueChange={(val) => setBillingSameAsShipping(val === 'same')}
                                    className="space-y-0 -space-y-[1px]"
                                >
                                    <div className={`p-4 border-2 transition-all cursor-pointer rounded-t-2xl ${billingSameAsShipping
                                        ? 'border-[#E5B876] bg-[#E5B876]/5 z-10 relative'
                                        : 'border-[#F0EBE3] dark:border-gray-800'
                                        }`}>
                                        <div className="flex items-center space-x-3">
                                            <RadioGroupItem value="same" id="same" className="text-[#E5B876]" />
                                            <Label htmlFor="same" className="text-sm cursor-pointer text-[#1A1612] dark:text-white">Same as shipping address</Label>
                                        </div>
                                    </div>

                                    <div className={`p-4 border-2 transition-all cursor-pointer rounded-b-2xl ${!billingSameAsShipping
                                        ? 'border-[#E5B876] bg-[#E5B876]/5 z-10 relative'
                                        : 'border-[#F0EBE3] dark:border-gray-800'
                                        }`}>
                                        <div className="flex items-center space-x-3">
                                            <RadioGroupItem value="different" id="different" className="text-[#E5B876]" />
                                            <Label htmlFor="different" className="text-sm cursor-pointer text-[#1A1612] dark:text-white">Use a different billing address</Label>
                                        </div>

                                        {!billingSameAsShipping && (
                                            <div className="pt-6 space-y-6 animate-in fade-in slide-in-from-top-4">
                                                <div className="space-y-3">
                                                    <Label className="text-[10px] uppercase font-bold text-[#A69D91]">Billing Address</Label>
                                                    <Input
                                                        value={billingAddress.address}
                                                        onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
                                                        placeholder="House No., Street"
                                                        className="h-12 rounded-xl border-[#F0EBE3] dark:border-gray-800"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Input
                                                        value={billingAddress.city}
                                                        onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                                                        placeholder="City"
                                                        className="h-12 rounded-xl border-[#F0EBE3] dark:border-gray-800"
                                                    />
                                                    <Input
                                                        value={billingAddress.postalCode}
                                                        onChange={(e) => setBillingAddress({ ...billingAddress, postalCode: e.target.value })}
                                                        placeholder="Postal code"
                                                        className="h-12 rounded-xl border-[#F0EBE3] dark:border-gray-800"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </RadioGroup>
                            </section>
                        </div>

                        {/* Order Summary Area */}
                        <div className="lg:col-span-5 lg:sticky lg:top-32 animate-in slide-in-from-right-8 duration-1000">
                            <div className="bg-[#1A1612] text-white p-10 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] space-y-10 relative overflow-hidden">
                                {/* Decorative circle */}
                                <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#E5B876]/10 rounded-full blur-3xl"></div>

                                <div className="relative z-10 space-y-2 border-b border-white/10 pb-6">
                                    <h3 className="text-3xl font-display font-medium">Manifest Summary</h3>
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={12} className="text-[#E5B876]" />
                                        <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">Curated for Excellence</p>
                                    </div>
                                </div>

                                {/* Item Miniatures */}
                                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar relative z-10">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-6 group">
                                            <div className="w-20 h-24 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                                                <img src={item.product?.image || "/placeholder.jpg"} alt={item.product?.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center gap-1">
                                                <h4 className="text-sm font-medium text-white/90 line-clamp-1">{item.product?.name}</h4>
                                                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Qty: {item.quantity}</p>
                                                <p className="text-[#E5B876] font-bold">₹{((item.product?.unit_price || 0) * item.quantity).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6 relative z-10 border-t border-white/10 pt-10">
                                    {/* Coupons */}
                                    {!showDiscountInput ? (
                                        <button
                                            onClick={() => setShowDiscountInput(true)}
                                            className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#E5B876] hover:text-white transition-colors"
                                        >
                                            Apply Curated Code
                                        </button>
                                    ) : (
                                        <div className="flex gap-3">
                                            <Input
                                                value={discountCode}
                                                onChange={(e) => setDiscountCode(e.target.value)}
                                                className="bg-white/5 border-white/10 rounded-xl h-12 text-white placeholder:text-white/20"
                                                placeholder="Viya Code"
                                            />
                                            <Button onClick={handleApplyCoupon} variant="outline" className="border-white/10 text-white rounded-xl h-12 px-6">Apply</Button>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/40 uppercase tracking-widest text-[9px] font-bold">Base Offering</span>
                                            <span className="text-white font-medium">₹{subtotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/40 uppercase tracking-widest text-[9px] font-bold">Passage</span>
                                            <span className={shipping === 0 ? "text-[#E5B876] text-[9px] font-bold tracking-widest" : "text-white font-medium"}>
                                                {shipping === 0 ? "COMPLIMENTARY" : `₹${shipping}`}
                                            </span>
                                        </div>
                                        {tax > 0 && (
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-white/40 uppercase tracking-widest text-[9px] font-bold">GST / Taxes</span>
                                                <span className="text-white font-medium">₹{tax.toLocaleString()}</span>
                                            </div>
                                        )}
                                        {checkoutData?.total_discount > 0 && (
                                            <div className="flex justify-between items-center text-sm text-[#E5B876]">
                                                <span className="uppercase tracking-widest text-[9px] font-bold">Blessing (Discount)</span>
                                                <span className="font-medium">-₹{checkoutData.total_discount.toLocaleString()}</span>
                                            </div>
                                        )}
                                        {subtotal < 999 && shipping > 0 && (
                                            <p className="text-[9px] text-white/30 italic text-right">
                                                Seek further ₹{999 - subtotal} for complimentary passage
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-6 border-t border-white/10">
                                        <div className="flex flex-col gap-1 mb-10">
                                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Final Value</span>
                                            <span className="text-5xl font-bold text-[#E5B876]">₹{total.toLocaleString()}</span>
                                        </div>

                                        <Button
                                            onClick={handlePlaceOrder}
                                            disabled={isProcessing || cartItems.length === 0}
                                            className="w-full bg-[#E5B876] hover:bg-white hover:text-[#1A1612] text-[#1A1612] h-18 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] transition-all transform active:scale-[0.98] shadow-2xl flex items-center justify-center gap-4 group/btn h-16"
                                        >
                                            {isProcessing ? (
                                                <span className="animate-pulse">Archiving Journey...</span>
                                            ) : (
                                                <>
                                                    Proceed with Offering
                                                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-2" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="text-center pt-10">
                                    <p className="text-[9px] text-white/30 leading-relaxed font-medium uppercase tracking-[0.2em]">
                                        By proceeding, you agree to our <br /> Terms of Eternal Craft and Privacy Policy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ViyaFooter />
        </div>
    );
};

export default Checkout;


