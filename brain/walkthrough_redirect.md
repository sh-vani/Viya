# Walkthrough: Standard Login Redirection UX

In this task, I've implemented a standard "redirect back" flow. Now, when a guest user is prompted to login (especially during checkout), they are automatically returned to their intended destination after successful authentication.

## Changes Made

### 1. SignIn Page Handling (`sigin.tsx`)
- Updated the `SignIn` component to read a `redirect` query parameter from the URL.
- Upon successful OTP verification, the user is navigated to the `redirect` path (defaulting to `/` if not present).

### 2. Global Header Integration (`ViyaHeader.tsx`)
- All login/account links in the header now include the current page path: `?redirect=${location.pathname}`.
- This ensures that if a user manually clicks "Sign In", they are brought back to the same page they were viewing.

### 3. Cart to Checkout Flow (`Cart.tsx`)
- The "Proceed to Checkout" button now checks if the user is logged in.
- Guest users are redirected to `/account?redirect=/checkout`.

### 4. Checkout Page Protection (`Checkout/index.tsx`)
- Added an automatic redirect to the login page if a guest tries to access the checkout URL directly.

---

## Verification Results

### Scenario 1: Guest Checkout
1. Added items to cart.
2. Clicked "Proceed to Checkout".
3. Redirected to Login with `?redirect=/checkout`.
4. Logged in via OTP.
5. **Success**: Landed directly on the Checkout page.

### Scenario 2: Manual Login from any page
1. Navigated to `/new-arrivals`.
2. Clicked the User icon in the header.
3. Redirected to Login with `?redirect=/new-arrivals`.
4. Logged in.
5. **Success**: Returned to `/new-arrivals`.
