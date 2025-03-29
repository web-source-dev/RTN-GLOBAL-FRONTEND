import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Skeleton,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
  alpha,
  Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import API from '../../../BackendAPi/ApiProvider';

const BlogMegaMenu = ({ onItemClick }) => {
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const isMedium = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredBlog, setHoveredBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await API.get('/api/blogs?has_image=true&limit=6');
        setBlogs(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        p: { xs: 1, sm: 1.5, md: 2 }, 
        width: '100%', 
        maxWidth: '100%', 
        backgroundColor: 'background.paper' 
      }}>
        <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={4} key={item}>
              <Skeleton variant="rectangular" height={isSmall ? 70 : 80} sx={{ borderRadius: 1 }} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" width="60%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
        <Typography color="error">Failed to load blog posts</Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        p: { xs: 1.5, sm: 2, md: 3 }, 
        width: '100%', 
        maxWidth: '100%', 
        bgcolor: 'background.default',
        background: 'linear-gradient(135deg, rgba(250,252,255,1) 0%, rgba(255,255,255,1) 100%)',
        overflow: 'auto',
        maxHeight: { xs: '70vh', sm: '65vh', md: 'none' }
      }}
    >
      <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
        {/* Latest Blogs Section - Simple list approach */}
        <Grid item xs={12} sm={4}>
          <Typography 
            variant={isSmall ? "body1" : "subtitle1"} 
            sx={{ 
              fontWeight: 600, 
              mb: { xs: 1, sm: 1.5 }, 
              borderBottom: '2px solid', 
              borderColor: 'primary.main', 
              pb: 0.5,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FiberNewIcon sx={{ mr: 0.5, fontSize: isSmall ? '1rem' : '1.25rem', color: 'primary.main' }} />
            Latest Blogs
          </Typography>
          
          <Stack spacing={{ xs: 1, sm: 1.5 }}>
            {blogs.slice(0, 4).map((blog, index) => (
              <Paper
                key={blog._id}
                elevation={0}
                component={Link}
                to={`/blog/post/${blog._id}`}
                onClick={onItemClick}
                onMouseEnter={() => setHoveredBlog(blog._id)}
                onMouseLeave={() => setHoveredBlog(null)}
                sx={{
                  p: { xs: 1, sm: 1.5 },
                  borderRadius: { xs: 1, sm: 1.5 },
                  textDecoration: 'none',
                  color: 'text.primary',
                  transition: 'all 0.2s',
                  border: '1px solid',
                  borderColor: hoveredBlog === blog._id ? 'primary.light' : 'divider',
                  boxShadow: hoveredBlog === blog._id ? 
                    `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}` : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': { 
                    borderColor: 'primary.light',
                    transform: 'translateY(-2px)',
                    backgroundColor: alpha(theme.palette.primary.main, 0.02)
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '3px',
                    backgroundColor: hoveredBlog === blog._id ? 'primary.main' : 'transparent',
                    transition: 'all 0.2s',
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Typography 
                    variant={isSmall ? "body2" : "subtitle2"} 
                    gutterBottom
                    sx={{ 
                      fontWeight: 500, 
                      color: hoveredBlog === blog._id ? 'primary.main' : 'text.primary',
                      transition: 'color 0.2s',
                      pl: hoveredBlog === blog._id ? 0.5 : 0
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5, 
                    mt: 1,
                    justifyContent: 'space-between'
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5,
                      color: 'text.secondary',
                      fontSize: { xs: '0.65rem', sm: '0.7rem' }
                    }}>
                      <AccessTimeIcon sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }} />
                      <Typography variant="caption">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Chip 
                      label={`0${index + 1}`} 
                      size="small"
                      sx={{ 
                        height: { xs: 16, sm: 20 }, 
                        fontSize: { xs: '0.6rem', sm: '0.65rem' },
                        backgroundColor: index === 0 ? 'primary.light' : 'grey.100',
                        color: index === 0 ? 'white' : 'text.secondary',
                        fontWeight: 600
                      }} 
                    />
                  </Box>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Grid>
        
        {/* Trending Blogs Section - Visual cards */}
        <Grid item xs={12} sm={4}>
          <Typography 
            variant={isSmall ? "body1" : "subtitle1"} 
            sx={{ 
              fontWeight: 600, 
              mb: { xs: 1, sm: 1.5 }, 
              borderBottom: '2px solid', 
              borderColor: 'secondary.main', 
              pb: 0.5,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TrendingUpIcon sx={{ mr: 0.5, fontSize: isSmall ? '1rem' : '1.25rem', color: 'secondary.main' }} />
            Trending Blogs
          </Typography>
          
          <Stack spacing={{ xs: 1, sm: 1.5 }}>
            {blogs.slice(0, 4).map((blog) => (
              <Card
                key={blog._id}
                component={Link}
                to={`/blog/post/${blog._id}`}
                onClick={onItemClick}
                onMouseEnter={() => setHoveredBlog(blog._id)}
                onMouseLeave={() => setHoveredBlog(null)}
                sx={{
                  display: 'flex',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  border: '1px solid',
                  borderColor: hoveredBlog === blog._id ? 'secondary.light' : 'divider',
                  borderRadius: { xs: 1, sm: 1.5 },
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    boxShadow: `0 4px 15px ${alpha(theme.palette.secondary.main, 0.15)}`
                  }
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    width: { xs: 70, sm: 80 }, 
                    height: { xs: 70, sm: 80 },
                    transition: 'all 0.3s ease',
                    filter: hoveredBlog === blog._id ? 'brightness(1.1)' : 'none',
                    transform: hoveredBlog === blog._id ? 'scale(1.05)' : 'none'
                  }}
                  image={`${process.env.REACT_APP_API_URL}${blog.image}`}
                  alt={blog.title}
                />
                <CardContent 
                  sx={{ 
                    flex: 1, 
                    p: { xs: 1, sm: 1.5 },
                    '&:last-child': { pb: { xs: 1, sm: 1.5 } }
                  }}
                >
                  <Typography 
                    variant={isSmall ? "body2" : "subtitle2"} 
                    noWrap
                    sx={{ 
                      fontWeight: 500,
                      color: hoveredBlog === blog._id ? 'secondary.main' : 'text.primary',
                      transition: 'color 0.2s',
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 0.75, sm: 1 }, 
                    mt: { xs: 0.5, sm: 0.75 },
                    justifyContent: 'space-between'
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 0.5,
                      color: hoveredBlog === blog._id ? 'secondary.dark' : 'text.secondary',
                      transition: 'color 0.2s',
                    }}>
                      <VisibilityIcon sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }} />
                      <Typography 
                        variant="caption"
                        sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}
                      >
                        {blog.views || 0}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      color: hoveredBlog === blog._id ? 'secondary.dark' : 'text.secondary',
                      transition: 'color 0.2s',
                    }}>
                      <BookmarkIcon sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' }, mr: 0.5 }} />
                      <Typography 
                        variant="caption"
                        sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}
                      >
                        {blog.bookmarks || 0}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* Featured Blogs Section - More prominent */}
        <Grid item xs={12} sm={4}>
          <Typography 
            variant={isSmall ? "body1" : "subtitle1"} 
            sx={{ 
              fontWeight: 600, 
              mb: { xs: 1, sm: 1.5 }, 
              borderBottom: '2px solid', 
              borderColor: 'warning.main', 
              pb: 0.5,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <StarIcon sx={{ mr: 0.5, fontSize: isSmall ? '1rem' : '1.25rem', color: 'warning.main' }} />
            Featured Blogs
          </Typography>
          
          <Stack spacing={{ xs: 1, sm: 1.5 }}>
            {blogs.slice(0, 3).map((blog, index) => (
              <Card
                key={blog._id}
                component={Link}
                to={`/blog/post/${blog._id}`}
                onClick={onItemClick}
                onMouseEnter={() => setHoveredBlog(blog._id)}
                onMouseLeave={() => setHoveredBlog(null)}
                sx={{
                  position: 'relative',
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                  borderRadius: { xs: 1, sm: 1.5 },
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: hoveredBlog === blog._id ? 'warning.light' : 'divider',
                  height: index === 0 && !isSmall ? '120px' : { xs: '80px', sm: '90px' },
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.01)',
                    boxShadow: `0 8px 20px ${alpha(theme.palette.warning.main, 0.15)}`
                  }
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.4s ease',
                    transform: hoveredBlog === blog._id ? 'scale(1.05)' : 'scale(1)',
                    filter: hoveredBlog === blog._id ? 'brightness(0.8)' : 'brightness(0.7)'
                  }}
                  image={`${process.env.REACT_APP_API_URL}${blog.image}`}
                  alt={blog.title}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 1, sm: 1.5 },
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 100%)',
                    color: 'white',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Typography 
                    variant={index === 0 && !isSmall ? "subtitle1" : "subtitle2"} 
                    sx={{ 
                      fontWeight: 500,
                      textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                      transform: hoveredBlog === blog._id ? 'translateY(-3px)' : 'none',
                      transition: 'transform 0.3s'
                    }}
                  >
                    {blog.title}
                  </Typography>
                  
                  {index === 0 && !isExtraSmall && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block', 
                        mt: 0.5, 
                        opacity: 0.9,
                        maxWidth: '90%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {blog.excerpt || "Featured post from our blog collection"}
                    </Typography>
                  )}
                </Box>
                
                <Chip 
                  label="FEATURED" 
                  size="small"
                  sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8,
                    height: 20,
                    fontSize: '0.65rem',
                    backgroundColor: 'warning.main',
                    color: 'white',
                    opacity: index === 0 ? 1 : 0.8,
                    fontWeight: 600
                  }} 
                />
              </Card>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlogMegaMenu;
