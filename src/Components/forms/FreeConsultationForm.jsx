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
  Container
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';
import GroupIcon from '@mui/icons-material/Group';
import Contact from '../home/Contact';
import { CheckCircleOutline, Assessment, TipsAndUpdates, SettingsSuggest } from "@mui/icons-material";
import API from '../../BackendAPi/ApiProvider';

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

const benefits = [
  {
    icon: <BusinessIcon color="primary" fontSize="large" />,
    title: 'Expert Business Insights',
    description: 'Get valuable insights from our experienced consultants to drive your business forward.'
  },
  {
    icon: <SecurityIcon color="primary" fontSize="large" />,
    title: 'Security First Approach',
    description: 'Ensure your business is protected with our comprehensive security assessment.'
  },
  {
    icon: <GroupIcon color="primary" fontSize="large" />,
    title: 'Dedicated Support',
    description: 'Work with a dedicated team committed to your success.'
  }
];

const testimonials = [
  {
    name: 'John Smith',
    company: 'Tech Solutions Inc.',
    content: 'The consultation was incredibly valuable for our business strategy. Highly recommended!'
  },
  {
    name: 'Sarah Johnson',
    company: 'Digital Innovations',
    content: 'Expert advice that helped us transform our security infrastructure.'
  }
];

const faqs = [
  {
    question: 'How long is the consultation session?',
    answer: 'Each consultation session typically lasts 45-60 minutes.'
  },
  {
    question: 'What should I prepare for the consultation?',
    answer: 'Have a clear idea of your goals and any specific challenges you\'d like to discuss.'
  },
  {
    question: 'Is the consultation really free?',
    answer: 'Yes, the initial consultation is completely free with no obligations.'
  }
];

const steps = ['Personal Information', 'Company Details', 'Schedule Consultation'];

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number')
      .required('Phone number is required'),
    companyName: Yup.string(),
    consultationType: Yup.string().required('Consultation type is required'),
    preferredDate: Yup.date().required('Date is required').min(new Date(), 'Date cannot be in the past'),
    preferredTime: Yup.string().required('Time slot is required'),
    message: Yup.string().max(500, 'Message cannot exceed 500 characters')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyName: '',
      consultationType: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await API.post('/api/forms/free-consultation', {
          ...values,
          preferredDate: new Date(values.preferredDate).toISOString()
        });
        setSubmitStatus({
          type: 'success',
          message: 'Consultation booked successfully! We will contact you shortly.'
        });
        formik.resetForm();
      } catch (error) {
        setSubmitStatus({
          type: 'error',
          message: error.response?.data?.message || 'An error occurred while booking the consultation.'
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const fetchAvailableTimeSlots = async (date) => {
    if (!date) return;
    try {
      const response = await API.get('/api/forms/free-consultation/available-slots', {
        params: { date: new Date(date).toISOString() }
      });
      setAvailableTimeSlots(response.data.availableSlots);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      setAvailableTimeSlots([]);
    }
  };

  useEffect(() => {
    if (formik.values.preferredDate) {
      fetchAvailableTimeSlots(formik.values.preferredDate);
    }
  }, [formik.values.preferredDate]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
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
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="companyName"
                name="companyName"
                label="Company Name (Optional)"
                value={formik.values.companyName}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Consultation Type</InputLabel>
                <Select
                  id="consultationType"
                  name="consultationType"
                  value={formik.values.consultationType}
                  onChange={formik.handleChange}
                  error={formik.touched.consultationType && Boolean(formik.errors.consultationType)}
                >
                  {consultationTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="message"
                name="message"
                label="Additional Message (Optional)"
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="preferredDate"
                name="preferredDate"
                label="Preferred Date"
                type="date"
                value={formik.values.preferredDate}
                onChange={(e) => {
                  formik.handleChange(e);
                  setSelectedDate(e.target.value);
                }}
                error={formik.touched.preferredDate && Boolean(formik.errors.preferredDate)}
                helperText={formik.touched.preferredDate && formik.errors.preferredDate}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: new Date().toISOString().split('T')[0]
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {availableTimeSlots.map((time) => (
                  <Chip
                    key={time}
                    label={time}
                    onClick={() => selectedDate && formik.setFieldValue('preferredTime', time)}
                    color={formik.values.preferredTime === time ? 'primary' : 'default'}
                    variant={formik.values.preferredTime === time ? 'filled' : 'outlined'}
                    icon={<AccessTimeIcon />}
                    disabled={!selectedDate}
                    sx={{
                      opacity: !selectedDate ? 0.6 : 1,
                      '&:hover': {
                        backgroundColor: selectedDate ? theme.palette.primary.light : 'inherit',
                        color: selectedDate ? theme.palette.primary.contrastText : 'inherit',
                      },
                    }}
                  />
                ))}
              </Box>
              {formik.touched.preferredTime && formik.errors.preferredTime && (
                <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                  {formik.errors.preferredTime}
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
    <Box sx={{
      position: 'relative',
      backgroundColor: 'background.default',
      pt: 15,
      overflow: 'hidden',
    }}>
      {/* Background Design Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at 20% 150%, primary.light 0%, transparent 50%)'
              : 'radial-gradient(circle at 20% 150%, primary.main 0%, transparent 50%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '60%',
          height: '60%',
          right: '-20%',
          top: '-20%',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle, rgba(144, 202, 249, 0.08) 0%, transparent 60%)'
              : 'radial-gradient(circle, rgba(25, 118, 210, 0.1) 0%, transparent 60%)',
          borderRadius: '50%',
        }}
      />

      <Container maxWidth="lg" sx={{marginBottom:'15px'}}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                textAlign: 'center',
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #90CAF9, #CE93D8)'
                    : 'linear-gradient(45deg, #1976d2, #9c27b0)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Book a Free Consultation
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ maxWidth: '800px', mx: 'auto', mb: 6, textAlign: 'center' }}
            >
              Schedule a free consultation with our experts to discuss your needs and how we can help you achieve your goals.
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card
              sx={{
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(0, 0, 0, 0.2)'
                    : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                    : '0 8px 32px rgba(0, 0, 0, 0.1)',
                borderRadius: 4,
                border: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : 'none',
              }}
            >
              <CardContent sx={{ p: 4 }}>
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
                        disabled={loading}
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

            {submitStatus.message && (
              <Alert severity={submitStatus.type} sx={{ mt: 2 }}>
                {submitStatus.message}
              </Alert>
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
        
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'sticky', top: 24 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Why Choose Our Consultation?
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {benefits.map((benefit, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    {benefit.icon}
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        {benefit.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Client Testimonials
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {testimonials.map((testimonial, index) => (
                  <Card key={index} variant="outlined">
                    <CardContent>
                      <Typography variant="body1" paragraph>
                        "{testimonial.content}"
                      </Typography>
                      <Typography variant="subtitle2" color="primary">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.company}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Frequently Asked Questions
              </Typography>
              {faqs.map((faq, index) => (
                <Accordion key={index} disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`faq-${index}-content`}
                    id={`faq-${index}-header`}
                  >
                    <Typography variant="subtitle1">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          </Box>
        </Grid>




        </Grid>
      </Container>
      <Contact />
    </Box>
  );
};

export default FreeConsultationForm;