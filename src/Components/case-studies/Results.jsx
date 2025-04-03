import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import CountUp from 'react-countup';

const results = [
  {
    title: 'Revenue Growth',
    value: 200,
    suffix: '%',
    description: 'Average increase in client revenue',
    icon: MonetizationOnIcon,
    color: '#2196f3',
    id: 'revenue-growth'
  },
  {
    title: 'ROI',
    value: 350,
    suffix: '%',
    description: 'Average return on marketing investment',
    icon: TrendingUpIcon,
    color: '#4caf50',
    id: 'roi'
  },
  {
    title: 'Client Satisfaction',
    value: 98,
    suffix: '%',
    description: 'Client satisfaction rate',
    icon: StarIcon,
    color: '#ff9800',
    id: 'client-satisfaction'
  },
  {
    title: 'Client Base',
    value: 500,
    suffix: '+',
    description: 'Businesses served worldwide',
    icon: PeopleIcon,
    color: '#e91e63',
    id: 'client-base'
  },
];

const Results = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="impact-in-numbers"
      aria-labelledby="impact-heading"
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
          background: `radial-gradient(circle at 80% 80%, ${theme.palette.primary.main} 0%, transparent 40%),
                      radial-gradient(circle at 20% 20%, ${theme.palette.secondary.main} 0%, transparent 40%)`,
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          id="impact-heading"
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
          Our Impact in Numbers
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Measurable results that demonstrate our commitment to client success
        </Typography>

        <Grid container spacing={4} role="list">
          {results.map((result, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} role="listitem">
              <Card
                component="article"
                id={result.id}
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .result-icon': {
                      transform: 'scale(1.1)',
                    },
                  },
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
                    background: `radial-gradient(circle at top right, ${result.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%',
                  }}
                  aria-hidden="true"
                />
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box
                    className="result-icon"
                    sx={{
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: `${result.color}15`,
                      color: result.color,
                      mb: 3,
                      transition: 'transform 0.3s ease',
                    }}
                    aria-hidden="true"
                  >
                    <result.icon fontSize="large" />
                  </Box>
                  <Typography
                    variant="h2"
                    component="p"
                    sx={{
                      fontWeight: 700,
                      color: result.color,
                      mb: 1,
                      fontSize: { xs: '2.5rem', md: '3rem' },
                    }}
                    aria-label={`${result.value}${result.suffix} ${result.title}`}
                  >
                    <CountUp
                      end={result.value}
                      duration={2.5}
                      suffix={result.suffix}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </Typography>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                    {result.title}
                  </Typography>
                  <Typography component="p" color="text.secondary">
                    {result.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Results;