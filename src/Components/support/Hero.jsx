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
              Customer Support Center
            </Typography>
            <Typography
              variant="h5"
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
                startIcon={<SupportAgentIcon />}
                sx={{ borderRadius: 2 }}
              >
                Contact Support
              </Button>
              <Button
                variant="contained"
                  component={RouterLink}
            to="/check-ticket"
                fullWidth
                startIcon={<CheckCircle  />}
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
              src="/images/support-hero.svg"
              alt="Support Hero"
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
