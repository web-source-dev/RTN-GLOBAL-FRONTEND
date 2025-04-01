import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  useTheme,
  InputAdornment,
  IconButton,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import KeyIcon from '@mui/icons-material/Key';
import API from '../../BackendAPi/ApiProvider';

const ResetPasswordForm = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const validateToken = async (token) => {
      try {
        setLoading(true);
        const response = await API.get(`/api/auth/validate-reset-token/${token}`);
        
        setTokenValid(true);
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Invalid or expired reset link. Please request a new one.',
          severity: 'error',
        });
        setTokenValid(false);
      } finally {
        setLoading(false);
      }
    };

    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      validateToken(token);
    } else {
      setTokenValid(false);
      setLoading(false);
    }
  }, [location]);

  const validateForm = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        
        const response = await API.post(`/api/auth/reset-password/${token}`, {
          password: formData.password
        });

        setSnackbar({
          open: true,
          message: 'Password reset successful! You can now log in with your new password.',
          severity: 'success',
        });

        setTimeout(() => {
          navigate('/auth/login');
        }, 2000);
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || 'Password reset failed. Please try again.',
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

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isDark
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        }}
      >
        <CircularProgress 
          size={60} 
          thickness={4}
          sx={{ 
            color: theme.palette.primary.main,
            boxShadow: '0 0 20px rgba(25, 118, 210, 0.3)',
          }} 
        />
      </Box>
    );
  }

  if (!tokenValid) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.palette.background.default,
          position: 'relative',
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
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            maxWidth: '90%',
            width: 500,
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            background: theme.palette.background.default,
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 0.6s ease-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              mx: 'auto',
              mb: 3,
              background: isDark 
                ? 'rgba(211, 47, 47, 0.2)' 
                : 'rgba(211, 47, 47, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <KeyIcon 
              color="error" 
              sx={{ 
                fontSize: 40,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 0.6, transform: 'scale(0.9)' },
                  '50%': { opacity: 1, transform: 'scale(1.1)' },
                  '100%': { opacity: 0.6, transform: 'scale(0.9)' },
                },
              }} 
            />
          </Box>
          
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: theme.palette.error.main,
            }}
          >
            Link Expired
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            This password reset link is invalid or has expired. Please request a new one.
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/auth/forgot-password')}
            sx={{
              mt: 2,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              py: 1.2,
              px: 3,
              fontWeight: 600,
              transition: 'all 0.3s ease-in-out',
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 7px 15px rgba(25, 118, 210, 0.3)',
              },
            }}
          >
            Request New Link
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 4, md: 0 },
      }}
    >
      {/* Enhanced background with animated elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.07,
          background: `
            radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 40%),
            radial-gradient(circle at 40% 60%, ${theme.palette.success.main} 0%, transparent 30%)
          `,
          animation: 'gradientShift 15s ease infinite alternate',
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 0%' },
            '100%': { backgroundPosition: '100% 100%' },
          },
          zIndex: 1,
        }}
      />

      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center" justifyContent="center">
          {/* Left side - Enhanced Illustration with animations */}
          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
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
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <img
                  src="/images/auth/forget.svg"
                  alt="Reset Password"
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto',
                    filter: isDark ? 'drop-shadow(0 0 8px rgba(25, 118, 210, 0.3))' : 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1))',
                    mixBlendMode: isDark ? 'lighten' : 'multiply'  
                  }}
                />
              </Box>
              
            </Box>
          </Grid>

          {/* Right side - Enhanced Form */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={isDark ? 4 : 6}
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
                background: isDark 
                  ? 'rgba(30, 30, 30, 0.9)' 
                  : 'rgba(255, 255, 255, 0.9)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: isDark 
                    ? '0 10px 30px rgba(0, 0, 0, 0.5)' 
                    : '0 10px 30px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <KeyIcon 
                  color="primary" 
                  sx={{ 
                    fontSize: 45,
                    mb: 1,
                    animation: 'keyRotate 3s infinite',
                    '@keyframes keyRotate': {
                      '0%': { transform: 'rotateY(0deg)' },
                      '50%': { transform: 'rotateY(180deg)' },
                      '100%': { transform: 'rotateY(360deg)' },
                    },
                  }} 
                />
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Create New Password
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your password must be at least 8 characters with uppercase, lowercase, numbers, and special characters
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="New Password"
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
                      label="Confirm New Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                              sx={{
                                color: theme.palette.primary.main,
                                '&:hover': {
                                  backgroundColor: `${theme.palette.primary.main}15`,
                                },
                              }}
                            >
                              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
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

export default ResetPasswordForm;