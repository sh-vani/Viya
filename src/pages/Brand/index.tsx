
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";
import ProductCard from "@/components/product/ProductCard";
import { toast } from "sonner";
import { Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Brand = () => {
    const { brandSlug: brandId } = useParams();
    const [products, setProducts] = useState([]);
    const [brandName, setBrandName] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadBrandProducts = () => {
            setLoading(true);
            // Removing dummy data fully
            setBrandName("Collection");
            setProducts([]);
            setLoading(false);
        };

        if (brandId) {
            loadBrandProducts();
        }
    }, [brandId, navigate]);


    if (loading) {
        return (
            <div className="min-h-screen bg-[#FBF9F6] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#E5B876] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8C8276]">Curating Brand Experience</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FBF9F6] dark:bg-black">
            <ViyaHeader />

            <main className="pt-24 lg:pt-28">
                {/* BRAND HERO */}
                <section className="relative h-[300px] md:h-[350px] flex items-center overflow-hidden mb-12 px-4">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[#1A1612]"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#2D241A_0%,transparent_50%)]"></div>
                        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,#3D2E1E_0%,transparent_50%)]"></div>
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    <div className="container mx-auto max-w-7xl relative z-10 text-center md:text-left">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#E5B876]/10 rounded-full border border-[#E5B876]/20 mb-6">
                            <Sparkles className="h-4 w-4 text-[#E5B876]" />
                            <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5B876] font-bold">House of {brandName}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-medium text-white leading-tight tracking-tight">
                            Histor <span className="text-[#E5B876] font-serif italic">Craftsmanship.</span>
                        </h1>
                        <p className="mt-4 max-w-lg text-[#A69D91] text-xs md:text-sm font-light leading-relaxed">
                            Discover the world of {brandName}. Exceptional artistry meets contemporary luxury in every piece of this exclusive collection.
                        </p>
                        <div className="mt-8 flex items-center gap-4 text-[#E5B876] font-bold text-[10px] uppercase tracking-widest">
                            <Star className="h-3 w-3 fill-[#E5B876]" />
                            <span>Premium Authorized Partner</span>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    {/* INFO BAR */}
                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-[#F0EBE3]">
                        <h2 className="text-xl md:text-2xl font-display font-medium text-[#1A1612]">
                            The <span className="italic text-[#E5B876]">Selection</span>
                        </h2>
                        <span className="text-[10px] bg-[#E8E2D9] px-4 py-1.5 rounded-full font-bold text-[#8C8276] uppercase tracking-widest">
                            {products.length} Masterpieces
                        </span>
                    </div>

                    {/* PRODUCTS GRID */}
                    {products.length === 0 ? (
                        <div className="text-center py-24">
                            <p className="text-xl font-display text-[#1A1612]">This collection is coming soon</p>
                            <p className="text-sm text-[#8C8276] mt-2">Sign up for notifications to be the first to know.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 pb-32">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <ViyaFooter />
        </div>
    );
};

export default Brand;
