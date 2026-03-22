import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";
import { useWishlist } from "@/hooks/useWishlist";
import { Heart, ShoppingBag, Star, Sparkles, ArrowRight, Layers, Gem } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import ProductCard from "@/components/product/ProductCard";
import { getProductsByCategory, getCategoryList } from "@/lib/api/products";
import { BASE_URL } from "@/lib/api";

const Category = () => {
    const { category: categorySlug } = useParams();
    const [products, setProducts] = useState<any[]>([]);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                // Find category ID from slug
                const catListData = await getCategoryList();
                const categories = catListData.data || [];
                const currentCat = categories.find((cat: any) => cat.slug === categorySlug);

                if (currentCat) {
                    setCategoryName(currentCat.name);
                    const response = await getProductsByCategory(currentCat.id);
                    if (response?.data) {
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
                                category_name: currentCat.name,
                                thumbnail_full_url: {
                                    path: thumImg ? (thumImg.startsWith('http') ? thumImg : `${BASE_URL}${thumImg}`) : "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800"
                                }
                            };
                        });
                        setProducts(mapped);
                    }
                } else {
                    setCategoryName(categorySlug?.replace("-", " ") || "Collection");
                    setProducts([]);
                }
            } catch (err) {
                console.error("Failed to load category:", err);
                toast.error("Failed to load collection");
            } finally {
                setLoading(false);
            }
        };

        if (categorySlug) {
            loadProducts();
        }
    }, [categorySlug]);

    const handleAddToCart = (product: any) => {
        addToCart(product.id);
        toast.success("Added to Collection", {
            description: `${product.name} has been added to your cart.`,
        });
        navigate("/cart");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FBF9F6] flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="w-16 h-16 border-2 border-[#E5B876]/20 rounded-full animate-ping"></div>
                        <div className="absolute inset-0 w-16 h-16 border-t-2 border-[#E5B876] rounded-full animate-spin"></div>
                    </div>
                    <div className="text-center space-y-2">
                        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#1A1612]">Unveiling Excellence</p>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#8C8276]">Please wait while we curate your view</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FBF9F6] dark:bg-black">
            <ViyaHeader />

            <main className="pt-24 lg:pt-28">
                {/* PRESTIGE CATEGORY HERO */}
                <section className="relative min-h-[350px] md:min-h-[450px] flex items-center overflow-hidden mb-16 px-4">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[#1A1612]"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#2D241A_0%,transparent_60%)]"></div>
                        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,#3D2E1E_0%,transparent_60%)]"></div>

                        {/* Decorative elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E5B876]/5 rounded-full blur-[120px]"></div>
                    </div>

                    <div className="container mx-auto max-w-7xl relative z-10">
                        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-[#E5B876]/10 rounded-full border border-[#E5B876]/20 backdrop-blur-md">
                                <Sparkles className="h-4 w-4 text-[#E5B876]" />
                                <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5B876] font-black">Prestige Collection</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-[1.1] tracking-tight">
                                Elevated <span className="text-[#E5B876] font-serif italic">{categoryName}s.</span>
                            </h1>
                            <p className="max-w-xl text-[#A69D91] text-base md:text-lg font-light leading-relaxed">
                                A curated selection of {categoryName.toLowerCase()}s, where timeless Histor meets the pinnacle of modern artisanal craft.
                            </p>
                            <div className="flex items-center gap-8 pt-4">
                                <div className="flex items-center gap-3">
                                    <Layers className="h-5 w-5 text-[#E5B876]" />
                                    <span className="text-[10px] uppercase tracking-widest text-white font-bold">{products.length} MASTERPIECES</span>
                                </div>
                                <div className="h-4 w-px bg-white/20"></div>
                                <div className="flex items-center gap-3">
                                    <Gem className="h-5 w-5 text-[#E5B876]" />
                                    <span className="text-[10px] uppercase tracking-widest text-white font-bold">ETHICALLY SOURCED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    {products.length === 0 ? (
                        <div className="text-center py-40 animate-in fade-in zoom-in duration-1000">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border border-[#F0EBE3]">
                                <ShoppingBag className="h-8 w-8 text-[#E5B876]" />
                            </div>
                            <h2 className="text-3xl font-display font-medium text-[#1A1612] mb-4">Awaiting Curations</h2>
                            <p className="text-sm text-[#8C8276] mb-12 max-w-md mx-auto leading-relaxed italic">"Excellence takes time. We are currently preparing a set of extraordinary pieces for this collection."</p>
                            <Link to="/new-arrivals">
                                <Button className="bg-[#1A1612] hover:bg-black text-white px-12 rounded-2xl text-[10px] uppercase tracking-[0.3em] font-black h-14 shadow-xl transition-all active:scale-95">
                                    Explore all creations
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-40">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )
                    }
                </div>

                {/* ADDITIONAL BRANDING SECTION */}
                {products.length > 0 && (
                    <section className="bg-white py-32">
                        <div className="container mx-auto px-4 max-w-7xl">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                                <div className="space-y-6">
                                    <div className="w-16 h-16 bg-[#1A1612] rounded-2xl flex items-center justify-center text-[#E5B876] mx-auto shadow-2xl">
                                        <Sparkles className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#1A1612]">Artisanal Histor</h4>
                                    <p className="text-xs text-[#8C8276] leading-relaxed font-light">Each piece is handcrafted using generations-old techniques passed down through master jewelers.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="w-16 h-16 bg-[#1A1612] rounded-2xl flex items-center justify-center text-[#E5B876] mx-auto shadow-2xl">
                                        <Gem className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#1A1612]">Uncompromising Purism</h4>
                                    <p className="text-xs text-[#8C8276] leading-relaxed font-light">We use only the highest grade conflict-free stones and 24-karat solid gold foundations.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="w-16 h-16 bg-[#1A1612] rounded-2xl flex items-center justify-center text-[#E5B876] mx-auto shadow-2xl">
                                        <Heart className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-[#1A1612]">Bespeak Experience</h4>
                                    <p className="text-xs text-[#8C8276] leading-relaxed font-light">Every acquisition includes a personal concierge service and a lifetime guarantee of excellence.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <ViyaFooter />
        </div>
    );
};

export default Category;
