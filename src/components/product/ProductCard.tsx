import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";

interface Product {
    id: number;
    name: string;
    category?: string;
    category_name?: string;
    price: string;
    unit_price?: number | string;
    selling_price?: string;
    discount?: number;
    image?: string;
    thumbnail_full_url?: { path: string };
    images_full_url?: Array<{ path: string }>;
    is_new?: boolean;
    isNew?: boolean;
}

interface ProductCardProps {
    product: Product;
    className?: string;
}

const ProductCard = ({ product, className = "" }: ProductCardProps) => {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = (e: React.MouseEvent, productId: number) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(productId, 1);
    };

    const handleWishlist = async (e: React.MouseEvent, productId: number) => {
        e.preventDefault();
        e.stopPropagation();
        const result = await toggleWishlist(productId);
        if (result.success) {
            if (result.action === 'added') {
                toast.success("Added to Wishlist");
            } else {
                toast.info("Removed from Wishlist");
            }
        } else if (result.error) {
            toast.error(result.error);
        }
    };

    const productImage = product.thumbnail_full_url?.path || product.image || product.images_full_url?.[0]?.path || "";
    const unitPrice = typeof product.unit_price === 'number' ? product.unit_price : (typeof product.unit_price === 'string' ? parseFloat(product.unit_price) : 0);
    const discount = product.discount || 0;
    const originalPrice = discount > 0 ? Math.round(unitPrice / (1 - discount / 100)) : 0;

    return (
        <div className={`group ${className}`}>
            <Link to={`/product/${product.id}`} className="block">
                <div className="border border-[#F0EBE3] dark:border-gray-800 bg-white dark:bg-black rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer overflow-hidden">
                    {/* Image Section */}
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-[#FAF8F5] to-[#F5F0E8] dark:from-gray-900 dark:to-gray-800 relative">
                        <img
                            src={productImage}
                            alt={product.name}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Discount Badge */}
                        {discount > 0 && (
                            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#E5B876] text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                                -{discount}% OFF
                            </div>
                        )}

                        {/* Wishlist Button */}
                        <button
                            onClick={async (e) => {
                                e.preventDefault(); // Prevent navigation
                                e.stopPropagation(); // Stop event propagation
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
                            className={`absolute top-2 right-2 sm:top-3 sm:right-3 h-7 w-7 sm:h-9 sm:w-9 flex items-center justify-center rounded-full border transition-all shadow-sm ${inWishlist
                                ? "bg-red-500 border-red-500 text-white"
                                : "border-[#F0EBE3] dark:border-gray-800 bg-white/90 backdrop-blur-sm text-[#8C8276] hover:border-[#E5B876] dark:hover:border-[#E5B876] hover:text-[#E5B876] dark:hover:text-[#E5B876]"
                                }`}
                        >
                            <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${inWishlist ? "fill-current" : ""}`} />
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="p-2 sm:p-3.5 space-y-1.5 sm:space-y-2.5">
                        <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={8} className="fill-[#FFBD2D] text-[#FFBD2D] sm:w-2.5 sm:h-2.5" />
                            ))}
                            <span className="text-[8px] sm:text-[9px] text-[#A69D91] dark:text-gray-400 font-semibold ml-1">(4.9)</span>
                        </div>

                        <h3 className="text-[13px] sm:text-sm md:text-base font-bold text-[#1A1612] dark:text-white leading-tight line-clamp-2 group-hover:text-[#E5B876] transition-colors duration-300 min-h-[32px] sm:min-h-0">
                            {product.name}
                        </h3>

                        {/* Price Section */}
                        <div className="flex items-center flex-wrap gap-1 sm:gap-2 pt-0.5 sm:pt-1">
                            <span className="text-sm sm:text-lg md:text-xl font-bold text-[#1A1612] dark:text-white">
                                ₹{unitPrice.toLocaleString()}
                            </span>
                            {discount > 0 && (
                                <span className="text-[10px] sm:text-sm text-[#A69D91] dark:text-gray-500 line-through font-medium">
                                    ₹{originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                            onClick={(e) => handleAddToCart(e, product.id)}
                            className="w-full h-7 sm:h-9 bg-[#1A1612] dark:bg-white hover:bg-[#E5B876] dark:hover:bg-[#E5B876] text-white dark:text-[#1A1612] hover:text-white rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg mt-0.5 sm:mt-1 px-0"
                        >
                            <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
                            <span className="truncate sm:hidden">Add</span>
                            <span className="truncate hidden sm:inline">Add to Cart</span>
                        </Button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;

