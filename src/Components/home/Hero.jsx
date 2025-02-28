import React from 'react';
import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Hero = () => {
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

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box>
              <Typography
                variant="h1"
                color="white"
                fontWeight="800"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  mb: 2,
                }}
              >
                Transform Your Digital
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
                  Presence & Growth
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
                Innovative Digital Marketing Solutions for the Modern Business Era
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mb: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  startIcon={<RocketLaunchIcon />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '30px',
                    fontSize: '1.1rem',
                    textTransform: 'none',
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
                  Watch Demo
                </Button>
              </Stack>
              <Box
                sx={{
                  display: 'flex',
                  gap: 4,
                  flexWrap: 'wrap',
                }}
              >
                {['500+ Clients', '95% Success Rate', '24/7 Support'].map((stat, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.1)',
                      px: 3,
                      py: 1,
                      borderRadius: '20px',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Typography color="white" fontWeight="500">
                      {stat}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-20px',
                  left: '-20px',
                  right: '-20px',
                  bottom: '-20px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                },
              }}
            >
              <Box
                component="img"
                src="/images/hero-illustration.jpg"
                alt="Digital Marketing"
                sx={{
                  width: '100%',
                  height: 'auto',
                  position: 'relative',
                  borderRadius: '20px',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
