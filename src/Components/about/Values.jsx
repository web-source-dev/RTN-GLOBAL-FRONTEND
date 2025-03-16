import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, useTheme, Fade } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SecurityIcon from '@mui/icons-material/Security';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

const Values = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [animatedItems, setAnimatedItems] = useState([]);

  const values = [
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Results-Driven',
      description: 'We focus on delivering measurable outcomes and ROI for our clients through data-driven strategies.',
      color: '#2196f3'
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 40 }} />,
      title: 'Innovation',
      description: 'We stay ahead of digital trends and continuously evolve our strategies to maximize impact.',
      color: '#4caf50'
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 40 }} />,
      title: 'Partnership',
      description: 'We build long-term relationships with our clients, treating their success as our own.',
      color: '#e91e63'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Integrity',
      description: 'We maintain the highest standards of transparency and ethical practices in all our operations.',
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

    const items = document.querySelectorAll('.value-item');
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
              }}
            >
              What Drives Us
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
              Our Values
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
            >
              Our core values guide everything we do, from client interactions to strategy development and implementation
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {values.map((value, index) => {
            const isAnimated = animatedItems.includes(index);
            return (
              <Grid item xs={12} sm={6} md={3} key={index} className="value-item" data-index={index}>
                <Card 
                  elevation={isAnimated ? 6 : 1}
                  sx={{
                    height: '100%',
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: `${index * 0.1}s`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: isDark 
                      ? `linear-gradient(145deg, #2a2a2a, #333333)` 
                      : `linear-gradient(145deg, #ffffff, #f8f8f8)`,
                    boxShadow: `0 10px 20px rgba(0,0,0,0.1), 0 0 10px ${value.color}30`,
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: `0 15px 30px rgba(0,0,0,0.15), 0 0 15px ${value.color}50`
                    }
                  }}
                >
                  {/* Subtle background pattern */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      opacity: 0.05,
                      background: `radial-gradient(circle at 70% 20%, ${value.color}80 0%, transparent 50%)`,
                      zIndex: 0
                    }}
                  />
                  <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                    <Avatar
                      sx={{
                        width: 70,
                        height: 70,
                        backgroundColor: `${value.color}15`,
                        color: value.color,
                        mb: 3,
                        mx: 'auto',
                        boxShadow: `0 0 15px ${value.color}40`,
                        border: `2px solid ${value.color}30`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'rotate(5deg) scale(1.1)',
                          boxShadow: `0 0 20px ${value.color}60`
                        }
                      }}
                    >
                      {value.icon}
                    </Avatar>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 700,
                        mb: 1,
                        color: value.color,
                        textAlign: 'center'
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Divider 
                      sx={{ 
                        width: 40, 
                        height: 3, 
                        backgroundColor: value.color, 
                        mb: 2,
                        mx: 'auto'
                      }} 
                    />
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ textAlign: 'center' }}
                    >
                      {value.description}
                    </Typography>
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

export default Values;