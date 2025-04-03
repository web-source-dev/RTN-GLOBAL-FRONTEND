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
    id: 'phone-support',
    title: '24/7 Phone Support',
    description: 'Get immediate assistance from our expert support team anytime.',
    icon: PhoneIcon,
    color: '#2196f3',
    availability: 'Available 24/7',
    response: 'Immediate',
    link: '/contact/phone'
  },
  {
    id: 'email-support',
    title: 'Email Support',
    description: 'Send us detailed inquiries for comprehensive solutions.',
    icon: EmailIcon,
    color: '#4caf50',
    availability: 'Response within 24h',
    response: '24 hours',
    link: '/contact/email'
  },
  {
    id: 'live-chat',
    title: 'Live Chat',
    description: 'Connect instantly with our support team through live chat.',
    icon: ChatIcon,
    color: '#ff9800',
    availability: 'Business hours',
    response: 'Immediate',
    link: '/livechat'
  },
  {
    id: 'knowledge-base',
    title: 'Knowledge Base',
    description: 'Access our comprehensive library of guides and solutions.',
    icon: HelpIcon,
    color: '#e91e63',
    availability: 'Self-service',
    response: 'Instant access',
    link: '/knowledge'
  },
  {
    id: 'community-forum',
    title: 'Community Forum',
    description: 'Join discussions and share experiences with other users.',
    icon: ForumIcon,
    color: '#9c27b0',
    availability: '24/7 access',
    response: 'Community-based',
    link: '/forum'
  },
  {
    id: 'video-consultations',
    title: 'Video Consultations',
    description: 'Schedule one-on-one video calls with our experts.',
    icon: VideoChatIcon,
    color: '#00bcd4',
    availability: 'By appointment',
    response: 'Scheduled',
    link: '/video-consultation'
  }
];

const SupportOptions = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="section"
      id="support-options"
      aria-labelledby="support-options-title"
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
        aria-hidden="true"
      />

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          id="support-options-title"
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
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Choose your preferred way to get support from our expert team
        </Typography>

        <Grid 
          container 
          spacing={4}
          role="list"
          aria-label="Support options"
        >
          {supportOptions.map((option) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={option.id}
              role="listitem"
            >
              <Box
                component="a"
                href={option.link}
                sx={{ 
                  textDecoration: 'none',
                  display: 'block',
                  height: '100%'
                }}
              >
                <Card
                  component="article"
                  id={`support-option-${option.id}`}
                  aria-labelledby={`option-title-${option.id}`}
                  aria-describedby={`option-desc-${option.id}`}
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
                    cursor: 'pointer',
                    '&:focus-visible': {
                      outline: `2px solid ${theme.palette.primary.main}`,
                    },
                  }}
                  tabIndex={0}
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
                    aria-hidden="true"
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
                      aria-hidden="true"
                      tabIndex={-1}
                      component="div"
                    >
                      <option.icon fontSize="large" />
                    </IconButton>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      id={`option-title-${option.id}`}
                      gutterBottom 
                      sx={{ fontWeight: 600 }}
                    >
                      {option.title}
                    </Typography>
                    <Typography 
                      color="text.secondary" 
                      paragraph
                      id={`option-desc-${option.id}`}
                    >
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
                          <Box component="span" sx={{ fontWeight: 'bold' }}>Availability:</Box> {option.availability}
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
                          <Box component="span" sx={{ fontWeight: 'bold' }}>Response Time:</Box> {option.response}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SupportOptions;