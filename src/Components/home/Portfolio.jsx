import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  IconButton,
  useTheme,
  alpha,
  Paper,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import LaunchIcon from '@mui/icons-material/Launch';
import StarIcon from '@mui/icons-material/Star';

const portfolioItems = [
  {
    title: 'Premium Wix Website for Luxury Boutique',
    description: 'Designed and developed a custom Wix website for a high-end fashion boutique, featuring e-commerce integration, appointment booking, and responsive design that increased online sales by 245%.',
    image: '/images/portfolio/project1.jpg',
    category: 'Wix Website',
    tags: ['Wix', 'E-commerce', 'Responsive Design'],
    stats: {
      performance: 'Outstanding',
      duration: '3 weeks',
      satisfaction: 'Exceptional (5★)'
    },
    featured: true
  },
  {
    title: 'MERN Stack Property Management Platform',
    description: 'Built a comprehensive property management web application using MongoDB, Express, React, and Node.js, featuring real-time updates, user authentication, and advanced filtering capabilities.',
    image: '/images/portfolio/project2.jpg',
    category: 'MERN Stack',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    stats: {
      performance: 'Excellent',
      duration: '8 weeks',
      satisfaction: 'Highly Rated (5★)'
    },
    featured: true
  },
  {
    title: 'React Native Fitness Tracking App',
    description: 'Developed a cross-platform mobile application for fitness tracking using React Native, featuring workout plans, progress tracking, and social sharing capabilities for both iOS and Android users.',
    image: '/images/portfolio/project3.jpg',
    category: 'React Native',
    tags: ['Mobile App', 'iOS', 'Android', 'Cross-platform'],
    stats: {
      performance: 'Top-tier',
      duration: '7 weeks',
      satisfaction: 'Very Satisfied (5★)'
    },
    featured: false
  },
  {
    title: 'MERN Stack E-Learning Platform',
    description: 'Created a scalable online learning platform with MongoDB, Express, React and Node.js, featuring video courses, interactive quizzes, and a comprehensive admin dashboard for content management.',
    image: '/images/portfolio/project4.jpg',
    category: 'MERN Stack',
    tags: ['Full Stack', 'Education', 'User Authentication'],
    stats: {
      performance: 'Superior',
      duration: '10 weeks',
      satisfaction: 'Exceptional (5★)'
    },
    featured: true
  },
  {
    title: 'Wix Healthcare Provider Website',
    description: 'Designed a HIPAA-compliant Wix website for a medical practice, featuring online appointment scheduling, patient portal integration, and optimized mobile experience that improved patient acquisition.',
    image: '/images/portfolio/project5.jpg',
    category: 'Wix Website',
    tags: ['Healthcare', 'Appointment Booking', 'Responsive Design'],
    stats: {
      performance: 'Excellent',
      duration: '2.5 weeks',
      satisfaction: 'Highly Rated (5★)'
    },
    featured: false
  },
  {
    title: 'React Native Delivery Service App',
    description: 'Built a high-performance food delivery mobile application using React Native with real-time order tracking, payment processing, and push notifications for both restaurant partners and customers.',
    image: '/images/portfolio/project6.jpg',
    category: 'React Native',
    tags: ['Mobile App', 'Geolocation', 'Payment Integration'],
    stats: {
      performance: 'Best-in-class',
      duration: '9 weeks',
      satisfaction: 'Perfect (5★)'
    },
    featured: true
  }
];

const Portfolio = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(portfolioItems.map(item => item.category))];

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

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box textAlign="center" mb={8}>
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
            Our Portfolio
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
            Fast, Scalable & User-Friendly Solutions
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
          >
            Explore our portfolio of custom web solutions including Wix websites, MERN stack applications, and React Native mobile apps
          </Typography>

          {/* Category Filter */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 2,
              mb: 6
            }}
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'contained' : 'outlined'}
                onClick={() => setActiveCategory(category)}
                sx={{
                  borderRadius: '20px',
                  px: 3,
                  py: 1,
                  borderColor: activeCategory === category ? 'primary.main' : 'divider',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {category}
              </Button>
            ))}
          </Box>
        </Box>

        <Grid container spacing={4}>
          {portfolioItems
            .filter(item => activeCategory === 'All' || item.category === activeCategory)
            .map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
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
                  {item.featured && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        zIndex: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.9),
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <StarIcon fontSize="small" />
                      <Typography variant="body2" fontWeight="bold">
                        Featured
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ position: 'relative', pt: '60%' }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.title}
                      className="portfolio-image"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                      }}
                    />
                    <Box
                      className="portfolio-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: alpha(theme.palette.primary.main, 0.9),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      <IconButton
                        sx={{
                          color: 'white',
                          bgcolor: 'rgba(255,255,255,0.2)',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.3)',
                          },
                        }}
                      >
                        <LaunchIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: isDark ? 'white' : 'text.primary',
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      paragraph
                      sx={{
                        color: isDark ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                      }}
                    >
                      {item.description}
                    </Typography>

                    <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {item.tags.map((tag, idx) => (
                        <Chip
                          key={idx}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                            color: isDark ? 'rgba(255,255,255,0.8)' : 'text.primary',
                          }}
                        />
                      ))}
                    </Box>

                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 2,
                        mt: 3,
                        pt: 3,
                        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      }}
                    >
                      <Box>
                        <Typography variant="body2" color="text.secondary">Performance</Typography>
                        <Typography variant="h6" color="primary">{item.stats.performance}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Duration</Typography>
                        <Typography variant="h6" color="primary">{item.stats.duration}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Satisfaction</Typography>
                        <Typography variant="h6" color="primary">{item.stats.satisfaction}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Portfolio;
