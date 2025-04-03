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
  useMediaQuery
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import StarIcon from '@mui/icons-material/Star';

const portfolioItems = [
  {
    title: 'Premium Wix Website for Luxury Fashion Boutique',
    description: 'Designed and developed a custom Wix website for a high-end fashion boutique, featuring e-commerce integration, appointment booking system, and responsive design that increased online sales by 245% within three months.',
    image: '/images/portfolio/project1.png',
    category: 'Wix Website',
    tags: ['Wix Website Development', 'E-commerce Website', 'Responsive Web Design'],
    stats: {
      performance: 'Outstanding',
      duration: '3 weeks',
      satisfaction: 'Exceptional (5★)'
    },
    featured: true
  },
  {
    title: 'MERN Stack Property Management Web Application',
    description: 'Built a comprehensive property management web application using MongoDB, Express.js, React, and Node.js, featuring real-time updates, secure user authentication, and advanced property filtering capabilities.',
    image: '/images/portfolio/project2.jpg',
    category: 'MERN Stack',
    tags: ['MongoDB Database', 'Express.js Backend', 'React Frontend', 'Node.js Server'],
    stats: {
      performance: 'Excellent',
      duration: '8 weeks',
      satisfaction: 'Highly Rated (5★)'
    },
    featured: true
  },
  {
    title: 'React Native Fitness Tracking Mobile App',
    description: 'Developed a cross-platform mobile application for fitness tracking using React Native, featuring personalized workout plans, progress tracking dashboard, and social sharing capabilities for both iOS and Android users.',
    image: '/images/portfolio/project3.jpg',
    category: 'React Native',
    tags: ['Mobile App Development', 'iOS Application', 'Android Application', 'Cross-platform Development'],
    stats: {
      performance: 'Top-tier',
      duration: '7 weeks',
      satisfaction: 'Very Satisfied (5★)'
    },
    featured: false
  },
  {
    title: 'MERN Stack E-Learning Platform Website',
    description: 'Created a scalable online learning platform with MongoDB, Express.js, React and Node.js, featuring video course delivery, interactive quiz system, and a comprehensive admin dashboard for content management.',
    image: '/images/portfolio/project4.png',
    category: 'MERN Stack',
    tags: ['Full Stack Web Development', 'Education Website', 'User Authentication System'],
    stats: {
      performance: 'Superior',
      duration: '10 weeks',
      satisfaction: 'Exceptional (5★)'
    },
    featured: true
  },
  {
    title: 'Wix Healthcare Provider Professional Website',
    description: 'Designed a HIPAA-compliant Wix website for a medical practice, featuring online appointment scheduling, secure patient portal integration, and optimized mobile experience that improved patient acquisition by 150%.',
    image: '/images/portfolio/project5.jpg',
    category: 'Wix Website',
    tags: ['Healthcare Website', 'Appointment Booking System', 'Responsive Web Design'],
    stats: {
      performance: 'Excellent',
      duration: '2.5 weeks',
      satisfaction: 'Highly Rated (5★)'
    },
    featured: false
  },
  {
    title: 'React Native Food Delivery Mobile Application',
    description: 'Built a high-performance food delivery mobile application using React Native with real-time order tracking, secure payment processing integration, and push notifications for both restaurant partners and customers.',
    image: '/images/portfolio/project6.png',
    category: 'React Native',
    tags: ['Mobile App Development', 'Geolocation Services', 'Payment Gateway Integration'],
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box
      component="section"
      id="portfolio-section"
      aria-label="Web Development Portfolio"
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
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 10%)`,
          zIndex: 1
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box textAlign="center" mb={8}>
          <Typography
            component="p"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              display: 'block',
              mb: 2,
            }}
          >
            Our Web Development Portfolio
          </Typography>
          <Typography
            variant="h2"
            component="h2"
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
            Fast, Scalable & User-Friendly Web Solutions
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
          >
            Explore our portfolio of custom web development solutions including Wix websites, MERN stack applications, and React Native mobile apps
          </Typography>

          {/* Category Filter */}
          <Box
            component="nav"
            aria-label="Portfolio categories"
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
                aria-pressed={activeCategory === category}
                aria-controls="portfolio-grid"
                aria-label={`Filter by ${category}`}
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

        <Grid container spacing={4} component="ul" id="portfolio-grid" sx={{ listStyle: 'none', p: 0 }}>
          {portfolioItems.slice(isMobile ? 3 : 0)
            .filter(item => activeCategory === 'All' || item.category === activeCategory)
            .map((item, index) => (
              <Grid item xs={12} md={4} key={index} component="li">
                <Paper
                  component="article"
                  aria-labelledby={`portfolio-item-title-${index}`}
                  elevation={0}
                  sx={{
                    p: 2,
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
                      <StarIcon fontSize="small" aria-hidden="true" />
                      <Typography variant="body2" fontWeight="bold">
                        Featured
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ position: 'relative', pt: '60%' }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={`${item.title} - ${item.category} project by RTN Global`}
                      loading="lazy"
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
                        aria-label={`View details of ${item.title}`}
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

                  <CardContent>
                    <Typography
                      variant="h3"
                      component="h3"
                      id={`portfolio-item-title-${index}`}
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: isDark ? 'white' : 'text.primary',
                        fontSize: '1.5rem'
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      component="p"
                      sx={{
                        color: "text.secondary",
                        mb: 1,
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2, // Limits to 2 lines
                        overflow: "hidden",
                      }}
                    >
                      {item.description}
                    </Typography>
                    <Box 
                      component="ul" 
                      aria-label="Project technologies"
                      sx={{ 
                        mb: 2, 
                        display: 'flex', 
                        gap: 1, 
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0
                      }}
                    >
                      {item.tags.map((tag, idx) => (
                        <Box component="li" key={idx}>
                          <Chip
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                              color: isDark ? 'rgba(255,255,255,0.8)' : 'text.primary',
                            }}
                          />
                        </Box>
                      ))}
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                        mt: 2,
                        pt: 3,
                        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      }}
                    >
                      <Box>
                        <Typography variant="body2" component="p" color="text.secondary">Duration</Typography>
                        <Typography variant="subtitle1" component="p" color="primary">{item.stats.duration}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" component="p" color="text.secondary">Satisfaction</Typography>
                        <Typography variant="subtitle1" component="p" color="primary">{item.stats.satisfaction}</Typography>
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
