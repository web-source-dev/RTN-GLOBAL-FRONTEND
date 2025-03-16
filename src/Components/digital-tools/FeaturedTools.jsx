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
    image: '/images/tools/ecommerce-platform.jpg',
    features: [
      'Custom product catalog',
      'Secure payment integration',
      'Inventory management',
      'Order tracking system'
    ],
    price: 'Starting at $2,999',
    popular: true
  },
  {
    title: 'Enterprise Web Portal',
    description: 'Full-stack MERN application for business process management',
    image: '/images/tools/enterprise-portal.jpg',
    features: [
      'User authentication',
      'Real-time data sync',
      'Custom dashboard',
      'API integration'
    ],
    price: 'Starting at $4,999',
    popular: true
  },
  {
    title: 'Mobile Delivery App',
    description: 'React Native app for seamless delivery management',
    image: '/images/tools/mobile-app.jpg',
    features: [
      'GPS tracking',
      'Push notifications',
      'Payment processing',
      'Route optimization'
    ],
    price: 'Starting at $3,999',
    popular: false
  }
];

const FeaturedTools = () => {
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
                    alt={tool.title}
                    sx={{
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      objectFit: 'cover'
                    }}
                  />
                  {tool.popular && (
                    <Box
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
                    component="h2"
                    sx={{ fontWeight: 600 }}
                  >
                    {tool.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 2 }}
                  >
                    {tool.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {tool.features.map((feature) => (
                      <Typography
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
                    color="primary"
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    {tool.price}
                  </Typography>
                  <Button
                    variant="contained"
                    endIcon={<LaunchIcon />}
                    fullWidth
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