import React, { useState } from 'react';
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
  TextField,
  InputAdornment,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import { Link as RouterLink } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Digital Marketing in 2024',
    excerpt: 'Explore emerging trends and technologies shaping the digital marketing landscape',
    category: 'Digital Strategy',
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    image: '/images/blog/digital-marketing-future.jpg',
    readTime: '5 min read',
    featured: true
  },
  {
    id: 2,
    title: 'Mastering SEO: A Complete Guide',
    excerpt: 'Learn the latest SEO techniques to improve your website\'s search engine rankings',
    category: 'SEO',
    author: 'Mike Anderson',
    date: 'March 12, 2024',
    image: '/images/blog/seo-guide.jpg',
    readTime: '8 min read',
    featured: true
  },
  {
    id: 3,
    title: 'Social Media Marketing Strategies',
    excerpt: 'Effective strategies to boost your social media presence and engagement',
    category: 'Social Media',
    author: 'Emily Chen',
    date: 'March 10, 2024',
    image: '/images/blog/social-media-strategy.jpg',
    readTime: '6 min read',
    featured: false
  },
  {
    id: 4,
    title: 'Content Marketing Best Practices',
    excerpt: 'Create compelling content that resonates with your target audience',
    category: 'Content',
    author: 'David Wilson',
    date: 'March 8, 2024',
    image: '/images/blog/content-marketing.jpg',
    readTime: '7 min read',
    featured: false
  },
  {
    id: 5,
    title: 'Email Marketing Automation Tips',
    excerpt: 'Streamline your email marketing campaigns with automation',
    category: 'Email Marketing',
    author: 'Lisa Brown',
    date: 'March 5, 2024',
    image: '/images/blog/email-marketing.jpg',
    readTime: '4 min read',
    featured: false
  },
  {
    id: 6,
    title: 'Analytics and Data-Driven Marketing',
    excerpt: 'Leverage data analytics to improve your marketing decisions',
    category: 'Analytics',
    author: 'Tom Parker',
    date: 'March 3, 2024',
    image: '/images/blog/analytics.jpg',
    readTime: '6 min read',
    featured: false
  }
];

const categories = [
  'All',
  'Digital Strategy',
  'SEO',
  'Social Media',
  'Content',
  'Email Marketing',
  'Analytics'
];

const BlogPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 15,
        pb: 8,
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
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
          Blog & Insights
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Stay updated with the latest trends and insights in digital marketing
        </Typography>

        {/* Featured Posts */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
            Featured Articles
          </Typography>
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <Grid item xs={12} md={6} key={post.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Chip
                      label={post.category}
                      size="small"
                      sx={{
                        mb: 2,
                        bgcolor: theme.palette.primary.main + '15',
                        color: theme.palette.primary.main,
                      }}
                    />
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                      {post.title}
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {post.excerpt}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        mt: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {post.author}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {post.readTime}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Search and Filters */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => setSelectedCategory(category)}
                    sx={{
                      bgcolor: selectedCategory === category
                        ? theme.palette.primary.main
                        : isDark ? 'rgba(255,255,255,0.05)' : 'white',
                      color: selectedCategory === category
                        ? 'white'
                        : 'text.primary',
                      '&:hover': {
                        bgcolor: selectedCategory === category
                          ? theme.palette.primary.dark
                          : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* All Posts Grid */}
        <Grid container spacing={4}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Chip
                    label={post.category}
                    size="small"
                    sx={{
                      mb: 2,
                      bgcolor: theme.palette.primary.main + '15',
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                    {post.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {post.excerpt}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      mt: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {post.author}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {post.readTime}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Load More Button */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1,
            }}
          >
            Load More Articles
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogPage;