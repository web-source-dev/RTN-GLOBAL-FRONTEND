import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, useTheme, Fade } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CampaignIcon from '@mui/icons-material/Campaign';
import BarChartIcon from '@mui/icons-material/BarChart';
import WebIcon from '@mui/icons-material/Web';
import EmailIcon from '@mui/icons-material/Email';
import ShareIcon from '@mui/icons-material/Share';

const Expertise = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [animatedItems, setAnimatedItems] = useState([]);

  const services = [
    {
      icon: <WebIcon sx={{ fontSize: 40 }} />,
      title: 'Wix Website Development',
      description: 'Professional Wix website design and development for stunning, user-friendly digital experiences.',
      color: '#2196f3'
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 40 }} />,
      title: 'MERN Stack Applications',
      description: 'Custom web applications built with MongoDB, Express.js, React, and Node.js for scalable solutions.',
      color: '#4caf50'
    },
    {
      icon: <ShareIcon sx={{ fontSize: 40 }} />,
      title: 'React Native Mobile Apps',
      description: 'Cross-platform mobile applications that deliver native performance and exceptional user experience.',
      color: '#e91e63'
    }
  ];

  // Animation effect for items
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemIndex = parseInt(entry.target.getAttribute('data-index'));
            setAnimatedItems((prev) => [...prev, itemIndex]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = document.querySelectorAll('.expertise-item');
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <Box
      sx={{
        py: 12,
        position: 'relative',
        background: theme => theme.palette.mode.default,
        overflow: 'hidden'
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
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Fade in={true} timeout={1000}>
          <Box textAlign="center" mb={10}>
            <Typography
              component="span"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                display: 'block',
                mb: 2,
              }}
            >
              What We Do Best
            </Typography>
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3
              }}
            >
              Our Expertise
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
            >
              We deliver comprehensive digital marketing solutions tailored to your unique business needs
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {services.map((service, index) => {
            const isAnimated = animatedItems.includes(index);
            return (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={index}
                className="expertise-item"
                data-index={index}
              >
                <Card
                  elevation={6}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    borderRadius: '16px',
                    background: isDark 
                      ? `linear-gradient(145deg, #2a2a2a, #333333)` 
                      : `linear-gradient(145deg, #ffffff, #f8f8f8)`,
                    borderLeft: `6px solid ${service.color}`,
                    position: 'relative',
                    overflow: 'hidden',
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: `${index * 0.1}s`,
                    boxShadow: `0 15px 30px rgba(0,0,0,0.15), 0 0 15px ${service.color}50, inset 0 0 10px rgba(255,255,255,0.05)`,
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: `0 20px 40px rgba(0,0,0,0.2), 0 0 20px ${service.color}60, inset 0 0 15px rgba(255,255,255,0.1)`
                    }
                  }}
                >
                  {/* Enhanced glowing background effect */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      opacity: 0.08,
                      background: `
                        radial-gradient(circle at 10% 0%, ${service.color}80 0%, transparent 30%),
                        radial-gradient(circle at 90% 90%, ${service.color}50 0%, transparent 40%)
                      `,
                      zIndex: 0,
                      transition: 'all 0.5s ease',
                      animation: 'pulseGlow 3s infinite alternate',
                      '@keyframes pulseGlow': {
                        '0%': { opacity: 0.05, transform: 'scale(1)' },
                        '100%': { opacity: 0.15, transform: 'scale(1.05)' }
                      }
                    }}
                  />
                  
                  <Box
                    className="service-icon"
                    sx={{ 
                      background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}90 100%)`,
                      borderRadius: '50%',
                      p: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: `0 0 15px ${service.color}70, 0 0 0 5px ${service.color}30`,
                      mb: 3,
                      alignSelf: 'flex-start',
                      transition: 'all 0.3s ease',
                      transform: isAnimated ? 'scale(1)' : 'scale(0.5)',
                      opacity: isAnimated ? 1 : 0,
                      transitionDelay: `${index * 0.1 + 0.2}s`,
                      '&:hover': {
                        transform: 'scale(1.1) rotate(5deg)',
                        boxShadow: `0 0 20px ${service.color}90, 0 0 0 8px ${service.color}40`
                      }
                    }}
                  >
                    {React.cloneElement(service.icon, { 
                      sx: { 
                        fontSize: 40, 
                        color: 'white',
                        filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))'
                      } 
                    })}
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, zIndex: 1, p: 0 }}>
                    <Box 
                      sx={{
                        position: 'relative',
                        mb: 3,
                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -10,
                          left: 0,
                          width: '50%',
                          height: 3,
                          borderRadius: 3,
                          background: `linear-gradient(90deg, ${service.color} 0%, ${service.color}30 80%, transparent 100%)`,
                          transition: 'width 0.5s ease-in-out',
                        }
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{ 
                          fontWeight: 700,
                          mb: 2,
                          background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}90 100%)`,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          textShadow: '0px 1px 1px rgba(0,0,0,0.1)',
                          transform: isAnimated ? 'translateY(0)' : 'translateY(20px)',
                          opacity: isAnimated ? 1 : 0,
                          transition: 'all 0.5s ease',
                          transitionDelay: `${index * 0.1 + 0.3}s`,
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Box>
                    <Box 
                      sx={{
                        position: 'relative',
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: `${service.color}08`,
                        border: `1px solid ${service.color}20`,
                        boxShadow: `inset 0 0 10px ${service.color}15`,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{
                          transform: isAnimated ? 'translateY(0)' : 'translateY(20px)',
                          opacity: isAnimated ? 1 : 0,
                          transition: 'all 0.5s ease',
                          transitionDelay: `${index * 0.1 + 0.4}s`,
                          fontSize: '1rem',
                          lineHeight: 1.7,
                          mb: 0
                        }}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Expertise;