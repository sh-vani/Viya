# Resizing Wishlist Cards

The goal is to make the wishlist cards smaller for both mobile and laptop views to improve the density of the layout.

## Proposed Changes

### Wishlist Page

#### [MODIFY] [Wishlist.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/pages/auth/Wishlist.tsx)

- **Grid Layout**:
  - Web: Change `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` to `grid-cols-2 lg:grid-cols-4`.
  - Tablet: Adjust to `md:grid-cols-3`.
  - Reduce `gap-12` to `gap-4 md:gap-6`.
- **Card Styling**:
  - Reduce outer container rounding from `rounded-[2.5rem]` to `rounded-2xl`.
  - Reduce info area padding from `p-6` to `p-4`.
  - **Typography**:
    - Product name: `text-xl` -> `text-base`.
    - Price: `text-2xl` -> `text-lg`.
    - "Exquisite Selection": `text-[10px]` -> `text-[9px]`.
  - **Button**:
    - Reduce "Add to Cart" button height from `h-14` to `h-11`.
    - Set font size to `text-[9px]`.
  - **Remove Button & Tag**:
    - Reduce remove button size to `w-8 h-8`.
    - Adjust "Wishlist" tag padding and font size slightly.

## Verification Plan

### Manual Verification
1. Open the wishlist page on a mobile device (or use browser developer tools to simulate mobile view).
2. Verify that there are 2 cards per row and they are appropriately sized.
3. Resize the browser to laptop width.
4. Verify that there are 4 or 5 cards per row and they look visually appealing and "premium".
5. Ensure all functionality (Remove, Add to Cart, Link to Product) still works as expected.
