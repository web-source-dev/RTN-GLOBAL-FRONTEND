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
  Avatar,
  Divider,
  useTheme,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link as RouterLink } from 'react-router-dom';
import CommentSection from './CommentSection';

// Mock data for the blog post
const post = {
  id: 1,
  title: 'The Future of Digital Marketing in 2024',
  content: `<p>The digital marketing landscape is constantly evolving, and staying ahead of the curve is crucial for businesses looking to maintain their competitive edge. As we move into 2024, several key trends are shaping the future of digital marketing.</p>

<h2>1. Artificial Intelligence and Machine Learning</h2>
<p>AI and ML are revolutionizing how marketers analyze data, predict consumer behavior, and personalize content. From chatbots to predictive analytics, these technologies are becoming increasingly sophisticated and accessible.</p>

<h2>2. Voice Search Optimization</h2>
<p>With the growing popularity of voice-activated devices, optimizing content for voice search is becoming essential. This means focusing on natural language patterns and long-tail keywords.</p>

<h2>3. Video Marketing Evolution</h2>
<p>Short-form video content continues to dominate social media platforms, while interactive and shoppable videos are creating new opportunities for engagement and conversion.</p>`,
  category: 'Digital Strategy',
  author: {
    name: 'Sarah Johnson',
    role: 'Digital Marketing Director',
    avatar: '/images/team/sarah-johnson.jpg',
    bio: 'Sarah has over 10 years of experience in digital marketing and specializes in emerging technologies.'
  },
  date: 'March 15, 2024',
  image: '/images/blog/digital-marketing-future.jpg',
  readTime: '5 min read',
  tags: ['Digital Marketing', 'AI', 'Technology', 'Trends']
};

// Mock data for related posts
const relatedPosts = [
  {
    id: 2,
    title: 'Mastering SEO: A Complete Guide',
    excerpt: 'Learn the latest SEO techniques to improve your website\'s search engine rankings',
    category: 'SEO',
    image: '/images/blog/seo-guide.jpg',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'Social Media Marketing Strategies',
    excerpt: 'Effective strategies to boost your social media presence and engagement',
    category: 'Social Media',
    image: '/images/blog/social-media-strategy.jpg',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'Content Marketing Best Practices',
    excerpt: 'Create compelling content that resonates with your target audience',
    category: 'Content',
    image: '/images/blog/content-marketing.jpg',
    readTime: '7 min read'
  }
];

const BlogPost = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

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
      <Container maxWidth="lg">
        {/* Header Image */}
        <Box
          sx={{
            height: { xs: '300px', md: '400px' },
            width: '100%',
            borderRadius: 4,
            overflow: 'hidden',
            mb: 4,
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Post Header */}
        <Box sx={{ mb: 6 }}>
          <Chip
            label={post.category}
            sx={{
              mb: 2,
              bgcolor: theme.palette.primary.main + '15',
              color: theme.palette.primary.main,
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              mb: 3,
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {post.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {post.date}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {post.readTime}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 4,
                p: { xs: 3, md: 6 },
                mb: 4,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />

              {/* Tags */}
              <Box sx={{ mt: 4, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {post.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      bgcolor: theme.palette.primary.main + '10',
                      color: theme.palette.primary.main,
                    }}
                  />
                ))}
              </Box>

              {/* Comments Section */}
              <CommentSection />
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Author Card */}
            <Card
              sx={{
                mb: 4,
                borderRadius: 4,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={post.author.avatar}
                    sx={{ width: 64, height: 64, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {post.author.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.author.role}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {post.author.bio}
                </Typography>
              </CardContent>
            </Card>

            {/* Related Posts */}
            <Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                Related Articles
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    sx={{
                      display: 'flex',
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      },
                    }}
                    component={RouterLink}
                    to={`/blog/${relatedPost.id}`}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 120 }}
                      image={relatedPost.image}
                      alt={relatedPost.title}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        {relatedPost.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon
                          fontSize="small"
                          sx={{ color: 'text.secondary', fontSize: '1rem' }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {relatedPost.readTime}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogPost;