import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Helmet } from 'react-helmet-async';

const PricingTier = ({ title, price, features, isPopular }) => (
  <Paper
    elevation={isPopular ? 8 : 1}
    sx={{
      p: 4,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-8px)'
      }
    }}
    component="article"
    aria-labelledby={`pricing-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
  >
    {isPopular && (
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          backgroundColor: 'primary.main',
          color: 'white',
          px: 2,
          py: 0.5,
          borderRadius: 1
        }}
        aria-label="Most popular plan"
        role="note"
      >
        Most Popular
      </Box>
    )}
    <Typography 
      variant="h4" 
      component="h2" 
      gutterBottom
      id={`pricing-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {title}
    </Typography>
    <Typography variant="h3" component="p" gutterBottom>
      ${price}
      <Typography component="span" variant="subtitle1" aria-label={`per month`}>/month</Typography>
    </Typography>
    <List 
      sx={{ mb: 4, flexGrow: 1 }}
      aria-label={`Features included in ${title} plan`}
    >
      {features.map((feature, index) => (
        <ListItem key={index} disableGutters>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" aria-hidden="true" />
          </ListItemIcon>
          <ListItemText primary={feature} />
        </ListItem>
      ))}
    </List>
    <Button
      variant={isPopular ? 'contained' : 'outlined'}
      color="primary"
      size="large"
      fullWidth
      aria-label={`Get started with ${title} plan at $${price} per month`}
    >
      Get Started
    </Button>
  </Paper>
);

const Pricing = () => {
  const theme = useTheme();
  
  const pricingTiers = [
    {
      title: 'Basic Maintenance',
      price: '99',
      features: [
        'Website updates (minor changes)',
        'Bug fixes (up to 3 issues/month)',
        'Security monitoring',
        'Email support',
      ],
      isPopular: false
    },
    {
      title: 'Starter',
      price: '149',
      features: [
        'Website maintenance & bug fixes',
        'Basic design updates',
        'Performance optimization',
        'Email support',
      ],
      isPopular: false
    },
    {
      title: 'Standard Maintenance',
      price: '199',
      features: [
        'Regular security patches & updates',
        'Performance optimization',
        'Backup management',
        'Basic SEO updates',
        'Priority email support'
      ],
      isPopular: false
    },
    {
      title: 'Professional',
      price: '299',
      features: [
        'Full website maintenance',
        'Bug fixes (unlimited)',
        'Website & UI/UX design improvements',
        'Priority support',
        'Basic email marketing setup'
      ],
      isPopular: true
    },
    {
      title: 'Advanced Web Development',
      price: '399',
      features: [
        'Custom website & web app development',
        'Advanced UI/UX design',
        'Third-party API integrations',
        'Mobile responsiveness improvements',
        'SEO & performance optimization',
      ],
      isPopular: false
    },
    {
      title: 'Growth',
      price: '499',
      features: [
        'Advanced website maintenance & optimization',
        'Custom feature development',
        'Mobile responsiveness improvements',
        'Web app development (advanced features)',
        'Digital marketing strategy consultation',
        'SEO & performance tuning',
        'Advanced email marketing automation',
      ],
      isPopular: false
    },
    {
      title: 'Digital Marketing Suite',
      price: '599',
      features: [
        'Social media management',
        'SEO optimization',
        'Content creation & blogging',
        'Google Ads & PPC campaign management',
        'Email marketing automation',
        'Analytics & performance tracking',
        'Lead generation strategies'
      ],
      isPopular: false
    },
    {
      title: 'Enterprise',
      price: '799',
      features: [
        'Full website & app development',
        'Custom UI/UX design',
        'Mobile app development (iOS & Android)',
        'API integrations & automation',
        '24/7 dedicated support',
        'Comprehensive digital marketing suite',
        'Email marketing automation',
        'PPC & social media advertising strategy'
      ],
      isPopular: false
    },
    {
      title: 'App Development Package',
      price: '999',
      features: [
        'Full mobile app development (iOS & Android)',
        'Custom UI/UX design',
        'Backend & API integrations',
        'App store optimization (ASO)',
        'Performance testing & security enhancements',
        'Post-launch support & maintenance'
      ],
      isPopular: false
    },
    {
      title: 'Complete Business Suite',
      price: '1499',
      features: [
        'End-to-end website & app development',
        'Custom branding & UI/UX strategy',
        'Advanced API & third-party integrations',
        'Full-scale digital marketing management',
        'SEO, PPC, and social media campaigns',
        'Custom email marketing automation',
        'Dedicated account manager & support'
      ],
      isPopular: true
    },
    {
      title: 'Custom Solutions',
      price: 'Custom',
      features: [
        'Tailored development solutions',
        'End-to-end website & app creation',
        'Custom digital marketing strategies',
        'Dedicated project manager',
        'Enterprise-grade security & hosting',
        'Ongoing optimization & scaling'
      ],
      isPopular: false
    }
  ];
  
  // Create structured data for pricing
  const pricingSchemaData = {
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    "priceCurrency": "USD",
    "offers": pricingTiers.map(tier => ({
      "@type": "Offer",
      "name": tier.title,
      "price": tier.price === 'Custom' ? null : tier.price,
      "priceCurrency": "USD",
      "description": tier.features.join('. '),
      "availability": "https://schema.org/InStock"
    }))
  };
      
  return (
    <Box 
      component="section"
      id="pricing-section"
      aria-labelledby="pricing-title"
      sx={{ py: 8, backgroundColor: 'background.default' }}
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(pricingSchemaData)}
        </script>
      </Helmet>
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
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            id="pricing-title"
          >
            Simple, Transparent Pricing
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            sx={{ mb: 2 }}
            component="p"
          >
            Choose the perfect plan for your business needs
          </Typography>
        </Box>
        <Grid 
          container 
          spacing={4} 
          alignItems="stretch"
          role="list"
          aria-label="Available pricing plans"
        >
          {pricingTiers.map((tier, index) => (
            <Grid 
              item 
              xs={12} 
              md={4} 
              key={index}
              role="listitem"
            >
              <PricingTier {...tier} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            gutterBottom
            component="p"
          >
            Need a custom solution?
          </Typography>
          <Button 
            variant="text" 
            color="primary" 
            size="large"
            href="/contact"
            aria-label="Contact our sales team for custom pricing solutions"
          >
            Contact Sales
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Pricing;