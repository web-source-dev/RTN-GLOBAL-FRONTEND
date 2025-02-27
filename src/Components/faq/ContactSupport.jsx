import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
  useTheme,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';

const ContactSupport = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbar({
      open: true,
      message: 'Your message has been sent. We\'ll get back to you shortly.',
      severity: 'success'
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      py={8}
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: isDark ? 0.1 : 0.05,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 40%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 40%)`,
          zIndex: 1
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
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
          Contact Support
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Can't find what you're looking for? Our support team is here to help
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                background: isDark
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(20px)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <IconButton
                  sx={{
                    mb: 2,
                    bgcolor: theme.palette.primary.main + '15',
                    color: theme.palette.primary.main,
                    '&:hover': { bgcolor: theme.palette.primary.main + '25' }
                  }}
                  size="large"
                >
                  <EmailIcon fontSize="large" />
                </IconButton>
                <Typography variant="h6" gutterBottom>
                  Email Support
                </Typography>
                <Typography color="text.secondary">
                  support@rtnglobal.com
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  24/7 Response Time
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                background: isDark
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(20px)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <IconButton
                  sx={{
                    mb: 2,
                    bgcolor: theme.palette.secondary.main + '15',
                    color: theme.palette.secondary.main,
                    '&:hover': { bgcolor: theme.palette.secondary.main + '25' }
                  }}
                  size="large"
                >
                  <PhoneIcon fontSize="large" />
                </IconButton>
                <Typography variant="h6" gutterBottom>
                  Phone Support
                </Typography>
                <Typography color="text.secondary">
                  +1 (555) 123-4567
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Mon-Fri, 9AM-6PM EST
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                background: isDark
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(20px)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <IconButton
                  sx={{
                    mb: 2,
                    bgcolor: '#4caf50' + '15',
                    color: '#4caf50',
                    '&:hover': { bgcolor: '#4caf50' + '25' }
                  }}
                  size="large"
                >
                  <ChatIcon fontSize="large" />
                </IconButton>
                <Typography variant="h6" gutterBottom>
                  Live Chat
                </Typography>
                <Typography color="text.secondary">
                  Chat with our team
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Average Response: 5 mins
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card
              sx={{
                background: isDark
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: 2
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Send us a message
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
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Message"
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
                        endIcon={<SendIcon />}
                        sx={{
                          py: 1.5,
                          px: 4,
                          background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1565c0, #7b1fa2)'
                          }
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
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
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

export default ContactSupport;