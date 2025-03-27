import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useTheme,
  Fade,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

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
        background:theme.palette.background.default,
        pt: 12,
        pb: 8,
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
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in={isVisible} timeout={1000}>
              <Box>
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
                    transition: 'all 0.5s ease 0.2s',
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: 60,
                      height: 3,
                      backgroundColor: 'primary.main',
                      borderRadius: 4
                    }
                  }}
                >
                  Careers at RTN Global
                </Typography>
                <Typography
                  component="h1"
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
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
                  Join Our Team
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ 
                    mb: 4, 
                    maxWidth: '600px',
                    lineHeight: 1.6,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'all 0.5s ease 0.6s'
                  }}
                >
                  Build your career with RTN Global. We're looking for talented individuals who
                  are passionate about digital marketing and innovation.
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    gap: 2,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 0.5s ease 0.8s'
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<WorkIcon />}
                    sx={{ 
                      borderRadius: '30px',
                      px: 4,
                      py: 1.5,
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
                    View Open Positions
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Fade in={isVisible} timeout={1000} style={{ transitionDelay: '300ms' }}>
              <Box
                sx={{
                  position: 'relative',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${theme.palette.primary.main}30 0%, transparent 70%)`,
                    filter: 'blur(25px)',
                    zIndex: 0
                  },
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${theme.palette.secondary.main}30 0%, transparent 70%)`,
                    filter: 'blur(30px)',
                    zIndex: 0
                  }
                }}
              >
                <Box
                  component="img"
                  src="/images/Team/jointeam.png"
                  alt="Careers Hero"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '600px',
                    display: 'block',
                    mx: 'auto',
                    position: 'relative',
                    zIndex: 1,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: '0.5s',
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))'
                  }}
                />
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
