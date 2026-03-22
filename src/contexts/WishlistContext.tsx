import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { wishlistApi } from '@/lib/api';

interface WishlistContextType {
    wishlistItems: any[];
    loading: boolean;
    isInWishlist: (productId: number) => boolean;
    toggleWishlist: (productId: number) => Promise<{ 
        success: boolean; 
        action?: 'added' | 'removed'; 
        error?: string 
    }>;
    refreshWishlist: () => Promise<void>;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlistItems, setWishlistItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        setLoading(true);
        try {
            const response = await wishlistApi.getWishlist();
            console.log("📦 Wishlist API Raw Response:", response.data);
            
            // Handle the nested structure: response.data.products["1"] or similar
            const productsData = response.data?.products || {};
            let allItems: any[] = [];
            
            // Flatten all arrays from the keys in the products object
            Object.values(productsData).forEach((items: any) => {
                if (Array.isArray(items)) {
                    allItems = [...allItems, ...items];
                }
            });

            if (allItems.length > 0) {
                setWishlistItems(allItems);
            } else {
                // Fallback for different response structure or empty wishlist
                const items = response.data?.data || response.data || [];
                if (Array.isArray(items)) {
                    setWishlistItems(items);
                } else {
                    setWishlistItems([]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch wishlist", error);
            const savedWishlist = localStorage.getItem('viya_wishlist');
            if (savedWishlist) {
                setWishlistItems(JSON.parse(savedWishlist));
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    useEffect(() => {
        localStorage.setItem('viya_wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const isInWishlist = (productId: number) => {
        return wishlistItems.some(item => 
            item.product_id === productId || 
            item.seller_product_id === productId ||
            item.product?.id === productId ||
            item.product?.product_id === productId
        );
    };

    const toggleWishlist = async (productId: number): Promise<{ success: boolean; action?: 'added' | 'removed'; error?: string }> => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            return { success: false, error: "Please log in to add to wishlist" };
        }

        // Find if item exists in current state (checking all possible ID fields)
        const existingItem = wishlistItems.find(item => 
            item.product_id === productId || 
            item.seller_product_id === productId ||
            item.product?.id === productId ||
            item.product?.product_id === productId
        );

        if (existingItem) {
            // OPTIMISTIC REMOVE
            const oldItems = [...wishlistItems];
            const wishlistId = existingItem.id;

            setWishlistItems(prev => prev.filter(item => item.id !== wishlistId));

            try {
                const response = await wishlistApi.removeFromWishlist({ 
                    id: productId, 
                    type: "product" 
                });
                return { success: true, action: 'removed' };
            } catch (error) {
                console.error("Failed to remove from wishlist", error);
                setWishlistItems(oldItems); // Rollback
                return { success: false, error: "Failed to remove from wishlist" };
            }
        } else {
            // OPTIMISTIC ADD
            const newItem = { 
                id: Date.now(), // Temp ID
                product_id: productId, 
                seller_product_id: productId,
                product_name: "Loading...",
                type: "product" 
            };
            
            const oldItems = [...wishlistItems];
            setWishlistItems(prev => [...prev, newItem]);

            try {
                await wishlistApi.addToWishlist({
                    seller_id: 1, // Default seller ID
                    seller_product_id: productId,
                    type: "product"
                });
                // Sync with server to get full product details
                fetchWishlist();
                return { success: true, action: 'added' };
            } catch (error: any) {
                const apiError = error;
                if (apiError.response?.data?.message === "app.Product already in wishlist") {
                    fetchWishlist();
                    return { success: true, action: 'added' };
                } else {
                    console.error("Failed to add to wishlist", error);
                    setWishlistItems(oldItems); // Rollback
                    return { 
                        success: false, 
                        error: apiError.response?.data?.message || "Failed to add to wishlist" 
                    };
                }
            }
        }
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            loading,
            isInWishlist,
            toggleWishlist,
            refreshWishlist: fetchWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
