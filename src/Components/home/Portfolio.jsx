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
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import LaunchIcon from '@mui/icons-material/Launch';
import StarIcon from '@mui/icons-material/Star';

const portfolioItems = [
  {
    title: 'E-commerce Growth Strategy',
    description: 'Increased online sales by 200% through targeted digital marketing campaigns and SEO optimization.',
    image: '/images/portfolio/project1.jpg',
    category: 'E-commerce',
    tags: ['SEO', 'PPC', 'Social Media'],
    stats: {
      growth: '200%',
      duration: '6 months',
      roi: '350%'
    },
    featured: true
  },
  {
    title: 'Brand Transformation',
    description: 'Complete digital transformation for a traditional retail brand, establishing strong online presence.',
    image: '/images/portfolio/project2.jpg',
    category: 'Branding',
    tags: ['Branding', 'Social Media', 'Content'],
    stats: {
      growth: '150%',
      duration: '8 months',
      roi: '280%'
    },
    featured: true
  },
  {
    title: 'Lead Generation Campaign',
    description: 'Generated 500+ qualified leads per month through multi-channel marketing strategy.',
    image: '/images/portfolio/project3.jpg',
    category: 'Lead Generation',
    tags: ['Email Marketing', 'Landing Pages', 'Analytics'],
    stats: {
      growth: '300%',
      duration: '4 months',
      roi: '400%'
    },
    featured: false
  },
  {
    title: 'SaaS Marketing Success',
    description: 'Helped a SaaS startup achieve 10,000+ active users through strategic digital marketing.',
    image: '/images/portfolio/project4.jpg',
    category: 'SaaS',
    tags: ['B2B', 'Content Marketing', 'PPC'],
    stats: {
      growth: '400%',
      duration: '12 months',
      roi: '500%'
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
            Success Stories That Drive Results
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
          >
            Explore our portfolio of successful digital marketing campaigns and transformations
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
                <Card
                  sx={{
                    height: '100%',
                    background: isDark
                      ? 'linear-gradient(145deg, rgba(40,40,40,0.9), rgba(30,30,30,0.9))'
                      : 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,245,245,0.9))',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: isDark
                        ? '0 8px 24px rgba(0,0,0,0.4)'
                        : '0 8px 24px rgba(0,0,0,0.1)',
                      '& .portfolio-overlay': {
                        opacity: 1,
                      },
                      '& .portfolio-image': {
                        transform: 'scale(1.1)',
                      },
                    },
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
                        <Typography variant="body2" color="text.secondary">Growth</Typography>
                        <Typography variant="h6" color="primary">{item.stats.growth}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Duration</Typography>
                        <Typography variant="h6" color="primary">{item.stats.duration}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">ROI</Typography>
                        <Typography variant="h6" color="primary">{item.stats.roi}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Portfolio;
