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
import HelpIcon from '@mui/icons-material/Help';
import BuildIcon from '@mui/icons-material/Build';
import SecurityIcon from '@mui/icons-material/Security';
import PaymentIcon from '@mui/icons-material/Payment';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SupportIcon from '@mui/icons-material/Support';

const categories = [
  {
    title: 'Getting Started',
    description: 'Learn the basics and get up and running quickly',
    icon: HelpIcon,
    color: '#2196f3',
    count: 12
  },
  {
    title: 'Technical Support',
    description: 'Technical issues and troubleshooting guides',
    icon: BuildIcon,
    color: '#4caf50',
    count: 15
  },
  {
    title: 'Security & Privacy',
    description: 'Information about data protection and privacy',
    icon: SecurityIcon,
    color: '#ff9800',
    count: 8
  },
  {
    title: 'Billing & Payments',
    description: 'Questions about pricing, billing and subscriptions',
    icon: PaymentIcon,
    color: '#e91e63',
    count: 10
  },
  {
    title: 'Integrations',
    description: 'Connect and use with other platforms and tools',
    icon: IntegrationInstructionsIcon,
    color: '#9c27b0',
    count: 9
  },
  {
    title: 'Account Support',
    description: 'Managing your account and user settings',
    icon: SupportIcon,
    color: '#00bcd4',
    count: 11
  }
];

const FaqCategories = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      py={8}
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
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
          FAQ Categories
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Browse through our comprehensive FAQ sections to find the answers you need
        </Typography>

        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .category-icon': {
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
                    background: `radial-gradient(circle at top right, ${category.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%',
                  }}
                />
                <CardContent sx={{ p: 4 }}>
                  <IconButton
                    className="category-icon"
                    sx={{
                      mb: 2,
                      bgcolor: `${category.color}15`,
                      color: category.color,
                      transition: 'transform 0.3s ease',
                      '&:hover': { bgcolor: `${category.color}25` },
                    }}
                    size="large"
                  >
                    <category.icon fontSize="large" />
                  </IconButton>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {category.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {category.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 2,
                      py: 0.5,
                      bgcolor: `${category.color}15`,
                      color: category.color,
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    {category.count} Articles
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

export default FaqCategories;