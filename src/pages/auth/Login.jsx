import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import TopMessage from 'components/TopMessage';
import { AUTH_API_URL } from 'utils/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [topMessage, setTopMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = localStorage.getItem('restaurantAdminLoggedIn') === 'true';

  useEffect(() => {
    if (location.state?.message) {
      setTopMessage({ text: location.state.message, severity: location.state.severity || 'success' });
    }
  }, [location.state]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setTopMessage(null);
    setLoading(true);

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(AUTH_API_URL, {
        username: username.trim(),
        password: password.trim()
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      const data = response.data;
      const message = data?.message || 'Unable to sign in.';

      if (!data?.ok) {
        setError(message);
        return;
      }

      localStorage.setItem('restaurantAdminLoggedIn', 'true');
      if (data?.token) {
        localStorage.setItem('restaurantAdminToken', data.token);
      }
      if (data?.user) {
        localStorage.setItem('restaurantAdminUser', JSON.stringify(data.user));
      }

      setTopMessage({ text: message, severity: 'success' });
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 700);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'Unable to reach the authentication server.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'radial-gradient(circle at top left, rgba(255,255,255,0.28), transparent 35%), radial-gradient(circle at bottom right, rgba(103,126,234,0.22), transparent 30%), linear-gradient(135deg, #1f2e62 0%, #342964 42%, #5f4dc2 100%)',
        p: 2,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <TopMessage message={topMessage?.text} severity={topMessage?.severity} onClose={() => setTopMessage(null)} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65 }}>
        <Card
          sx={{
            maxWidth: 420,
            width: '100%',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 40px 90px rgba(0, 0, 0, 0.2)',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(16px)',
            overflow: 'hidden'
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      width: 88,
                      height: 88,
                      mx: 'auto',
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 16px 36px rgba(102, 126, 234, 0.4)',
                      mb: 2,
                      color: 'white',
                      fontSize: '2rem'
                    }}
                  >
                    🍽
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    RestaurantHub
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: '0.96rem' }}>
                    Clean, fast restaurant admin login.
                  </Typography>
                </Box>
              </motion.div>

              <motion.form onSubmit={handleSubmit} variants={containerVariants} initial="hidden" animate="visible">
                <Stack spacing={2.5}>
                  <motion.div variants={itemVariants}>
                    <TextField
                      label="Username"
                      type="text"
                      value={username}
                      fullWidth
                      autoComplete="username"
                      onChange={(event) => setUsername(event.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <UserOutlined style={{ fontSize: '1.1rem', color: '#667eea' }} />
                          </InputAdornment>
                        )
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '& fieldset': { borderColor: 'rgba(102, 126, 234, 0.25)' },
                          '&:hover fieldset': { borderColor: '#667eea' },
                          '&.Mui-focused fieldset': { borderColor: '#667eea', borderWidth: 2 }
                        }
                      }}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <TextField
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      fullWidth
                      autoComplete="current-password"
                      onChange={(event) => setPassword(event.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlined style={{ fontSize: '1.1rem', color: '#667eea' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                              {showPassword ? <EyeInvisibleOutlined style={{ fontSize: '1rem' }} /> : <EyeOutlined style={{ fontSize: '1rem' }} />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '& fieldset': { borderColor: 'rgba(102, 126, 234, 0.25)' },
                          '&:hover fieldset': { borderColor: '#667eea' },
                          '&.Mui-focused fieldset': { borderColor: '#667eea', borderWidth: 2 }
                        }
                      }}
                    />
                  </motion.div>

                  {error && (
                    <motion.div variants={itemVariants}>
                      <Typography color="error" variant="body2" sx={{ textAlign: 'center' }}>
                        {error}
                      </Typography>
                    </motion.div>
                  )}

                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={loading}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: '1rem',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                        '&:hover': {
                          boxShadow: '0 12px 32px rgba(102, 126, 234, 0.6)',
                          transform: 'translateY(-2px)'
                        },
                        '&:disabled': {
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          opacity: 0.7
                        },
                        transition: 'all 0.3s'
                      }}
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.88rem' }}>
                      Demo credentials are accepted by the current setup. Use any valid username and password to continue.
                    </Typography>
                  </motion.div>
                </Stack>
              </motion.form>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
