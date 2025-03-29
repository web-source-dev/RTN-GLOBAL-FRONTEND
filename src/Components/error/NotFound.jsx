import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Card, CardContent, Divider } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { motion } from 'framer-motion';

const NotFound = () => {
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
      <Container maxWidth="sm" sx={{position:'relative',zIndex:1}}>
        <Card sx={{ textAlign: 'center', borderRadius: 2,border:'none',boxShadow:0 }}>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SearchOffIcon sx={{ fontSize: 100, color: 'primary.main', mb: 3 }} />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Typography variant="h1" fontWeight="bold" sx={{ fontSize: { xs: '4rem', md: '6rem' } }} gutterBottom>
                404
              </Typography>
              <Typography variant="h4" fontWeight="medium" gutterBottom>
                Page Not Found
              </Typography>
              <Divider sx={{ my: 3, width: '40%', mx: 'auto' }} />
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '90%', mx: 'auto' }}>
                The page you're looking for doesn't exist or has been moved. 
                You might want to check the URL or return to our homepage.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ px: 4, py: 1.2, borderRadius: 2 }}
                >
                  Back to Home
                </Button>
                <Button
                  component={Link}
                  to="/support"
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ px: 4, py: 1.2, borderRadius: 2 }}
                >
                  Contact Support
                </Button>
              </Box>
            </motion.div>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default NotFound;