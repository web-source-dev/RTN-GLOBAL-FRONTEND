import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useTheme,
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="roi-calculator-hero"
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
          opacity: 0.2,
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
              Marketing ROI Calculator
            </Typography>
            <Typography
              variant="h5"
              component="p"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: '600px' }}
            >
              Calculate the potential return on investment for your marketing campaigns.
              Make data-driven decisions with our comprehensive ROI calculator.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<CalculateIcon aria-hidden="true" />}
                sx={{ borderRadius: 2 }}
                href="#roi-calculator-form"
                aria-label="Start calculating your marketing ROI"
              >
                Start Calculating
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/roi-calculater/roi-calculater.png"
              alt="ROI Calculator illustration showing charts, graphs, and financial metrics"
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
