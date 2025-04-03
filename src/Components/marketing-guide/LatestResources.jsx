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
  IconButton,
  useTheme,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';

const resources = [
  {
    id: 'ai-in-digital-marketing',
    title: 'AI in Digital Marketing: 2024 Trends',
    description: 'Explore how artificial intelligence is transforming digital marketing strategies and customer engagement.',
    image: '/images/resources/ai-marketing.jpg',
    category: 'Technology',
    publishedAt: '2 days ago',
    publishedDate: '2024-01-15',
    readTime: '8 min read',
    author: 'David Chen',
    slug: '/marketing-guide/ai-digital-marketing-trends',
    ariaLabel: 'Read about AI in Digital Marketing: 2024 Trends'
  },
  {
    id: 'content-marketing-roi',
    title: 'Content Marketing ROI Guide',
    description: 'Learn how to measure and optimize your content marketing efforts for maximum return on investment.',
    image: '/images/resources/content-roi.jpg',
    category: 'Strategy',
    publishedAt: '4 days ago',
    publishedDate: '2024-01-13',
    readTime: '12 min read',
    author: 'Rachel Adams',
    slug: '/marketing-guide/content-marketing-roi-guide',
    ariaLabel: 'Read our Content Marketing ROI Guide'
  },
  {
    id: 'mobile-first-marketing',
    title: 'Mobile-First Marketing Strategies',
    description: 'Discover effective strategies for reaching and engaging mobile users in your marketing campaigns.',
    image: '/images/resources/mobile-marketing.jpg',
    category: 'Mobile',
    publishedAt: '1 week ago',
    publishedDate: '2024-01-10',
    readTime: '10 min read',
    author: 'James Wilson',
    slug: '/marketing-guide/mobile-first-marketing-strategies',
    ariaLabel: 'Read about Mobile-First Marketing Strategies'
  },
  {
    id: 'video-marketing',
    title: 'Video Marketing Best Practices',
    description: 'Master the art of video marketing with these proven techniques and engagement strategies.',
    image: '/images/resources/video-marketing.jpg',
    category: 'Video',
    publishedAt: '1 week ago',
    publishedDate: '2024-01-10',
    readTime: '15 min read',
    author: 'Sarah Thompson',
    slug: '/marketing-guide/video-marketing-best-practices',
    ariaLabel: 'Read about Video Marketing Best Practices'
  }
];

const LatestResources = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="latest-resources"
      aria-labelledby="latest-resources-heading"
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
          id="latest-resources-heading"
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
          Latest Resources
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Stay updated with our newest marketing insights and resources
        </Typography>

        <Grid container spacing={4} role="list">
          {resources.map((resource) => (
            <Grid item xs={12} md={6} key={resource.id} role="listitem">
              <Card
                component="article"
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .resource-image': {
                      transform: 'scale(1.1)'
                    }
                  },
                  overflow: 'hidden'
                }}
                id={resource.id}
              >
                <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={resource.image}
                    alt=""
                    className="resource-image"
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
                      label={resource.category}
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        fontWeight: 500
                      }}
                      aria-label={`Category: ${resource.category}`}
                    />
                  </Box>
                </Box>

                <CardContent sx={{ p: 4 }}>
                  <Link
                    component={RouterLink}
                    to={resource.slug}
                    color="inherit"
                    underline="none"
                    aria-label={resource.ariaLabel}
                  >
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ fontWeight: 600 }}
                      id={`resource-title-${resource.id}`}
                    >
                      {resource.title}
                    </Typography>
                  </Link>
                  <Typography 
                    color="text.secondary" 
                    paragraph
                    id={`resource-desc-${resource.id}`}
                  >
                    {resource.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon fontSize="small" color="action" aria-hidden="true" />
                      <Typography variant="body2" color="text.secondary" component="span">
                        {resource.readTime}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" component="span" aria-hidden="true">
                      •
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      component="time"
                      dateTime={resource.publishedDate}
                    >
                      {resource.publishedAt}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pt: 2,
                      borderTop: 1,
                      borderColor: 'divider'
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" component="p">
                      By {resource.author}
                    </Typography>
                    <Box>
                      <IconButton 
                        size="small" 
                        aria-label={`Save "${resource.title}" to bookmarks`}
                      >
                        <BookmarkBorderIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        aria-label={`Share "${resource.title}"`}
                      >
                        <ShareIcon fontSize="small" />
                      </IconButton>
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

export default LatestResources;