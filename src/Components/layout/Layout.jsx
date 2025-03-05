import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import PageTransition from '../common/PageTransition';
import CustomScrollbar from '../common/CustomScrollbar';
import MouseFollower from '../common/MouseFollower';

const Layout = ({ children }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        // Hide default scrollbar but keep scrolling functionality
        '& *': {
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': { // Webkit browsers
            display: 'none'
          },
          msOverflowStyle: 'none' // IE and Edge
        }
      }}
    >
      <CustomScrollbar />
      <MouseFollower />
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, md: 9 },
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
