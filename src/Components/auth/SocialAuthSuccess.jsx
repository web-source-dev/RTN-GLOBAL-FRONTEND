import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import API from '../../BackendAPi/ApiProvider';
import { useAuth } from '../../contexts/AuthContext';

const SocialAuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data using existing cookie
        const response = await API.get('/api/auth/me');
        const userData = response.data;
        
        // Update auth context
        if (login) {
          login(userData);
        }
        
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect after short delay to show success message
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } catch (error) {
        console.error('Error fetching user data after social login', error);
        navigate('/auth/login');
      }
    };
    
    fetchUserData();
  }, [navigate, login]);
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        p: 3
      }}
    >
      <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Authentication Successful!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        You've successfully logged in with your social account.
      </Typography>
      <CircularProgress size={24} sx={{ mt: 2 }} />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Redirecting to dashboard...
      </Typography>
    </Box>
  );
};

export default SocialAuthSuccess; 