# Solution: Improving Post-Login Redirection UX

The current issue is that when a user is forced to login (e.g., during checkout), they are redirected to the Home page instead of returning to the Checkout page.

### Technical Solution: Redirect Query Parameter

1. **In `ViyaHeader.tsx`**: Update the login links to include the current path as a "redirect" parameter.
   ```javascript
   const location = useLocation();
   // Link to:
   /account?redirect=${location.pathname}
   ```

2. **In `sigin.tsx`**: Update the successful login logic to read this parameter.
   ```javascript
   const [searchParams] = useSearchParams();
   const redirectPath = searchParams.get("redirect") || "/";
   // After login:
   navigate(redirectPath);
   ```

3. **In `Cart.tsx`**: If the user is unauthenticated, redirect them to login with the checkout path.
   ```javascript
   navigate(`/account?redirect=/checkout`);
   ```

This ensures the user returns to their task immediately after logging in.
