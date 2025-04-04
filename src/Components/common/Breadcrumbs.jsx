import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

/**
 * Breadcrumb component for navigation with built-in structured data
 * @param {Object} props Component props
 * @param {Array} props.items Array of breadcrumb items with path and label
 * @param {boolean} props.hideOnMobile Whether to hide breadcrumbs on mobile devices
 */
const Breadcrumbs = ({ items = [], hideOnMobile = true }) => {
  const location = useLocation();
  
  // If no items are provided, generate them from the current path
  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbsFromPath(location.pathname);
  
  // Create structured data for breadcrumbs
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://rtnglobal.site${item.path}`
    }))
  };

  return (
    <>
      {/* Structured data for breadcrumbs */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsSchema)}
        </script>
      </Helmet>
      
      {/* Visual breadcrumbs */}
      <Box 
        sx={{ 
          my: 2, 
          display: { 
            xs: hideOnMobile ? 'none' : 'block', 
            sm: 'block' 
          },
          px: 2
        }}
        role="navigation"
        aria-label="breadcrumbs"
      >
        <MuiBreadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb navigation"
        >
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            
            return isLast ? (
              <Typography 
                key={item.path} 
                color="text.primary"
                aria-current="page"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                {index === 0 && <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />}
                {item.label}
              </Typography>
            ) : (
              <Link
                key={item.path}
                component={RouterLink}
                to={item.path}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {index === 0 && <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />}
                {item.label}
              </Link>
            );
          })}
        </MuiBreadcrumbs>
      </Box>
    </>
  );
};

/**
 * Helper function to convert a URL path into breadcrumb items
 * @param {string} path The current URL path
 * @returns {Array} Array of breadcrumb items
 */
const generateBreadcrumbsFromPath = (path) => {
  // Always start with Home
  const breadcrumbs = [
    { path: '/', label: 'Home' }
  ];
  
  // Don't add more breadcrumbs if we're on the home page
  if (path === '/') {
    return breadcrumbs;
  }
  
  // Split the path into segments
  const segments = path.split('/').filter(Boolean);
  
  // Build up breadcrumbs from the segments
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Format the label by replacing hyphens with spaces and capitalizing
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      path: currentPath,
      label
    });
  });
  
  return breadcrumbs;
};

export default Breadcrumbs; 