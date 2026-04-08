import { createRoot } from 'react-dom/client';

// Advanced CSS Design System
import './styles/index.css';

// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// apex-chart
import 'assets/third-party/apex-chart.css';
import 'assets/third-party/react-table.css';

// Google Fonts for advanced typography
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

// project imports
import App from './App';
import { ConfigProvider } from 'contexts/ConfigContext';
import { AppDataProvider } from 'contexts/AppDataContext';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ConfigProvider>
    <AppDataProvider>
      <App />
    </AppDataProvider>
  </ConfigProvider>
);

reportWebVitals();
