import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, IconButton, Button, useTheme, useMediaQuery } from '@mui/material';
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
    description: 'Professional custom Wix websites with tailored design, advanced functionality, and third-party integrations for small businesses and entrepreneurs.',
    icon: WebIcon,
    color: '#2196f3',
    metrics: ['Custom Website Design', 'SEO-Friendly Optimization', 'Mobile Responsive Layouts'],
  },
  {
    title: 'MERN Stack Web Applications',
    description: 'Full-stack web applications using MongoDB, Express.js, React, and Node.js for scalable and dynamic business solutions with robust performance.',
    icon: CodeIcon,
    color: '#4caf50',
    metrics: ['Scalable Application Architecture', 'Real-time Web Features', 'API Integration & Development'],
  },
  {
    title: 'React Native Mobile Applications',
    description: 'Cross-platform mobile applications that deliver native performance for iOS and Android from a single codebase, saving development time and cost.',
    icon: PhoneIphoneIcon,
    color: '#e91e63',
    metrics: ['Native Mobile Performance', 'Cross-Platform Development', 'Offline Mobile Capability'],
  },
  {
    title: 'E-Commerce Website Solutions',
    description: 'Custom online stores with secure payment processing, inventory management, and seamless user experience optimized for maximum conversion rates.',
    icon: StorefrontIcon,
    color: '#ff9800',
    metrics: ['Secure Checkout Systems', 'Inventory Management Tools', 'Customer Analytics Dashboard'],
  },
  {
    title: 'Website Performance Optimization',
    description: 'Speed up your existing websites and web applications with advanced optimization techniques for better user experience and improved search rankings.',
    icon: SpeedIcon,
    color: '#9c27b0',
    metrics: ['Fast Loading Websites', 'Core Web Vitals Optimization', 'SEO Performance Improvement'],
  },
  {
    title: 'UI/UX Website Design',
    description: 'User-centered design that enhances usability, accessibility, and visual appeal of your digital products and business websites for better engagement.',
    icon: BrushIcon,
    color: '#00bcd4',
    metrics: ['User Experience Research', 'Website Wireframing', 'Interactive Prototyping'],
  },
];

const Services = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box 
      component="section"
      id="services-section"
      aria-label="Web Development Services"
      py={12} 
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.background.default,
      }}
    >
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
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            component="p"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              display: 'block',
              mb: 2,
            }}
          >
            Professional Web Development Services
          </Typography>
          <Typography
            variant="h2"
            component="h2"
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
            Custom Web Development Solutions
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
          >
            Build fast, scalable, and user-friendly digital experiences with our expert web development team
          </Typography>
        </Box>

        <Grid container spacing={4} component="ul" sx={{ listStyle: 'none', p: 0 }}>
          {services.slice(isMobile ? 3 : 0).map((service, index) => (
            <Grid item xs={12} md={6} lg={4} key={index} component="li">
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
                    aria-hidden="true"
                    sx={{
                      mb: 3,
                      bgcolor: `${service.color}15`,
                      color: service.color,
                      transition: 'transform 0.3s ease',
                      '&:hover': { bgcolor: `${service.color}25` },
                    }}
                    size="large"
                    tabIndex={-1}
                  >
                    <service.icon fontSize="large" />
                  </IconButton>
                  <Typography variant="h3" component="h3" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary, fontSize: '1.5rem' }}>
                    {service.title}
                  </Typography>
                  <Typography component="p" color="text.secondary" paragraph>
                    {service.description}
                  </Typography>

                  <Box component="ul" aria-label={`${service.title} features`} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3, listStyle: 'none', padding: 0 }}>
                    {service.metrics.map((metric, idx) => (
                      <Box
                        key={idx}
                        component="li"
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
                          aria-hidden="true"
                        />
                        <Typography component="span" variant="body2" color="text.secondary" fontWeight={500}>
                          {metric}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    className="learn-more"
                    endIcon={<ArrowForwardIcon className="arrow-icon" />}
                    aria-label={`Learn more about ${service.title}`}
                    sx={{
                      textTransform: 'none',
                      p: 0,
                      color: theme.palette.text.secondary,
                      '& .arrow-icon': {
                        transition: 'transform 0.3s ease',
                      },
                    }}
                  >
                    Learn more about {service.title}
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
