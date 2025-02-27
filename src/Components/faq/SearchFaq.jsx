import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';

const searchResults = [
  {
    question: 'How to set up campaign tracking?',
    answer: 'Learn how to set up and monitor your campaign performance with our analytics tools.',
    category: 'Analytics',
    relevance: 0.95
  },
  {
    question: 'Integration with Google Analytics',
    answer: 'Step-by-step guide to connecting your Google Analytics account with our platform.',
    category: 'Integrations',
    relevance: 0.88
  },
  {
    question: 'Creating custom reports',
    answer: 'Customize your analytics reports to focus on the metrics that matter most to your business.',
    category: 'Reporting',
    relevance: 0.82
  },
  {
    question: 'Email campaign best practices',
    answer: 'Tips and guidelines for creating effective email marketing campaigns.',
    category: 'Email Marketing',
    relevance: 0.75
  },
  {
    question: 'Understanding conversion tracking',
    answer: 'Learn how to track and optimize your conversion rates across different channels.',
    category: 'Analytics',
    relevance: 0.70
  }
];

const SearchFaq = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box
      py={8}
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
          Search Knowledge Base
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Find answers to your questions in our comprehensive knowledge base
        </Typography>

        <Box sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: {
                bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }
              }
            }}
          />
        </Box>

        <Card
          sx={{
            maxWidth: 800,
            mx: 'auto',
            background: isDark
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: 2,
          }}
        >
          <CardContent>
            <List>
              {searchResults.map((result, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider />}
                  <ListItem
                    sx={{
                      py: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: isDark
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(0,0,0,0.02)'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        mr: 2,
                        p: 1,
                        borderRadius: 1,
                        bgcolor: theme.palette.primary.main + '15',
                        color: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <ArticleIcon />
                    </Box>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 500 }}>
                          {result.question}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography color="text.secondary" paragraph sx={{ mb: 1 }}>
                            {result.answer}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              sx={{
                                px: 1.5,
                                py: 0.5,
                                borderRadius: '12px',
                                bgcolor: theme.palette.primary.main + '15',
                                color: theme.palette.primary.main,
                                fontSize: '0.75rem',
                                fontWeight: 500
                              }}
                            >
                              {result.category}
                            </Box>
                            <Typography
                              variant="caption"
                              sx={{ color: 'text.secondary' }}
                            >
                              Relevance: {(result.relevance * 100).toFixed(0)}%
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SearchFaq;