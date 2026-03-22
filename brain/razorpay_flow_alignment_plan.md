# Razorpay Flow Alignment Plan

Strictly align the frontend Razorpay implementation with the provided "Online Payment API Flow Guide".

## Proposed Changes

### Checkout Page
#### [MODIFY] [index.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/pages/Checkout/index.tsx)
-   **Step 2 Alignment**: Update `orderPayload.payment_id` for Razorpay to "Pending" (placeholder) instead of a generated internal ID, as the real ID comes after success.
-   **Step 4 Alignment**: Update the `paymentApi.captureRazorpayPayment` call to only send `razorpay_payment_id` in the body, matching the guide's specific JSON structure.

## Verification Plan
### Manual Verification
-   Select Razorpay at checkout.
-   Verify `order-store` request has `payment_id: "Pending"`.
-   Complete payment (test mode).
-   Verify `/razorpay-payment` request body contains *only* `razorpay_payment_id`.
