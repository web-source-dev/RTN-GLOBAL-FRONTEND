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
  Button,
  useTheme,
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const featuredGuides = [
  {
    title: 'Complete SEO Strategy Guide 2024',
    description: 'Master modern SEO techniques with our comprehensive guide to ranking higher in search results.',
    image: '/images/guides/seo-guide.jpg',
    category: 'SEO',
    readTime: '15 min read',
    difficulty: 'Intermediate',
    author: 'Sarah Johnson'
  },
  {
    title: 'Social Media Marketing Mastery',
    description: 'Learn how to build and engage your audience across all major social media platforms.',
    image: '/images/guides/social-media-guide.jpg',
    category: 'Social Media',
    readTime: '20 min read',
    difficulty: 'Advanced',
    author: 'Mike Thompson'
  },
  {
    title: 'Email Marketing Automation',
    description: 'Discover how to create automated email campaigns that convert subscribers into customers.',
    image: '/images/guides/email-guide.jpg',
    category: 'Email Marketing',
    readTime: '12 min read',
    difficulty: 'Beginner',
    author: 'Emily Chen'
  }
];

const FeaturedGuides = () => {
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
          Featured Marketing Guides
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Explore our most popular guides to level up your marketing skills
        </Typography>

        <Grid container spacing={4}>
          {featuredGuides.map((guide, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .guide-image': {
                      transform: 'scale(1.1)'
                    }
                  },
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={guide.image}
                    alt={guide.title}
                    className="guide-image"
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
                      label={guide.category}
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        fontWeight: 500
                      }}
                    />
                  </Box>
                </Box>

                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {guide.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {guide.description}
                  </Typography>

                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Chip
                      label={guide.readTime}
                      size="small"
                      sx={{
                        bgcolor: theme.palette.primary.main + '15',
                        color: theme.palette.primary.main
                      }}
                    />
                    <Chip
                      label={guide.difficulty}
                      size="small"
                      sx={{
                        bgcolor: theme.palette.secondary.main + '15',
                        color: theme.palette.secondary.main
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      mt: 3,
                      pt: 3,
                      borderTop: 1,
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      By {guide.author}
                    </Typography>
                    <Button
                      variant="outlined"
                      endIcon={<LaunchIcon />}
                      size="small"
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      Read Guide
                    </Button>
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

export default FeaturedGuides;