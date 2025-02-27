import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CampaignIcon from '@mui/icons-material/Campaign';
import GroupIcon from '@mui/icons-material/Group';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const features = [
  {
    title: 'Campaign Strategy',
    description: 'Develop targeted email campaigns that drive engagement and conversions',
    icon: EmailIcon,
    color: '#2196f3'
  },
  {
    title: 'Personalization',
    description: 'Create personalized content that resonates with your audience segments',
    icon: CampaignIcon,
    color: '#4caf50'
  },
  {
    title: 'Automation',
    description: 'Streamline your email marketing with powerful automation workflows',
    icon: GroupIcon,
    color: '#ff9800'
  }
];

const benefits = [
  'Higher conversion rates',
  'Improved customer retention',
  'Better ROI than other channels',
  'Direct customer communication',
  'Measurable results',
  'Scalable marketing solution'
];

const EmailMarketing = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          pt: 15,
          pb: 8,
          background: isDark
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
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
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
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
                Email Marketing
              </Typography>
              <Typography variant="h4" color="text.secondary" paragraph>
                Drive engagement and conversions with targeted email campaigns
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                }}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <EmailIcon
                  sx={{
                    fontSize: '20rem',
                    color: theme.palette.primary.main,
                    opacity: 0.1,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h2"
          textAlign="center"
          sx={{
            fontWeight: 800,
            mb: 6,
          }}
        >
          Our Email Marketing Services
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${feature.color}15`,
                      color: feature.color,
                      mb: 2,
                    }}
                  >
                    <feature.icon fontSize="large" />
                  </Box>
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box
        sx={{
          py: 8,
          background: isDark
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        }}
      >
        <Container>
          <Typography
            variant="h2"
            textAlign="center"
            sx={{
              fontWeight: 800,
              mb: 6,
            }}
          >
            Benefits of Email Marketing
          </Typography>
          <Grid container spacing={3}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 3,
                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: theme.palette.primary.main,
                      mr: 2,
                    }}
                  />
                  <Typography variant="h6">{benefit}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Ready to Start Email Marketing?
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}
        >
          Let's create email campaigns that engage your audience and drive conversions
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
            px: 4,
            py: 1.5,
          }}
        >
          Start Your Email Campaign
        </Button>
      </Container>
    </Box>
  );
};

export default EmailMarketing;