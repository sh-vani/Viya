import { api } from "../api";

export const getTopPicks = async () => {
    try {
        const response = await api.get("version2/top-picks");
        return response.data.top_picks || [];
    } catch (error) {
        console.error("Error fetching top picks:", error);
        throw error;
    }
};

export const getProductById = async (id: string | number) => {
    try {
        // Version is now handled in baseURL
        const response = await api.get(`seller/product-by-id/${id}`);
        return response.data || null;
    } catch (error) {
        console.error("Error fetching product details:", error);
        throw error;
    }
};
export const getFlashDeal = async () => {
    try {
        const response = await api.get("marketing/flash-deal");
        return response.data;
    } catch (error) {
        console.error("Error fetching flash deal:", error);
        throw error;
    }
};
export const getTopCategories = async () => {
    try {
        const response = await api.get("version2/top-categories");
        return response.data.top_categories || [];
    } catch (error) {
        console.error("Error fetching top categories:", error);
        throw error;
    }
};
export const getRecommendedProducts = async () => {
    try {
        const response = await api.get("seller/products/recommended-product");
        return response.data || [];
    } catch (error) {
        console.error("Error fetching recommended products:", error);
        throw error;
    }
};

export const getProductsByCategory = async (categoryId: string | number) => {
    try {
        const response = await api.get(`product/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching products for category ${categoryId}:`, error);
        throw error;
    }
};
export const getCategoryList = async () => {
    try {
        const response = await api.get("category-list");
        return response.data || [];
    } catch (error) {
        console.error("Error fetching category list:", error);
        throw error;
    }
};

export const getSliders = async () => {
    try {
        const response = await api.get("version2/sliders");
        return response.data.sliders || [];
    } catch (error) {
        console.error("Error fetching sliders:", error);
        throw error;
    }
};
