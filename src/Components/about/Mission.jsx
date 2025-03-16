import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, useTheme, Fade, Avatar, Divider } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LanguageIcon from '@mui/icons-material/Language';
import VerifiedIcon from '@mui/icons-material/Verified';
import PeopleIcon from '@mui/icons-material/People';

const Mission = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [animatedItems, setAnimatedItems] = useState([]);

  const features = [
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Drive Results',
      description: 'We focus on delivering measurable results that help our clients achieve their business objectives through data-driven strategies.',
      color: '#2196f3'
    },
    {
      icon: <LanguageIcon sx={{ fontSize: 40 }} />,
      title: 'Global Reach',
      description: 'We help businesses expand their digital presence globally while maintaining local relevance and cultural sensitivity.',
      color: '#4caf50'
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
      title: 'Quality Assurance',
      description: 'We maintain the highest standards in our work, ensuring every project meets our rigorous quality benchmarks.',
      color: '#e91e63'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Client Partnership',
      description: 'We build lasting relationships with our clients, becoming trusted advisors in their digital journey.',
      color: '#ff9800'
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

    const items = document.querySelectorAll('.mission-item');
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
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
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
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 60,
                  height: 3,
                  backgroundColor: 'primary.main',
                  borderRadius: 4
                }
              }}
            >
              Our Mission
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
              Empowering Digital Success
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
            >
              We're committed to transforming businesses through innovative digital marketing solutions that drive growth and create lasting impact.
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={6}>
          {features.map((feature, index) => {
            const isAnimated = animatedItems.includes(index);
            return (
              <Grid 
                item 
                xs={12} 
                md={6} 
                key={index} 
                className="mission-item"
                data-index={index}
              >
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    borderRadius: '16px',
                    background: isDark 
                      ? `linear-gradient(145deg, #2a2a2a, #333333)` 
                      : `linear-gradient(145deg, #ffffff, #f8f8f8)`,
                    borderLeft: `6px solid ${feature.color}`,
                    position: 'relative',
                    overflow: 'hidden',
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'translateY(0)' : index % 2 === 0 ? 'translateY(50px)' : 'translateY(-50px)',
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: `${index * 0.2}s`,
                    boxShadow: `0 15px 30px rgba(0,0,0,0.15), 0 0 15px ${feature.color}50, inset 0 0 10px rgba(255,255,255,0.05)`,
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: `0 20px 40px rgba(0,0,0,0.2), 0 0 20px ${feature.color}60, inset 0 0 15px rgba(255,255,255,0.1)`
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
                        radial-gradient(circle at 10% 0%, ${feature.color}80 0%, transparent 30%),
                        radial-gradient(circle at 90% 90%, ${feature.color}50 0%, transparent 40%)
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
                  <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start' }}>
                    <Avatar
                      sx={{
                        width: 70,
                        height: 70,
                        backgroundColor: `${feature.color}15`,
                        color: feature.color,
                        mr: 3,
                        boxShadow: `0 0 20px ${feature.color}40`,
                        border: `2px solid ${feature.color}50`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'rotate(5deg) scale(1.1)',
                          boxShadow: `0 0 30px ${feature.color}60`
                        }
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: 700,
                          color: feature.color,
                          mb: 1
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Divider sx={{ width: 40, height: 3, backgroundColor: feature.color, mb: 2 }} />
                      <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'left' }}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Mission;