import { useEffect } from "react";
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";

const PrivacyPolicy = () => {
    useEffect(() => {
        document.title = "Privacy Policy - Viya";
    }, []);

    return (
        <div className="min-h-screen bg-background dark:bg-black">
            <ViyaHeader />

            <main className="pt-6 pb-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    <header className="text-center mb-12">
                        <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-muted-foreground">Last updated: January 2024</p>
                    </header>

                    <div className="space-y-8 text-muted-foreground">
                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Introduction</h2>
                            <p className="leading-relaxed">
                                At Viya, we respect your privacy and are committed to protecting your personal data.
                                This Privacy Policy explains how we collect, use, and safeguard your information when you visit
                                our website or make a purchase.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Information We Collect</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Name, email address, and contact information</li>
                                <li>Billing and shipping addresses</li>
                                <li>Payment information (processed securely through third-party providers)</li>
                                <li>Order history and preferences</li>
                                <li>Device and browser information for website optimization</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Processing and fulfilling your orders</li>
                                <li>Sending order updates and delivery notifications</li>
                                <li>Providing customer support</li>
                                <li>Sending promotional communications (with your consent)</li>
                                <li>Improving our website and services</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Data Security</h2>
                            <p className="leading-relaxed">
                                We implement industry-standard security measures to protect your personal information.
                                Payment processing is handled by secure third-party providers, and we never store your
                                complete payment card details on our servers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Your Rights</h2>
                            <p className="leading-relaxed mb-4">You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate information</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Withdraw consent at any time</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
                            <p className="leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <div className="mt-4 bg-cream-50 rounded-xl p-4">
                                <p>Email: privacy@Viya.com</p>
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

export default PrivacyPolicy;


