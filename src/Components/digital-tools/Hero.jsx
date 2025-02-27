import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useTheme,
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';

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
              Digital Marketing Tools Suite
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: '600px' }}
            >
              Powerful tools and resources to streamline your marketing efforts and
              maximize your ROI. Built for modern marketers.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<BuildIcon />}
                sx={{ borderRadius: 2 }}
              >
                Explore Tools
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/digital-tools-hero.svg"
              alt="Digital Tools Hero"
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
