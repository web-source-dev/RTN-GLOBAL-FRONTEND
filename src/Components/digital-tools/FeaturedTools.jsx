import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const featuredTools = [
  {
    title: 'E-commerce Platform',
    description: 'Custom Wix website with advanced e-commerce capabilities',
    image: '/images/Tools/ecomtool.png',
    imageAlt: 'E-commerce platform user interface showing product catalog and shopping cart',
    features: [
      'Custom product catalog',
      'Secure payment integration',
      'Inventory management',
      'Order tracking system'
    ],
    price: 'Starting at $2,999',
    popular: true,
    id: 'ecommerce-platform'
  },
  {
    title: 'Enterprise Web Portal',
    description: 'Full-stack MERN application for business process management',
    image: '/images/Tools/WebPortal.png',
    imageAlt: 'Enterprise web portal dashboard with data visualization and user management',
    features: [
      'User authentication',
      'Real-time data sync',
      'Custom dashboard',
      'API integration'
    ],
    price: 'Starting at $4,999',
    popular: true,
    id: 'enterprise-web-portal'
  },
  {
    title: 'Mobile Delivery App',
    description: 'React Native app for seamless delivery management',
    image: '/images/Tools/MobileApp.jpg',
    imageAlt: 'Mobile delivery app interface showing map navigation and order tracking',
    features: [
      'GPS tracking',
      'Push notifications',
      'Payment processing',
      'Route optimization'
    ],
    price: 'Starting at $3,999',
    popular: false,
    id: 'mobile-delivery-app'
  }
];

const FeaturedTools = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="featured-projects"
      aria-labelledby="featured-projects-heading"
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
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          id="featured-projects-heading"
          textAlign="center"
          sx={{
            fontWeight: 800,
            mb: 3,
            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              borderRadius: '2px'
            }
          }}
        >
          Featured Projects
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 8, maxWidth: '800px', mx: 'auto', opacity: 0.9 }}
        >
          Explore our showcase of custom web and mobile solutions that demonstrate
          our expertise in creating scalable digital experiences.
        </Typography>

        <Grid container spacing={4}>
          {featuredTools.map((tool) => (
            <Grid item xs={12} md={4} key={tool.title}>
              <Card
                component="article"
                id={tool.id}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8],
                    '& .MuiCardMedia-root': {
                      transform: 'scale(1.05)'
                    }
                  }
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={tool.image}
                    alt={tool.imageAlt}
                    loading="lazy"
                    sx={{
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      objectFit: 'cover'
                    }}
                  />
                  {tool.popular && (
                    <Box
                      component="span"
                      role="presentation"
                      aria-hidden="true"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: -28,
                        transform: 'rotate(45deg)',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        px: 4,
                        py: 0.5,
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        zIndex: 1
                      }}
                    >
                      Popular
                    </Box>
                  )}
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 600 }}
                  >
                    {tool.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 2 }}
                  >
                    {tool.description}
                  </Typography>
                  <Box 
                    component="ul"
                    sx={{ 
                      mt: 2,
                      pl: 0,
                      listStyle: 'none'
                    }}
                  >
                    {tool.features.map((feature) => (
                      <Typography
                        component="li"
                        key={feature}
                        variant="body2"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                          color: 'text.primary',
                          '&::before': {
                            content: '"•"',
                            color: 'primary.main',
                            fontSize: '1.2rem',
                            mr: 1
                          }
                        }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                <Box
                  sx={{
                    p: 3,
                    pt: 2,
                    mt: 'auto',
                    borderTop: 1,
                    borderColor: 'divider',
                    bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'
                  }}
                >
                  <Typography
                    variant="h6"
                    component="p"
                    color="primary"
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    {tool.price}
                  </Typography>
                  <Button
                    variant="contained"
                    endIcon={<LaunchIcon />}
                    fullWidth
                    aria-label={`View details for ${tool.title}`}
                    sx={{
                      textTransform: 'none',
                      py: 1.5,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4]
                      }
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedTools;