import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Make API call to logout endpoint
        await axios.post('https://ass-projectass-project-backend.onrender.com/api/v1/auth/logout', {}, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });

        // Clear local storage after successful API call
        localStorage.removeItem('restaurantAdminLoggedIn');
        localStorage.removeItem('restaurantAdminToken');
        localStorage.removeItem('restaurantAdminUser');

        // Navigate to login with success message
        navigate('/login', {
          replace: true,
          state: { message: 'You have been logged out successfully.', severity: 'success' }
        });
      } catch (err) {
        console.error('Logout API error:', err);
        // Even if API call fails, clear local storage and redirect
        localStorage.removeItem('restaurantAdminLoggedIn');
        localStorage.removeItem('restaurantAdminToken');
        localStorage.removeItem('restaurantAdminUser');

        navigate('/login', {
          replace: true,
          state: { message: 'You have been logged out.', severity: 'info' }
        });
      } finally {
        setLoading(false);
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        background: 'radial-gradient(circle at top left, rgba(102, 126, 234, 0.18), transparent 32%), radial-gradient(circle at bottom right, rgba(245, 87, 108, 0.12), transparent 30%), linear-gradient(135deg, #f6f8ff 0%, #eef2ff 100%)',
        p: 2,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{
          maxWidth: 520,
          p: 6,
          borderRadius: 6,
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 32px 96px rgba(102, 126, 234, 0.2)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CircularProgress
                size={60}
                sx={{
                  color: '#667eea',
                  mb: 3,
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  }
                }}
              />
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#1e293b' }}>
                Logging out…
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                Clearing your session and contacting the server.
              </Typography>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                display: 'grid',
                placeItems: 'center',
                borderRadius: 4,
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                boxShadow: '0 16px 36px rgba(34, 197, 105, 0.4)',
                mb: 3,
                color: 'white',
                fontSize: '2.5rem'
              }}>
                ✓
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#1e293b' }}>
                Logged Out Successfully
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                Redirecting you to the secure login page.
              </Typography>
            </motion.div>
          )}
        </Box>
      </motion.div>
    </Box>
  );
}
