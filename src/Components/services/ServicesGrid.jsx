import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import WebIcon from '@mui/icons-material/Language';
import CodeIcon from '@mui/icons-material/Code';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SpeedIcon from '@mui/icons-material/Speed';
import BrushIcon from '@mui/icons-material/Brush';
import LaunchIcon from '@mui/icons-material/Launch';

const services = [
  {
    id: 'wix-development',
    title: 'Wix Website Development',
    description: 'Professional Wix websites with custom design, functionality, and integrations for small businesses and entrepreneurs',
    icon: WebIcon,
    color: '#2196f3',
    features: ['Custom Design', 'SEO-Friendly', 'Mobile Responsive'],
    path: '/services/wix-development',
    ariaLabel: 'Learn more about Wix Website Development services'
  },
  {
    id: 'mern-stack',
    title: 'MERN Stack Web Apps',
    description: 'Full-stack web applications using MongoDB, Express, React, and Node.js for scalable and dynamic solutions',
    icon: CodeIcon,
    color: '#4caf50',
    features: ['Scalable Architecture', 'Real-time Features', 'API Integration'],
    path: '/services/mern-stack',
    ariaLabel: 'Learn more about MERN Stack Web Application development'
  },
  {
    id: 'react-native',
    title: 'React Native Mobile Apps',
    description: 'Cross-platform mobile applications that deliver native performance for iOS and Android from a single codebase',
    icon: PhoneIphoneIcon,
    color: '#e91e63',
    features: ['Native Performance', 'Cross-Platform', 'Offline Capability'],
    path: '/services/react-native',
    ariaLabel: 'Learn more about React Native Mobile App development'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Solutions',
    description: 'Custom online stores with secure payment processing, inventory management, and seamless user experience',
    icon: StorefrontIcon,
    color: '#ff9800',
    features: ['Secure Checkout', 'Inventory Management', 'Customer Analytics'],
    path: '/services/ecommerce',
    ariaLabel: 'Learn more about E-Commerce Solutions'
  },
  {
    id: 'optimization',
    title: 'Performance Optimization',
    description: 'Speed up your existing web applications with advanced optimization techniques for better user experience',
    icon: SpeedIcon,
    color: '#9c27b0',
    features: ['Fast Loading', 'Core Web Vitals', 'SEO Improvement'],
    path: '/services/optimization',
    ariaLabel: 'Learn more about Performance Optimization services'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'User-centered design that enhances usability, accessibility, and visual appeal of your digital products',
    icon: BrushIcon,
    color: '#00bcd4',
    features: ['User Research', 'Wireframing', 'Prototyping'],
    path: '/services/ui-ux-design',
    ariaLabel: 'Learn more about UI/UX Design services'
  }
];

const ServicesGrid = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="our-services"
      aria-labelledby="services-heading"
      py={12}
      sx={{
        background: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden'
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
          zIndex: 1
        }}
        aria-hidden="true"
      />

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          id="services-heading"
          textAlign="center"
          sx={{
            fontWeight: 800,
            mb: 3,
            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Our Services
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Comprehensive digital marketing solutions to help your business grow
        </Typography>

        <Grid 
          container 
          spacing={4}
          role="list"
          aria-label="Services offered by RTN Global"
        >
          {services.map((service, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={service.id}
              role="listitem"
            >
              <Card
                component="article"
                id={`service-${service.id}`}
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .service-icon': {
                      transform: 'scale(1.1)'
                    }
                  },
                  position: 'relative',
                  overflow: 'hidden'
                }}
                aria-labelledby={`service-title-${service.id}`}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle at top right, ${service.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%'
                  }}
                  aria-hidden="true"
                />
                <CardContent sx={{ p: 4 }}>
                  <IconButton
                    className="service-icon"
                    sx={{
                      mb: 2,
                      bgcolor: `${service.color}15`,
                      color: service.color,
                      transition: 'transform 0.3s ease',
                      '&:hover': { bgcolor: `${service.color}25` }
                    }}
                    size="large"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <service.icon fontSize="large" aria-hidden="true" />
                  </IconButton>

                  <Typography 
                    variant="h5" 
                    component="h3"
                    id={`service-title-${service.id}`}
                    gutterBottom 
                    sx={{ fontWeight: 'bold' }}
                  >
                    {service.title}
                  </Typography>

                  <Typography 
                    color="text.secondary"
                    component="p"
                    paragraph
                  >
                    {service.description}
                  </Typography>

                  <Box 
                    component="ul"
                    sx={{ mt: 3 }}
                    aria-label={`Key features of ${service.title}`}
                    role="list"
                    style={{ padding: 0, listStyle: 'none' }}
                  >
                    {service.features.map((feature, idx) => (
                      <Box
                        component="li"
                        key={idx}
                        role="listitem"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                          '&:before': {
                            content: '""',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: service.color,
                            mr: 1.5
                          }
                        }}
                      >
                        <Typography variant="body2" component="span" color="text.secondary">
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    variant="outlined"
                    endIcon={<LaunchIcon aria-hidden="true" />}
                    fullWidth
                    href={service.path}
                    aria-label={service.ariaLabel}
                    sx={{
                      mt: 3,
                      borderRadius: 2,
                      borderColor: service.color,
                      color: service.color,
                      '&:hover': {
                        borderColor: service.color,
                        bgcolor: `${service.color}10`
                      }
                    }}
                  >
                    Learn More
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

export default ServicesGrid;