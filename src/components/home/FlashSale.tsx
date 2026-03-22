import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Zap, ArrowRight, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";
import { getFlashDeal } from "@/lib/api/products";
import { BASE_URL } from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const FlashSale = () => {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const [loading, setLoading] = useState(true);
    const [flashDealData, setFlashDealData] = useState<any>(null);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const fetchDeal = async () => {
            try {
                const response = await getFlashDeal();
                if (response && response.flash_deal) {
                    setFlashDealData(response.flash_deal);
                }
            } catch (error) {
                console.error("Error loading flash deal:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDeal();
    }, []);

    useEffect(() => {
        if (!flashDealData?.end_date) return;

        const calculateTime = () => {
            const difference = +new Date(flashDealData.end_date) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(calculateTime, 1000);
        calculateTime();

        return () => clearInterval(timer);
    }, [flashDealData]);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (loading) {
        return (
            <div className="py-24 bg-[#110E0B] text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#E5B876]"></div>
            </div>
        );
    }

    if (!flashDealData) return null;

    const products = flashDealData.AllProducts?.data || [];

    return (
        <section className="py-24 bg-[#110E0B] text-white relative overflow-hidden">
            {/* Artistic Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E5B876]/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E5B876]/5 rounded-full blur-[120px] -ml-64 -mb-64"></div>

            <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
                {/* Flash Sale Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#E5B876] text-[#110E0B] text-[10px] font-bold uppercase tracking-[0.3em] mb-8 animate-pulse shadow-[0_0_30px_rgba(229,184,118,0.3)]">
                        <Zap size={14} fill="currentColor" />
                        Live: Flash Sale
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-medium mb-4 sm:mb-6 leading-tight">
                        Limited Time <span className="text-[#E5B876] italic font-serif">Luxury.</span>
                    </h2>
                    <p className="text-[#A69D91] font-light max-w-lg mx-auto mb-8 sm:mb-12 text-xs sm:text-sm md:text-base tracking-wide">
                        {flashDealData.title || "Exceptional craftsmanship meet extraordinary value."} These pieces will be gone in...
                    </p>

                    {/* Countdown Timer */}
                    <div className="flex gap-2 sm:gap-4 md:gap-6">
                        {[
                            { label: "DAYS", value: timeLeft.days },
                            { label: "HOURS", value: timeLeft.hours },
                            { label: "MINUTES", value: timeLeft.minutes },
                            { label: "SECONDS", value: timeLeft.seconds },
                        ].map((unit, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white flex items-center justify-center mb-1 sm:mb-2 rounded-lg">
                                    <span className="text-xl sm:text-3xl md:text-4xl font-bold text-black">
                                        {unit.value.toString().padStart(2, "0")}
                                    </span>
                                </div>
                                <span className="text-xs font-medium text-gray-400 uppercase">
                                    {unit.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Carousel Area (Embla) */}
                <div className="md:hidden block relative mx-auto w-full max-w-sm bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] pb-8 pt-6 mb-8 mt-4">
                    <div className="text-center bg-white rounded-t-xl px-4">
                        <h3 className="text-xl font-serif text-black uppercase tracking-[0.15em] font-medium inline-block border-b border-[#E5B876]/30 pb-2 mb-8">
                            Limited Time <span className="text-[#E5B876]">Luxury.</span>
                        </h3>
                    </div>
                    
                    <div className="overflow-hidden bg-white px-0" ref={emblaRef}>
                        <div className="flex">
                            {products.map((item: any) => {
                                const product = item.product;
                                if (!product) return null;
                                
                                const productImage = product.product?.thumbnail_image_source
                                    ? (product.product.thumbnail_image_source.startsWith('http') ? product.product.thumbnail_image_source : `${BASE_URL}${product.product.thumbnail_image_source}`)
                                    : (product.image || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000");

                                const rawPrice = product.product?.min_sell_price || product.min_sell_price || 0;
                                const unitPrice = typeof rawPrice === 'number' ? rawPrice : parseFloat(rawPrice);
                                const discount = item.discount || 0;
                                const originalPrice = discount > 0 ? Math.round(unitPrice / (1 - discount / 100)) : 0;

                                return (
                                    <div key={item.id} className="flex-[0_0_100%] min-w-0 relative px-5">
                                        <Link to={`/product/${product.id}`} className="flex flex-col items-center">
                                            <div className="w-full aspect-square overflow-hidden rounded-xl mb-4 bg-[#FAF8F5] shadow-sm relative group p-2 border border-gray-100/50">
                                                <img 
                                                    src={productImage} 
                                                    alt={product.product_name}
                                                    className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </div>
                                            <h4 className="text-[#1A1612] text-xs sm:text-sm uppercase tracking-widest font-semibold text-center border-b-[1px] border-[#1A1612]/30 pb-1.5 w-max max-w-full truncate px-3 mt-1 hover:text-[#E5B876] transition-colors mb-2">
                                                {product.product_name || "EXCLUSIVE JEWELRY"}
                                            </h4>
                                            
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-sm sm:text-lg font-bold text-[#1A1612]">
                                                    ₹{unitPrice.toLocaleString()}
                                                </span>
                                                {discount > 0 && (
                                                    <span className="text-[10px] text-[#A69D91] line-through font-medium mt-0.5">
                                                        ₹{originalPrice.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>

                                            <button 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    addToCart(product.id, 1);
                                                    toast.success("Added to Collection");
                                                }}
                                                className="w-full bg-[#110E0B] text-white py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                                            >
                                                <ShoppingBag size={14} className="text-[#E5B876]" />
                                                Add to Cart
                                            </button>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Navigation Arrows Overlay */}
                    <button 
                        onClick={scrollPrev}
                        className="absolute left-1.5 top-[58%] -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] rounded-full flex items-center justify-center text-[#1A1612] hover:bg-gray-50 hover:text-[#E5B876] hover:scale-105 z-10 transition-all active:scale-95 border border-gray-100"
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft size={22} strokeWidth={2} />
                    </button>
                    <button 
                        onClick={scrollNext}
                        className="absolute right-1.5 top-[58%] -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] rounded-full flex items-center justify-center text-[#1A1612] hover:bg-gray-50 hover:text-[#E5B876] hover:scale-105 z-10 transition-all active:scale-95 border border-gray-100"
                        aria-label="Next Slide"
                    >
                        <ChevronRight size={22} strokeWidth={2} />
                    </button>
                </div>

                {/* Product Grid (Desktop Only) */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 pb-4">
                    {products.map((item: any) => {
                        const product = item.product;
                        if (!product) return null;

                        // Map flash deal product data to ProductCard structure
                        const mappedProduct = {
                            id: product.id,
                            name: product.product_name,
                            unit_price: product.product?.min_sell_price || product.min_sell_price || 0,
                            discount: item.discount || 0,
                            thumbnail_full_url: {
                                path: product.product?.thumbnail_image_source
                                    ? (product.product.thumbnail_image_source.startsWith('http') ? product.product.thumbnail_image_source : `${BASE_URL}${product.product.thumbnail_image_source}`)
                                    : (product.image || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000")
                            }
                        };

                        return (
                            <ProductCard key={item.id} product={mappedProduct as any} />
                        );
                    })}
                </div>

                <div className="mt-20 text-center">
                    <Link
                        to="/new-arrivals"
                        className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-[#A69D91] hover:text-[#E5B876] transition-all group"
                    >
                        Explore Exclusive Offers
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-3" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FlashSale;
