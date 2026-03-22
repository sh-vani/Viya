import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShoppingBag, Heart, Star } from "lucide-react";
import { getTopPicks } from "@/lib/api/products";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/button";
import ProductCarousel from "@/components/content/ProductCarousel";
import { BASE_URL } from "@/lib/api";

const ExquisiteSelection = () => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getTopPicks();
                if (Array.isArray(data) && data.length > 0) {
                    const mappedProducts = data.map((item: any) => {
                        const productData = item.product || {};
                        const thumImg = item.thum_img || productData.thumbnail_image_source;

                        return {
                            id: item.product_id, // Use the actual product_id for details navigation
                            name: item.product_name || productData.product_name,
                            unit_price: item.min_sell_price || item.MaxSellingPrice || 0,
                            discount: item.discount || 0,
                            thumbnail_full_url: {
                                path: thumImg
                                    ? (thumImg.startsWith('http') ? thumImg : `${BASE_URL}${thumImg}`)
                                    : "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800"
                            }
                        };
                    });
                    setFeaturedProducts(mappedProducts); // Show all products
                }
            } catch (error) {
                console.error("Failed to fetch top picks:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="py-12 md:py-20 bg-white dark:bg-black">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                {/* Header Context */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
                    <div className="space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#E5B876]/10 dark:bg-[#E5B876]/20 rounded-full border border-[#E5B876]/20 dark:border-[#E5B876]/30">
                            <Sparkles className="h-3.5 w-3.5 text-[#E5B876]" />
                            <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5B876] font-bold">Premium Selection</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-[#1A1612] dark:text-white leading-[1.1]">
                            Exquisite <span className="italic text-[#E5B876] font-serif">Masterpieces.</span>
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-[#8C8276] dark:text-gray-400 font-bold">
                            Elevate Your Everyday Aesthetic
                        </p>
                    </div>
                    <Link
                        to="/new-arrivals"
                        className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1612] dark:text-white hover:text-[#E5B876] transition-all group border-b border-[#F0EBE3] dark:border-gray-800 pb-2 w-fit"
                    >
                        View Full Collection
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                    </Link>
                </div>

                {/* Scroller / Carousel */}
                <div className="relative">
                    <ProductCarousel products={featuredProducts} loading={loading} />
                </div>
            </div>
        </section>
    );
};

export default ExquisiteSelection;