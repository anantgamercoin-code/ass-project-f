import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Sidebar from 'components/Sidebar';
import Topbar from 'components/Topbar';

export default function DashboardLayout() {
  const drawerWidth = 280;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          bgcolor: 'background.default'
        }}
      >
        <Topbar />
        <Toolbar />
        <Box sx={{ p: { xs: 2, md: 3 }, minHeight: 'calc(100vh - 88px)' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
