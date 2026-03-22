import { useState } from "react";
import ImageZoom from "./ImageZoom";
import { Maximize2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface ProductImageGalleryProps {
    product: any;
}

const ProductImageGallery = ({ product }: ProductImageGalleryProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const [zoomIndex, setZoomIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const productImages = product?.images_full_url?.map((img: any) => img.path) || [];

    const openZoom = (index: number) => {
        setZoomIndex(index);
        setIsZoomOpen(true);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left - window.scrollX) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;
        setMousePos({ x, y });
    };

    return (
        <div className="w-full space-y-3 sm:space-y-6 animate-in fade-in slide-in-from-left-4 duration-1000">
            {/* Main Image View */}
            <div className="relative group">
                <div className="absolute top-6 left-6 z-10">
                    <div className="bg-[#1A1612]/90 backdrop-blur-md text-white text-[9px] font-bold tracking-[0.3em] px-4 py-2 rounded-full uppercase border border-white/10 flex items-center gap-2">
                        <Sparkles size={10} className="text-[#E5B876]" />
                        Viya Exclusive
                    </div>
                </div>

                <div
                    className="relative aspect-square sm:aspect-[4/5] w-full bg-white rounded-3xl md:rounded-[3rem] overflow-hidden cursor-zoom-in border border-[#F0EBE3] shadow-sm transition-all duration-500 hover:shadow-2xl"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onMouseMove={handleMouseMove}
                    onClick={() => openZoom(currentIndex)}
                >
                    <img
                        src={productImages[currentIndex]}
                        alt={product?.name || "Product image"}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${isHovering ? "opacity-0" : "opacity-100"}`}
                    />

                    {/* Magnified View */}
                    {isHovering && (
                        <div
                            className="absolute inset-0 w-full h-full bg-no-repeat pointer-events-none transition-opacity duration-300"
                            style={{
                                backgroundImage: `url(${productImages[currentIndex]})`,
                                backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                                backgroundSize: '250%'
                            }}
                        />
                    )}

                    {/* Action Overlay */}
                    <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <button className="h-10 w-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#1A1612] hover:bg-white shadow-lg">
                            <Maximize2 size={16} />
                        </button>
                    </div>
                </div>

                {/* Navigation Controls */}
                {productImages.length > 1 && (
                    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                        <button
                            onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + productImages.length) % productImages.length); }}
                            className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white pointer-events-auto shadow-xl"
                        >
                            <ChevronLeft size={20} className="text-[#1A1612]" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % productImages.length); }}
                            className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white pointer-events-auto shadow-xl"
                        >
                            <ChevronRight size={20} className="text-[#1A1612]" />
                        </button>
                    </div>
                )}
            </div>

            {/* Thumbnail Carousel */}
            {productImages.length > 1 && (
                <div className="relative">
                    <Carousel
                        opts={{ align: "start", dragFree: true }}
                        className="w-full"
                    >
                        <CarouselContent className="gap-3">
                            {productImages.map((img: string, index: number) => (
                                <CarouselItem key={index} className="basis-1/4 md:basis-1/6 lg:basis-1/8">
                                    <button
                                        onClick={() => setCurrentIndex(index)}
                                        className={`relative aspect-square w-full overflow-hidden rounded-xl border-2 transition-all duration-300 transform ${
                                            currentIndex === index
                                                ? "border-[#E5B876] scale-105 shadow-lg"
                                                : "border-[#F0EBE3] opacity-60 hover:opacity-100 hover:scale-105"
                                        }`}
                                    >
                                        <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                                        {currentIndex === index && (
                                            <div className="absolute inset-0 bg-[#E5B876]/10 pointer-events-none"></div>
                                        )}
                                    </button>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            )}

            <ImageZoom
                images={productImages}
                initialIndex={zoomIndex}
                isOpen={isZoomOpen}
                onClose={() => setIsZoomOpen(false)}
            />
        </div>
    );
};

export default ProductImageGallery;

