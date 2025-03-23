import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, useTheme, AppBar, Toolbar, IconButton, Avatar, Drawer, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import UserSidebar from './UserSidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SupportIcon from '@mui/icons-material/Support';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import API from '../../BackendAPi/ApiProvider';

const UserDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verify user authentication on mount
    const verifyAuth = async () => {
      try {
        const response = await API.get('/api/user/profile');
        setUser(response.data);
      } catch (err) {
        // Redirect to login if not authenticated
        navigate('/auth/login', { state: { from: '/user' } });
      } finally {
        setLoading(false);
      }
    };
    
    verifyAuth();
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: 280,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          bgcolor: 'background.paper',
          borderRight: `1px solid ${theme.palette.divider}`,
          position: 'fixed',
          height: '100vh',
          overflowX: 'hidden',
          overflowY: 'auto',
          boxShadow: theme.shadows[1],
          zIndex: theme.zIndex.appBar - 1,
        }}
      >
        <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            RTN Global
          </Typography>
        </Box>
        <UserSidebar onMobileClose={handleDrawerToggle} />
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: 'background.paper',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, color: theme.palette.primary.main }}>
            RTN Global
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <UserSidebar onMobileClose={handleDrawerToggle} />
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, ml: { md: '280px' } }}>
        {/* Header */}
        <AppBar 
          position="fixed" 
          color="inherit"
          elevation={1}
          sx={{ 
            ml: { md: '280px' },
            width: { md: `calc(100% - 280px)` },
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />
            
            <IconButton sx={{ mx: 1 }}>
              <NotificationsIcon />
            </IconButton>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              {user?.firstName?.charAt(0) || 'U'}
            </Avatar>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box sx={{ p: 3, mt: 8 }}>
          <Paper
            elevation={0}
            sx={{
              minHeight: '60vh',
            }}
          >
            <Outlet />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDashboard;