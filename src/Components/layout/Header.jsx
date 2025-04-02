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
  CardMedia,
  Chip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import ThemeSwitcher from '../ThemeSwitcher';
import NotificationComponent from '../notifications/NotificationComponent';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Enhanced user state management
  const [userPreferences, setUserPreferences] = useState({
    theme: 'system',
    language: 'en',
    emailNotifications: true
  });

  const { user, logout, isAdmin, isAuthenticated, getDashboardUrl } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home or login page after logout
      window.location.href = '/';
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
  const [menuHoverIntent, setMenuHoverIntent] = useState(false);

  const handleMegaMenuOpen = (event, menuId) => {
    clearTimeout(menuCloseTimer);
    setMegaMenuAnchor(event.currentTarget);
    setActiveMenu(menuId);
    setMenuHoverIntent(true);
  };

  const handleMegaMenuClose = () => {
    setMegaMenuAnchor(null);
    setActiveMenu(null);
    setMenuHoverIntent(false);
  };

  const handleHeaderItemMouseLeave = () => {
    // Don't close menu immediately, give time to move to the menu
    const timer = setTimeout(() => {
      if (!menuHoverIntent) {
        handleMegaMenuClose();
      }
    }, 300);
    setMenuCloseTimer(timer);
  };

  const handleMenuMouseEnter = () => {
    if (menuCloseTimer) {
      clearTimeout(menuCloseTimer);
      setMenuCloseTimer(null);
    }
    setMenuHoverIntent(true);
  };

  const handleMenuMouseLeave = () => {
    setMenuHoverIntent(false);
    handleMegaMenuClose();
  };

  const getDashboardLink = () => {
    return getDashboardUrl();
  };

  const getProfileLink = () => {
    if (isAdmin) {
      return `${process.env.REACT_APP_ADMIN_DASHBOARD_URL}/profile`;
    } else {
      return `${process.env.REACT_APP_USER_DASHBOARD_URL}/dashboard/user/profile`;
    }
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {user?.firstName} {user?.lastName}
              </Typography>
              {isAdmin && (
                <Chip 
                  label="Admin" 
                  size="small" 
                  color="primary" 
                  sx={{ ml: 1, height: 20, fontSize: '0.65rem' }}
                />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          
          <MenuItem component={Link} to={getProfileLink()}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          
          <MenuItem component={Link} to={getDashboardLink()}>
            <ListItemIcon>
              {isAdmin ? <AdminPanelSettingsIcon fontSize="small" /> : <DashboardIcon fontSize="small" />}
            </ListItemIcon>
            {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
          </MenuItem>
          
          <MenuItem component={Link} to={getProfileLink()}>
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
      keepMounted
    >
      {activeMenu === 'Services' && <ServicesMegaMenu onItemClick={handleMegaMenuClose} />}
      {activeMenu === 'Case Studies' && <CaseStudiesMegaMenu onItemClick={handleMegaMenuClose} />}
      {activeMenu === 'Blog' && <BlogMegaMenu onItemClick={handleMegaMenuClose} />}
    </Menu>
  );

  return (
    <AppBar position="fixed" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <CardMedia
          component="img"
          loading="lazy"
          onClick={() => window.location.href = '/'}
          image="/rtnglobal-logo.png"
          alt="Logo"
          className="logo-img"
          sx={{width: 60, height: 50,ml:2 ,cursor:'pointer'}}
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
                  onMouseLeave={handleHeaderItemMouseLeave}
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
              {isAuthenticated && localStorage.getItem('user') ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <NotificationComponent />
                  <Tooltip title={isAdmin ? "Admin settings" : "Account settings"}>
                    <IconButton
                      onClick={handleProfileMenuOpen}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                    >
                      {user?.avatar ? (
                        <Avatar
                          alt={user.fullName}
                          src={`${process.env.REACT_APP_API_URL}${user.avatar}`}
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            border: isAdmin ? '1px solid rgb(4, 0, 245)' : '1px solid #000'
                          }}
                        />
                      ) : (
                        <Avatar sx={{ 
                          bgcolor: isAdmin ? 'error.main' : 'primary.main',
                          width: 32,
                          height: 32,
                        }}>
                          {isAdmin ? <AdminPanelSettingsIcon fontSize="small" /> : <AccountCircleIcon />}
                        </Avatar>
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
                {isAuthenticated && localStorage.getItem('user') && <NotificationComponent />}
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
                
                {isAuthenticated && localStorage.getItem('user') ? (
                  <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {user?.avatar ? (
                        <Avatar
                          alt={user.fullName}
                          src={`${process.env.REACT_APP_API_URL}${user.avatar}`}
                          sx={{ 
                            width: 48, 
                            height: 48, 
                            border: isAdmin ? 'px solidrgb(4, 0, 245)' : '1px solid #000', 
                            mr: 2 
                          }}
                        />
                      ) : (
                        <Avatar 
                          sx={{ 
                            width: 48, 
                            height: 48, 
                            mr: 2,
                            bgcolor: isAdmin ? 'error.main' : 'primary.main'
                          }}
                        >
                          {isAdmin ? <AdminPanelSettingsIcon /> : <AccountCircleIcon />}
                        </Avatar>
                      )}
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {user?.firstName} {user?.lastName}
                          </Typography>
                          {isAdmin && (
                            <Chip 
                              label="Admin" 
                              size="small" 
                              color="primary" 
                              sx={{ ml: 1, height: 20, fontSize: '0.65rem' }}
                            />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {user?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ p: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      component="a"
                      href="/auth/login"
                    >
                      Get Started
                    </Button>
                  </Box>
                )}
                
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
                  
                  {isAuthenticated && localStorage.getItem('user') ? (
                    <>
                      <Divider sx={{ my: 1 }} />
                      <ListItem 
                        component={Link} 
                        to={getProfileLink()}
                        onClick={handleDrawerToggle}
                      >
                        <ListItemIcon>
                          <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                      </ListItem>
                      <ListItem 
                        component={Link} 
                        to={getDashboardLink()}
                        onClick={handleDrawerToggle}
                      >
                        <ListItemIcon>
                          {isAdmin ? <AdminPanelSettingsIcon fontSize="small" /> : <DashboardIcon fontSize="small" />}
                        </ListItemIcon>
                        <ListItemText primary={isAdmin ? "Admin Dashboard" : "Dashboard"} />
                      </ListItem>
                      <ListItem 
                        component={Link} 
                        to={getProfileLink()}
                        onClick={handleDrawerToggle}
                      >
                        <ListItemIcon>
                          <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                      </ListItem>
                      <ListItem 
                        onClick={() => {
                          handleLogout();
                          handleDrawerToggle();
                        }}
                        sx={{ cursor: 'pointer' }}
                      >
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </>
                  ) : (
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
                  )}
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
