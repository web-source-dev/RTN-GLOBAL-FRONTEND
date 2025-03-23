import React from 'react';
import { Box, Container, Grid, Typography, Paper, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const achievements = [
  'Over 10 years of web development excellence',
  'Served 500+ satisfied clients worldwide',
  'Award-winning web solutions',
  'Industry-leading performance for clients',
];

const About = () => {
  return (
    <Box py={12}>
      <Container>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box position="relative">
              <Paper
                elevation={0}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 4,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(25,118,210,0.1), rgba(156,39,176,0.1))',
                    zIndex: 1,
                  },
                }}
              >
                <Box
                  component="img"
                  src="/images/about/about.png"
                  alt="Web Development Team"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    transform: 'scale(1.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.15)',
                    },
                  }}
                />
              </Paper>
              <Paper
                elevation={3}
                sx={{
                  position: 'absolute',
                  bottom: -30,
                  right: -30,
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  textAlign: 'center',
                  maxWidth: 200,
                }}
              >
                <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
                  95%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Client Satisfaction Rate
                </Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              component="span"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                display: 'block',
                mb: 2,
              }}
            >
              About Us
            </Typography>
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Your Partner in Web Development
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Transforming Businesses Through Custom Web Solutions
            </Typography>
            <Typography paragraph color="text.secondary">
              We are a team of web development experts passionate about helping businesses establish a powerful online presence. 
              With years of experience and a user-centered approach, we deliver fast, scalable, and user-friendly digital experiences.
            </Typography>
            
            <Box my={4}>
              {achievements.map((achievement, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                  <CheckCircleIcon sx={{ color: 'primary.main', mr: 2 }} />
                  <Typography>{achievement}</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: '30px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<PlayArrowIcon />}
                sx={{
                  borderRadius: '30px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                }}
              >
                Watch Demo
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
