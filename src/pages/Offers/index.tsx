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

const OffersPage = () => {
    const [activeTab, setActiveTab] = useState("all");
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = (product: any) => {
        addToCart(product.id);
        toast.success("Offer Added to Cart", {
            description: `${product.name} has been added to your collection.`,
        });
        navigate("/cart");
    };

    // Map system products to offers view
    const systemOffers: any[] = [];

    const filteredProducts = activeTab === "all"
        ? systemOffers
        : systemOffers.filter(p => p.gender === activeTab);

    return (
        <div className="min-h-screen bg-background">
            <ViyaHeader />

            <main className="pt-24 lg:pt-28">
                {/* ULTRA-PREMIUM HERO SECTION */}
                <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden mb-20">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.1)_0%,transparent_60%)]"></div>
                        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05)_0%,transparent_60%)]"></div>

                        {/* Immersive Imagery */}
                        <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-40 lg:opacity-60 hidden md:block">
                            <img
                                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000&auto=format&fit=crop"
                                className="w-full h-full object-cover mix-blend-luminosity"
                                alt="Exclusive Offers"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent"></div>
                        </div>

                        {/* Floating ambient lights */}
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[120px] animate-pulse"></div>
                    </div>

                    <div className="container mx-auto max-w-7xl relative z-10 px-4 md:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-10 text-left animate-in fade-in slide-in-from-left-12 duration-1000">
                                <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-accent/10 rounded-full border border-accent/20 backdrop-blur-md">
                                    <Sparkles className="h-4 w-4 text-accent" />
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-black">Exclusive Offers • Limited Time</span>
                                </div>
                                <div className="space-y-4">
                                    <h1 className="text-5xl md:text-8xl font-display font-medium text-primary-foreground leading-[0.9] tracking-tighter">
                                        Unbeatable <br />
                                        <span className="text-accent font-serif italic pr-4">Offers.</span>
                                    </h1>
                                    <p className="max-w-md text-muted-foreground text-base md:text-lg leading-relaxed font-light">
                                        Discover our carefully curated selection of exclusive deals and special bundles, crafted to elevate your jewelry collection.
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-8 pt-4">
                                    <Button className="h-16 px-10 bg-accent hover:bg-accent/90 text-primary-foreground rounded-2xl text-[11px] uppercase tracking-[0.4em] font-black transition-all shadow-lg">
                                        Explore Offers
                                    </Button>
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden bg-secondary shadow-xl">
                                                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Happy Customer" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-primary-foreground text-xs font-bold font-display tracking-widest">4.9/5 RATING</span>
                                            <span className="text-muted-foreground text-[9px] font-bold uppercase tracking-widest">Customer Love</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Feature Display Card */}
                            <div className="relative hidden lg:block animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
                                <div className="relative z-10 p-3 bg-card/80 backdrop-blur-2xl border border-border rounded-[3.5rem] shadow-xl transform hover:scale-[1.02] transition-transform duration-700 overflow-hidden group">
                                    <img
                                        src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop"
                                        className="w-full h-[520px] object-cover rounded-[3rem] transition-transform duration-1000 group-hover:scale-110"
                                        alt="Feature Offer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="absolute bottom-10 left-10 right-10 p-8 bg-card/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-border transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-[9px] text-accent font-black tracking-[0.3em] uppercase mb-1">Featured Deal</p>
                                                <h3 className="text-2xl font-display font-medium text-foreground">The Premium Collection</h3>
                                            </div>
                                            <div className="bg-accent/10 px-3 py-1 rounded-full">
                                                <span className="text-[10px] font-black text-accent">HOT DEAL</span>
                                            </div>
                                        </div>
                                        <Link to="/product/101" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors group/link">
                                            Shop Now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    {/* SOPHISTICATED NAVIGATION */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20 pb-10 border-b border-border">
                        <div className="space-y-1 text-center md:text-left">
                            <h2 className="text-3xl font-display font-medium text-foreground">Filter by <span className="italic text-accent">Category</span></h2>
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Find your perfect offer</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {["all", "men", "women", "couple"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`h-12 px-8 rounded-2xl text-[10px] uppercase tracking-[0.3em] font-black transition-all border-2 ${activeTab === tab
                                        ? "bg-primary text-primary-foreground border-primary shadow-xl scale-105"
                                        : "bg-card text-muted-foreground border-border hover:border-accent hover:text-accent"
                                        }`}
                                >
                                    {tab === "all" ? "All Offers" : `${tab}'s offers`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* PRODUCT GRID */}
                    <div className="pb-32">
                        <div className="mb-12 text-center space-y-4">
                            <h2 className="text-3xl md:text-5xl font-display font-medium text-foreground">
                                Exclusive <span className="text-accent italic font-serif">Offers.</span>
                            </h2>
                            <p className="text-muted-foreground text-sm md:text-base font-light max-w-md mx-auto">
                                Discover our exclusive deals designed to bring you the best value.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>

                    {/* PREMIUM BENEFITS */}
                    <section className="mb-40">
                        <div className="mb-20 text-center space-y-4">
                            <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground">
                                Why Choose Our <span className="italic text-accent font-serif">Offers?</span>
                            </h2>
                            <p className="max-w-xl mx-auto text-muted-foreground font-light italic">
                                "Every offer is carefully crafted to provide exceptional value without compromising on quality."
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { title: "Best Prices", desc: "Guaranteed lowest prices on premium jewelry collections.", icon: <Package className="w-6 h-6" /> },
                                { title: "Quality Assurance", desc: "Every piece is meticulously crafted and quality-checked.", icon: <Sparkles className="w-6 h-6" /> },
                                { title: "Free Shipping", desc: "Complimentary insured shipping on all offer items.", icon: <ShieldCheck className="w-6 h-6" /> },
                                { title: "Customer Support", desc: "Dedicated support team for all your purchase needs.", icon: <Star className="w-6 h-6" /> }
                            ].map((feature, i) => (
                                <div key={i} className="text-center space-y-4 p-10 bg-card rounded-[3rem] border border-border transition-all hover:shadow-xl hover:border-accent/20 relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-accent/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-accent mx-auto mb-6 shadow-xl transition-transform duration-500 group-hover:rotate-6">
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-foreground">{feature.title}</h4>
                                    <p className="text-xs text-muted-foreground font-light leading-relaxed px-2">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* BRAND BANNER */}
                    <section className="mb-40">
                        <div className="bg-primary rounded-[4rem] overflow-hidden relative shadow-xl">
                            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-40">
                                <img
                                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop"
                                    className="w-full h-full object-cover mix-blend-luminosity"
                                    alt="Quality Excellence"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
                            </div>

                            <div className="p-12 md:p-24 lg:p-32 relative z-10 max-w-3xl space-y-10">
                                <div className="space-y-4">
                                    <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-black block">The Viya Promise</span>
                                    <h2 className="text-4xl md:text-7xl font-display font-medium text-primary-foreground leading-[1.1]">
                                        Exceptional Value <br /> <span className="text-accent italic font-serif">Guaranteed.</span>
                                    </h2>
                                </div>
                                <p className="text-muted-foreground text-lg leading-relaxed font-light max-w-xl">
                                    Every offer is meticulously selected to ensure you receive the finest jewelry at unbeatable prices, backed by our commitment to excellence.
                                </p>

                                <div className="flex flex-wrap gap-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-2xl backdrop-blur-md">
                                            <Check size={18} />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground font-black">Premium Quality</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-2xl backdrop-blur-md">
                                            <Check size={18} />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground font-black">Best Prices</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-2xl backdrop-blur-md">
                                            <Check size={18} />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground font-black">Fast Delivery</span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative ambient glow */}
                            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-[100px]"></div>
                        </div>
                    </section>
                </div>
            </main>

            <ViyaFooter />
        </div>
    );
};

export default OffersPage;
