import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CampaignIcon from '@mui/icons-material/Campaign';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShareIcon from '@mui/icons-material/Share';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const services = [
  {
    title: 'Search Engine Optimization',
    description: 'Boost your website ranking with our advanced SEO strategies and dominate search results',
    icon: SearchIcon,
    color: '#2196f3',
    metrics: ['200% Traffic Increase', '1st Page Rankings', 'Local SEO'],
  },
  {
    title: 'Social Media Marketing',
    description: 'Engage your audience across all social media platforms with compelling content',
    icon: ShareIcon,
    color: '#e91e63',
    metrics: ['Brand Growth', 'Community Building', 'Viral Content'],
  },
  {
    title: 'Content Marketing',
    description: 'Create compelling content that drives conversions and establishes authority',
    icon: CampaignIcon,
    color: '#4caf50',
    metrics: ['Lead Generation', 'Brand Authority', 'Engagement'],
  },
  {
    title: 'Analytics & Reporting',
    description: 'Data-driven insights to optimize your marketing strategy and maximize ROI',
    icon: BarChartIcon,
    color: '#ff9800',
    metrics: ['Real-time Data', 'Custom Reports', 'ROI Tracking'],
  },
  {
    title: 'Email Marketing',
    description: 'Targeted email campaigns that nurture leads and drive conversions',
    icon: EmailIcon,
    color: '#9c27b0',
    metrics: ['High Open Rates', 'Automation', 'Personalization'],
  },
  {
    title: 'Web Development',
    description: 'Custom website development focused on conversion and user experience',
    icon: CodeIcon,
    color: '#00bcd4',
    metrics: ['Mobile-First', 'SEO-Friendly', 'Fast Loading'],
  },
];

const Services = () => {
  return (
    <Box py={12} sx={{ background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)' }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            Our Services
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Digital Solutions for Your Business
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
          >
            Comprehensive digital marketing services tailored to your success
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .service-icon': {
                      transform: 'scale(1.1)',
                    },
                    '& .learn-more': {
                      color: service.color,
                      '& .arrow-icon': {
                        transform: 'translateX(4px)',
                      },
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
                    background: `radial-gradient(circle at top right, ${service.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%',
                  }}
                />
                <CardContent sx={{ p: 4 }}>
                  <IconButton
                    className="service-icon"
                    sx={{
                      mb: 3,
                      bgcolor: `${service.color}15`,
                      color: service.color,
                      transition: 'transform 0.3s ease',
                      '&:hover': { bgcolor: `${service.color}25` },
                    }}
                    size="large"
                  >
                    <service.icon fontSize="large" />
                  </IconButton>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {service.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {service.description}
                  </Typography>
                  
                  <Box sx={{ my: 3 }}>
                    {service.metrics.map((metric, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'inline-block',
                          mr: 1,
                          mb: 1,
                          px: 2,
                          py: 0.5,
                          borderRadius: '15px',
                          bgcolor: `${service.color}10`,
                          color: service.color,
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        }}
                      >
                        {metric}
                      </Box>
                    ))}
                  </Box>

                  <Button
                    className="learn-more"
                    endIcon={<ArrowForwardIcon className="arrow-icon" />}
                    sx={{
                      mt: 2,
                      color: 'text.secondary',
                      '& .arrow-icon': {
                        transition: 'transform 0.2s ease',
                      },
                    }}
                  >
                    Learn More
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

export default Services;
