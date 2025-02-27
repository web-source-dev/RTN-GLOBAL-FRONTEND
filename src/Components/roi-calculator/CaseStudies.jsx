import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LaunchIcon from '@mui/icons-material/Launch';

const cases = [
  {
    title: 'E-commerce Growth',
    company: 'Fashion Retailer',
    description: 'Achieved 300% ROI through targeted digital marketing campaigns',
    image: '/images/case-studies/fashion-roi.jpg',
    metrics: {
      roi: '+300%',
      revenue: '+150%',
      conversion: '+75%'
    }
  },
  {
    title: 'B2B Lead Generation',
    company: 'Tech Solutions',
    description: 'Generated 500% ROI with integrated marketing strategy',
    image: '/images/case-studies/tech-roi.jpg',
    metrics: {
      roi: '+500%',
      leads: '+200%',
      sales: '+180%'
    }
  },
  {
    title: 'Local Business Success',
    company: 'Restaurant Chain',
    description: 'Increased ROI by 250% through local marketing optimization',
    image: '/images/case-studies/restaurant-roi.jpg',
    metrics: {
      roi: '+250%',
      customers: '+120%',
      revenue: '+160%'
    }
  }
];

const CaseStudies = () => {
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

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
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
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          See how our clients achieved exceptional ROI with our marketing strategies
        </Typography>

        <Grid container spacing={4}>
          {cases.map((case_, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .case-image': {
                      transform: 'scale(1.1)'
                    }
                  },
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={case_.image}
                    alt={case_.title}
                    className="case-image"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.6s ease'
                    }}
                  />
                </Box>

                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="overline"
                    sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
                  >
                    {case_.company}
                  </Typography>

                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, my: 2 }}>
                    {case_.title}
                  </Typography>

                  <Typography color="text.secondary" paragraph>
                    {case_.description}
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {Object.entries(case_.metrics).map(([key, value]) => (
                      <Grid item xs={4} key={key}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: `${theme.palette.primary.main}10`,
                            textAlign: 'center'
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
                          >
                            {value}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {key}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Button
                    variant="outlined"
                    endIcon={<LaunchIcon />}
                    fullWidth
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    View Full Case Study
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CaseStudies;