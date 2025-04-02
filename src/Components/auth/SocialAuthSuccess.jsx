import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress, Paper, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import API from '../../BackendAPi/ApiProvider';
import { useAuth } from '../../contexts/AuthContext';

const SocialAuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
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
          navigate(`${process.env.REACT_APP_USER_DASHBOARD_URL}/dashboard/user`);
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
        minHeight: '100vh',
        background:theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
          {/* Background Pattern with enhanced animation */}
          <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.2,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 10%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 10%)`,
          zIndex: 1,
        }}
      />
      
      <Paper
        elevation={6}
        sx={{
          m: 'auto',
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          maxWidth: '90%',
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          background:theme.palette.background.default,
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          animation: 'fadeIn 0.6s ease-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: isDark 
              ? 'rgba(46, 125, 50, 0.2)' 
              : 'rgba(46, 125, 50, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { boxShadow: '0 0 0 0 rgba(46, 125, 50, 0.4)' },
              '70%': { boxShadow: '0 0 0 15px rgba(46, 125, 50, 0)' },
              '100%': { boxShadow: '0 0 0 0 rgba(46, 125, 50, 0)' },
            },
          }}
        >
          <CheckCircleIcon 
            color="success" 
            sx={{ 
              fontSize: 60,
              animation: 'scaleIn 1s ease-out',
              '@keyframes scaleIn': {
                '0%': { transform: 'scale(0)' },
                '60%': { transform: 'scale(1.2)' },
                '100%': { transform: 'scale(1)' },
              },
            }} 
          />
        </Box>
        
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2e7d32, #4caf50)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Success!
        </Typography>
        
        <Typography variant="h6" gutterBottom color="text.primary">
          Authentication Successful
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3 }}>
          You've successfully logged in with your social account. We're preparing your dashboard.
        </Typography>
        
        <Box sx={{ position: 'relative', mb: 2 }}>
          <CircularProgress 
            size={36} 
            thickness={4} 
            sx={{ 
              color: theme.palette.success.main,
            }} 
          />
        </Box>
        
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Redirecting to dashboard...
        </Typography>
      </Paper>
    </Box>
  );
};

export default SocialAuthSuccess; 