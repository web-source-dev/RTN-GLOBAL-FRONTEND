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
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Essential guides for new users',
    icon: ArticleIcon,
    color: '#2196f3',
    articles: 12,
    popular: ['Quick Start Guide', 'Platform Overview', 'Basic Setup']
  },
  {
    id: 'technical-guides',
    title: 'Technical Guides',
    description: 'Detailed technical documentation',
    icon: CodeIcon,
    color: '#4caf50',
    articles: 25,
    popular: ['API Integration', 'Custom Development', 'Troubleshooting']
  },
  {
    id: 'faqs',
    title: 'FAQs',
    description: 'Frequently asked questions',
    icon: HelpIcon,
    color: '#ff9800',
    articles: 30,
    popular: ['Common Issues', 'Account Management', 'Billing Questions']
  },
  {
    id: 'platform-features',
    title: 'Platform Features',
    description: 'Learn about our platform features',
    icon: SettingsIcon,
    color: '#e91e63',
    articles: 20,
    popular: ['Analytics Tools', 'Campaign Management', 'Reporting']
  },
  {
    id: 'updates',
    title: 'Updates & Changes',
    description: 'Latest platform updates and changes',
    icon: UpdateIcon,
    color: '#9c27b0',
    articles: 15,
    popular: ['Release Notes', 'New Features', 'Upcoming Changes']
  },
  {
    id: 'security',
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
      component="section"
      id="knowledge-base"
      aria-labelledby="knowledge-base-title"
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
          opacity: 0.1,
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
          id="knowledge-base-title"
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
          component="p"
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
            aria-label="Search knowledge base"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" aria-hidden="true" />
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

        <Grid 
          container 
          spacing={4} 
          role="list" 
          aria-label="Knowledge base categories"
        >
          {categories.map((category, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={category.id}
              role="listitem"
            >
              <Card
                component="article"
                id={`category-${category.id}`}
                aria-labelledby={`category-title-${category.id}`}
                aria-describedby={`category-desc-${category.id}`}
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
                  aria-hidden="true"
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
                    aria-hidden="true"
                  >
                    <category.icon fontSize="large" />
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    id={`category-title-${category.id}`}
                    gutterBottom 
                    sx={{ fontWeight: 600 }}
                  >
                    {category.title}
                  </Typography>
                  <Typography 
                    color="text.secondary" 
                    id={`category-desc-${category.id}`}
                    paragraph
                  >
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
                  <Box 
                    component="ul" 
                    sx={{ 
                      mt: 2, 
                      pl: 0, 
                      listStyleType: 'none' 
                    }}
                    aria-label={`Popular articles in ${category.title}`}
                  >
                    {category.popular.map((article, idx) => (
                      <Box
                        component="li"
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
                        <Typography 
                          component="a"
                          href={`/knowledge/${category.id}/${article.toLowerCase().replace(/\s+/g, '-')}`}
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            textDecoration: 'none',
                            '&:hover': { 
                              textDecoration: 'underline',
                              color: category.color
                            }
                          }}
                        >
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