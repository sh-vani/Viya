# Standard Post-Login Redirection UX

This plan implements the standard "redirect back" behavior after a user logins, ensuring they don't lose their place in the checkout flow.

## Proposed Changes

### [Authentication & Redirection]

#### [MODIFY] [sigin.tsx](file:///c:/Users/Shivani Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/pages/auth/sigin.tsx)
- Import `useSearchParams` from `react-router-dom`.
- Extract `redirect` parameter from the URL.
- Update `handleVerifyOtp` to navigate to the `redirect` path upon success, defaulting to `/`.

#### [MODIFY] [ViyaHeader.tsx](file:///c:/Users/Shivani Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/components/header/ViyaHeader.tsx)
- Update all account/profile links to include `?redirect=${location.pathname}` so users return to their current page after logging in manually.

#### [MODIFY] [Cart.tsx](file:///c:/Users/Shivani Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/pages/auth/Cart.tsx)
- Replace the direct `<Link to="/checkout" />` with a button handler.
- The handler will check for `auth_token` in `localStorage`.
- If authenticated, go to `/checkout`.
- If not authenticated, redirect to `/account?redirect=/checkout`.

## Verification Plan

### Manual Verification
1. **Scenario: Checkout Flow**
   - Add a product to the cart.
   - Go to the Cart page.
   - Click "Proceed to Checkout" while logged out.
   - **Expectation**: Redirected to `/account?redirect=/checkout`.
   - Complete login.
   - **Expectation**: Automatically redirected to the Checkout page.

2. **Scenario: General Login**
   - Navigate to any page (e.g., `/new-arrivals`).
   - Click the User/Account icon in the header.
   - **Expectation**: Redirected to `/account?redirect=/new-arrivals`.
   - Complete login.
   - **Expectation**: Automatically redirected back to `/new-arrivals`.
