import { Heart, X, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { BASE_URL } from "@/lib/api";

const Wishlist = () => {
    const { wishlistItems, loading, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [displayItems, setDisplayItems] = useState<any[]>([]);

    useEffect(() => {
        // Use wishlist items directly from the API
        console.log("✨ Wishlist Items to display:", wishlistItems);
        setDisplayItems(wishlistItems);
    }, [wishlistItems]);

    const handleRemoveFromWishlist = async (productId: number) => {
        const result = await toggleWishlist(productId);
        if (result.success) {
            toast.info("Removed from Wishlist");
        } else if (result.error) {
            toast.error(result.error);
        }
    };

    const handleAddToCart = (item: any) => {
        const productId = item.product_id || item.seller_product_id || item.id;
        addToCart(productId);
        toast.success("Added to Cart", {
            description: `${item.product_name || item.product?.product_name || 'Item'} has been added to your collection.`,
        });
        navigate("/cart");
    };

    if (loading) {
        return (
            <>
                <ViyaHeader />
                <main className="min-h-[80vh] flex items-center justify-center bg-[#FBF9F6] dark:bg-black px-4">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#E5B876] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-[#8C8276] dark:text-gray-400 font-display uppercase tracking-widest text-xs">Curating your desires...</p>
                    </div>
                </main>
                <ViyaFooter />
            </>
        );
    }

    return (
        <>
            <ViyaHeader />
            <main className="min-h-[90vh] bg-[#FBF9F6] dark:bg-black px-4 py-24 md:py-32">
                <div className="container mx-auto max-w-7xl">
                    <div className="mb-16 text-center">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#E5B876]/10 rounded-full border border-[#E5B876]/20 mb-6">
                            <Heart className="h-4 w-4 text-[#E5B876] fill-[#E5B876]" />
                            <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5B876] font-bold">Your Sanctuary</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-[#1A1612] dark:text-white">
                            Your <span className="italic text-[#E5B876]">Wishlist</span>
                        </h1>
                        <p className="text-[#8C8276] dark:text-gray-400 font-light mt-4 max-w-lg mx-auto leading-relaxed">
                            A curated sanctuary for the pieces that resonate with your spirit.
                        </p>
                    </div>

                    {displayItems.length === 0 ? (
                        /* ===== EMPTY WISHLIST UI ===== */
                        <div className="relative bg-white dark:bg-black rounded-[3rem] border border-[#F0EBE3] dark:border-gray-800 max-w-2xl w-full px-10 py-24 text-center mx-auto shadow-sm overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-[#E5B876]/20"></div>

                            <div className="w-24 h-15 rounded-full bg-[#FBF9F6] dark:bg-gray-900 flex items-center justify-center mx-auto mb-8 text-[#E5B876] relative">
                                <Heart className="h-10 w-10 absolute animate-pulse opacity-20 scale-150" />
                                <Heart className="h-10 w-10 relative z-10" />
                            </div>

                            <h2 className="text-3xl font-display font-bold text-[#1A1612] dark:text-white mb-4">Your sanctuary is quiet</h2>
                            <p className="text-[#8C8276] dark:text-gray-400 font-light mb-12 leading-relaxed max-w-sm mx-auto">
                                The pieces you love will wait for you here. Explore our collections and find what speaks to you.
                            </p>

                            <Link to="/new-arrivals">
                                <button className="bg-[#1A1612] hover:bg-[#2B1E0E] text-white h-16 px-12 rounded-2xl font-bold text-xs uppercase tracking-[0.3em] transition-all transform active:scale-95 shadow-xl flex items-center gap-3 mx-auto">
                                    Begin Exploring <ArrowRight size={14} />
                                </button>
                            </Link>

                            <div className="mt-16 grid grid-cols-3 gap-4 opacity-40 grayscale">
                                <div className="h-32 bg-[#FBF9F6] dark:bg-black rounded-2xl"></div>
                                <div className="h-32 bg-[#FBF9F6] dark:bg-black rounded-2xl shadow-inner flex items-center justify-center">
                                    <Sparkles className="text-[#E5B876] h-6 w-6" />
                                </div>
                                <div className="h-32 bg-[#FBF9F6] dark:bg-black rounded-2xl"></div>
                            </div>
                        </div>
                    ) : (
                        /* ===== FILLED WISHLIST UI ===== */
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                            {displayItems.map((item: any) => {
                                const productData = item.product || {};
                                const productDetail = productData.product || {};
                                
                                // Prioritize product-specific IDs over the record ID (item.id)
                                const productId = item.seller_product_id || item.product_id || productData.id || productDetail.id || item.id;
                                
                                const productName = productData.product_name || productDetail.product_name || item.product_name || 'Exquisite Piece';
                                const price = productData.min_sell_price || productDetail.min_sell_price || item.unit_price || 0;
                                const productPrice = `₹${price.toLocaleString()}`;
                                
                                // Image handling with multiple fallbacks for deep nesting
                                const imgPath = productData.thum_img || productDetail.thumbnail_image_source || item.thum_img;
                                const productImage = imgPath 
                                    ? (imgPath.startsWith('http') ? imgPath : `${BASE_URL}${imgPath}`)
                                    : '/placeholder.jpg';

                                return (
                                    <div key={item.id} className="group flex flex-col h-full bg-white dark:bg-black rounded-3xl overflow-hidden border border-[#F0EBE3] dark:border-gray-800 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                                        {/* Image wrapper */}
                                        <div className="relative aspect-square overflow-hidden bg-[#FBF9F6] dark:bg-gray-900">
                                            <Link to={`/product/${productId}`} className="block h-full w-full">
                                                <img
                                                    src={productImage}
                                                    alt={productName}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = '/placeholder.jpg';
                                                    }}
                                                />
                                            </Link>

                                            {/* Top right remove */}
                                            <button
                                                onClick={() => handleRemoveFromWishlist(productId)}
                                                className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#8C8276] dark:text-gray-400 hover:text-red-500 transition-all shadow-md hover:rotate-90"
                                                title="Remove from wishlist"
                                            >
                                                <X size={14} />
                                            </button>

                                            {/* Tag */}
                                            <div className="absolute top-3 left-3">
                                                <div className="bg-[#1A1612]/80 backdrop-blur-sm text-[#E5B876] text-[7px] font-bold tracking-[0.2em] px-3 py-1 rounded-full uppercase shadow-md">
                                                    Wishlist
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info area */}
                                        <div className="p-4 flex flex-col flex-grow">
                                            <div className="space-y-0.5 mb-3">
                                                <p className="text-[8px] uppercase tracking-[0.3em] text-[#E5B876] font-bold">Exquisite Selection</p>
                                                <Link to={`/product/${productId}`}>
                                                    <h3 className="text-base font-display font-bold text-[#1A1612] dark:text-white group-hover:text-[#E5B876] transition-colors line-clamp-1">{productName}</h3>
                                                </Link>
                                            </div>

                                            <div className="mt-auto pt-3 border-t border-[#F0EBE3] dark:border-gray-800">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        <p className="text-[8px] text-[#8C8276] dark:text-gray-400 uppercase tracking-widest font-bold mb-0.5">Price</p>
                                                        <p className="text-lg font-bold text-[#1A1612] dark:text-white">{productPrice}</p>
                                                    </div>
                                                    <div className="flex -space-x-1.5">
                                                        <div className="w-6 h-6 rounded-full bg-[#FBF9F6] dark:bg-gray-900 border border-[#F0EBE3] flex items-center justify-center">
                                                            <Sparkles size={10} className="text-[#E5B876]" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className="w-full h-11 bg-[#1A1612] hover:bg-[#2B1E0E] text-white rounded-xl text-[9px] uppercase tracking-[0.2em] font-bold transition-all transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
                                                >
                                                    <ShoppingBag size={12} />
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Footnote about wishlist persistence */}
                    <div className="mt-24 text-center border-t border-[#F0EBE3] dark:border-gray-800 pt-12">
                        <p className="text-[10px] text-[#A69D91] dark:text-gray-400 uppercase tracking-[0.3em] font-medium max-w-md mx-auto leading-relaxed">
                            Your selections are locally remembered. <br /> Sign in to sync your sanctuary across all devices.
                        </p>
                    </div>
                </div>
            </main>
            <ViyaFooter />
        </>
    );
};

export default Wishlist;
