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
    count: 12,
    id: 'getting-started'
  },
  {
    title: 'Technical Support',
    description: 'Technical issues and troubleshooting guides',
    icon: BuildIcon,
    color: '#4caf50',
    count: 15,
    id: 'technical-support'
  },
  {
    title: 'Security & Privacy',
    description: 'Information about data protection and privacy',
    icon: SecurityIcon,
    color: '#ff9800',
    count: 8,
    id: 'security-privacy'
  },
  {
    title: 'Billing & Payments',
    description: 'Questions about pricing, billing and subscriptions',
    icon: PaymentIcon,
    color: '#e91e63',
    count: 10,
    id: 'billing-payments'
  },
  {
    title: 'Integrations',
    description: 'Connect and use with other platforms and tools',
    icon: IntegrationInstructionsIcon,
    color: '#9c27b0',
    count: 9,
    id: 'integrations'
  },
  {
    title: 'Account Support',
    description: 'Managing your account and user settings',
    icon: SupportIcon,
    color: '#00bcd4',
    count: 11,
    id: 'account-support'
  }
];

const FaqCategories = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="faq-categories"
      aria-labelledby="faq-categories-heading"
      py={8}
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
          id="faq-categories-heading"
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
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Browse through our comprehensive FAQ sections to find the answers you need
        </Typography>

        <Grid container spacing={4} role="list">
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} role="listitem">
              <Card
                component="article"
                id={category.id}
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
                  aria-hidden="true"
                />
                <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                  <IconButton
                    className="category-icon"
                    aria-hidden="true"
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
                  <Typography 
                    variant="h5" 
                    component="h3"
                    gutterBottom 
                    sx={{ fontWeight: 600 }}
                  >
                    {category.title}
                  </Typography>
                  <Typography 
                    component="p"
                    color="text.secondary" 
                    paragraph
                  >
                    {category.description}
                  </Typography>
                  <Box
                    component="span"
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