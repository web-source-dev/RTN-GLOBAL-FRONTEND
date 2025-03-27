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
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const newsItems = [
  {
    title: 'RTN Global Launches Revolutionary AI Marketing Platform',
    description: 'Our new AI-powered platform helps businesses automate and optimize their digital marketing campaigns with unprecedented accuracy.',
    image: '/images/news/ai-platform-launch.jpg',
    category: 'Product Launch',
    date: 'March 15, 2024',
    readTime: '5 min read',
    author: 'John Smith'
  },
  {
    title: 'Q1 2024 Growth Report: 200% Increase in Client Success Rate',
    description: 'Our latest quarterly report shows remarkable growth in client success metrics, with ROI improvements across all sectors.',
    image: '/images/news/growth-report.jpg',
    category: 'Company News',
    date: 'March 10, 2024',
    readTime: '8 min read',
    author: 'Emma Davis'
  },
  {
    title: 'RTN Global Expands Operations to Asia-Pacific Region',
    description: 'Strategic expansion into APAC markets marks a significant milestone in our global growth strategy.',
    image: '/images/news/global-expansion.jpg',
    category: 'Expansion',
    date: 'March 5, 2024',
    readTime: '6 min read',
    author: 'Michael Wong'
  },
  {
    title: 'New Partnership Announcement with Tech Giants',
    description: 'Strategic partnerships with leading tech companies to enhance our digital marketing capabilities and client services.',
    image: '/images/news/partnership.jpg',
    category: 'Partnership',
    date: 'March 1, 2024',
    readTime: '4 min read',
    author: 'Sarah Johnson'
  }
];

const LatestNews = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
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
          Latest News
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Stay updated with the latest developments and announcements from RTN Global
        </Typography>

        <Grid container spacing={4}>
          {newsItems.map((news, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
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
              >
                <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={news.image}
                    alt={news.title}
                    className="news-image"
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
                      label={news.category}
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
                    {news.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {news.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {news.readTime}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      •
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
                    <Typography variant="body2" color="text.secondary">
                      By {news.author}
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

export default LatestNews;