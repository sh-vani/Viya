import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getSliders } from "@/lib/api/products";

interface Slider {
    id: number;
    slider_image: string;
}

const HeroBanner = () => {
    const [sliders, setSliders] = useState<Slider[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                const sliderData = await getSliders();
                setSliders(sliderData);
            } catch (error) {
                console.error("Failed to fetch sliders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSliders();
    }, []);

    useEffect(() => {
        if (sliders.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [sliders.length]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + sliders.length) % sliders.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
    };

    const getImageUrl = (imagePath: string) => {
        return `https://amazadmin.viyacollective.com/${imagePath}`;
    };

    if (loading) {
        return (
            <section className="relative w-full">
                <div className="relative h-screen md:h-[100vh] overflow-hidden bg-gray-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-xl">Loading...</div>
                    </div>
                </div>
            </section>
        );
    }

    if (sliders.length === 0) {
        return (
            <section className="relative w-full">
                <div className="relative h-screen md:h-[100vh] overflow-hidden bg-gray-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-xl">No sliders available</div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative w-full">
            {/* Main Hero */}
            <div className="relative h-screen md:h-[100vh] overflow-hidden">
                {/* Slider Images */}
                {sliders.map((slider, index) => (
                    <div
                        key={slider.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={getImageUrl(slider.slider_image)}
                            alt={`Slider ${slider.id}`}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                ))}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

                {/* Navigation Arrows */}
                {sliders.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors z-10"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors z-10"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </>
                )}

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4 md:px-12 pt-20 md:pt-0">
                        <div className="max-w-2xl animate-fade-in-up">
                            <div className="inline-block px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full text-white text-[9px] md:text-xs font-medium tracking-[0.2em] uppercase mb-6 md:mb-8 border border-white/10">
                                New Collection 2025
                            </div>

                            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-7xl text-gold-300 font-medium leading-[0.9] mb-3 md:mb-4">
                                Own Your Glow
                            </h1>

                            <p className="font-display text-lg sm:text-xl md:text-4xl text-white/90 font-light mb-8 md:mb-12 tracking-wide">
                                VIYA Exclusive
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                                <Button
                                    className="bg-white hover:bg-neutral-100 text-black rounded-full h-auto py-2.5 md:py-3 px-3 md:px-3 pl-6 md:pl-8 group transition-all duration-300"
                                    asChild
                                >
                                    <Link to="/new-arrivals">
                                        <span className="text-[10px] md:text-sm font-semibold tracking-widest uppercase mr-3 md:mr-4">
                                            EXPLORE COLLECTION
                                        </span>
                                        <div className="bg-black rounded-full p-1.5 md:p-2 flex items-center justify-center transition-transform group-hover:translate-x-1">
                                            <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
                                        </div>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slider Indicators */}
                {sliders.length > 1 && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {sliders.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-white w-8'
                                    : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroBanner;




