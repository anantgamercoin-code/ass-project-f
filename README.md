# RestaurantHub Dashboard

A modern React + Material UI dashboard for restaurant operation management.

This project is built with **React 19**, **Vite**, and **Material UI**. It includes secure login, protected dashboard routes, order management, customer and product pages, and report analytics.

## Key Features

- Secure login flow with backend auth integration via `src/utils/api.js`
- Protected dashboard routes using `src/routes/ProtectedRoute.jsx`
- Responsive restaurant dashboard with order, customer, product, and report views
- Local mock data management in `src/contexts/AppDataContext.jsx`
- Code-split routing with `react-router-dom` and lazy-loaded pages
- Custom theme and UI overrides in `src/themes`
- Real-time dashboard stats, search, order filtering, and quick actions
- Styled with Material UI components and custom CSS in `src/styles`

## Project Structure

- `src/index.jsx` — app entry point, global providers, and root render.
- `src/App.jsx` — theme wrapper, error boundary, router provider, scroll restoration.
- `src/routes` — route definitions for login, logout, protected dashboard routes, and page navigation.
- `src/contexts` — application state providers:
  - `AppDataContext.jsx` stores mock categories, products, customers, and orders.
  - `ConfigContext.jsx` saves theme/config state in local storage.
- `src/pages` — main views:
  - `auth/Login.jsx` — login page with API sign-in, password visibility, and success/error handling.
  - `dashboard/default.jsx` — dashboard landing page with stats, order table, and quick actions.
  - `orders/index-new.jsx` — order processing and analytics page.
  - `customers/index-new.jsx` — customer management view.
  - `products/index-new.jsx` — product and menu management view.
  - `reports/index-new.jsx` — reporting dashboard with charts and key metrics.
- `src/components` — reusable UI pieces, including cards, loader, modal, sidebar, topbar, and scroll helper.
- `src/themes` — theme configuration, palette, typography, and MUI component overrides.
- `src/utils` — helper utilities and constants.

## Authentication

- Login form submits to the endpoint defined in `src/utils/api.js`.
- Successful login stores `restaurantAdminLoggedIn`, `restaurantAdminToken`, and user info in `localStorage`.
- `ProtectedRoute.jsx` redirects unauthenticated users to `/login`.

## How to Run

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open the URL shown by Vite (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev` — start the Vite development server
- `npm run build` — build production assets
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint on source files
- `npm run lint:fix` — fix ESLint issues automatically
- `npm run prettier` — format source files with Prettier

## Local Data and Behavior

- `AppDataContext.jsx` contains sample data for:
  - categories
  - products
  - customers
  - orders
- Orders and products are handled as local state by default, with simulated create and update operations.
- The dashboard calculates totals and revenue from order state.

## Technologies Used

- React 19
- Vite
- Material UI (MUI)
- React Router v7
- Framer Motion
- Axios
- Formik
- Yup
- SimpleBar
- Lodash ES
- @ant-design/icons

## Notes

- The current login page branding appears as `RestaurantHub` in the UI.
- The app includes multiple theming and style override files under `src/themes/overrides`.
- The routing system uses `MainRoutes.jsx`, `LoginRoutes.jsx`, and `LogoutRoutes.jsx`.

## License

This project is licensed under the **MIT License**.

## Contact

For the current implementation, review the app structure in `src/` and the route definitions in `src/routes`.
