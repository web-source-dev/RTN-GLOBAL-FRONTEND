import React, { useState } from 'react';
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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LaunchIcon from '@mui/icons-material/Launch';

const cases = [
  {
    title: 'E-commerce Revenue Growth',
    client: 'Fashion Retailer',
    industry: 'Retail',
    description: 'Increased online sales by 200% through targeted digital marketing and SEO optimization',
    image: '/images/case-studies/ecommerce.jpg',
    results: {
      revenue: '+200%',
      traffic: '+150%',
      conversion: '+75%'
    },
    tags: ['E-commerce', 'SEO', 'PPC']
  },
  {
    title: 'B2B Lead Generation',
    client: 'Software Company',
    industry: 'Technology',
    description: 'Generated 500+ qualified leads per month through integrated marketing campaign',
    image: '/images/case-studies/b2b.jpg',
    results: {
      leads: '+300%',
      meetings: '+200%',
      roi: '+400%'
    },
    tags: ['B2B', 'Lead Gen', 'Content Marketing']
  },
  {
    title: 'Brand Awareness Campaign',
    client: 'Startup',
    industry: 'Healthcare',
    description: 'Increased brand visibility and engagement across social media platforms',
    image: '/images/case-studies/brand.jpg',
    results: {
      reach: '+500%',
      engagement: '+250%',
      followers: '+300%'
    },
    tags: ['Branding', 'Social Media', 'Content']
  },
  {
    title: 'Local Business Growth',
    client: 'Restaurant Chain',
    industry: 'Food & Beverage',
    description: 'Boosted local presence and customer acquisition through targeted campaigns',
    image: '/images/case-studies/local.jpg',
    results: {
      customers: '+150%',
      revenue: '+180%',
      roi: '+300%'
    },
    tags: ['Local SEO', 'PPC', 'Social Media']
  }
];

const CasesList = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [filter, setFilter] = useState('All');

  const industries = ['All', ...new Set(cases.map(c => c.industry))];

  const filteredCases = filter === 'All' 
    ? cases 
    : cases.filter(c => c.industry === filter);

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
      <Container maxWidth="lg">
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
          Discover how we've helped businesses achieve remarkable growth through digital marketing
        </Typography>

        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          {industries.map((industry) => (
            <Button
              key={industry}
              variant={filter === industry ? 'contained' : 'outlined'}
              onClick={() => setFilter(industry)}
              sx={{
                borderRadius: '20px',
                px: 3,
                py: 1,
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              }}
            >
              {industry}
            </Button>
          ))}
        </Box>

        <Grid container spacing={4}>
          {filteredCases.map((case_, index) => (
            <Grid item xs={12} md={6} key={index}>
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
                    image={case_.image}
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

                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="overline"
                    sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
                  >
                    {case_.client} • {case_.industry}
                  </Typography>

                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, my: 2 }}>
                    {case_.title}
                  </Typography>

                  <Typography color="text.secondary" paragraph>
                    {case_.description}
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {Object.entries(case_.results).map(([key, value]) => (
                      <Grid item xs={4} key={key}>
                        <Box
                          sx={{
                            p: 2,
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

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {case_.tags.map((tag, idx) => (
                      <Chip
                        key={idx}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: `${theme.palette.primary.main}15`,
                          color: theme.palette.primary.main
                        }}
                      />
                    ))}
                  </Box>

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
                    View Case Study
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

export default CasesList;