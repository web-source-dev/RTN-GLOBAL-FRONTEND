import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
  useTheme,
  Alert,
  CircularProgress,
  Fade,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TranslateIcon from '@mui/icons-material/Translate';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import API from '../../BackendAPi/ApiProvider';

const UserSettings = () => {
  const theme = useTheme();
  const [settings, setSettings] = useState({
    theme: 'system',
    language: 'en',
    emailNotifications: true,
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await API.get('/api/user/preferences');
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to load settings' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await API.put('/api/user/preferences', settings);
      setMessage({ type: 'success', text: 'Settings updated successfully' });
      
      // Reload page after brief delay to apply new settings
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Error updating settings' 
      });
    } finally {
      setSaving(false);
    }
  };

  const settingsOptions = [
    {
      title: 'Appearance',
      icon: DarkModeIcon,
      color: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
      content: (
        <Select
          fullWidth
          value={settings.theme}
          onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
            },
          }}
        >
          <MenuItem value="light">Light Mode</MenuItem>
          <MenuItem value="dark">Dark Mode</MenuItem>
          <MenuItem value="system">System Default</MenuItem>
        </Select>
      )
    },
    {
      title: 'Language',
      icon: TranslateIcon,
      color: theme.palette.mode === 'dark' ? '#a5d6a7' : '#4caf50',
      content: (
        <Select
          fullWidth
          value={settings.language}
          onChange={(e) => setSettings({ ...settings, language: e.target.value })}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
            },
          }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Español</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
        </Select>
      )
    },
    {
      title: 'Notifications',
      icon: NotificationsIcon,
      color: theme.palette.mode === 'dark' ? '#ffb74d' : '#ff9800',
      content: (
        <FormControlLabel
          control={
            <Switch
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
              color="primary"
            />
          }
          label="Email Notifications"
          sx={{
            '& .MuiFormControlLabel-label': {
              color: theme.palette.text.primary,
            },
          }}
        />
      )
    }
  ];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          background: theme.palette.background.default,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in={!loading}>
      <Box
        py={12}
        sx={{
          background: theme.palette.background.default,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h2"
            textAlign="center"
            sx={{
              fontWeight: 800,
              mb: 4,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #90caf9, #ce93d8)'
                : 'linear-gradient(45deg, #1976d2, #9c27b0)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Settings
          </Typography>

          {message && (
            <Fade in={true}>
              <Alert 
                severity={message.type} 
                sx={{ 
                  mb: 4,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                }}
                onClose={() => setMessage(null)}
              >
                {message.text}
              </Alert>
            </Fade>
          )}

          <Grid container spacing={4}>
            {settingsOptions.map((setting, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 8px 24px rgba(0,0,0,0.4)'
                        : '0 8px 24px rgba(0,0,0,0.1)',
                    },
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                      <setting.icon 
                        sx={{ 
                          color: setting.color,
                          mr: 2,
                          fontSize: '2rem',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }} 
                      />
                      <Typography 
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {setting.title}
                      </Typography>
                    </Box>
                    {setting.content}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
              disabled={saving}
              sx={{
                px: 6,
                py: 2,
                borderRadius: 3,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #90caf9, #ce93d8)'
                    : 'linear-gradient(45deg, #1976d2, #9c27b0)',
                  color: theme.palette.mode === 'dark' ? '#000' : '#fff',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1.1rem',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {saving ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={20} sx={{ mr: 1, color: theme.palette.mode === 'dark' ? '#000' : '#fff' }} />
                  Saving...
                </Box>
              ) : 'Save Changes'}
            </Button>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
};

export default UserSettings;