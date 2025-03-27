import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, Button, Avatar, Chip, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import API from '../../BackendAPi/ApiProvider';

const Blog = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await API.get('/api/blogs');
        // Take only the latest 3 blogs (they are already sorted by date from the backend)
        setBlogPosts(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);
  
  return (
    <Box 
      py={8} 
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
            <Grid item xs={12} md={4} key={post._id || index}>
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
                  image={`${process.env.REACT_APP_API_URL}${post.image}` || '/images/blog/default.jpg'}
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
                    label="Blog"
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
                  <Typography
  variant="body2"
  sx={{
    color: "text.secondary",
    mb: 3,
    lineHeight: 1.6,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2, // Limits to 2 lines
    overflow: "hidden",
  }}
>
  {post.description}
</Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={post.author?.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                      <Box>
                        <Typography variant="subtitle2">{`${post.author?.firstName} ${post.author?.lastName}`}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Button 
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        fontWeight: 600,
                        '&:hover': { transform: 'translateX(4px)' },
                        transition: 'transform 0.2s'
                      }}
                      href={`/blog/post/${post._id}`}
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
