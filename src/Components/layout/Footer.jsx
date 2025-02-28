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
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
              }}
            >
              RTN GLOBAL
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: '300px' }}>
              Empowering businesses with innovative digital marketing solutions. 
              Transform your online presence and drive growth with our expert strategies.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <IconButton color="primary" aria-label="facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="linkedin">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="primary" aria-label="instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Services
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {services.map((item) => (
                <Box component="li" key={item.name} sx={{ mb: 1 }}>
                  <Link
                    component={RouterLink}
                    to={item.path}
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
            <Typography variant="h6" sx={{ mb: 2 }}>
              Company
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {company.map((item) => (
                <Box component="li" key={item.name} sx={{ mb: 1 }}>
                  <Link
                    component={RouterLink}
                    to={item.path}
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
            <Typography variant="h6" sx={{ mb: 2 }}>
              Resources
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {resources.map((item) => (
                <Box component="li" key={item.name} sx={{ mb: 1 }}>
                  <Link
                    component={RouterLink}
                    to={item.path}
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
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Email: info@rtnglobal.com
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: 123 Marketing St,
              <br />
              Digital City, DC 12345
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
          <Typography variant="body2" color="text.secondary">
            {new Date().getFullYear()} RTN Global. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
            }}
          >
                        <Link
              component={RouterLink}
              to="/disclaimer"
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
