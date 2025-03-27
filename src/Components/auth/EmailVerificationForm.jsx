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
  Paper,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../../BackendAPi/ApiProvider';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import TimerIcon from '@mui/icons-material/Timer';
import VerifiedIcon from '@mui/icons-material/Verified';

const EmailVerificationForm = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const [error, setError] = useState('');
  
  // Initialize from query params or location state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    
    if (emailParam) {
      setEmail(emailParam);
    } else if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  // Handle countdown for resend
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (!email || !verificationCode) {
      setError('Please enter both email and verification code');
      return;
    }
    
    if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
      setError('Verification code must be 6 digits');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await API.post('/api/auth/verify-email', {
        email,
        code: verificationCode
      });
      
      setSnackbar({
        open: true,
        message: 'Email verified successfully!',
        severity: 'success'
      });
      
      // Store user data if it exists in the response
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      // Redirect to dashboard/home after successful verification
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Verification error:', error);
      setError(error.response?.data?.message || 'Failed to verify email. Please try again.');
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to verify email. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await API.post('/api/auth/resend-verification', {
        email
      });
      
      setSnackbar({
        open: true,
        message: 'Verification code sent! Please check your email.',
        severity: 'success'
      });
      
      // Set countdown for resend button (2 minutes)
      setCountdown(120);
      
      setVerificationCode(''); // Clear the input field
    } catch (error) {
      console.error('Resend code error:', error);
      
      if (error.response?.status === 429) {
        // Rate limited
        setCountdown(error.response.data.retryAfter || 120);
        setSnackbar({
          open: true,
          message: 'Please wait before requesting a new code.',
          severity: 'warning'
        });
      } else {
        setError(error.response?.data?.message || 'Failed to send verification code. Please try again.');
        setSnackbar({
          open: true,
          message: error.response?.data?.message || 'Failed to send verification code. Please try again.',
          severity: 'error'
        });
      }
    } finally {
      setLoading(false);
    }
  };

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
                src="/images/auth/verification.svg"
                alt="Email Verification"
                style={{ maxWidth: '100%', height: 'auto' }}
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
                Verify Your Email
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                Please enter the 6-digit code sent to your email to complete registration
              </Typography>
            </Box>
          </Grid>

          {/* Right side - Form */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                background: isDark 
                  ? 'rgba(30, 30, 30, 0.9)' 
                  : 'rgba(255, 255, 255, 0.9)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <VerifiedIcon 
                  color="primary" 
                  sx={{ 
                    fontSize: 60,
                    mb: 2,
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { opacity: 0.6, transform: 'scale(0.95)' },
                      '50%': { opacity: 1, transform: 'scale(1.05)' },
                      '100%': { opacity: 0.6, transform: 'scale(0.95)' },
                    },
                  }} 
                />
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Email Verification
                </Typography>
                <Typography color="text.secondary">
                  Check your inbox for the verification code
                </Typography>
              </Box>

              <form onSubmit={handleVerify}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading || !!location.state?.email || countdown > 0}
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
                    <TextField
                      fullWidth
                      label="Verification Code (6 digits)"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      error={!!error}
                      helperText={error}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" />
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
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify Email'}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {countdown > 0 ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TimerIcon fontSize="small" sx={{ mr: 1 }} />
                          <Typography variant="body2">
                            Resend code in {Math.floor(countdown / 60)}:
                            {String(countdown % 60).padStart(2, '0')}
                          </Typography>
                        </Box>
                      ) : (
                        <Button
                          onClick={handleResendCode}
                          disabled={loading}
                          color="primary"
                          variant="text"
                          sx={{ textTransform: 'none' }}
                        >
                          Didn't receive code? Resend
                        </Button>
                      )}
                    </Box>
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

export default EmailVerificationForm; 