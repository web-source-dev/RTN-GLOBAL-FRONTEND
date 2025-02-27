import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ThemeSwitcher from '../ThemeSwitcher';

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="fixed" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
            }}
          >
            RTN GLOBAL
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page.title}
                  href={page.path}
                  sx={{
                    color: 'inherit',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {page.title}
                </Button>
              ))}
              <ThemeSwitcher />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  ml: 2,
                  px: 3,
                  borderRadius: '50px',
                }}
              >
                Get Started
              </Button>
            </Box>
          )}

          {/* Mobile Navigation */}
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
    </AppBar>
  );
};

export default Header;
