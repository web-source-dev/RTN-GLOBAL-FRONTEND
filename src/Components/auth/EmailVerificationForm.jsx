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
        navigate('/dashboard/user');
      }, 10000);
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
        background:theme.palette.background.default,
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
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center" justifyContent="center">
          {/* Left side - Enhanced Illustration with animated elements */}
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
                }}
              >
                <img
                  src="/images/auth/email-verify.png"
                  alt="Email Verification"
                  style={{ 
                    maxWidth: '90%', 
                    height: 'auto',
                    filter: isDark ? 'drop-shadow(0 0 8px rgba(0, 150, 255, 0.3))' : 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1))'
                  }}
                />
              </Box>
           
            </Box>
          </Grid>

          {/* Right side - Enhanced Form with animations and improved layout */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={isDark ? 4 : 6}
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
                background: theme.palette.background.default,
                border: '1px solid',
                borderColor:theme.palette.background.default,
                transform: 'translateZ(0)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px) translateZ(0)',
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
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: isDark 
                      ? 'rgba(25, 118, 210, 0.2)' 
                      : 'rgba(25, 118, 210, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <VerifiedIcon 
                    color="primary" 
                    sx={{ 
                      fontSize: 45,
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': { opacity: 0.8, transform: 'scale(0.95)' },
                        '50%': { opacity: 1, transform: 'scale(1.05)' },
                        '100%': { opacity: 0.8, transform: 'scale(0.95)' },
                      },
                    }} 
                  />
                </Box>
                
                <Typography 
                  variant="h4" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{
                    background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '0.5px',
                  }}
                >
                  Email Verification
                </Typography>
                
                <Typography 
                  color="text.secondary"
                  sx={{
                    fontSize: '0.95rem',
                    maxWidth: '85%',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
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
                        'Verify Email'
                      )}
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {countdown > 0 ? (
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            p: 1,
                            borderRadius: 2,
                            background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
                          }}
                        >
                          <TimerIcon fontSize="small" sx={{ mr: 1, color: theme.palette.warning.main }} />
                          <Typography 
                            variant="body2"
                            sx={{
                              fontFamily: 'monospace',
                              fontWeight: 600,
                            }}
                          >
                            Resend in {Math.floor(countdown / 60)}:
                            {String(countdown % 60).padStart(2, '0')}
                          </Typography>
                        </Box>
                      ) : (
                        <Button
                          onClick={handleResendCode}
                          disabled={loading}
                          sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            color: theme.palette.primary.main,
                            '&:hover': {
                              backgroundColor: `${theme.palette.primary.main}15`,
                            },
                            transition: 'all 0.2s',
                          }}
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

export default EmailVerificationForm; 