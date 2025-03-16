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
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
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
          opacity: isDark ? 0.15 : 0.08,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 50%)`,
          zIndex: 1,
          animation: 'pulse 15s infinite alternate',
          '@keyframes pulse': {
            '0%': { opacity: isDark ? 0.1 : 0.05 },
            '100%': { opacity: isDark ? 0.2 : 0.1 }
          }
        }}
      />
      
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}20 0%, transparent 70%)`,
          filter: 'blur(40px)',
          opacity: 0.6,
          zIndex: 1,
          animation: 'float 10s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0) scale(1)' },
            '50%': { transform: 'translateY(-20px) scale(1.1)' }
          }
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.main}20 0%, transparent 70%)`,
          filter: 'blur(30px)',
          opacity: 0.5,
          zIndex: 1,
          animation: 'float2 12s ease-in-out infinite',
          '@keyframes float2': {
            '0%, 100%': { transform: 'translateY(0) scale(1)' },
            '50%': { transform: 'translateY(20px) scale(1.1)' }
          }
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