import { useEffect } from "react";
import { Link } from "react-router-dom";
import ViyaHeader from "../../components/header/ViyaHeader";
import ViyaFooter from "../../components/footer/ViyaFooter";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Users, ShieldCheck, ArrowRight, Quote, } from "lucide-react";

/**
 * Redesigned Our Story Page
 * Theme: Premium, Artistic, Narrative-Driven
 * Story: Founded by Best Friends
 */

const OurStory = () => {
    useEffect(() => {
        document.title = "Our Story - Viya Collective";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#FBF9F6] dark:bg-black">
            <ViyaHeader />

            <main className="pt-24 lg:pt-32 overflow-hidden">
                {/* ================= HERO SECTION ================= */}
                <section className="relative h-[60vh] flex items-center justify-center p-4">
                    <div className="absolute inset-0 z-0 opacity-10">
                        <div className="absolute top-0 right-0 w-[50%] h-full bg-[radial-gradient(circle_at_center,#E5B876_0%,transparent_70%)] blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-[40%] h-full bg-[radial-gradient(circle_at_center,#8C8276_0%,transparent_60%)] blur-3xl"></div>
                    </div>

                    <div className="container mx-auto max-w-7xl relative z-10 text-center space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-[#E5B876]/20 mb-2 shadow-sm">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5B876] font-black">Est. 2024</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-display font-medium text-[#1A1612] dark:text-white leading-[1] tracking-tight">
                            Two Hearts. <br />
                            <span className="text-[#E5B876] italic font-serif">One Vision.</span>
                        </h1>

                        <p className="max-w-xl mx-auto text-[#8C8276] dark:text-gray-400 text-sm md:text-lg font-light leading-relaxed">
                            VIYA Collective was born from a shared dream between lifelong best friends to bridge the gap between ancient Histor and modern elegance.
                        </p>
                    </div>
                </section>

                {/* ================= THE BOND (ORIGIN STORY) ================= */}
                <section className="py-20 bg-white dark:bg-black">
                    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative group">
                                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-xl relative z-10">
                                    <img
                                        src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop"
                                        alt="Best Friends Founders"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#E5B876]/10 rounded-full -z-0 blur-2xl"></div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#E5B876] font-bold block">The Founders' Journey</span>
                                    <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1A1612] dark:text-white leading-tight">
                                        Behind the Label: <span className="italic text-[#E5B876]">True Kinship</span>
                                    </h2>
                                </div>

                                <div className="space-y-4 text-base text-[#5C544B] dark:text-gray-300 font-light leading-relaxed">
                                    <p>
                                        Viya Collective started as a conversation over tea between two friends with a shared passion for Histor and jewelry.
                                    </p>
                                    <p>
                                        We brought together artisanal craftsmanship and modern design to create something truly unique.
                                    </p>
                                    <div className="bg-[#FBF9F6] dark:bg-gray-900 p-6 rounded-2xl border-l-4 border-[#E5B876] italic text-[#1A1612] dark:text-white font-serif relative">
                                        <Quote className="absolute top-2 left-2 w-6 h-6 opacity-10 text-[#E5B876]" />
                                        "Viya is the physical manifestation of our friendship—built on trust and a pursuit of beauty."
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= OUR PHILOSOPHY ================= */}
                <section className="py-20 bg-[#FBF9F6] dark:bg-black">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="text-center space-y-4 mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#1A1612] dark:text-white">Values that <span className="text-[#E5B876] italic">Guide Us</span></h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Ethical Sourcing",
                                    desc: "Responsible origins for every stone and metal.",
                                    icon: <ShieldCheck className="w-6 h-6" />
                                },
                                {
                                    title: "Artisanal Honor",
                                    desc: "Fair wages and benefits for our master craftsmen.",
                                    icon: <Users className="w-6 h-6" />
                                },
                                {
                                    title: "Premium Quality",
                                    desc: "12-point quality checks for generational durability.",
                                    icon: <Sparkles className="w-6 h-6" />
                                }
                            ].map((val, i) => (
                                <div key={i} className="group p-8 bg-white dark:bg-black rounded-[2rem] border border-[#F0EBE3] dark:border-gray-800 transition-all hover:shadow-lg">
                                    <div className="w-12 h-12 bg-[#FBF9F6] dark:bg-gray-900 rounded-xl flex items-center justify-center text-[#E5B876] mb-6 transition-colors group-hover:bg-[#2B1E0E] group-hover:text-white">
                                        {val.icon}
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-[#1A1612] dark:text-white mb-3">{val.title}</h3>
                                    <p className="text-[#8C8276] dark:text-gray-400 text-sm leading-relaxed font-light">{val.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= THE CRAFT SECTION ================= */}

                {/* ================= CTA BOX ================= */}

            </main>

            <ViyaFooter />
        </div>
    );
};

export default OurStory;
