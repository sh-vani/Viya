
import { Link } from "react-router-dom";
import ViyaLogo from "../ui/ViyaLogo";
import {
    Instagram,
    Facebook,
    Twitter,
    Youtube,
} from "lucide-react";

const ViyaFooter = () => {


    return (
        <footer className="bg-[#0a0a0a] text-white pt-20 pb-10">
            <div className="container mx-auto px-6">



                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    {/* Brand Info */}
                    <div className="lg:col-span-4 space-y-8 text-center md:text-left">
                        <div className="space-y-4">
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <ViyaLogo size={50} color="#E5B876" />
                                <div className="flex flex-col">
                                    <h3 className="text-3xl md:text-4xl font-display font-bold tracking-[-0.02em] text-white">
                                        VIYA COLLECTIVE
                                    </h3>
                                    <p className="text-[12px] tracking-[0.4em] uppercase text-[#E5B876]">
                                        Tie Your Look Together
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-400 font-light leading-relaxed text-[15px] max-w-sm mx-auto md:mx-0">
                                Crafted excellence for the modern spirit. We redefine luxury through the lens of Histor, making every piece a testament to timeless beauty.
                            </p>
                        </div>
                        <div className="flex justify-center md:justify-start gap-4">
                            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-6 text-center md:text-left">
                        <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-[#E5B876]">Company</h4>
                        <ul className="space-y-4">
                            <li><Link to="/about/our-story" className="text-gray-400 hover:text-white transition-colors text-sm font-light">Our Story</Link></li>
                            <li><Link to="/about/sustainability" className="text-gray-400 hover:text-white transition-colors text-sm font-light">Sustainability</Link></li>

                        </ul>
                    </div>

                    <div className="lg:col-span-3 space-y-6 text-center md:text-left">
                        <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-[#E5B876]">Help</h4>
                        <ul className="space-y-4">
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm font-light">Customer Care</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm font-light">Shipping</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm font-light">Returns</Link></li>

                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-6 text-center md:text-left">
                        <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-[#E5B876]">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex flex-col gap-1 items-center md:items-start text-sm">
                                <span className="text-gray-500 font-medium">Text Us</span>
                                <a href="tel:+919977132450" className="text-gray-300 hover:text-white transition-colors">
                                    +91 9977132450
                                </a>
                            </li>
                            <li className="flex flex-col gap-1 items-center md:items-start text-sm">
                                <span className="text-gray-500 font-medium">Email Us</span>
                                <a href="mailto:concierge@viya.com" className="text-gray-300 hover:text-white transition-colors">
                                    concierge@viya.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] text-gray-500 tracking-wider">
                    <div className="order-2 md:order-1">
                        <p>© {new Date().getFullYear()} VIYA Collective. ALL RIGHTS RESERVED.</p>
                    </div>
                    <div className="flex gap-8 order-1 md:order-2 uppercase">
                        <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ViyaFooter;
