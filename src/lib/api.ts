import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL || "https://amazadmin.viyacollective.com/api/";
export const BASE_URL = VITE_API_URL.replace(/\/api\/?$/, "/");

export const api = axios.create({
    baseURL: VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("🔐 API Request:", config.method?.toUpperCase(), config.url);
        console.log("🔐 Auth Token:", token ? "Present" : "Missing");
        return config;
    },
    (error) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
    }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
    (response) => {
        console.log("✅ API Response:", response.config.url, response.status);
        return response;
    },
    (error) => {
        console.error("❌ API Error:", error.config?.url, error.response?.status);
        console.error("❌ Error Details:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const authApi = {
    sendOtp: (email: string) => api.post("send-otp", { email }),
    verifyOtp: (email: string, otp: string) => api.post("verify-otp", { email, otp }),
};

export const cartApi = {
    addToCart: (data: {
        product_id: number;
        qty: number;
        price: number;
        product_type: string;
        seller_id: number;
        device_token: string;
        user_id: number;
    }) => api.post("cart", data),
    getCart: (params: { user_id?: number | string; device_token?: string }) =>
        api.get("cart", { params }),
    removeFromCart: (data: { id: number }) => api.post("cart/remove", data),
    updateQuantity: (data: { id: number; qty: number }) => api.post("cart/update-qty", data),
};

export const wishlistApi = {
    getWishlist: () => api.get("wishlist"),
    addToWishlist: (data: { seller_id: number; seller_product_id: number; type: string }) => 
        api.post("wishlist", data),
    removeFromWishlist: (data: { id: number; type: string }) => 
        api.post("wishlist/delete/", data),
};

export const checkoutApi = {
    getCheckout: () => api.get("checkout"),
    applyCoupon: (data: { coupon_code: string; shopping_amount: number }) => 
        api.post("checkout/coupon-apply", data),
    checkPriceUpdate: (data: any) => 
        api.post("checkout/check-price-update", data),
};

export const orderApi = {
    placeOrder: (data: any) => api.post("order-store", data),
    getOrderList: () => api.get("order-list"),
    trackOrder: (data: { order_number: string; phone: string }) => api.post("order-track", data),
};

export const paymentApi = {
    getPaymentGateways: () => api.get("payment-gateways"),
    payWithRazorpay: () => api.get("pay-with-razorpay"),
    captureRazorpayPayment: (data: { razorpay_payment_id: string; [key: string]: any }) => 
        api.post("razorpay-payment", data),
};

export const profileApi = {
    getAddressList: () => api.get("profile/address-list"),
    storeAddress: (data: {
        name: string;
        email: string;
        address: string;
        phone: string;
        city: string;
        state: string;
        country: string;
        postal_code: string;
    }) => api.post("profile/address-store", data),
    updateAddress: (id: number | string, data: any) => 
        api.post(`profile/address-update/${id}`, data),
    deleteAddress: (id: number | string) => 
        api.post("profile/address-delete", { id }),
    setDefaultShipping: (id: number | string) => 
        api.post("profile/default-shipping-address", { id }),
    setDefaultBilling: (id: number | string) => 
        api.post("profile/default-billing-address", { id }),
};

export const searchApi = {
    getLiveSearch: (search: string) => api.get("live-search", { params: { search } }),
};

