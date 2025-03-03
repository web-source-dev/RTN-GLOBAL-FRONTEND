import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  TextField,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  ColorPicker
} from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, YouTube, CloudUpload } from '@mui/icons-material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [modifiedSettings, setModifiedSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/settings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSettings(response.data);
      setModifiedSettings(response.data);
    } catch (err) {
      setError('Error fetching settings');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (section, updates) => {
    setModifiedSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }));
  };

  const handleImageUpload = async (section, field, file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should not exceed 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    setError('');
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/settings/upload/${field}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data && response.data.path) {
        handleFieldChange(section, { [field]: response.data.path });      
        setSuccess('Image uploaded successfully');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/admin/settings`,
        modifiedSettings,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSettings(response.data);
      setModifiedSettings(response.data);
      setSuccess('All settings updated successfully');
    } catch (err) {
      setError('Error updating settings');
    }
  };

  const handleReset = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/settings/reset`);
      setSettings(response.data);
      setSuccess('Settings reset to default');
    } catch (err) {
      setError('Error resetting settings');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Site Settings
      </Typography>

      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              General Settings
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Site Name"
                value={modifiedSettings?.general?.siteName || ''}
                onChange={(e) => handleFieldChange('general', { siteName: e.target.value })}
                fullWidth
              />
              <TextField
                label="Description"
                value={modifiedSettings?.general?.description || ''}
                onChange={(e) => handleFieldChange('general', { description: e.target.value })}
                multiline
                rows={3}
                fullWidth
              />
              <TextField
                label="Keywords"
                value={modifiedSettings?.general?.keywords || ''}
                onChange={(e) => handleFieldChange('general', { keywords: e.target.value })}
                fullWidth
                helperText="Separate keywords with commas"
              />
              <TextField
                label="Address"
                value={modifiedSettings?.general?.address || ''}
                onChange={(e) => handleFieldChange('general', { address: e.target.value })}
                fullWidth
              />
              <TextField
                label="Phone"
                value={modifiedSettings?.general?.phone || ''}
                onChange={(e) => handleFieldChange('general', { phone: e.target.value })}
                fullWidth
              />
              <TextField
                label="Working Hours"
                value={modifiedSettings?.general?.workingHours || ''}
                onChange={(e) => handleFieldChange('general', { workingHours: e.target.value })}
                fullWidth
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUpload />}
                  disabled={uploading}
                >
                  Upload Logo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload('general', 'logo', e.target.files[0])}
                  />
                </Button>
                {modifiedSettings?.general?.logo && (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${modifiedSettings.general.logo}`}
                    alt="Site Logo"
                    style={{ height: 40, objectFit: 'contain' }}
                  />
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUpload />}
                  disabled={uploading}
                >
                  Upload Favicon
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload('general', 'favicon', e.target.files[0])}
                  />
                </Button>
                {modifiedSettings?.general?.favicon && (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${modifiedSettings.general.favicon}`}
                    alt="Favicon"
                    style={{ height: 32, objectFit: 'contain' }}
                  />
                )}
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={modifiedSettings?.general?.maintenanceMode || false}
                    onChange={(e) => handleFieldChange('general', { maintenanceMode: e.target.checked })}
                  />
                }
                label="Maintenance Mode"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Email Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Email Settings
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Sender Name"
                value={modifiedSettings?.emailSettings?.senderName || ''}
                onChange={(e) => handleFieldChange('emailSettings', { senderName: e.target.value })}
                fullWidth
              />
              <TextField
                label="Sender Email"
                value={modifiedSettings?.emailSettings?.senderEmail || ''}
                onChange={(e) => handleFieldChange('emailSettings', { senderEmail: e.target.value })}
                fullWidth
                type="email"
              />
              <TextField
                label="Email Password"
                type={showPassword ? 'text' : 'password'}
                value={modifiedSettings?.emailSettings?.EmmailPass || ''}
                onChange={(e) => handleFieldChange('emailSettings', { EmmailPass: e.target.value })}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Social Media Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Social Media Links
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Facebook"
                value={modifiedSettings?.socialMedia?.facebook || ''}
                onChange={(e) => handleFieldChange('socialMedia', { facebook: e.target.value })}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Facebook />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Twitter"
                value={modifiedSettings?.socialMedia?.twitter || ''}
                onChange={(e) => handleFieldChange('socialMedia', { twitter: e.target.value })}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Twitter />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="LinkedIn"
                value={modifiedSettings?.socialMedia?.linkedin || ''}
                onChange={(e) => handleFieldChange('socialMedia', { linkedin: e.target.value })}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkedIn />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Instagram"
                value={modifiedSettings?.socialMedia?.instagram || ''}
                onChange={(e) => handleFieldChange('socialMedia', { instagram: e.target.value })}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Instagram />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="YouTube"
                value={modifiedSettings?.socialMedia?.youtube || ''}
                onChange={(e) => handleFieldChange('socialMedia', { youtube: e.target.value })}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <YouTube />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Theme Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Theme Settings
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Primary Color"
                value={modifiedSettings?.theme?.primaryColor || ''}
                onChange={(e) => handleFieldChange('theme', { primaryColor: e.target.value })}
                fullWidth
                type="color"
              />
              <TextField
                label="Secondary Color"
                value={modifiedSettings?.theme?.secondaryColor || ''}
                onChange={(e) => handleFieldChange('theme', { secondaryColor: e.target.value })}
                fullWidth
                type="color"
              />
              <TextField
                label="Font Family"
                value={modifiedSettings?.theme?.fontFamily || ''}
                onChange={(e) => handleFieldChange('theme', { fontFamily: e.target.value })}
                fullWidth
                select
              >
                <MenuItem value="Roboto">Roboto</MenuItem>
                <MenuItem value="Open Sans">Open Sans</MenuItem>
                <MenuItem value="Lato">Lato</MenuItem>
                <MenuItem value="Poppins">Poppins</MenuItem>
              </TextField>
              <FormControlLabel
                control={
                  <Switch
                    checked={modifiedSettings?.theme?.darkMode || false}
                    onChange={(e) => handleFieldChange('theme', { darkMode: e.target.checked })}
                  />
                }
                label="Dark Mode"
              />
            </Box>
          </Paper>
        </Grid>

        {/* SEO Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              SEO Settings
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Google Analytics ID"
                value={modifiedSettings?.seo?.googleAnalyticsId || ''}
                onChange={(e) => handleFieldChange('seo', { googleAnalyticsId: e.target.value })}
                fullWidth
              />
              <TextField
                label="Meta Title"
                value={modifiedSettings?.seo?.metaTitle || ''}
                onChange={(e) => handleFieldChange('seo', { metaTitle: e.target.value })}
                fullWidth
              />
              <TextField
                label="Meta Description"
                value={modifiedSettings?.seo?.metaDescription || ''}
                onChange={(e) => handleFieldChange('seo', { metaDescription: e.target.value })}
                multiline
                rows={3}
                fullWidth
              />
              <TextField
                label="OG Image"
                value={modifiedSettings?.seo?.metaImage || ''}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="outlined"
                        component="label"
                        size="small"
                        startIcon={<CloudUpload />}
                        disabled={uploading}
                      >
                        Upload
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleImageUpload('seo', 'metaImage', e.target.files[0])}
                        />
                      </Button>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Box>
          </Paper>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={modifiedSettings?.security?.enableReCaptcha || false}
                    onChange={(e) => handleFieldChange('security', { enableReCaptcha: e.target.checked })}
                  />
                }
                label="Enable ReCaptcha"
              />
              <TextField
                label="ReCaptcha Site Key"
                value={modifiedSettings?.security?.reCaptchaSiteKey || ''}
                onChange={(e) => handleFieldChange('security', { reCaptchaSiteKey: e.target.value })}
                fullWidth
              />
              <TextField
                label="ReCaptcha Secret Key"
                value={modifiedSettings?.security?.reCaptchaSecretKey || ''}
                onChange={(e) => handleFieldChange('security', { reCaptchaSecretKey: e.target.value })}
                fullWidth
                type="password"
              />
              <TextField
                label="JWT Secret"
                value={modifiedSettings?.security?.jwtSecret || ''}
                onChange={(e) => handleFieldChange('security', { jwtSecret: e.target.value })}
                fullWidth
                type="password"
              />
              <TextField
                label="JWT Expires In"
                value={modifiedSettings?.security?.jwtExpiresIn || ''}
                onChange={(e) => handleFieldChange('security', { jwtExpiresIn: e.target.value })}
                fullWidth
                helperText="e.g., 7d, 24h, 60m"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveAll}
              disabled={JSON.stringify(settings) === JSON.stringify(modifiedSettings)}
            >
              Save All Changes
            </Button>
            <Button
              variant="outlined"
              color="warning"
              onClick={handleReset}
            >
              Reset to Default
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Notifications */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess('')}
      >
        <Alert severity="success" onClose={() => setSuccess('')}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;