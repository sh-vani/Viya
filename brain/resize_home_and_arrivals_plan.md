# Implementation Plan: Resize Home and New Arrivals Sections

The goal is to reduce the excessive vertical space and card heights in both the Home page (`ExquisiteSelection`) and the New Arrivals page.

## Proposed Changes

### [New Arrivals Page]

#### [MODIFY] [NewArrivals/index.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/pages/NewArrivals/index.tsx)
- **Hero Section**: Reduce `min-h-[500px] md:min-h-[600px]` to `min-h-[400px] md:min-h-[500px]` and `mb-20` to `mb-12`.
- **Feature Card**: Reduce height from `h-[520px]` to `h-[400px]`.
- **Navigation Section**: Reduce `mb-20 pb-10` to `mb-10 pb-6`.
- **Product Grid**: Reduce `pb-40` to `pb-20`.
- **Loading & Empty States**: Reduce `py-40` to `py-20`.
- **Promise Section**: Reduce `mb-40` to `mb-20` and `mb-20` to `mb-12`.

### [Home Components]

#### [MODIFY] [ExquisiteSelection.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/components/home/ExquisiteSelection.tsx)
- **Reduced Section Padding**: Change `py-20 md:py-32` to `py-12 md:py-20`.
- **Reduced Header Margin**: Change `mb-16` to `mb-8`.

#### [MODIFY] [ProductCarousel.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/components/content/ProductCarousel.tsx)
- **Updated Loading Skeleton**: Align skeletal dimensions with the new compact `ProductCard` design (rounded-xl, reduced padding, and smaller button).

## Verification Plan

### Manual Verification
1. **Home Page**: Scroll through "Exquisite Masterpieces". Verify the section is more compact.
2. **New Arrivals Page**: 
   - Check the Hero section and Featured card. They should be significantly less tall.
   - Verify the product grid and footer area for improved spacing.
3. **Skeleton Loading**: Inspect the loading state in the Carousel and the New Arrivals grid.
