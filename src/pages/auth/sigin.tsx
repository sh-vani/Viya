import React, { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Mail, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

// Header & Footer
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";
import ViyaLogo from "@/components/ui/ViyaLogo";

// API
import { authApi } from "@/lib/api";

// AUTH STORAGE
import { setTempAuth } from "../../lib/authStorage.js";

// Images
import viyaaa from "@/assets/viyaaa.jpg";
import { toast } from "sonner";

const OTP_LENGTH = 6;
const OTP_TIMER = 30;

const SignIn = () => {
    const navigate = useNavigate();

    const [isOtpStep, setIsOtpStep] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [timer, setTimer] = useState(OTP_TIMER);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const redirectPath = searchParams.get("redirect") || "/";

    /* ================= TIMER ================= */
    useEffect(() => {
        if (!isOtpStep || timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isOtpStep, timer]);

    /* ================= GET OTP ================= */
    const handleGetOtp = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid Email", {
                description: "Please enter a valid email address to receive your login code."
            });
            return;
        }

        setLoading(true);
        try {
            const response = await authApi.sendOtp(email);
            const data = response.data;
            setIsOtpStep(true);
            setTimer(OTP_TIMER);
            toast.success("Code Sent", {
                description: data.message || `A 6-digit login code has been sent to ${email}.`
            });
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to send OTP. Please try again.";
            toast.error("Error", { description: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    /* ================= OTP INPUT ================= */
    const handleOtpChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < OTP_LENGTH - 1) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const resendOtp = async () => {
        setOtp(Array(OTP_LENGTH).fill(""));
        toast.info("Resending Code...");
        try {
            const response = await authApi.sendOtp(email);
            const data = response.data;
            setTimer(OTP_TIMER);
            toast.success("New Code Sent", {
                description: data.message || "A new code has been sent to your email."
            });
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Failed to resend OTP.";
            toast.error("Error", { description: errorMessage });
        }
    };

    /* ================= VERIFY OTP ================= */
    const handleVerifyOtp = async () => {
        const enteredOtp = otp.join("");

        if (enteredOtp.length !== OTP_LENGTH) {
            toast.error("Incomplete Code", {
                description: "Please enter the full 6-digit code sent to your email."
            });
            return;
        }

        setLoading(true);
        try {
            const response = await authApi.verifyOtp(email, enteredOtp);
            const data = response.data;

            if (data.token) {
                localStorage.setItem("auth_token", data.token);
            }
            localStorage.setItem("user_email", email);
            if (data.user) {
                localStorage.setItem("user_name", data.user.name || data.user.first_name || "");
                localStorage.setItem("user_data", JSON.stringify(data.user));
            }

            toast.success("Login Successful", {
                description: data.message || "Welcome back to Viya Collective."
            });
            navigate(redirectPath);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Invalid OTP. Please try again.";
            toast.error("Verification Failed", { description: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FBF9F6] dark:bg-black font-sans flex flex-col">
            <ViyaHeader />

            <main className="flex-1 flex items-center justify-center px-4 py-24 sm:py-32">
                <div className="w-full max-w-5xl bg-white dark:bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#F0EBE3] dark:border-gray-800 grid grid-cols-1 lg:grid-cols-2">

                    {/* LEFT PANEL: Imagery & Welcome */}
                    <div className="relative hidden lg:flex flex-col justify-end p-12 bg-[#1A1612]">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                            <img
                                src={viyaaa}
                                alt="High-End Jewelry Collection"
                                className="w-full h-full object-cover scale-105 duration-700 hover:scale-110 transition-transform"
                            />
                        </div>

                        <div className="relative z-20 space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                <Sparkles className="h-4 w-4 text-[#E5B876]" />
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#E5B876] font-bold">Premium Experience</span>
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-4xl lg:text-5xl font-display font-medium text-white leading-tight">
                                    Curate Your <br />
                                    <span className="text-[#E5B876] italic font-serif">Signature Style</span>
                                </h1>
                                <p className="text-gray-300 text-sm font-light leading-relaxed max-w-md">
                                    Sign in or create an account to manage your orders, wishlist your favorite pieces, and experience unparalleled luxury service.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Authentication Form */}
                    <div className="p-10 sm:p-14 md:p-16 flex flex-col justify-center bg-white dark:bg-black">
                        <div className="mb-10 lg:mb-12">
                            <div className="lg:hidden flex mb-8 justify-center">
                                <ViyaLogo size={42} color="#1A1612" className="dark:hidden" />
                                <ViyaLogo size={42} color="#FFFFFF" className="hidden dark:block" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1A1612] dark:text-white mb-3 text-center lg:text-left">
                                {isOtpStep ? "Enter Verification Code" : "Welcome Back"}
                            </h2>
                            <p className="text-[#8C8276] dark:text-gray-400 text-sm font-light text-center lg:text-left">
                                {isOtpStep
                                    ? `We've sent a 6-digit code to ${email}`
                                    : "Enter your email address to sign in or create a new account"}
                            </p>
                        </div>

                        {!isOtpStep ? (
                            <form onSubmit={handleGetOtp} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider font-bold text-[#8C8276] dark:text-gray-400 pl-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-[#A69D91] dark:text-gray-500" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="hello@example.com"
                                            required
                                            className="w-full bg-[#FBF9F6] dark:bg-gray-900 border border-[#F0EBE3] dark:border-gray-800 rounded-xl py-4 pl-12 pr-4 outline-none text-[#1A1612] dark:text-white text-md transition-all focus:border-[#E5B876] dark:focus:border-[#E5B876] focus:bg-white dark:focus:bg-black focus:ring-4 focus:ring-[#E5B876]/10 placeholder:text-[#D1C7B7] dark:placeholder:text-gray-600 shadow-sm"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 bg-[#1A1612] dark:bg-white text-white dark:text-[#1A1612] hover:bg-[#E5B876] dark:hover:bg-[#E5B876] hover:text-white dark:hover:text-white transition-all duration-300 rounded-xl flex items-center justify-center text-xs uppercase tracking-widest font-bold shadow-lg disabled:opacity-70 active:scale-[0.98] group"
                                >
                                    {loading ? (
                                        <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <span className="flex items-center gap-3">
                                            Continue with Email <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-8">
                                <div className="flex justify-between gap-2 sm:gap-3">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            value={digit}
                                            autoFocus={index === 0}
                                            maxLength={1}
                                            onChange={(e) => handleOtpChange(e.target.value, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            className="w-10 sm:w-12 md:w-14 h-14 sm:h-16 text-center text-2xl font-bold border-2 border-[#F0EBE3] dark:border-gray-800 bg-[#FBF9F6] dark:bg-gray-900 rounded-xl focus:border-[#E5B876] dark:focus:border-[#E5B876] focus:bg-white dark:focus:bg-black outline-none transition-all text-[#1A1612] dark:text-white shadow-sm"
                                        />
                                    ))}
                                </div>

                                <div className="space-y-5">
                                    <button
                                        onClick={handleVerifyOtp}
                                        disabled={loading}
                                        className="w-full h-14 bg-[#1A1612] dark:bg-white text-white dark:text-[#1A1612] hover:bg-[#E5B876] dark:hover:bg-[#E5B876] hover:text-white dark:hover:text-white transition-all duration-300 rounded-xl flex items-center justify-center text-xs uppercase tracking-widest font-bold shadow-lg disabled:opacity-70 active:scale-[0.98] group"
                                    >
                                        {loading ? (
                                            <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <ShieldCheck size={18} className="mr-2" />
                                                Verify & Sign In
                                            </>
                                        )}
                                    </button>

                                    <div className="flex flex-col items-center gap-3">
                                        {timer > 0 ? (
                                            <p className="text-xs text-[#8C8276] dark:text-gray-400 font-medium">
                                                Resend code in <span className="text-[#E5B876] font-bold">{timer}s</span>
                                            </p>
                                        ) : (
                                            <button onClick={resendOtp} className="text-xs text-[#E5B876] font-bold hover:underline underline-offset-4">
                                                Send New Code
                                            </button>
                                        )}

                                        <button
                                            onClick={() => setIsOtpStep(false)}
                                            className="text-xs font-medium text-[#8C8276] dark:text-gray-500 hover:text-[#1A1612] dark:hover:text-white transition-colors"
                                        >
                                            Use a different email address
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-12 pt-8 border-t border-[#F0EBE3] dark:border-gray-800 text-center space-y-3">
                            <p className="text-[10px] text-[#A69D91] dark:text-gray-500 font-light max-w-xs mx-auto">
                                By continuing, you agree to Viya Collective's <br />
                                <a href="#" className="underline underline-offset-2 hover:text-[#1A1612] dark:hover:text-white">Terms of Service</a> & <a href="#" className="underline underline-offset-2 hover:text-[#1A1612] dark:hover:text-white">Privacy Policy</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <ViyaFooter />
        </div>
    );
};

export default SignIn;
