
import React from "react";
import { Link } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { getCategoryList } from "@/lib/api/products";
import { BASE_URL } from "@/lib/api";

const recentProducts: any[] = [];

const BrandSection = () => {
    const [categories, setCategories] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const autoplay = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: "start",
            loop: true,
            slidesToScroll: 1,
            breakpoints: {
                "(min-width: 1024px)": { slidesToScroll: 1 },
            },
        },
        [autoplay.current]
    );

    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategoryList();
                if (data && Array.isArray(data.data)) {
                    setCategories(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (loading) {
        return (
            <div className="py-20 flex justify-center items-center">
                <div className="w-10 h-10 border-4 border-[#E5B876] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (categories.length === 0) return null;

    return (
        <section className="py-20 bg-[#f9f5f0] dark:bg-black overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header content */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-display text-[#1a1a1a] dark:text-white mb-3">
                        Exquisite <span className="text-[#E5B876]">Collections</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 font-light tracking-wide italic">
                        Explore our curated categories
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative group max-w-7xl mx-auto">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-6">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] xl:flex-[0_0_24%]"
                                >
                                    <div className="bg-white dark:bg-black rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col group/card">
                                        {/* Image Area */}
                                        <Link to={`/category/${category.slug}`} className="relative aspect-[4/5] bg-[#f8f8f8] dark:bg-gray-900 overflow-hidden group/img block">
                                            <img
                                                src={category.category_image?.image ? (category.category_image.image.startsWith('http') ? category.category_image.image : `${BASE_URL}${category.category_image.image}`) : "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800"}
                                                alt={category.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                                            />
                                        </Link>

                                        {/* Category Info */}
                                        <div className="p-4 flex flex-col flex-grow bg-white dark:bg-black items-center">
                                            <Link to={`/category/${category.slug}`}>
                                                <h3 className="text-[14px] md:text-[16px] font-bold uppercase tracking-widest text-[#1a1a1a] dark:text-white mb-auto line-clamp-2 leading-snug group-hover/card:text-[#E5B876] transition-colors">
                                                    {category.name}
                                                </h3>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-[-15px] md:left-[-30px] top-1/2 -translate-y-1/2 w-10 md:h-12 md:w-12 h-10 bg-[#E5B876] rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 z-10"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                    </button>

                    <button
                        onClick={scrollNext}
                        className="absolute right-[-15px] md:right-[-30px] top-1/2 -translate-y-1/2 w-10 md:h-12 md:w-12 h-10 bg-[#E5B876] rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 z-10"
                    >
                        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BrandSection;
