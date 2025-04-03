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
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const newsItems = [
  {
    id: 'ai-platform-launch',
    title: 'RTN Global Launches Revolutionary AI Marketing Platform',
    description: 'Our new AI-powered platform helps businesses automate and optimize their digital marketing campaigns with unprecedented accuracy.',
    image: '/images/news/ai-platform-launch.jpg',
    category: 'Product Launch',
    date: 'March 15, 2024',
    isoDate: '2024-03-15',
    readTime: '5 min read',
    author: 'John Smith',
    slug: '/news/ai-platform-launch',
    ariaLabel: 'Read about RTN Global\'s AI Marketing Platform launch'
  },
  {
    id: 'growth-report',
    title: 'Q1 2024 Growth Report: 200% Increase in Client Success Rate',
    description: 'Our latest quarterly report shows remarkable growth in client success metrics, with ROI improvements across all sectors.',
    image: '/images/news/growth-report.jpg',
    category: 'Company News',
    date: 'March 10, 2024',
    isoDate: '2024-03-10',
    readTime: '8 min read',
    author: 'Emma Davis',
    slug: '/news/q1-2024-growth-report',
    ariaLabel: 'Read our Q1 2024 Growth Report with 200% client success rate increase'
  },
  {
    id: 'global-expansion',
    title: 'RTN Global Expands Operations to Asia-Pacific Region',
    description: 'Strategic expansion into APAC markets marks a significant milestone in our global growth strategy.',
    image: '/images/news/global-expansion.jpg',
    category: 'Expansion',
    date: 'March 5, 2024',
    isoDate: '2024-03-05',
    readTime: '6 min read',
    author: 'Michael Wong',
    slug: '/news/asia-pacific-expansion',
    ariaLabel: 'Read about RTN Global\'s expansion to Asia-Pacific region'
  },
  {
    id: 'partnership',
    title: 'New Partnership Announcement with Tech Giants',
    description: 'Strategic partnerships with leading tech companies to enhance our digital marketing capabilities and client services.',
    image: '/images/news/partnership.jpg',
    category: 'Partnership',
    date: 'March 1, 2024',
    isoDate: '2024-03-01',
    readTime: '4 min read',
    author: 'Sarah Johnson',
    slug: '/news/tech-partnerships-announcement',
    ariaLabel: 'Read about RTN Global\'s new partnerships with tech giants'
  }
];

const LatestNews = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="latest-news"
      aria-labelledby="latest-news-heading"
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
          id="latest-news-heading"
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
          Latest News
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Stay updated with the latest developments and announcements from RTN Global
        </Typography>

        <Grid container spacing={4} role="list">
          {newsItems.map((news) => (
            <Grid item xs={12} md={6} key={news.id} role="listitem">
              <Card
                component="article"
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .news-image': {
                      transform: 'scale(1.1)'
                    }
                  },
                  overflow: 'hidden'
                }}
                id={news.id}
              >
                <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={news.image}
                    alt=""
                    className="news-image"
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
                      label={news.category}
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        fontWeight: 500
                      }}
                      aria-label={`Category: ${news.category}`}
                    />
                  </Box>
                </Box>

                <CardContent sx={{ p: 4 }}>
                  <Link
                    component={RouterLink}
                    to={news.slug}
                    color="inherit"
                    underline="none"
                    aria-label={news.ariaLabel}
                  >
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ fontWeight: 600 }}
                      id={`news-title-${news.id}`}
                    >
                      {news.title}
                    </Typography>
                  </Link>
                  <Typography 
                    color="text.secondary" 
                    paragraph
                    id={`news-desc-${news.id}`}
                  >
                    {news.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon fontSize="small" color="action" aria-hidden="true" />
                      <Typography variant="body2" color="text.secondary" component="span">
                        {news.readTime}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" component="span" aria-hidden="true">
                      •
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      component="time"
                      dateTime={news.isoDate}
                    >
                      {news.date}
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
                      By {news.author}
                    </Typography>
                    <Box>
                      <IconButton 
                        size="small"
                        aria-label={`Bookmark "${news.title}"`}
                      >
                        <BookmarkBorderIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small"
                        aria-label={`Share "${news.title}"`}
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

export default LatestNews;