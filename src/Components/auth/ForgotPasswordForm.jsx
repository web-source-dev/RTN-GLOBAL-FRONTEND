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
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        position: 'relative',
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
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
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
                src="/images/auth/forget.svg"
                alt="Forgot Password"
                style={{ maxWidth: '100%', height: 'auto' ,mixBlendMode: 'multiply' }}
              />
              <Typography
                variant="h5"
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
                Password Recovery
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                Don't worry, we'll help you reset your password securely
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
                }}
              >
                Forgot Password
              </Typography>

              <Typography
                color="text.secondary"
                textAlign="center"
                sx={{ mb: 4 }}
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
                        background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                          transform: 'scale(1.02)',
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
                          color="primary"
                          underline="hover"
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
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
</>
  );
};

export default ForgotPasswordForm;