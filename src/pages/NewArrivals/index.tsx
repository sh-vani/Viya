import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Sparkles, Star, ArrowRight, Filter, Bookmark, Gem, Zap, Crown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTopPicks, getProductsByCategory, getTopCategories } from "@/lib/api/products";
import { useWishlist } from "@/hooks/useWishlist";
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BASE_URL } from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";

const NewArrivals = () => {
    const [productsList, setProductsList] = useState<any[]>([]);
    const [categoryData, setCategoryData] = useState<any>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<string | number>("all");
    const [sortOption, setSortOption] = useState<string>("featured");
    const [loading, setLoading] = useState(true);
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = (product: any) => {
        addToCart(product.id);
        toast.success("Added to Collection", {
            description: `${product.name} has been added to your cart.`,
        });
        navigate("/cart");
    };

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getTopCategories();
                if (Array.isArray(data)) {
                    setCategories([
                        { id: "all", name: "All Items" },
                        ...data.map((cat: any) => ({ id: cat.id, name: cat.name }))
                    ]);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Fetch products when activeTab changes
    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            try {
                let products = [];
                if (activeTab === "all") {
                    const data = await getTopPicks();
                    products = Array.isArray(data) ? data : [];
                } else {
                    const response = await getProductsByCategory(activeTab);
                    if (response && response.data) {
                        setCategoryData(response.data);
                        products = response.data.AllProducts || [];
                    }
                }

                const mapped = products.map((item: any) => {
                    const productData = item.product || {};
                    const thumImg = item.thum_img || productData.thumbnail_image_source;
                    return {
                        id: item.product_id || item.id,
                        name: item.product_name || productData.product_name,
                        unit_price: item.min_sell_price || item.MaxSellingPrice || item.max_sell_price || 0,
                        discount: item.discount || 0,
                        thumbnail_full_url: {
                            path: thumImg ? (thumImg.startsWith('http') ? thumImg : `${BASE_URL}${thumImg}`) : "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800"
                        }
                    };
                });
                setProductsList(mapped);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [activeTab]);

    const heroImage = categoryData?.category_image?.image
        ? (categoryData.category_image.image.startsWith('http') ? categoryData.category_image.image : `${BASE_URL}${categoryData.category_image.image}`)
        : "https://images.unsplash.com/photo-1573408302021-996be61bc39b?q=80&w=2000&auto=format&fit=crop";

    const getSortedProducts = () => {
        let sorted = [...productsList];
        if (sortOption === "price-low") {
            sorted.sort((a, b) => a.unit_price - b.unit_price);
        } else if (sortOption === "price-high") {
            sorted.sort((a, b) => b.unit_price - a.unit_price);
        } else if (sortOption === "newest") {
            sorted.sort((a, b) => b.id - a.id);
        }
        return sorted;
    };

    const sortedProductsList = getSortedProducts();

    return (
        <div className="min-h-screen bg-[#FBF9F6] dark:bg-black">
            <ViyaHeader />

            <main className="pt-24 lg:pt-28">
                {/* NEW CONNECTION BLACK SECTION */}
                <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden mb-12">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[#1A1612]"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#2D241A_0%,transparent_60%)]"></div>
                        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,#3D2E1E_0%,transparent_60%)]"></div>

                        {/* Immersive Imagery */}
                        <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-40 lg:opacity-60 hidden md:block">
                            <img
                                src={heroImage}
                                className="w-full h-full object-cover mix-blend-luminosity"
                                alt={categoryData?.name || "New Jewelry Collection"}
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
                                    <Zap className="h-4 w-4 text-[#E5B876]" />
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5B876] font-black">JUST DROPPED • {categoryData?.name?.toUpperCase() || "LIMITED EDITION"}</span>
                                </div>
                                <div className="space-y-4">
                                    <h1 className="text-5xl md:text-8xl font-display font-medium text-white leading-[0.9] tracking-tighter">
                                        Latest <br />
                                        <span className="text-[#E5B876] font-serif italic pr-4">{categoryData?.name || "Masterpieces"}.</span>
                                    </h1>
                                    <p className="max-w-md text-[#A69D91] text-base md:text-lg leading-relaxed font-light">
                                        Discover our latest {categoryData?.name?.toLowerCase() || "masterpieces"}—freshly crafted treasures that define tomorrow's classics.
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-8 pt-4">
                                    <Button className="h-16 px-10 bg-[#E5B876] hover:bg-white hover:text-[#1A1612] text-[#1A1612] rounded-2xl text-[11px] uppercase tracking-[0.4em] font-black transition-all shadow-[0_20px_40px_-10px_rgba(229,184,118,0.3)]">
                                        Explore Collection
                                    </Button>
                                    <div className="flex items-center gap-4">
                                        {/* <div className="flex -space-x-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-12 h-12 rounded-full border-2 border-[#1A1612] overflow-hidden bg-[#2D241A] shadow-xl">
                                                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Connoisseur" />
                                                </div>
                                            ))}
                                        </div> */}

                                    </div>
                                </div>
                            </div>

                            {/* Feature Display Card */}
                            <div className="relative hidden lg:block animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
                                <div className="relative z-10 p-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform hover:scale-[1.02] transition-transform duration-700 overflow-hidden group">
                                    <img
                                        src={productsList[0]?.thumbnail_full_url?.path || "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=1000&auto=format&fit=crop"}
                                        className="w-full h-[400px] object-cover rounded-[3rem] transition-transform duration-1000 group-hover:scale-110"
                                        alt="Feature New Arrival"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-[#F0EBE3] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-[9px] text-[#E5B876] font-black tracking-[0.3em] uppercase mb-1">Crowning Piece</p>
                                                <h3 className="text-2xl font-display font-medium text-[#1A1612]">{productsList[0]?.name || "The Eternal New Arrival"}</h3>
                                            </div>
                                            <div className="bg-[#E5B876]/10 px-3 py-1 rounded-full">
                                                <span className="text-[10px] font-black text-[#E5B876]">NEW</span>
                                            </div>
                                        </div>
                                        <Link to={productsList[0] ? `/product/${productsList[0].id}` : "/new-arrivals"} className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8C8276] hover:text-[#E5B876] transition-colors group/link">
                                            Acquire Selection <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    {/* SOPHISTICATED NAVIGATION */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10 pb-6 border-b border-[#F0EBE3] dark:border-gray-800">
                        <div className="space-y-1 text-center md:text-left">
                            <h2 className="text-3xl font-display font-medium text-[#1A1612] dark:text-white">Latest <span className="italic text-[#E5B876]">Creations</span></h2>
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91] dark:text-gray-400">Freshly crafted • Premium quality • Limited stock</p>
                        </div>

                        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4 md:gap-6 mt-6 md:mt-0">
                            {/* Category Filter */}
                            <div className="w-full sm:w-56">
                                <Select value={activeTab.toString()} onValueChange={(v) => setActiveTab(v)}>
                                    <SelectTrigger className="w-full h-12 bg-white dark:bg-black border border-[#F0EBE3] dark:border-gray-800 rounded-xl px-4 text-xs font-bold uppercase tracking-widest text-[#1A1612] dark:text-gray-300 shadow-sm outline-none ring-0">
                                        <Filter className="w-4 h-4 mr-2 text-[#E5B876]" />
                                        <SelectValue placeholder="CATEGORY" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-[#1A1612] border border-[#F0EBE3] dark:border-gray-800 rounded-xl shadow-xl">
                                        {categories.map(tab => (
                                            <SelectItem
                                                key={tab.id}
                                                value={tab.id.toString()}
                                                className="text-xs uppercase tracking-widest font-semibold focus:bg-[#FAF8F5] focus:text-[#E5B876] cursor-pointer py-3"
                                            >
                                                {tab.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Sorting Filter */}
                            <div className="w-full sm:w-56">
                                <Select value={sortOption} onValueChange={setSortOption}>
                                    <SelectTrigger className="w-full h-12 bg-white dark:bg-black border border-[#F0EBE3] dark:border-gray-800 rounded-xl px-4 text-xs font-bold uppercase tracking-widest text-[#1A1612] dark:text-gray-300 shadow-sm outline-none ring-0">
                                        <SelectValue placeholder="SORT BY" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-[#1A1612] border border-[#F0EBE3] dark:border-gray-800 rounded-xl shadow-xl">
                                        <SelectItem value="featured" className="text-xs uppercase tracking-widest font-semibold focus:bg-[#FAF8F5] focus:text-[#E5B876] cursor-pointer py-3">Featured</SelectItem>
                                        <SelectItem value="newest" className="text-xs uppercase tracking-widest font-semibold focus:bg-[#FAF8F5] focus:text-[#E5B876] cursor-pointer py-3">Newest Arrivals</SelectItem>
                                        <SelectItem value="price-low" className="text-xs uppercase tracking-widest font-semibold focus:bg-[#FAF8F5] focus:text-[#E5B876] cursor-pointer py-3">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high" className="text-xs uppercase tracking-widest font-semibold focus:bg-[#FAF8F5] focus:text-[#E5B876] cursor-pointer py-3">Price: High to Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>


                    {/* ENHANCED PRODUCT GRID */}
                    <div className="mb-12">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-6">
                                <div className="relative">
                                    <div className="w-16 h-16 border-2 border-[#E5B876]/20 rounded-full animate-ping"></div>
                                    <div className="absolute inset-0 w-16 h-16 border-t-2 border-[#E5B876] rounded-full animate-spin"></div>
                                </div>
                                <div className="text-center space-y-2">
                                    <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#1A1612]">Unveiling Excellence</p>
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#8C8276]">Please wait while we curate your view</p>
                                </div>
                            </div>
                        ) : productsList.length === 0 ? (
                            <div className="text-center py-24 animate-in fade-in zoom-in duration-1000">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border border-[#F0EBE3]">
                                    <ShoppingBag className="h-8 w-8 text-[#E5B876]" />
                                </div>
                                <h2 className="text-3xl font-display font-medium text-[#1A1612] mb-4">Awaiting Curations</h2>
                                <p className="text-sm text-[#8C8276] mb-12 max-w-md mx-auto leading-relaxed italic">"Excellence takes time. We are currently preparing a set of extraordinary pieces for this collection."</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 pb-24 px-1 sm:px-0">
                                {sortedProductsList.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        )}
                    </div>


                    {/* SPECTACULAR FEATURES SECTION */}
                    <section className="mb-20">
                        <div className="text-center mb-12 space-y-6">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#E5B876]/10 rounded-full border border-[#E5B876]/20 backdrop-blur-md">
                                <Sparkles className="h-5 w-5 text-[#E5B876]" />
                                <span className="text-[11px] uppercase tracking-[0.4em] text-[#E5B876] font-black">WHY CHOOSE NEW ARRIVALS</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-[#1A1612] dark:text-white">
                                The <span className="italic text-[#E5B876]">Viya</span> Promise
                            </h2>
                            <p className="max-w-2xl mx-auto text-[#A69D91] dark:text-gray-400 text-lg font-light leading-relaxed">
                                Every new piece represents our commitment to excellence, innovation, and timeless beauty.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Crown className="w-8 h-8" />,
                                    title: "Premium Craftsmanship",
                                    desc: "Handcrafted by master artisans with decades of experience in fine jewelry making.",
                                    gradient: "from-[#1A1612]/20 to-[#E5B876]/20"
                                },
                                {
                                    icon: <Gem className="w-8 h-8" />,
                                    title: "Certified Authentic",
                                    desc: "All pieces come with authenticity certificates and lifetime quality guarantee.",
                                    gradient: "from-[#E5B876]/20 to-[#1A1612]/20"
                                },
                                {
                                    icon: <TrendingUp className="w-8 h-8" />,
                                    title: "Trending Designs",
                                    desc: "Stay ahead with the latest jewelry trends and exclusive limited edition pieces.",
                                    gradient: "from-[#1A1612]/20 to-[#E5B876]/20"
                                }
                            ].map((feature, i) => (
                                <div key={i} className="relative group">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                                    <div className="relative bg-white dark:bg-black border border-[#F0EBE3] dark:border-gray-800 rounded-3xl p-10 text-center space-y-6 transition-all duration-300 hover:shadow-2xl hover:border-[#E5B876]/50">
                                        <div className="w-20 h-20 bg-[#1A1612] rounded-2xl flex items-center justify-center text-[#E5B876] mx-auto shadow-xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-[#1A1612] dark:text-white font-display">{feature.title}</h3>
                                        <p className="text-[#A69D91] dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <ViyaFooter />
        </div>
    );
};

export default NewArrivals;