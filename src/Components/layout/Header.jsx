import React, { useState, useEffect } from 'react';
import ServicesMegaMenu from './megamenu/ServicesMegaMenu';
import CaseStudiesMegaMenu from './megamenu/CaseStudiesMegaMenu';
import BlogMegaMenu from './megamenu/BlogMegaMenu';

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Grid,
  ListItemIcon,
  CircularProgress,
  CardMedia
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ThemeSwitcher from '../ThemeSwitcher';
import NotificationComponent from '../notifications/NotificationComponent';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import API from '../../BackendAPi/ApiProvider';

const pages = [
  { title: 'Services', path: '/services' },
  { title: 'Case Studies', path: '/case-studies' },
  { title: 'About Us', path: '/about' },
  { title: 'Blog', path: '/blog' },
  { title: 'Contact', path: '/contact' },
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [megaMenuAnchor, setMegaMenuAnchor] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enhanced user state management
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    theme: 'system',
    language: 'en',
    emailNotifications: true
  });

  const { logout } = useAuth();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Replace direct fetch with API provider for cookie auth
        const response = await API.get('/api/user/profile');
        
        // If successful, update state
        setUser(response.data);
        setIsLoggedIn(true);
        setUserPreferences(response.data.preferences || {});
      } catch (err) {
        // Handle error but don't show it to the user
        console.error('Error fetching user profile:', err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if there's a user in localStorage (possible from previous login)
    if (localStorage.getItem('user')) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Use API provider for logout
      await API.post('/api/auth/logout');
      
      // Clear user from localStorage
      localStorage.removeItem('user');
      
      // Update state
      setUser(null);
      setIsLoggedIn(false);
      
      // Use auth context logout if available
      if (logout) logout();
      
      // Close menu
      setAnchorEl(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const [menuCloseTimer, setMenuCloseTimer] = useState(null);

  const handleMegaMenuOpen = (event, menuId) => {
    setMegaMenuAnchor(event.currentTarget);
    setActiveMenu(menuId);
  };

  const handleMegaMenuClose = () => {
    setMegaMenuAnchor(null);
    setActiveMenu(null);
  };

  const handleMenuMouseEnter = () => {
    if (menuCloseTimer) {
      clearTimeout(menuCloseTimer);
      setMenuCloseTimer(null);
    }
  };

  const handleMenuMouseLeave = () => {
    handleMegaMenuClose();
  };

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleProfileMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          width: 320,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {loading ? (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={20} />
        </Box>
      ) : (
        <>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {user?.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <MenuItem component={Link} to="/dashboard/user/profile">
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem component={Link} to="/dashboard/user">
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Dashboard
          </MenuItem>
          <MenuItem component={Link} to="/dashboard/user/profile">
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </>
      )}
    </Menu>
  );

const renderMegaMenu = (
    <Menu
      anchorEl={megaMenuAnchor}
      open={Boolean(megaMenuAnchor)}
      onClose={handleMegaMenuClose}
      MenuListProps={{
        onMouseEnter: handleMenuMouseEnter,
        onMouseLeave: handleMenuMouseLeave
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          width: '100%',
        },
      }}
      transformOrigin={{ horizontal: 'center', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      {activeMenu === 'Services' && <ServicesMegaMenu />}
      {activeMenu === 'Case Studies' && <CaseStudiesMegaMenu />}
      {activeMenu === 'Blog' && <BlogMegaMenu />}
    </Menu>
  );

  return (
    <AppBar position="fixed" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <CardMedia
          component="img"
          image="/rtnglobal-logo.png"
          alt="Logo"
          sx={{width: 50, height: 50,ml:2 }}
        />

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page.title}
                  onClick={(e) => page.title === 'About Us' || page.title === 'Contact' ? 
                    window.location.href = page.path : 
                    handleMegaMenuOpen(e, page.title)}
                  onMouseEnter={(e) => ['Services', 'Case Studies', 'Blog'].includes(page.title) && 
                    handleMegaMenuOpen(e, page.title)}
                  sx={{
                    color: activeMenu === page.title ? 'primary.main' : 'inherit',
                    position: 'relative',
                    '&:hover': {
                      color: 'primary.main',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      width: '100%',
                      height: 2,
                      backgroundColor: 'primary.main',
                      transform: activeMenu === page.title ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.3s ease-in-out'
                    }
                  }}
                >
                  {page.title}
                </Button>
              ))}
              <ThemeSwitcher />
              {isLoggedIn ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <NotificationComponent />
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleProfileMenuOpen}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                    >
                      {user.avatar ? (
                        <Avatar
                          alt={user.name}
                          src={`${process.env.REACT_APP_API_URL}${user.avatar}`}
                          sx={{ width: 32, height: 32,border:'1px solid #000' }}
                        />
                      ) : (
                        <AccountCircleIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/auth/login"
                  sx={{
                    ml: 2,
                    px: 3,
                    borderRadius: '50px',
                  }}
                >
                  Get Started
                </Button>
              )}
            </Box>
          )}

          {isMobile && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ThemeSwitcher />
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
                PaperProps={{
                  sx: { width: '70%', maxWidth: '300px' },
                }}
              >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={handleDrawerToggle}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Divider />
                <List>
                  {pages.map((page) => (
                    <ListItem
                      key={page.title}
                      component="a"
                      href={page.path}
                      onClick={handleDrawerToggle}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.04)',
                        },
                      }}
                    >
                      <ListItemText primary={page.title} />
                    </ListItem>
                  ))}
                  <ListItem sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ borderRadius: '50px' }}
                      component="a"
                      href="/auth/login"
                    >
                      Get Started
                    </Button>

                  </ListItem>
                </List>
              </Drawer>
            </>
          )}
        </Toolbar>
      </Container>
      {renderProfileMenu}
      {renderMegaMenu}
    </AppBar>
  );
};

export default Header;
