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
} from '@mui/material';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import VisibilityIcon from '@mui/icons-material/Visibility';

const BlogMegaMenu = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs?has_image=true&limit=6`);
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data);
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
      <Box sx={{ p: 1, width: '100%', maxWidth: '100%', backgroundColor: 'background.paper' }}>
        <Grid container spacing={1}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={4} key={item}>
              <Skeleton variant="rectangular" height={80} />
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
      <Box sx={{ p: 1 }}>
        <Typography color="error">Failed to load blog posts</Typography>
      </Box>
    );
  }



return (
  <Box sx={{ p: 3, width: '100%', maxWidth: '100%', bgcolor: 'background.default' }}>
    <Grid container spacing={2}>

             {/* Latest Blogs Section */}
      <Grid item xs={4}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.5 }}>
          Latest Blogs
        </Typography>
        <Stack spacing={1.5}>
          {blogs.slice(0, 3).map((blog) => (
            <Box
              key={blog._id}
              component={Link}
              to={`/blog/post/${blog._id}`}
              sx={{
                textDecoration: 'none',
                color: 'text.primary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                {blog.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                <Typography variant="caption">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Divider sx={{ mt: 1.5 }} />
            </Box>
          ))}
        </Stack>
      </Grid>
      {/* Trending Blogs Section */}
      <Grid item xs={4}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.5 }}>
          Trending Blogs
        </Typography>
        <Stack spacing={2}>
          {blogs.slice(0, 3).map((blog) => (
            <Card
              key={blog._id}
              component={Link}
              to={`/blog/post/${blog._id}`}
              sx={{
                display: 'flex',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateX(4px)'
                }
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 80, height: 80 }}
                image={`${process.env.REACT_APP_API_URL}${blog.image}`}
                alt={blog.title}
              />
              <CardContent sx={{ flex: 1, p: 1 }}>
                <Typography variant="subtitle2" noWrap>
                  {blog.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <VisibilityIcon sx={{ fontSize: 14, mr: 0.5 }} />
                    <Typography variant="caption">{blog.views || 0}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BookmarkIcon sx={{ fontSize: 14, mr: 0.5 }} />
                    <Typography variant="caption">{blog.bookmarks || 0}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Grid>

 

      {/* Featured Blogs Section */}
      <Grid item xs={4}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.5 }}>
          Featured Blogs
        </Typography>
        <Stack spacing={2}>
          {blogs.slice(0, 3).map((blog) => (
    <Card
    key={blog._id}
    component={Link}
    to={`/blog/post/${blog._id}`}
    sx={{
      display: 'flex',
      textDecoration: 'none',
      transition: 'all 0.2s',
      '&:hover': {
        transform: 'translateX(4px)'
      }
    }}
  >
    <CardMedia
      component="img"
      sx={{ width: 80, height: 80 }}
      image={`${process.env.REACT_APP_API_URL}${blog.image}`}
      alt={blog.title}
    />
    <CardContent sx={{ flex: 1, p: 1 }}>
      <Typography variant="subtitle2" noWrap>
        {blog.title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <VisibilityIcon sx={{ fontSize: 14, mr: 0.5 }} />
          <Typography variant="caption">{blog.views || 0}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BookmarkIcon sx={{ fontSize: 14, mr: 0.5 }} />
          <Typography variant="caption">{blog.bookmarks || 0}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
          ))}
        </Stack>
      </Grid>
    </Grid>
  </Box>
);
};

export default BlogMegaMenu;
