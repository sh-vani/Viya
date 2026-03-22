import { useEffect } from "react";
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";

const TermsOfService = () => {
    useEffect(() => {
        document.title = "Terms of Service - Viya";
    }, []);

    return (
        <div className="min-h-screen bg-background dark:bg-black">
            <ViyaHeader />

            <main className="pt-6 pb-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    <header className="text-center mb-12">
                        <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                            Terms of Service
                        </h1>
                        <p className="text-muted-foreground">Last updated: January 2024</p>
                    </header>

                    <div className="space-y-8 text-muted-foreground">
                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Agreement to Terms</h2>
                            <p className="leading-relaxed">
                                By accessing and using the Viyawebsite and services, you accept and agree to be
                                bound by these Terms of Service. Please read them carefully before making a purchase.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Products & Pricing</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>All prices are in Indian Rupees (₹) and include applicable taxes</li>
                                <li>We reserve the right to modify prices without prior notice</li>
                                <li>Product images are for reference; actual products may vary slightly</li>
                                <li>Product availability is subject to stock</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Orders & Payment</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Orders are confirmed upon successful payment</li>
                                <li>We accept COD, UPI, credit/debit cards, and net banking</li>
                                <li>We reserve the right to cancel orders in case of pricing errors or suspected fraud</li>
                                <li>Order confirmation will be sent to your registered email</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Shipping & Delivery</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>We deliver across India</li>
                                <li>Standard delivery: 5-7 business days</li>
                                <li>Express delivery: 2-3 business days</li>
                                <li>Free shipping on orders above ₹999</li>
                                <li>Delivery times may vary based on location and availability</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Returns & Refunds</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>7-day return policy for unused items in original packaging</li>
                                <li>Items must be in original condition with tags attached</li>
                                <li>Refunds will be processed within 7-10 business days</li>
                                <li>Return shipping costs may apply</li>
                                <li>Sale items may have different return policies</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Product Care</h2>
                            <p className="leading-relaxed">
                                Our fashion jewellery requires proper care to maintain its beauty. Store in a dry place,
                                avoid contact with water and chemicals, and handle with care. Damage due to improper
                                handling is not covered under returns.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Intellectual Property</h2>
                            <p className="leading-relaxed">
                                All content on this website, including images, text, designs, and logos, is the property
                                of Viyaand is protected by intellectual property laws. Unauthorized use is prohibited.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
                            <p className="leading-relaxed">
                                For any questions regarding these Terms of Service, please contact us:
                            </p>
                            <div className="mt-4 bg-cream-50 rounded-xl p-4">
                                <p>Email: legal@Viya.com</p>
                                <p>Phone: +91 99771324500</p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <ViyaFooter />
        </div>
    );
};

export default TermsOfService;



