import { RouterProvider } from 'react-router-dom';

// project imports
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import ErrorBoundary from 'components/ErrorBoundary';
import { AppDataProvider } from 'contexts/AppDataContext';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeCustomization>
        <AppDataProvider>
          <ScrollTop>
            <RouterProvider router={router} />
          </ScrollTop>
        </AppDataProvider>
      </ThemeCustomization>
    </ErrorBoundary>
  );
}
