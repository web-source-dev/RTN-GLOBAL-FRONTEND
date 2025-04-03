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
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import WorkflexIcon from '@mui/icons-material/Watch';
import SchoolIcon from '@mui/icons-material/School';
import PaidIcon from '@mui/icons-material/Paid';
import FlightIcon from '@mui/icons-material/Flight';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const benefits = [
  {
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance and wellness programs',
    icon: HealthAndSafetyIcon,
    color: '#2196f3',
    id: 'health-wellness'
  },
  {
    title: 'Flexible Hours',
    description: 'Work-life balance with flexible scheduling',
    icon: WorkflexIcon,
    color: '#4caf50',
    id: 'flexible-hours'
  },
  {
    title: 'Learning & Development',
    description: 'Continuous learning opportunities and career growth',
    icon: SchoolIcon,
    color: '#ff9800',
    id: 'learning-development'
  },
  {
    title: 'Competitive Salary',
    description: 'Above-market compensation and performance bonuses',
    icon: PaidIcon,
    color: '#e91e63',
    id: 'competitive-salary'
  },
  {
    title: 'Paid Time Off',
    description: 'Generous vacation policy and paid holidays',
    icon: FlightIcon,
    color: '#9c27b0',
    id: 'paid-time-off'
  },
  {
    title: 'Wellness Benefits',
    description: 'Gym memberships and wellness programs',
    icon: FitnessCenterIcon,
    color: '#00bcd4',
    id: 'wellness-benefits'
  },
];

const Benefits = () => {
  const theme = useTheme();

  return (
    <Box 
      component="section"
      id="employee-benefits"
      aria-labelledby="benefits-heading"
      py={12} 
      sx={{ 
            background: theme.palette.background.default,
            position: 'relative',
            overflow: 'hidden',
            py: { xs: 4, md: 12 },
      }}
    >
       {/* Background Pattern with enhanced animation */}
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
          id="benefits-heading"
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
          Employee Benefits
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          We offer comprehensive benefits to support your health, wealth, and career growth
        </Typography>

        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                component="article"
                id={benefit.id}
                sx={{
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle at top right, ${benefit.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%',
                  }}
                  aria-hidden="true"
                />
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <IconButton
                    aria-label={benefit.title}
                    sx={{
                      mb: 2,
                      bgcolor: `${benefit.color}15`,
                      color: benefit.color,
                      '&:hover': { bgcolor: `${benefit.color}25` },
                    }}
                    size="large"
                  >
                    <benefit.icon fontSize="large" aria-hidden="true" />
                  </IconButton>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    {benefit.title}
                  </Typography>
                  <Typography component="p" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Benefits;