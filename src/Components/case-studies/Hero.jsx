import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useTheme,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="case-studies-hero"
      aria-labelledby="case-studies-hero-heading"
      sx={{
        backgroundColor: 'background.default',
        pt: 12,
        pb: 12,
        position: 'relative',
        overflow: 'hidden'
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
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 40%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 40%)`,
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              component="h1"
              variant="h2"
              id="case-studies-hero-heading"
              color="text.primary"
              sx={{
                fontWeight: 700,
                mb: 3,
              }}
            >
              Our Success Stories
            </Typography>
            <Typography
              variant="h5"
              component="p"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: '600px' }}
            >
              Discover how we've helped businesses like yours achieve remarkable growth
              through innovative digital marketing strategies.
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="#case-studies-list"
              aria-label="View all case studies and success stories"
              endIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: 2 }}
            >
              View All Case Studies
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/plugin.svg"
              alt="Illustration of data analytics and successful digital marketing strategies"
              loading="lazy"
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
