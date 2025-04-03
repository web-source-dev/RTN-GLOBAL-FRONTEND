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
import EmailIcon from '@mui/icons-material/Email';
import CampaignIcon from '@mui/icons-material/Campaign';
import GroupIcon from '@mui/icons-material/Group';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Helmet } from 'react-helmet-async';

const features = [
  {
    id: 'campaign-strategy',
    title: 'Campaign Strategy',
    description: 'Develop targeted email campaigns that drive engagement and conversions',
    icon: EmailIcon,
    color: '#2196f3',
    ariaLabel: 'Learn about our email campaign strategy services'
  },
  {
    id: 'personalization',
    title: 'Personalization',
    description: 'Create personalized content that resonates with your audience segments',
    icon: CampaignIcon,
    color: '#4caf50',
    ariaLabel: 'Discover our email personalization services'
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Streamline your email marketing with powerful automation workflows',
    icon: GroupIcon,
    color: '#ff9800',
    ariaLabel: 'Learn about our email automation capabilities'
  }
];

const benefits = [
  'Higher conversion rates',
  'Improved customer retention',
  'Better ROI than other channels',
  'Direct customer communication',
  'Measurable results',
  'Scalable marketing solution'
];

const EmailMarketing = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Define structured data for Email Marketing service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Email Marketing",
    "provider": {
      "@type": "Organization",
      "name": "RTN Global"
    },
    "description": "Drive engagement and conversions with targeted email campaigns. We provide campaign strategy, personalization, and automation services.",
    "serviceType": "Digital Marketing",
    "offers": {
      "@type": "Offer",
      "price": "600.00",
      "priceCurrency": "USD",
      "description": "Starting price for email marketing services"
    }
  };

  return (
    <Box component="main" id="email-marketing-service">
      <Helmet>
        <title>Email Marketing Services | RTN Global</title>
        <meta name="description" content="Drive engagement and conversions with targeted email campaigns. Our email marketing services include campaign strategy, personalization, and automation workflows." />
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <Box
        component="section"
        id="email-marketing-hero"
        aria-labelledby="email-marketing-heading"
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
                id="email-marketing-heading"
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
                Email Marketing
              </Typography>
              <Typography variant="h4" component="p" color="text.secondary" paragraph>
                Drive engagement and conversions with targeted email campaigns
              </Typography>
              <Button
                variant="contained"
                size="large"
                href="#contact-us"
                aria-label="Get started with email marketing services"
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
                <EmailIcon
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
        id="email-marketing-services" 
        aria-labelledby="services-heading"
        sx={{ py: 8 }}
      >
        <Typography
          variant="h2"
          component="h2"
          id="services-heading"
          textAlign="center"
          sx={{
            fontWeight: 800,
            mb: 6,
          }}
        >
          Our Email Marketing Services
        </Typography>
        <Grid 
          container 
          spacing={4}
          role="list"
          aria-label="Email marketing services"
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
        id="email-marketing-benefits"
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
            Benefits of Email Marketing
          </Typography>
          <Grid 
            container 
            spacing={3}
            role="list"
            aria-label="Benefits of email marketing"
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
          Ready to Start Email Marketing?
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}
        >
          Let's create email campaigns that engage your audience and drive conversions
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/contact"
          aria-label="Start your email marketing campaign"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
            px: 4,
            py: 1.5,
          }}
        >
          Start Your Email Campaign
        </Button>
      </Container>
    </Box>
  );
};

export default EmailMarketing;