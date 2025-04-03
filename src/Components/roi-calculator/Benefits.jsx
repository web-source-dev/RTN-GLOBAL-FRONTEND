import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';
import SpeedIcon from '@mui/icons-material/Speed';
import AssessmentIcon from '@mui/icons-material/Assessment';

const benefits = [
  {
    id: 'increased-roi',
    title: 'Increased ROI',
    description: 'Maximize your marketing budget with data-driven strategies that deliver measurable returns.',
    icon: TrendingUpIcon,
    color: '#2196f3',
    stats: ['150% Average ROI', 'Proven Results', 'Continuous Optimization']
  },
  {
    id: 'cost-efficiency',
    title: 'Cost Efficiency',
    description: 'Optimize your marketing spend with targeted campaigns and efficient resource allocation.',
    icon: MonetizationOnIcon,
    color: '#4caf50',
    stats: ['30% Cost Reduction', 'Budget Optimization', 'Resource Efficiency']
  },
  {
    id: 'performance-tracking',
    title: 'Performance Tracking',
    description: 'Monitor your marketing performance in real-time with comprehensive analytics.',
    icon: TimelineIcon,
    color: '#ff9800',
    stats: ['Real-time Metrics', 'Custom Reports', 'Data Insights']
  },
  {
    id: 'growth-analytics',
    title: 'Growth Analytics',
    description: 'Make informed decisions with advanced analytics and growth forecasting.',
    icon: BarChartIcon,
    color: '#e91e63',
    stats: ['Predictive Analysis', 'Growth Forecasting', 'Market Insights']
  },
  {
    id: 'fast-implementation',
    title: 'Fast Implementation',
    description: 'Quick deployment of marketing strategies with rapid results and optimization.',
    icon: SpeedIcon,
    color: '#9c27b0',
    stats: ['Quick Setup', 'Rapid Results', 'Agile Approach']
  },
  {
    id: 'comprehensive-reporting',
    title: 'Comprehensive Reporting',
    description: 'Detailed reporting and insights to track your marketing success metrics.',
    icon: AssessmentIcon,
    color: '#00bcd4',
    stats: ['Custom Dashboards', 'Regular Updates', 'Success Metrics']
  }
];

const Benefits = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="roi-benefits"
      aria-labelledby="benefits-heading"
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
        aria-hidden="true"
      />

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          id="benefits-heading"
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
          Why Choose Our Services
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Discover the advantages of our data-driven marketing approach
        </Typography>

        <Grid 
          container 
          spacing={4}
          role="list"
          aria-label="Benefits of our marketing services"
        >
          {benefits.map((benefit, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={benefit.id}
              role="listitem"
            >
              <Card
                component="article"
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .benefit-icon': {
                      transform: 'scale(1.1)',
                    },
                  },
                  position: 'relative',
                  overflow: 'hidden',
                }}
                aria-labelledby={`benefit-title-${benefit.id}`}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle at top right, ${benefit.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%',
                  }}
                  aria-hidden="true"
                />
                <CardContent sx={{ p: 4 }}>
                  <IconButton
                    className="benefit-icon"
                    sx={{
                      mb: 2,
                      bgcolor: `${benefit.color}15`,
                      color: benefit.color,
                      transition: 'transform 0.3s ease',
                      '&:hover': { bgcolor: `${benefit.color}25` },
                    }}
                    size="large"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <benefit.icon fontSize="large" aria-hidden="true" />
                  </IconButton>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom 
                    sx={{ fontWeight: 600 }}
                    id={`benefit-title-${benefit.id}`}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography 
                    color="text.secondary" 
                    component="p" 
                    paragraph
                  >
                    {benefit.description}
                  </Typography>
                  <Box 
                    sx={{ mt: 3 }}
                    component="ul"
                    aria-label={`Key statistics for ${benefit.title}`}
                    role="list"
                    style={{ padding: 0, listStyle: 'none' }}
                  >
                    {benefit.stats.map((stat, idx) => (
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
                            bgcolor: benefit.color,
                            mr: 1.5,
                          },
                        }}
                        component="li"
                        role="listitem"
                      >
                        <Typography variant="body2" color="text.secondary">
                          {stat}
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

export default Benefits;