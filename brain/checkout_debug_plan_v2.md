# Checkout & Razorpay Debugging Plan (Phase 2)

Resolve the 503 "Service Unavailable" error on `order-store` and ensure the Razorpay popup triggers correctly.

## Proposed Changes

### API Client
#### [MODIFY] [api.ts](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/lib/api.ts)
-   Add `X-Requested-With: XMLHttpRequest` to default headers to ensure the backend recognizes it as an AJAX request.

### Checkout Page
#### [MODIFY] [index.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/pages/Checkout/index.tsx)
-   **Payload Enrichment**: Add back the full shipping/billing address details into the `orderPayload`. While the `curl` used `customer_shipping_address: 1`, the backend might require the string details for fresh orders or if the ID is invalid for the current user.
-   **Authentication Check**: Add a check to ensure `auth_token` exists before placing the order, as the backend likely requires it for `order-store`.
-   **Razorpay Logic**: Ensure Razorpay initialization is extremely robust, handling potential missing fields in `orderData`.

## Verification Plan
### Manual Verification
1.  **Check Auth**: Verify `localStorage.getItem("auth_token")` exists in the browser.
2.  **Inspect Payload**: Place order and check the "Payload" tab in Browser Network tools. It should look like:
    ```json
    {
      "customer_email": "...",
      "customer_phone": "...",
      "payment_method": "1" or "6",
      "customer_shipping_address": 1,
      "grand_total": 500,
      "shipping_address": "...", 
      "shipping_city": "...",
      ...
    }
    ```
3.  **Check Response**: If 503 persists, report the exact "Preview" of the response.
