import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getRecommendedProducts } from "@/lib/api/products";
import ViyaHeader from "@/components/header/ViyaHeader";
import ViyaFooter from "@/components/footer/ViyaFooter";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductCarousel from "@/components/content/ProductCarousel";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, ArrowRight } from "lucide-react";

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [justForYouProducts, setJustForYouProducts] = useState([]);
    const [loadingJustForYou, setLoadingJustForYou] = useState(true);

    useEffect(() => {
        const loadPageData = async () => {
            if (!productId) return;

            setLoading(true);
            window.scrollTo(0, 0);

            try {
                const response = await getProductById(productId);

                if (response && response.data) {
                    const productData = response.data;
                    const productInfo = productData.product || {};

                    // Map API product to component structure
                    const mappedProduct = {
                        id: productData.id,
                        name: productData.product_name,
                        unit_price: productData.min_sell_price || productData.MaxSellingPrice || 0,
                        discount: productData.discount || 0,
                        details: productInfo.description?.replace(/<[^>]*>/g, '') || 'Experience the synthesis of Histor and modern luxury.',
                        specification: productInfo.specification,
                        images_full_url: [
                            { path: productInfo.thumbnail_image_source ? (productInfo.thumbnail_image_source.startsWith('http') ? productInfo.thumbnail_image_source : `https://amazadmin.viyacollective.com/${productInfo.thumbnail_image_source}`) : "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800" },
                            ...(productInfo.gallary_images || []).map((img: any) => ({
                                path: img.images_source.startsWith('http') ? img.images_source : `https://amazadmin.viyacollective.com/${img.images_source}`
                            }))
                        ],
                        brand: productInfo.brand || { name: "Viya Exclusive" }
                    };

                    setProduct(mappedProduct);
                    setCategory(mappedProduct.brand);

                    setLoadingJustForYou(true);
                    // Map related products
                    const related = (productInfo.related_products || []).map((rp: any) => {
                        const relProd = rp.product || {};
                        return {
                            id: rp.product_id || rp.id,
                            name: rp.product_name || relProd.product_name,
                            unit_price: rp.min_sell_price || 0,
                            discount: rp.discount || 0,
                            thumbnail_full_url: {
                                path: (rp.thum_img || relProd.thumbnail_image_source) ? (
                                    (rp.thum_img || relProd.thumbnail_image_source).startsWith('http') ?
                                        (rp.thum_img || relProd.thumbnail_image_source) :
                                        `https://amazadmin.viyacollective.com/${rp.thum_img || relProd.thumbnail_image_source}`
                                ) : "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800"
                            }
                        };
                    });
                    setJustForYouProducts(related);
                    setLoadingJustForYou(false);

                    // Also fetch recommended products from the specific API
                    try {
                        const recResponse = await getRecommendedProducts();
                        const recommendedDataArray = Array.isArray(recResponse) ? recResponse : (recResponse?.data || []);
                        if (recommendedDataArray.length > 0) {
                            const recommended = recommendedDataArray.map((rp: any) => {
                                const relProd = rp.product || {};
                                return {
                                    id: rp.product_id || rp.id || relProd.id,
                                    name: rp.product_name || relProd.product_name,
                                    unit_price: rp.min_sell_price || relProd.min_sell_price || 0,
                                    discount: rp.discount || relProd.discount || 0,
                                    thumbnail_full_url: {
                                        path: (rp.thum_img || relProd.thumbnail_image_source) ? (
                                            (rp.thum_img || relProd.thumbnail_image_source).startsWith('http') ?
                                                (rp.thum_img || relProd.thumbnail_image_source) :
                                                `https://amazadmin.viyacollective.com/${rp.thum_img || relProd.thumbnail_image_source}`
                                        ) : "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800"
                                    }
                                };
                            });
                            setJustForYouProducts(recommended);
                        }
                    } catch (recErr) {
                        console.error("Failed to load recommended products:", recErr);
                    }
                }
            } catch (err) {
                console.error("Failed to load product details:", err);
            } finally {
                setLoading(false);
            }
        };

        loadPageData();
    }, [productId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FBF9F6] dark:bg-black">
                <ViyaHeader />
                <main className="pt-24 lg:pt-32 container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-5">
                            <Skeleton className="aspect-[4/5] w-full rounded-[3rem]" />
                        </div>
                        <div className="lg:col-span-7 space-y-8">
                            <Skeleton className="h-6 w-32 rounded-full" />
                            <Skeleton className="h-16 w-full rounded-2xl" />
                            <Skeleton className="h-10 w-24 rounded-xl" />
                            <Skeleton className="h-32 w-full rounded-3xl" />
                            <Skeleton className="h-20 w-full rounded-2xl" />
                        </div>
                    </div>
                </main>
                <ViyaFooter />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col bg-[#FBF9F6] dark:bg-black">
                <ViyaHeader />
                <main className="flex-grow flex flex-col items-center justify-center text-center p-8">
                    <div className="w-24 h-24 bg-[#E5B876]/10 rounded-full flex items-center justify-center mb-8">
                        <Sparkles className="h-12 w-12 text-[#E5B876]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-medium text-[#1A1612] dark:text-white mb-4">Masterpiece Not Found</h2>
                    <p className="text-[#8C8276] dark:text-gray-400 mb-12 max-w-md font-light">The piece you are looking for has returned to our private archives or never existed.</p>
                    <Link
                        to="/new-arrivals"
                        className="h-14 px-10 bg-[#1A1612] text-white rounded-2xl flex items-center gap-3 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl"
                    >
                        Explore Collections <ArrowRight size={14} />
                    </Link>
                </main>
                <ViyaFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <ViyaHeader />

            <main className="pt-16 sm:pt-24 lg:pt-32">
                {/* PRODUCT DETAIL SECTION */}
                <section className="bg-[#FBF9F6] dark:bg-black">
                    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                        {/* BREADCRUMBS */}
                        <div className="mb-4 sm:mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
                            <Breadcrumb>
                                <BreadcrumbList className="flex items-center gap-3">
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link to="/" className="text-[10px] uppercase tracking-[0.3em] text-[#8C8276] dark:text-gray-400 font-bold hover:text-[#E5B876] transition-colors">MARKETPLACE</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="text-[#F0EBE3] dark:text-gray-600">/</BreadcrumbSeparator>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link to="/new-arrivals" className="text-[10px] uppercase tracking-[0.3em] text-[#8C8276] dark:text-gray-400 font-bold hover:text-[#E5B876] transition-colors">COLLECTIONS</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="text-[#F0EBE3] dark:text-gray-600">/</BreadcrumbSeparator>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1612] dark:text-white">{product?.name}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>

                        {/* PRODUCT GRID */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-10 lg:gap-16 xl:gap-20 items-start pb-10 sm:pb-20 md:pb-32">
                            {/* IMAGES - CHOTA KAR DIYA */}
                            <div className="lg:col-span-5">
                                <ProductImageGallery product={product} />
                            </div>

                            {/* INFO - BADA KAR DIYA */}
                            <div className="lg:col-span-7 lg:sticky lg:top-32">
                                <ProductInfo product={product} categoryName={category?.name || "Viya Exclusive"} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* YOU MAY ALSO LOVE */}
                {justForYouProducts.length > 0 && (
                    <section className="bg-white dark:bg-black py-24 md:py-32 border-t border-[#F0EBE3] dark:border-gray-800">
                        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                            <div className="flex items-end justify-between mb-16 border-b border-[#F0EBE3] dark:border-gray-800 pb-6">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E5B876]/10 dark:bg-[#E5B876]/20 rounded-full border border-[#E5B876]/20">
                                        <Sparkles className="h-3 w-3 text-[#E5B876]" />
                                        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#E5B876]">Curated Curations</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-display font-medium text-[#1A1612] dark:text-white">
                                        You May Also <span className="text-[#E5B876] italic font-serif">Love</span>
                                    </h2>
                                </div>
                                <Link
                                    to="/new-arrivals"
                                    className="hidden md:inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1612] dark:text-white hover:text-[#E5B876] transition-colors group"
                                >
                                    View Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                            <ProductCarousel products={justForYouProducts} loading={loadingJustForYou} />
                        </div>
                    </section>
                )}
            </main>

            <ViyaFooter />
        </div>
    );
};

export default ProductDetail;