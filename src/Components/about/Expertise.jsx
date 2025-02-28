import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Box,useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CampaignIcon from '@mui/icons-material/Campaign';
import BarChartIcon from '@mui/icons-material/BarChart';
import WebIcon from '@mui/icons-material/Web';
import EmailIcon from '@mui/icons-material/Email';
import ShareIcon from '@mui/icons-material/Share';

const Expertise = () => {
  const services = [
    {
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: 'Search Engine Optimization',
      description: 'Boost your online visibility with our data-driven SEO strategies.'
    },
    {
      icon: <CampaignIcon sx={{ fontSize: 40 }} />,
      title: 'Digital Advertising',
      description: 'Targeted PPC campaigns that maximize ROI and drive conversions.'
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 40 }} />,
      title: 'Analytics & Reporting',
      description: 'Comprehensive insights and metrics to track campaign performance.'
    },
    {
      icon: <WebIcon sx={{ fontSize: 40 }} />,
      title: 'Web Development',
      description: 'Custom websites optimized for conversion and user experience.'
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: 'Email Marketing',
      description: 'Strategic email campaigns that nurture leads and drive engagement.'
    },
    {
      icon: <ShareIcon sx={{ fontSize: 40 }} />,
      title: 'Social Media Marketing',
      description: 'Build brand presence and engage audiences across social platforms.'
    }
  ];

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        py: 8,
        position: 'relative',
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
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
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            fontWeight: 800,
            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Our Expertise
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .service-icon': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                <Box 
                  className="service-icon"
                  sx={{ 
                    color: 'primary.main',
                    mb: 2,
                    transition: 'transform 0.3s ease'
                  }}
                >
                  {service.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {service.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {service.description}
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

export default Expertise;