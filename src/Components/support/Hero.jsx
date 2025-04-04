import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useTheme,
} from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="support-hero"
      aria-labelledby="hero-heading"
      sx={{
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
        pt: 8,
        pb: 8,
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
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center" justifyContent={'center'}>
          <Grid item xs={12} md={5}>
            <Typography
              component="h1"
              variant="h1"
              id="hero-heading"
              color="text.primary"
              sx={{
                fontWeight: 700,
                mb: 3,
              }}
            >
              Customer Support Center
            </Typography>
            <Typography
              variant="h5"
              component="p"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: '600px' }}
            >
              Get the help you need, when you need it. Our support team is available 24/7
              to assist you with any questions or concerns.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/support/form"
                aria-label="Contact our support team for assistance"
                startIcon={<SupportAgentIcon aria-hidden="true" />}
                sx={{ borderRadius: 2 }}
              >
                Contact Support
              </Button>
              <Button
                variant="contained"
                component={RouterLink}
                to="/check-ticket"
                aria-label="Check the status of your existing support ticket"
                fullWidth
                startIcon={<CheckCircle aria-hidden="true" />}
                sx={{
                  width:'150px',
                  height: '56px',
                  background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0, #7b1fa2)',
                  },
                }}
              >
                Check Status
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/support/support.png"
              alt="Customer support representative helping clients with technical issues"
              loading="lazy"
              sx={{
                width: '100%',
                height: 'auto',
                maxWidth: '500px',
                display: 'block',
                mx: 'auto',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
