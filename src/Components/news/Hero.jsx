import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useTheme,
} from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="news-hero"
      aria-labelledby="news-hero-heading"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.background.default,
        pt: 8,
        pb: 8
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
              variant="h2"
              id="news-hero-heading"
              color="text.primary"
              sx={{
                fontWeight: 700,
                mb: 3,
              }}
            >
              News & Updates
            </Typography>
            <Typography
              variant="h5"
              component="p"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: '600px' }}
            >
              Stay up to date with the latest news, press releases, and updates from
              RTN Global. Discover how we're shaping the future of digital marketing.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<NewspaperIcon aria-hidden="true" />}
                sx={{ borderRadius: 2 }}
                aria-label="View latest news articles"
                href="#latest-news"
              >
                Latest News
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/news/news-hero.png"
              alt="News and updates illustrated by a digital newspaper and notification icons"
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
