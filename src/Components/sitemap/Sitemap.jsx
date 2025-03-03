import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

const SitemapSection = ({ title, links }) => (
  <Paper elevation={0} sx={{ p: 3, mb: 3, backgroundColor: 'background.paper' }}>
    <Typography variant="h6" color="primary" gutterBottom>
      {title}
    </Typography>
    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
      {links.map((link, index) => (
        <Box component="li" key={index} sx={{ mb: 1 }}>
          <Link
            to={link.path}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography variant="body1" sx={{ '&:hover': { color: 'primary.main' } }}>
              {link.label}
            </Typography>
          </Link>
        </Box>
      ))}    
    </Box>
  </Paper>
);

const Sitemap = () => {
  const sitemapData = [
    {
      title: 'Main',
      links: [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Digital Tools', path: '/digital-tools' },
        { label: 'ROI Calculator', path: '/roi-calculator' },
        { label: 'Marketing Guide', path: '/marketing-guide' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', path: '/blog' },
        { label: 'Case Studies', path: '/case-studies' },
        { label: 'News', path: '/news' },
        { label: 'FAQ', path: '/faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Team', path: '/team' },
        { label: 'Careers', path: '/careers' },
        { label: 'Support', path: '/support' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/legal/privacy-policy' },
        { label: 'Terms of Service', path: '/legal/terms-of-service' },
      ],
    },
  ];

  return (
    <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom>
          Sitemap
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Find everything you need on our website
        </Typography>
        <Grid container spacing={3}>
          {sitemapData.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <SitemapSection title={section.title} links={section.links} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Sitemap;