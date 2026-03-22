# Wishlist Deletion API Integration

Align the wishlist removal logic in the frontend with the provided API structure to ensure items are correctly removed from the user's sanctuary.

## Proposed Changes

### [Wishlist Management]

#### [MODIFY] [WishlistContext.tsx](file:///c:/Users/Shivani Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/contexts/WishlistContext.tsx)
- Update `toggleWishlist` to use the actual `productId` instead of the internal `wishlistId` in the `removeFromWishlist` call.
- This ensures consistency with the provided `curl` command where `id` refers to the product being managed.
- Maintain the `"type": "product"` parameter as specified in the API requirement.

## Verification Plan

### Manual Verification
1. **Scenario: Remove from Wishlist**
   - Log in to the application.
   - Go to a product page or the wishlist page.
   - Add a product to the wishlist (if not already there).
   - Click the wishlist icon (Heart) to remove it.
   - **Expectation**: The product should be removed from the local state and a successful request should be sent to `wishlist/delete/` with the correct `id` and `type`.
   - Refresh the page to ensure the item stays removed.

2. **Scenario: Immediate Removal (Optimistic Flow)**
   - Add an item to the wishlist.
   - Immediately click again to remove it (before the fetch finishes).
   - **Expectation**: The item should be removed correctly without error, even though it had a temporary local ID.
