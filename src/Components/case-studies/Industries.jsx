import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import BusinessIcon from '@mui/icons-material/Business';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const industries = [
  {
    title: 'E-commerce',
    description: 'Drive online sales and optimize customer experience for e-commerce businesses',
    icon: ShoppingBagIcon,
    color: '#2196f3',
    metrics: ['200% Revenue Growth', 'Enhanced UX', 'Cart Recovery'],
    id: 'ecommerce',
  },
  {
    title: 'B2B Services',
    description: 'Generate quality leads and build strong relationships in the B2B sector',
    icon: BusinessIcon,
    color: '#4caf50',
    metrics: ['Lead Generation', 'Account-Based Marketing', 'Sales Enablement'],
    id: 'b2b-services',
  },
  {
    title: 'Healthcare',
    description: 'Compliant marketing solutions for healthcare providers and services',
    icon: LocalHospitalIcon,
    color: '#ff9800',
    metrics: ['HIPAA Compliant', 'Patient Engagement', 'Practice Growth'],
    id: 'healthcare',
  },
  {
    title: 'Education',
    description: 'Connect with students and promote educational programs effectively',
    icon: SchoolIcon,
    color: '#e91e63',
    metrics: ['Student Enrollment', 'Brand Awareness', 'Community Building'],
    id: 'education',
  },
  {
    title: 'Retail',
    description: 'Integrate online and offline marketing for retail businesses',
    icon: StoreIcon,
    color: '#9c27b0',
    metrics: ['Foot Traffic', 'Online Presence', 'Customer Loyalty'],
    id: 'retail',
  },
  {
    title: 'Food & Beverage',
    description: 'Attract diners and grow your food service business',
    icon: RestaurantIcon,
    color: '#00bcd4',
    metrics: ['Local SEO', 'Social Proof', 'Order Volume'],
    id: 'food-beverage',
  },
];

const Industries = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="industries-we-serve"
      aria-labelledby="industries-heading"
      py={12}
      sx={{
        background: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
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
          id="industries-heading"
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
          Industries We Serve
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Tailored digital marketing solutions for your industry's unique challenges
        </Typography>

        <Grid container spacing={4} role="list">
          {industries.map((industry, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} role="listitem">
              <Card
                component="article"
                id={industry.id}
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .industry-icon': {
                      transform: 'scale(1.1)',
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
                    background: `radial-gradient(circle at top right, ${industry.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%',
                  }}
                  aria-hidden="true"
                />
                <CardContent sx={{ p: 4 }}>
                  <IconButton
                    className="industry-icon"
                    aria-hidden="true"
                    sx={{
                      mb: 2,
                      bgcolor: `${industry.color}15`,
                      color: industry.color,
                      transition: 'transform 0.3s ease',
                      '&:hover': { bgcolor: `${industry.color}25` },
                    }}
                    size="large"
                  >
                    <industry.icon fontSize="large" />
                  </IconButton>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    {industry.title}
                  </Typography>
                  <Typography component="p" color="text.secondary" paragraph>
                    {industry.description}
                  </Typography>
                  <Box 
                    component="ul" 
                    aria-label={`${industry.title} benefits`} 
                    sx={{ 
                      mt: 3, 
                      pl: 0, 
                      listStyle: 'none' 
                    }}
                  >
                    {industry.metrics.map((metric, idx) => (
                      <Box
                        component="li"
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
                            bgcolor: industry.color,
                            mr: 1.5,
                          },
                        }}
                      >
                        <Typography variant="body2" component="span" color="text.secondary">
                          {metric}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Industries;