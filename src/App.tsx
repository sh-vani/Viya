
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { WishlistProvider } from "./contexts/WishlistContext";
import { CartProvider } from "./contexts/CartContext";

import Index from "./pages/Index";
import Category from "./pages/Category";
import Brand from "./pages/Brand";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import TrackOrder from "./pages/TrackOrder";
import NotFound from "./pages/NotFound";

import OurStory from "./pages/about/OurStory";
import Sustainability from "./pages/about/Sustainability";
import SizeGuide from "./pages/about/SizeGuide";
import CustomerCare from "./pages/about/CustomerCare";
import StoreLocator from "./pages/about/StoreLocator";
import Contact from "./pages/about/Contact";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

import SignIn from "./pages/auth/sigin";
import Registration from "./pages/auth/Registration";
import Profile from "./pages/auth/Profile";
import Wishlist from "./pages/auth/Wishlist"; // ✅ correct import
import Cart from "./pages/auth/Cart";
import NotificationPanel from "./pages/auth/NotificationPanel";
import NewArrivals from "./pages/NewArrivals";
import Combo from "./pages/Combo";
import Offers from "./pages/Offers";
const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <WishlistProvider>
            <CartProvider>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <ScrollToTop />
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/category/:category" element={<Category />} />
                            <Route path="/brand/:brandSlug" element={<Brand />} />
                            <Route path="/product/:productId" element={<ProductDetail />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/track/:orderNumber?" element={<TrackOrder />} />

                            <Route path="/about/our-story" element={<OurStory />} />
                            <Route path="/about/sustainability" element={<Sustainability />} />
                            <Route path="/about/size-guide" element={<SizeGuide />} />
                            <Route path="/about/customer-care" element={<CustomerCare />} />
                            <Route path="/about/store-locator" element={<StoreLocator />} />
                            <Route path="/contact" element={<Contact />} />

                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/terms-of-service" element={<TermsOfService />} />

                            <Route path="/account" element={<SignIn />} />
                            <Route path="/register" element={<Registration />} />
                            <Route path="/profile" element={<Profile />} />

                            {/* ✅ FIXED ROUTE */}
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/notifications" element={<NotificationPanel open={true} onClose={() => { }} />} />
                            <Route path="/new-arrivals" element={<NewArrivals />} />
                            <Route path="/combo" element={<Combo />} />
                            <Route path="/offers" element={<Offers />} />

                            <Route path="*" element={<NotFound />} />
                        </Routes>

                        {/* Floating Offers Button */}
                        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
                            <Link
                                to="/combo"
                                className="flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-l-lg shadow-lg hover:bg-primary-hover transition-all duration-300 group dark:shadow-gold"
                                style={{
                                    width: '48px',
                                    height: '120px',
                                }}
                            >
                                {/* Vertical Text - rotated to read top-to-bottom */}
                                <span
                                    className="text-sm font-bold uppercase tracking-wide"
                                    style={{
                                        writingMode: 'vertical-rl',
                                        transform: 'rotate(180deg)',
                                    }}
                                >
                                    Gift Combo
                                </span>
                            </Link>
                        </div>
                    </BrowserRouter>
                </TooltipProvider>
            </CartProvider>
        </WishlistProvider>
    </QueryClientProvider>
);

export default App;

