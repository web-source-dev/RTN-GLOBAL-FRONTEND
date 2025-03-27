import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import LaunchIcon from '@mui/icons-material/Launch';

const tools = [
  {
    title: 'Wix Website Development',
    description: 'Professional Wix websites with custom design and functionality',
    icon: WebIcon,
    color: '#2196f3',
    features: ['Custom Design', 'E-commerce Solutions', 'SEO Optimization'],
    category: 'Web Development'
  },
  {
    title: 'MERN Stack Applications',
    description: 'Full-stack web applications using MongoDB, Express, React, and Node.js',
    icon: DeveloperModeIcon,
    color: '#4caf50',
    features: ['Custom Development', 'API Integration', 'Database Design'],
    category: 'Web Development'
  },
  {
    title: 'React Native Mobile Apps',
    description: 'Cross-platform mobile applications for iOS and Android',
    icon: PhoneIphoneIcon,
    color: '#ff9800',
    features: ['Native Performance', 'Cross-platform', 'App Store Publishing'],
    category: 'Mobile Development'
  },
  {
    title: 'Performance Optimization',
    description: 'Optimize your web applications for speed and efficiency',
    icon: SpeedIcon,
    color: '#e91e63',
    features: ['Fast Loading', 'Code Optimization', 'Performance Monitoring'],
    category: 'Development'
  },
  {
    title: 'Secure Development',
    description: 'Implement robust security measures in your applications',
    icon: SecurityIcon,
    color: '#9c27b0',
    features: ['Data Protection', 'Authentication', 'Security Best Practices'],
    category: 'Development'
  },
  {
    title: 'API Integration',
    description: 'Seamless integration with third-party services and APIs',
    icon: IntegrationInstructionsIcon,
    color: '#00bcd4',
    features: ['RESTful APIs', 'Custom Integration', 'Data Synchronization'],
    category: 'Development'
  }
];

const ToolsGrid = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      py={12}
      sx={{
        background: theme.palette.background.default,
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
          opacity: 0.2,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 10%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 10%)`,
          zIndex: 1,
        }}
      />
      <Container maxWidth="xl">
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontWeight: 800,
            mb: 2,
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
          Our Development Services
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          align="center"
          sx={{ mb: 8, maxWidth: '800px', mx: 'auto', opacity: 0.9 }}
        >
          Comprehensive development solutions tailored to your business needs
        </Typography>
        <Grid container spacing={4}>
          {tools.map((tool) => (
            <Grid item xs={12} sm={6} md={4} key={tool.title}>
              <Card
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
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: `${tool.color}15`,
                        borderRadius: '12px',
                        p: 1.5,
                        mr: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          backgroundColor: `${tool.color}25`
                        }
                      }}
                    >
                      <tool.icon sx={{ color: tool.color, fontSize: 28 }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {tool.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 3, lineHeight: 1.7 }}
                  >
                    {tool.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1.5,
                      mt: 'auto'
                    }}
                  >
                    {tool.features.map((feature) => (
                      <Typography
                        key={feature}
                        variant="body2"
                        sx={{
                          backgroundColor: `${tool.color}15`,
                          color: tool.color,
                          px: 2,
                          py: 0.75,
                          borderRadius: 2,
                          fontWeight: 500,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: `${tool.color}25`,
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

export default ToolsGrid;