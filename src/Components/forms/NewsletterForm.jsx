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
} from '@mui/material';

const SUBSCRIPTION_PREFERENCES = [
  'Company Updates',
  'Industry News',
  'Product Announcements',
  'Events & Webinars',
  'Tips & Tutorials'
];

const NewsletterForm = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    preferences: [],
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
        const response = await fetch('http://localhost:5000/api/forms/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

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
          message: error.message || 'Failed to subscribe to newsletter',
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
      sx={{
        py: 8,
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
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
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
        >
          Stay up-to-date with our latest news, industry insights, and exclusive content
          tailored to your interests.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
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
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                required
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
                required
              />
            </Grid>
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
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Subscription Preferences*
              </Typography>
              <Grid container spacing={2}>
                {SUBSCRIPTION_PREFERENCES.map((preference) => (
                  <Grid item xs={12} sm={6} key={preference}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.preferences.includes(preference)}
                          onChange={handleChange}
                          name="preferences"
                          value={preference}
                        />
                      }
                      label={preference}
                    />
                  </Grid>
                ))}
              </Grid>
              {errors.preferences && (
                <Typography color="error" variant="caption">
                  {errors.preferences}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    name="agreeToTerms"
                    color="primary"
                  />
                }
                label="I agree to receive marketing communications and accept the privacy policy"
              />
              {errors.agreeToTerms && (
                <Typography color="error" variant="caption" display="block">
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

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          <Alert
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default NewsletterForm;