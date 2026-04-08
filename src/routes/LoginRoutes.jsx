import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';

const LoginPage = Loadable(lazy(() => import('pages/auth/Login')));

const LoginRoutes = {
  path: '/login',
  element: <LoginPage />
};

export default LoginRoutes;
