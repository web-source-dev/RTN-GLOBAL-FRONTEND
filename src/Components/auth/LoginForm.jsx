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
  Divider,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LockClockIcon from '@mui/icons-material/LockClock';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
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
      try {
        const { email, lockExpires } = JSON.parse(lockInfo);
        const expireTime = new Date(lockExpires);
        
        if (expireTime > new Date()) {
          console.log("Found active account lock in localStorage");
          setAccountLocked(true);
          setFormData(prev => ({ ...prev, email }));
          
          // Initialize timer immediately
          const now = new Date();
          const diff = Math.max(0, expireTime - now);
          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          setRemainingTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        } else {
          // Lock has expired, clear it
          console.log("Found expired account lock in localStorage");
          localStorage.removeItem('accountLockInfo');
        }
      } catch (error) {
        console.error("Error parsing account lock info:", error);
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
            
            // Add notification when lock expires
            setSnackbar({
              open: true,
              message: 'Account has been unlocked, you can try logging in again',
              severity: 'info',
            });
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
        
        // More robust error detection for account locked scenario
        if (error.response?.status === 403 && error.response?.data?.accountLocked) {
          console.log("Account locked response detected", error.response.data);
          const lockExpires = new Date(error.response.data.lockExpires);
          
          // Save lock info to localStorage
          localStorage.setItem('accountLockInfo', JSON.stringify({
            email: formData.email,
            lockExpires: lockExpires.toISOString()
          }));
          
          setAccountLocked(true);
          
          // Calculate initial remaining time
          const now = new Date();
          const diff = Math.max(0, lockExpires - now);
          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          setRemainingTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
          
          setSnackbar({
            open: true,
            message: error.response.data.message || 'Account is temporarily locked due to too many failed attempts',
            severity: 'error',
          });
          return;
        } else if (error.response?.data?.message?.includes("Too many attempts from this IP")) {
          // Handle IP rate limiting separately
          setSnackbar({
            open: true,
            message: "Too many login attempts detected. Please try again later or reset your password.",
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

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/facebook`;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        background: theme.palette.background.default,
        overflow: 'hidden',
        py: { xs: 4, md: 0 },
      }}
    >
          {/* Background Pattern with enhanced animation */}
          <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.2,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 10%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 10%)`,
          zIndex: 1,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center" sx={{ minHeight: '100vh' }}>
          {/* Left side - Enhanced Illustration */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              sx={{
                p: { md: 3, lg: 4 },
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  animation: 'float 6s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                  },
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <img
                  src="/images/auth/login.svg"
                  alt="Secure Login"
                  style={{ 
                    maxWidth: '85%', 
                    height: 'auto',
                    filter: isDark ? 'drop-shadow(0 0 10px rgba(25, 118, 210, 0.4))' : 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1))'
                  }}
                />
              </Box>
              
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientAnimation 5s ease infinite',
                  '@keyframes gradientAnimation': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                  },
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '0.5px',
                }}
              >
                Welcome Back!
              </Typography>
              
              <Typography 
                color="text.secondary" 
                sx={{ 
                  mt: 2, 
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  maxWidth: '85%', 
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Sign in to your account to continue your journey with us
              </Typography>
            </Box>
          </Grid>

          {/* Right side - Enhanced Form */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={isDark ? 4 : 6}
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                background: theme.palette.background.default,
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: isDark 
                    ? '0 15px 30px rgba(0, 0, 0, 0.5)' 
                    : '0 15px 30px rgba(0, 0, 0, 0.1)',
                },
                animation: 'fadeInUp 0.6s ease-out',
                '@keyframes fadeInUp': {
                  '0%': { opacity: 0, transform: 'translateY(20px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' },
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
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: isDark 
                        ? 'rgba(211, 47, 47, 0.2)' 
                        : 'rgba(211, 47, 47, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': { boxShadow: '0 0 0 0 rgba(211, 47, 47, 0.4)' },
                        '70%': { boxShadow: '0 0 0 15px rgba(211, 47, 47, 0)' },
                        '100%': { boxShadow: '0 0 0 0 rgba(211, 47, 47, 0)' },
                      },
                    }}
                  >
                    <LockClockIcon
                      sx={{ 
                        fontSize: 60,
                        color: theme.palette.error.main,
                        animation: 'shake 1.5s ease infinite',
                        '@keyframes shake': {
                          '0%, 100%': { transform: 'rotate(0)' },
                          '10%, 30%, 50%, 70%, 90%': { transform: 'rotate(-5deg)' },
                          '20%, 40%, 60%, 80%': { transform: 'rotate(5deg)' },
                        },
                      }}
                    />
                  </Box>
                  
                  <Typography 
                    variant="h4" 
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #d32f2f, #f44336)',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Account Locked
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Too many failed login attempts. Please try again in:
                  </Typography>
                  
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      py: 2, 
                      px: 4, 
                      borderRadius: 2,
                      background: isDark ? 'rgba(211, 47, 47, 0.2)' : 'rgba(211, 47, 47, 0.1)',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(211, 47, 47, 0.3)' : 'rgba(211, 47, 47, 0.2)',
                    }}
                  >
                    <Typography 
                      variant="h3" 
                      fontFamily="monospace"
                      sx={{
                        color: theme.palette.error.main,
                        animation: 'pulse 1s infinite ease-in-out',
                      }}
                    >
                      {remainingTime}
                    </Typography>
                  </Paper>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Forgot your password?{' '}
                      <Link
                        component={RouterLink}
                        to="/auth/forgot-password"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          textDecoration: 'none',
                          position: 'relative',
                          '&:after': {
                            content: '""',
                            position: 'absolute',
                            width: '100%',
                            height: '2px',
                            bottom: -2,
                            left: 0,
                            background: 'linear-gradient(90deg, #1976d2, #9c27b0)',
                            transform: 'scaleX(0)',
                            transformOrigin: 'bottom right',
                            transition: 'transform 0.3s',
                          },
                          '&:hover:after': {
                            transform: 'scaleX(1)',
                            transformOrigin: 'bottom left',
                          },
                        }}
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
                      mb: 2,
                      background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.5px',
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
                            borderRadius: 2,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderWidth: '1.5px',
                              transition: 'border-color 0.3s',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderWidth: '2px',
                            },
                          }
                        }}
                        sx={{ 
                          '& label': { fontSize: '0.95rem' },
                          '& label.Mui-focused': { 
                            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                            backgroundClip: 'text',
                            textFillColor: 'transparent',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
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
                                  color: showPassword ? theme.palette.primary.main : 'inherit',
                                  transition: 'all 0.2s',
                                  '&:hover': {
                                    background: `${theme.palette.primary.main}15`,
                                    transform: 'scale(1.05)',
                                  },
                                }}
                              >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: 2,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderWidth: '1.5px',
                              transition: 'border-color 0.3s',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderWidth: '2px',
                            },
                          }
                        }}
                        sx={{ 
                          '& label': { fontSize: '0.95rem' },
                          '& label.Mui-focused': { 
                            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                            backgroundClip: 'text',
                            textFillColor: 'transparent',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          },
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                        <Divider sx={{ flexGrow: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
                          or
                        </Typography>
                        <Divider sx={{ flexGrow: 1 }} />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon sx={{ color: '#DB4437' }} />}
                        onClick={handleGoogleLogin}
                        sx={{
                          py: 1.2,
                          borderRadius: 2,
                          borderColor: isDark ? 'rgba(255,255,255,0.2)' : '#DBDBDB',
                          color: theme.palette.text.primary,
                          textTransform: 'none',
                          fontSize: '1rem',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                            transition: 'left 0.7s',
                          },
                          '&:hover': {
                            borderColor: isDark ? 'rgba(255,255,255,0.3)' : '#ABABAB',
                            transform: 'translateY(-2px)',
                            boxShadow: isDark 
                              ? '0 4px 12px rgba(0,0,0,0.3)' 
                              : '0 4px 12px rgba(0,0,0,0.1)',
                            '&:before': {
                              left: '100%',
                            },
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Continue with Google
                      </Button>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<FacebookIcon style={{ color: '#1877F2' }} />}
                        onClick={handleFacebookLogin}
                        sx={{
                          py: 1.2,
                          borderRadius: 2,
                          borderColor: isDark ? 'rgba(255,255,255,0.2)' : '#DBDBDB',
                          color: theme.palette.text.primary,
                          textTransform: 'none',
                          fontSize: '1rem',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                            transition: 'left 0.7s',
                          },
                          '&:hover': {
                            borderColor: isDark ? 'rgba(255,255,255,0.3)' : '#ABABAB',
                            transform: 'translateY(-2px)',
                            boxShadow: isDark 
                              ? '0 4px 12px rgba(0,0,0,0.3)' 
                              : '0 4px 12px rgba(0,0,0,0.1)',
                            '&:before': {
                              left: '100%',
                            },
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Continue with Facebook
                      </Button>
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
                          sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                            textDecoration: 'none',
                            position: 'relative',
                            '&:after': {
                              content: '""',
                              position: 'absolute',
                              width: '100%',
                              height: '2px',
                              bottom: -2,
                              left: 0,
                              background: 'linear-gradient(90deg, #1976d2, #9c27b0)',
                              transform: 'scaleX(0)',
                              transformOrigin: 'bottom right',
                              transition: 'transform 0.3s',
                            },
                            '&:hover:after': {
                              transform: 'scaleX(1)',
                              transformOrigin: 'bottom left',
                            },
                          }}
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
                          py: 1.5,
                          fontWeight: 600,
                          background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                          backgroundSize: '200% 200%',
                          animation: 'gradientBtnAnimation 5s ease infinite',
                          '@keyframes gradientBtnAnimation': {
                            '0%': { backgroundPosition: '0% 50%' },
                            '50%': { backgroundPosition: '100% 50%' },
                            '100%': { backgroundPosition: '0% 50%' },
                          },
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 7px 15px rgba(25, 118, 210, 0.3)',
                          },
                          '&:active': {
                            transform: 'translateY(-1px)',
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
                            sx={{
                              color: theme.palette.primary.main,
                              fontWeight: 600,
                              textDecoration: 'none',
                              position: 'relative',
                              '&:after': {
                                content: '""',
                                position: 'absolute',
                                width: '100%',
                                height: '2px',
                                bottom: -2,
                                left: 0,
                                background: 'linear-gradient(90deg, #1976d2, #9c27b0)',
                                transform: 'scaleX(0)',
                                transformOrigin: 'bottom right',
                                transition: 'transform 0.3s',
                              },
                              '&:hover:after': {
                                transform: 'scaleX(1)',
                                transformOrigin: 'bottom left',
                              },
                            }}
                          >
                            Sign up
                          </Link>
                        </Typography>
                      </Box>
                    </Grid>

                  </Grid>
                </form>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: 4 }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;