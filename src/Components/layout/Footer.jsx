import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const theme = useTheme();

  // Function to handle scroll to top before navigation
  const handleLinkClick = (event) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    
    function smoothScrollToTop() {
      const startPosition = window.pageYOffset;
      const duration = 5800; // Adjust duration for smoothness
      let startTime = null;
    
      function scrollStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const easeInOutCubic = progress / duration < 0.5
          ? 4 * (progress / duration) ** 3
          : 1 - Math.pow(-2 * (progress / duration) + 2, 3) / 2;
        
        window.scrollTo(0, startPosition * (1 - easeInOutCubic));
    
        if (progress < duration) {
          requestAnimationFrame(scrollStep);
        }
      }
    
      requestAnimationFrame(scrollStep);
    }
    
    // Call the function to scroll smoothly
    smoothScrollToTop();
    
    
    // Navigate after a short delay to allow smooth scrolling
    setTimeout(() => {
      window.location.href = href;
    }, 500);
  };

  const services = [
    { name: 'Digital Strategy', path: '/services/digital-strategy' },
    { name: 'SEO Optimization', path: '/services/seo-optimization' },
    { name: 'Content Marketing', path: '/services/content-marketing' },
    { name: 'Social Media', path: '/services/social-media' },
    { name: 'PPC Management', path: '/services/ppc-management' },
    { name: 'Email Marketing', path: '/services/email-marketing' },
  ];

  const company = [
    { name: 'About Us', path: '/about' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Our Team', path: '/team' },
    { name: 'Careers', path: '/careers' },
    { name: 'News & Updates', path: '/news' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const resources = [
    { name: 'Blog', path: '/blog' },
    { name: 'Marketing Guide', path: '/marketing-guide' },
    { name: 'Digital Tools', path: '/digital-tools' },
    { name: 'ROI Calculator', path: '/roi-calculator' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Support', path: '/support' },
  ];
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": 'RTN GLOBAL',
      "url": "https://rtnglobal.site",
      "logo": "https://rtnglobal.site/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["English"]
      },
    })
  }}
/>
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        pt: 8,
        pb: 3,
        boxShadow: '0 -1px 4px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                color: 'primary.main',
                mb: 2,
              }}
            >
              RTN GLOBAL
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: '300px', fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
              Empowering businesses with innovative digital marketing solutions. 
              Transform your online presence and drive growth with our expert strategies.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <IconButton 
                color="primary" 
                aria-label="facebook"
                component="a"
                href="https://facebook.com"
                onClick={handleLinkClick}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                aria-label="twitter"
                component="a"
                href="https://twitter.com"
                onClick={handleLinkClick}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                aria-label="linkedin"
                component="a"
                href="https://linkedin.com"
                onClick={handleLinkClick}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                aria-label="instagram"
                component="a"
                href="https://instagram.com"
                onClick={handleLinkClick}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Poppins", sans-serif', fontWeight: 500 }}>
              Services
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {services.map((item) => (
                <Box component="li" key={item.name} sx={{ mb: 1 }}>
                  <Link
                    component={RouterLink}
                    to={item.path}
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Company */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Poppins", sans-serif', fontWeight: 500 }}>
              Company
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {company.map((item) => (
                <Box component="li" key={item.name} sx={{ mb: 1 }}>
                  <Link
                    component={RouterLink}
                    to={item.path}
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Poppins", sans-serif', fontWeight: 500 }}>
              Resources
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {resources.map((item) => (
                <Box component="li" key={item.name} sx={{ mb: 1 }}>
                  <Link
                    component={RouterLink}
                    to={item.path}
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Newsletter - Can be added in future */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Poppins", sans-serif', fontWeight: 500 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
              Email: info@rtnglobal.site
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
            1209 MOUNTAIN ROAD PLNE, STE R
              <br />
              ALBUQUERQUE, NM
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 6, mb: 3 }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
            @ {new Date().getFullYear()} RTN Global. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
            }}
          >
             <Link
              component={RouterLink}
              to="/sitemap"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Sitemap
            </Link>
            <Link
              component={RouterLink}
              to="/disclaimer"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Disclaimer
            </Link>
            <Link
              component={RouterLink}
              to="/privacy-policy"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/terms-of-service"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
