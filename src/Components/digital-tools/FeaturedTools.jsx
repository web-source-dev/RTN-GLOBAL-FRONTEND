import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

const featuredTools = [
  {
    title: 'Marketing Analytics Pro',
    description: 'Enterprise-grade analytics solution with AI-powered insights',
    image: '/images/tools/analytics-pro.jpg',
    features: [
      'AI-powered insights',
      'Custom dashboards',
      'Advanced reporting',
      'Integration capabilities'
    ],
    price: '$199/month',
    popular: true
  },
  {
    title: 'Campaign Suite 360',
    description: 'Complete campaign management platform for multi-channel marketing',
    image: '/images/tools/campaign-suite.jpg',
    features: [
      'Multi-channel campaigns',
      'Automation workflows',
      'Performance tracking',
      'A/B testing'
    ],
    price: '$249/month',
    popular: true
  },
  {
    title: 'SEO PowerTools',
    description: 'Comprehensive SEO toolkit for dominating search rankings',
    image: '/images/tools/seo-tools.jpg',
    features: [
      'Keyword research',
      'Competitor analysis',
      'Rank tracking',
      'Content optimization'
    ],
    price: '$149/month',
    popular: false
  }
];

const FeaturedTools = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

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
          Featured Tools
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Our most powerful marketing tools trusted by industry leaders
        </Typography>

        <Grid container spacing={4}>
          {featuredTools.map((tool, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .tool-image': {
                      transform: 'scale(1.1)'
                    }
                  }
                }}
              >
                {tool.popular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      zIndex: 2,
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}
                  >
                    Popular Choice
                  </Box>
                )}

                <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={tool.image}
                    alt={tool.title}
                    className="tool-image"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease'
                    }}
                  />
                </Box>

                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {tool.title}
                  </Typography>

                  <Typography color="text.secondary" paragraph>
                    {tool.description}
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    {tool.features.map((feature, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                          '&:before': {
                            content: '""',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: theme.palette.primary.main,
                            mr: 1.5
                          }
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box
                    sx={{
                      mt: 4,
                      pt: 3,
                      borderTop: 1,
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
                    >
                      {tool.price}
                    </Typography>
                    <Button
                      variant="contained"
                      endIcon={<LaunchIcon />}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none'
                      }}
                    >
                      Try Now
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

export default FeaturedTools;