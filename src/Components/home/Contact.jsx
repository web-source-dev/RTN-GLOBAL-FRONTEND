import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  WhatsApp,
  LinkedIn,
  Twitter,
  Send,
  AccessTime,
} from '@mui/icons-material';
import API from '../../BackendAPi/ApiProvider';

const services = [
  'Digital Marketing Strategy',
  'Search Engine Optimization (SEO)',
  'Social Media Marketing',
  'Content Marketing',
  'Pay-Per-Click (PPC) Advertising',
  'Email Marketing',
];

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await API.post('/api/forms/contact', formData);
        
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const validateForm = () => {
    // Implement form validation logic here
    return true; // Placeholder return, actual implementation needed
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'background.default',
          pt: 15,
          pb: 15,
          overflow: 'hidden',
        }}
      >
        {/* Background Design Elements */}
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
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 5%)`,
          zIndex: 1,
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

        <Container maxWidth="lg">
          {/* Ready to Grow Section */}
          <Box mb={12} textAlign="center">
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
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
              Ready to Grow Your Business?
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
            >
              Take your digital presence to the next level with our proven strategies and expert team.
              Let's create something amazing together!
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <Card
                sx={{
                  height: '100%',
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
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    Get in Touch
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Company Name"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          select
                          label="Service Interested In"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          variant="outlined"
                        >
                          {services.map((service) => (
                            <MenuItem key={service} value={service}>
                              {service}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          label="Your Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          endIcon={<Send />}
                          sx={{
                            py: 1.5,
                            px: 4,
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
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={5}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Quick Contact Card */}
                <Card
                  sx={{
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, #42A5F5, #BA68C8)'
                        : 'linear-gradient(45deg, #1976d2, #9c27b0)',
                    color: 'white',
                    borderRadius: 4,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Quick Contact
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                          <Phone />
                        </IconButton>
                        <Box>
                          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                            Phone
                          </Typography>
                          <Typography variant="body1">+1 (555) 123-4567</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                          <Email />
                        </IconButton>
                        <Box>
                          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                            Email
                          </Typography>
                          <Typography variant="body1">contact@rtnglobal.com</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                          <LocationOn />
                        </IconButton>
                        <Box>
                          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                            Address
                          </Typography>
                          <Typography variant="body1">
                            123 Digital Avenue, Silicon Valley, CA 94025
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Business Hours Card */}
                <Card
                  sx={{
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(0, 0, 0, 0.2)'
                        : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 4,
                    border: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : 'none',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Business Hours
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                      <AccessTime color="primary" />
                      <Box>
                        <Typography variant="body1">
                          Monday - Friday: 9:00 AM - 6:00 PM
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Saturday - Sunday: Closed
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Social Links Card */}
                <Card
                  sx={{
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(0, 0, 0, 0.2)'
                        : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 4,
                    border: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : 'none',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Connect With Us
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <IconButton
                        sx={{
                          bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(144, 202, 249, 0.2)'
                              : 'primary.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(144, 202, 249, 0.3)'
                                : 'primary.dark',
                          },
                        }}
                      >
                        <WhatsApp />
                      </IconButton>
                      <IconButton
                        sx={{
                          bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(144, 202, 249, 0.2)'
                              : 'primary.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(144, 202, 249, 0.3)'
                                : 'primary.dark',
                          },
                        }}
                      >
                        <LinkedIn />
                      </IconButton>
                      <IconButton
                        sx={{
                          bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(144, 202, 249, 0.2)'
                              : 'primary.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(144, 202, 249, 0.3)'
                                : 'primary.dark',
                          },
                        }}
                      >
                        <Twitter />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Contact;
