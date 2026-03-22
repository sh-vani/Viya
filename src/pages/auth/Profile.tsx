import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, ShoppingBag, Heart, LogOut, Settings, ShieldCheck, MapPin, ArrowRight, Plus, Trash2, Edit3, Loader2, Home, Briefcase, Package, Truck, CheckCircle, Clock } from "lucide-react";
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profileApi, orderApi } from "@/lib/api";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [addresses, setAddresses] = useState<any[]>([]);
    const [fetchingAddresses, setFetchingAddresses] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orders, setOrders] = useState<any[]>([]);
    const [fetchingOrders, setFetchingOrders] = useState(false);

    const [addressForm, setAddressForm] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        city: "",
        state: "",
        country: "India",
        postal_code: ""
    });

    const fetchAddresses = async () => {
        setFetchingAddresses(true);
        try {
            const response = await profileApi.getAddressList();
            setAddresses(response.data?.addresses || []);
        } catch (error) {
            console.error("Failed to fetch addresses", error);
        } finally {
            setFetchingAddresses(false);
        }
    };

    const fetchOrders = async () => {
        setFetchingOrders(true);
        try {
            const response = await orderApi.getOrderList();
            setOrders(response.data?.orders || []);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setFetchingOrders(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch ((status || "").toLowerCase()) {
            case "delivered": return <CheckCircle className="text-green-500" size={18} />;
            case "shipped": return <Truck className="text-blue-500" size={18} />;
            case "pending": return <Clock className="text-amber-500" size={18} />;
            default: return <Package className="text-[#E5B876]" size={18} />;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        const name = localStorage.getItem("user_name");
        const email = localStorage.getItem("user_email");

        if (!token) {
            navigate("/account?redirect=/profile");
            return;
        }

        setUser({
            name: name || "Valued Member",
            email: email || "member@viya.com"
        });

        fetchAddresses();
        fetchOrders();
    }, [navigate]);


    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_email");
        toast.success("Signed Out", {
            description: "You have been safely signed out of your sanctuary."
        });
        navigate("/");
    };

    const handleOpenDialog = (address: any = null) => {
        if (address) {
            setEditingAddress(address);
            setAddressForm({
                name: address.name || "",
                email: address.email || "",
                address: address.address || "",
                phone: address.phone || "",
                city: address.city || "",
                state: address.state || "",
                country: address.country || "India",
                postal_code: address.postal_code || ""
            });
        } else {
            setEditingAddress(null);
            setAddressForm({
                name: user?.name || "",
                email: user?.email || "",
                address: "",
                phone: "",
                city: "",
                state: "",
                country: "India",
                postal_code: ""
            });
        }
        setIsDialogOpen(true);
    };

    const handleAddressSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingAddress) {
                await profileApi.updateAddress(editingAddress.id, addressForm);
                toast.success("Coordinates Revised", { description: "Your sanctuary details have been updated." });
            } else {
                await profileApi.storeAddress(addressForm);
                toast.success("New Sanctuary Registered", { description: "A new delivery coordinate has been added." });
            }
            setIsDialogOpen(false);
            fetchAddresses();
        } catch (error) {
            toast.error("Process Halted", { description: "We could not update your coordinates at this time." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteAddress = async (id: number) => {
        try {
            await profileApi.deleteAddress(id);
            toast.success("Sanctuary Removed", { description: "The coordinate has been erased from our Histor." });
            fetchAddresses();
        } catch (error) {
            toast.error("Failed to remove address");
        }
    };

    const handleSetDefault = async (id: number, type: 'shipping' | 'billing') => {
        try {
            if (type === 'shipping') await profileApi.setDefaultShipping(id);
            else await profileApi.setDefaultBilling(id);
            toast.success(`Default ${type === 'shipping' ? 'Passage' : 'Registry'} Set`);
            fetchAddresses();
        } catch (error) {
            toast.error("Failed to update defaults");
        }
    };


    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#FBF9F6] dark:bg-black">
            <ViyaHeader />

            <main className="pt-32 pb-24 px-4">
                <div className="container mx-auto max-w-6xl">
                    {/* Header Section */}
                    <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="space-y-4 text-center md:text-left">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#E5B876]/10 rounded-full border border-[#E5B876]/20">
                                <ShieldCheck className="h-3.5 w-3.5 text-[#E5B876]" />
                                <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5B876] font-bold">Verified Member</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-medium text-[#1A1612] dark:text-white">
                                Your <span className="italic text-[#E5B876]">Sanctuary</span>
                            </h1>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-4">
                            <Button
                                onClick={() => handleOpenDialog()}
                                className="bg-[#1A1612] text-white rounded-2xl flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold h-14 px-8 shadow-xl hover:bg-black transition-all"
                            >
                                <Plus size={18} /> Add New Address
                            </Button>

                            <Button
                                onClick={handleLogout}
                                variant="outline"
                                className="rounded-2xl border-[#F0EBE3] dark:border-gray-800 text-[#8C8276] dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center gap-3 h-14 px-8"
                            >
                                <LogOut size={18} />
                                Sign Out
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar/Profile Info */}
                        <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
                            <div className="bg-white dark:bg-black rounded-[3rem] border border-[#F0EBE3] dark:border-gray-800 p-10 text-center shadow-sm">
                                <div className="w-32 h-32 rounded-full bg-[#1A1612] flex items-center justify-center mx-auto mb-6 border-4 border-[#FBF9F6] shadow-xl overflow-hidden">
                                    <span className="text-4xl font-display text-[#E5B876] uppercase">
                                        {user.name.charAt(0)}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-[#1A1612] dark:text-white mb-1">{user.name}</h3>
                                <p className="text-[#8C8276] dark:text-gray-400 text-sm font-light mb-8 italic">{user.email}</p>

                                <div className="pt-8 border-t border-[#FBF9F6] dark:border-gray-800 grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-[#1A1612] dark:text-white">12</p>
                                        <p className="text-[9px] uppercase tracking-widest text-[#A69D91]">Member Days</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-[#1A1612] dark:text-white">Exquisite</p>
                                        <p className="text-[9px] uppercase tracking-widest text-[#A69D91]">Status</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#1A1612] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5B876]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#E5B876]/20 transition-all duration-700" />
                                <h4 className="text-xl font-display font-bold mb-6">Collective Benefits</h4>
                                <ul className="space-y-5">
                                    {[
                                        { icon: <ShoppingBag size={14} />, text: "Priority Unveilings" },
                                        { icon: <MapPin size={14} />, text: "Private Styling" },
                                        { icon: <Heart size={14} />, text: "Lifetime Curation" }
                                    ].map((benefit, i) => (
                                        <li key={i} className="flex items-center gap-4 text-sm text-gray-400 font-light">
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#E5B876]">
                                                {benefit.icon}
                                            </div>
                                            {benefit.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <button
                                    onClick={() => document.getElementById("order-history-section")?.scrollIntoView({ behavior: "smooth" })}
                                    className="p-8 bg-white dark:bg-black rounded-[2.5rem] border border-[#F0EBE3] dark:border-gray-800 text-left group hover:border-[#E5B876] transition-all duration-500 shadow-sm overflow-hidden relative"
                                >
                                    <div className="relative z-10 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#E5B876] font-bold mb-2">Histor</p>
                                            <h4 className="text-2xl font-display font-bold text-[#1A1612] dark:text-white">Order History</h4>
                                            <p className="text-[#8C8276] dark:text-gray-400 text-sm mt-1 font-light italic">
                                                {fetchingOrders ? "Loading..." : `${orders.length} order${orders.length !== 1 ? "s" : ""}`}
                                            </p>
                                        </div>
                                        <div className="w-14 h-14 rounded-2xl bg-[#FBF9F6] dark:bg-gray-900 flex items-center justify-center text-[#1A1612] dark:text-white group-hover:bg-[#1A1612] group-hover:text-white transition-all duration-500 shadow-inner">
                                            <ShoppingBag size={24} />
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#E5B876]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                </button>

                                <button onClick={() => navigate("/wishlist")} className="p-8 bg-white rounded-[2.5rem] border border-[#F0EBE3] text-left group hover:border-[#E5B876] transition-all duration-500 shadow-sm overflow-hidden relative">
                                    <div className="relative z-10 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#E5B876] font-bold mb-2">Desires</p>
                                            <h4 className="text-2xl font-display font-bold text-[#1A1612]">Your Wishlist</h4>
                                            <p className="text-[#8C8276] dark:text-gray-400 text-sm mt-1 font-light italic">Ethereal selections.</p>
                                        </div>
                                        <div className="w-14 h-14 rounded-2xl bg-[#FBF9F6] dark:bg-gray-900 flex items-center justify-center text-[#1A1612] dark:text-white group-hover:bg-[#1A1612] group-hover:text-white transition-all duration-500 shadow-inner">
                                            <Heart size={24} />
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#E5B876]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                </button>
                            </div>

                            {/* Detailed Info Card */}
                            <div className="bg-white dark:bg-black rounded-[3rem] border border-[#F0EBE3] dark:border-gray-800 overflow-hidden shadow-sm">
                                <div className="p-10 border-b border-[#F0EBE3] dark:border-gray-800 flex items-center justify-between">
                                    <h4 className="text-2xl font-display font-bold text-[#1A1612] dark:text-white">Profile Settings</h4>
                                    <Settings className="text-[#A69D91] w-5 h-5 animate-spin-slow" />
                                </div>
                                <div className="p-10 space-y-8 text-left">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4 text-left">
                                            <label className="text-[10px] uppercase tracking-[0.4em] text-[#A69D91] dark:text-gray-400 font-bold block">Birth Narrative</label>
                                            <div className="p-5 bg-[#FBF9F6] dark:bg-gray-900 rounded-2xl border border-[#F0EBE3] dark:border-gray-800 text-[#1A1612] dark:text-white font-medium flex items-center gap-4">
                                                <User size={16} className="text-[#E5B876]" />
                                                {user.name}
                                            </div>
                                        </div>
                                        <div className="space-y-4 text-left">
                                            <label className="text-[10px] uppercase tracking-[0.4em] text-[#A69D91] dark:text-gray-400 font-bold block">Digital Registry</label>
                                            <div className="p-5 bg-[#FBF9F6] dark:bg-gray-900 rounded-2xl border border-[#F0EBE3] dark:border-gray-800 text-[#1A1612] dark:text-white font-medium flex items-center gap-4">
                                                <Mail size={16} className="text-[#E5B876]" />
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Address Management Section */}
                            <div className="bg-white dark:bg-black rounded-[3rem] border border-[#F0EBE3] dark:border-gray-800 overflow-hidden shadow-sm">
                                <div className="p-10 border-b border-[#F0EBE3] dark:border-gray-800 flex items-center justify-between">
                                    <h4 className="text-2xl font-display font-bold text-[#1A1612] dark:text-white">Delivery Sanctuaries</h4>
                                </div>

                                <div className="p-8">
                                    {fetchingAddresses ? (
                                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                                            <Loader2 className="h-8 w-8 animate-spin text-[#E5B876]" />
                                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A69D91]">Retrieving Histor...</p>
                                        </div>
                                    ) : addresses.length === 0 ? (
                                        <div className="py-20 text-center space-y-4">
                                            <div className="w-16 h-16 bg-[#FBF9F6] rounded-full flex items-center justify-center mx-auto text-[#A69D91]">
                                                <MapPin size={24} />
                                            </div>
                                            <p className="text-[#8C8276] font-light italic">No coordinates registered in your sanctuary.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {addresses.map((addr) => (
                                                <div key={addr.id} className="group relative p-8 rounded-[2rem] border border-[#F0EBE3] dark:border-gray-800 bg-white dark:bg-black hover:border-[#E5B876] transition-all duration-500 text-left">
                                                    {(addr.is_default_shipping || addr.is_default_billing) && (
                                                        <div className="absolute top-6 right-6 flex gap-2">
                                                            {addr.is_default_shipping && <span className="text-[8px] uppercase tracking-widest bg-[#1A1612] text-white px-3 py-1 rounded-full font-bold">Shipping</span>}
                                                            {addr.is_default_billing && <span className="text-[8px] uppercase tracking-widest bg-[#E5B876] text-[#1A1612] px-3 py-1 rounded-full font-bold">Billing</span>}
                                                        </div>
                                                    )}

                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-3">
                                                            {addr.address_type === 'Office' ? <Briefcase size={16} className="text-[#E5B876]" /> : <Home size={16} className="text-[#E5B876]" />}
                                                            <h5 className="font-display font-bold text-[#1A1612] dark:text-white uppercase tracking-wider text-xs">{addr.name}</h5>
                                                        </div>

                                                        <p className="text-sm text-[#8C8276] leading-relaxed font-light pr-8">
                                                            {addr.address}, {addr.city},<br />
                                                            {addr.state} - {addr.postal_code}
                                                        </p>

                                                        <div className="flex items-center justify-between pt-6 border-t border-[#FBF9F6] dark:border-gray-800">
                                                            <div className="flex gap-4">
                                                                <button onClick={() => handleOpenDialog(addr)} className="text-[#A69D91] hover:text-[#1A1612] transition-colors"><Edit3 size={16} /></button>
                                                                <button onClick={() => handleDeleteAddress(addr.id)} className="text-[#A69D91] hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                {!addr.is_default_shipping && (
                                                                    <button onClick={() => handleSetDefault(addr.id, 'shipping')} className="text-[8px] uppercase tracking-widest font-bold text-[#A69D91] hover:text-[#1A1612]">Set Ship</button>
                                                                )}
                                                                {!addr.is_default_billing && (
                                                                    <button onClick={() => handleSetDefault(addr.id, 'billing')} className="text-[8px] uppercase tracking-widest font-bold text-[#A69D91] hover:text-[#1A1612]">Set Bill</button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* ===== ORDER HISTORY SECTION ===== */}
                            <div id="order-history-section" className="bg-white dark:bg-black rounded-[3rem] border border-[#F0EBE3] dark:border-gray-800 overflow-hidden shadow-sm">
                                <div className="p-10 border-b border-[#F0EBE3] dark:border-gray-800 flex items-center justify-between">
                                    <h4 className="text-2xl font-display font-bold text-[#1A1612] dark:text-white">Order Histor</h4>
                                    <ShoppingBag className="text-[#A69D91] w-5 h-5" />
                                </div>

                                <div className="p-8">
                                    {fetchingOrders ? (
                                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                                            <Loader2 className="h-8 w-8 animate-spin text-[#E5B876]" />
                                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A69D91]">Retrieving Passages...</p>
                                        </div>
                                    ) : orders.length === 0 ? (
                                        <div className="py-20 text-center space-y-4">
                                            <div className="w-16 h-16 bg-[#FBF9F6] dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto text-[#A69D91]">
                                                <Package size={24} />
                                            </div>
                                            <p className="text-[#8C8276] font-light italic">No passages recorded in your sanctuary yet.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-5">
                                            {orders.map((order) => (
                                                <div key={order.id} className="group relative p-7 rounded-[2rem] border border-[#F0EBE3] dark:border-gray-800 bg-white dark:bg-black hover:border-[#E5B876] transition-all duration-500">
                                                    <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
                                                        <div>
                                                            <p className="text-[9px] uppercase tracking-widest text-[#A69D91] font-bold mb-1">Order Number</p>
                                                            <h5 className="text-base font-bold text-[#1A1612] dark:text-white">#{order.order_number}</h5>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-[9px] uppercase tracking-widest text-[#A69D91] font-bold mb-1">Amount Paid</p>
                                                            <p className="text-lg font-bold text-[#E5B876]">₹{Number(order.grand_total || 0).toLocaleString("en-IN")}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-8 border-t border-[#F0EBE3] dark:border-gray-800 pt-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 bg-[#FBF9F6] dark:bg-gray-900 rounded-full flex items-center justify-center">
                                                                {getStatusIcon(order.status || "pending")}
                                                            </div>
                                                            <div>
                                                                <p className="text-[8px] uppercase tracking-widest text-[#A69D91] font-bold">Status</p>
                                                                <p className="text-xs font-bold text-[#1A1612] dark:text-white uppercase tracking-wider">{order.status || "Pending"}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-[8px] uppercase tracking-widest text-[#A69D91] font-bold">Placed On</p>
                                                            <p className="text-xs font-bold text-[#1A1612] dark:text-white uppercase tracking-wider">
                                                                {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[8px] uppercase tracking-widest text-[#A69D91] font-bold">Payment</p>
                                                            <p className="text-xs font-bold text-[#1A1612] dark:text-white uppercase tracking-wider">{order.payment_method || "COD"}</p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 flex justify-end">
                                                        <button
                                                            onClick={() => navigate(`/track/${order.order_number}`)}
                                                            className="inline-flex items-center gap-2 border border-[#F0EBE3] dark:border-gray-700 hover:border-[#E5B876] hover:text-[#E5B876] text-[#8C8276] text-[9px] font-bold uppercase tracking-[0.2em] h-10 px-5 rounded-xl transition-all duration-300"
                                                        >
                                                            Track Passage <ArrowRight size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-2xl rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white dark:bg-black">
                        <DialogHeader className="p-10 bg-[#1A1612] text-white relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5B876]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <DialogTitle className="text-3xl font-display font-medium relative z-10">
                                {editingAddress ? "Revise Sanctuary" : "New Coordinate"}
                            </DialogTitle>
                            <DialogDescription className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold relative z-10 pt-2">
                                Defining your sphere of elegance
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleAddressSubmit} className="p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-[#A69D91] font-bold ml-2">Guardian Name</Label>
                                    <Input
                                        value={addressForm.name}
                                        onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                                        className="h-14 rounded-2xl border-[#F0EBE3] focus:border-[#E5B876] px-6"
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-[#A69D91] font-bold ml-2">Phone Link</Label>
                                    <Input
                                        value={addressForm.phone}
                                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                                        className="h-14 rounded-2xl border-[#F0EBE3] focus:border-[#E5B876] px-6"
                                        placeholder="+91..."
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-[#A69D91] font-bold ml-2">Sanctuary Address</Label>
                                    <Input
                                        value={addressForm.address}
                                        onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                                        className="h-14 rounded-2xl border-[#F0EBE3] focus:border-[#E5B876] px-6"
                                        placeholder="House No, Street, Landmark"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-[#A69D91] font-bold ml-2">City</Label>
                                    <Input
                                        value={addressForm.city}
                                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                        className="h-14 rounded-2xl border-[#F0EBE3] focus:border-[#E5B876] px-6"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-[#A69D91] font-bold ml-2">State</Label>
                                    <Input
                                        value={addressForm.state}
                                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                        className="h-14 rounded-2xl border-[#F0EBE3] focus:border-[#E5B876] px-6"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-[#A69D91] font-bold ml-2">Pin Code</Label>
                                    <Input
                                        value={addressForm.postal_code}
                                        onChange={(e) => setAddressForm({ ...addressForm, postal_code: e.target.value })}
                                        className="h-14 rounded-2xl border-[#F0EBE3] focus:border-[#E5B876] px-6"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-[#A69D91] font-bold ml-2">Kingdom</Label>
                                    <Input
                                        value={addressForm.country}
                                        disabled
                                        className="h-14 rounded-2xl border-[#F0EBE3] bg-[#FBF9F6] px-6"
                                    />
                                </div>
                            </div>

                            <DialogFooter className="pt-6">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="h-16 w-full bg-[#E5B876] hover:bg-[#1A1612] hover:text-white text-[#1A1612] rounded-2xl font-bold uppercase tracking-[0.3em] text-[11px] transition-all shadow-xl"
                                >
                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : editingAddress ? "Commit Revisions" : "Register Coordinate"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>


            </main>

            <ViyaFooter />
        </div>
    );
};

export default Profile;
