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
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';

const resources = [
  {
    title: 'AI in Digital Marketing: 2024 Trends',
    description: 'Explore how artificial intelligence is transforming digital marketing strategies and customer engagement.',
    image: '/images/resources/ai-marketing.jpg',
    category: 'Technology',
    publishedAt: '2 days ago',
    readTime: '8 min read',
    author: 'David Chen'
  },
  {
    title: 'Content Marketing ROI Guide',
    description: 'Learn how to measure and optimize your content marketing efforts for maximum return on investment.',
    image: '/images/resources/content-roi.jpg',
    category: 'Strategy',
    publishedAt: '4 days ago',
    readTime: '12 min read',
    author: 'Rachel Adams'
  },
  {
    title: 'Mobile-First Marketing Strategies',
    description: 'Discover effective strategies for reaching and engaging mobile users in your marketing campaigns.',
    image: '/images/resources/mobile-marketing.jpg',
    category: 'Mobile',
    publishedAt: '1 week ago',
    readTime: '10 min read',
    author: 'James Wilson'
  },
  {
    title: 'Video Marketing Best Practices',
    description: 'Master the art of video marketing with these proven techniques and engagement strategies.',
    image: '/images/resources/video-marketing.jpg',
    category: 'Video',
    publishedAt: '1 week ago',
    readTime: '15 min read',
    author: 'Sarah Thompson'
  }
];

const LatestResources = () => {
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
          Latest Resources
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Stay updated with our newest marketing insights and resources
        </Typography>

        <Grid container spacing={4}>
          {resources.map((resource, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
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
              >
                <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={resource.image}
                    alt={resource.title}
                    className="resource-image"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.6s ease'
                    }}
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
                    />
                  </Box>
                </Box>

                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {resource.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {resource.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {resource.readTime}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      •
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
                    <Typography variant="body2" color="text.secondary">
                      By {resource.author}
                    </Typography>
                    <Box>
                      <IconButton size="small">
                        <BookmarkBorderIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
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