import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Gem, Crown, Star } from "lucide-react";
import { getTopCategories } from "@/lib/api/products";
import { BASE_URL } from "@/lib/api";

const ExclusiveCollection = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getTopCategories();
                // Ensure we only deal with the top 3 for the curated look
                setCategories(data.slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="py-32 bg-[#FBF9F6] dark:bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E5B876]"></div>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#8C8276] font-bold">Curating Collections...</span>
                </div>
            </div>
        );
    }

    if (categories.length === 0) return null;

    const placeholders = [
        "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1200",
        "https://images.unsplash.com/photo-1627293033045-84222051610e?q=80&w=1200",
        "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200",
    ];

    const getImageUrl = (cat: any, index: number) => {
        if (cat.image) {
            return cat.image.startsWith('http') ? cat.image : `${BASE_URL}${cat.image}`;
        }
        return placeholders[index % placeholders.length];
    };

    return (
        <section className="py-24 md:py-32 bg-[#FBF9F6] dark:bg-black relative overflow-hidden">
            {/* Artistic Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E5B876]/5 rounded-full blur-[150px] -mr-96 -mt-96"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#E5B876]/5 rounded-full blur-[120px] -ml-64 -mb-64"></div>

            <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
                {/* Header Section - Refined Design */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
                    <div className="max-w-3xl space-y-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#1A1612]/5 dark:bg-white/10 rounded-full border border-[#1A1612]/10 dark:border-white/20 backdrop-blur-sm">
                            <Crown className="h-4 w-4 text-[#E5B876]" />
                            <span className="text-[10px] uppercase tracking-[0.4em] text-[#1A1612] dark:text-white font-black">CURATED EXCELLENCE</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-[#1A1612] dark:text-white leading-[0.9] tracking-tight">
                            Exclusive <br />
                            <span className="text-[#E5B876] italic font-serif pr-4">Curations.</span>
                        </h1>
                    </div>
                    <div className="max-w-md lg:pb-4">
                        <p className="text-base text-[#8C8276] dark:text-gray-400 font-light leading-relaxed mb-8">
                            Experience the pinnacle of jewelry design through our most celebrated collections, where every piece tells a story of elegance and timeless beauty.
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-black overflow-hidden bg-gray-200 shadow-lg">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1612] dark:text-white">Join 10k+ Connoisseurs</span>
                        </div>
                    </div>
                </div>

                {/* Enhanced Collections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[800px]">
                    {/* Primary Focus Category (Large) */}
                    <div className="lg:col-span-7 h-[500px] lg:h-full">
                        <CategoryCard
                            cat={categories[0]}
                            index={0}
                            isLarge
                            imageUrl={getImageUrl(categories[0], 0)}
                        />
                    </div>

                    {/* Right-side Stack (Secondary Items) */}
                    <div className="lg:col-span-5 flex flex-col gap-8 h-full">
                        {categories.slice(1, 3).map((cat, idx) => (
                            <div key={cat.id} className="flex-1 min-h-[300px]">
                                <CategoryCard
                                    cat={cat}
                                    index={idx + 1}
                                    imageUrl={getImageUrl(cat, idx + 1)}
                                />
                            </div>
                        ))}

                        {/* Placeholder for exactly 3-item UI balance if API returns fewer */}
                        {categories.length < 3 && (
                            <div className="flex-1 min-h-[300px] rounded-[3rem] bg-[#1A1612]/5 dark:bg-white/5 border border-dashed border-[#E5B876]/30 flex flex-col items-center justify-center text-center p-12 group transition-all duration-500 hover:bg-[#E5B876]/5">
                                <div className="w-16 h-16 rounded-full bg-[#E5B876]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-700">
                                    <Gem className="h-8 w-8 text-[#E5B876]/50" />
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.4em] text-[#8C8276] font-black">UNVEILING SOON</p>
                                <h4 className="text-2xl font-display font-medium text-[#1A1612]/30 dark:text-white/30 mt-3">Next Masterpiece Selection</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

/* Internal Sub-component for Enhanced Category Cards */
const CategoryCard = ({ cat, index, isLarge = false, imageUrl }: { cat: any, index: number, isLarge?: boolean, imageUrl: string }) => {
    return (
        <Link
            to={`/category/${cat.slug}`}
            className="group relative block w-full h-full overflow-hidden rounded-[3rem] border border-[#F0EBE3] dark:border-white/5 transition-all duration-700 hover:shadow-[0_50px_100px_-20px_rgba(229,184,118,0.25)]"
        >
            {/* Image Overlay & Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-[#1A1612] via-[#1A1612]/30 to-transparent ${isLarge ? 'opacity-90' : 'opacity-80'} group-hover:opacity-100 transition-opacity duration-500`} />
            </div>

            {/* Top Index Indicator */}
            <div className="absolute top-10 left-10 z-10 hidden sm:block">
                <div className="flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-[#E5B876]/50"></span>
                    <span className="text-[10px] font-black tracking-[0.5em] text-[#E5B876]">0{index + 1} / DISCOVER</span>
                </div>
            </div>

            {/* Label/Badge */}
            {isLarge && (
                <div className="absolute top-10 right-10 z-10">
                    <div className="bg-[#E5B876] px-4 py-1.5 rounded-full flex items-center gap-2 shadow-2xl">
                        <Star size={12} fill="#1A1612" className="text-[#1A1612]" />
                        <span className="text-[9px] font-black text-[#1A1612] uppercase tracking-widest">Master Selection</span>
                    </div>
                </div>
            )}

            {/* Text Content */}
            <div className={`absolute bottom-0 left-0 right-0 p-10 md:p-14 z-10 transition-all duration-700 group-hover:pb-16`}>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h3 className={`${isLarge ? 'text-4xl md:text-6xl lg:text-7xl' : 'text-3xl md:text-4xl'} font-display font-medium text-white leading-tight capitalize group-hover:text-[#E5B876] transition-colors duration-500`}>
                            {cat.name} <br />
                            <span className="italic font-serif opacity-80">Collection.</span>
                        </h3>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-8 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-700 delay-150">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white">
                            View Collection
                            <ArrowRight className="h-4 w-4 text-[#E5B876] transition-transform group-hover:translate-x-3" />
                        </div>
                        <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:border-[#E5B876] transition-colors duration-500">
                            <Sparkles size={16} className="text-[#E5B876]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom-right Discovery Glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#E5B876]/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        </Link>
    );
};

export default ExclusiveCollection;


