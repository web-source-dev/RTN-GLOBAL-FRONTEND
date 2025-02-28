import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h2" gutterBottom sx={{ mb: 4 }}>
            Privacy Policy
          </Typography>
          
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We collect information that you provide directly to us, including when you fill out forms, subscribe to our newsletter, or contact us. This may include your name, email address, phone number, and company information.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use the information we collect to provide and improve our services, communicate with you, and send you marketing materials (with your consent). We may also use your information to analyze and optimize our website performance.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            3. Information Sharing
          </Typography>
          <Typography variant="body1" paragraph>
            We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            4. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            5. Cookies and Tracking
          </Typography>
          <Typography variant="body1" paragraph>
            We use cookies and similar tracking technologies to analyze website traffic and improve your browsing experience. You can control cookie settings through your browser preferences.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            6. Your Rights
          </Typography>
          <Typography variant="body1" paragraph>
            You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your information. Contact us to exercise these rights.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            7. Updates to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on our website.
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 6 }}>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;