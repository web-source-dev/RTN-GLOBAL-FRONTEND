import React from 'react';
import { Box, Container, Typography, Grid, Paper, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LanguageIcon from '@mui/icons-material/Language';

const Mission = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const features = [
    {
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      title: 'Drive Results',
      description: 'We focus on delivering measurable results that help our clients achieve their business objectives through data-driven strategies.'
    },
    {
      icon: <LanguageIcon sx={{ fontSize: 32 }} />,
      title: 'Global Reach',
      description: 'We help businesses expand their digital presence globally while maintaining local relevance and cultural sensitivity.'
    }
  ];

  return (
    <Box
      sx={{
        py: 8,
        position: 'relative',
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: isDark ? 0.1 : 0.05,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 40%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 40%)`,
          zIndex: 1
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            Our Mission
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 2,
              mb: 3,
              fontWeight: 800,
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Empowering Digital Success
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 'md', mx: 'auto' }}
          >
            We're committed to transforming businesses through innovative digital marketing solutions that drive growth and create lasting impact.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  },
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'primary.main',
                    mb: 2
                  }}
                >
                  {feature.icon}
                  <Typography
                    variant="h5"
                    sx={{ ml: 2, fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                </Box>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Mission;