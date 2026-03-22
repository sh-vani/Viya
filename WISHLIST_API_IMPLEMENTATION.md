# Wishlist API Implementation

## Changes Made

The wishlist API has been updated to use the new endpoint format with product_id as a query parameter.

### Updated Function: `addToWishlist`

**File:** [`src/lib/controller/WishlistController.js`](src/lib/controller/WishlistController.js)

**Before:**
```javascript
const response = await api.post("/api/v1/customer/wish-list", {
    product_id: productId
}, {
    params: {
        guest_id: token ? undefined : 1
    },
    headers: token ? { Authorization: `Bearer ${token}` } : {}
});
```

**After:**
```javascript
// Use the new API endpoint with product_id as query parameter
const response = await api.get("/api/v1/customer/wish-list/add", {
    params: {
        product_id: productId,
        guest_id: token ? undefined : 1
    },
    headers: token ? { Authorization: `Bearer ${token}` } : {}
});
```

## API Endpoint Details

### New Endpoint
- **Method:** GET
- **URL:** `/api/v1/customer/wish-list/add`
- **Parameters:**
  - `product_id` (required) - The ID of the product to add to wishlist
  - `guest_id` (optional) - Used for non-authenticated users

### Example Request
```
GET /api/v1/customer/wish-list/add?product_id=123&guest_id=1
```

### Authentication
- If user is authenticated (has auth_token), the request includes an Authorization header
- If user is not authenticated, guest_id parameter is used

## Integration Points

The updated API is used in:
1. **WishlistButton Component** - [`src/components/product/WishlistButton.tsx`](src/components/product/WishlistButton.tsx)
2. **useWishlist Hook** - [`src/hooks/useWishlist.js`](src/hooks/useWishlist.js)
3. **Wishlist Page** - [`src/pages/auth/Wishlist.tsx`](src/pages/auth/Wishlist.tsx)

## Usage Example

```javascript
import { addToWishlist } from '@/lib/controller/WishlistController';

// Add product to wishlist
try {
    const result = await addToWishlist(123); // product_id = 123
    console.log('Product added to wishlist:', result);
} catch (error) {
    console.error('Failed to add to wishlist:', error);
}
```

## Benefits

1. **Dynamic Product ID**: The product_id is now passed as a query parameter, making it more flexible
2. **RESTful Design**: Uses GET method which is more appropriate for this operation
3. **Backward Compatible**: Existing code continues to work with the new implementation
4. **Better Logging**: Enhanced console logging for debugging