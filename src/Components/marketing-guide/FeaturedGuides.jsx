import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  useTheme,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';

const featuredGuides = [
  {
    id: 'seo-strategy-guide-2024',
    title: 'Complete SEO Strategy Guide 2024',
    description: 'Master modern SEO techniques with our comprehensive guide to ranking higher in search results.',
    image: '/images/guides/seo-guide.jpg',
    category: 'SEO',
    readTime: '15 min read',
    difficulty: 'Intermediate',
    author: 'Sarah Johnson',
    slug: '/marketing-guide/seo-strategy-guide-2024',
    ariaLabel: 'Read our complete SEO strategy guide for 2024'
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing Mastery',
    description: 'Learn how to build and engage your audience across all major social media platforms.',
    image: '/images/guides/social-media-guide.jpg',
    category: 'Social Media',
    readTime: '20 min read',
    difficulty: 'Advanced',
    author: 'Mike Thompson',
    slug: '/marketing-guide/social-media-marketing-mastery',
    ariaLabel: 'Read our social media marketing mastery guide'
  },
  {
    id: 'email-marketing-automation',
    title: 'Email Marketing Automation',
    description: 'Discover how to create automated email campaigns that convert subscribers into customers.',
    image: '/images/guides/email-guide.jpg',
    category: 'Email Marketing',
    readTime: '12 min read',
    difficulty: 'Beginner',
    author: 'Emily Chen',
    slug: '/marketing-guide/email-marketing-automation',
    ariaLabel: 'Read our email marketing automation guide'
  }
];

const FeaturedGuides = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="featured-guides"
      aria-labelledby="featured-guides-heading"
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
        aria-hidden="true"
      />

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          id="featured-guides-heading"
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
          Featured Marketing Guides
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Explore our most popular guides to level up your marketing skills
        </Typography>

        <Grid container spacing={4} role="list">
          {featuredGuides.map((guide) => (
            <Grid item xs={12} md={4} key={guide.id} role="listitem">
              <Card
                component="article"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .guide-image': {
                      transform: 'scale(1.1)'
                    }
                  },
                  overflow: 'hidden'
                }}
                id={guide.id}
              >
                <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={guide.image}
                    alt=""
                    className="guide-image"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.6s ease'
                    }}
                    aria-hidden="true"
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 2
                    }}
                  >
                    <Chip
                      label={guide.category}
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        fontWeight: 500
                      }}
                      aria-label={`Category: ${guide.category}`}
                    />
                  </Box>
                </Box>

                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Typography 
                    variant="h5" 
                    component="h3"
                    gutterBottom 
                    id={`guide-title-${guide.id}`}
                    sx={{ fontWeight: 600 }}
                  >
                    {guide.title}
                  </Typography>
                  <Typography 
                    color="text.secondary" 
                    paragraph
                    id={`guide-desc-${guide.id}`}
                  >
                    {guide.description}
                  </Typography>

                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Chip
                      label={guide.readTime}
                      size="small"
                      sx={{
                        bgcolor: theme.palette.primary.main + '15',
                        color: theme.palette.primary.main
                      }}
                      aria-label={`Reading time: ${guide.readTime}`}
                    />
                    <Chip
                      label={guide.difficulty}
                      size="small"
                      sx={{
                        bgcolor: theme.palette.secondary.main + '15',
                        color: theme.palette.secondary.main
                      }}
                      aria-label={`Difficulty level: ${guide.difficulty}`}
                    />
                  </Box>

                  <Box
                    sx={{
                      mt: 3,
                      pt: 3,
                      borderTop: 1,
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" component="p">
                      By {guide.author}
                    </Typography>
                    <Button
                      variant="outlined"
                      endIcon={<LaunchIcon aria-hidden="true" />}
                      size="small"
                      component={RouterLink}
                      to={guide.slug}
                      aria-labelledby={`guide-title-${guide.id}`}
                      aria-describedby={`guide-desc-${guide.id}`}
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      Read Guide
                    </Button>
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

export default FeaturedGuides;