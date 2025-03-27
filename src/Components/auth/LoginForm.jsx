import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Snackbar,
  Alert,
  useTheme,
  InputAdornment,
  IconButton,
  CircularProgress,
  Paper,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LockClockIcon from '@mui/icons-material/LockClock';
import API from '../../BackendAPi/ApiProvider';

const LoginForm = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountLocked, setAccountLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Check localStorage for existing lock when component mounts
  useEffect(() => {
    const lockInfo = localStorage.getItem('accountLockInfo');
    if (lockInfo) {
      const { email, lockExpires } = JSON.parse(lockInfo);
      const expireTime = new Date(lockExpires);
      
      if (expireTime > new Date()) {
        setAccountLocked(true);
        setFormData(prev => ({ ...prev, email }));
      } else {
        // Lock has expired, clear it
        localStorage.removeItem('accountLockInfo');
      }
    }
  }, []);

  // Set up countdown timer if account is locked
  useEffect(() => {
    let interval;
    
    if (accountLocked) {
      interval = setInterval(() => {
        const lockInfo = localStorage.getItem('accountLockInfo');
        if (lockInfo) {
          const { lockExpires } = JSON.parse(lockInfo);
          const expireTime = new Date(lockExpires);
          const now = new Date();
          
          if (expireTime > now) {
            // Calculate remaining time
            const diff = Math.max(0, expireTime - now);
            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setRemainingTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
          } else {
            // Lock has expired
            clearInterval(interval);
            setAccountLocked(false);
            setRemainingTime('');
            localStorage.removeItem('accountLockInfo');
          }
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [accountLocked]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await API.post('/api/auth/login', formData);
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));

        setSnackbar({
          open: true,
          message: 'Login successful!',
          severity: 'success',
        });

        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } catch (error) {
        console.error('Login error:', error.response);
        
        // Handle account locked scenario
        if (error.response?.data?.accountLocked) {
          const lockExpires = new Date(error.response.data.lockExpires);
          
          // Save lock info to localStorage
          localStorage.setItem('accountLockInfo', JSON.stringify({
            email: formData.email,
            lockExpires: lockExpires.toISOString()
          }));
          
          setAccountLocked(true);
          
          setSnackbar({
            open: true,
            message: error.response.data.message || 'Account is temporarily locked due to too many failed attempts',
            severity: 'error',
          });
          return;
        }
        
        // Handle unverified email scenario
        if (error.response?.data?.requireVerification) {
          setSnackbar({
            open: true,
            message: 'Email not verified. Redirecting to verification page...',
            severity: 'warning',
          });
          
          // Redirect to verification page with email as state
          setTimeout(() => {
            navigate('/auth/verify-email', { 
              state: { email: error.response.data.email || formData.email } 
            });
          }, 1500);
          return;
        }
        
        setSnackbar({
          open: true,
          message: error.response?.data?.message || 'Login failed. Please try again.',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        background: isDark
          ? 'linear-gradient(to right bottom, #121212, #1a1a1a)'
          : 'linear-gradient(to right bottom, #f5f5f5, #e0e0e0)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 40%),
                     radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 40%)`,
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center" sx={{ minHeight: '100vh' }}>
          {/* Left side - Illustration */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              sx={{
                p: 4,
                textAlign: 'center',
                animation: 'float 6s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-20px)' },
                },
              }}
            >
              <img
                src="/images/auth/secure-login.svg"
                alt="Secure Login"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <Typography
                variant="h4"
                sx={{
                  mt: 4,
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome Back!
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                Sign in to your account to continue your journey
              </Typography>
            </Box>
          </Grid>

          {/* Right side - Form */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                p: 4,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              {accountLocked ? (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <LockClockIcon color="error" sx={{ fontSize: 60 }} />
                  
                  <Typography variant="h4" color="error" gutterBottom>
                    Account Temporarily Locked
                  </Typography>
                  
                  <Typography variant="body1" paragraph>
                    Too many failed login attempts. Please try again in:
                  </Typography>
                  
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      py: 2, 
                      px: 4, 
                      borderRadius: 2,
                      background: theme.palette.error.light,
                      color: theme.palette.error.contrastText
                    }}
                  >
                    <Typography variant="h3" fontFamily="monospace">
                      {remainingTime}
                    </Typography>
                  </Paper>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Forgot your password?{' '}
                      <Link
                        component={RouterLink}
                        to="/auth/forgot-password"
                        color="primary"
                        underline="hover"
                      >
                        Reset it here
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Typography
                    variant="h4"
                    textAlign="center"
                    sx={{
                      fontWeight: 700,
                      mb: 4,
                      background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Sign In
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="action" />
                            </InputAdornment>
                          ),
                          sx: {
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                sx={{
                                  color: theme.palette.primary.main,
                                  '&:hover': {
                                    backgroundColor: `${theme.palette.primary.main}15`,
                                  },
                                }}
                              >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                          sx: {
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 2,
                        }}
                      >
                        <Link
                          component={RouterLink}
                          to="/auth/forgot-password"
                          color="primary"
                          underline="hover"
                        >
                          Forgot Password?
                        </Link>
                      </Box>

                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={loading}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1rem',
                          background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                            transform: 'scale(1.02)',
                          },
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          'Log In'
                        )}
                      </Button>

                      <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          Don't have an account?{' '}
                          <Link
                            component={RouterLink}
                            to="/auth/register"
                            color="primary"
                            underline="hover"
                          >
                            Sign up
                          </Link>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;