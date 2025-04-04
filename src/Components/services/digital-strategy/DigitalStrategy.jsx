import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
} from '@mui/material';
import StrategyIcon from '@mui/icons-material/Lightbulb';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Helmet } from 'react-helmet-async';

const features = [
  {
    id: 'market-analysis',
    title: 'Market Analysis',
    description: 'In-depth analysis of your market position and competitive landscape',
    icon: AnalyticsIcon,
    color: '#2196f3',
    ariaLabel: 'Learn about our market analysis services'
  },
  {
    id: 'growth-planning',
    title: 'Growth Planning',
    description: 'Strategic roadmap for sustainable digital growth and expansion',
    icon: TrendingUpIcon,
    color: '#4caf50',
    ariaLabel: 'Discover our growth planning strategies'
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    description: 'Comprehensive digital transformation strategies for your business',
    icon: TimelineIcon,
    color: '#ff9800',
    ariaLabel: 'Learn about our digital transformation approach'
  }
];

const benefits = [
  'Increased market share and competitive advantage',
  'Improved ROI on digital investments',
  'Enhanced customer engagement and retention',
  'Streamlined digital operations and processes',
  'Data-driven decision making capabilities',
  'Future-proof business strategies'
];

const DigitalStrategy = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Define structured data for Digital Strategy service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Digital Strategy",
    "provider": {
      "@type": "Organization",
      "name": "RTN Global"
    },
    "description": "Transform your business with data-driven digital strategies that deliver results. We provide market analysis, growth planning, and digital transformation services.",
    "serviceType": "Business Consulting",
    "offers": {
      "@type": "Offer",
      "price": "1000.00",
      "priceCurrency": "USD",
      "description": "Starting price for digital strategy consulting services"
    }
  };

  return (
    <Box component="main" id="digital-strategy-service">
      <Helmet>
        <title>Digital Strategy Services | RTN Global</title>
        <meta name="description" content="Transform your business with data-driven digital strategies that deliver results. Our digital transformation and growth planning services help your business thrive." />
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <Box
        component="section"
        id="digital-strategy-hero"
        aria-labelledby="digital-strategy-heading"
        sx={{
          pt: 15,
          pb: 8,
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
            opacity: 0.1,
            background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 10%),
                        radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 10%)`,
            zIndex: 1
          }}
          aria-hidden="true"
        />
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                component="h1"
                id="digital-strategy-heading"
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
                Digital Strategy
              </Typography>
              <Typography variant="h4" component="p" color="text.secondary" paragraph>
                Transform your business with data-driven digital strategies that deliver results
              </Typography>
              <Button
                variant="contained"
                size="large"
                href="#contact-us"
                aria-label="Get started with digital strategy services"
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                }}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <StrategyIcon
                  sx={{
                    fontSize: '20rem',
                    color: theme.palette.primary.main,
                    opacity: 0.1,
                  }}
                  aria-hidden="true"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container 
        component="section" 
        id="digital-strategy-approach" 
        aria-labelledby="approach-heading"
        sx={{ py: 8 }}
      >
        <Typography
          variant="h2"
          component="h2"
          id="approach-heading"
          textAlign="center"
          sx={{
            fontWeight: 800,
            mb: 6,
          }}
        >
          Our Approach
        </Typography>
        <Grid 
          container 
          spacing={4}
          role="list"
          aria-label="Digital strategy approach features"
        >
          {features.map((feature) => (
            <Grid 
              item 
              xs={12} 
              md={4} 
              key={feature.id}
              role="listitem"
            >
              <Card
                component="article"
                id={`feature-${feature.id}`}
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  },
                }}
                aria-labelledby={`feature-title-${feature.id}`}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${feature.color}15`,
                      color: feature.color,
                      mb: 2,
                    }}
                    aria-hidden="true"
                  >
                    <feature.icon fontSize="large" aria-hidden="true" />
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3"
                    id={`feature-title-${feature.id}`}
                    gutterBottom 
                    sx={{ fontWeight: 'bold' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    color="text.secondary"
                    component="p"
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box
        component="section"
        id="digital-strategy-benefits"
        aria-labelledby="benefits-heading"
        sx={{
          py: 8,
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
            opacity: 0.1,
            background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 10%),
                        radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 10%)`,
            zIndex: 1
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
              mb: 6,
            }}
          >
            Benefits
          </Typography>
          <Grid 
            container 
            spacing={3}
            role="list"
            aria-label="Benefits of digital strategy services"
          >
            {benefits.map((benefit, index) => (
              <Grid 
                item 
                xs={12} 
                md={6} 
                key={`benefit-${index}`}
                role="listitem"
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 3,
                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: theme.palette.primary.main,
                      mr: 2,
                    }}
                    aria-hidden="true"
                  />
                  <Typography variant="h6" component="p">{benefit}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container 
        component="section" 
        id="contact-us" 
        aria-labelledby="cta-heading"
        sx={{ py: 8, textAlign: 'center' }}
      >
        <Typography 
          variant="h3" 
          component="h2"
          id="cta-heading"
          gutterBottom 
          sx={{ fontWeight: 'bold' }}
        >
          Ready to Transform Your Digital Presence?
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}
        >
          Let's work together to create a digital strategy that drives your business forward
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/contact"
          aria-label="Schedule a digital strategy consultation"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
            px: 4,
            py: 1.5,
          }}
        >
          Schedule a Consultation
        </Button>
      </Container>
    </Box>
  );
};

export default DigitalStrategy;