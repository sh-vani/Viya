# New User Checkout Flow & Payment Fix Implementation Plan

This plan outlines the steps to implement a strict checkout sequence for new users and fix the payment capture failure reported.

## Proposed Changes

### [Checkout Component & Address Flow]

#### [MODIFY] [index.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/pages/Checkout/index.tsx)

1.  **Pre-fill User Details**: 
    - Retrieve `user_name`, `user_email` from `localStorage` in `useEffect`.
    - Populate `customerDetails` state with these values.
2.  **Robust Address Check**:
    - Ensure `fetchAddresses` identifies when a user has no addresses and sets `isAddingNewAddress(true)`.
3.  **Strict Order Sequence**:
    - Refine `handlePlaceOrder` to:
        - If `isAddingNewAddress` is true, call `profileApi.storeAddress` first.
        - Capture the resulting `address.id` from the response.
        - Explicitly use this ID for both `customer_shipping_address` and `customer_billing_address` in the `orderPayload`.
4.  **Error Handling**:
    - Improve error messages if address storage fails before order placement.

### [Payment & API Integration]

#### [MODIFY] [api.ts](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/lib/api.ts)
- Remove leading slashes from Razorpay endpoints (`/pay-with-razorpay` -> `pay-with-razorpay`, `/razorpay-payment` -> `razorpay-payment`) to ensure consistency with other API paths.

#### [MODIFY] [index.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/pages/Checkout/index.tsx)
- Update Razorpay success handler to send all necessary verification fields:
    ```javascript
    await paymentApi.captureRazorpayPayment({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
    });
    ```

## Verification Plan

### Manual Verification
1.  **Login as a new user** via OTP.
2.  **Navigate to Checkout**: Verify address form is shown and pre-filled with name/email.
3.  **Proceed to Payment**: Complete Razorpay payment.
4.  **Verify Backend Calls**:
    - `POST profile/address-store` -> returns ID.
    - `POST order-store` -> uses that ID.
    - `POST razorpay-payment` -> sends `payment_id`, `order_id`, and `signature`.
5.  **Confirm Success**: User is redirected to success page.


