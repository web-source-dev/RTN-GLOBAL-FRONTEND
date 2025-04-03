import React from 'react';
import { Box, Container, Typography, Button, Stack, Grid, useTheme } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();

  const handleGetStarted = () => {
    window.location.href = isAuthenticated ? `${process.env.REACT_APP_USER_DASHBOARD_URL}/dashboard/user/orders` : `/auth/login`;
  };

  const handleBookConsultation = () => {
    navigate('/free-consultation');
  };

  return (
    <Box
      component="section"
      id="hero-section"
      aria-label="Web Development Services Hero"
      sx={{
        minHeight: '90vh',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h1"
                component="h1"
                color="text.primary"
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
                    color: 'text.primary'
                  }}
                >
                  That Drive Results
                </Box>
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  fontWeight: 300,
                }}
              >
                Wix Website Development, MERN Stack Web Applications, and React Native Mobile Solutions
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
                  aria-label="Get started with web development services"
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
                  aria-label="Book a free web development consultation"
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '30px',
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    color: 'text.primary',
                    borderWidth:'1px',
                    borderStyle:'solid',
                    borderColor: 'rgb(0, 0, 0)',
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
                component="ul"
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                }}
              >
                {[
                  'Fast & Scalable Web Development',
                  'User-Friendly Interfaces',
                  'Custom Web Solutions',
                  'Expert Development Team',
                ].map((item) => (
                  <Box
                    component="li"
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
                      aria-hidden="true"
                    />
                    <Typography
                      sx={{
                        color: 'text.secondary',
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
              alt="Professional web development services illustration showing websites and mobile apps"
              loading="eager"
              width="100%"
              height="auto"
              sx={{
                display: 'block',
                maxWidth: '100%',
                height: 'auto',
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
