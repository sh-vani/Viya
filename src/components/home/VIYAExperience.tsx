
import { Link } from "react-router-dom";

const VIYAExperience = () => {
    return (
        <section className="py-20 bg-background overflow-hidden transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="space-y-3">
                            <h3 className="text-primary text-xs font-medium tracking-[0.3em] uppercase">
                                The Histor
                            </h3>
                            <h2 className="text-3xl md:text-5xl font-display text-foreground leading-tight">
                                Redefining <span className="italic">Timeless</span> Luxury
                            </h2>
                        </div>

                        <p className="text-base text-muted-foreground font-light leading-relaxed max-w-lg">
                            Every piece tells a story of craftsmanship. We create jewelry that defines your unique identity with bold and beautiful designs.
                        </p>

                        <div className="grid grid-cols-2 gap-6 py-4 border-y border-border">
                            <div>
                                <span className="block text-xl font-display text-foreground">Handcrafted</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Precision</span>
                            </div>
                            <div>
                                <span className="block text-xl font-display text-foreground">Authentic</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Materials</span>
                            </div>
                        </div>

                        <Link
                            to="/about/our-story"
                            className="inline-flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase group text-foreground"
                        >
                            <span className="pb-1 border-b border-foreground/30 group-hover:border-foreground transition-all">
                                Our Story
                            </span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>

                    {/* Image Composition */}
                    <div className="relative grid grid-cols-2 gap-4 h-[500px] md:h-[600px]">
                        {/* Woman Portrait - Black & White */}
                        <div className="relative rounded-3xl overflow-hidden mt-12 mb-[-3rem] box-shadow-premium group">
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200&sat=-100"
                                alt="Luxury Portrait Woman"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                        </div>

                        {/* Man Portrait - Black & White */}
                        <div className="relative rounded-3xl overflow-hidden mb-12 mt-[-3rem] box-shadow-premium group">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200&sat=-100"
                                alt="Luxury Portrait Man"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-primary/20 animate-pulse pointer-events-none hidden md:block" />
                    </div>

                </div>
            </div>
        </section >
    );
};

export default VIYAExperience;
