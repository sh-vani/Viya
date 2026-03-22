import { useEffect } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import ViyaHeader from "../../components/header/ViyaHeader";
import ViyaFooter from "../../components/footer/ViyaFooter";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";

const CustomerCare = () => {
    useEffect(() => {
        document.title = "Customer Care - Viya";
    }, []);

    return (
        <div className="min-h-screen bg-background dark:bg-black">
            <ViyaHeader />

            <main className="pt-6 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                            Customer Care
                        </h1>
                        <p className="text-muted-foreground">
                            We're here to help you with all your queries
                        </p>
                    </div>

                    {/* Contact Options */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-cream-50 rounded-2xl p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
                                <Phone className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
                            <p className="text-muted-foreground text-sm mb-1">+91 99771324500</p>
                            <p className="text-xs text-muted-foreground">Mon-Sat: 10AM-7PM IST</p>
                        </div>
                        <div className="bg-cream-50 rounded-2xl p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
                                <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
                            <p className="text-muted-foreground text-sm mb-1">info@Viya.com</p>
                            <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                        </div>
                        <div className="bg-cream-50 rounded-2xl p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
                            <p className="text-muted-foreground text-sm mb-1">+91 99771324500</p>
                            <p className="text-xs text-muted-foreground">Quick responses</p>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mb-12">
                        <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-8">
                            Frequently Asked Questions
                        </h2>
                        <Accordion type="single" collapsible className="space-y-3">
                            <AccordionItem value="shipping" className="bg-cream-50 rounded-xl px-6 border-0">
                                <AccordionTrigger className="text-left hover:no-underline py-4">
                                    What are the shipping charges and delivery time?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-4">
                                    We offer free shipping on orders above ₹999. Standard delivery takes 5-7 business days, and express delivery takes 2-3 business days. All orders are shipped with tracking.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="returns" className="bg-cream-50 rounded-xl px-6 border-0">
                                <AccordionTrigger className="text-left hover:no-underline py-4">
                                    What is your return and exchange policy?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-4">
                                    We offer 7-day easy returns for unused items in original packaging. Exchanges are free of cost. Simply raise a return request from your orders page or contact us.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="quality" className="bg-cream-50 rounded-xl px-6 border-0">
                                <AccordionTrigger className="text-left hover:no-underline py-4">
                                    Is the jewellery skin-friendly?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-4">
                                    Yes! All our jewellery is made with high-quality materials and is hypoallergenic. We use nickel-free and lead-free components to ensure it's safe for all skin types.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="care" className="bg-cream-50 rounded-xl px-6 border-0">
                                <AccordionTrigger className="text-left hover:no-underline py-4">
                                    How should I care for my jewellery?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-4">
                                    Store your jewellery in a dry place, preferably in the pouch provided. Avoid contact with water, perfume, and cosmetics. Wipe gently with a soft cloth after use.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="cod" className="bg-cream-50 rounded-xl px-6 border-0">
                                <AccordionTrigger className="text-left hover:no-underline py-4">
                                    Do you offer Cash on Delivery?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-4">
                                    Yes, we offer Cash on Delivery (COD) across India. You can also pay via UPI, credit/debit cards, net banking, and popular wallets.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-cream-50 rounded-2xl p-6 md:p-8">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                            Send us a Message
                        </h2>
                        <form className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Input className="rounded-full" placeholder="Your Name" />
                                </div>
                                <div>
                                    <Input type="email" className="rounded-full" placeholder="Email Address" />
                                </div>
                            </div>
                            <div>
                                <Input className="rounded-full" placeholder="Order Number (Optional)" />
                            </div>
                            <div>
                                <Textarea
                                    className="rounded-xl min-h-[120px]"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <Button type="submit" className="w-full rounded-full">
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </main>

            <ViyaFooter />
        </div>
    );
};

export default CustomerCare;


