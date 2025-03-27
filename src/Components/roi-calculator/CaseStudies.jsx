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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LaunchIcon from '@mui/icons-material/Launch';

const cases = [
  {
    id: 1,
    title: 'SEO-Driven Traffic Growth',
    excerpt: 'How strategic SEO increased organic traffic by 120% for an e-commerce brand.',
    slug: 'seo-driven-traffic-growth',
    industries: ['E-commerce', 'Retail'],
    featuredImage: '/images/services/Seo.jpeg',
    metrics: { improvement: 120, users: 10000, timeframe: '6 Months' },
  },
  {
    id: 2,
    title: 'Content Marketing Success',
    excerpt: 'A SaaS company tripled its lead generation with high-quality content.',
    slug: 'content-marketing-success',
    industries: ['Technology', 'SaaS'],
    featuredImage: '/images/services/Content.jpeg',
    metrics: { improvement: 200, users: 5000, timeframe: '8 Months' },
  },
  {
    id: 3,
    title: 'Social Media Engagement Surge',
    excerpt: 'A fashion brand saw a 300% increase in engagement with a viral campaign.',
    slug: 'social-media-engagement-surge',
    industries: ['Fashion', 'Retail'],
    featuredImage: '/images/services/Socialmedia.jpeg',
    metrics: { improvement: 300, users: 15000, timeframe: '3 Months' },
  },
];

const CaseStudies = () => {
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
          Success Stories
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          See how our clients achieved exceptional ROI with our marketing strategies
        </Typography>

        <Grid container spacing={4}>
          {cases.map((case_, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .case-image': {
                      transform: 'scale(1.1)'
                    }
                  },
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={case_.featuredImage}
                    alt={case_.title}
                    className="case-image"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.6s ease'
                    }}
                  />
                </Box>

                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="overline"
                    sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
                  >
                    {case_.industries}
                  </Typography>

                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, my: 2 }}>
                    {case_.title}
                  </Typography>

                  <Typography color="text.secondary" paragraph>
                    {case_.excerpt}
                  </Typography>

                  <Grid container spacing={1} sx={{ mb: 3 }}>
                    {Object.entries(case_.metrics).map(([key, value]) => (
                      <Grid item xs={4} key={key}>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            bgcolor: `${theme.palette.primary.main}10`,
                            textAlign: 'center'
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
                          >
                            {value}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {key}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Button
                    variant="outlined"
                    endIcon={<LaunchIcon />}
                    fullWidth
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    View Full Case Study
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CaseStudies;