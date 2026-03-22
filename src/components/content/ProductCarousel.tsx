import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import ProductCard from "@/components/product/ProductCard";

interface Product {
    id: number;
    name: string;
    category?: string;
    category_name?: string;
    price: string;
    unit_price?: string;
    selling_price?: string;
    image?: string;
    images_full_url?: Array<{ path: string }>;
    is_new?: boolean;
    isNew?: boolean;
}

interface ProductCarouselProps {
    products?: Product[];
    loading?: boolean;
}

const ProductCarousel = ({ products = [], loading = false }: ProductCarouselProps) => {
    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-[#F0EBE3] dark:border-gray-800 bg-white dark:bg-black">
                        <div className="aspect-square bg-gradient-to-br from-[#FAF8F5] to-[#F0EBE3] dark:from-gray-900 dark:to-gray-800 animate-pulse"></div>
                        <div className="p-2 sm:p-3.5 space-y-1.5 sm:space-y-2.5">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-2.5 h-2.5 rounded-full bg-[#F0EBE3] dark:bg-gray-700 animate-pulse"></div>)}
                            </div>
                            <div className="h-4 bg-[#F0EBE3] dark:bg-gray-700 animate-pulse rounded-lg w-3/4"></div>
                            <div className="h-6 bg-[#F0EBE3] dark:bg-gray-700 animate-pulse rounded-lg w-1/2"></div>
                            <div className="h-7 sm:h-9 bg-[#F0EBE3] dark:bg-gray-700 animate-pulse rounded-xl w-full mt-1"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!products || products.length === 0) return null;

    return (
        <div className="w-full relative">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                    dragFree: false,
                    containScroll: "trimSnaps"
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-5">
                    {products.map((product) => {
                        return (
                            <CarouselItem
                                key={product.id}
                                className="pl-3 sm:pl-5 basis-1/2 md:basis-1/3 lg:basis-1/4"
                            >
                                <ProductCard product={product} />
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                {/* Premium Navigation Arrows */}
                <CarouselPrevious
                    className="absolute -left-4 md:-left-5 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border-2 border-[#E5B876]/30 bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:bg-[#E5B876] hover:border-[#E5B876] hover:text-white dark:hover:bg-[#E5B876] transition-all duration-300 hover:scale-110 text-[#1A1612] dark:text-white disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-white z-10"
                />
                <CarouselNext
                    className="absolute -right-4 md:-right-5 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border-2 border-[#E5B876]/30 bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:bg-[#E5B876] hover:border-[#E5B876] hover:text-white dark:hover:bg-[#E5B876] transition-all duration-300 hover:scale-110 text-[#1A1612] dark:text-white disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-white z-10"
                />
            </Carousel>
        </div>
    );
};

export default ProductCarousel;

