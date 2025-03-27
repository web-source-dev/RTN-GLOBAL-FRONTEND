import React, { useState, useEffect } from 'react';
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
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../BackendAPi/ApiProvider';
import { useAuth } from '../../contexts/AuthContext'; // Assuming you have an auth context

const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Customer Support',
  'Product Management',
  'Design',
  'Human Resources',
  'Finance'
];

const EXPERIENCE_LEVELS = [
  'Entry Level',
  'Mid Level',
  'Senior Level',
  'Lead/Manager',
  'Executive'
];

const JobApplicationForm = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth(); // Get auth status and user info

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    experienceLevel: '',
    currentCompany: '',
    linkedInProfile: '',
    portfolioUrl: '',
    coverLetter: '',
    resume: null,
    willingToRelocate: false,
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Check authentication and redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: 'Please login to apply for jobs',
        severity: 'warning'
      });
      
      // Redirect to login after a short delay
      const timeout = setTimeout(() => {
        navigate('/login', { state: { from: '/job-application', message: 'Please login to apply for jobs' } });
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, navigate]);

  // Pre-fill form with user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prevData => ({
        ...prevData,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        currentCompany: user.company || '',
        linkedInProfile: user.socialLinks?.linkedin || '',
        portfolioUrl: user.socialLinks?.website || '',
      }));
    }
  }, [isAuthenticated, user]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.department) newErrors.department = 'Please select a department';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Please select experience level';
    if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: 'You must be logged in to apply for jobs',
        severity: 'error'
      });
      return;
    }
    
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          if (key === 'resume' && formData[key]) {
            formDataToSend.append('resume', formData[key]);
          } else {
            formDataToSend.append(key, formData[key]);
          }
        });

        const response = await API.post('/api/forms/job-application', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setSnackbar({
          open: true,
          message: `Application ${response.data.applicationId} submitted successfully! We'll review your application and get back to you soon.`,
          severity: 'success'
        });

        // Clear form or redirect
        setTimeout(() => {
          navigate('/user/applications');
        }, 3000);
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || 'Failed to submit application. Please try again.',
          severity: 'error'
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // If not authenticated, show a message instead of the form
  if (!isAuthenticated) {
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
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: 'center',
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Authentication Required
            </Typography>
            <Typography variant="body1" paragraph>
              You need to be logged in to apply for jobs at RTN Global.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/login', { state: { from: '/job-application' } })}
              sx={{ mt: 2 }}
            >
              Go to Login
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

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
          Job Application
        </Typography>
        <Typography
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
        >
          Join our team and be part of something extraordinary. Fill out the form below
          to submit your application.
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
            <Grid item xs={12} sm={6}>
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
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                error={!!errors.department}
                helperText={errors.department}
                required
              >
                {DEPARTMENTS.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                error={!!errors.position}
                helperText={errors.position}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Experience Level"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                error={!!errors.experienceLevel}
                helperText={errors.experienceLevel}
                required
              >
                {EXPERIENCE_LEVELS.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Company"
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="LinkedIn Profile"
                name="linkedInProfile"
                value={formData.linkedInProfile}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Portfolio URL"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Cover Letter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                error={!!errors.coverLetter}
                helperText={errors.coverLetter}
                required
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{ height: 56 }}
              >
                Upload Resume (PDF, DOC, DOCX)*
                <input
                  type="file"
                  hidden
                  name="resume"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx"
                />
              </Button>
              {formData.resume && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Selected file: {formData.resume.name}
                </Typography>
              )}
              {errors.resume && (
                <Typography color="error" variant="caption">
                  {errors.resume}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.willingToRelocate}
                    onChange={handleChange}
                    name="willingToRelocate"
                    color="primary"
                  />
                }
                label="I am willing to relocate if required"
              />
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
                label="I agree to the terms and conditions and consent to the processing of my personal data"
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
                Submit Application
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

export default JobApplicationForm;