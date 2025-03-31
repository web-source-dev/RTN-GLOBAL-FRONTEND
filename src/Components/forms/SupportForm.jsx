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
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../BackendAPi/ApiProvider';
import { useAuth } from '../../contexts/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PRIORITY_LEVELS = [
  'Low',
  'Medium',
  'High',
  'Critical'
];

const ISSUE_CATEGORIES = [
  'Technical Issue',
  'Account Access',
  'Billing Question',
  'Feature Request',
  'Bug Report',
  'Other'
];

const SupportForm = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Add state for tracking the current step
  const [activeStep, setActiveStep] = useState(0);
  // Add loading state for submit button
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueCategory: '',
    priority: '',
    subject: '',
    description: '',
    attachments: null,
    subscribeToUpdates: true
  });

  useEffect(() => {
    // Pre-fill user information if logged in
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.firstName ? `${user.firstName} ${user.lastName || ''}` : prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Step definitions
  const steps = [
    {
      label: 'User Information',
      description: 'Your contact details',
      icon: <PersonIcon />,
      fields: ['name', 'email']
    },
    {
      label: 'Issue Classification',
      description: 'Categorize your issue',
      icon: <CategoryIcon />,
      fields: ['issueCategory', 'priority', 'subject']
    },
    {
      label: 'Issue Details',
      description: 'Describe your problem',
      icon: <DescriptionIcon />,
      fields: ['description', 'attachments', 'subscribeToUpdates']
    },
    {
      label: 'Review & Submit',
      description: 'Final review',
      icon: <CheckCircleIcon />,
      fields: []
    }
  ];

  const handleNext = () => {
    // Validate current step fields before proceeding
    const currentStepFields = steps[activeStep].fields;
    const stepErrors = {};
    
    currentStepFields.forEach(field => {
      if (field === 'name' && !formData.name.trim()) 
        stepErrors.name = 'Name is required';
      if (field === 'email') {
        if (!formData.email.trim()) {
          stepErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
          stepErrors.email = 'Invalid email address';
        }
      }
      if (field === 'issueCategory' && !formData.issueCategory)
        stepErrors.issueCategory = 'Please select an issue category';
      if (field === 'priority' && !formData.priority)
        stepErrors.priority = 'Please select a priority level';
      if (field === 'subject' && !formData.subject.trim())
        stepErrors.subject = 'Subject is required';
      if (field === 'description' && !formData.description.trim())
        stepErrors.description = 'Description is required';
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
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.issueCategory) newErrors.issueCategory = 'Please select an issue category';
    if (!formData.priority) newErrors.priority = 'Please select a priority level';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          if (key === 'attachments' && formData[key]) {
            formDataToSend.append('attachments', formData[key]);
          } else {
            formDataToSend.append(key, formData[key]);
          }
        });

        const response = await API.post('/api/forms/support', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setActiveStep(steps.length);
        
        setSnackbar({
          open: true,
          message: `Support ticket #${response.data.ticketNumber} created successfully! We'll respond as soon as possible.`,
          severity: 'success'
        });
   
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || 'Failed to create support ticket. Please try again.',
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

  return (
    <Box
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
          background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
          opacity: 0.05,
          zIndex: -1,
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
          Technical Support
        </Typography>
        <Typography
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
        >
          Need technical assistance? Submit a support ticket and our team will help you
          resolve your issue as quickly as possible.
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
                Support Process
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
                  Additional Help
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  For urgent matters, please contact our support team directly.
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
                      Support Ticket Submitted Successfully!
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Thank you for contacting us. Our support team will review your issue and get back to you soon.
                    </Typography>
                    <Button 
                      variant="contained"
                      onClick={() => window.location.href = `${process.env.REACT_APP_USER_DASHBOARD_URL}/dashboard/user/support`}
                      sx={{ mt: 2 }}
                    >
                      View My Support Tickets
                    </Button>
                  </Box>
                ) : (
                  <>
                    {/* Step 1: User Information */}
                    {activeStep === 0 && (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            User Information
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            required
                            disabled={!!user}
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
                            disabled={!!user}
                          />
                        </Grid>
                      </Grid>
                    )}

                    {/* Step 2: Issue Classification */}
                    {activeStep === 1 && (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            Issue Classification
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            select
                            label="Issue Category"
                            name="issueCategory"
                            value={formData.issueCategory}
                            onChange={handleChange}
                            error={!!errors.issueCategory}
                            helperText={errors.issueCategory}
                            required
                          >
                            {ISSUE_CATEGORIES.map((category) => (
                              <MenuItem key={category} value={category}>
                                {category}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            select
                            label="Priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            error={!!errors.priority}
                            helperText={errors.priority}
                            required
                          >
                            {PRIORITY_LEVELS.map((level) => (
                              <MenuItem key={level} value={level}>
                                {level}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            error={!!errors.subject}
                            helperText={errors.subject}
                            required
                          />
                        </Grid>
                      </Grid>
                    )}

                    {/* Step 3: Issue Details */}
                    {activeStep === 2 && (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            Issue Details
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={6}
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            error={!!errors.description}
                            helperText={errors.description}
                            required
                            placeholder="Please provide as much detail as possible about your issue..."
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            component="label"
                            variant="outlined"
                            fullWidth
                            sx={{ height: 56 }}
                          >
                            Upload Attachments (Optional)
                            <input
                              type="file"
                              hidden
                              name="attachments"
                              onChange={handleChange}
                              accept="image/*,.pdf,.doc,.docx"
                            />
                          </Button>
                          {formData.attachments && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              Selected file: {formData.attachments.name}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formData.subscribeToUpdates}
                                onChange={handleChange}
                                name="subscribeToUpdates"
                                color="primary"
                              />
                            }
                            label="Email me updates about my support ticket"
                          />
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
                            Please review your support ticket details before submitting. You can go back to previous steps to make changes.
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                              User Information
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">Name:</Typography>
                                <Typography variant="body1">{formData.name}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">Email:</Typography>
                                <Typography variant="body1">{formData.email}</Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                          
                          <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                              Issue Classification
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">Category:</Typography>
                                <Typography variant="body1">{formData.issueCategory}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="body2" color="text.secondary">Priority:</Typography>
                                <Typography variant="body1">{formData.priority}</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary">Subject:</Typography>
                                <Typography variant="body1">{formData.subject}</Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                          
                          <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                              Issue Details
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary">Description:</Typography>
                                <Typography variant="body1" sx={{ mt: 1, p: 2, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 1 }}>
                                  {formData.description.substring(0, 150)}
                                  {formData.description.length > 150 ? '...' : ''}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary">Attachments:</Typography>
                                <Typography variant="body1">
                                  {formData.attachments ? formData.attachments.name : 'No attachments'}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                          
                          <Paper variant="outlined" sx={{ p: 3 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                              Settings
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Typography variant="body2">
                                  {formData.subscribeToUpdates 
                                    ? '✓ You will receive email updates about this ticket' 
                                    : '✗ You will not receive email updates about this ticket'}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
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
                            'Submit Ticket'
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

export default SupportForm;