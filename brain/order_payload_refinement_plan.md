# Order Payload Refinement Plan

Align the frontend `order-store` payload with the backend requirements demonstrated in the provided `curl` example.

## Proposed Changes

### Checkout Page
#### [MODIFY] [index.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/pages/Checkout/index.tsx)
-   Refine `orderPayload` in `handlePlaceOrder` to match the exact fields from the `curl` example.
-   Remove fields not present in the `curl` example (`customer_name`, raw address strings) to strictly adhere to the tested backend interface.
-   Ensure numeric fields and array fields are correctly populated with dynamic values.

| Field | Source/Value |
| :--- | :--- |
| `customer_email` | `customerDetails.email` |
| `customer_phone` | `customerDetails.phone` |
| `payment_method` | Dynamic (e.g., "1" for COD) |
| `customer_shipping_address` | `1` (Placeholder) |
| `customer_billing_address` | `1` (Placeholder) |
| `grand_total` | `total` |
| `sub_total` | `subtotal` |
| `discount_total` | `discount` |
| `shipping_total` | `shipping` |
| `number_of_package` | `1` |
| `number_of_item` | `cartItems.length` |
| `payment_id` | `PAY-ID-[timestamp]` or similar |
| `tax_total` | `tax` |
| `shipping_cost` | `[shipping]` |
| `delivery_date` | `["2024-01-01"]` (or dynamic) |
| `shipping_method` | `[1]` |
| `packagewiseTax` | `[0]` |

## Verification Plan
### Manual Verification
-   Place a test order through the UI.
-   Monitor the network request to ensure the JSON body matches the expected structure.
-   Verify successful "app.order created successfully" response.
