import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const ServerError = () => {
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
          <ErrorIcon sx={{ fontSize: 100, color: 'error.main', mb: 4 }} />
          <Typography variant="h1" component="h1" gutterBottom>
            500
          </Typography>
          <Typography variant="h4" gutterBottom>
            Server Error
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Something went wrong on our end. Please try again later or contact support if the problem persists.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              size="large"
            >
              Back to Home
            </Button>
            <Button
              component={Link}
              to="/support"
              variant="outlined"
              color="primary"
              size="large"
            >
              Contact Support
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ServerError;