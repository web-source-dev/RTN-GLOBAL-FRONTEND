import React, { useState } from 'react';
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
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';

const MemberPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [activeTab, setActiveTab] = useState(0);

  // Mock user data - Replace with actual API data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2024',
    membershipType: 'Premium',
    avatar: null, // Replace with actual avatar URL
  };

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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 8,
        pb: 6,
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Profile Summary */}
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

          {/* Main Content */}
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