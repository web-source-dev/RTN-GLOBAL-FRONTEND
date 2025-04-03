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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';

// Case study data
const caseStudies = [
  {
    id: 'ecommerce-optimization',
    title: 'E-commerce ROI Optimization',
    category: 'Retail',
    description: 'How a leading online retailer increased their marketing ROI by 210% in 6 months using our strategies.',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
    imageAlt: 'Person analyzing e-commerce metrics on laptop with sales charts and graphs',
    metrics: {
      roiIncrease: '210%',
      timeframe: '6 months',
      marketingBudget: '$120,000'
    },
    slug: '/case-studies/ecommerce-roi-optimization',
    ariaLabel: 'Read case study about E-commerce ROI Optimization with 210% increase',
    publishDate: '2023-05-15'
  },
  {
    id: 'saas-lead-generation',
    title: 'SaaS Lead Generation Campaign',
    category: 'Technology',
    description: 'A SaaS company that achieved a 185% return on ad spend by optimizing their lead generation strategy.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
    imageAlt: 'Team collaborating on SaaS marketing strategy with digital analytics dashboard in background',
    metrics: {
      roiIncrease: '185%',
      timeframe: '4 months',
      marketingBudget: '$85,000'
    },
    slug: '/case-studies/saas-lead-generation-campaign',
    ariaLabel: 'Read case study about SaaS Lead Generation Campaign with 185% return on ad spend',
    publishDate: '2023-06-22'
  },
  {
    id: 'healthcare-digital-marketing',
    title: 'Healthcare Digital Marketing',
    category: 'Healthcare',
    description: 'How a healthcare provider achieved a 150% ROI through targeted digital marketing campaigns.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
    imageAlt: 'Healthcare professional reviewing digital marketing results with patient engagement metrics',
    metrics: {
      roiIncrease: '150%',
      timeframe: '12 months',
      marketingBudget: '$200,000'
    },
    slug: '/case-studies/healthcare-digital-marketing',
    ariaLabel: 'Read case study about Healthcare Digital Marketing with 150% ROI increase',
    publishDate: '2023-07-10'
  }
];

const CaseStudies = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Create structured data for case studies
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": caseStudies.map((study, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Article",
        "headline": study.title,
        "description": study.description,
        "image": study.image,
        "datePublished": study.publishDate,
        "author": {
          "@type": "Organization",
          "name": "RTN Global"
        },
        "publisher": {
          "@type": "Organization",
          "name": "RTN Global",
          "logo": {
            "@type": "ImageObject",
            "url": "https://example.com/logo.png"
          }
        },
        "url": `https://example.com${study.slug}`
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <Box
        component="section"
        id="case-studies"
        aria-labelledby="case-studies-heading"
        py={10}
        sx={{
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(180deg, #1a1a1a 0%, #121212 100%)' 
            : 'linear-gradient(180deg, #f9f9f9 0%, #ffffff 100%)',
          position: 'relative'
        }}
      >
        {/* Background circle decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.primary.main}30 0%, transparent 70%)`,
            zIndex: 0
          }}
          aria-hidden="true"
        />
        
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h2"
            id="case-studies-heading"
            textAlign="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: 1,
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
            sx={{ maxWidth: '800px', mx: 'auto', mb: 8 }}
          >
            See real results from businesses that have used our ROI calculator and services
          </Typography>
          
          <Grid 
            container 
            spacing={4}
            role="list"
            aria-label="Marketing ROI success stories and case studies"
          >
            {caseStudies.map((study) => (
              <Grid 
                item 
                xs={12} 
                md={4} 
                key={study.id}
                role="listitem"
              >
                <Card
                  component="article"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                    },
                  }}
                  aria-labelledby={`case-study-title-${study.id}`}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={study.image}
                    alt={study.imageAlt}
                    loading="lazy"
                  />
                  <Box sx={{ p: 1, bgcolor: 'background.paper' }}>
                    <Chip
                      label={study.category}
                      size="small"
                      color="primary"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ fontWeight: 600 }} 
                      id={`case-study-title-${study.id}`}
                    >
                      {study.title}
                    </Typography>
                    <Typography variant="body1" component="p" color="text.secondary" paragraph>
                      {study.description}
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={4}>
                        <Typography 
                          variant="h6" 
                          component="p" 
                          sx={{ fontWeight: 700, color: theme.palette.primary.main }} 
                          aria-label={`ROI increase: ${study.metrics.roiIncrease}`}
                        >
                          {study.metrics.roiIncrease}
                        </Typography>
                        <Typography variant="caption" component="p" color="text.secondary">
                          ROI Increase
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography 
                          variant="h6" 
                          component="p" 
                          sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                          aria-label={`Timeframe: ${study.metrics.timeframe}`}
                        >
                          {study.metrics.timeframe}
                        </Typography>
                        <Typography variant="caption" component="p" color="text.secondary">
                          Timeframe
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography 
                          variant="h6" 
                          component="p" 
                          sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                          aria-label={`Marketing budget: ${study.metrics.marketingBudget}`}
                        >
                          {study.metrics.marketingBudget}
                        </Typography>
                        <Typography variant="caption" component="p" color="text.secondary">
                          Budget
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      component={RouterLink}
                      to={study.slug}
                      color="primary"
                      endIcon={<ArrowForwardIcon aria-hidden="true" />}
                      sx={{ fontWeight: 600 }}
                      aria-label={study.ariaLabel}
                    >
                      Read Case Study
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              component={RouterLink}
              to="/case-studies"
              variant="outlined"
              color="primary"
              size="large"
              endIcon={<ArrowForwardIcon aria-hidden="true" />}
              sx={{ 
                fontWeight: 600,
                px: 4,
                py: 1,
                borderRadius: 2,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                }
              }}
              aria-label="View all marketing ROI case studies"
            >
              View All Case Studies
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CaseStudies;