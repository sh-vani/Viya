import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartApi, BASE_URL } from '@/lib/api';
import { CartContext, CartItem, CartContextType } from './CartContextCore';

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        setLoading(true);
        const userDataStr = localStorage.getItem("user_data");
        const userData = userDataStr ? JSON.parse(userDataStr) : null;
        const userId = userData?.id || 5;

        let deviceToken = localStorage.getItem("device_token");
        if (!deviceToken) {
            deviceToken = "device_" + Math.random().toString(36).substr(2, 9);
            localStorage.setItem("device_token", deviceToken);
        }

        try {
            const params: any = { device_token: deviceToken };
            if (userId) params.user_id = userId;

            const response = await cartApi.getCart(params);
            
            const cartsData = response.data?.carts || {};
            let apiItems: any[] = [];
            
            // Flatten all arrays from the keys in the carts object (e.g. response.data.carts["1"])
            Object.values(cartsData).forEach((items: any) => {
                if (Array.isArray(items)) {
                    apiItems = [...apiItems, ...items];
                }
            });

            // Fallback to other possible structures if carts object is not found or empty
            if (apiItems.length === 0) {
                if (response.data?.data && Array.isArray(response.data.data)) {
                    apiItems = response.data.data;
                } else if (response.data?.cart && Array.isArray(response.data.cart)) {
                    apiItems = response.data.cart;
                } else if (Array.isArray(response.data)) {
                    apiItems = response.data;
                }
            }

            // Sync with local state only if we got valid items
            if (apiItems.length > 0) {
                const mappedItems = apiItems.map((apiItem: any) => {
                    const productL1 = apiItem.product || {};
                    const productL2 = productL1.product || {};
                    const productL3 = productL2.product || {};
                    
                    return {
                        id: apiItem.id || apiItem.cart_id,
                        product_id: apiItem.product_id,
                        quantity: apiItem.qty || apiItem.quantity || 1,
                        product: {
                            id: apiItem.product_id,
                            name: productL2.product_name || productL3.product_name || apiItem.product_name || `Product ${apiItem.product_id}`,
                            unit_price: apiItem.price || productL1.selling_price || productL2.min_sell_price || 0,
                            image: productL3.thumbnail_image_source 
                                ? (productL3.thumbnail_image_source.startsWith('http') ? productL3.thumbnail_image_source : `${BASE_URL}${productL3.thumbnail_image_source}`) 
                                : (productL2.thumbnail_image_source ? (productL2.thumbnail_image_source.startsWith('http') ? productL2.thumbnail_image_source : `${BASE_URL}${productL2.thumbnail_image_source}`) : ""),
                            details: productL3.description || productL2.subtitle_1 || ""
                        }
                    };
                });
                
                setCartItems(prev => {
                    // Start with API items
                    const merged: CartItem[] = [...mappedItems];
                    
                    // Add local items that haven't hit the API yet (optimistic items)
                    prev.forEach(pItem => {
                        const isInApi = merged.some(m => m.product_id === pItem.product_id);
                        if (!isInApi) {
                            merged.push(pItem);
                        }
                    });
                    
                    return merged;
                });
            } else if (response.data && response.data.message === "Cart is Empty") {
                // If API says empty, we only trust it if we don't have local items that are newer
                // Actually, we'll just keep local items as they are most likely correct for the current session data
            } else if (Array.isArray(apiItems) && apiItems.length === 0) {
                // If it's a truly empty array, we can clear it if no local items were just added
                setCartItems(prev => prev.length === 0 ? [] : prev);
            }
        } catch (error: any) {
            console.error("Failed to fetch cart from API", error?.response?.data || error.message);
            // On error, let localStorage and existing state be the source of truth
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        localStorage.setItem('viya_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const isInCart = (productId: number) => {
        return cartItems.some(item => item.product_id === productId);
    };

    const getCartItemQuantity = (productId: number) => {
        const item = cartItems.find(item => item.product_id === productId);
        return item ? item.quantity : 0;
    };

    const addItemToCart = async (productId: number, quantity = 1) => {
        // Use a placeholder or fetch product info if needed
        // For now, removing static data dependency
        const price = 0; // Will be updated by API response or fetch if necessary

        const userDataStr = localStorage.getItem("user_data");
        const userData = userDataStr ? JSON.parse(userDataStr) : null;
        const userId = userData?.id || 5; // Defaulting to 5 if not logged in, based on postman req

        let deviceToken = localStorage.getItem("device_token");
        if (!deviceToken) {
            deviceToken = "device_" + Math.random().toString(36).substr(2, 9);
            localStorage.setItem("device_token", deviceToken);
        }

        // Optimistic UI Update first
        const existingItem = cartItems.find(item => item.product_id === productId);
        if (existingItem) {
            setCartItems(prev => prev.map(item =>
                item.product_id === productId ? { ...item, quantity: item.quantity + quantity } : item
            ));
        } else {
            setCartItems(prev => [...prev, {
                id: Date.now(), // temporary id until fetch
                product_id: productId,
                quantity,
                product: {
                    id: productId,
                    product_name: "Item",
                    min_sell_price: 0
                }
            }]);
        }

        try {
            await cartApi.addToCart({
                product_id: productId,
                qty: quantity,
                price: price,
                product_type: "product",
                seller_id: 1, // Defaulting to 1 as per postman payload
                device_token: deviceToken,
                user_id: userId
            });
            
            // Sync with backend quietly
            setTimeout(() => {
                fetchCart();
            }, 1000); // 1s delay to allow backend to persist
        } catch (error) {
            console.error("Failed to add to cart API", error);
            // Revert optimistic update could go here
            throw error;
        }
    };

    const updateItemQuantity = async (productId: number, quantity: number) => {
        const item = cartItems.find(i => i.product_id === productId);
        if (!item) return;

        if (quantity <= 0) {
            removeItemFromCart(productId);
            return;
        }

        try {
            // Using item.id which maps to cart_id from API
            await cartApi.updateQuantity({ id: item.id, qty: quantity });
            setCartItems(prev => prev.map(i =>
                i.product_id === productId ? { ...i, quantity } : i
            ));
        } catch (error) {
            console.error("Failed to update quantity via API", error);
        }
    };

    const removeItemFromCart = async (productId: number) => {
        const item = cartItems.find(i => i.product_id === productId);
        if (!item) return;

        try {
            // Using item.id which maps to cart_id from API
            await cartApi.removeFromCart({ id: item.id });
            setCartItems(prev => prev.filter(i => i.product_id !== productId));
        } catch (error) {
            console.error("Failed to remove item via API", error);
        }
    };

    const clearCartItems = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => {
        const productPrice = item.product?.unit_price || item.product?.price || 0;
        return sum + (productPrice * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            totalItems,
            totalPrice,
            isInCart,
            getCartItemQuantity,
            addToCart: addItemToCart,
            updateQuantity: updateItemQuantity,
            removeFromCart: removeItemFromCart,
            clearCart: clearCartItems,
            refreshCart: fetchCart,
        }}>
            {children}
        </CartContext.Provider>
    );
};
