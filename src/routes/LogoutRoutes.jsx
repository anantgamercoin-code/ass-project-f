import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';

const LogoutPage = Loadable(lazy(() => import('pages/auth/Logout')));

const LogoutRoutes = {
  path: '/logout',
  element: <LogoutPage />
};

export default LogoutRoutes;
