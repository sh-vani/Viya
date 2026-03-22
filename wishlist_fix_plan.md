# Implementation Plan - Wishlist Fix

The wishlist feature is currently failing in the UI due to type mismatches and missing return values in the `toggleWishlist` function.

## Proposed Changes

### [Component] Wishlist Context
Modify `src/contexts/WishlistContext.tsx` to return a status object from `toggleWishlist`.

#### [MODIFY] [WishlistContext.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/contexts/WishlistContext.tsx)
- Update `WishlistContextType` to define `toggleWishlist` as returning `Promise<{ success: boolean; action?: 'added' | 'removed'; error?: string }>`.
- Update the implementation of `toggleWishlist` to return the appropriate status object in both add and remove cases.
- Add error handling to return the error message if the API call fails.

### [Component] Wishlist Button
Modify `src/components/product/WishlistButton.tsx` to handle the return value of `toggleWishlist`.

#### [MODIFY] [WishlistButton.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/components/product/WishlistButton.tsx)
- No changes needed here as it ALREADY expects the return value. The fix in the context will resolve the crash.

### [Component] Product Card & Product Info
Ensure these components handle the `id` correctly.

#### [MODIFY] [ProductCard.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/components/product/ProductCard.tsx)
- Ensure the `product.id` passed to `toggleWishlist` is the correct ID.
- Add a toast notification on success/error since `ProductCard` currently doesn't show feedback.

#### [MODIFY] [ProductInfo.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/components/product/ProductInfo.tsx)
- Similar to `ProductCard`, add feedback for the wishlist toggle action.

## Verification Plan

### Manual Verification
1. Click the heart icon on a product in the listing page.
2. Verify that a success toast appears and the heart fills up.
3. Refresh the page and verify the heart remains filled.
4. Click the filled heart and verify it gets removed with a toast notification.
