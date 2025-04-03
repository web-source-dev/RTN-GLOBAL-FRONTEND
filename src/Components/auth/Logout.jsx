import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import API from '../../BackendAPi/ApiProvider';
import { Box, CircularProgress, Typography, Container, Paper, useTheme } from '@mui/material';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Call the logout endpoint to clear the cookie on the server
        await API.post('/api/auth/logout');
        
        // Clear any user data from localStorage
        localStorage.removeItem('user');
        
        // Update auth context
        if (logout) logout();
        
        // Redirect to login page
        navigate('/auth/login', { replace: true });
      } catch (error) {
        console.error('Logout failed:', error);
        // Redirect anyway in case of failure
        navigate('/auth/login', { replace: true });
      }
    };

    performLogout();
  }, [navigate, logout]);

  return (
    <Container 
      maxWidth="sm" 
      component="main"
      sx={{ 
        py: 8,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: 'center',
          width: '100%',
          backgroundColor: theme.palette.background.paper,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 20%),
                        radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 20%)`,
            zIndex: 0
          }}
          aria-hidden="true"
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1
          }}
        >
          <CircularProgress 
            aria-label="Logging out"
            size={60}
            thickness={4}
            sx={{ mb: 3 }}
          />
          <Typography 
            variant="h5" 
            component="h1"
            sx={{ 
              fontWeight: 600,
              mb: 1
            }}
          >
            Logging Out
          </Typography>
          <Typography 
            variant="body1"
            component="p"
            color="text.secondary"
          >
            Please wait while we safely log you out of your account...
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Logout; 