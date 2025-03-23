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
import { useNavigate } from 'react-router-dom';
import API from '../../BackendAPi/ApiProvider';

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

  const navigate = useNavigate()
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

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

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

        setSnackbar({
          open: true,
          message: `Support ticket #${response.data.ticketId} created successfully! We'll respond as soon as possible.`,
          severity: 'success'
        });

        setTimeout(() => {
          navigate(`/support/ticket/${response.data.ticketId}`);
        }, 2000);
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || 'Failed to create support ticket. Please try again.',
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
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
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
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    height: 56,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                    },
                    flex: 1,
                    mr: 2
                  }}
                >
                  Submit Support Ticket
                </Button>
               
              </Box>
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

export default SupportForm;