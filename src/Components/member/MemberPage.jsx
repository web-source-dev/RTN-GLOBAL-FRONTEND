import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Card,
  CardContent,
  Tab,
  Tabs,
  CircularProgress,
  Alert
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import API from '../../BackendAPi/ApiProvider';
import { useNavigate } from 'react-router-dom';

const MemberPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // User data state
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    joinDate: '',
    membershipType: '',
    avatar: null
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await API.get('/api/user/profile');
        
        // Format the user data
        setUserData({
          name: `${response.data.firstName} ${response.data.lastName}`,
          email: response.data.email,
          joinDate: new Date(response.data.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          membershipType: response.data.membershipType || 'Standard',
          avatar: response.data.avatar
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user profile. Please try again later.');
        
        // Redirect to login if unauthorized
        if (err.response?.status === 401) {
          navigate('/auth/login', { state: { from: '/member' } });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Profile
        return (
          <Card
            sx={{
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            }}
          >
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Full Name"
                        secondary={userData.name}
                      />
                      <IconButton edge="end" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Email"
                        secondary={userData.email}
                      />
                      <IconButton edge="end" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Member Since"
                        secondary={userData.joinDate}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Membership Type"
                        secondary={userData.membershipType}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      case 1: // Settings
        return (
          <Card
            sx={{
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Notification Preferences"
                    secondary="Manage your notification settings"
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Security Settings"
                    secondary="Update password and security preferences"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        );
      case 2: // Activity
        return (
          <Card
            sx={{
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {/* Replace with actual activity data */}
                <ListItem>
                  <ListItemText
                    primary="Profile Updated"
                    secondary="Yesterday at 2:30 PM"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Password Changed"
                    secondary="Last week"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        py: 6,
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Welcome Banner */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                color: 'white',
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: '#fff',
                  color: '#1976d2',
                }}
                src={userData.avatar ? `${process.env.REACT_APP_API_URL}${userData.avatar}` : null}
              >
                {userData.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h4" gutterBottom>
                  Welcome back, {userData.name}!
                </Typography>
                <Typography variant="subtitle1">
                  {userData.membershipType} Member
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Main Content with Tabs */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontSize: '1rem',
                  },
                }}
              >
                <Tab
                  icon={<AccountCircleIcon />}
                  label="Profile"
                  iconPosition="start"
                />
                <Tab
                  icon={<SettingsIcon />}
                  label="Settings"
                  iconPosition="start"
                />
                <Tab
                  icon={<HistoryIcon />}
                  label="Activity"
                  iconPosition="start"
                />
              </Tabs>
              <Box sx={{ p: 3 }}>{renderTabContent()}</Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MemberPage;