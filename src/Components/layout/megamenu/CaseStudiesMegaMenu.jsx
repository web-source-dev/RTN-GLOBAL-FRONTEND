import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Stack,
  Chip,
  LinearProgress,
  Divider,
  alpha,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BarChartIcon from '@mui/icons-material/BarChart';
import StarIcon from '@mui/icons-material/Star';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

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

  
const CaseStudiesMegaMenu = ({ onItemClick }) => {
  const theme = useTheme();
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

  // Modified patterns with more visual variety
  const sizePatterns = [
    // First row pattern - dramatic feature and sidebar items
    [
      { width: '58%', height: '200px', style: 'featured' }, // Featured large
      { width: '42%', height: '95px', style: 'compact' }, // Medium top
      { width: '42%', height: '95px', style: 'compact' }  // Medium bottom
    ],
    // Second row pattern - balanced trio with distinct styles
    [
      { width: '32%', height: '120px', style: 'card' }, // Card-like
      { width: '36%', height: '120px', style: 'minimal' }, // Minimal
      { width: '32%', height: '120px', style: 'gradient' }  // Accent heavy
    ],
    // Third row pattern - varied sizing and style
    [
      { width: '30%', height: '130px', style: 'gradient' }, // Gradient
      { width: '38%', height: '130px', style: 'card' }, // Heavy border
      { width: '32%', height: '130px', style: 'featured' } // Dark mode
    ]
  ];

  // Generate a staggered animation delay
  const getAnimDelay = (rowIndex, colIndex) => {
    return (rowIndex * 3 + colIndex) * 0.05;
  };

  // Get an icon based on study type/pattern
  const getPatternIcon = (style) => {
    switch(style) {
      case 'accent': return <BarChartIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />;
      case 'gradient': return <StarIcon sx={{ fontSize: '1rem', color: 'warning.main' }} />;
      case 'dark': return <LightbulbIcon sx={{ fontSize: '1rem', color: 'info.main' }} />;
      default: return null;
    }
  };

  return (
    <Box 
      sx={{ 
        p: 2, 
        width: '100%', 
        maxWidth: '100%', 
        bgcolor: 'background.default',
        background: 'linear-gradient(135deg, rgba(245,247,250,1) 0%, rgba(255,255,255,1) 100%)',
      }}
    >
      <Grid container spacing={2}>
        {/* Enhanced left side - Case Study Links with dynamic layout */}
        <Grid item xs={9}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                right: '5%',
                top: '15%',
                width: '250px',
                height: '250px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(33,150,243,0.05) 0%, rgba(33,150,243,0) 70%)',
                zIndex: 0,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                left: '10%',
                bottom: '10%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(76,175,80,0.05) 0%, rgba(76,175,80,0) 70%)',
                zIndex: 0,
              }
            }}
          >
            {/* We'll create three distinct rows with varying patterns */}
            {[0, 1, 2].map((rowIndex) => (
              <Box 
                key={`row-${rowIndex}`} 
                sx={{ 
                  display: 'flex', 
                  gap: 2,
                  width: '100%',
                  height: rowIndex === 0 ? '200px' : 'auto', // First row is taller for featured content
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {dummyCaseStudies.slice(rowIndex * 3, rowIndex * 3 + 3).map((study, colIndex) => {
                  const sizePattern = sizePatterns[rowIndex][colIndex];
                  const isFeatured = sizePattern.style === 'featured';
                  const isDark = sizePattern.style === 'dark';
                  const isGradient = sizePattern.style === 'gradient';
                  const isBordered = sizePattern.style === 'bordered';
                  const isAccent = sizePattern.style === 'accent';
                  const isMinimal = sizePattern.style === 'minimal';
                  const isCard = sizePattern.style === 'card';
                  const isCompact = sizePattern.style === 'compact';
                  const patternIcon = getPatternIcon(sizePattern.style);
                  
                  // Calculate position for the compact items in first row
                  const marginTop = (rowIndex === 0 && colIndex > 0) ? 
                    `${colIndex === 1 ? '0' : '105px'}` : undefined;
                  
                  return (
                    <Box
                      key={study.id}
                      component={Link}
                      to={`/case-studies/${study.slug}`}
                      onClick={onItemClick}
                      onMouseEnter={() => setActiveStudy(study)}
                      sx={{
                        width: sizePattern.width,
                        height: sizePattern.height,
                        marginTop,
                        position: rowIndex === 0 && colIndex > 0 ? 'absolute' : 'relative',
                        right: rowIndex === 0 && colIndex > 0 ? 0 : 'auto',
                        p: isFeatured ? 2.5 : isCompact ? 1.2 : 1.8,
                        borderRadius: isCard ? '8px' : isBordered ? '0' : '6px',
                        bgcolor: isDark 
                          ? '#000'
                          : activeStudy?.id === study.id 
                            ? alpha(theme.palette.background.paper, 0.9)
                            : 'background.paper',
                        color: isDark ? 'common.white' : 'text.primary',
                        boxShadow: isCard 
                          ? '0 10px 30px rgba(0,0,0,0.08)'
                          : activeStudy?.id === study.id 
                            ? '0 8px 20px rgba(0,0,0,0.10)' 
                            : isMinimal 
                              ? 'none'
                              : '0 2px 8px rgba(0,0,0,0.04)',
                        border: isBordered 
                          ? '3px solid'
                          : isMinimal 
                            ? '1px dashed' 
                            : '1px solid',
                        borderColor: isBordered 
                          ? 'primary.main'
                          : activeStudy?.id === study.id 
                            ? 'primary.main' 
                            : isMinimal
                              ? 'rgba(0,0,0,0.12)'
                              : 'rgba(0,0,0,0.08)',
                        textDecoration: 'none',
                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transitionDelay: `${getAnimDelay(rowIndex, colIndex)}s`,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        animation: 'fadeIn 0.5s ease forwards',
                        animationDelay: `${getAnimDelay(rowIndex, colIndex)}s`,
                        opacity: 0,
                        transform: 'translateY(10px)',
                        '@keyframes fadeIn': {
                          '0%': { opacity: 0, transform: 'translateY(10px)' },
                          '100%': { opacity: 1, transform: 'translateY(0)' }
                        },
                        '&:hover': {
                          bgcolor: isDark 
                            ? alpha('#000', 0.95)
                            : isGradient 
                              ? 'transparent'
                              : 'background.paper',
                          transform: isCard 
                            ? 'translateY(-5px) scale(1.02)'
                            : isMinimal 
                              ? 'translateY(-3px)' 
                              : 'translateY(-4px)',
                          boxShadow: isCard 
                            ? '0 15px 35px rgba(0,0,0,0.12)'
                            : isGradient 
                              ? '0 10px 30px rgba(0,0,0,0.15)'
                              : isMinimal 
                                ? '0 5px 15px rgba(0,0,0,0.05)'
                                : '0 10px 25px rgba(0,0,0,0.08)',
                          borderColor: isBordered 
                            ? 'primary.dark'
                            : 'primary.main',
                          '& .arrow-icon': {
                            opacity: 1,
                            transform: 'translateX(3px)'
                          },
                          '& .hover-reveal': {
                            opacity: 1,
                            transform: 'translateY(0)'
                          },
                          '&::after': isGradient ? {
                            opacity: 0.85,
                          } : {},
                        },
                        '&::before': isAccent ? {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '5px',
                          height: '100%',
                          background: 'primary.main',
                          opacity: activeStudy?.id === study.id ? 1 : 0.8,
                          transition: 'all 0.3s ease',
                        } : {},
                        '&::after': isGradient ? {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(135deg, rgba(76,175,80,0.2) 0%, rgba(33,150,243,0.2) 100%)',
                          opacity: 0.6,
                          transition: 'all 0.3s ease',
                          zIndex: 0,
                        } : isFeatured ? {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: `url(${study.featuredImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          opacity: 0.15,
                          filter: 'blur(1px) brightness(1.2)',
                          zIndex: 0,
                        } : {},
                      }}
                    >
                      {/* Header section */}
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        mb: isFeatured ? 1 : 0.6,
                        alignItems: 'center',
                        position: 'relative',
                        zIndex: 1,
                      }}>
                        {/* Left side with title */}
                        <Box sx={{ maxWidth: isFeatured ? '85%' : '80%' }}>
                          <Typography 
                            variant={isFeatured ? "h6" : "subtitle2"}
                            sx={{ 
                              fontWeight: 700, 
                              lineHeight: 1.2,
                              fontSize: isFeatured ? '1rem' : '0.75rem',
                              color: activeStudy?.id === study.id 
                                ? 'primary.main' 
                                : 'text.primary',
                              transition: 'color 0.2s ease',
                              display: 'flex',
                              alignItems: 'flex-start',
                            }}
                          >
                            {study.title}
                            <ArrowForwardIcon 
                              className="arrow-icon"
                              sx={{ 
                                ml: 0.5, 
                                fontSize: isFeatured ? '0.9rem' : '0.7rem',
                                opacity: 0,
                                transform: 'translateX(-5px)',
                                transition: 'all 0.2s ease',
                                color: 'primary.main',
                                mt: 0.2
                              }}
                            />
                          </Typography>
                          
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              mt: 0.5,
                              gap: 0.5,
                              flexWrap: 'wrap'
                            }}
                          >
                            {study.industries.slice(0, isFeatured ? 2 : 1).map((industry, i) => (
                              <Chip
                                key={i}
                                label={industry}
                                size="small"
                                sx={{
                                  height: isFeatured ? '20px' : '16px',
                                  fontSize: isFeatured ? '0.65rem' : '0.55rem',
                                  fontWeight: 600,
                                  '& .MuiChip-label': { px: 0.8, py: 0 },
                                  bgcolor: activeStudy?.id === study.id 
                                    ? 'rgba(25, 118, 210, 0.08)'
                                    : 'rgba(0,0,0,0.04)',
                                  color: activeStudy?.id === study.id
                                    ? 'primary.main'
                                    : 'text.secondary',
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                        
                        {/* Performance metric pill */}
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          bgcolor: isDark
                            ? alpha('#fff', 0.15)
                            : activeStudy?.id === study.id
                              ? 'success.main'
                              : isGradient
                                ? alpha(theme.palette.success.light, 0.7)
                                : 'success.light',
                          borderRadius: '12px',
                          px: 0.8,
                          py: 0.2,
                          height: isFeatured ? '22px' : isCompact ? '16px' : '18px',
                        }}>
                          <TrendingUpIcon 
                            sx={{ 
                              fontSize: isFeatured ? '0.75rem' : isCompact ? '0.5rem' : '0.6rem', 
                              mr: 0.3, 
                              color: isDark
                                ? 'common.white'
                                : activeStudy?.id === study.id
                                  ? 'white'
                                  : 'success.dark',
                            }} 
                          />
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              fontSize: isFeatured ? '0.75rem' : isCompact ? '0.55rem' : '0.65rem',
                              fontWeight: 700,
                              color: isDark
                                ? 'common.white'
                                : activeStudy?.id === study.id
                                  ? 'white'
                                  : 'success.dark',
                              letterSpacing: '0.02em',
                            }}
                          >
                            +{study.metrics.improvement}%
                          </Typography>
                        </Box>
                      </Box>
                      
                      {/* Excerpt with limited lines - different styling based on box type */}
                      <Typography 
                        variant="caption"
                        sx={{ 
                          opacity: isDark ? 0.9 : 0.85,
                          mb: 'auto',
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: isFeatured 
                            ? 3 
                            : isCompact 
                              ? 1 
                              : 2,
                          lineHeight: isFeatured 
                            ? 1.5 
                            : isCompact 
                              ? 1.2 
                              : 1.4,
                          fontSize: isFeatured 
                            ? '0.8rem' 
                            : isCompact 
                              ? '0.6rem' 
                              : '0.7rem',
                          color: isDark 
                            ? alpha('#fff', 0.8)
                            : activeStudy?.id === study.id 
                              ? 'text.primary' 
                              : 'text.secondary',
                          fontWeight: activeStudy?.id === study.id ? 500 : 400,
                        }}
                      >
                        {study.excerpt}
                      </Typography>
                      
                      {/* Bottom metrics bar - different styling based on box type */}
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mt: 'auto',
                          pt: isCompact ? 0.5 : 0.8,
                          position: 'relative',
                          borderTop: isDark 
                            ? `1px dashed rgba(255,255,255,0.15)`
                            : isMinimal 
                              ? 'none' 
                              : `1px dashed rgba(0,0,0,0.08)`,
                        }}
                      >
                        {/* Combined metrics */}
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: isFeatured 
                            ? 1.5 
                            : isCompact 
                              ? 0.8 
                              : 1,
                        }}>
                          {!isCompact && (
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              color: isDark 
                                ? alpha('#fff', 0.7)
                                : activeStudy?.id === study.id 
                                  ? 'primary.light' 
                                  : 'text.secondary',
                            }}>
                              <PeopleIcon sx={{ fontSize: isFeatured ? '0.8rem' : '0.65rem', mr: 0.3 }} />
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  fontSize: isFeatured ? '0.7rem' : '0.6rem', 
                                  fontWeight: 600,
                                }}
                              >
                                {(study.metrics.users/1000).toFixed(1)}k
                              </Typography>
                            </Box>
                          )}
                          
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            color: isDark 
                              ? alpha('#fff', 0.7)
                              : activeStudy?.id === study.id 
                                ? 'primary.light' 
                                : 'text.secondary',
                          }}>
                            <AccessTimeIcon sx={{ fontSize: isFeatured ? '0.8rem' : isCompact ? '0.6rem' : '0.65rem', mr: 0.3 }} />
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontSize: isFeatured ? '0.7rem' : isCompact ? '0.55rem' : '0.6rem', 
                                fontWeight: 600,
                              }}
                            >
                              {study.metrics.timeframe}
                            </Typography>
                          </Box>
                        </Box>
                        
                        {/* Visual indicator with different styles based on box type */}
                        {!isCompact && (
                          <Box sx={{ 
                            width: isFeatured 
                              ? '40px' 
                              : '24px', 
                            height: isFeatured 
                              ? '4px' 
                              : '3px', 
                            borderRadius: isBordered 
                              ? '0' 
                              : '2px',
                            position: 'relative',
                            overflow: 'hidden',
                            bgcolor: isDark 
                              ? alpha('#fff', 0.2)
                              : 'rgba(0,0,0,0.05)',
                          }}>
                            <Box sx={{ 
                              position: 'absolute',
                              left: 0,
                              top: 0,
                              height: '100%',
                              width: `${Math.min(study.metrics.improvement, 100)}%`,
                              bgcolor: isDark 
                                ? 'common.white' 
                                : activeStudy?.id === study.id 
                                  ? 'primary.main' 
                                  : isGradient 
                                    ? 'secondary.main'  
                                    : 'success.main',
                            }} />
                          </Box>
                        )}
                      </Box>
                      
                      {/* Hidden extra information that appears on hover - only for featured */}
                      {isFeatured && (
                        <Box 
                          className="hover-reveal"
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                            color: 'white',
                            p: 2,
                            opacity: 0,
                            transform: 'translateY(10px)',
                            transition: 'all 0.3s ease',
                            zIndex: 2,
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            View full case study
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Right side - Active Case Study Image */}
        <Grid item xs={3}>
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
                  height: '350px',
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
                  background: 'background.paper',
                  color: 'text.primary'
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
