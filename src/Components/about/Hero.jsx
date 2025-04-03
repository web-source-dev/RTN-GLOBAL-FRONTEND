import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, useTheme, Fade } from '@mui/material';

const Hero = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Box
      component="section"
      id="about-hero"
      aria-label="About RTN Global Hero Section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: theme => theme.palette.mode.default,
        py: { xs: 10, md: 16 }
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
          opacity: isDark ? 0.05 : 0.01,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 10%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 10%)`,
          zIndex: 1,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Fade in={isVisible} timeout={1000}>
          <Box sx={{ maxWidth: 'md', mx: { xs: 'auto', lg: 0 } }}>
            <Typography
              component="span"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                display: 'block',
                mb: 2,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease 0.2s'
              }}
            >
              About RTN Global
            </Typography>
            
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.5s ease 0.4s'
              }}
            >
              Building Digital Excellence
            </Typography>
            
            <Typography
              variant="h4"
              component="p"
              sx={{
                color: 'text.secondary',
                mb: 4,
                maxWidth: '800px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.5s ease 0.6s'
              }}
            >
              We specialize in creating powerful digital solutions through Wix websites, MERN stack applications, and React Native mobile apps.
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2, 
                flexWrap: 'wrap',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'all 0.5s ease 0.8s'
              }}
            >
              <Button
                variant="contained"
                size="large"
                href="/contact"
                aria-label="Get Started with RTN Global"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: '30px',
                  background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                    background: 'linear-gradient(45deg, #1565c0, #8e24aa)'
                  }
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="/services"
                aria-label="Learn about our services"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: '30px',
                  borderWidth: '2px',
                  borderColor: 'primary.main',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    borderWidth: '2px'
                  }
                }}
              >
                Our Services
              </Button>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Hero;