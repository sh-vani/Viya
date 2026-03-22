import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Package, Truck, CheckCircle, Clock, MapPin, ArrowLeft, Search } from "lucide-react";
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { orderApi } from "@/lib/api";
import { toast } from "sonner";

const TrackOrder = () => {
    const { orderNumber: paramOrderNumber } = useParams();
    const [orderNumber, setOrderNumber] = useState(paramOrderNumber || "");
    const [phone, setPhone] = useState("");
    const [trackingData, setTrackingData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!orderNumber || !phone) {
            toast.error("Please provide both order number and phone.");
            return;
        }

        setLoading(true);
        try {
            const response = await orderApi.trackOrder({
                order_number: orderNumber,
                phone: phone
            });
            setTrackingData(response.data);
            toast.success("Tracking information updated.");
        } catch (error) {
            console.error("Tracking failed", error);
            toast.error("Could not find order. Please verify details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (paramOrderNumber) {
            // Logic for pre-filling phone if available could go here
        }
    }, [paramOrderNumber]);

    const getStatusStep = (status: string) => {
        const statuses = ['pending', 'confirmed', 'shipped', 'delivered'];
        const currentIdx = statuses.indexOf(status.toLowerCase());
        return currentIdx === -1 ? 0 : currentIdx;
    };

    return (
        <div className="min-h-screen bg-[#FBF9F6] dark:bg-black">
            <ViyaHeader />

            <main className="pt-32 pb-24 px-4 md:px-8">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-display font-medium text-[#1A1612] dark:text-white mb-4">
                            Track your <span className="italic text-[#E5B876]">Passage.</span>
                        </h1>
                        <p className="text-[#8C8276] dark:text-gray-400 font-light">Monitor the journey of your curated selection.</p>
                    </div>

                    <div className="bg-white dark:bg-black rounded-[2.5rem] p-8 md:p-12 border border-[#F0EBE3] dark:border-gray-800 shadow-sm mb-12">
                        <form onSubmit={handleTrack} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                            <div className="space-y-3">
                                <Label htmlFor="orderNumber" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91] ml-2">Order Number</Label>
                                <Input
                                    id="orderNumber"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    placeholder="VIYA-12345"
                                    className="h-14 rounded-2xl border-[#F0EBE3] dark:border-gray-800"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="phone" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91] ml-2">Phone Number</Label>
                                <Input
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="9988776655"
                                    className="h-14 rounded-2xl border-[#F0EBE3] dark:border-gray-800"
                                />
                            </div>
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="h-14 bg-[#1A1612] text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.3em] hover:bg-black w-full"
                            >
                                {loading ? "Updating..." : "Trace Journey"}
                            </Button>
                        </form>
                    </div>

                    {trackingData && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {/* Status Timeline */}
                            <div className="bg-white dark:bg-black rounded-[2.5rem] p-8 md:p-12 border border-[#F0EBE3] dark:border-gray-800 shadow-sm">
                                <div className="flex justify-between items-center mb-12">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-[#A69D91] font-bold mb-1">Current Status</p>
                                        <h3 className="text-2xl font-display font-medium text-[#1A1612] dark:text-white uppercase tracking-tight">
                                            {trackingData.status || 'Processing'}
                                        </h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] uppercase tracking-widest text-[#A69D91] font-bold mb-1">Passage Number</p>
                                        <p className="text-lg font-bold text-[#E5B876]">#{trackingData.order_number}</p>
                                    </div>
                                </div>

                                <div className="relative pt-8 pb-4">
                                    <div className="absolute top-[52px] left-0 w-full h-[2px] bg-[#F0EBE3] dark:bg-gray-800 -z-0"></div>
                                    <div 
                                        className="absolute top-[52px] left-0 h-[2px] bg-[#E5B876] transition-all duration-1000 -z-0" 
                                        style={{ width: `${(getStatusStep(trackingData.status || '') / 3) * 100}%` }}
                                    ></div>

                                    <div className="flex justify-between relative z-10">
                                        {[
                                            { label: 'Pending', icon: Clock },
                                            { label: 'Confirmed', icon: Package },
                                            { label: 'Shipped', icon: Truck },
                                            { label: 'Delivered', icon: CheckCircle }
                                        ].map((step, idx) => {
                                            const isDone = idx <= getStatusStep(trackingData.status || '');
                                            const Icon = step.icon;
                                            return (
                                                <div key={step.label} className="flex flex-col items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isDone ? 'bg-[#E5B876] text-white shadow-lg' : 'bg-white dark:bg-gray-900 text-[#A69D91] border border-[#F0EBE3] dark:border-gray-800'}`}>
                                                        <Icon size={20} />
                                                    </div>
                                                    <span className={`text-[9px] uppercase tracking-[0.2em] font-bold ${isDone ? 'text-[#1A1612] dark:text-white' : 'text-[#A69D91]'}`}>
                                                        {step.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Shipment Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <section className="bg-white dark:bg-black rounded-[2.5rem] p-8 border border-[#F0EBE3] dark:border-gray-800 shadow-sm space-y-6">
                                    <h4 className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#1A1612] dark:text-white">
                                        <MapPin size={16} className="text-[#E5B876]" />
                                        Destination
                                    </h4>
                                    <div className="space-y-1">
                                        <p className="text-sm text-[#1A1612] dark:text-white font-medium">{trackingData.shipping_address}</p>
                                        <p className="text-sm text-[#8C8276]">{trackingData.shipping_city}, {trackingData.shipping_state}</p>
                                        <p className="text-sm text-[#8C8276]">{trackingData.shipping_postcode}</p>
                                    </div>
                                </section>

                                <section className="bg-white dark:bg-black rounded-[2.5rem] p-8 border border-[#F0EBE3] dark:border-gray-800 shadow-sm space-y-6">
                                    <h4 className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#1A1612] dark:text-white">
                                        <Clock size={16} className="text-[#E5B876]" />
                                        Logistics
                                    </h4>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-[#A69D91] font-bold">Estimated Arrival</p>
                                        <p className="text-sm text-[#1A1612] dark:text-white font-medium">Within 3-5 Solar Days</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}

                    <div className="mt-16 text-center">
                        <Link to="/orders" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8C8276] hover:text-[#1A1612] transition-colors flex items-center justify-center gap-2">
                            <ArrowLeft size={14} />
                            Back to All Manifests
                        </Link>
                    </div>
                </div>
            </main>

            <ViyaFooter />
        </div>
    );
};

export default TrackOrder;
