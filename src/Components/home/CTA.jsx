import React from 'react';
import { Box, Container, Typography, Button, Paper, keyframes, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const floatingAnimation = keyframes`
  0% { transform: translateY(0px) rotate(45deg); }
  50% { transform: translateY(-20px) rotate(45deg); }
  100% { transform: translateY(0px) rotate(45deg); }
`;

const CTA = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleConsultationClick = () => {
    navigate('/free-consultation');
  };

  return (
    <Box sx={{
        position: 'relative',
        bgcolor: isDarkMode ? 'background.defualt' : 'primary.main',
        pt: 8,
        pb: 32,
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '150px',
          background: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 1440 320%27%3E%3Cpath fill=%27%23ffffff%27 fill-opacity=%271%27 d=%27M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z%27%3E%3C/path%3E%3C/svg%3E")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          opacity: isDarkMode ? 0.05 : 1
        }
      }}>
      <Container maxWidth="lg">
        <Paper
          elevation={24}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: isDarkMode ? 'text.primary' : 'white',
            backgroundColor: isDarkMode ? 'background.default' : 'background.default',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: theme.shape.borderRadius,
            boxShadow: isDarkMode 
              ? '0 10px 40px rgba(0,0,0,0.5)' 
              : '0 10px 40px rgba(0,0,0,0.3)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px)'
            },
            '&::before': {
              content: '""',
              background: isDarkMode
                ? 'linear-gradient(135deg, rgba(30,30,30,0.9), rgba(20,20,20,0.7)), url(https://cdn.pixabay.com/photo/2018/02/16/10/52/web-design-3157323_1280.jpg)'
                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgb(0, 0, 0)), url(https://cdn.pixabay.com/photo/2018/02/16/10/52/web-design-3157323_1280.jpg)',
              top: '-20px',
              right: '-20px',
              width: '200px',
              height: '200px',
              background: 'url(https://cdn.pixabay.com/photo/2018/04/06/13/46/modern-3295556_1280.png)',
              borderRadius: 4,
              backgroundRepeat: 'no-repeat',
              opacity: isDarkMode ? 0.1 : 0.2,
              animation: `${floatingAnimation} 3s ease-in-out infinite`
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-20px',
              left: '-20px',
              width: '150px',
              height: '150px',
              background: 'url(https://cdn.pixabay.com/photo/2017/01/29/13/21/mobile-devices-2017978_1280.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              opacity: isDarkMode ? 0.1 : 0.2,
              animation: `${floatingAnimation} 4s ease-in-out infinite`
            }
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
          opacity: isDarkMode ? 0.1 : 0.05,
          background: `radial-gradient(circle at 80% 80%, ${theme.palette.primary.main} 0%, transparent 40%),
                      radial-gradient(circle at 20% 20%, ${theme.palette.secondary.main} 0%, transparent 40%)`,
          zIndex: 1,
        }}
      />

          <Typography 
            variant="h2" 
            gutterBottom
            sx={{
              fontWeight: 700,
              background: isDarkMode
                ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                : `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}
          >
            Ready to Build Your Digital Presence?
          </Typography>
          <Typography 
            variant="h5" 
            paragraph 
            sx={{ 
              color: isDarkMode ? 'text.secondary' : 'text.primary',
              fontWeight: 300,
              letterSpacing: 0.5
            }}
          >
            Get a Free Web Development Consultation Worth $500
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleConsultationClick}
            sx={{
              px: 4,
              py: 1.5,
              background: isDarkMode
                ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                : `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              fontSize: '1.2rem',
              fontWeight: 600,
              borderRadius: '30px',
              boxShadow: isDarkMode 
                ? `0 4px 20px ${theme.palette.primary.main}33`
                : '0 4px 20px rgba(0,0,0,0.25)',
              animation: `${pulseAnimation} 2s infinite`,
              '&:hover': {
                background: isDarkMode
                  ? `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`
                  : `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                transform: 'scale(1.05)',
                boxShadow: isDarkMode
                  ? `0 6px 25px ${theme.palette.primary.main}66`
                  : '0 6px 25px rgba(0,0,0,0.3)'
              }
            }}
          >
            Schedule Your Free Consultation
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default CTA;
