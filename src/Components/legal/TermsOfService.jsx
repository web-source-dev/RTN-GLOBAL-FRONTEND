import React from 'react';
import { Container, Typography, Box, Paper, useTheme } from '@mui/material';
import SEO from '../common/SEO';

const TermsOfService = () => {
  const theme = useTheme();
  const lastUpdated = new Date().toLocaleDateString();
  
  // Define structured data for Terms of Service page
  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service | RTN Global",
    "description": "Read the terms and conditions governing the use of RTN Global's web development services, including acceptance of terms, service descriptions, and client responsibilities.",
    "publisher": {
      "@type": "Organization",
      "name": "RTN Global",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rtnglobal.site/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://rtnglobal.site/terms-of-service"
    },
    "datePublished": "2023-01-01T00:00:00+00:00",
    "dateModified": new Date().toISOString(),
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#terms-service-title", "#acceptance-terms", "#service-description"]
    }
  };
  
  return (
    <Box 
      component="main" 
      sx={{ 
        py: 8, 
        backgroundColor: 'background.default',
        minHeight: '70vh'
      }}
    >
      <SEO
        title="Terms of Service | Legal Agreement | RTN Global"
        description="Review our Terms of Service outlining the agreement between RTN Global and clients using our web development, MERN stack, and React Native services."
        keywords="RTN Global terms of service, terms and conditions, service agreement, client responsibilities, payment terms, intellectual property rights, service termination, legal agreement"
        canonicalUrl="/terms-of-service"
        ogType="website"
        schema={termsSchema}
      />
      
      <Container maxWidth="lg">
        <Paper 
          component="article"
          sx={{ 
            p: { xs: 3, md: 4 }, 
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: theme.shadows[2]
          }}
        >
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            sx={{ 
              mb: 4,
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700
            }}
            id="terms-service-title"
          >
            Terms of Service
          </Typography>
          
          <section aria-labelledby="acceptance-terms">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="acceptance-terms"
            >
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body1" paragraph>
              By accessing and using our digital marketing services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </Typography>
          </section>

          <section aria-labelledby="service-description">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="service-description"
            >
              2. Service Description
            </Typography>
            <Typography variant="body1" paragraph>
              We provide digital marketing services including but not limited to SEO, PPC advertising, social media marketing, content creation, and web development. The specific services will be outlined in your service agreement.
            </Typography>
          </section>

          <section aria-labelledby="client-responsibilities">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="client-responsibilities"
            >
              3. Client Responsibilities
            </Typography>
            <Typography variant="body1" paragraph>
              Clients are responsible for providing accurate information, timely feedback, and necessary access to accounts required for service delivery. Failure to do so may impact service effectiveness and results.
            </Typography>
          </section>

          <section aria-labelledby="payment-terms">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="payment-terms"
            >
              4. Payment Terms
            </Typography>
            <Typography variant="body1" paragraph>
              Payment terms, including fees and billing cycles, will be specified in your service agreement. Late payments may result in service suspension. All fees are non-refundable unless otherwise stated.
            </Typography>
          </section>

          <section aria-labelledby="intellectual-property">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="intellectual-property"
            >
              5. Intellectual Property
            </Typography>
            <Typography variant="body1" paragraph>
              All materials, strategies, and content created during service delivery remain our intellectual property until full payment is received. Clients retain ownership of their pre-existing materials.
            </Typography>
          </section>

          <section aria-labelledby="limitation-liability">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="limitation-liability"
            >
              6. Limitation of Liability
            </Typography>
            <Typography variant="body1" paragraph>
              We strive for excellence but cannot guarantee specific results from our services. We are not liable for indirect, consequential, or special damages arising from the use of our services.
            </Typography>
          </section>

          <section aria-labelledby="termination">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="termination"
            >
              7. Termination
            </Typography>
            <Typography variant="body1" paragraph>
              Either party may terminate services with written notice as specified in the service agreement. Upon termination, you remain responsible for payment of services rendered.
            </Typography>
          </section>

          <footer>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mt: 6 }}
              component="p"
            >
              Last updated: <time dateTime={new Date().toISOString()}>{lastUpdated}</time>
            </Typography>
          </footer>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsOfService;