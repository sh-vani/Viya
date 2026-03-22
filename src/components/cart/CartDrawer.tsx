import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, X, ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface CartDrawerProps {
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const CartDrawer = ({ children, open, onOpenChange }: CartDrawerProps) => {
    const { cartItems, totalItems, totalPrice, updateQuantity } = useCart();

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            {children && <SheetTrigger asChild>{children}</SheetTrigger>}
            <SheetContent className="w-full sm:max-w-lg bg-[#FBF9F6] border-l-0 p-0 flex flex-col h-full">
                <SheetHeader className="p-6 border-b border-[#F0EBE3] shrink-0">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-2xl font-display font-medium text-[#1A1612] flex items-center gap-3">
                            <ShoppingBag className="w-6 h-6 text-[#E5B876]" />
                            Your Cart
                            <span className="text-xs bg-[#E5B876] text-[#1A1612] font-black h-5 w-5 rounded-full flex items-center justify-center translate-y-[2px]">
                                {totalItems}
                            </span>
                        </SheetTitle>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#A69D91]">
                                <ShoppingCart className="w-10 h-10 opacity-20" />
                            </div>
                            <div>
                                <h3 className="text-lg font-display font-bold text-[#1A1612]">Your cart is empty</h3>
                                <p className="text-sm text-[#8C8276] font-light mt-1">Start adding pieces that resonate with you.</p>
                            </div>
                            <Button
                                variant="outline"
                                className="rounded-xl border-[#E8E2D9] text-[#1A1612] text-xs uppercase tracking-widest font-bold mt-4"
                                onClick={() => onOpenChange?.(false)}
                            >
                                Start Shopping
                            </Button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="w-20 h-24 rounded-xl overflow-hidden bg-white border border-[#F0EBE3] shrink-0">
                                    <img
                                        src={item.product?.image_url || item.product?.image}
                                        alt={item.product?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-sm font-display font-bold text-[#1A1612] line-clamp-1">{item.product?.name}</h4>
                                        <button
                                            onClick={() => updateQuantity(item.product_id, 0)}
                                            className="text-[#A69D91] hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-xs text-[#8C8276] font-light line-clamp-1">Exquisite Collection Piece</p>
                                    <div className="flex justify-between items-center pt-1">
                                        <div className="flex items-center bg-white border border-[#E8E2D9] rounded-full px-2 h-8 w-24 justify-between">
                                            <button
                                                onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                className="w-5 h-5 flex items-center justify-center text-[#8C8276] hover:text-[#1A1612]"
                                            >
                                                −
                                            </button>
                                            <span className="text-xs font-bold text-[#1A1612]">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                className="w-5 h-5 flex items-center justify-center text-[#8C8276] hover:text-[#1A1612]"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="text-sm font-bold text-[#1A1612]">₹{(item.product?.unit_price * item.quantity).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="shrink-0 p-6 bg-white border-t border-[#F0EBE3] space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-[#8C8276] font-light">Subtotal</span>
                                <span className="text-[#1A1612] font-bold">₹{totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[#8C8276] font-light">Premium Delivery</span>
                                <span className="text-[#E5B876] text-[10px] font-black uppercase tracking-widest">Complimentary</span>
                            </div>
                            <div className="flex justify-between text-lg pt-3 border-t border-[#F0EBE3]">
                                <span className="font-display font-bold text-[#1A1612]">Total</span>
                                <span className="font-bold text-[#2B1E0E]">₹{totalPrice.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Link to="/checkout" className="block" onClick={() => onOpenChange?.(false)}>
                                <Button className="w-full h-14 bg-[#1A1612] hover:bg-[#2B1E0E] text-white rounded-xl text-xs uppercase tracking-[0.3em] font-black shadow-xl">
                                    Checkout Now <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                            <Link to="/cart" className="block" onClick={() => onOpenChange?.(false)}>
                                <Button variant="ghost" className="w-full text-[#8C8276] hover:text-[#1A1612] text-[10px] uppercase tracking-widest font-bold">
                                    View Full Cart
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default CartDrawer;
