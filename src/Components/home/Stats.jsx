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
    label: 'Clients Served',
    suffix: '+',
    description: 'Trusted by businesses worldwide',
    icon: GroupIcon,
    color: '#2196f3',
  },
  {
    value: 95,
    label: 'Success Rate',
    suffix: '%',
    description: 'Proven track record of success',
    icon: RocketLaunchIcon,
    color: '#4caf50',
  },
  {
    value: 50,
    label: 'Team Experts',
    suffix: '+',
    description: 'Skilled marketing professionals',
    icon: EmojiEventsIcon,
    color: '#ff9800',
  },
  {
    value: 300,
    label: 'ROI Increase',
    suffix: '%',
    description: 'Average client ROI improvement',
    icon: TrendingUpIcon,
    color: '#e91e63',
  },
];

const Stats = () => {
  const theme = useTheme();
  return (
    <Box 
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
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: '30vw',
            height: '30vw',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            animation: 'float 20s infinite',
            animationDelay: `${i * 3}s`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            '@keyframes float': {
              '0%': { transform: 'translate(0, 0) rotate(0deg)' },
              '50%': { transform: 'translate(100px, -100px) rotate(180deg)' },
              '100%': { transform: 'translate(0, 0) rotate(360deg)' },
            },
          }}
        />
      ))}

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
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
                  sx={{
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: `${stat.color}15`,
                    color: stat.color,
                    mb: 3,
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <stat.icon fontSize="large" />
                </Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mb: 1,
                    fontSize: { xs: '2.5rem', md: '3rem' },
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
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    mb: 2,
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography
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
