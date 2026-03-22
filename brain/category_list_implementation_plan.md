# Category List Integration

This plan outlines the integration of the `category-list` API into the homepage's carousel section (currently "Continue Your Journey").

## Proposed Changes

### API Layer
#### [MODIFY] [products.ts](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/lib/api/products.ts)
- Add `getCategoryList` function to fetch categories from `/category-list`.

### Homepage Components
#### [MODIFY] [BrandSection.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/components/home/BrandSection.tsx)
-   Fetch the category list on component mount.
-   Replace the empty `recentProducts` array with dynamic `categories` data.
-   Update the UI to display category names and images.
-   Rename section title and subtitle to be more category-focused (e.g., "Exquisite Collections" / "Explore our curated categories").
-   Ensure links point to the correct category routes.

## Verification Plan
### Manual Verification
-   Navigate to the home page.
-   Verify that the "Continue Your Journey" (or renamed) section displays categories from the API.
-   Verify that the images and names match the API response.
-   Click on a category and ensure it navigates to the correct category page.
-   Check responsiveness and carousel functionality.
