import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import API from '../../BackendAPi/ApiProvider';
import { Box, CircularProgress, Typography } from '@mui/material';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Logging out...
      </Typography>
    </Box>
  );
};

export default Logout; 