import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Card, CardContent } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { motion } from 'framer-motion';

const ServerError = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ p: 4, textAlign: 'center', boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 10 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
            >
              <ErrorIcon sx={{ fontSize: 100, color: 'error.main', mb: 3 }} />
            </motion.div>

            <Typography variant="h2" fontWeight="bold" gutterBottom>
              500 - Server Error
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              Oops! Something went wrong on our end. Please try again later or contact support.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
              <Button component={Link} to="/" variant="contained" size="large">
                Back to Home
              </Button>
              <Button component={Link} to="/support" variant="outlined" size="large">
                Contact Support
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ServerError;
