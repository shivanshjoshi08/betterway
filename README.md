# The Shop (betterway)

A compact, modular e-commerce storefront built with modern React and Vite. It demonstrates a simple product browsing experience with search, category filters, sorting, and a persisted shopping bag (cart).

## Key Features

- Product listing driven from a remote API (`https://dummyjson.com/products`).
- Instant search and category filtering.
- Price sorting (ascending / descending).
- Shopping bag persisted to `localStorage` with quantity validation against stock.
- Lightweight, accessible UI components and responsive layout.

## Technology

- React 19
- Vite (dev server, build)
- CSS Modules + a small global stylesheet
- Context-based state management (`BasketState` and `InventoryState`)

## Project Layout

Top-level source layout (important files):

```
src/
├─ api/            # fetch helpers (api.js)
├─ state/          # Context providers: BasketState.jsx, InventoryState.jsx
├─ ui/             # Presentational components (ItemGrid, ItemCard, TopNavigation, etc.)
├─ Storefront.jsx  # App composition and providers
├─ startup.jsx     # React entry
└─ global.css      # Base styles
```

Notable files:

- `src/api/api.js`: `getProducts`, `searchProducts`, and `getCategories` helpers.
- `src/state/InventoryState.jsx`: fetches products & categories, exposes filtering and sorting state.
- `src/state/BasketState.jsx`: basket actions (`addToBasket`, `removeFromBasket`, `updateQuantity`), persists to `localStorage`.

## Getting Started (Local Development)

Prerequisites: Node.js 18+ recommended.

Install and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser (Vite prints the exact URL).

Build for production:

```bash
npm run build
npm run preview
```

Lint the codebase:

```bash
npm run lint
```

## Runtime Behavior / Notes

- Inventory data is retrieved from `https://dummyjson.com/products`. The initial load fetches all products and categories in parallel.
- Searching and category selection are performed client-side from the fetched product list (the inventory provider exposes `searchQuery`, `setSearchQuery`, `selectedCategory`, `setSelectedCategory`, and `sortOrder`).
- The basket uses `localStorage` key `basket` for persistence and enforces stock limits when increasing quantity.

## Development Tips

- Components are intentionally small and focused; add unit tests around `InventoryState` and `BasketState` to validate filtering and persistence behavior.
- To mock API responses during development, replace calls in `src/api/api.js` with fixtures or use a network proxy tool.

## Where to Look Next

- App root: `src/Storefront.jsx`
- Entry: `src/startup.jsx`
- API helpers: `src/api/api.js`
- State providers: `src/state/InventoryState.jsx`, `src/state/BasketState.jsx`
- UI components: `src/ui/`

If you want, I can also add a short CONTRIBUTING guide, or add example tests and a GitHub Actions workflow for CI.
