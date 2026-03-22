import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Gift, Sparkles, Star, ArrowRight, Check, Package, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProductCard from "@/components/product/ProductCard";
import { getProductsByCategory } from "@/lib/api/products";
import { BASE_URL } from "@/lib/api";
import { Loader2 } from "lucide-react";

const ComboPage = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [products, setProducts] = useState<any[]>([]);
    const [subCategories, setSubCategories] = useState<any[]>([]);
    const [categoryData, setCategoryData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComboData = async () => {
            setLoading(true);
            try {
                const response = await getProductsByCategory(6); // Category 6 is Combo
                if (response?.data) {
                    setCategoryData(response.data);
                    const productsList = response.data.AllProducts || [];
                    const mapped = productsList.map((item: any) => {
                        const productData = item.product || {};
                        const thumImg = item.thum_img || productData.thumbnail_image_source;
                        return {
                            id: item.product_id || item.id,
                            name: item.product_name || productData.product_name,
                            unit_price: item.min_sell_price || item.MaxSellingPrice || item.max_sell_price || 0,
                            discount: item.discount || 0,
                            category_id: item.category_id || productData.category_id,
                            thumbnail_full_url: {
                                path: thumImg ? (thumImg.startsWith('http') ? thumImg : `${BASE_URL}${thumImg}`) : "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800"
                            }
                        };
                    });
                    setProducts(mapped);
                    setSubCategories(response.data.sub_categories || []);
                }
            } catch (error) {
                console.error("Failed to fetch combo data:", error);
                toast.error("Failed to load curated combos.");
            } finally {
                setLoading(false);
            }
        };

        fetchComboData();
    }, []);

    const filteredProducts = activeTab === "all"
        ? products
        : products.filter(p => p.category_id === parseInt(activeTab));

    return (
        <div className="min-h-screen bg-[#FBF9F6] dark:bg-black">
            <ViyaHeader />

            <main className="pt-24 lg:pt-28">
                {/* ULTRA-PREMIUM HERO SECTION */}
                <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden mb-20">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[#1A1612]"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#2D241A_0%,transparent_60%)]"></div>
                        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,#3D2E1E_0%,transparent_60%)]"></div>

                        {/* Immersive Imagery */}
                        <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-40 lg:opacity-60 hidden md:block">
                            <img
                                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000&auto=format&fit=crop"
                                className="w-full h-full object-cover mix-blend-luminosity"
                                alt="Luxury Gifting"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1612] via-[#1A1612]/40 to-transparent"></div>
                        </div>

                        {/* Floating ambient lights */}
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E5B876]/10 rounded-full blur-[120px] animate-pulse"></div>
                    </div>

                    <div className="container mx-auto max-w-7xl relative z-10 px-4 md:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-10 text-left animate-in fade-in slide-in-from-left-12 duration-1000">
                                <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-[#E5B876]/10 rounded-full border border-[#E5B876]/20 backdrop-blur-md">
                                    <Sparkles className="h-4 w-4 text-[#E5B876]" />
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5B876] font-black">Prestige Bundles • Limited</span>
                                </div>
                                <div className="space-y-4">
                                    <h1 className="text-5xl md:text-8xl font-display font-medium text-white leading-[0.9] tracking-tighter">
                                        The Art of <br />
                                        <span className="text-[#E5B876] font-serif italic pr-4">Connection.</span>
                                    </h1>
                                    <p className="max-w-md text-[#A69D91] text-base md:text-lg leading-relaxed font-light">
                                        Curated ensembles designed to celebrate the profound bonds of life, captured in solid gold and artisanal gemstones.
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-8 pt-4">
                                    <Button className="h-16 px-10 bg-[#E5B876] hover:bg-white hover:text-[#1A1612] text-[#1A1612] rounded-2xl text-[11px] uppercase tracking-[0.4em] font-black transition-all shadow-[0_20px_40px_-10px_rgba(229,184,118,0.3)]">
                                        Explore Collections
                                    </Button>
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-12 h-12 rounded-full border-2 border-[#1A1612] overflow-hidden bg-[#2D241A] shadow-xl">
                                                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Connoisseur" />
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Feature Display Card */}
                            <div className="relative hidden lg:block animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
                                <div className="relative z-10 p-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform hover:scale-[1.02] transition-transform duration-700 overflow-hidden group">
                                    <img
                                        src={categoryData?.category_image?.image
                                            ? (categoryData.category_image.image.startsWith('http') ? categoryData.category_image.image : `${BASE_URL}${categoryData.category_image.image}`)
                                            : "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop"
                                        }
                                        className="w-full h-[520px] object-cover rounded-[3rem] transition-transform duration-1000 group-hover:scale-110"
                                        alt="Feature Combo"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-[#F0EBE3] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-[9px] text-[#E5B876] font-black tracking-[0.3em] uppercase mb-1">Crowning Piece</p>
                                                <h3 className="text-2xl font-display font-medium text-[#1A1612]">{categoryData?.name || "The Eternal Couple Duo"}</h3>
                                            </div>
                                            <div className="bg-[#E5B876]/10 px-3 py-1 rounded-full">
                                                <span className="text-[10px] font-black text-[#E5B876]">TOP TIER</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    {/* SOPHISTICATED NAVIGATION */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20 pb-10 border-b border-[#F0EBE3] dark:border-gray-800">
                        <div className="space-y-1 text-center md:text-left">
                            <h2 className="text-3xl font-display font-medium text-[#1A1612] dark:text-white">Refine your <span className="italic text-[#E5B876]">Selection</span></h2>
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91] dark:text-gray-400">Curating perfect synergy</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => setActiveTab("all")}
                                className={`h-12 px-8 rounded-2xl text-[10px] uppercase tracking-[0.3em] font-black transition-all border-2 ${activeTab === "all"
                                    ? "bg-[#1A1612] text-white border-[#1A1612] shadow-xl scale-105"
                                    : "bg-white dark:bg-black text-[#8C8276] dark:text-gray-400 border-[#F0EBE3] dark:border-gray-800 hover:border-[#E5B876] hover:text-[#E5B876]"
                                    }`}
                            >
                                Whole Realm
                            </button>
                            {subCategories.map((sub) => (
                                <button
                                    key={sub.id}
                                    onClick={() => setActiveTab(sub.id.toString())}
                                    className={`h-12 px-8 rounded-2xl text-[10px] uppercase tracking-[0.3em] font-black transition-all border-2 ${activeTab === sub.id.toString()
                                        ? "bg-[#1A1612] text-white border-[#1A1612] shadow-xl scale-105"
                                        : "bg-white dark:bg-black text-[#8C8276] dark:text-gray-400 border-[#F0EBE3] dark:border-gray-800 hover:border-[#E5B876] hover:text-[#E5B876]"
                                        }`}
                                >
                                    {sub.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* PRODUCT GRID - UNIFIED CARD DESIGN */}
                    <div className="pb-32">
                        <div className="mb-12 text-center space-y-4">
                            <h2 className="text-3xl md:text-5xl font-display font-medium text-[#1A1612] dark:text-white">
                                Curated <span className="text-[#E5B876] italic font-serif">Combos.</span>
                            </h2>
                            <p className="text-[#8C8276] dark:text-gray-400 text-sm md:text-base font-light max-w-md mx-auto">
                                Discover our exclusive bundles designed to create perfect harmony.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-6">
                            {loading ? (
                                <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4">
                                    <Loader2 className="h-10 w-10 animate-spin text-[#E5B876]" />
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#A69D91] font-black animate-pulse">Summoning Curations...</p>
                                </div>
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center space-y-4 bg-white/50 dark:bg-white/5 rounded-[3rem] border border-dashed border-[#F0EBE3] dark:border-gray-800">
                                    <Sparkles className="h-8 w-8 text-[#E5B876]/20 mx-auto" />
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#A69D91] font-black">Awaiting Curations in this Realm</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* PRESTIGE GIFTING EXPERIENCE */}
                    <section className="mb-40">
                        <div className="mb-20 text-center space-y-4">
                            <h2 className="text-4xl md:text-6xl font-display font-medium text-[#1A1612] dark:text-white">
                                The Art of <span className="italic text-[#E5B876] font-serif">Giving.</span>
                            </h2>
                            <p className="max-w-xl mx-auto text-[#8C8276] dark:text-gray-400 font-light italic">
                                "A gift from Viya isn't just an object; it's a legacy wrapped in silk and Histor."
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { title: "Heirloom Packaging", desc: "Arrives in our signature hand-painted lacquer box, lined with the finest velvet.", icon: <Package className="w-6 h-6" /> },
                                { title: "Couture Messaging", desc: "Elegantly hand-calligraphed personalized notes on handmade deckled paper.", icon: <Sparkles className="w-6 h-6" /> },
                                { title: "Insured Transit", desc: "Complimentary priority shipping with full white-glove insurance globally.", icon: <ShieldCheck className="w-6 h-6" /> },
                                { title: "Eternal Stewardship", desc: "Includes a lifetime care certificate and annual restoration at our atelier.", icon: <Star className="w-6 h-6" /> }
                            ].map((feature, i) => (
                                <div key={i} className="text-center space-y-4 p-10 bg-white dark:bg-black rounded-[3rem] border border-[#F0EBE3] dark:border-gray-800 transition-all hover:shadow-xl hover:border-[#E5B876]/20 relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-[#E5B876]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                                    <div className="w-16 h-16 bg-[#1A1612] rounded-2xl flex items-center justify-center text-[#E5B876] mx-auto mb-6 shadow-xl transition-transform duration-500 group-hover:rotate-6">
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#1A1612] dark:text-white">{feature.title}</h4>
                                    <p className="text-xs text-[#8C8276] dark:text-gray-400 font-light leading-relaxed px-2">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* IMMERSIVE BRAND BANNER */}
                    <section className="mb-40">
                        <div className="bg-[#1A1612] rounded-[4rem] overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]">
                            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-40">
                                <img
                                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop"
                                    className="w-full h-full object-cover mix-blend-luminosity"
                                    alt="Packaging Excellence"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#1A1612] via-[#1A1612]/60 to-transparent"></div>
                            </div>

                            <div className="p-12 md:p-24 lg:p-32 relative z-10 max-w-3xl space-y-10">
                                <div className="space-y-4">
                                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#E5B876] font-black block">The Viya Standard</span>
                                    <h2 className="text-4xl md:text-7xl font-display font-medium text-white leading-[1.1]">
                                        Transcend the Ordinary <br /> <span className="text-[#E5B876] italic font-serif">In Every Unboxing.</span>
                                    </h2>
                                </div>
                                <p className="text-[#A69D91] text-lg leading-relaxed font-light max-w-xl">
                                    Every combo selection is meticulously hand-inspected by our head of craft, ensuring that each piece resonates in perfect harmony before being sealed for its journey to you.
                                </p>

                                <div className="flex flex-wrap gap-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5B876] shadow-2xl backdrop-blur-md">
                                            <Check size={18} />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-white font-black">Lacquer Craft</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5B876] shadow-2xl backdrop-blur-md">
                                            <Check size={18} />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-white font-black">Deckled Notes</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5B876] shadow-2xl backdrop-blur-md">
                                            <Check size={18} />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-white font-black">Secure Passage</span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative ambient glow */}
                            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E5B876]/5 rounded-full blur-[100px]"></div>
                        </div>
                    </section>
                </div>
            </main>

            <ViyaFooter />
        </div>
    );
};

export default ComboPage;
