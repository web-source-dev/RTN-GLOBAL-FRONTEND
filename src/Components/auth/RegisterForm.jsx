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
  IconButton,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Stack,
  MobileStepper,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Divider from '@mui/material/Divider';
import API from '../../BackendAPi/ApiProvider';

// Step labels and icons for the registration process
const steps = [
  {
    label: 'Personal Information',
    icon: <AccountCircleIcon />,
    description: 'Let\'s start with your name and contact details'
  },
  {
    label: 'Account Security',
    icon: <SecurityIcon />,
    description: 'Create a secure password for your account'
  },
  {
    label: 'Additional Details',
    icon: <MoreHorizIcon />,
    description: 'Optional information to enhance your experience'
  },
  {
    label: 'Review & Complete',
    icon: <CheckCircleIcon />,
    description: 'Review your information and complete registration'
  }
];

const RegisterForm = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Active step state
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Step validation functions
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    // Enhanced password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (formData.phone && !/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }; 

  const validateStep4 = () => {
    const newErrors = {};
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Combined form validation
  const validateForm = () => {
    return validateStep1() && validateStep2() && validateStep3() && validateStep4();
  };

  // Handle step navigation
  const handleNext = () => {
    let isValid = false;
    
    switch (activeStep) {
      case 0:
        isValid = validateStep1();
        break;
      case 1:
        isValid = validateStep2();
        break;
      case 2:
        isValid = validateStep3();
        break;
      case 3:
        isValid = validateStep4();
        break;
      default:
        isValid = false;
    }

    if (isValid) {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await API.post('/api/auth/register', formData);
        
        // Check if verification is required
        if (response.data.requireVerification) {
          setSnackbar({
            open: true,
            message: 'Registration successful! Please verify your email.',
            severity: 'success',
          });
          
          // Redirect to verification page
          setTimeout(() => {
            navigate('/auth/verify-email', { 
              state: { email: formData.email } 
            });
          }, 1500);
        } else {
          // Regular success flow
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          setSnackbar({
            open: true,
            message: 'Registration successful! Redirecting to dashboard...',
            severity: 'success',
          });
          
          // Reset form
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            company: '',
            phone: '',
            acceptTerms: false,
          });
          
          setTimeout(() => {
            window.location.href = `${process.env.REACT_APP_USER_DASHBOARD_URL}/dashboard/user`;
          }, 2000);
        }
      } catch (error) {
        console.error('Registration error:', error);
        setSnackbar({
          open: true,
          message: error.response?.data?.message || 'Registration failed. Please try again.',
          severity: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'acceptTerms' ? checked : value,
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

  // Step content components
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                  }
                }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                  }
                }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
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
                  }
                }}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
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
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">
                Password must contain at least 8 characters, including uppercase, lowercase, 
                numbers and special characters.
              </Typography>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company (Optional)"
                name="company"
                value={formData.company}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                  }
                }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number (Optional)"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Review Your Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Name:
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {formData.firstName} {formData.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Email:
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {formData.email}
                    </Typography>
                  </Grid>
                  {formData.company && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Company:
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formData.company}
                      </Typography>
                    </Grid>
                  )}
                  {formData.phone && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Phone:
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formData.phone}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
              
              <FormControlLabel
                control={
                  <Checkbox
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    color="primary"
                    sx={{
                      '&.Mui-checked': {
                        color: theme.palette.primary.main,
                      },
                      '&:hover': { 
                        backgroundColor: `${theme.palette.primary.main}15` 
                      },
                    }}
                  />
                }
                label="I agree to the terms and conditions"
                sx={{
                  '& .MuiFormControlLabel-label': { 
                    fontSize: '0.95rem',
                    color: theme.palette.text.secondary, 
                  }
                }}
              />
              {errors.acceptTerms && (
                <Typography color="error" variant="caption" display="block" sx={{ mt: 0.5, ml: 2 }}>
                  {errors.acceptTerms}
                </Typography>
              )}
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
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
           
              <Typography
                variant="h4"
                sx={{
                  mt: 4,
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
                }}
              >
                Create Your Account
              </Typography>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 2, mb: 4, maxWidth: '80%', mx: 'auto' }}
              >
                Join our platform to access exclusive features and personalized experiences.
              </Typography>

              {/* Vertical stepper - desktop only */}
              <Box sx={{ pl: 2, display: { xs: 'none', md: 'block' } }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step 
                      key={step.label}
                      sx={{
                        '& .MuiStepLabel-iconContainer': {
                          '& .MuiStepIcon-root': {
                            color: index === activeStep 
                              ? theme.palette.primary.main
                              : index < activeStep 
                                ? theme.palette.success.main 
                                : isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                            fontSize: 28,
                          },
                        },
                      }}
                    >
                      <StepLabel
                        StepIconComponent={() => step.icon}
                        sx={{
                          '& .MuiStepLabel-label': {
                            color: index === activeStep 
                              ? theme.palette.primary.main
                              : 'text.secondary',
                            fontWeight: index === activeStep ? 600 : 400,
                          },
                        }}
                      >
                        <Typography variant="subtitle1">{step.label}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {step.description}
                        </Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
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
                background: theme.palette.background.default,
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                boxShadow: isDark 
                  ? '0 10px 30px rgba(0, 0, 0, 0.5)' 
                  : '0 10px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Mobile header and stepper */}
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
                  Create Your Account
                </Typography>
                
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center', mb: 3 }}
                >
                  {steps[activeStep].label}: {steps[activeStep].description}
                </Typography>
                
                <MobileStepper
                  variant="dots"
                  steps={steps.length}
                  position="static"
                  activeStep={activeStep}
                  sx={{ 
                    background: 'transparent',
                    '& .MuiMobileStepper-dot': {
                      mx: 0.5,
                      transition: 'all 0.3s',
                    },
                    '& .MuiMobileStepper-dotActive': {
                      background: theme.palette.primary.main,
                      width: 12, 
                      borderRadius: 4,
                    }
                  }}
                  nextButton={<div />}
                  backButton={<div />}
                />
              </Box>
              
              {/* Desktop step title */}
              <Box sx={{ display: { xs: 'none', md: 'block' }, mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">
                  {steps[activeStep].label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {steps[activeStep].description}
                </Typography>
              </Box>
              
              {/* Step content */}
              <Box sx={{ mt: 2 }}>
                {renderStepContent(activeStep)}
              </Box>
              
              {/* Navigation buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  color="inherit"
                  startIcon={<KeyboardArrowLeft />}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    opacity: activeStep === 0 ? 0 : 1,
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  variant="contained"
                  endIcon={activeStep === steps.length - 1 ? null : <KeyboardArrowRight />}
                  disabled={isLoading}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    px: 3,
                    py: 1,
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
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : activeStep === steps.length - 1 ? (
                    'Complete Registration'
                  ) : (
                    'Continue'
                  )}
                </Button>
              </Box>
              
              {/* Social login options - only on first step */}
              {activeStep === 0 && (
                <>
                  <Box sx={{ position: 'relative', textAlign: 'center', my: 3 }}>
                    <Divider>
                      <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                        OR
                      </Typography>
                    </Divider>
                  </Box>
                  
                  <Stack spacing={2} direction="row">
                    <Button
                      onClick={handleGoogleLogin}
                      variant="outlined"
                      fullWidth
                      startIcon={<GoogleIcon color="error" />}
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
                      onClick={handleFacebookLogin}
                      variant="outlined"
                      fullWidth
                      startIcon={<FacebookIcon color="primary" />}
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
                </>
              )}
              
              {/* Login link */}
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
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
                    Log in
                  </Link>
                </Typography>
              </Box>
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

export default RegisterForm;