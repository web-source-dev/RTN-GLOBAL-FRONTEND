import React from 'react';
import { Box, Container, Grid, Typography, Paper, useTheme } from '@mui/material';
import CountUp from 'react-countup';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const stats = [
  {
    value: 500,
    label: 'Web Development Clients',
    suffix: '+',
    description: 'Trusted by businesses worldwide',
    icon: GroupIcon,
    color: '#2196f3',
  },
  {
    value: 95,
    label: 'Project Success Rate',
    suffix: '%',
    description: 'Proven track record of successful web projects',
    icon: RocketLaunchIcon,
    color: '#4caf50',
  },
  {
    value: 50,
    label: 'Development Experts',
    suffix: '+',
    description: 'Skilled web development professionals',
    icon: EmojiEventsIcon,
    color: '#ff9800',
  },
  {
    value: 300,
    label: 'Website ROI Increase',
    suffix: '%',
    description: 'Average client ROI from our web solutions',
    icon: TrendingUpIcon,
    color: '#e91e63',
  },
];

const Stats = () => {
  const theme = useTheme();
  return (
    <Box 
      component="section"
      id="stats-section"
      aria-label="Web Development Statistics"
      py={12} 
      sx={{
        background: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
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
          zIndex: 1,
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant="h2" component="h2" sx={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
          Our Web Development Achievements
        </Typography>
        <Grid container spacing={4} justifyContent="center" component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} component="li">
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  background: theme.palette.background.alternate,
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    '& .stat-icon': {
                      transform: 'scale(1.2)',
                    },
                  },
                }}
              >
                <Box
                  className="stat-icon"
                  aria-hidden="true"
                  sx={{
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: `${stat.color}15`,
                    color: stat.color,
                    mb: 3,
                    transition: 'transform 0.3s ease',
                  }}
                  tabIndex={-1}
                >
                  <stat.icon fontSize="large" />
                </Box>
                <Typography
                  variant="h3"
                  component="p"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mb: 1,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                  }}
                >
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </Typography>
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    mb: 2,
                    fontSize: '1.2rem',
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.9rem',
                  }}
                >
                  {stat.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Stats;
