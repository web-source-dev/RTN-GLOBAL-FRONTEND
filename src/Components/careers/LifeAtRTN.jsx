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
    title: 'Cutting-Edge Web Development',
    description: 'A workspace dedicated to crafting high-quality web solutions with the latest technologies.',
    image: '/images/careers/web-development.jpg',
    category: 'Technology',
    alt: 'Team working on coding and web development with modern tools'
  },
  {
    title: 'Team-Driven Innovation',
    description: 'A culture of collaboration where developers, designers, and strategists build together.',
    image: '/images/careers/team-culture.jpg',
    category: 'Culture',
    alt: 'Diverse team members collaborating on an innovative project'
  },
  {
    title: 'Continuous Learning & Growth',
    description: 'Workshops, tech talks, and mentorship to stay ahead in the fast-evolving web industry.',
    image: '/images/careers/learning-growth.jpg',
    category: 'Growth',
    alt: 'Employees participating in a workshop or learning session'
  },
  {
    title: 'Flexible & Remote Work',
    description: 'A hybrid work environment that prioritizes work-life balance and productivity.',
    image: '/images/careers/flexible-work.jpg',
    category: 'Lifestyle',
    alt: 'Employee working remotely from a comfortable home office setup'
  },
  {
    title: 'Community & Social Impact',
    description: 'We believe in giving back through open-source contributions and social initiatives.',
    image: '/images/careers/community-impact.png',
    category: 'Community',
    alt: 'Team members participating in a community service project'
  },
  {
    title: 'State-of-the-Art Development Hub',
    description: 'An inspiring workspace equipped with the best tools for web development excellence.',
    image: '/images/careers/dev-hub.jpg',
    category: 'Environment',
    alt: 'Modern office space with cutting-edge development equipment'
  }
];

const LifeAtRTN = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="life-at-rtn"
      aria-labelledby="life-at-rtn-heading"
      py={12}
      sx={{
        background: theme.palette.background.default,
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
          opacity: 0.2,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 10%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 30%)`,
          zIndex: 1
        }}
        aria-hidden="true"
      />

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          id="life-at-rtn-heading"
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
          component="p"
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
                component="article"
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
                    alt={experience.alt}
                    loading="lazy"
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
                    role="presentation"
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
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    {experience.title}
                  </Typography>
                  <Typography component="p" color="text.secondary">
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