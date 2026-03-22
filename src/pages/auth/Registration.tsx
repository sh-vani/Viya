import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Sparkles, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { toast } from "sonner";

import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";
import ViyaLogo from "@/components/ui/ViyaLogo";
import viya from "@/assets/viya.jpg";
import { authApi } from "@/lib/api";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email) {
            toast.error("Signature Required", {
                description: "Please provide your full signature name and email to initialize your profile."
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid Email", {
                description: "Please provide a valid email address for your digital registry."
            });
            return;
        }

        setLoading(true);
        try {
            const response = await authApi.sendOtp(email);
            const data = response.data;

            toast.success("OTP Sent", {
                description: data.message || "OTP sent successfully to your email."
            });
            setOtpSent(true);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to send OTP.";
            toast.error("Error", {
                description: errorMessage
            });
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyAndRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp) {
            toast.error("OTP Required", {
                description: "Please enter the OTP sent to your email."
            });
            return;
        }

        setLoading(true);
        try {
            const response = await authApi.verifyOtp(email, otp);
            const data = response.data;

            if (data.token) {
                localStorage.setItem("auth_token", data.token);
            }
            if (data.user) {
                localStorage.setItem("user_name", data.user.name || data.user.first_name || name);
                localStorage.setItem("user_email", data.user.email || email);
                localStorage.setItem("user_data", JSON.stringify(data.user));
            } else {
                localStorage.setItem("user_name", name);
                localStorage.setItem("user_email", email);
            }

            toast.success("Registry Initialized", {
                description: data.message || `Welcome to the VIYA Collective, ${name.split(' ')[0]}.`
            });
            navigate("/");
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Invalid OTP. Please try again.";
            toast.error("Verification Failed", {
                description: errorMessage
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FBF9F6] dark:bg-black flex flex-col">
            <ViyaHeader />

            <main className="flex-1 flex items-center justify-center px-4 py-24 sm:py-32">
                <div className="w-full max-w-5xl bg-white rounded-[3rem] overflow-hidden shadow-[0_80px_150px_-30px_rgba(26,22,18,0.12)] border border-[#F0EBE3] grid grid-cols-1 lg:grid-cols-2">

                    {/* LEFT PANEL: Immersive Branding */}
                    <div className="relative hidden lg:flex flex-col justify-end p-16 bg-[#1A1612] text-white">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] via-[#1A1612]/40 to-transparent z-10" />
                            <img
                                src={viya}
                                alt="High Jewelry Collection"
                                className="w-full h-full object-cover scale-110 animate-slow-zoom"
                            />
                        </div>

                        <div className="relative z-20 space-y-8">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                <Heart className="h-3 w-3 text-[#E5B876] fill-[#E5B876]" />
                                <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5B876] font-bold">The Collective</span>
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-5xl font-display font-bold leading-tight tracking-tight">
                                    Become Part <br />
                                    <span className="text-[#E5B876] italic font-serif">of the Legacy.</span>
                                </h1>
                                <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
                                    Begin your journey with VIYA and experience the pinnacle of artisanal Histor and curated luxury.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                                <div className="space-y-1">
                                    <p className="text-xl font-display font-medium text-white">Bespoke</p>
                                    <p className="text-[10px] uppercase tracking-widest text-[#E5B876] font-bold">Consultations</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xl font-display font-medium text-white">Priority</p>
                                    <p className="text-[10px] uppercase tracking-widest text-[#E5B876] font-bold">Unveilings</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Registration Form */}
                    <div className="p-10 sm:p-16 flex flex-col justify-center bg-white">
                        <div className="mb-12 text-center lg:text-left">
                            <div className="lg:hidden flex justify-center mb-8">
                                <ViyaLogo size={48} color="#1A1612" />
                            </div>
                            <h2 className="text-4xl font-display font-bold text-[#1A1612] mb-3 tracking-tight">
                                Initialize Registry
                            </h2>
                            <p className="text-[#8C8276] text-sm font-light leading-relaxed italic">
                                Create your personalized sanctuary within our collective.
                            </p>
                        </div>

                        <form onSubmit={otpSent ? handleVerifyAndRegister : handleSendOtp} className="space-y-8">
                            {/* Name Input */}
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A69D91] ml-1">Signature Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <User className="h-4 w-4 text-[#E5B876]" />
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Sarah Montserrat"
                                        required
                                        disabled={otpSent}
                                        className="w-full bg-[#FBF9F6] border border-[#F0EBE3] rounded-[1.25rem] py-6 pl-14 pr-5 outline-none text-[#1A1612] text-lg transition-all focus:border-[#E5B876] focus:bg-white focus:ring-[6px] focus:ring-[#E5B876]/10 placeholder:text-[#D1C7B7] shadow-sm disabled:opacity-60"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A69D91] ml-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Mail className="h-4 w-4 text-[#E5B876]" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="sarah@sanctuary.com"
                                        required
                                        disabled={otpSent}
                                        className="w-full bg-[#FBF9F6] border border-[#F0EBE3] rounded-[1.25rem] py-6 pl-14 pr-5 outline-none text-[#1A1612] text-lg transition-all focus:border-[#E5B876] focus:bg-white focus:ring-[6px] focus:ring-[#E5B876]/10 placeholder:text-[#D1C7B7] shadow-sm disabled:opacity-60"
                                    />
                                </div>
                            </div>

                            {/* OTP Input */}
                            {otpSent && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A69D91] ml-1">One Time Password</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <ShieldCheck className="h-4 w-4 text-[#E5B876]" />
                                        </div>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="Enter OTP"
                                            required
                                            className="w-full bg-[#FBF9F6] border border-[#F0EBE3] rounded-[1.25rem] py-6 pl-14 pr-5 outline-none text-[#1A1612] text-lg transition-all focus:border-[#E5B876] focus:bg-white focus:ring-[6px] focus:ring-[#E5B876]/10 placeholder:text-[#D1C7B7] shadow-sm"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-20 bg-[#1A1612] text-white hover:bg-[#2B1E0E] transition-all rounded-[1.25rem] flex items-center justify-center text-[11px] uppercase tracking-[0.4em] font-black shadow-[0_20px_40px_-10px_rgba(26,22,18,0.25)] group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    {loading ? (
                                        <div className="h-6 w-6 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <span className="flex items-center gap-4">
                                            {otpSent ? "Verify & Register" : "Send OTP"} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-16 text-center space-y-4 border-t border-[#F0EBE3] pt-12">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D1C7B7] font-medium leading-relaxed">
                                Already identified? <Link to="/signin" className="text-[#E5B876] font-black border-b border-[#E5B876] pb-0.5">Revisit Sanctuary</Link>
                            </p>
                            <div className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#D1C7B7] font-light">
                                <ShieldCheck size={12} className="text-[#E5B876]" />
                                Secure data encryption protocols active
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ViyaFooter />
        </div>
    );
};

export default Register;
