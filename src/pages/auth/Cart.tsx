import { ShoppingBag, X, Minus, Plus, ArrowRight, Sparkles, Trash2, ShieldCheck, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Cart = () => {
    const { cartItems, loading, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    const handleRemove = (id: number, name: string) => {
        removeFromCart(id);
        toast.info("Removed from Cart", {
            description: `${name} has been removed from your collection.`,
        });
    };

    return (
        <div className="min-h-screen bg-[#FBF9F6] dark:bg-black">
            <ViyaHeader />

            <main className="px-4 py-24 md:py-32">
                <div className="container mx-auto max-w-7xl">
                    <div className="mb-16 text-center space-y-4">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#E5B876]/10 rounded-full border border-[#E5B876]/20">
                            <ShoppingBag className="h-4 w-4 text-[#E5B876]" />
                            <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5B876] font-bold">Your Selection</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-medium text-[#1A1612] dark:text-white">
                            Shopping <span className="italic text-[#E5B876] font-serif">Cart</span>
                        </h1>
                        <p className="text-[#8C8276] dark:text-gray-400 font-light max-w-lg mx-auto leading-relaxed">
                            A curated collection of pieces that resonate with your unique radiance.
                        </p>
                    </div>

                    {cartItems.length === 0 ? (
                        /* ===== EMPTY CART UI ===== */
                        <div className="relative bg-white dark:bg-black rounded-[3rem] border border-[#F0EBE3] dark:border-gray-800 max-w-2xl w-full px-10 py-24 text-center mx-auto shadow-sm overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-[#E5B876]/20"></div>

                            <div className="w-24 h-24 rounded-full bg-[#FBF9F6] dark:bg-gray-900 flex items-center justify-center mx-auto mb-8 text-[#E5B876] relative">
                                <ShoppingBag className="h-10 w-10 relative z-10" />
                                <div className="absolute inset-0 bg-[#E5B876]/10 rounded-full animate-ping opacity-20"></div>
                            </div>

                            <h2 className="text-3xl font-display font-medium text-[#1A1612] dark:text-white mb-4">Your collection is empty</h2>
                            <p className="text-[#8C8276] dark:text-gray-400 font-light mb-12 leading-relaxed max-w-sm mx-auto">
                                The pieces you love are waiting to be discovered. Explore our collections and find what speaks to you.
                            </p>

                            <Link to="/new-arrivals">
                                <Button className="bg-[#1A1612] hover:bg-black text-white h-16 px-12 rounded-2xl font-bold text-[11px] uppercase tracking-[0.3em] transition-all transform active:scale-95 shadow-xl flex items-center gap-3 mx-auto">
                                    Begin Exploring <ArrowRight size={14} />
                                </Button>
                            </Link>

                            <div className="mt-16 grid grid-cols-3 gap-4 opacity-30 grayscale blur-[1px]">
                                <div className="h-40 bg-[#FBF9F6] dark:bg-black rounded-3xl"></div>
                                <div className="h-40 bg-[#FBF9F6] dark:bg-black rounded-3xl flex items-center justify-center">
                                    <Sparkles className="text-[#E5B876] h-8 w-8" />
                                </div>
                                <div className="h-40 bg-[#FBF9F6] dark:bg-black rounded-3xl"></div>
                            </div>
                        </div>
                    ) : (
                        /* ===== FILLED CART UI ===== */
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Items List */}
                            <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="relative bg-white dark:bg-black p-6 md:p-10 rounded-[2.5rem] border border-[#F0EBE3] dark:border-gray-800 flex flex-col sm:flex-row gap-10 items-center group transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)]">
                                        {/* Remove Button */}
                                        <button
                                            onClick={() => handleRemove(item.product_id, item.product?.name || "Item")}
                                            className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center text-[#8C8276] dark:text-gray-400 hover:text-red-500 transition-all bg-[#FBF9F6] dark:bg-gray-900 rounded-full hover:shadow-lg hover:rotate-90 z-20"
                                            title="Remove from cart"
                                        >
                                            <X size={18} />
                                        </button>

                                        {/* Image */}
                                        <Link to={`/product/${item.product_id}`} className="w-40 h-52 rounded-3xl overflow-hidden bg-[#FBF9F6] dark:bg-gray-900 shrink-0 border border-[#F0EBE3] dark:border-gray-800 relative group-hover:shadow-xl transition-all duration-500">
                                            <img
                                                src={item.product?.image_url || item.product?.image || item.product?.images_full_url?.[0]?.path}
                                                alt={item.product?.name}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </Link>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col justify-between w-full h-full space-y-6">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[9px] uppercase tracking-[0.4em] text-[#E5B876] font-bold">House of Viya</span>
                                                    <div className="w-1 h-1 rounded-full bg-[#D9D9D9]"></div>
                                                    <span className="text-[9px] uppercase tracking-[0.4em] text-[#A69D91] font-bold">In Stock</span>
                                                </div>
                                                <Link to={`/product/${item.product_id}`}>
                                                    <h3 className="text-2xl font-display font-medium text-[#1A1612] dark:text-white hover:text-[#E5B876] transition-colors">{item.product?.name}</h3>
                                                </Link>
                                                <p className="text-[#8C8276] dark:text-gray-400 text-sm font-light line-clamp-2 max-w-md">{item.product?.details || 'Experience the synthesis of Histor and modern luxury in every curve.'}</p>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-[#F0EBE3] dark:border-gray-800">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#A69D91]">Unit Price</p>
                                                    <p className="text-xl font-bold text-[#1A1612] dark:text-white">₹{(item.product?.unit_price || 0).toLocaleString()}</p>
                                                </div>

                                                <div className="flex items-center bg-[#FBF9F6] dark:bg-gray-900 border border-[#F0EBE3] dark:border-gray-800 rounded-2xl p-1 h-12 w-32 justify-between shadow-inner">
                                                    <button
                                                        onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                                                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-gray-800 text-[#8C8276] dark:text-gray-400 transition-all hover:text-[#1A1612] dark:hover:text-white shadow-sm active:scale-90"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-bold text-[#1A1612] dark:text-white">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-gray-800 text-[#8C8276] dark:text-gray-400 transition-all hover:text-[#1A1612] dark:hover:text-white shadow-sm active:scale-90"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>

                                                <div className="space-y-1 text-right">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#A69D91]">Total Price</p>
                                                    <p className="text-2xl font-bold text-[#E5B876]">₹{((item.product?.unit_price || 0) * item.quantity).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Summary Card */}
                            <div className="lg:col-span-4 lg:sticky lg:top-32 animate-in fade-in slide-in-from-right-8 duration-1000">
                                <div className="bg-[#1A1612] text-white p-10 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] space-y-10 relative overflow-hidden">
                                    {/* Decorative circle */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E5B876]/10 rounded-full blur-2xl"></div>

                                    <div className="relative z-10 space-y-2">
                                        <h3 className="text-3xl font-display font-medium">Checkout Details</h3>
                                        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">Secure Luxury Transaction</p>
                                    </div>

                                    <div className="space-y-6 relative z-10">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/60 font-medium">Subtotal</span>
                                            <span className="text-white font-bold text-lg">₹{totalPrice.toLocaleString()}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <Truck size={14} className="text-[#E5B876]" />
                                                <span className="text-white/60 text-sm font-medium">Delivery</span>
                                            </div>
                                            <span className="text-[#E5B876] uppercase tracking-[0.2em] text-[9px] font-bold bg-[#E5B876]/10 px-3 py-1 rounded-full border border-[#E5B876]/20">Complimentary</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck size={14} className="text-[#E5B876]" />
                                                <span className="text-white/60 text-sm font-medium">Insurance</span>
                                            </div>
                                            <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest">Included</span>
                                        </div>

                                        <div className="h-[1px] w-full bg-white/10 my-4"></div>

                                        <div className="space-y-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Total Amount Payable</span>
                                                <span className="text-5xl font-bold text-[#E5B876]">₹{totalPrice.toLocaleString()}</span>
                                            </div>

                                            <Link
                                                to={localStorage.getItem("auth_token") ? "/checkout" : "/account?redirect=/checkout"}
                                                className="block w-full"
                                            >
                                                <Button className="w-full bg-[#E5B876] hover:bg-white hover:text-[#1A1612] text-[#1A1612] h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all transform active:scale-[0.98] shadow-2xl flex items-center justify-center gap-3 group/btn">
                                                    Proceed to Checkout
                                                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-2" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="pt-8 text-center space-y-4 relative z-10 border-t border-white/5">
                                        <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                                            Prices inclusive of all luxury taxes and artisanal contributions.
                                        </p>
                                        <div className="flex justify-center gap-4 grayscale opacity-40">
                                            <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                                            <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                                            <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Market Note */}
                                <div className="mt-8 p-6 rounded-[2rem] border border-[#F0EBE3] dark:border-gray-800 bg-white dark:bg-black flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#E5B876]/10 flex items-center justify-center shrink-0">
                                        <Sparkles className="h-5 w-5 text-[#E5B876]" />
                                    </div>
                                    <p className="text-[10px] text-[#8C8276] dark:text-gray-400 leading-relaxed italic">
                                        Your selection supports sustainable artisanal communities across the Histor belt.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <ViyaFooter />
        </div>
    );
};

export default Cart;


