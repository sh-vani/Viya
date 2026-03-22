import { createContext, useContext } from 'react';

export interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    product?: any;
}

export interface CartContextType {
    cartItems: CartItem[];
    loading: boolean;
    totalItems: number;
    totalPrice: number;
    isInCart: (productId: number) => boolean;
    getCartItemQuantity: (productId: number) => number;
    addToCart: (productId: number, quantity?: number) => Promise<void>;
    updateQuantity: (productId: number, quantity: number) => Promise<void>;
    removeFromCart: (productId: number) => Promise<void>;
    clearCart: () => void;
    refreshCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
