import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';

const CTA = () => {
  return (
    <Box py={8} bgcolor="primary.main">
      <Container>
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/images/blog/post2.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
          }}
        >
          <Typography variant="h2" gutterBottom>
            Ready to Grow Your Business?
          </Typography>
          <Typography variant="h5" paragraph sx={{ mb: 4 }}>
            Get a Free Digital Marketing Strategy Session Worth $500
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Schedule Your Free Consultation
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default CTA;
