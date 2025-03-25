import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const SessionExpired = () => {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.default'
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <LockIcon sx={{ fontSize: 100, color: 'warning.main', mb: 4 }} />
          <Typography variant="h1" component="h1" gutterBottom>
            401
          </Typography>
          <Typography variant="h4" gutterBottom>
            Session Expired
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Your session has expired or you are not authorized to access this resource.
            Please log in again to continue.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              component={Link}
              to="/auth/login"
              variant="contained"
              color="primary"
              size="large"
            >
              Log In
            </Button>
            <Button
              component={Link}
              to="/"
              variant="outlined"
              color="primary"
              size="large"
            >
              Back to Home
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SessionExpired;
