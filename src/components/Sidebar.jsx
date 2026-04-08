import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import UsergroupAddOutlined from '@ant-design/icons/UsergroupAddOutlined';
import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined';
import BarChartOutlined from '@ant-design/icons/BarChartOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';

const drawerWidth = 280;
const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: HomeOutlined },
  { label: 'Order Management', path: '/orders', icon: ShoppingCartOutlined },
  { label: 'Customers', path: '/customers', icon: UsergroupAddOutlined },
  { label: 'Products', path: '/products', icon: AppstoreOutlined },
  { label: 'Monthly Report', path: '/reports', icon: BarChartOutlined }
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
          borderRight: '1px solid rgba(102, 126, 234, 0.2)',
          backdropFilter: 'blur(10px)'
        }
      }}
    >
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box sx={{ mb: 3 }}>
            <Box 
              sx={{ 
                width: 48, 
                height: 48, 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 2,
                mb: 1.5,
                display: 'grid',
                placeItems: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.5rem'
              }}
            >
              🍽
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              RestaurantHub
            </Typography>
            <Typography variant="body2" color="text.secondary">Pro Management</Typography>
          </Box>
        </motion.div>

        <Divider sx={{ mb: 2, opacity: 0.5 }} />

        <Box component="nav" sx={{ flexGrow: 1, mt: 1 }}>
          <List disablePadding>
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <ListItemButton
                    component={NavLink}
                    to={item.path}
                    sx={({ isActive }) => ({
                      mb: 1.5,
                      borderRadius: 2.5,
                      position: 'relative',
                      color: isActive ? '#667eea' : 'text.primary',
                      background: isActive ? 'rgba(102, 126, 234, 0.12)' : 'transparent',
                      border: isActive ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent',
                      fontWeight: isActive ? 600 : 500,
                      '&::before': isActive ? {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '0 2.5px 2.5px 0'
                      } : {},
                      '&:hover': {
                        background: isActive ? 'rgba(102, 126, 234, 0.15)' : 'rgba(102, 126, 234, 0.08)',
                        transform: 'translateX(4px)'
                      },
                      transition: 'all 0.3s'
                    })}
                  >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40, fontSize: '1.2rem' }}>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </motion.div>
              );
            })}
          </List>
        </Box>

        <Divider sx={{ my: 2, opacity: 0.5 }} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2.5,
              color: '#f5576c',
              background: 'rgba(245, 87, 108, 0.08)',
              border: '1px solid rgba(245, 87, 108, 0.2)',
              '&:hover': {
                background: 'rgba(245, 87, 108, 0.15)',
                transform: 'translateX(4px)'
              },
              transition: 'all 0.3s'
            }}
          >
            <ListItemIcon sx={{ color: '#f5576c', minWidth: 40, fontSize: '1.2rem' }}>
              <LogoutOutlined />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </motion.div>
      </Box>
    </Drawer>
  );
}
