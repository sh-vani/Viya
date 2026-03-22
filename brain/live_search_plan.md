# Implementation Plan: Live Search Implementation

The goal is to implement a live search feature in the global search bar using the `/api/live-search` endpoint.

## Proposed Changes

### [Header Component]

#### [MODIFY] [ViyaHeader.tsx](file:///c:/Users/Shivani%20Kushwaha/Downloads/remix-of-linea-jewelry-main/Viya/src/components/header/ViyaHeader.tsx)
- **Search State**: Add `searchQuery`, `searchResults`, and `isSearching` states.
- **Debounced Fetching**: Implement a `useEffect` with a 300ms debounce to call `searchApi.getLiveSearch`.
- **Suggestions Dropdown**:
  - Create a scrollable absolute container below the search input.
  - Display search results with:
    - Product thumbnail
    - Product name (with highlighting if possible)
    - Price
  - Add "View all results" link at the bottom.
- **Improved UX**:
  - Handle loading states with a spinner or shimmer.
  - Handle "No results found" state.
  - Clear results when input is cleared or search is closed.
  - Keyboard navigation (Arrow keys + Enter) if feasible.

## Verification Plan

### Manual Verification
1. **Typing Test**: Type "ring" in the search bar and verify that suggestions appear after a short delay.
2. **Result Selection**: Click on a suggestion and verify it redirects to the correct product page.
3. **Empty State**: Type a jibberish word and verify the "No results found" message.
4. **Loading State**: Verify a loading indicator appears while the API call is in progress.
5. **Dismissal**: Click outside or press "X" and verify the dropdown closes.
