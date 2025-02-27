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
      sx={{
        backgroundColor: 'background.paper',
        pt: 12,
        pb: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              component="h1"
              variant="h2"
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
                startIcon={<CalculateIcon />}
                sx={{ borderRadius: 2 }}
              >
                Start Calculating
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/roi-calculator-hero.svg"
              alt="ROI Calculator Hero"
              sx={{
                width: '100%',
                height: 'auto',
                maxWidth: '600px',
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
