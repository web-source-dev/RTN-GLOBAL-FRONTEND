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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LockClockIcon from '@mui/icons-material/LockClock';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import SecurityIcon from '@mui/icons-material/Security';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import API from '../../BackendAPi/ApiProvider';
import SEO from '../common/SEO';

const LoginForm = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
  
  // 2FA States
  const [showTwoFactorDialog, setShowTwoFactorDialog] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [showBackupCodeForm, setShowBackupCodeForm] = useState(false);
  const [backupCode, setBackupCode] = useState('');
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);

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
        
        // Check if 2FA is required (based on the response from the server)
        if (response.data.requireTwoFactor) {
          // Show 2FA dialog instead of completing login
          setShowTwoFactorDialog(true);
          setLoading(false);
          return;
        }
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));

        setSnackbar({
          open: true,
          message: 'Login successful!',
          severity: 'success',
        });

        setTimeout(() => {
          window.location.href = `${process.env.REACT_APP_USER_DASHBOARD_URL}/dashboard/user`;
        }, 1500);
      } catch (error) {
        console.error('Login error:', error.response);
        
        // Check for 2FA required response
        if (error.response?.data?.requireTwoFactor) {
          setShowTwoFactorDialog(true);
          setLoading(false);
          return;
        }
        
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

  // Handle 2FA verification
  const handleVerifyTwoFactor = async () => {
    if (!verificationCode && !backupCode) {
      setVerificationError('Please enter a verification code or backup code');
      return;
    }
    
    setTwoFactorLoading(true);
    setVerificationError('');
    
    try {
      let response;
      
      if (showBackupCodeForm) {
        // Using backup code
        response = await API.post('/api/auth/2fa/validate', {
          email: formData.email,
          backupCode: backupCode
        });
      } else {
        // Using verification code from authenticator app
        response = await API.post('/api/auth/2fa/validate', {
          email: formData.email,
          token: verificationCode
        });
      }
      
      // Login successful with 2FA
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setSnackbar({
        open: true,
        message: 'Login successful!',
        severity: 'success',
      });
      
      // Close dialog
      setShowTwoFactorDialog(false);
      
      setTimeout(() => {
        window.location.href = `${process.env.REACT_APP_USER_DASHBOARD_URL}/dashboard/user`;
      }, 1500);
    } catch (error) {
      console.error('2FA verification error:', error.response);
      setVerificationError(error.response?.data?.message || 'Invalid verification code');
    } finally {
      setTwoFactorLoading(false);
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

  // Toggle between verification code and backup code forms
  const toggleBackupCodeForm = () => {
    setShowBackupCodeForm(!showBackupCodeForm);
    setVerificationCode('');
    setBackupCode('');
    setVerificationError('');
  };

  return (
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
      {/* Background gradients */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.2,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 40%),
                        radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 40%)`,
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Add SEO component with noindex set to true */}
        <SEO
          title="Login to Your Account"
          description="Securely login to your RTN Global account."
          canonicalUrl="/auth/login"
          noIndex={true}
        />
        
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
          {/* Left side - Hidden on mobile */}
          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              sx={{
                p: { md: 3, lg: 4 },
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <Box>
                <img src="/images/auth/login.svg" alt="RTN Global" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </Box>
            </Box>
          </Grid>
          
          {/* Right side - Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={6}
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: 3,
                maxWidth: '100%',
                position: 'relative',
                zIndex: 2,
                background: theme.palette.background.paper,
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                boxShadow: isDark 
                  ? '0 10px 30px rgba(0, 0, 0, 0.5)' 
                  : '0 10px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Mobile header */}
              <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    textAlign: 'center',
                    mb: 1,
                    background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Welcome Back
                </Typography>
                
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center', mb: 3 }}
                >
                  Sign in to access your dashboard
                </Typography>
              </Box>
              
              {/* Logo */}
           

              {/* Desktop heading - only visible on desktop */}
              <Box sx={{ display: { xs: 'none', md: 'block' }, mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">
                  Sign In
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enter your credentials to access your account
                </Typography>
              </Box>

              {/* Form */}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  disabled={accountLocked || loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                    }
                  }}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  disabled={accountLocked || loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                    }
                  }}
                  sx={{ mb: 2 }}
                />

                {accountLocked && (
                  <Alert
                    severity="error"
                    icon={<LockClockIcon />}
                    sx={{
                      mb: 3,
                      mt: 1,
                      alignItems: 'center',
                      borderRadius: 2,
                      '& .MuiAlert-message': {
                        width: '100%',
                      },
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      Account locked due to multiple failed attempts
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Try again in:</Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: 'monospace',
                          fontWeight: 'bold',
                          color: theme.palette.error.light,
                        }}
                      >
                        {remainingTime}
                      </Typography>
                    </Box>
                  </Alert>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={accountLocked || loading}
                  sx={{
                    mt: 3,
                    mb: 3,
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                    backgroundSize: '200% 200%',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 5px 10px rgba(25, 118, 210, 0.3)',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>

                <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Grid item>
                    <Link 
                      component={RouterLink} 
                      to="/auth/forgot-password" 
                      variant="body2"
                      sx={{
                        color: theme.palette.primary.main,
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
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link 
                      component={RouterLink} 
                      to="/auth/register" 
                      variant="body2"
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
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>

                <Box sx={{ position: 'relative', textAlign: 'center', my: 3 }}>
                  <Divider>
                    <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                      OR
                    </Typography>
                  </Divider>
                </Box>

                <Stack spacing={2} direction="row">
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon color="error" />}
                    onClick={handleGoogleLogin}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                      color: theme.palette.text.primary,
                      p: 1,
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: `${theme.palette.primary.main}10`,
                      },
                    }}
                  >
                    Continue with Google
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FacebookIcon color="primary" />}
                    onClick={handleFacebookLogin}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                      color: theme.palette.text.primary,
                      p: 1,
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: `${theme.palette.primary.main}10`,
                      },
                    }}
                  >
                    Continue with Facebook
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar */}
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
      
      {/* Two-Factor Authentication Dialog */}
      <Dialog 
        open={showTwoFactorDialog} 
        maxWidth="xs" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <SecurityIcon />
          Two-Factor Authentication
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3, pb: 1 }}>
          <Stack spacing={3}>
            {verificationError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {verificationError}
              </Alert>
            )}
            
            {!showBackupCodeForm ? (
              <>
                <Typography variant="body1">
                  Enter the verification code from your authenticator app to complete login.
                </Typography>
                
                <TextField
                  label="Verification Code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  fullWidth
                  autoFocus
                  placeholder="6-digit code"
                  inputProps={{ 
                    maxLength: 6,
                    inputMode: 'numeric'
                  }}
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                    }
                  }}
                />
              </>
            ) : (
              <>
                <Typography variant="body1">
                  Enter one of your backup codes to complete login.
                </Typography>
                
                <TextField
                  label="Backup Code"
                  value={backupCode}
                  onChange={(e) => setBackupCode(e.target.value.toUpperCase())}
                  fullWidth
                  autoFocus
                  placeholder="e.g. ABCD1234"
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                    }
                  }}
                />
              </>
            )}
            
            <Button
              variant="text"
              onClick={toggleBackupCodeForm}
              startIcon={<HelpOutlineIcon />}
              sx={{ alignSelf: 'flex-start' }}
            >
              {showBackupCodeForm 
                ? "Use authenticator app instead" 
                : "Lost your device? Use a backup code"}
            </Button>
          </Stack>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Button 
            onClick={() => setShowTwoFactorDialog(false)}
            disabled={twoFactorLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handleVerifyTwoFactor}
            disabled={(!verificationCode && !backupCode) || twoFactorLoading}
            startIcon={twoFactorLoading ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              borderRadius: 2,
            }}
          >
            {twoFactorLoading ? "Verifying..." : "Verify"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginForm;