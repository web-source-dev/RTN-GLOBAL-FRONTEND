import React from 'react';
import { Box, Container, Grid, Typography, Paper, IconButton, useTheme, useMediaQuery } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';
import SecurityIcon from '@mui/icons-material/Security';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import SupportIcon from '@mui/icons-material/Support';

const features = [
  {
    icon: SpeedIcon,
    title: 'Fast Website Performance',
    description: 'Optimized code and efficient architecture for lightning-fast loading speeds and smooth user experience on all websites and applications.',
    color: '#2196f3'
  },
  {
    icon: DevicesIcon,
    title: 'Responsive Web Design',
    description: 'Fully responsive layouts that work perfectly across all devices, from desktops to smartphones, providing a seamless user experience.',
    color: '#4caf50'
  },
  {
    icon: SecurityIcon,
    title: 'Secure Web Solutions',
    description: 'Built-in security features and best practices to protect your website data and users from potential threats and vulnerabilities.',
    color: '#ff9800'
  },
  {
    icon: CodeIcon,
    title: 'Clean Code Architecture',
    description: 'Well-structured, maintainable code following industry standards for long-term reliability and easy future updates to your web applications.',
    color: '#9c27b0'
  },
  {
    icon: BrushIcon,
    title: 'Modern UI/UX Web Design',
    description: 'Beautiful, intuitive interfaces designed for optimal user engagement and conversion rates on your business website or application.',
    color: '#f44336'
  },
  {
    icon: SupportIcon,
    title: 'Ongoing Website Support',
    description: 'Dedicated technical support and maintenance to keep your web solutions and applications running smoothly after launch.',
    color: '#00bcd4'
  }
];

const Features = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box 
      component="section" 
      id="features-section"
      aria-label="Web Development Features and Benefits"
      py={8} 
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        background: theme.palette.background.default,
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
      />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography 
          variant="h2" 
          component="h2"
          textAlign="center" 
          gutterBottom
          sx={{
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Why Choose Our Web Development Services
        </Typography>
        <Typography 
          variant="body1"
          component="p"
          color="text.secondary" 
          textAlign="center" 
          mb={6}
          sx={{ maxWidth: '800px', mx: 'auto' }}        
        >
          Discover the advantages that set our professional web development solutions apart
        </Typography>
        <Grid container spacing={4} component="ul" sx={{ listStyle: 'none', p: 0 }}>
          {features.slice(isMobile ? 3 : 0).map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} component="li">
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  },
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle at top right, ${feature.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%',
                  }}
                />
                <IconButton
                  aria-hidden="true"
                  sx={{
                    mb: 2,
                    bgcolor: `${feature.color}15`,
                    color: feature.color,
                    '&:hover': { bgcolor: `${feature.color}25` },
                  }}
                  size="large"
                  tabIndex={-1}
                >
                  <feature.icon fontSize="large" />
                </IconButton>
                <Typography variant="h3" component="h3" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary, fontSize: '1.5rem' }}>
                  {feature.title}
                </Typography>
                <Typography component="p" color="text.secondary">
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

export default Features;
