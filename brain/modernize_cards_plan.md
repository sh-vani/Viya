# Implementation Plan: Modernize and Resize Cards

The goal is to reduce the height of product cards across the website to make them look more professional and modern, as requested by the user.

## Proposed Changes

### [Product Components]

#### [MODIFY] [ProductCard.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/components/product/ProductCard.tsx)
- **Compact Layout**: Reduce padding in the content section from `p-4 md:p-5` to `p-3 sm:p-4`.
- **Smaller Elements**: Scale down star icons and text sizes slightly.
- **Button Optimization**: Reduce the height of the "Add to Cart" button from `h-8 sm:h-11` to `h-7 sm:h-9`.
- **Reduced Spacing**: Change `space-y-2 sm:space-y-3` to `space-y-1.5`.
- **Refined Styles**: Update shadows and transitions for a more "premium" feel.

#### [MODIFY] [FlashSale.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/components/home/FlashSale.tsx)
- Update the mobile-only card layout (lines 160-197) to match the new compact and professional styling of the `ProductCard`.

## Verification Plan

### Manual Verification
1. **New Arrivals Page**: Check the grid of product cards. Ensure they are smaller in height and look aligned.
2. **Home Page**: Check the "Flash Sale" section (both mobile and desktop).
3. **Category Pages**: Verify that the product grid still looks good with the smaller cards.
4. **Mobile Responsiveness**: Ensure the cards remain legible and usable on small screens.
5. **Interactive Elements**: Verify "Add to Cart" and "Wishlist" buttons still work correctly.
