import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,
  CardActions,
  Chip,
  Avatar,
  useTheme,
  Pagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, ThumbUp, Comment } from '@mui/icons-material';
import API from '../../BackendAPi/ApiProvider';
import SEO from '../common/SEO';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const blogsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/api/blogs?page=${page}&limit=${blogsPerPage}`);
      if (response && response.data) {
        setBlogs(response.data);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };


  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const theme = useTheme();
  // Calculate pagination values
  const indexOfLastBlog = page * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(1).slice(indexOfFirstBlog, indexOfLastBlog);
  const pageCount = Math.ceil((blogs.length - 1) / blogsPerPage);

  // Define structured data for the blog listing page
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "headline": "Web Development & Digital Marketing Blog | RTN Global",
    "description": "Stay updated with the latest web development trends, digital marketing strategies, and technology insights from RTN Global's expert team.",
    "publisher": {
      "@type": "Organization",
      "name": "RTN Global",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rtnglobal.site/images/logo.png"
      }
    },
    "blogPost": blogs.slice(0, 5).map(blog => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": blog.description,
      "datePublished": blog.createdAt,
      "author": {
        "@type": "Person",
        "name": blog.author ? `${blog.author.firstName} ${blog.author.lastName}` : "RTN Global Team"
      },
      "url": `https://rtnglobal.site/blog/post/${blog._id}`
    }))
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <SEO
        title="Web Development & Digital Marketing Blog | Expert Insights"
        description="Stay updated with the latest web development trends, digital marketing strategies, and technology insights from RTN Global's expert team."
        keywords="web development blog, digital marketing blog, web design tips, SEO strategy, technology trends, MERN stack development, React Native tutorials, Wix customization, web optimization"
        canonicalUrl="/blog"
        ogType="blog"
        ogImage="/images/og-blog.png"
        schema={blogListSchema}
      />
      {/* Featured Blog */}
      {blogs.length > 0 && (
        <Box mb={8}>
          <Card
            sx={{
              display: { md: 'flex' },
              mb: 4,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
              }
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: { md: '45%' },
                height: { xs: 280, md: 450 },
                objectFit: 'cover',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
              image={blogs[0].image ? `${process.env.REACT_APP_API_URL}${blogs[0].image}` : '/default-blog.jpg'}
              alt={blogs[0].title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, bgcolor: 'background.paper' }}>
              <CardContent sx={{ flex: '1 0 auto', p: 4 }}>
                <Typography
                  component="h1"
                  variant="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    color: 'text.primary',
                    mb: 2,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    lineHeight: 1.2
                  }}
                >
                  {blogs[0].title}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 3
                  }}
                >
                  <Avatar
                    src={blogs[0].author?.avatar ? `${process.env.REACT_APP_API_URL}${blogs[0].author.avatar}` : undefined}
                    alt={blogs[0].author ? `${blogs[0].author.firstName} ${blogs[0].author.lastName}` : 'Anonymous'}
                    sx={{
                      width: 40,
                      height: 40,
                      border: '2px solid',
                      borderColor: 'primary.main'
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary'
                      }}
                    >
                      {blogs[0].author ? `${blogs[0].author.firstName} ${blogs[0].author.lastName}` : 'Anonymous'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {new Date(blogs[0].createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    color: 'text.secondary',
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    mb: 4
                  }}
                >
                  {blogs[0].description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Chip
                    icon={<ThumbUp sx={{ color: 'primary.main' }} />}
                    label={blogs[0].likes?.length || 0}
                    sx={{
                      borderRadius: '20px',
                      px: 2,
                      py: 0.5,
                      bgcolor: 'primary.soft',
                      color: 'primary.main',
                      fontWeight: 600,
                      '& .MuiChip-icon': {
                        color: 'inherit'
                      }
                    }}
                  />
                  <Chip
                    icon={<Comment sx={{ color: 'secondary.main' }} />}
                    label={`${blogs[0].comments?.length || 0} Comments`}
                    sx={{
                      borderRadius: '20px',
                      px: 2,
                      py: 0.5,
                      bgcolor: 'secondary.soft',
                      color: 'secondary.main',
                      fontWeight: 600,
                      '& .MuiChip-icon': {
                        color: 'inherit'
                      }
                    }}
                  />
                </Box>
              </CardContent>
              <CardActions sx={{ p: 4, pt: 0 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<Visibility />}
                  onClick={() => navigate(`/blog/post/${blogs[0]._id}`)}
                  sx={{
                    borderRadius: '30px',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, primary.main, primary.dark)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  Read More
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Box>
      )}

      <Divider sx={{ mb: 8 }} />

      {/* Recent Blogs Grid */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 6,
          fontWeight: 700,
          color: theme.palette.text.primary
        }}
      >
        Recent Posts
      </Typography>

      <Grid container spacing={4}>
        {currentBlogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
                }
              }}
            >
             <CardMedia
  component="img"
  sx={{
    height: 150, // Set a fixed height
    width: "100%", // Ensures responsiveness
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  }}
  image={blog.image ? `${process.env.REACT_APP_API_URL}${blog.image}` : "/default-blog.jpg"}
  alt={blog.title}
/>

              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: '1.5rem',
                    lineHeight: 1.3
                  }}
                >
                  {blog.title}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    gap: 1
                  }}
                >
                  <Avatar
                    src={blog.author?.avatar}
                    alt={blog.author ? `${blog.author.firstName} ${blog.author.lastName}` : 'Anonymous'}
                    sx={{
                      width: 32,
                      height: 32,
                      border: '2px solid',
                      borderColor: 'primary.light'
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary'
                      }}
                    >
                      {blog.author ? `${blog.author.firstName} ${blog.author.lastName}` : 'Anonymous'}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary' }}
                    >
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Box>
                </Box>
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
                  {blog.description}
                </Typography>

              </CardContent>
              <CardActions
                sx={{
                  justifyContent: 'space-between',
                  px: 3,
                  pb: 3,
                  pt: 0
                }}
              >
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    icon={<ThumbUp sx={{ fontSize: '0.9rem' }} />}
                    label={blog.likes?.length || 0}
                    size="small"
                    sx={{
                      borderRadius: '15px',
                      bgcolor: 'primary.soft',
                      color: 'primary.main',
                      '& .MuiChip-icon': {
                        color: 'inherit'
                      }
                    }}
                  />
                  <Chip
                    icon={<Comment sx={{ fontSize: '0.9rem' }} />}
                    label={blog.comments?.length || 0}
                    size="small"
                    sx={{
                      borderRadius: '15px',
                      bgcolor: 'secondary.soft',
                      color: 'secondary.main',
                      '& .MuiChip-icon': {
                        color: 'inherit'
                      }
                    }}
                  />
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  endIcon={<Visibility />}
                  onClick={() => navigate(`/blog/post/${blog._id}`)}
                  sx={{
                    borderRadius: '20px',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Pagination */}
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
};

export default BlogPage;