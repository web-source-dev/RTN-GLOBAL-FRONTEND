import React, { useState } from 'react';
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
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import API from '../../BackendAPi/ApiProvider';

const ForgotPasswordForm = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setError('');
        setSnackbar({
          open: true,
          message: 'Sending reset instructions...',
          severity: 'info',
        });

        const response = await API.post('/api/auth/forgot-password', { email });

        setSnackbar({
          open: true,
          message: 'Password reset instructions have been sent to your email.',
          severity: 'success',
        });
        setEmail('');
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || 'Failed to send reset instructions. Please try again.',
          severity: 'error',
        });
        setError('An error occurred while processing your request');
      }
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.palette.background.default,
          position: 'relative',
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
          <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center"justifyContent={'center'}>
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
                    alt="Forgot Password"
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

            {/* Right side - Enhanced Form with animations */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 3,
                  p: { xs: 3, sm: 4 },
                  boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: isDark ? '0 15px 40px rgba(0,0,0,0.4)' : '0 15px 40px rgba(0,0,0,0.15)',
                  },
                  animation: 'fadeInUp 0.6s ease-out',
                  '@keyframes fadeInUp': {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
                <Typography
                  variant="h4"
                  textAlign="center"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '0.5px',
                  }}
                >
                  Forgot Password
                </Typography>

                <Typography
                  color="text.secondary"
                  textAlign="center"
                  sx={{ 
                    mb: 4, 
                    fontSize: '0.95rem',
                    maxWidth: '90%',
                    mx: 'auto',
                    lineHeight: 1.5,
                  }}
                >
                  Enter your email address and we'll send you instructions to reset your password.
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        error={!!error}
                        helperText={error}
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
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
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
                        Send Reset Instructions
                      </Button>

                      <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          Remember your password?{' '}
                          <Link
                            component={RouterLink}
                            to="/auth/login"
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
                            Back to login
                          </Link>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

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
    </>
  );
};

export default ForgotPasswordForm;