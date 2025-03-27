import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import HelpIcon from '@mui/icons-material/Help';
import ForumIcon from '@mui/icons-material/Forum';
import VideoChatIcon from '@mui/icons-material/VideoChat';

const supportOptions = [
  {
    title: '24/7 Phone Support',
    description: 'Get immediate assistance from our expert support team anytime.',
    icon: PhoneIcon,
    color: '#2196f3',
    availability: 'Available 24/7',
    response: 'Immediate'
  },
  {
    title: 'Email Support',
    description: 'Send us detailed inquiries for comprehensive solutions.',
    icon: EmailIcon,
    color: '#4caf50',
    availability: 'Response within 24h',
    response: '24 hours'
  },
  {
    title: 'Live Chat',
    description: 'Connect instantly with our support team through live chat.',
    icon: ChatIcon,
    color: '#ff9800',
    availability: 'Business hours',
    response: 'Immediate'
  },
  {
    title: 'Knowledge Base',
    description: 'Access our comprehensive library of guides and solutions.',
    icon: HelpIcon,
    color: '#e91e63',
    availability: 'Self-service',
    response: 'Instant access'
  },
  {
    title: 'Community Forum',
    description: 'Join discussions and share experiences with other users.',
    icon: ForumIcon,
    color: '#9c27b0',
    availability: '24/7 access',
    response: 'Community-based'
  },
  {
    title: 'Video Consultations',
    description: 'Schedule one-on-one video calls with our experts.',
    icon: VideoChatIcon,
    color: '#00bcd4',
    availability: 'By appointment',
    response: 'Scheduled'
  }
];

const SupportOptions = () => {
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
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 10%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 10%)`,
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
          How Can We Help You?
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Choose your preferred way to get support from our expert team
        </Typography>

        <Grid container spacing={4}>
          {supportOptions.map((option, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .support-icon': {
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
                    background: `radial-gradient(circle at top right, ${option.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%',
                  }}
                />
                <CardContent sx={{ p: 4 }}>
                  <IconButton
                    className="support-icon"
                    sx={{
                      mb: 2,
                      bgcolor: `${option.color}15`,
                      color: option.color,
                      transition: 'transform 0.3s ease',
                      '&:hover': { bgcolor: `${option.color}25` },
                    }}
                    size="large"
                  >
                    <option.icon fontSize="large" />
                  </IconButton>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {option.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {option.description}
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        '&:before': {
                          content: '""',
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: option.color,
                          mr: 1.5,
                        },
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Availability: {option.availability}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '&:before': {
                          content: '""',
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: option.color,
                          mr: 1.5,
                        },
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Response Time: {option.response}
                      </Typography>
                    </Box>
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

export default SupportOptions;