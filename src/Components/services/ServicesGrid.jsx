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
    title: 'Wix Website Development',
    description: 'Professional Wix websites with custom design, functionality, and integrations for small businesses and entrepreneurs',
    icon: WebIcon,
    color: '#2196f3',
    features: ['Custom Design', 'SEO-Friendly', 'Mobile Responsive'],
    path: '/services/wix-development'
  },
  {
    title: 'MERN Stack Web Apps',
    description: 'Full-stack web applications using MongoDB, Express, React, and Node.js for scalable and dynamic solutions',
    icon: CodeIcon,
    color: '#4caf50',
    features: ['Scalable Architecture', 'Real-time Features', 'API Integration'],
    path: '/services/mern-stack'
  },
  {
    title: 'React Native Mobile Apps',
    description: 'Cross-platform mobile applications that deliver native performance for iOS and Android from a single codebase',
    icon: PhoneIphoneIcon,
    color: '#e91e63',
    features: ['Native Performance', 'Cross-Platform', 'Offline Capability'],
    path: '/services/react-native'
  },
  {
    title: 'E-Commerce Solutions',
    description: 'Custom online stores with secure payment processing, inventory management, and seamless user experience',
    icon: StorefrontIcon,
    color: '#ff9800',
    features: ['Secure Checkout', 'Inventory Management', 'Customer Analytics'],
    path: '/services/ecommerce'
  },
  {
    title: 'Performance Optimization',
    description: 'Speed up your existing web applications with advanced optimization techniques for better user experience',
    icon: SpeedIcon,
    color: '#9c27b0',
    features: ['Fast Loading', 'Core Web Vitals', 'SEO Improvement'],
    path: '/services/optimization'
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design that enhances usability, accessibility, and visual appeal of your digital products',
    icon: BrushIcon,
    color: '#00bcd4',
    features: ['User Research', 'Wireframing', 'Prototyping'],
    path: '/services/ui-ux-design'
  }
];

const ServicesGrid = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      py={12}
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
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
          opacity: isDark ? 0.1 : 0.05,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 40%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 40%)`,
          zIndex: 1
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
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
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Comprehensive digital marketing solutions to help your business grow
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
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
                  >
                    <service.icon fontSize="large" />
                  </IconButton>

                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {service.title}
                  </Typography>

                  <Typography color="text.secondary" paragraph>
                    {service.description}
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    {service.features.map((feature, idx) => (
                      <Box
                        key={idx}
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
                        <Typography variant="body2" color="text.secondary">
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    variant="outlined"
                    endIcon={<LaunchIcon />}
                    fullWidth
                    href={service.path}
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