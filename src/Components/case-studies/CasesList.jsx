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
  CardActions,
  Stack,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom';

const dummyCaseStudies = [
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
  {
    id: 4,
    title: 'PPC Advertising ROI Boost',
    excerpt: 'A B2B firm doubled its conversion rate using optimized PPC strategies.',
    slug: 'ppc-advertising-roi-boost',
    industries: ['B2B', 'Technology'],
    featuredImage: '/images/services/ppc.jpeg',
    metrics: { improvement: 100, users: 4000, timeframe: '5 Months' },
  },
  {
    id: 5,
    title: 'Email Marketing Growth',
    excerpt: 'A subscription business improved customer retention by 65% through email automation.',
    slug: 'email-marketing-retention-growth',
    industries: ['Subscription', 'E-commerce'],
    featuredImage: '/images/services/emailMarketing.jpeg',
    metrics: { improvement: 65, users: 8000, timeframe: '7 Months' },
  },
  {
    id: 6,
    title: 'Web Development Success Story',
    excerpt: 'A corporate website revamp increased visitor engagement by 85%.',
    slug: 'web-development-success-story',
    industries: ['Corporate', 'Finance'],
    featuredImage: '/images/services/web2.jpeg',
    metrics: { improvement: 85, users: 12000, timeframe: '4 Months' },
  },
  {
    id: 7,
    title: 'MERN Stack SaaS Platform',
    excerpt: 'A startup built a scalable SaaS platform using MERN stack.',
    slug: 'mern-stack-saas-platform',
    industries: ['Technology', 'Startups'],
    featuredImage: '/images/services/mern1.jpeg',
    metrics: { improvement: 150, users: 20000, timeframe: '1 Year' },
  },
  {
    id: 8,
    title: 'React Native App Success',
    excerpt: 'A mobile app startup grew its user base by 250% with a React Native app.',
    slug: 'react-native-app-success',
    industries: ['Mobile Apps', 'Startups'],
    featuredImage: '/images/services/mobile1.jpeg',
    metrics: { improvement: 250, users: 15000, timeframe: '6 Months' },
  },
  {
    id: 9,
    title: 'E-commerce Sales Funnel Optimization',
    excerpt: 'A DTC brand increased sales by 70% with a revamped conversion funnel.',
    slug: 'ecommerce-sales-funnel-optimization',
    industries: ['E-commerce', 'Retail'],
    featuredImage: '/images/services/ecom1.jpeg',
    metrics: { improvement: 70, users: 9000, timeframe: '5 Months' },
  },
];

const CasesList = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [filter, setFilter] = useState('All');

  // Extract all unique industries and flatten the array
  const allIndustries = dummyCaseStudies.flatMap(study => study.industries);
  const uniqueIndustries = ['All', ...new Set(allIndustries)];

  const filteredCases = filter === 'All' 
    ? dummyCaseStudies 
    : dummyCaseStudies.filter(study => study.industries.includes(filter));

  return (
    <Box
      component="section"
      id="case-studies-list"
      aria-labelledby="success-stories-heading"
      py={12}
      sx={{
        background: isDark
          ? 'background.default'
          : 'background.default',
        position: 'relative',
        overflow: 'hidden',
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
        zIndex: 1,
      }}
      aria-hidden="true"
    />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          id="success-stories-heading"
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
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Discover how we've helped businesses achieve remarkable growth through digital marketing
        </Typography>

        {/* Industry filters */}
        <Box 
          component="nav" 
          aria-label="Filter case studies by industry"
          sx={{ mb: 6, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}
        >
          {uniqueIndustries.map((industry) => (
            <Chip
              key={industry}
              label={industry}
              onClick={() => setFilter(industry)}
              color={filter === industry ? 'primary' : 'default'}
              variant={filter === industry ? 'filled' : 'outlined'}
              aria-pressed={filter === industry}
              role="button"
              tabIndex={0}
              sx={{ m: 0.5 }}
            />
          ))}
        </Box>

        {/* Case studies grid */}
        <Grid container spacing={4} role="list">
          {filteredCases.map((caseStudy) => (
            <Grid item xs={12} sm={6} md={4} key={caseStudy.id} role="listitem">
              <Card 
                component="article"
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={caseStudy.featuredImage}
                  alt={`${caseStudy.title} case study featured image`}
                  loading="lazy"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    {caseStudy.title}
                  </Typography>
                  <Typography variant="body1" component="p" color="text.secondary" paragraph>
                    {caseStudy.excerpt}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
                    {caseStudy.industries.map((industry) => (
                      <Chip 
                        key={industry} 
                        label={industry} 
                        size="small" 
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Stack>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mt: 2,
                      p: 1.5,
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                      borderRadius: 1
                    }}
                    aria-label={`Results: ${caseStudy.metrics.improvement}% improvement with ${caseStudy.metrics.users.toLocaleString()} users over ${caseStudy.metrics.timeframe}`}
                  >
                    <TrendingUpIcon color="success" sx={{ mr: 1 }} aria-hidden="true" />
                    <Typography variant="body2" component="p" fontWeight="medium">
                      {caseStudy.metrics.improvement}% improvement • {caseStudy.metrics.users.toLocaleString()} users • {caseStudy.metrics.timeframe}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    component={Link} 
                    to={`/case-studies/${caseStudy.slug}`}
                    variant="contained" 
                    color="primary" 
                    endIcon={<LaunchIcon />}
                    aria-label={`View full case study about ${caseStudy.title}`}
                    fullWidth
                  >
                    View Case Study
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CasesList;