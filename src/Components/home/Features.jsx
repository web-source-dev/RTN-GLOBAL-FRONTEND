import React from 'react';
import { Box, Container, Grid, Typography, Paper, IconButton } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import CampaignIcon from '@mui/icons-material/Campaign';

const features = [
  {
    icon: RocketLaunchIcon,
    title: 'Fast Implementation',
    description: 'Quick deployment of marketing strategies that start delivering results from day one.',
    color: '#2196f3'
  },
  {
    icon: TrendingUpIcon,
    title: 'Growth Focused',
    description: 'Data-driven strategies designed to maximize your business growth and ROI.',
    color: '#4caf50'
  },
  {
    icon: PeopleIcon,
    title: 'Target Audience',
    description: 'Precise audience targeting to reach the people who matter most to your business.',
    color: '#ff9800'
  },
  {
    icon: AnalyticsIcon,
    title: 'Advanced Analytics',
    description: 'Comprehensive analytics and reporting to track your campaign performance.',
    color: '#9c27b0'
  },
  {
    icon: AutoGraphIcon,
    title: 'Market Analysis',
    description: 'In-depth market research and competitor analysis for strategic advantage.',
    color: '#f44336'
  },
  {
    icon: CampaignIcon,
    title: 'Brand Amplification',
    description: 'Strategic brand promotion across multiple digital channels.',
    color: '#00bcd4'
  }
];

const Features = () => {
  return (
    <Box py={8} sx={{ background: 'linear-gradient(145deg, #fafafa 0%, #f5f5f5 100%)' }}>
      <Container>
        <Typography 
          variant="h2" 
          textAlign="center" 
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Why Choose Us
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          textAlign="center" 
          mb={6}
          sx={{ maxWidth: '800px', mx: 'auto' }}
        >
          Discover the advantages that set us apart in the digital marketing landscape
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  },
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle at top right, ${feature.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%',
                  }}
                />
                <IconButton
                  sx={{
                    mb: 2,
                    bgcolor: `${feature.color}15`,
                    color: feature.color,
                    '&:hover': { bgcolor: `${feature.color}25` },
                  }}
                  size="large"
                >
                  <feature.icon fontSize="large" />
                </IconButton>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
