import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  const handleConsultationClick = () => {
    navigate('/free-consultation');
  };

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
            Ready to Build Your Digital Presence?
          </Typography>
          <Typography variant="h5" paragraph sx={{ mb: 4 }}>
            Get a Free Web Development Consultation Worth $500
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleConsultationClick}
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
