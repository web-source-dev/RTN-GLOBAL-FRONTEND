import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useTheme,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="digital-tools-hero"
      aria-labelledby="hero-heading"
      sx={{
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
        pt: 12,
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
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              component="h1"
              variant="h2"
              id="hero-heading"
              color="text.primary"
              sx={{
                fontWeight: 700,
                mb: 3,
              }}
            >
              Custom Web Solutions
            </Typography>
            <Typography
              variant="h5"
              component="p"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: '600px' }}
            >
              Build fast, scalable, and user-friendly digital experiences with our expert team. 
              Specializing in Wix websites, MERN stack applications, and React Native mobile apps.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<CodeIcon />}
                sx={{ borderRadius: 2 }}
                aria-label="Explore our digital services"
                href="#digital-tools-services"
              >
                Explore Services
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/hero-illustration.png"
              alt="Web development services illustration showcasing custom digital solutions"
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
