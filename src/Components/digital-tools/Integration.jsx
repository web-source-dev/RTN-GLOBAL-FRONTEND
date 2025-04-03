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
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import ApiIcon from '@mui/icons-material/Api';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import CodeIcon from '@mui/icons-material/Code';

const integrations = [
  {
    title: 'Wix Development',
    description: 'Expert integration with Wix development tools and APIs',
    icon: WebIcon,
    color: '#2196f3',
    features: ['Wix API', 'Custom Widgets', 'Third-party Services'],
    id: 'wix-development'
  },
  {
    title: 'MERN Stack',
    description: 'Full-stack integration with MongoDB, Express, React, and Node.js',
    icon: StorageIcon,
    color: '#4caf50',
    features: ['Database Design', 'RESTful APIs', 'State Management'],
    id: 'mern-stack'
  },
  {
    title: 'React Native',
    description: 'Mobile app development with React Native and native features',
    icon: CodeIcon,
    color: '#ff9800',
    features: ['Native Modules', 'Mobile SDKs', 'Push Services'],
    id: 'react-native'
  },
  {
    title: 'Security',
    description: 'Robust security implementation across all platforms',
    icon: SecurityIcon,
    color: '#e91e63',
    features: ['Authentication', 'Data Encryption', 'Security Audits'],
    id: 'security'
  },
  {
    title: 'Performance',
    description: 'Optimization techniques for maximum application performance',
    icon: SpeedIcon,
    color: '#9c27b0',
    features: ['Code Splitting', 'Caching', 'Load Balancing'],
    id: 'performance'
  },
  {
    title: 'API Development',
    description: 'Custom API development and third-party integrations',
    icon: ApiIcon,
    color: '#00bcd4',
    features: ['REST/GraphQL', 'Microservices', 'Documentation'],
    id: 'api-development'
  },
];

const Integration = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="technical-capabilities"
      aria-labelledby="capabilities-heading"
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
        aria-hidden="true"
      />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          id="capabilities-heading"
          textAlign="center"
          sx={{
            fontWeight: 800,
            mb: 3,
            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              borderRadius: '2px'
            }
          }}
        >
          Technical Capabilities
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 8, maxWidth: '800px', mx: 'auto', opacity: 0.9 }}
        >
          Our development stack and technical expertise enable us to build
          robust, scalable, and integrated solutions across multiple platforms.
        </Typography>

        <Grid container spacing={4}>
          {integrations.map((integration) => (
            <Grid item xs={12} md={4} key={integration.title}>
              <Card
                component="article"
                id={integration.id}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: `${integration.color}15`,
                        borderRadius: '12px',
                        p: 1.5,
                        mr: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          backgroundColor: `${integration.color}25`
                        }
                      }}
                      aria-hidden="true"
                    >
                      <integration.icon sx={{ color: integration.color, fontSize: 28 }} />
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h3"
                      sx={{ fontWeight: 600 }}
                    >
                      {integration.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    component="p"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 3, lineHeight: 1.7 }}
                  >
                    {integration.description}
                  </Typography>
                  <Box
                    component="ul"
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1.5,
                      mt: 'auto',
                      pl: 0,
                      listStyle: 'none'
                    }}
                  >
                    {integration.features.map((feature) => (
                      <Typography
                        component="li"
                        key={feature}
                        variant="body2"
                        sx={{
                          backgroundColor: `${integration.color}15`,
                          color: integration.color,
                          px: 2,
                          py: 0.75,
                          borderRadius: 2,
                          fontWeight: 500,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: `${integration.color}25`,
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        {feature}
                      </Typography>
                    ))}
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

export default Integration;