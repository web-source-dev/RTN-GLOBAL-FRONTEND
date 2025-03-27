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
  },
  {
    title: 'B2B Services',
    description: 'Generate quality leads and build strong relationships in the B2B sector',
    icon: BusinessIcon,
    color: '#4caf50',
    metrics: ['Lead Generation', 'Account-Based Marketing', 'Sales Enablement'],
  },
  {
    title: 'Healthcare',
    description: 'Compliant marketing solutions for healthcare providers and services',
    icon: LocalHospitalIcon,
    color: '#ff9800',
    metrics: ['HIPAA Compliant', 'Patient Engagement', 'Practice Growth'],
  },
  {
    title: 'Education',
    description: 'Connect with students and promote educational programs effectively',
    icon: SchoolIcon,
    color: '#e91e63',
    metrics: ['Student Enrollment', 'Brand Awareness', 'Community Building'],
  },
  {
    title: 'Retail',
    description: 'Integrate online and offline marketing for retail businesses',
    icon: StoreIcon,
    color: '#9c27b0',
    metrics: ['Foot Traffic', 'Online Presence', 'Customer Loyalty'],
  },
  {
    title: 'Food & Beverage',
    description: 'Attract diners and grow your food service business',
    icon: RestaurantIcon,
    color: '#00bcd4',
    metrics: ['Local SEO', 'Social Proof', 'Order Volume'],
  },
];

const Industries = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      py={12}
      sx={{
        background: isDark
          ? 'background.default'
          : 'background.default',
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
          opacity: isDark ? 0.1 : 0.05,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 40%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 40%)`,
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
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Tailored digital marketing solutions for your industry's unique challenges
        </Typography>

        <Grid container spacing={4}>
          {industries.map((industry, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
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
                />
                <CardContent sx={{ p: 4 }}>
                  <IconButton
                    className="industry-icon"
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
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {industry.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {industry.description}
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    {industry.metrics.map((metric, idx) => (
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
                            bgcolor: industry.color,
                            mr: 1.5,
                          },
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
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