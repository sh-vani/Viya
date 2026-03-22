import { useEffect } from "react";
import ViyaHeader from "../../components/header/ViyaHeader";
import ViyaFooter from "../../components/footer/ViyaFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send, MessageSquare, Instagram, Facebook, Twitter } from "lucide-react";

/**
 * Contact Page for Viya Collective
 * Aesthetic: Premium, Minimalist, Luxury
 */

const Contact = () => {
    useEffect(() => {
        document.title = "Contact Us - Viya Collective";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#FBF9F6] dark:bg-black">
            <ViyaHeader />

            <main className="pt-24 lg:pt-32">
                {/* ================= HERO SECTION ================= */}
                <section className="py-16 md:py-24 text-center">
                    <div className="container mx-auto px-4">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-[#E5B876] font-bold mb-4 block animate-in fade-in duration-1000">Get In Touch</span>
                        <h1 className="text-4xl md:text-7xl font-display font-medium text-[#1A1612] dark:text-white leading-tight mb-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                            We'd Love to <span className="italic text-[#E5B876]">Hear From You</span>
                        </h1>
                        <p className="max-w-xl mx-auto text-[#8C8276] dark:text-gray-400 text-sm md:text-lg font-light leading-relaxed animate-in fade-in duration-1000 delay-300">
                            Whether you have a question about our collections, need styling advice, or just want to say hello, our team is here for you.
                        </p>
                    </div>
                </section>

                {/* ================= CONTACT CARDS ================= */}
                <section className="pb-24">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Email Card */}
                            <div className="group bg-white dark:bg-black p-10 rounded-[2.5rem] border border-[#F0EBE3] dark:border-gray-800 transition-all hover:shadow-2xl hover:-translate-y-2 text-center">
                                <div className="w-16 h-16 bg-[#FBF9F6] dark:bg-gray-900 rounded-2xl flex items-center justify-center text-[#E5B876] mb-8 mx-auto transition-colors group-hover:bg-[#1A1612] group-hover:text-white">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-display font-bold text-[#1A1612] dark:text-white mb-3">Email Us</h3>
                                <p className="text-[#8C8276] dark:text-gray-400 text-sm font-light mb-6">Our team is ready to assist you via email.</p>
                                <a href="mailto:concierge@viyacollective.com" className="text-[#1A1612] dark:text-white font-semibold hover:text-[#E5B876] transition-colors">
                                    concierge@viyacollective.com
                                </a>
                            </div>

                            {/* Call Card */}
                            <div className="group bg-white dark:bg-black p-10 rounded-[2.5rem] border border-[#F0EBE3] dark:border-gray-800 transition-all hover:shadow-2xl hover:-translate-y-2 text-center">
                                <div className="w-16 h-16 bg-[#FBF9F6] dark:bg-gray-900 rounded-2xl flex items-center justify-center text-[#E5B876] mb-8 mx-auto transition-colors group-hover:bg-[#1A1612] group-hover:text-white">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-display font-bold text-[#1A1612] dark:text-white mb-3">Call Us</h3>
                                <p className="text-[#8C8276] dark:text-gray-400 text-sm font-light mb-6">Available Mon-Sat, 10 AM to 7 PM IST.</p>
                                <a href="tel:+9199771324500" className="text-[#1A1612] dark:text-white font-semibold hover:text-[#E5B876] transition-colors">
                                    +91 99771 13245
                                </a>
                            </div>

                            {/* Visit Card */}
                            <div className="group bg-white dark:bg-black p-10 rounded-[2.5rem] border border-[#F0EBE3] dark:border-gray-800 transition-all hover:shadow-2xl hover:-translate-y-2 text-center">
                                <div className="w-16 h-16 bg-[#FBF9F6] dark:bg-gray-900 rounded-2xl flex items-center justify-center text-[#E5B876] mb-8 mx-auto transition-colors group-hover:bg-[#1A1612] group-hover:text-white">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-display font-bold text-[#1A1612] dark:text-white mb-3">Visit Us</h3>
                                <p className="text-[#8C8276] dark:text-gray-400 text-sm font-light mb-6">Experience our collection in person at our flagship studio.</p>
                                <p className="text-[#1A1612] dark:text-white font-semibold">
                                    Indore,Madhya Pradesh, India
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= FORM & SOCIALS ================= */}
                <section className="py-24 bg-white dark:bg-black">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                            {/* Left Side: Form */}
                            <div className="space-y-12">
                                <div className="space-y-4">
                                    <h2 className="text-3xl md:text-5xl font-display font-bold text-[#1A1612] dark:text-white">
                                        Send a <span className="italic text-[#E5B876]">Message</span>
                                    </h2>
                                    <p className="text-[#5C544B] dark:text-gray-300 font-light text-lg">
                                        Fill out the form below and we'll get back to you within 24 hours.
                                    </p>
                                </div>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-[#8C8276] dark:text-gray-400 ml-4">Full Name</label>
                                            <Input
                                                placeholder="Enter your name"
                                                className="h-14 px-6 rounded-2xl border-[#F0EBE3] dark:border-gray-800 bg-[#FBF9F6] dark:bg-gray-900 focus:ring-[#E5B876] dark:text-white focus:border-[#E5B876] transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-[#8C8276] dark:text-gray-400 ml-4">Email Address</label>
                                            <Input
                                                type="email"
                                                placeholder="example@mail.com"
                                                className="h-14 px-6 rounded-2xl border-[#F0EBE3] dark:border-gray-800 bg-[#FBF9F6] dark:bg-gray-900 focus:ring-[#E5B876] dark:text-white focus:border-[#E5B876] transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-[#8C8276] dark:text-gray-400 ml-4">Subject</label>
                                        <Input
                                            placeholder="How can we help?"
                                            className="h-14 px-6 rounded-2xl border-[#F0EBE3] dark:border-gray-800 bg-[#FBF9F6] dark:bg-gray-900 focus:ring-[#E5B876] dark:text-white focus:border-[#E5B876] transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-[#8C8276] dark:text-gray-400 ml-4">Your Message</label>
                                        <Textarea
                                            placeholder="Write your message here..."
                                            className="min-h-[180px] p-6 rounded-[2rem] border-[#F0EBE3] dark:border-gray-800 bg-[#FBF9F6] dark:bg-gray-900 focus:ring-[#E5B876] dark:text-white focus:border-[#E5B876] transition-all resize-none"
                                        />
                                    </div>

                                    <Button className="w-full md:w-auto h-16 px-12 bg-[#1A1612] dark:bg-white hover:bg-[#2B1E0E] dark:hover:bg-gray-200 text-white dark:text-[#1A1612] rounded-2xl text-[12px] uppercase tracking-[0.4em] font-bold transition-all shadow-xl flex items-center gap-3 active:scale-95">
                                        Send Message <Send className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>

                            {/* Right Side: Imagery/Socials */}
                            <div className="space-y-12">
                                <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative group">
                                    <img
                                        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop"
                                        alt="Luxury Showcase"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/80 to-transparent flex items-end p-12">
                                        <div className="text-white space-y-2">
                                            <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-70">Our Headquarters</p>
                                            <h3 className="text-2xl font-display">Viya Collective Boutique</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#E5B876]">Join the Circle</h4>
                                        <div className="flex gap-4">
                                            <a href="#" className="w-12 h-12 rounded-full border border-[#F0EBE3] dark:border-gray-800 flex items-center justify-center text-[#1A1612] dark:text-white hover:bg-[#E5B876] hover:text-white hover:border-[#E5B876] dark:hover:border-[#E5B876] transition-all">
                                                <Instagram className="w-5 h-5" />
                                            </a>
                                            <a href="#" className="w-12 h-12 rounded-full border border-[#F0EBE3] dark:border-gray-800 flex items-center justify-center text-[#1A1612] dark:text-white hover:bg-[#E5B876] hover:text-white hover:border-[#E5B876] dark:hover:border-[#E5B876] transition-all">
                                                <Facebook className="w-5 h-5" />
                                            </a>
                                            <a href="#" className="w-12 h-12 rounded-full border border-[#F0EBE3] dark:border-gray-800 flex items-center justify-center text-[#1A1612] dark:text-white hover:bg-[#E5B876] hover:text-white hover:border-[#E5B876] dark:hover:border-[#E5B876] transition-all">
                                                <Twitter className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#E5B876]">Direct Chat</h4>
                                        <Button variant="outline" className="h-12 w-full rounded-xl border-[#F0EBE3] dark:border-gray-800 text-[#1A1612] dark:text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#1A1612] dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors">
                                            <MessageSquare className="w-4 h-4" /> WhatsApp Us
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= SIMPLE FAQ MINI ================= */}
                <section className="py-24 bg-[#FBF9F6] dark:bg-black border-t border-[#F0EBE3] dark:border-gray-800">
                    <div className="container mx-auto px-4 max-w-4xl text-center space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-display font-bold text-[#1A1612] dark:text-white">Common Questions</h2>
                            <p className="text-[#8C8276] dark:text-gray-400 font-light">Before reaching out, you might find your answer here.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div className="p-8 bg-white dark:bg-black rounded-3xl border border-[#F0EBE3] dark:border-gray-800 space-y-3">
                                <h4 className="font-bold text-[#1A1612] dark:text-white">What is your delivery time?</h4>
                                <p className="text-sm text-[#8C8276] dark:text-gray-400 font-light">Typically 5-7 business days across India. Express options are available.</p>
                            </div>
                            <div className="p-8 bg-white dark:bg-black rounded-3xl border border-[#F0EBE3] dark:border-gray-800 space-y-3">
                                <h4 className="font-bold text-[#1A1612] dark:text-white">Do you offer customizations?</h4>
                                <p className="text-sm text-[#8C8276] dark:text-gray-400 font-light">Yes, we love creates bespoke pieces. Contact us via email for personal requests.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <ViyaFooter />
        </div>
    );
};

export default Contact;
