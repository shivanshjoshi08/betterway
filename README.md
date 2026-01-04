# The Shop

A lightweight, modular E-Commerce storefront built with modern React.

## Technology Stack

- **Framework**: [React](https://react.dev/) (v18+)
- **Build Tool**: [Vite](https://vitejs.dev/) (Fast HMR & Bundling)
- **Styling**: Vanilla CSS Modules with Global Variables (Theming support)
- **State Management**: React Context API (`useContext` + `useReducer` pattern)
- **Data Fetching**: Native Fetch API (Abstraction layer)

## Project Architecture

The codebase follows a "Humanized" domain-driven structure for clarity and maintainability:

```
src/
├── api/            # Backend communication layer
│   └── api.js
├── state/          # Application state & logic (Contexts)
│   ├── BasketState.jsx     # Cart logic, persistence
│   └── InventoryState.jsx  # Product fetching, filtering
├── ui/             # Presentational components
│   ├── BasketDrawer.jsx
│   ├── ItemCard.jsx
│   ├── ItemGrid.jsx
│   └── TopNavigation.jsx
├── Storefront.jsx  # Main application wrapper
└── ...
```

## Features

- **Dynamic Inventory**: Fetches products from `dummyjson.com`.
- **Smart Search**: Filters items by title instantly.
- **Categorization**: Browse products by category.
- **Shopping Bag**: Validates stock limits and persists selection to `localStorage`.
- **Responsive Design**: Optimized for Mobile, Tablet, and Desktop.

## Getting Started

1.  **Install**: `npm install`
2.  **Develop**: `npm run dev` (Starts local server at http://localhost:5173)
3.  **Build**: `npm run build` (Outputs optimized production code to `dist/`)
4.  **Lint**: `npm run lint` (Checks code quality)
