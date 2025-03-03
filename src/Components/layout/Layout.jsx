import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import PageTransition from '../common/PageTransition';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, md: 9 }, // Adjust based on header height
          pb: { xs: 4, md: 6 },
        }}
      >
        <PageTransition>
          {children}
        </PageTransition>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
