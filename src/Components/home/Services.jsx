import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, IconButton, Button, useTheme } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import CodeIcon from '@mui/icons-material/Code';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SpeedIcon from '@mui/icons-material/Speed';
import BrushIcon from '@mui/icons-material/Brush';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const services = [
  {
    title: 'Wix Website Development',
    description: 'Professional Wix websites with custom design, functionality, and integrations for small businesses and entrepreneurs',
    icon: WebIcon,
    color: '#2196f3',
    metrics: ['Custom Design', 'SEO-Friendly', 'Mobile Responsive'],
  },
  {
    title: 'MERN Stack Web Apps',
    description: 'Full-stack web applications using MongoDB, Express, React, and Node.js for scalable and dynamic solutions',
    icon: CodeIcon,
    color: '#4caf50',
    metrics: ['Scalable Architecture', 'Real-time Features', 'API Integration'],
  },
  {
    title: 'React Native Mobile Apps',
    description: 'Cross-platform mobile applications that deliver native performance for iOS and Android from a single codebase',
    icon: PhoneIphoneIcon,
    color: '#e91e63',
    metrics: ['Native Performance', 'Cross-Platform', 'Offline Capability'],
  },
  {
    title: 'E-Commerce Solutions',
    description: 'Custom online stores with secure payment processing, inventory management, and seamless user experience',
    icon: StorefrontIcon,
    color: '#ff9800',
    metrics: ['Secure Checkout', 'Inventory Management', 'Customer Analytics'],
  },
  {
    title: 'Performance Optimization',
    description: 'Speed up your existing web applications with advanced optimization techniques for better user experience',
    icon: SpeedIcon,
    color: '#9c27b0',
    metrics: ['Fast Loading', 'Core Web Vitals', 'SEO Improvement'],
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design that enhances usability, accessibility, and visual appeal of your digital products',
    icon: BrushIcon,
    color: '#00bcd4',
    metrics: ['User Research', 'Wireframing', 'Prototyping'],
  },
];

const Services = () => {
  const theme = useTheme();
  
  return (
    <Box py={12} sx={{ 
      background: theme.palette.mode === 'light' 
        ? 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)' 
        : 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)'
    }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            component="span"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              display: 'block',
              mb: 2,
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Custom Web Solutions
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
          >
            Build fast, scalable, and user-friendly digital experiences with our expert team
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  bgcolor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .service-icon': {
                      transform: 'scale(1.1)',
                    },
                    '& .learn-more': {
                      color: service.color,
                      '& .arrow-icon': {
                        transform: 'translateX(4px)',
                      },
                    },
                  },
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle at top right, ${service.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%',
                  }}
                />
                <CardContent sx={{ p: 4 }}>
                  <IconButton
                    className="service-icon"
                    sx={{
                      mb: 3,
                      bgcolor: `${service.color}15`,
                      color: service.color,
                      transition: 'transform 0.3s ease',
                      '&:hover': { bgcolor: `${service.color}25` },
                    }}
                    size="large"
                  >
                    <service.icon fontSize="large" />
                  </IconButton>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    {service.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {service.description}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {service.metrics.map((metric, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: service.color,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          {metric}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    className="learn-more"
                    endIcon={<ArrowForwardIcon className="arrow-icon" />}
                    sx={{
                      textTransform: 'none',
                      p: 0,
                      color: theme.palette.text.secondary,
                      '& .arrow-icon': {
                        transition: 'transform 0.3s ease',
                      },
                    }}
                  >
                    Learn more
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
