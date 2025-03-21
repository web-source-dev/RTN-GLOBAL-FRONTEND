import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

// Dummy Data for Development
const dummyCaseStudies = [
    {
      id: 1,
      title: 'AI-powered Marketing Growth',
      excerpt: 'How AI improved customer engagement by 75% for a SaaS company.',
      slug: 'ai-powered-marketing-growth',
      industries: ['Technology', 'Finance'],
      featuredImage: '/images/services/ppc.png',
      metrics: { improvement: 75, users: 5000, timeframe: '6 Months' },
    },
    {
      id: 2,
      title: 'Healthcare Digital Transformation',
      excerpt: 'A hospital increased operational efficiency by 60% with automation.',
      slug: 'healthcare-digital-transformation',
      industries: ['Healthcare'],
      featuredImage: '/images/services/ppc.png',
      metrics: { improvement: 60, users: 2000, timeframe: '1 Year' },
    },
    {
      id: 3,
      title: 'Fintech Security Enhancement',
      excerpt: 'Enhanced security protocols reduced fraud by 40% for a bank.',
      slug: 'fintech-security-enhancement',
      industries: ['Finance'],
      featuredImage: '/images/services/ppc.png',
      metrics: { improvement: 40, users: 10000, timeframe: '8 Months' },
    },
    {
      id: 4,
      title: 'E-commerce Conversion Boost',
      excerpt: 'A retailer increased online sales by 50% using data-driven strategies.',
      slug: 'ecommerce-conversion-boost',
      industries: ['Retail', 'E-commerce'],
      featuredImage: '/images/services/ppc.png',
      metrics: { improvement: 50, users: 8000, timeframe: '5 Months' },
    },
    {
      id: 5,
      title: 'EdTech Platform Scalability',
      excerpt: 'Optimized infrastructure enabled an EdTech platform to support 3x more users.',
      slug: 'edtech-platform-scalability',
      industries: ['Education', 'Technology'],
      featuredImage: '/images/services/ppc.png',
      metrics: { improvement: 200, users: 15000, timeframe: '1 Year' },
    },
    {
      id: 6,
      title: 'Real Estate Lead Generation',
      excerpt: 'A real estate firm doubled its lead conversion rate with targeted advertising.',
      slug: 'real-estate-lead-generation',
      industries: ['Real Estate'],
      featuredImage: '/images/services/ppc.png',
      metrics: { improvement: 100, users: 5000, timeframe: '7 Months' },
    },
    {
      id: 7,
      title: 'Manufacturing Process Optimization',
      excerpt: 'AI-driven automation reduced production costs by 30%.',
      slug: 'manufacturing-process-optimization',
      industries: ['Manufacturing'],
      featuredImage: '/images/services/ppc.png',
      metrics: { improvement: 30, users: 1200, timeframe: '9 Months' },
    },
    {
      id: 8,
      title: 'Logistics Route Optimization',
      excerpt: 'Optimized delivery routes reduced fuel costs by 25% for a logistics company.',
      slug: 'logistics-route-optimization',
      industries: ['Logistics', 'Transportation'],
      featuredImage: '/images/services/ppc.png',
      metrics: { improvement: 25, users: 3000, timeframe: '4 Months' },
    },
    {
      id: 9,
      title: 'Hospitality Revenue Growth',
      excerpt: 'A hotel chain increased bookings by 45% with a revamped digital presence.',
      slug: 'hospitality-revenue-growth',
      industries: ['Hospitality'],
      featuredImage: '/images/services/ppc.png',
      metrics: { improvement: 45, users: 7000, timeframe: '6 Months' },
    },
  ];
  
const CaseStudiesMegaMenu = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeStudy, setActiveStudy] = useState(null);

//   useEffect(() => {
//     const fetchCaseStudies = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/case-studies/featured`);
//         if (!response.ok) throw new Error('Failed to fetch case studies');
//         const data = await response.json();
//         setCaseStudies(data);
//         setActiveStudy(data[0]);
//       } catch (err) {
//         console.error('Error fetching case studies:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCaseStudies();
//   }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Failed to load case studies</Typography>
      </Box>
    );
  }

  const groupedStudies = [
    dummyCaseStudies.slice(0, 3),
    dummyCaseStudies.slice(3, 6),
    dummyCaseStudies.slice(6, 9)
  ];

  return (
    <Box sx={{ p: 3, width: '100%', maxWidth: '100%', bgcolor: 'background.default' }}>
      <Grid container spacing={3}>
        {/* Left side - Case Study Links */}
        <Grid item xs={7}>
          <Stack spacing={2}>
            {groupedStudies.map((row, rowIndex) => (
              <Box key={rowIndex} sx={{ display: 'flex', gap: 2 }}>
                {row.map((study) => (
                  <Box
                    key={study._id}
                    component={Link}
                    to={`/case-studies/${study.slug}`}
                    onMouseEnter={() => setActiveStudy(study)}
                    sx={{
                      flex: 1,
                      p: 2,
                      borderRadius: 1,
                      bgcolor: activeStudy?._id === study._id ? 'primary.main' : 'background.paper',
                      color: activeStudy?._id === study._id ? 'primary.contrastText' : 'text.primary',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {study.title}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      {study.excerpt}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Stack>
        </Grid>

        {/* Right side - Active Case Study Image */}
        <Grid item xs={5}>
          {activeStudy && (
            <Card
              sx={{
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease'
              }}
            >
              <CardMedia
                component="img"
                image={activeStudy.featuredImage}
                alt={activeStudy.title}
                sx={{
                  height: '250px',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  color: 'white'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {activeStudy.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {activeStudy.excerpt}
                </Typography>
              </Box>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CaseStudiesMegaMenu;
