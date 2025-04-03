import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Snackbar,
  Alert,
  useTheme,
  FormControlLabel,
  Checkbox,
  Link,
} from '@mui/material';
import API from '../../BackendAPi/ApiProvider';

const NewsletterForm = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: 'defualt',
    jobTitle: 'defualt',
    preferences: [null],
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.preferences.length) newErrors.preferences = 'Please select at least one preference';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await API.post('/api/forms/newsletter', formData);

        setSnackbar({
          open: true,
          message: 'Thank you for subscribing! Please check your email to confirm your subscription.',
          severity: 'success'
        });

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          jobTitle: '',
          preferences: [],
          agreeToTerms: false
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || 'Failed to subscribe. Please try again.',
          severity: 'error'
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'preferences') {
      const preferences = formData.preferences.includes(value)
        ? formData.preferences.filter(pref => pref !== value)
        : [...formData.preferences, value];
      setFormData(prev => ({
        ...prev,
        preferences
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <Box
      component="section"
      id="newsletter-subscription"
      aria-labelledby="newsletter-heading"
      sx={{
        py: 8,
        background: theme.palette.background.default,
        position: 'relative',
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
          zIndex: 1
        }}
        aria-hidden="true"
      />
      <Container maxWidth="lg">
        <Grid container spacing={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h3"
              component="h2"
              id="newsletter-heading"
              textAlign="center"
              sx={{
                fontWeight: 800,
                mb: 3,
                background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Subscribe to Our Newsletter
            </Typography>
            <Typography
              component="p"
              color="text.secondary"
              textAlign="center"
              sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
            >
              Get the latest digital marketing strategies, growth hacks, and insider tips
              delivered straight to your inbox. Stay ahead of trends, master SEO, social media,
              paid ads, and more with expert insights that drive real results.
              <br />
              <br />
              Join thousands of marketers, entrepreneurs, and business owners who are scaling
              their brands with data-driven strategies. No spam—just actionable insights to help
              you grow faster!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              aria-labelledby="newsletter-heading"
              sx={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                p: 4,
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    required
                    aria-required="true"
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  />
                  {errors.firstName && (
                    <span id="firstName-error" className="sr-only">
                      {errors.firstName}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    required
                    aria-required="true"
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  />
                  {errors.lastName && (
                    <span id="lastName-error" className="sr-only">
                      {errors.lastName}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    aria-required="true"
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" className="sr-only">
                      {errors.email}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        name="agreeToTerms"
                        id="agreeToTerms"
                        color="primary"
                        aria-describedby={errors.agreeToTerms ? "terms-error" : undefined}
                      />
                    }
                    label={
                      <>
                        I agree to receive marketing communications, updates, and accept the{" "}
                        <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                          Privacy Policy
                        </Link>
                      </>
                    }
                  />
                  {errors.agreeToTerms && (
                    <Typography 
                      color="error" 
                      variant="caption" 
                      display="block"
                      id="terms-error"
                    >
                      {errors.agreeToTerms}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    aria-label="Subscribe to our newsletter"
                    sx={{
                      mt: 2,
                      height: 56,
                      borderRadius: 2,
                      background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                      },
                    }}
                  >
                    Subscribe Now
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          <Alert
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
            aria-live="assertive"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default NewsletterForm;