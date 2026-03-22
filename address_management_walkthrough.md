# User Profile & Address Management Walkthrough

I have implemented the complete Address Management system as requested. This including API integration, a dynamic checkout flow, and a full management interface in the user profile.

## Key Accomplishments

### 1. API Integration
The `src/lib/api.ts` file now includes a `profileApi` object with all required endpoints:
- Address List (GET)
- Address Store (POST)
- Address Update (POST)
- Address Delete (POST)
- Set Default Shipping/Billing (POST)

### 2. Enhanced Checkout Flow
The Checkout page (`src/pages/Checkout/index.tsx`) now intelligently handles user addresses:
- **Automatic Loading**: Fetches saved addresses on mount.
- **Dynamic Selection**: If addresses exist, a premium selection UI allows picking one.
- **Smart Creation**: If a new address is entered, it is automatically saved to the database during the checkout process.
- **Payload Integrity**: The `order-store` API is now called with the correct `customer_shipping_address` and `customer_billing_address` IDs.

### 3. Profile Address Management
The User Profile page (`src/pages/auth/Profile.tsx`) now features a dedicated "Delivery Sanctuaries" section:
- **Visual List**: Saved addresses are displayed with clear indicators for Default Shipping and Billing status.
- **Full CRUD**: Users can Add, Edit, and Delete address coordinates.
- **Premium UI**: Uses custom dialogs and micro-animations to maintain the "Viya Sanctuary" aesthetic.

## Verification Highlights
- [x] **Syntax & Integrity**: Verified all JSX tags are balanced and TypeScript types are correct.
- [x] **API Consistency**: Ensured endpoints match the provided specifications.
- [x] **UI/UX**: Maintained the premium, dark-themed, glassmorphic design consistency across all new components.

## Deployment Details
Please refer to the following files for the updated code:
- [api.ts](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/lib/api.ts)
- [index.tsx (Checkout)](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/pages/Checkout/index.tsx)
- [Profile.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/pages/auth/Profile.tsx)
