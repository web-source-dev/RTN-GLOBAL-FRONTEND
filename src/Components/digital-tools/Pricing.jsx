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
    title: 'Starter',
    price: '$99',
    period: '/month',
    description: 'Perfect for small businesses starting their digital journey',
    features: [
      'Basic Analytics Dashboard',
      'Social Media Management',
      'Email Marketing Tools',
      'Basic SEO Tools',
      '5 Team Members',
      'Email Support'
    ],
    color: '#2196f3',
    popular: false
  },
  {
    title: 'Professional',
    price: '$199',
    period: '/month',
    description: 'Ideal for growing businesses with advanced needs',
    features: [
      'Advanced Analytics',
      'Campaign Management',
      'Marketing Automation',
      'Advanced SEO Suite',
      '15 Team Members',
      'Priority Support',
      'API Access',
      'Custom Reports'
    ],
    color: '#4caf50',
    popular: true
  },
  {
    title: 'Enterprise',
    price: '$399',
    period: '/month',
    description: 'Full-featured solution for large organizations',
    features: [
      'Enterprise Analytics',
      'Custom Integrations',
      'Dedicated Account Manager',
      'White-label Options',
      'Unlimited Team Members',
      '24/7 Premium Support',
      'Custom Development',
      'Training Sessions'
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
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
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
          Pricing Plans
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Choose the perfect plan for your business needs
        </Typography>

        <Grid container spacing={4} alignItems="stretch">
          {plans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  transform: plan.popular ? 'scale(1.05)' : 'none',
                  '&:hover': {
                    transform: plan.popular ? 'scale(1.08)' : 'scale(1.03)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  }
                }}
              >
                {plan.popular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: plan.color,
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      gap: 1
                    }}
                  >
                    <StarIcon fontSize="small" />
                    Most Popular
                  </Box>
                )}

                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: plan.color, fontWeight: 700 }}
                  >
                    {plan.title}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                    <Typography variant="h2" component="span" fontWeight="bold">
                      {plan.price}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="span"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>

                  <Typography color="text.secondary" paragraph>
                    {plan.description}
                  </Typography>

                  <List sx={{ mb: 4 }}>
                    {plan.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon sx={{ color: plan.color }} />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    variant={plan.popular ? 'contained' : 'outlined'}
                    fullWidth
                    size="large"
                    sx={{
                      mt: 'auto',
                      borderRadius: 2,
                      bgcolor: plan.popular ? plan.color : 'transparent',
                      borderColor: plan.color,
                      color: plan.popular ? 'white' : plan.color,
                      '&:hover': {
                        bgcolor: plan.popular ? plan.color : `${plan.color}10`,
                        borderColor: plan.color,
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