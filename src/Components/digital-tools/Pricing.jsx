import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

const plans = [
  {
    title: 'Basic Website',
    price: '$2,999',
    period: 'starting at',
    description: 'Professional Wix website for small businesses',
    features: [
      'Custom Wix Design',
      'Mobile Responsive',
      'Basic SEO Setup',
      'Contact Forms',
      'Social Media Integration',
      '2 Rounds of Revisions'
    ],
    color: '#2196f3',
    popular: false
  },
  {
    title: 'Custom Web App',
    price: '$4,999',
    period: 'starting at',
    description: 'Full-stack MERN application for business needs',
    features: [
      'Custom MERN Development',
      'User Authentication',
      'Database Integration',
      'API Development',
      'Admin Dashboard',
      'Performance Optimization',
      'Technical Documentation',
      '3 Months Support'
    ],
    color: '#4caf50',
    popular: true
  },
  {
    title: 'Mobile App',
    price: '$3,999',
    period: 'starting at',
    description: 'Cross-platform React Native mobile application',
    features: [
      'React Native Development',
      'iOS & Android Apps',
      'Push Notifications',
      'API Integration',
      'App Store Submission',
      'Performance Testing',
      'Bug Fixes',
      '3 Months Support'
    ],
    color: '#9c27b0',
    popular: false
  }
];

const Pricing = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
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
      />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          textAlign="center"
          sx={{
            fontWeight: 800,
            mb: 3,
            background: 'linear-gradient(45deg, #2196f3, #9c27b0)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            letterSpacing: '-0.5px'
          }}
        >
          Development Packages
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{
            mb: 8,
            maxWidth: '800px',
            mx: 'auto',
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            lineHeight: 1.6,
            opacity: 0.9
          }}
        >
          Choose the perfect development package for your business needs.
          All packages include consultation and customization options.
        </Typography>

        <Grid container spacing={4} alignItems="stretch">
          {plans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 4,
                  boxShadow: theme.shadows[isDark ? 4 : 1],
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[isDark ? 8 : 4]
                  }
                }}
              >
                {plan.popular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: -35,
                      transform: 'rotate(45deg)',
                      backgroundColor: plan.color,
                      color: 'white',
                      px: 4,
                      py: 0.5,
                      zIndex: 1,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    <StarIcon sx={{ mr: 0.5, fontSize: '0.9rem', verticalAlign: 'middle' }} />
                    Popular
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1, p: { xs: 3, md: 4 } }}>
                  <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: plan.color,
                      fontSize: { xs: '1.75rem', md: '2rem' }
                    }}
                  >
                    {plan.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
                    <Typography
                      variant="h3"
                      component="span"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: '2.5rem', md: '3rem' }
                      }}
                    >
                      {plan.price}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ ml: 1, fontSize: '1.1rem' }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 4,
                      color: isDark ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                      fontSize: '1.1rem',
                      lineHeight: 1.5
                    }}
                  >
                    {plan.description}
                  </Typography>
                  <List sx={{ mb: 4 }}>
                    {plan.features.map((feature) => (
                      <ListItem
                        key={feature}
                        sx={{
                          px: 0,
                          py: 1,
                          transition: 'transform 0.2s ease',
                          '&:hover': {
                            transform: 'translateX(8px)'
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon
                            sx={{
                              color: plan.color,
                              fontSize: '1.4rem'
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          sx={{
                            '& .MuiListItemText-primary': {
                              fontSize: '1.1rem',
                              fontWeight: 500
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      mt: 'auto',
                      backgroundColor: plan.color,
                      fontSize: '1.1rem',
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: plan.color,
                        filter: 'brightness(0.9)',
                        transform: 'scale(1.02)'
                      }
                    }}
                  >
                    Get Started
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

export default Pricing;