import React from 'react';
import { Box, Button, Typography, Container, Stack, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';

const LiveChatSection = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box
      component="section"
      id="live-chat-section"
      aria-labelledby="live-chat-heading"
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
          opacity: 0.1,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 10%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 10%)`,
          zIndex: 1,
        }}
        aria-hidden="true"
      />
    <Container maxWidth="md" sx={{ mb: 15, mt: 15, position: 'relative', zIndex: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '50px',
          background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
          color: 'white',
          borderRadius: '16px',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
          maxWidth: '600px',
          margin: 'auto',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            top: '-40px',
            right: '-40px',
          }}
          aria-hidden="true"
        />
        <Typography 
          variant="h3" 
          component="h2" 
          id="live-chat-heading" 
          fontWeight="bold" 
          gutterBottom
        >
          Need Help? Chat With Us!
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Our dedicated support team is available 24/7 to assist you. Get instant responses to your queries.
        </Typography>
        <Stack direction="row" spacing={2} sx={{ marginTop: '25px' }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ChatIcon aria-hidden="true" />}
            aria-label="Start a live chat with our support team"
            sx={{
              padding: '12px 24px',
              fontSize: '18px',
              fontWeight: 'bold',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: '#1e5ab9',
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => navigate('/livechat')}
          >
            Start Live Chat
          </Button>
        </Stack>
      </Box>
    </Container>
    </Box>
  );
};

export default LiveChatSection;
