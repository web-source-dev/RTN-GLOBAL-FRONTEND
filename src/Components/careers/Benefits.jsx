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
  },
  {
    title: 'Flexible Hours',
    description: 'Work-life balance with flexible scheduling',
    icon: WorkflexIcon,
    color: '#4caf50',
  },
  {
    title: 'Learning & Development',
    description: 'Continuous learning opportunities and career growth',
    icon: SchoolIcon,
    color: '#ff9800',
  },
  {
    title: 'Competitive Salary',
    description: 'Above-market compensation and performance bonuses',
    icon: PaidIcon,
    color: '#e91e63',
  },
  {
    title: 'Paid Time Off',
    description: 'Generous vacation policy and paid holidays',
    icon: FlightIcon,
    color: '#9c27b0',
  },
  {
    title: 'Wellness Benefits',
    description: 'Gym memberships and wellness programs',
    icon: FitnessCenterIcon,
    color: '#00bcd4',
  },
];

const Benefits = () => {
  const theme = useTheme();

  return (
    <Box 
      py={12} 
      sx={{ 
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)'
      }}
    >
      <Container>
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
          Employee Benefits
        </Typography>
        <Typography
          variant="h5"
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
                sx={{
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <IconButton
                    sx={{
                      mb: 2,
                      bgcolor: `${benefit.color}15`,
                      color: benefit.color,
                      '&:hover': { bgcolor: `${benefit.color}25` },
                    }}
                    size="large"
                  >
                    <benefit.icon fontSize="large" />
                  </IconButton>
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {benefit.title}
                  </Typography>
                  <Typography color="text.secondary">
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