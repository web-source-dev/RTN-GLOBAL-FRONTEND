import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import PageTransition from '../common/PageTransition';
import CustomScrollbar from '../common/CustomScrollbar';
import MouseFollower from '../common/MouseFollower';
import LoadingProgress from '../common/LoadingProgress';
import { Helmet } from 'react-helmet-async';

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        {/* Base meta tags that should be on every page */}
        <html lang="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href={window.location.href} />
        
        {/* Performance optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        
        {/* PWA meta tags */}
        <meta name="theme-color" content="#1976d2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Helmet>
      
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
        <LoadingProgress />
        <CustomScrollbar />
        <MouseFollower />
        <a href="#main-content" className="skip-link" style={{
          position: 'absolute',
          top: '-40px',
          left: '0',
          background: '#1976d2',
          color: 'white',
          padding: '8px',
          zIndex: '9999',
          transition: '0.3s',
          '&:focus': {
            top: '0',
          }
        }}>
          Skip to main content
        </a>
        <Header />
        <Box
          component="main"
          id="main-content"
          tabIndex="-1"
          sx={{
            flexGrow: 1,
            pt: { xs: 8, md: 9 },
            pb: { xs: 4, md: 6 },
            outline: 'none', // Remove focus outline while keeping it focusable
          }}
          role="main"
          aria-label="Main content"
        >
          <PageTransition>
            {children}
          </PageTransition>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
