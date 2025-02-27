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
              News & Updates
            </Typography>
            <Typography
              variant="h5"
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
                startIcon={<NewspaperIcon />}
                sx={{ borderRadius: 2 }}
              >
                Latest News
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/news-hero.svg"
              alt="News Hero"
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
