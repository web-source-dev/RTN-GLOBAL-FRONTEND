import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import UpdateIcon from '@mui/icons-material/Update';
import SecurityIcon from '@mui/icons-material/Security';

const categories = [
  {
    title: 'Getting Started',
    description: 'Essential guides for new users',
    icon: ArticleIcon,
    color: '#2196f3',
    articles: 12,
    popular: ['Quick Start Guide', 'Platform Overview', 'Basic Setup']
  },
  {
    title: 'Technical Guides',
    description: 'Detailed technical documentation',
    icon: CodeIcon,
    color: '#4caf50',
    articles: 25,
    popular: ['API Integration', 'Custom Development', 'Troubleshooting']
  },
  {
    title: 'FAQs',
    description: 'Frequently asked questions',
    icon: HelpIcon,
    color: '#ff9800',
    articles: 30,
    popular: ['Common Issues', 'Account Management', 'Billing Questions']
  },
  {
    title: 'Platform Features',
    description: 'Learn about our platform features',
    icon: SettingsIcon,
    color: '#e91e63',
    articles: 20,
    popular: ['Analytics Tools', 'Campaign Management', 'Reporting']
  },
  {
    title: 'Updates & Changes',
    description: 'Latest platform updates and changes',
    icon: UpdateIcon,
    color: '#9c27b0',
    articles: 15,
    popular: ['Release Notes', 'New Features', 'Upcoming Changes']
  },
  {
    title: 'Security & Privacy',
    description: 'Security guidelines and best practices',
    icon: SecurityIcon,
    color: '#00bcd4',
    articles: 18,
    popular: ['Security Best Practices', 'Privacy Policy', 'Data Protection']
  }
];

const KnowledgeBase = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box
      py={12}
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
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
          Knowledge Base
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Find answers to your questions in our comprehensive knowledge base
        </Typography>

        <Box sx={{ maxWidth: '600px', mx: 'auto', mb: 8 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search knowledge base..."
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
        </Box>

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
                  <Box
                    className="category-icon"
                    sx={{
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: `${category.color}15`,
                      color: category.color,
                      mb: 2,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <category.icon fontSize="large" />
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {category.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {category.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 2,
                      py: 0.5,
                      bgcolor: `${category.color}15`,
                      color: category.color,
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      mb: 2
                    }}
                  >
                    {category.articles} Articles
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    {category.popular.map((article, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                          cursor: 'pointer',
                          '&:hover': { color: category.color },
                          '&:before': {
                            content: '""',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: category.color,
                            mr: 1.5,
                          },
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {article}
                        </Typography>
                      </Box>
                    ))}
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

export default KnowledgeBase;