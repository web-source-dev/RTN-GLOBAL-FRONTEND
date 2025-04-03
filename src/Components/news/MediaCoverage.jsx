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
import LaunchIcon from '@mui/icons-material/Launch';

const mediaCoverage = [
  {
    id: 'tech-weekly',
    title: 'RTN Global Revolutionizes Digital Marketing with AI',
    source: 'Tech Weekly',
    date: 'March 18, 2024',
    isoDate: '2024-03-18',
    excerpt: 'Leading tech publication highlights RTN Global\'s innovative approach to AI-powered marketing solutions.',
    image: '/images/media/tech-weekly.jpg',
    link: 'https://techweekly.com/rtn-global-ai',
    category: 'Technology',
    ariaLabel: 'Read Tech Weekly article about RTN Global\'s AI marketing solutions'
  },
  {
    id: 'marketing-today',
    title: 'The Future of Marketing: RTN Global\'s Vision',
    source: 'Marketing Today',
    date: 'March 15, 2024',
    isoDate: '2024-03-15',
    excerpt: 'In-depth interview with RTN Global\'s CEO about the company\'s innovative approach to digital marketing.',
    image: '/images/media/marketing-today.jpg',
    link: 'https://marketingtoday.com/rtn-global-interview',
    category: 'Interview',
    ariaLabel: 'Read Marketing Today interview with RTN Global\'s CEO'
  },
  {
    id: 'business-insider',
    title: 'RTN Global Named Top Marketing Innovation Company',
    source: 'Business Insider',
    date: 'March 12, 2024',
    isoDate: '2024-03-12',
    excerpt: 'Industry recognition for RTN Global\'s contributions to marketing technology and innovation.',
    image: '/images/media/business-insider.jpg',
    link: 'https://businessinsider.com/rtn-global-award',
    category: 'Award',
    ariaLabel: 'Read Business Insider article about RTN Global\'s innovation award'
  },
  {
    id: 'digital-trends',
    title: 'How RTN Global is Transforming Digital Marketing',
    source: 'Digital Trends',
    date: 'March 8, 2024',
    isoDate: '2024-03-08',
    excerpt: 'Feature story on RTN Global\'s impact on the digital marketing landscape.',
    image: '/images/media/digital-trends.jpg',
    link: 'https://digitaltrends.com/rtn-global-impact',
    category: 'Feature',
    ariaLabel: 'Read Digital Trends feature about RTN Global\'s impact on digital marketing'
  }
];

const MediaCoverage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="media-coverage"
      aria-labelledby="media-coverage-heading"
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
          id="media-coverage-heading"
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
          Media Coverage
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          See what the media is saying about RTN Global
        </Typography>

        <Grid container spacing={4} role="list">
          {mediaCoverage.map((coverage) => (
            <Grid item xs={12} md={6} key={coverage.id} role="listitem">
              <Card
                component="article"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .media-image': {
                      transform: 'scale(1.1)'
                    }
                  },
                  overflow: 'hidden'
                }}
                id={coverage.id}
              >
                <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={coverage.image}
                    alt=""
                    className="media-image"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.6s ease'
                    }}
                    aria-hidden="true"
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 2
                    }}
                  >
                    <Chip
                      label={coverage.category}
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        fontWeight: 500
                      }}
                      aria-label={`Category: ${coverage.category}`}
                    />
                  </Box>
                </Box>

                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    {coverage.source}
                  </Typography>

                  <Typography 
                    variant="h5" 
                    component="h3"
                    gutterBottom 
                    sx={{ fontWeight: 600 }}
                    id={`coverage-title-${coverage.id}`}
                  >
                    {coverage.title}
                  </Typography>

                  <Typography 
                    color="text.secondary" 
                    paragraph
                    id={`coverage-desc-${coverage.id}`}
                  >
                    {coverage.excerpt}
                  </Typography>

                  <Box
                    sx={{
                      mt: 'auto',
                      pt: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: 1,
                      borderColor: 'divider'
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      component="time"
                      dateTime={coverage.isoDate}
                    >
                      {coverage.date}
                    </Typography>
                    <Button
                      variant="outlined"
                      endIcon={<LaunchIcon aria-hidden="true" />}
                      href={coverage.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={coverage.ariaLabel}
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      Read Article
                    </Button>
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

export default MediaCoverage;