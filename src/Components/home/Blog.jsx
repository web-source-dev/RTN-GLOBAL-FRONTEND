import React from 'react';
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, Button, Avatar, Chip, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const blogPosts = [
  {
    title: 'The Future of Digital Marketing in 2025',
    excerpt: 'Explore the emerging trends and technologies shaping the digital marketing landscape.',
    image: '/images/blog/post1.jpg',
    category: 'Trends',
    author: {
      name: 'Emily Johnson',
      avatar: '/images/avatars/avatar1.jpg'
    },
    date: 'Feb 25, 2025'
  },
  {
    title: 'Maximizing ROI with AI-Powered Marketing',
    excerpt: 'Learn how artificial intelligence is revolutionizing marketing strategies and improving returns.',
    image: '/images/blog/post2.jpg',
    category: 'Technology',
    author: {
      name: 'David Chen',
      avatar: '/images/avatars/avatar2.jpg'
    },
    date: 'Feb 20, 2025'
  },
  {
    title: 'Social Media Strategies That Drive Growth',
    excerpt: 'Discover proven social media tactics that can significantly boost your business growth.',
    image: '/images/blog/post3.jpg',
    category: 'Social Media',
    author: {
      name: 'Sarah Miller',
      avatar: '/images/avatars/avatar3.jpg'
    },
    date: 'Feb 15, 2025'
  }
];

const Blog = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <Box 
      py={8} 
      sx={{ 
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(145deg, #fafafa 0%, #f5f5f5 100%)',
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
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Latest Insights
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          textAlign="center" 
          mb={6}
          sx={{ maxWidth: '800px', mx: 'auto' }}
        >
          Stay updated with the latest trends and strategies in digital marketing
        </Typography>
        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={post.image}
                  alt={post.title}
                  sx={{
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '40%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                    }
                  }}
                />
                <Box sx={{ position: 'relative', mt: -3, mx: 2 }}>
                  <Chip
                    label={post.category}
                    color="primary"
                    size="small"
                    sx={{ 
                      borderRadius: '16px',
                      fontWeight: 600,
                      backgroundColor: 'white',
                      color: 'primary.main',
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {post.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {post.excerpt}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={post.author.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                      <Box>
                        <Typography variant="subtitle2">{post.author.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{post.date}</Typography>
                      </Box>
                    </Box>
                    <Button 
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        fontWeight: 600,
                        '&:hover': { transform: 'translateX(4px)' },
                        transition: 'transform 0.2s'
                      }}
                    >
                      Read More
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

export default Blog;
