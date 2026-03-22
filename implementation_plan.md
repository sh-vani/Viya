# Implementation Plan - Checkout Autofill & Profile UI Improvements

The goal is to ensure that selecting a saved address during checkout autofills all customer details (Name, Email, Phone) and to make the "Add Address" button more accessible in the profile page.

## Proposed Changes

### [Component] Checkout Page
Modify `src/pages/Checkout/index.tsx` to sync customer details with selected addresses.

#### [MODIFY] [index.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/pages/Checkout/index.tsx)
- In `fetchAddresses`, when a default address is found, update `customerDetails` state with `name`, `email`, and `phone` from that address.
- In the `RadioGroup` for saved addresses, update the selection logic to also sync `customerDetails`.
- This ensures that selecting an address fills the "Secure Identity" section automatically.

### [Component] Profile Page
Modify `src/pages/auth/Profile.tsx` to move the "Add New" address button to a more prominent location.

#### [MODIFY] [Profile.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/pages/auth/Profile.tsx)
- Move the "Add New" button from the "Delivery Sanctuaries" header.
- Place it in the main header area (next to "Sign Out") to make it "bhar" (outside/more accessible).

## Verification Plan

### Manual Verification
1. **Checkout Autofill**:
   - Log in and add an address in the profile.
   - Go to Checkout.
   - Observe if the Name, Email, and Phone fields are automatically filled from the default address.
2. **Profile UI**:
   - Go to the Profile page.
   - Verify the "Add New" address button is now in the header area.
