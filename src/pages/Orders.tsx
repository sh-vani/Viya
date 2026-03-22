import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Truck, CheckCircle, Clock, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";
import { Button } from "@/components/ui/button";
import { orderApi } from "@/lib/api";

const Orders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await orderApi.getOrderList();
            if (response.data?.orders) {
                setOrders(response.data.orders);
            }
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered': return <CheckCircle className="text-green-500" size={18} />;
            case 'shipped': return <Truck className="text-blue-500" size={18} />;
            case 'pending': return <Clock className="text-amber-500" size={18} />;
            default: return <Package className="text-[#E5B876]" size={18} />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FBF9F6] dark:bg-black">
                <ViyaHeader />
                <main className="pt-40 pb-24 px-4 flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-[#E5B876] border-t-transparent rounded-full animate-spin"></div>
                </main>
                <ViyaFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FBF9F6] dark:bg-black">
            <ViyaHeader />

            <main className="pt-32 pb-24 px-4 md:px-8">
                <div className="container mx-auto max-w-5xl">
                    <div className="mb-12">
                        <Link to="/" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#8C8276] hover:text-[#1A1612] transition-colors mb-6">
                            <ArrowLeft size={14} className="mr-2" />
                            Return Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-display font-medium text-[#1A1612] dark:text-white">
                            Your <span className="italic text-[#E5B876]">Passages.</span>
                        </h1>
                        <p className="text-[#8C8276] dark:text-gray-400 font-light mt-4">Review the history of your curated selections.</p>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white dark:bg-black rounded-[2.5rem] p-16 text-center border border-[#F0EBE3] dark:border-gray-800 shadow-sm">
                            <ShoppingBag size={48} className="mx-auto text-[#E5B876]/20 mb-6" />
                            <h2 className="text-2xl font-display font-medium text-[#1A1612] dark:text-white mb-4">No manifests recorded yet</h2>
                            <p className="text-[#8C8276] dark:text-gray-400 mb-8 max-w-sm mx-auto">Your journey is just beginning. Explore our collections to find your first piece.</p>
                            <Link to="/new-arrivals">
                                <Button className="bg-[#1A1612] text-white px-8 h-12 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-black">Begin Exploring</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white dark:bg-black rounded-[2rem] p-6 md:p-8 border border-[#F0EBE3] dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-[#A69D91] font-bold mb-1">Order Number</p>
                                            <h3 className="text-lg font-bold text-[#1A1612] dark:text-white">#{order.order_number}</h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] uppercase tracking-widest text-[#A69D91] font-bold mb-1">Amount Paid</p>
                                            <p className="text-xl font-bold text-[#E5B876]">₹{order.grand_total?.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-12 border-t border-[#F0EBE3] dark:border-gray-800 pt-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#FBF9F6] dark:bg-gray-900 rounded-full flex items-center justify-center">
                                                {getStatusIcon(order.status || 'pending')}
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-[#A69D91] font-bold">Status</p>
                                                <p className="text-xs font-bold text-[#1A1612] dark:text-white uppercase tracking-wider">{order.status || 'Pending'}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-[#A69D91] font-bold">Placed on</p>
                                            <p className="text-xs font-bold text-[#1A1612] dark:text-white uppercase tracking-wider">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-[#A69D91] font-bold">Demeanor</p>
                                            <p className="text-xs font-bold text-[#1A1612] dark:text-white uppercase tracking-wider">{order.payment_method || 'COD'}</p>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <Link to={`/track/${order.order_number}`}>
                                            <Button variant="outline" className="border-[#F0EBE3] dark:border-gray-800 hover:bg-[#FBF9F6] text-[9px] font-bold uppercase tracking-[0.2em] h-10 px-6 rounded-lg">
                                                Track Passage <ArrowRight size={14} className="ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <ViyaFooter />
        </div>
    );
};

export default Orders;
