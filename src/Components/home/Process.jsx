import React from 'react';
import { Box, Container, Typography, Grid, Paper, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StrategyIcon from '@mui/icons-material/Lightbulb';
import RocketIcon from '@mui/icons-material/Rocket';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const processes = [
  {
    icon: SearchIcon,
    label: 'Discovery & Analysis',
    title: 'Understanding Your Goals',
    description: 'We start by deeply analyzing your business needs, target audience, and competition to develop a tailored strategy.',
    details: [
      'Market Research',
      'Competitor Analysis',
      'Target Audience Profiling',
      'Goals Definition'
    ],
    color: '#2196f3'
  },
  {
    icon: StrategyIcon,
    label: 'Strategy Development',
    title: 'Creating Your Roadmap',
    description: 'Our team develops a comprehensive digital marketing strategy aligned with your objectives and budget.',
    details: [
      'Custom Strategy Planning',
      'Budget Optimization',
      'Channel Selection',
      'Timeline Creation'
    ],
    color: '#4caf50'
  },
  {
    icon: RocketIcon,
    label: 'Implementation',
    title: 'Executing with Precision',
    description: 'We implement the strategy across all chosen digital channels with creativity and technical expertise.',
    details: [
      'Content Creation',
      'Campaign Launch',
      'Platform Optimization',
      'Performance Tracking'
    ],
    color: '#e91e63'
  },
  {
    icon: AnalyticsIcon,
    label: 'Optimization & Growth',
    title: 'Scaling Your Success',
    description: 'Continuous monitoring and optimization ensure maximum ROI and sustainable growth for your business.',
    details: [
      'Data Analysis',
      'Performance Optimization',
      'Growth Opportunities',
      'Regular Reporting'
    ],
    color: '#ff9800'
  }
];

const Process = () => {
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

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box textAlign="center" mb={8}>
          <Typography
            component="span"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              display: 'block',
              mb: 2,
            }}
          >
            Our Process
          </Typography>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            How We Drive Your Success
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            Our proven four-step process ensures consistent results and growth for your business
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {processes.map((process, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  background: isDark 
                    ? 'linear-gradient(145deg, rgba(40,40,40,0.9), rgba(30,30,30,0.9))'
                    : 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,245,245,0.9))',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: isDark 
                      ? '0 8px 24px rgba(0,0,0,0.4)'
                      : '0 8px 24px rgba(0,0,0,0.1)',
                    '& .process-icon': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                {/* Step Number */}
                <Typography
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    fontSize: '4rem',
                    fontWeight: 900,
                    opacity: 0.1,
                    color: process.color,
                  }}
                >
                  {index + 1}
                </Typography>

                <Box
                  className="process-icon"
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: `${process.color}15`,
                    color: process.color,
                    mb: 3,
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <process.icon fontSize="large" />
                </Box>

                <Typography
                  component="span"
                  sx={{
                    color: process.color,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    display: 'block',
                    mb: 1,
                  }}
                >
                  Step {index + 1}: {process.label}
                </Typography>

                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {process.title}
                </Typography>

                <Typography 
                  color="text.secondary" 
                  paragraph
                  sx={{
                    color: isDark ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                  }}
                >
                  {process.description}
                </Typography>

                <Box sx={{ mt: 3 }}>
                  {process.details.map((detail, idx) => (
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
                          bgcolor: process.color,
                          mr: 1.5,
                        },
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: isDark ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                        }}
                      >
                        {detail}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Connecting Lines */}
                {index < processes.length - 1 && (
                  <Box
                    sx={{
                      display: { xs: 'none', lg: 'block' },
                      position: 'absolute',
                      top: '30%',
                      right: '-10%',
                      width: '20%',
                      height: 2,
                      background: `linear-gradient(to right, ${process.color}, ${processes[index + 1].color})`,
                      opacity: 0.3,
                    }}
                  />
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Process;
