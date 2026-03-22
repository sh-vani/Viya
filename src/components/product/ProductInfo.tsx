import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart, Star, ShoppingBag, Share2, Sparkles, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import ReviewProduct from "./ReviewProduct";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProductInfoProps {
  product: any;
  categoryName: string;
}

const ProductInfo = ({ product, categoryName }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
      toast.success("Added to Cart", {
        description: `${product?.name} has been added to your collection.`,
      });
      navigate("/cart");
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error("Failed to add to cart");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || 'Viya Collective',
        text: 'Check out this beautiful piece from Viya Collective',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.info('Link copied to clipboard!');
    }
  };

  const inWishlist = isInWishlist(product?.id);
  const productName = product?.name || 'Exquisite Collection Piece';
  const unitPrice = product?.unit_price || 0;
  const productPrice = `₹${unitPrice.toLocaleString()}`;
  const totalPriceFormatted = `₹${(unitPrice * quantity).toLocaleString()}`;
  const productDetails = product?.details || 'Experience the synthesis of Histor and modern luxury.';

  return (
    <div className="flex flex-col space-y-4 sm:space-y-8 md:space-y-10 animate-in fade-in slide-in-from-right-4 duration-1000">
      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E5B876]/10 dark:bg-[#E5B876]/20 rounded-full border border-[#E5B876]/20">
            <Sparkles className="h-3.5 w-3.5 text-[#E5B876]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#E5B876] font-bold">{categoryName}</span>
          </div>
          <ReviewProduct triggerClassName="w-fit">
            <div className="bg-[#1A1612]/5 dark:bg-white/10 text-[#1A1612] dark:text-white px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#1A1612]/10 dark:border-white/20 hover:bg-[#1A1612]/10 dark:hover:bg-white/20 transition-colors cursor-pointer">
              <Star className="h-3 w-3 fill-[#FFBD2D] text-[#FFBD2D]" />
              <span className="text-[11px] font-bold">4.9</span>
              <span className="text-[11px] text-[#A69D91] font-medium">(128 reviews)</span>
            </div>
          </ReviewProduct>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-medium text-[#1A1612] dark:text-white leading-[1.1] tracking-tight">
          {productName}
        </h1>

        <div className="flex items-baseline gap-2 sm:gap-4">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1612] dark:text-white">{productPrice}</div>
          {product?.discount > 0 && (
            <div className="text-lg text-[#A69D91] dark:text-gray-500 line-through font-light">
              ₹{(unitPrice / (1 - product.discount / 100)).toLocaleString()}
            </div>
          )}
        </div>
      </div>

      <p className="text-xs sm:text-sm md:text-base text-[#8C8276] dark:text-gray-400 leading-relaxed font-light max-w-xl">
        {productDetails}
      </p>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 py-3 sm:py-6 border-y border-[#F0EBE3] dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1A1612]/5 dark:bg-white/10 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-[#E5B876]" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1612] dark:text-white">Authentic</p>
            <p className="text-[9px] text-[#A69D91] dark:text-gray-500">Certified Product</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1A1612]/5 dark:bg-white/10 flex items-center justify-center">
            <Truck className="h-5 w-5 text-[#E5B876]" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1612] dark:text-white">Fast Shipping</p>
            <p className="text-[9px] text-[#A69D91] dark:text-gray-500">Expressed Delivery</p>
          </div>
        </div>
      </div>

      {/* Selection & Actions */}
      <div className="space-y-6 pb-24 sm:pb-0">
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <div className="flex items-center bg-white dark:bg-black border border-[#F0EBE3] dark:border-gray-800 rounded-xl sm:rounded-2xl p-0.5 sm:p-1 h-12 sm:h-14 w-32 sm:w-40 justify-between shadow-sm">
            <button
              onClick={decrement}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl hover:bg-[#FBF9F6] dark:hover:bg-gray-900 text-[#8C8276] transition-colors"
            >
              <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            <span className="text-sm sm:text-lg font-bold text-[#1A1612] dark:text-white">{quantity}</span>
            <button
              onClick={increment}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl hover:bg-[#FBF9F6] dark:hover:bg-gray-900 text-[#8C8276] transition-colors"
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={async () => {
                const result = await toggleWishlist(product.id);
                if (result.success) {
                  if (result.action === 'added') {
                    toast.success("Added to Wishlist");
                  } else {
                    toast.info("Removed from Wishlist");
                  }
                } else if (result.error) {
                  toast.error(result.error);
                }
              }}
              className={`h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-xl sm:rounded-2xl border transition-all shadow-sm ${inWishlist
                ? "bg-red-500 border-red-500 text-white"
                : "border-[#F0EBE3] dark:border-gray-800 bg-white dark:bg-black text-[#8C8276] hover:border-[#E5B876] dark:hover:border-[#E5B876] hover:text-[#E5B876] dark:hover:text-[#E5B876]"
                }`}
            >
              <Heart className={`h-5 w-5 sm:h-6 sm:w-6 ${inWishlist ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleShare}
              className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-xl sm:rounded-2xl border border-[#F0EBE3] dark:border-gray-800 bg-white dark:bg-black text-[#8C8276] hover:border-[#E5B876] dark:hover:border-[#E5B876] hover:text-[#E5B876] dark:hover:text-[#E5B876] transition-all shadow-sm"
            >
              <Share2 className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>

        <div className="fixed sm:static bottom-6 left-4 right-4 sm:left-0 sm:right-0 sm:bottom-0 p-0 sm:p-0 bg-[#1A1612]/95 dark:bg-white/95 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border border-[#E5B876]/30 sm:border-none z-50 rounded-2xl sm:rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.3)] sm:shadow-none overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-bottom-8">
          <Button
            onClick={handleAddToCart}
            className="w-full h-14 sm:h-16 bg-transparent hover:bg-white/10 dark:hover:bg-black/10 text-white dark:text-black rounded-none text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 sm:gap-4 transition-all active:scale-[0.98] group/btn"
          >
            <ShoppingBag className="h-5 w-5 text-[#E5B876] transition-transform group-hover/btn:-translate-y-0.5" />
            <span>Add to Cart — {totalPriceFormatted}</span>
          </Button>

          <div className="hidden sm:flex items-center justify-center gap-3 py-4">
            <div className="h-[1px] w-8 bg-[#F0EBE3] dark:bg-gray-800"></div>
            <p className="text-[10px] text-[#A69D91] dark:text-gray-500 uppercase tracking-[0.3em] font-bold text-center">
              Handcrafted Artisanal Excellence
            </p>
            <div className="h-[1px] w-8 bg-[#F0EBE3] dark:bg-gray-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;