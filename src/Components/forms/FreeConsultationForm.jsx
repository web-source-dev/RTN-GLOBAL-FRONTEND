import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Alert,
  Paper,
  Grid,
  CircularProgress,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
  Container,
  FormHelperText,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';
import GroupIcon from '@mui/icons-material/Group';
import Contact from '../home/Contact';
import { CheckCircleOutline, Assessment, TipsAndUpdates, SettingsSuggest, Schedule } from "@mui/icons-material";
import API from '../../BackendAPi/ApiProvider';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ConsultationProcess = [
  {
    title: "Initial Discussion",
    description: "We start with understanding your needs and challenges through a detailed discussion.",
    icon: (
      <Box
        sx={{
          mb: 2,
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          borderRadius: "50%",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <TipsAndUpdates sx={{ fontSize: 35, color: "white" }} />
      </Box>
    ),
  },
  {
    title: "Analysis & Planning",
    description: "We analyze your situation and develop a tailored approach for your business.",
    icon: (
      <Box
        sx={{
          mb: 2,
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Assessment sx={{ fontSize: 35, color: "white" }} />
      </Box>
    ),
  },
  {
    title: "Recommendations",
    description: "We provide actionable recommendations and a clear path forward.",
    icon: (
      <Box
        sx={{
          mb: 2,
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          borderRadius: "50%",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CheckCircleOutline sx={{ fontSize: 35, color: "white" }} />
      </Box>
    ),
  },
  {
    title: "Implementation Support",
    description: "Get guidance on implementing the recommended solutions effectively.",
    icon: (
      <Box
        sx={{
          mb: 2,
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <SettingsSuggest sx={{ fontSize: 35, color: "white" }} />
      </Box>
    ),
  },
];

const consultationTypes = [
  'Business Strategy',
  'Technical Consultation',
  'Project Planning',
  'Security Assessment',
  'Other'
];

const durationOptions = [
  { value: 10, label: '10 Minutes', price: 10 },
  { value: 30, label: '30 Minutes', price: 25 },
  { value: 45, label: '45 Minutes', price: 35 },
  { value: 60, label: '1 Hour', price: 45 },
  { value: 90, label: '1 Hour 30 Minutes', price: 65 }
];

const steps = ['Personal Information', 'Company Details', 'Consultation Options', 'Review & Schedule'];

const FreeConsultationForm = () => {
  const [availableTimeSlots, setAvailableTimeSlots] = useState([
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM'
  ]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [activeStep, setActiveStep] = useState(0);
  const [isFirstConsultation, setIsFirstConsultation] = useState(true);
  const [dateChecked, setDateChecked] = useState(false); // Track if we've checked free status for this session
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [submitCountdown, setSubmitCountdown] = useState(5);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number')
      .required('Phone number is required'),
    companyName: Yup.string(),
    consultationType: Yup.string().required('Consultation type is required'),
    duration: Yup.number().required('Duration is required'),
    preferredDate: Yup.date().required('Date is required').min(new Date(), 'Date cannot be in the past'),
    preferredTime: Yup.string().required('Time slot is required'),
    message: Yup.string().max(500, 'Message cannot exceed 500 characters')
  });

  const getStepFields = (step) => {
    switch (step) {
      case 0: // Personal Information
        return ['firstName', 'lastName', 'email', 'phone'];
      case 1: // Company Details
        return ['companyName'];
      case 2: // Consultation Options
        return ['consultationType', 'duration', 'preferredDate', 'preferredTime'];
      case 3: // Review & Schedule
        return []; // No fields to validate on final review step
      default:
        return [];
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      companyName: user?.company || '',
      consultationType: '',
      duration: 30,
      preferredDate: '',
      preferredTime: '',
      message: ''
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmitConsultation(values);
    }
  });

  useEffect(() => {
    // Pre-fill form with user data if available
    if (user) {
      formik.setValues({
        ...formik.values,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        companyName: user.company || ''
      });
    }
  }, [user]);

  // Only fetch first consultation status once at component mount if authenticated
  useEffect(() => {
    if (isAuthenticated && !dateChecked) {
      checkFirstConsultationStatus();
    }
  }, [isAuthenticated]);

  const checkFirstConsultationStatus = async () => {
    try {
      const response = await API.get(`/api/forms/free-consultation/available-slots?date=${new Date().toISOString().split('T')[0]}`);
      setIsFirstConsultation(response.data.isFirstConsultation);
      setDateChecked(true);
    } catch (error) {
      console.error("Error checking first consultation status:", error);
    }
  };

  const fetchAvailableSlots = async (date) => {
    try {
      const response = await API.get(`/api/forms/free-consultation/available-slots?date=${date}`);
      setAvailableTimeSlots(response.data.availableSlots);
      // Don't update isFirstConsultation here - we only do it on initial load
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to fetch available time slots.'
      });
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    formik.setFieldValue('preferredDate', date);
    formik.setFieldValue('preferredTime', ''); // Reset time when date changes
    setSelectedDate(date);
    
    if (date) {
      fetchAvailableSlots(date);
    }
  };

  const handleTimeSelect = (time) => {
    formik.setFieldValue('preferredTime', time);
  };

  useEffect(() => {
    let timer;
    if (activeStep === steps.length - 1) {
      // Reset the button state when entering the final step
      setSubmitEnabled(false);
      setSubmitCountdown(5);
      
      // Start the countdown timer
      timer = setInterval(() => {
        setSubmitCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setSubmitEnabled(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeStep]);

  const handleNext = () => {
    // Validate current step fields before proceeding
    const currentStepFields = getStepFields(activeStep);
    const hasErrors = currentStepFields.some(field => 
      formik.touched[field] && formik.errors[field]
    );
    
    // Touch all fields in the current step to show validation errors
    currentStepFields.forEach(field => {
      if (!formik.touched[field]) {
        formik.setFieldTouched(field, true, true);
      }
    });
    
    // Check if there are any validation errors in the current step fields
    const stepIsValid = currentStepFields.every(field => 
      !formik.errors[field] || !formik.touched[field]
    );
    
    if (stepIsValid) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    } else {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill all required fields correctly before proceeding.'
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateStep = (step) => {
    let fieldsToValidate = [];
    
    switch (step) {
      case 0: // Personal Information
        fieldsToValidate = ['firstName', 'lastName', 'email', 'phone'];
        break;
      case 1: // Company Details
        fieldsToValidate = ['companyName'];
        break;
      case 2: // Consultation Options
        fieldsToValidate = ['consultationType', 'duration', 'preferredDate', 'preferredTime'];
        break;
      default:
        return true;
    }

    // Touch all fields in current step to show errors
    fieldsToValidate.forEach(field => formik.setFieldTouched(field, true));
    
    // Check if any fields in current step have errors
    const stepHasErrors = fieldsToValidate.some(field => formik.errors[field]);
    
    return !stepHasErrors;
  };

  const handleSubmitConsultation = async (values) => {
    if (!isAuthenticated) {
      setSubmitStatus({
        type: 'error',
        message: 'You must be logged in to book a consultation.'
      });
      return;
    }
    
    setLoading(true);
    console.log("Submitting consultation form...");
    
    try {
      const formData = {
        ...values,
        duration: Number(values.duration),
        preferredDate: new Date(values.preferredDate).toISOString()
      };
      
      console.log("Sending form data:", formData);
      
      const response = await API.post('/api/forms/free-consultation', formData);
      
      const responseMessage = response.data.isFirstConsultation
        ? 'Your free consultation has been booked successfully! We look forward to speaking with you.'
        : `Your paid consultation (${values.duration} mins) has been booked successfully! We will contact you shortly regarding payment details.`;
      
      setSubmitStatus({
        type: 'success',
        message: responseMessage
      });
      formik.resetForm();
      setActiveStep(0); // Reset to first step after successful submission
    } catch (error) {
      console.error("Booking error:", error);
      let errorMessage = error.response?.data?.message || 'An error occurred while booking the consultation.';
      
      // Provide a clearer message for time slot conflicts
      if (errorMessage.includes("time slot is already booked")) {
        errorMessage = "This time slot has been confirmed for another consultation. Please select a different time.";
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const renderLoginMessage = () => {
    if (!isAuthenticated) {
      return (
        <Alert 
          severity="warning" 
          sx={{ mb: 3 }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={() => navigate('/login?redirect=/free-consultation')}
            >
              Login Now
            </Button>
          }
        >
          You must be logged in to book a consultation. Your first consultation is free!
        </Alert>
      );
    }
    return null;
  };

  const renderPersonalInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          disabled={!!user?.firstName}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          disabled={!!user?.lastName}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email Address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          disabled={!!user?.email}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone Number"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          required
        />
      </Grid>
    </Grid>
  );

  const renderCompanyDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="companyName"
          name="companyName"
          label="Company Name"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.companyName && Boolean(formik.errors.companyName)}
          helperText={formik.touched.companyName && formik.errors.companyName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="message"
          name="message"
          label="Additional Information"
          multiline
          rows={4}
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
          placeholder="Please share any specific details or questions you would like to discuss during the consultation."
        />
      </Grid>
    </Grid>
  );

  const renderConsultationOptions = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl fullWidth error={formik.touched.consultationType && Boolean(formik.errors.consultationType)}>
          <InputLabel id="consultation-type-label">Consultation Type</InputLabel>
          <Select
            labelId="consultation-type-label"
            id="consultationType"
            name="consultationType"
            value={formik.values.consultationType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Consultation Type"
          >
            {consultationTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
          {formik.touched.consultationType && formik.errors.consultationType && (
            <FormHelperText>{formik.errors.consultationType}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth error={formik.touched.duration && Boolean(formik.errors.duration)}>
          <InputLabel id="duration-label">Session Duration</InputLabel>
          <Select
            labelId="duration-label"
            id="duration"
            name="duration"
            value={formik.values.duration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Session Duration"
          >
            {durationOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label} {!isFirstConsultation && `- $${option.price}`}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.duration && formik.errors.duration && (
            <FormHelperText>{formik.errors.duration}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Preferred Date
        </Typography>
        <TextField
          fullWidth
          id="preferredDate"
          name="preferredDate"
          type="date"
          value={formik.values.preferredDate}
          onChange={handleDateChange}
          onBlur={formik.handleBlur}
          error={formik.touched.preferredDate && Boolean(formik.errors.preferredDate)}
          helperText={formik.touched.preferredDate && formik.errors.preferredDate}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: new Date().toISOString().split('T')[0]
          }}
          required
        />
      </Grid>
      
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Preferred Time Slot
        </Typography>
        {formik.values.preferredDate ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {availableTimeSlots.length > 0 ? (
              availableTimeSlots.map((time) => (
                <Chip
                  key={time}
                  label={time}
                  onClick={() => handleTimeSelect(time)}
                  color={formik.values.preferredTime === time ? 'primary' : 'default'}
                  variant={formik.values.preferredTime === time ? 'filled' : 'outlined'}
                  icon={<Schedule />}
                  sx={{ 
                    p: 1, 
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                    }
                  }}
                />
              ))
            ) : (
              <Alert severity="info">No available time slots for this date. Please select another date.</Alert>
            )}
          </Box>
        ) : (
          <Alert severity="info">Please select a date first to see available time slots.</Alert>
        )}
        {formik.touched.preferredTime && formik.errors.preferredTime && (
          <FormHelperText error>{formik.errors.preferredTime}</FormHelperText>
        )}
      </Grid>
    </Grid>
  );

  const renderReviewDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Review Your Information</Typography>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Name:</Typography>
              <Typography variant="body1" gutterBottom>
                {formik.values.firstName} {formik.values.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Email:</Typography>
              <Typography variant="body1" gutterBottom>{formik.values.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Phone:</Typography>
              <Typography variant="body1" gutterBottom>{formik.values.phone}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Company:</Typography>
              <Typography variant="body1" gutterBottom>{formik.values.companyName || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Consultation Type:</Typography>
              <Typography variant="body1" gutterBottom>{formik.values.consultationType}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Duration:</Typography>
              <Typography variant="body1" gutterBottom>
                {durationOptions.find(option => option.value === Number(formik.values.duration))?.label || formik.values.duration + ' Minutes'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Date:</Typography>
              <Typography variant="body1" gutterBottom>
                {formik.values.preferredDate ? new Date(formik.values.preferredDate).toLocaleDateString() : 'Not selected'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Time:</Typography>
              <Typography variant="body1" gutterBottom>{formik.values.preferredTime || 'Not selected'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Additional Information:</Typography>
              <Typography variant="body1" gutterBottom>
                {formik.values.message || 'None provided'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        
        <Paper elevation={2} sx={{ p: 3, mt: 3, bgcolor: isFirstConsultation ? 'success.light' : 'info.light' }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {isFirstConsultation ? 'Free Consultation' : 'Paid Consultation'}
          </Typography>
          <Typography variant="body2">
            {isFirstConsultation 
              ? 'This will be your first free consultation with us.' 
              : `This consultation will be charged at $${durationOptions.find(opt => opt.value === Number(formik.values.duration))?.price || 0}.`}
          </Typography>
          {!isFirstConsultation && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Payment will be handled manually. Our team will contact you to arrange payment after booking.
            </Typography>
          )}
        </Paper>

        {!submitEnabled && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Submit button will be enabled in {submitCountdown} seconds...
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(5 - submitCountdown) * 20} 
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderCompanyDetails();
      case 2:
        return renderConsultationOptions();
      case 3:
        return renderReviewDetails();
      default:
        return null;
    }
  };
  
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Schedule Your {isFirstConsultation ? 'Free' : 'Paid'} Consultation
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {isFirstConsultation 
                ? "Book your complimentary consultation session with our experts today. Let's discuss how we can help you achieve your goals."
                : "Book your follow-up consultation session. Choose the duration that works best for your needs."}
            </Typography>
            
            {renderLoginMessage()}
            
            <Card elevation={3} sx={{ mb: 4 }}>
              <CardContent>
                <Stepper activeStep={activeStep} orientation={isMobile ? 'vertical' : 'horizontal'} sx={{ mb: 4 }}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <form onSubmit={formik.handleSubmit}>
                  {renderStepContent(activeStep)}
                  {submitStatus.message && (
                    <Alert severity={submitStatus.type} sx={{ mt: 2 }}>
                      {submitStatus.message}
                    </Alert>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button
                      onClick={handleBack}
                      disabled={activeStep === 0}
                      variant="outlined"
                    >
                      Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !isAuthenticated || !submitEnabled}
                        sx={{
                          background: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'linear-gradient(45deg, #90CAF9, #CE93D8)'
                              : 'linear-gradient(45deg, #1976d2, #9c27b0)',
                          '&:hover': {
                            background: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'linear-gradient(45deg, #42A5F5, #BA68C8)'
                                : 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                          },
                        }}
                      >
                        {loading ? <CircularProgress size={24} /> : 'Book Consultation'}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{
                          background: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'linear-gradient(45deg, #90CAF9, #CE93D8)'
                              : 'linear-gradient(45deg, #1976d2, #9c27b0)',
                          '&:hover': {
                            background: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'linear-gradient(45deg, #42A5F5, #BA68C8)'
                                : 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                          },
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </form>
              </CardContent>
            </Card>

            {/* Pricing information display */}
            {!isFirstConsultation && (
            <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">
                Consultation Pricing
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Duration</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Best For</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>10 Minutes</TableCell>
                    <TableCell>$10</TableCell>
                    <TableCell>Quick questions and follow-ups</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>30 Minutes</TableCell>
                    <TableCell>$25</TableCell>
                    <TableCell>Brief consultations and assessments</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>45 Minutes</TableCell>
                    <TableCell>$35</TableCell>
                    <TableCell>Standard consultations</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>1 Hour</TableCell>
                    <TableCell>$45</TableCell>
                    <TableCell>In-depth strategy sessions</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>1 Hour 30 Minutes</TableCell>
                    <TableCell>$65</TableCell>
                    <TableCell>Comprehensive business planning</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Alert severity="info" sx={{ mt: 3 }}>
                Payment is handled manually. After booking, our team will contact you to arrange payment.
              </Alert>
            </Paper>
            )}
            
            {/* Additional Sections */}
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {/* Our Process Section */}
              <Grid item xs={12}>
                <Typography variant="h4" mb={5} align="center" color="primary" gutterBottom>
                  Our Consultation Process
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                  {ConsultationProcess.map((step, index) => (
                    <Grid item xs={12} sm={6} md={6} key={index}>
                      <Paper
                        elevation={4}
                        sx={{
                          p: 4,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          borderRadius: 3,
                          background: "rgba(255, 255, 255, 0.1)", // Glassmorphism effect
                          backdropFilter: "blur(10px)", // Soft blur effect
                          border: "1px solid",
                          borderImageSource: "linear-gradient(135deg, #6a11cb, #2575fc)", // Gradient border
                          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)", // Soft shadow
                          transition: "0.4s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-5px) scale(1.05)", // Smooth scaling on hover
                            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)", // Glow effect
                            borderImageSource: "linear-gradient(135deg, #ff7eb3, #ff758c)", // Change border color on hover
                          }
                        }}
                      >
                        <Box
                          sx={{
                            mb: 2,
                            width: 120,
                            height: 60,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            borderRadius: "50%",
                            color: "#fff",
                          }}
                        >
                          {step.icon}
                        </Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {step.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Service Guarantees Section */}
              <Grid item xs={12} sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4, background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(45deg, #90CAF9, #CE93D8)'
                          : 'linear-gradient(45deg, #1976d2, #9c27b0)',
                }}>
                  <Typography variant="h4" mb={5} align="center" color="primary.contrastText" gutterBottom>
                    Our Service Guarantees
                  </Typography>
                  <Grid container spacing={3} justifyContent="center">
                    {[
                      {
                        title: "100% Confidentiality",
                        description: "Your business information is always protected with strict confidentiality agreements."
                      },
                      {
                        title: "Expert Consultants",
                        description: "Work with industry-leading experts with proven track records."
                      },
                      {
                        title: "Tailored Solutions",
                        description: "Get customized recommendations specific to your business needs."
                      }
                    ].map((guarantee, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <Box sx={{ backgroundColor: 'white', p: 3, borderRadius: 1, height: '100%' }}>
                          <Typography variant="h6" gutterBottom color="primary">
                            {guarantee.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {guarantee.description}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Sidebar remains unchanged */}
        </Grid>
      </Container>
      <Contact />
    </Box>
  );
};

export default FreeConsultationForm;