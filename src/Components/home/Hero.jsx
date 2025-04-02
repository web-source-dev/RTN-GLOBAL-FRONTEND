import React from 'react';
import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    window.location.href = isAuthenticated ? `${process.env.REACT_APP_USER_DASHBOARD_URL}/dashboard/user/orders` : `/auth/login`;
  };

  const handleBookConsultation = () => {
    navigate('/free-consultation');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: (theme) => `linear-gradient(135deg, 
          ${theme.palette.primary.dark} 0%,
          ${theme.palette.primary.main} 50%,
          ${theme.palette.secondary.main} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: '20vw',
            height: '20vw',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            animation: 'float 15s infinite',
            animationDelay: `${i * 2}s`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            '@keyframes float': {
              '0%': { transform: 'translate(0, 0)' },
              '50%': { transform: 'translate(100px, -100px)' },
              '100%': { transform: 'translate(0, 0)' },
            },
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h1"
                color="white"
                fontWeight="800"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  mb: 2,
                }}
              >
                Custom Web Solutions
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    background: 'linear-gradient(45deg, #fff, #f5f5f5)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  That Drive Results
                </Box>
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  mb: 4,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  fontWeight: 300,
                }}
              >
                Wix Development, MERN Stack Web Apps, and React Native Mobile Solutions
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mb: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<RocketLaunchIcon />}
                  onClick={handleGetStarted}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '30px',
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    background: (theme) => `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Get Started Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={handleBookConsultation}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '30px',
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                    Book a Free Consultation
                  </Button>
              </Stack>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                }}
              >
                {[
                  'Fast & Scalable',
                  'User-Friendly',
                  'Custom Solutions',
                  'Expert Team',
                ].map((item) => (
                  <Box
                    key={item}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'secondary.light',
                      }}
                    />
                    <Typography
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/hero-illustration.png"
              alt="Hero Illustration"
              sx={{
                width: '100%',
                height: '500px',
                borderRadius: '20px',
                transform: 'perspective(1000px) rotateY(-5deg)',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'perspective(1000px) rotateY(0deg)',
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
