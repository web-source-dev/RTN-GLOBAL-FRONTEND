import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
} from '@mui/material';

const experiences = [
  {
    title: 'Collaborative Workspace',
    description: 'Modern office spaces designed for collaboration and creativity',
    image: '/images/careers/workspace.jpg',
    category: 'Environment'
  },
  {
    title: 'Team Building',
    description: 'Regular team activities and events to strengthen relationships',
    image: '/images/careers/team-building.jpg',
    category: 'Culture'
  },
  {
    title: 'Learning Sessions',
    description: 'Weekly knowledge sharing and skill development workshops',
    image: '/images/careers/learning.jpg',
    category: 'Growth'
  },
  {
    title: 'Work-Life Balance',
    description: 'Flexible schedules and remote work options for better balance',
    image: '/images/careers/work-life.jpg',
    category: 'Lifestyle'
  },
  {
    title: 'Social Impact',
    description: 'Community involvement and sustainability initiatives',
    image: '/images/careers/social-impact.jpg',
    category: 'Community'
  },
  {
    title: 'Innovation Hub',
    description: 'State-of-the-art facilities for creative digital solutions',
    image: '/images/careers/innovation.jpg',
    category: 'Technology'
  }
];

const LifeAtRTN = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      py={12}
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
        position: 'relative',
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

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          textAlign="center"
          sx={{
            fontWeight: 800,
            mb: 3,
            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Life at RTN Global
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Experience a dynamic work environment where innovation meets collaboration
        </Typography>

        <Grid container spacing={4}>
          {experiences.map((experience, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .experience-image': {
                      transform: 'scale(1.1)'
                    }
                  },
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ position: 'relative', pt: '60%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={experience.image}
                    alt={experience.title}
                    className="experience-image"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease'
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      bgcolor: 'rgba(0, 0, 0, 0.6)',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}
                  >
                    {experience.category}
                  </Box>
                </Box>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {experience.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {experience.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LifeAtRTN;