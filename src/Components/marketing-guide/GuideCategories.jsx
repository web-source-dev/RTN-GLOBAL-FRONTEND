import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CampaignIcon from '@mui/icons-material/Campaign';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShareIcon from '@mui/icons-material/Share';
import EmailIcon from '@mui/icons-material/Email';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const categories = [
  {
    title: 'SEO Mastery',
    description: 'Learn advanced SEO techniques to improve your search rankings',
    icon: SearchIcon,
    color: '#2196f3',
    articles: 15,
    level: 'All Levels'
  },
  {
    title: 'Content Marketing',
    description: 'Create compelling content that drives engagement and conversions',
    icon: CampaignIcon,
    color: '#4caf50',
    articles: 12,
    level: 'Intermediate'
  },
  {
    title: 'Analytics & Data',
    description: 'Master data-driven marketing decisions and optimization',
    icon: BarChartIcon,
    color: '#ff9800',
    articles: 10,
    level: 'Advanced'
  },
  {
    title: 'Social Media',
    description: 'Build and engage your audience across social platforms',
    icon: ShareIcon,
    color: '#e91e63',
    articles: 18,
    level: 'Beginner'
  },
  {
    title: 'Email Marketing',
    description: 'Create effective email campaigns that convert',
    icon: EmailIcon,
    color: '#9c27b0',
    articles: 14,
    level: 'Intermediate'
  },
  {
    title: 'Growth Strategies',
    description: 'Comprehensive guides for scaling your marketing efforts',
    icon: TrendingUpIcon,
    color: '#00bcd4',
    articles: 16,
    level: 'Advanced'
  }
];

const GuideCategories = () => {
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
          Marketing Guide Categories
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Explore our comprehensive collection of marketing guides and resources
        </Typography>

        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .category-icon': {
                      transform: 'scale(1.1)',
                    },
                  },
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle at top right, ${category.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%',
                  }}
                />
                <CardContent sx={{ p: 4 }}>
                  <IconButton
                    className="category-icon"
                    sx={{
                      mb: 2,
                      bgcolor: `${category.color}15`,
                      color: category.color,
                      transition: 'transform 0.3s ease',
                      '&:hover': { bgcolor: `${category.color}25` },
                    }}
                    size="large"
                  >
                    <category.icon fontSize="large" />
                  </IconButton>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {category.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {category.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        px: 2,
                        py: 0.5,
                        bgcolor: `${category.color}15`,
                        color: category.color,
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      {category.articles} Articles
                    </Box>
                    <Box
                      sx={{
                        px: 2,
                        py: 0.5,
                        bgcolor: theme.palette.primary.main + '15',
                        color: theme.palette.primary.main,
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      {category.level}
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

export default GuideCategories;