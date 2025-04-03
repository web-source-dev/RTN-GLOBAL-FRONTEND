import React from 'react';
import { Container, Typography, Box, Paper, useTheme } from '@mui/material';
import SEO from '../common/SEO';

const PrivacyPolicy = () => {
  const theme = useTheme();
  const lastUpdated = new Date().toLocaleDateString();
  
  // Define structured data for Privacy Policy page
  const privacyPolicySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy | RTN Global",
    "description": "RTN Global's privacy policy detailing how we collect, use, and protect your personal information when using our web development and digital services.",
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
      "@id": "https://rtnglobal.site/privacy-policy"
    },
    "datePublished": "2023-01-01T00:00:00+00:00",
    "dateModified": new Date().toISOString(),
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#privacy-policy-title", "#information-collect", "#information-use", "#information-sharing"]
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
        title="Privacy Policy | Data Protection | RTN Global"
        description="Read our comprehensive privacy policy explaining how we collect, use, and protect your personal information when using RTN Global's web development and digital marketing services."
        keywords="RTN Global privacy policy, data protection, personal information collection, data security, cookies policy, GDPR compliance, privacy rights, information sharing"
        canonicalUrl="/privacy-policy"
        ogType="website"
        schema={privacyPolicySchema}
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
            id="privacy-policy-title"
          >
            Privacy Policy
          </Typography>
          
          <section aria-labelledby="information-collect">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="information-collect"
            >
              1. Information We Collect
            </Typography>
            <Typography variant="body1" paragraph>
              We collect information that you provide directly to us, including when you fill out forms, subscribe to our newsletter, or contact us. This may include your name, email address, phone number, and company information.
            </Typography>
          </section>

          <section aria-labelledby="information-use">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="information-use"
            >
              2. How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We use the information we collect to provide and improve our services, communicate with you, and send you marketing materials (with your consent). We may also use your information to analyze and optimize our website performance.
            </Typography>
          </section>

          <section aria-labelledby="information-sharing">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="information-sharing"
            >
              3. Information Sharing
            </Typography>
            <Typography variant="body1" paragraph>
              We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business.
            </Typography>
          </section>

          <section aria-labelledby="data-security">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="data-security"
            >
              4. Data Security
            </Typography>
            <Typography variant="body1" paragraph>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </Typography>
          </section>

          <section aria-labelledby="cookies-tracking">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="cookies-tracking"
            >
              5. Cookies and Tracking
            </Typography>
            <Typography variant="body1" paragraph>
              We use cookies and similar tracking technologies to analyze website traffic and improve your browsing experience. You can control cookie settings through your browser preferences.
            </Typography>
          </section>

          <section aria-labelledby="your-rights">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="your-rights"
            >
              6. Your Rights
            </Typography>
            <Typography variant="body1" paragraph>
              You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your information. Contact us to exercise these rights.
            </Typography>
          </section>

          <section aria-labelledby="policy-updates">
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ mt: 4, fontWeight: 600 }}
              id="policy-updates"
            >
              7. Updates to This Policy
            </Typography>
            <Typography variant="body1" paragraph>
              We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on our website.
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

export default PrivacyPolicy;