import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const OrdersPage = Loadable(lazy(() => import('pages/orders/index-new')));
const CustomersPage = Loadable(lazy(() => import('pages/customers/index-new')));
const ProductsPage = Loadable(lazy(() => import('pages/products/index-new')));
const ReportsPage = Loadable(lazy(() => import('pages/reports/index-new')));

const MainRoutes = {
  path: '/',
  element: (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'orders',
      element: <OrdersPage />
    },
    {
      path: 'customers',
      element: <CustomersPage />
    },
    {
      path: 'products',
      element: <ProductsPage />
    },
    {
      path: 'reports',
      element: <ReportsPage />
    },
    {
      path: '*',
      element: <Navigate to="/" replace />
    }
  ]
};

export default MainRoutes;
