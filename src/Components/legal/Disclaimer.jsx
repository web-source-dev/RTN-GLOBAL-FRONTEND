import React from 'react';
import { Container, Typography, Box, Paper, useTheme } from '@mui/material';
import SEO from '../common/SEO';

const Disclaimer = () => {
  const theme = useTheme();
  const lastUpdated = new Date().toLocaleDateString();
  
  // Define structured data for Disclaimer page
  const disclaimerSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Disclaimer | RTN Global",
    "description": "Read the important disclaimers regarding our web development services, including limitations on professional advice, guarantees, and third-party content.",
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
      "@id": "https://rtnglobal.site/disclaimer"
    },
    "datePublished": "2023-01-01T00:00:00+00:00",
    "dateModified": new Date().toISOString()
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
        title="Disclaimer | Important Notices | RTN Global"
        description="Read our disclaimer regarding professional advice, guarantees, third-party content, and use of information provided on our website and through our web development services."
        keywords="RTN Global disclaimer, web development disclaimer, professional advice limitation, no guarantees, third-party content, web services disclaimer"
        canonicalUrl="/disclaimer"
        ogType="website"
        schema={disclaimerSchema}
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
            id="disclaimer-title"
          >
            Disclaimer
          </Typography>
          
          <section aria-labelledby="professional-advice">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="professional-advice"
            >
              1. Professional Advice
            </Typography>
            <Typography variant="body1" paragraph>
              The information provided on this website and through our services is for general informational purposes only. It should not be considered as professional advice for your specific business situation.
            </Typography>
          </section>

          <section aria-labelledby="no-guarantees">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="no-guarantees"
            >
              2. No Guarantees
            </Typography>
            <Typography variant="body1" paragraph>
              While we strive to provide accurate and up-to-date information about digital marketing, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of our services.
            </Typography>
          </section>

          <section aria-labelledby="results-vary">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="results-vary"
            >
              3. Results May Vary
            </Typography>
            <Typography variant="body1" paragraph>
              The success of our digital marketing strategies depends on various factors including market conditions, competition, and client participation. Past performance does not guarantee future results.
            </Typography>
          </section>

          <section aria-labelledby="third-party-content">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="third-party-content"
            >
              4. Third-Party Content
            </Typography>
            <Typography variant="body1" paragraph>
              Our website may contain links to third-party websites or services. We have no control over the content, privacy policies, or practices of these sites and assume no responsibility for them.
            </Typography>
          </section>

          <section aria-labelledby="use-of-information">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="use-of-information"
            >
              5. Use of Information
            </Typography>
            <Typography variant="body1" paragraph>
              Any reliance you place on information provided through our website or services is strictly at your own risk. We recommend consulting with appropriate professionals for advice specific to your situation.
            </Typography>
          </section>

          <section aria-labelledby="changes-to-services">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="changes-to-services"
            >
              6. Changes to Services
            </Typography>
            <Typography variant="body1" paragraph>
              We reserve the right to modify or discontinue any aspect of our services without notice. We are not liable for any modifications, price changes, suspension, or discontinuance of services.
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

export default Disclaimer;