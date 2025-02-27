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
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import ApiIcon from '@mui/icons-material/Api';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import SyncIcon from '@mui/icons-material/Sync';

const integrations = [
  {
    title: 'API Integration',
    description: 'Seamlessly connect with your existing tools through our robust API',
    icon: ApiIcon,
    color: '#2196f3',
    features: ['RESTful API', 'Real-time sync', 'Secure endpoints'],
  },
  {
    title: 'Cloud Services',
    description: 'Connect with popular cloud platforms and services',
    icon: CloudSyncIcon,
    color: '#4caf50',
    features: ['AWS', 'Google Cloud', 'Azure'],
  },
  {
    title: 'CRM Integration',
    description: 'Sync data with your favorite CRM platforms',
    icon: SyncIcon,
    color: '#ff9800',
    features: ['Salesforce', 'HubSpot', 'Zoho'],
  },
  {
    title: 'Security',
    description: 'Enterprise-grade security for all integrations',
    icon: SecurityIcon,
    color: '#e91e63',
    features: ['OAuth 2.0', 'Encryption', 'Compliance'],
  },
  {
    title: 'Performance',
    description: 'High-performance integration with minimal latency',
    icon: SpeedIcon,
    color: '#9c27b0',
    features: ['Fast sync', 'Load balancing', 'Caching'],
  },
  {
    title: 'Custom Integration',
    description: 'Build custom integrations for your specific needs',
    icon: IntegrationInstructionsIcon,
    color: '#00bcd4',
    features: ['Custom APIs', 'Webhooks', 'SDKs'],
  },
];

const Integration = () => {
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
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 40%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 40%)`,
          zIndex: 1,
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
          Powerful Integrations
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Connect our tools with your favorite platforms and services
        </Typography>

        <Grid container spacing={4}>
          {integrations.map((integration, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .integration-icon': {
                      transform: 'rotate(360deg)',
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
                    background: `radial-gradient(circle at top right, ${integration.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%',
                  }}
                />
                <CardContent sx={{ p: 4 }}>
                  <Box
                    className="integration-icon"
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${integration.color}15`,
                      color: integration.color,
                      mb: 3,
                      transition: 'transform 0.6s ease',
                    }}
                  >
                    <integration.icon fontSize="large" />
                  </Box>

                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {integration.title}
                  </Typography>

                  <Typography color="text.secondary" paragraph>
                    {integration.description}
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    {integration.features.map((feature, idx) => (
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
                            bgcolor: integration.color,
                            mr: 1.5,
                          },
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      mt: 3,
                      borderRadius: 2,
                      borderColor: integration.color,
                      color: integration.color,
                      '&:hover': {
                        borderColor: integration.color,
                        bgcolor: `${integration.color}10`,
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

export default Integration;