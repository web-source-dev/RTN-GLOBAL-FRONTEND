import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton, useTheme, useMediaQuery, CircularProgress, Alert } from '@mui/material';
import { Person, Assignment, Chat, Menu, Analytics, Description, Settings, Group } from '@mui/icons-material';
import ProfileSection from './sections/ProfileSection';
import ProjectTracker from './sections/ProjectTracker';
import ChatSystem from './sections/ChatSystem';
import SettingsSection from './sections/SettingsSection';
import API from '../../BackendAPi/ApiProvider';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function MemberPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        setLoading(true);
        // Verify the user is logged in and has appropriate access
        const response = await API.get('/api/user/profile');
        setUserData(response.data);
      } catch (err) {
        console.error('Error verifying user access:', err);
        setError('You must be logged in to access this page');
        // Redirect to login after a brief delay
        setTimeout(() => {
          navigate('/auth/login', { state: { from: '/member' } });
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    verifyAccess();
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Profile', icon: <Person />, component: <ProfileSection /> },
    { text: 'Projects', icon: <Assignment />, component: <ProjectTracker /> },
    { text: 'Chat', icon: <Chat />, component: <ChatSystem /> },
    { text: 'Settings', icon: <Settings />, component: <SettingsSection /> },
  ];

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" noWrap component="div">
          RTN Global
        </Typography>
        {userData && (
          <Typography variant="body2" color="text.secondary">
            {userData.firstName} {userData.lastName}
          </Typography>
        )}
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              setActiveSection(index);
              if (isMobile) setMobileOpen(false);
            }}
            selected={activeSection === index}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mb: 2 }}
          >
            <Menu />
          </IconButton>
        )}
        <Paper sx={{ p: 2 }}>
          {menuItems[activeSection].component}
        </Paper>
      </Box>
    </Box>
  );
}

export default MemberPage;