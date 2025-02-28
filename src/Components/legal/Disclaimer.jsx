import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const Disclaimer = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: 4, backgroundColor: 'background.paper' }}>
          <Typography variant="h2" gutterBottom sx={{ mb: 4 }}>
            Disclaimer
          </Typography>
          
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            1. Professional Advice
          </Typography>
          <Typography variant="body1" paragraph>
            The information provided on this website and through our services is for general informational purposes only. It should not be considered as professional advice for your specific business situation.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            2. No Guarantees
          </Typography>
          <Typography variant="body1" paragraph>
            While we strive to provide accurate and up-to-date information about digital marketing, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of our services.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            3. Results May Vary
          </Typography>
          <Typography variant="body1" paragraph>
            The success of our digital marketing strategies depends on various factors including market conditions, competition, and client participation. Past performance does not guarantee future results.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            4. Third-Party Content
          </Typography>
          <Typography variant="body1" paragraph>
            Our website may contain links to third-party websites or services. We have no control over the content, privacy policies, or practices of these sites and assume no responsibility for them.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            5. Use of Information
          </Typography>
          <Typography variant="body1" paragraph>
            Any reliance you place on information provided through our website or services is strictly at your own risk. We recommend consulting with appropriate professionals for advice specific to your situation.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            6. Changes to Services
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to modify or discontinue any aspect of our services without notice. We are not liable for any modifications, price changes, suspension, or discontinuance of services.
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 6 }}>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Disclaimer;