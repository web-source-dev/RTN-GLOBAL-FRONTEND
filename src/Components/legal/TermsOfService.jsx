import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const TermsOfService = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h2" gutterBottom sx={{ mb: 4 }}>
            Terms of Service
          </Typography>
          
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing and using our digital marketing services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            2. Service Description
          </Typography>
          <Typography variant="body1" paragraph>
            We provide digital marketing services including but not limited to SEO, PPC advertising, social media marketing, content creation, and web development. The specific services will be outlined in your service agreement.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            3. Client Responsibilities
          </Typography>
          <Typography variant="body1" paragraph>
            Clients are responsible for providing accurate information, timely feedback, and necessary access to accounts required for service delivery. Failure to do so may impact service effectiveness and results.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            4. Payment Terms
          </Typography>
          <Typography variant="body1" paragraph>
            Payment terms, including fees and billing cycles, will be specified in your service agreement. Late payments may result in service suspension. All fees are non-refundable unless otherwise stated.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            5. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            All materials, strategies, and content created during service delivery remain our intellectual property until full payment is received. Clients retain ownership of their pre-existing materials.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            6. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            We strive for excellence but cannot guarantee specific results from our services. We are not liable for indirect, consequential, or special damages arising from the use of our services.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            7. Termination
          </Typography>
          <Typography variant="body1" paragraph>
            Either party may terminate services with written notice as specified in the service agreement. Upon termination, you remain responsible for payment of services rendered.
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 6 }}>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsOfService;