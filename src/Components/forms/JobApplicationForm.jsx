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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  FormHelperText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../BackendAPi/ApiProvider';
import { useAuth } from '../../contexts/AuthContext'; // Assuming you have an auth context
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArticleIcon from '@mui/icons-material/Article';

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

  // Add state for tracking the current step
  const [activeStep, setActiveStep] = useState(0);

  // Add loading state for submit button
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Step definitions
  const steps = [
    {
      label: 'Personal Information',
      description: 'Your basic contact details',
      icon: <PersonIcon />,
      fields: ['firstName', 'lastName', 'email', 'phone']
    },
    {
      label: 'Job Details',
      description: 'Position and experience',
      icon: <WorkIcon />,
      fields: ['department', 'position', 'experienceLevel', 'currentCompany', 'linkedInProfile', 'portfolioUrl']
    },
    {
      label: 'Application Documents',
      description: 'Your cover letter and resume',
      icon: <DescriptionIcon />,
      fields: ['coverLetter', 'resume']
    },
    {
      label: 'Review & Submit',
      description: 'Final review and terms',
      icon: <CheckCircleIcon />,
      fields: ['willingToRelocate', 'agreeToTerms']
    }
  ];

  const handleNext = () => {
    // Validate current step fields before proceeding
    const currentStepFields = steps[activeStep].fields;
    const stepErrors = {};
    
    currentStepFields.forEach(field => {
      if (field === 'firstName' && !formData.firstName.trim()) 
        stepErrors.firstName = 'First name is required';
      if (field === 'lastName' && !formData.lastName.trim()) 
        stepErrors.lastName = 'Last name is required';
      if (field === 'email') {
        if (!formData.email.trim()) {
          stepErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
          stepErrors.email = 'Invalid email address';
        }
      }
      if (field === 'phone' && !formData.phone.trim()) 
        stepErrors.phone = 'Phone number is required';
      if (field === 'department' && !formData.department) 
        stepErrors.department = 'Please select a department';
      if (field === 'position' && !formData.position.trim()) 
        stepErrors.position = 'Position is required';
      if (field === 'experienceLevel' && !formData.experienceLevel) 
        stepErrors.experienceLevel = 'Please select experience level';
      if (field === 'coverLetter' && !formData.coverLetter.trim()) 
        stepErrors.coverLetter = 'Cover letter is required';
      if (field === 'resume' && !formData.resume) 
        stepErrors.resume = 'Resume is required';
      if (field === 'agreeToTerms' && activeStep === steps.length - 1 && !formData.agreeToTerms) 
        stepErrors.agreeToTerms = 'You must agree to the terms';
    });
    
    setErrors(stepErrors);
    
    if (Object.keys(stepErrors).length === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepClick = (step) => {
    // Only allow going back to previous steps or current step
    if (step <= activeStep) {
      setActiveStep(step);
    }
  };

  const validateForm = () => {
    // ... existing validation code ...
    // This is still needed for the final submission
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
        setIsSubmitting(true);
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

        setActiveStep(steps.length);

        setSnackbar({
          open: true,
          message: `Application ${response.data.applicationId} submitted successfully! We'll review your application and get back to you soon.`,
          severity: 'success'
        });

        // Clear form or redirect
        setTimeout(() => {
          navigate('/dashboard/user/applications');
        }, 3000);
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || 'Failed to submit application. Please try again.',
          severity: 'error'
        });
      } finally {
        setIsSubmitting(false);
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
      component="section"
      id="job-application"
      aria-labelledby="job-application-heading"
      sx={{
        py: 8,
        position: 'relative',
        background: theme.palette.background.default,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
          opacity: 0.05,
          zIndex: -1,
        }}
        aria-hidden="true"
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          component="h1"
          id="job-application-heading"
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
          Join our team and be part of something extraordinary. Follow the steps below
          to submit your application.
        </Typography>

        <Grid container spacing={3}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: 20,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
                Application Process
              </Typography>
              <List component="nav" sx={{ mb: 2 }}>
                {steps.map((step, index) => (
                  <React.Fragment key={step.label}>
                    <ListItem 
                      button
                      onClick={() => handleStepClick(index)}
                      selected={activeStep === index}
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        backgroundColor: activeStep === index 
                          ? (isDark ? 'rgba(25, 118, 210, 0.2)' : 'rgba(25, 118, 210, 0.1)')
                          : 'transparent',
                        '&:hover': {
                          backgroundColor: isDark 
                            ? 'rgba(25, 118, 210, 0.3)' 
                            : 'rgba(25, 118, 210, 0.2)',
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {step.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={step.label} 
                        secondary={step.description}
                        primaryTypographyProps={{
                          fontWeight: activeStep === index ? 'bold' : 'normal',
                        }}
                      />
                    </ListItem>
                    {index < steps.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>

              <Box sx={{ mt: 4, p: 2, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Need Help?
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  If you have any questions about the application process, please contact our HR team.
                </Typography>
                <Button 
                  size="small" 
                  variant="outlined"
                  sx={{ borderRadius: 4 }}
                >
                  Contact Support
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Main Form Area */}
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 4,
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <Box component="form" onSubmit={handleSubmit}>
                <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 4 }}>
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel>{step.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {activeStep === steps.length ? (
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h5" gutterBottom>
                      Application Submitted Successfully!
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Thank you for applying to join our team. We'll review your application and get back to you soon.
                    </Typography>
                    <Button 
                      variant="contained"
                      onClick={() => navigate('/user/applications')}
                      sx={{ mt: 2 }}
                    >
                      View My Applications
                    </Button>
                  </Box>
                ) : (
                  <>
                    {/* Step 1: Personal Information */}
                    {activeStep === 0 && (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            Personal Information
                          </Typography>
                        </Grid>
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
                            aria-required="true"
                            aria-invalid={!!errors.firstName}
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
                            value={formData.lastName}
                            onChange={handleChange}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                            required
                            aria-required="true"
                            aria-invalid={!!errors.lastName}
                            aria-describedby={errors.lastName ? "lastName-error" : undefined}
                          />
                          {errors.lastName && (
                            <span id="lastName-error" className="sr-only">
                              {errors.lastName}
                            </span>
                          )}
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
                            aria-required="true"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                          />
                          {errors.email && (
                            <span id="email-error" className="sr-only">
                              {errors.email}
                            </span>
                          )}
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
                            aria-required="true"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                          />
                          {errors.phone && (
                            <span id="phone-error" className="sr-only">
                              {errors.phone}
                            </span>
                          )}
                        </Grid>
                      </Grid>
                    )}

                    {/* Step 2: Job Details */}
                    {activeStep === 1 && (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            Job Details
                          </Typography>
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
                            aria-required="true"
                            aria-invalid={!!errors.department}
                            aria-describedby={errors.department ? "department-error" : undefined}
                          >
                            {DEPARTMENTS.map((dept) => (
                              <MenuItem key={dept} value={dept}>
                                {dept}
                              </MenuItem>
                            ))}
                          </TextField>
                          {errors.department && (
                            <span id="department-error" className="sr-only">
                              {errors.department}
                            </span>
                          )}
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
                            aria-required="true"
                            aria-invalid={!!errors.position}
                            aria-describedby={errors.position ? "position-error" : undefined}
                          />
                          {errors.position && (
                            <span id="position-error" className="sr-only">
                              {errors.position}
                            </span>
                          )}
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
                            aria-required="true"
                            aria-invalid={!!errors.experienceLevel}
                            aria-describedby={errors.experienceLevel ? "experienceLevel-error" : undefined}
                          >
                            {EXPERIENCE_LEVELS.map((level) => (
                              <MenuItem key={level} value={level}>
                                {level}
                              </MenuItem>
                            ))}
                          </TextField>
                          {errors.experienceLevel && (
                            <span id="experienceLevel-error" className="sr-only">
                              {errors.experienceLevel}
                            </span>
                          )}
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
                      </Grid>
                    )}

                    {/* Step 3: Application Documents */}
                    {activeStep === 2 && (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            Application Documents
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={6}
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
                      </Grid>
                    )}

                    {/* Step 4: Review & Submit */}
                    {activeStep === 3 && (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            Review & Submit
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            Please review your application details before submitting. You can go back to previous steps to make changes.
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                              Personal Information
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">Name:</Typography>
                                <Typography variant="body1">{formData.firstName} {formData.lastName}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">Email:</Typography>
                                <Typography variant="body1">{formData.email}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">Phone:</Typography>
                                <Typography variant="body1">{formData.phone}</Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                          
                          <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                              Job Details
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">Department:</Typography>
                                <Typography variant="body1">{formData.department}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">Position:</Typography>
                                <Typography variant="body1">{formData.position}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">Experience Level:</Typography>
                                <Typography variant="body1">{formData.experienceLevel}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">Current Company:</Typography>
                                <Typography variant="body1">{formData.currentCompany || 'N/A'}</Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                          
                          <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                              Documents
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary">Resume:</Typography>
                                <Typography variant="body1">{formData.resume ? formData.resume.name : 'Not uploaded'}</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary">Cover Letter Preview:</Typography>
                                <Typography variant="body1" sx={{ mt: 1, p: 2, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 1 }}>
                                  {formData.coverLetter.substring(0, 100)}
                                  {formData.coverLetter.length > 100 ? '...' : ''}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
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
                      </Grid>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                      <Button
                        variant="outlined"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: '1 1 auto' }} />
                      {activeStep === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          sx={{
                            minWidth: 160,
                            borderRadius: 2,
                            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                            },
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
                              Submitting...
                            </>
                          ) : (
                            'Submit Application'
                          )}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{
                            minWidth: 120,
                            borderRadius: 2
                          }}
                        >
                          Next
                        </Button>
                      )}
                    </Box>
                  </>
                )}
              </Box>
            </Paper>
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
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default JobApplicationForm;