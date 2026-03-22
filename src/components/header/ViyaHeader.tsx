import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
    Search,
    Heart,
    Bell,
    ShoppingBag,
    User,
    Menu,
    X,
    Sun,
    Moon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,

    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import NotificationPanel from "../../pages/auth/NotificationPanel";
import ViyaLogo from "../ui/ViyaLogo";

const ViyaHeader = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem("darkMode");
        return savedTheme === "true";
    });
    const [openNotification, setOpenNotification] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const { wishlistItems = [] } = useWishlist();
    const { totalItems = 0 } = useCart();

    const wishlistCount = wishlistItems.length;
    const cartCount = totalItems;
    const notificationCount = 0;

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "All Product", href: "/new-arrivals" },
        { name: "Combo", href: "/combo" },
        { name: "About", href: "/about/our-story" },
        { name: "Contact", href: "/contact" },
    ];

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        document.documentElement.classList.toggle("dark");
        // Save theme preference to localStorage
        localStorage.setItem("darkMode", newTheme.toString());
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Apply dark mode class on initial load based on saved preference
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    // Live Search Logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim().length >= 3) {
                setIsSearching(true);
                try {
                    const { searchApi } = await import("@/lib/api");
                    const response = await searchApi.getLiveSearch(searchQuery);
                    setSearchResults(response.data?.products?.data || []);
                } catch (error) {
                    console.error("Search error:", error);
                    setSearchResults([]);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const showWhiteNavbar = true;

    return (
        <>
            <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${showWhiteNavbar ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
                <nav className={`transition-all duration-500 ${showWhiteNavbar ? "border-b border-muted/20" : "border-transparent"}`}>
                    <div className="container mx-auto px-4 md:px-8">
                        <div className={`flex items-center justify-between transition-all duration-500 ${showWhiteNavbar ? "h-14 md:h-16" : "h-20 md:h-24"}`}>

                            {/* Mobile Menu */}
                            <Sheet>
                                <SheetTrigger asChild className="lg:hidden">
                                    <Button variant="ghost" size="icon" className={!showWhiteNavbar ? "text-white hover:bg-white/10" : "text-foreground"}>
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] border-r-0 bg-background/95 backdrop-blur-xl flex flex-col p-0">
                                    <SheetHeader className="px-6 py-8 border-b border-muted/20 bg-gradient-to-b from-primary/5 to-transparent hover:from-primary/10">
                                        <SheetTitle className="flex flex-col items-start gap-3 group cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <ViyaLogo
                                                    size={40}
                                                    color="#D49B3E"
                                                    className="flex-shrink-0 transition-transform duration-700 group-hover:rotate-[360deg]"
                                                />
                                                <span className="text-4xl font-display font-bold tracking-[0.15em] text-primary">VIYA</span>
                                            </div>
                                            <span className="text-3xl font-display font-light tracking-[0.2em] text-foreground/70">COLLECTIVE</span>
                                            <span className="text-xs tracking-[0.3em] uppercase font-semibold text-primary/70 pt-1">Tie Your Look Together</span>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="px-6 mt-1 flex flex-col gap-1 flex-1">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                to={link.href}
                                                className="text-base font-semibold hover:text-primary transition-all duration-300 flex items-center justify-between group py-3 px-3 rounded-lg hover:bg-primary/5"
                                            >
                                                <span>{link.name}</span>
                                                <div className="h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-8"></div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="px-6 pb-8 pt-6 border-t border-muted/20 space-y-3 bg-gradient-to-t from-primary/5 to-transparent">
                                        {/* User Profile Section */}
                                        <Link to={localStorage.getItem("auth_token") ? "/profile" : `/account?redirect=${location.pathname}`} className="flex items-center gap-3 hover:text-primary transition-all duration-300 py-3 px-3 rounded-lg hover:bg-primary/10 group">
                                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                                <User className="h-5 w-5 text-primary" />
                                            </div>
                                            <span className="text-sm font-semibold">{localStorage.getItem("auth_token") ? "My Profile" : "Sign In"}</span>
                                        </Link>

                                        {/* Theme Toggle */}
                                        <button
                                            onClick={toggleTheme}
                                            className="flex items-center gap-3 hover:text-primary transition-all duration-300 w-full py-3 px-3 rounded-lg hover:bg-primary/10 group"
                                        >
                                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                                {isDarkMode ? (
                                                    <Sun className="h-5 w-5 text-primary" />
                                                ) : (
                                                    <Moon className="h-5 w-5 text-primary" />
                                                )}
                                            </div>
                                            <span className="text-sm font-semibold">
                                                {isDarkMode ? "Light Mode" : "Dark Mode"}
                                            </span>
                                        </button>
                                    </div>
                                </SheetContent>
                            </Sheet>

                            {/* Logo */}
                            <Link to="/" className="flex items-center gap-4 group">
                                <ViyaLogo
                                    size={45}
                                    color={showWhiteNavbar ? "#D49B3E" : "white"}
                                    className="transition-transform duration-700 group-hover:rotate-[360deg] hidden md:block"
                                />
                                <div className="flex flex-col items-start translate-y-1">
                                    <span className={`text-xl md:text-2xl lg:text-3xl font-display font-medium tracking-[0.1em] transition-colors leading-none ${showWhiteNavbar ? "text-primary" : "text-white"}`}>
                                        VIYA COLLECTIVE
                                    </span>
                                    <span className={`text-[8px] md:text-[9px] tracking-[0.3em] uppercase font-bold transition-colors hidden md:block pt-1 ${showWhiteNavbar ? "text-muted-foreground" : "text-white/60"}`}>
                                        Tie Your Look Together
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Nav */}
                            <nav className="hidden lg:flex items-center gap-12">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className={`text-[12px] uppercase tracking-[0.2em] font-semibold transition-all hover:text-primary relative group ${showWhiteNavbar ? "text-foreground" : "text-white/90"}`}
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full"></span>
                                    </Link>
                                ))}
                            </nav>

                            {/* Right Icons */}
                            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-shrink-0">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`${!showWhiteNavbar ? "text-white hover:bg-white/10" : "text-foreground"} h-9 w-9 sm:h-10 sm:w-10`}
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                >
                                    <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>

                                <Link to="/wishlist" className="relative flex-shrink-0">
                                    <Button variant="ghost" size="icon" className={`${!showWhiteNavbar ? "text-white hover:bg-white/10" : "text-foreground"} h-9 w-9 sm:h-10 sm:w-10`}>
                                        <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </Button>
                                    {wishlistCount > 0 && (
                                        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-red-600 text-white text-[8px] sm:text-[10px] flex items-center justify-center font-bold">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </Link>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`relative hidden md:flex ${!showWhiteNavbar ? "text-white hover:bg-white/10" : "text-foreground"} h-9 w-9 sm:h-10 sm:w-10`}
                                    onClick={() => setOpenNotification(true)}
                                >
                                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                                    {notificationCount > 0 && (
                                        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-orange-600 text-white text-[8px] sm:text-[10px] flex items-center justify-center font-bold">
                                            {notificationCount}
                                        </span>
                                    )}
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleTheme}
                                    className={`hidden sm:flex ${!showWhiteNavbar ? "text-white hover:bg-white/10" : "text-foreground"}`}
                                >
                                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </Button>

                                <Link to="/cart" className="flex-shrink-0">
                                    <Button variant="ghost" size="icon" className={`relative ${!showWhiteNavbar ? "text-white hover:bg-white/10" : "text-foreground"} h-9 w-9 sm:h-10 sm:w-10`}>
                                        <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-primary text-primary-foreground text-[8px] sm:text-[10px] flex items-center justify-center font-bold">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Button>
                                </Link>

                                <Link to={localStorage.getItem("auth_token") ? "/profile" : `/account?redirect=${location.pathname}`} className="hidden sm:block">
                                    <Button variant="ghost" size="icon" className={!showWhiteNavbar ? "text-white hover:bg-white/10" : "text-foreground"}>
                                        <User className="h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    {isSearchOpen && (
                        <div className="absolute inset-x-0 top-full bg-background border-b p-4 shadow-xl">
                            <div className="max-w-2xl mx-auto relative group">
                                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${isSearching ? "animate-pulse text-primary" : "text-muted-foreground"}`} />
                                <Input
                                    autoFocus
                                    className="pl-10 pr-10 h-12"
                                    placeholder="Search jewellery…"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-10 top-1/2 -translate-y-1/2"
                                        onClick={() => setSearchQuery("")}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery("");
                                    setSearchResults([]);
                                }}>
                                    <X className="h-4 w-4" />
                                </Button>

                                {/* Search Results Dropdown */}
                                {searchQuery.trim().length >= 2 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                                        {isSearching ? (
                                            <div className="p-8 text-center">
                                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                                                <p className="text-sm text-muted-foreground font-medium tracking-widest uppercase">Searching...</p>
                                            </div>
                                        ) : searchResults.length > 0 ? (
                                            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                                <div className="p-3 border-b bg-muted/30">
                                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Found {searchResults.length} Results</span>
                                                </div>
                                                {searchResults.map((product) => (
                                                    <Link
                                                        key={product.id}
                                                        to={`/product/${product.id}`}
                                                        onClick={() => {
                                                            setIsSearchOpen(false);
                                                            setSearchQuery("");
                                                        }}
                                                        className="flex items-center gap-4 p-3 hover:bg-primary/5 transition-colors group/item"
                                                    >
                                                        <div className="h-16 w-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                                            <img
                                                                src={product.thumbnail_full_url?.path || product.image || ""}
                                                                alt={product.name}
                                                                className="h-full w-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                                                                onError={(e: any) => e.target.src = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000"}
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-bold text-foreground truncate group-hover/item:text-primary transition-colors">{product.name}</h4>
                                                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{product.category_name || "Jewellery"}</p>
                                                            <p className="text-sm font-black text-primary mt-1">₹{parseFloat(product.unit_price || 0).toLocaleString()}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                                <Link
                                                    to={`/new-arrivals?search=${searchQuery}`}
                                                    onClick={() => setIsSearchOpen(false)}
                                                    className="block p-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-primary hover:bg-primary/10 transition-colors border-t"
                                                >
                                                    View All Products
                                                </Link>
                                            </div>
                                        ) : searchQuery.trim().length >= 3 ? (
                                            <div className="p-12 text-center">
                                                <div className="h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Search className="h-8 w-8 text-muted-foreground/30" />
                                                </div>
                                                <p className="text-sm text-foreground font-bold">No results for "{searchQuery}"</p>
                                                <p className="text-xs text-muted-foreground mt-2">Try checking for typos or use different keywords.</p>
                                            </div>
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </nav>
            </header>

            <NotificationPanel
                open={openNotification}
                onClose={() => setOpenNotification(false)}
            />
        </>
    );
};

export default ViyaHeader;
