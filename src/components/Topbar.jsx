import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import BellOutlined from '@ant-design/icons/BellOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(102, 126, 234, 0.02) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        color: 'text.primary'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2, py: 2 }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
              Welcome back! 👋
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Keep track of restaurant operations
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              startIcon={<BellOutlined />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                borderColor: 'rgba(102, 126, 234, 0.3)',
                color: '#667eea',
                '&:hover': {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderColor: '#667eea',
                  color: 'white'
                },
                transition: 'all 0.3s'
              }}
            >
              Alerts
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              startIcon={<LogoutOutlined />}
              onClick={handleLogout}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
                boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)',
                '&:hover': {
                  boxShadow: '0 6px 25px rgba(245, 87, 108, 0.6)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s'
              }}
            >
              Logout
            </Button>
          </motion.div>

          <Avatar sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', width: 40, height: 40 }}>
            🍕
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
