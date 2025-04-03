import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  InputAdornment,
  Breadcrumbs,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  Chip,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import PrintIcon from '@mui/icons-material/Print';
import CodeIcon from '@mui/icons-material/Code';
import DownloadIcon from '@mui/icons-material/Download';
import SEO from '../common/SEO';

const SitemapSection = ({ title, links, icon }) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        mb: 3, 
        backgroundColor: 'background.paper',
        borderRadius: '10px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Box display="flex" alignItems="center" mb={1}>
        {icon && <Box mr={1} color="primary.main">{icon}</Box>}
        <Typography variant="h6" color="primary" gutterBottom>
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {links.map((link, index) => (
          <Box component="li" key={index} sx={{ mb: 1 }}>
            <Link
              to={link.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  '&:hover': { 
                    color: theme.palette.primary.main,
                    paddingLeft: '5px',
                    transition: 'all 0.2s ease-in-out'
                  },
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {link.label}
                {link.isNew && (
                  <Chip 
                    label="New" 
                    size="small" 
                    color="secondary" 
                    sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                  />
                )}
              </Typography>
            </Link>
          </Box>
        ))}    
      </Box>
    </Paper>
  );
};

const Sitemap = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [xmlContent, setXmlContent] = useState('');
  const [showXmlGeneratedAlert, setShowXmlGeneratedAlert] = useState(false);

  // Icons for categories
  const categoryIcons = {
    Main: <HomeIcon />,
    Services: <i className="fas fa-cogs"></i>,
    Resources: <i className="fas fa-book-open"></i>,
    Tools: <i className="fas fa-tools"></i>,
    Company: <i className="fas fa-building"></i>,
    User: <i className="fas fa-user"></i>,
    Legal: <i className="fas fa-gavel"></i>,
    Popular: <i className="fas fa-star"></i>
  };

  const sitemapData = [
    {
      title: 'Main',
      links: [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Contact', path: '/contact' },
        { label: 'Pricing', path: '/pricing' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Digital Strategy', path: '/services/digital-strategy' },
        { label: 'SEO Optimization', path: '/services/seo-optimization' },
        { label: 'Content Marketing', path: '/services/content-marketing' },
        { label: 'Social Media', path: '/services/social-media' },
        { label: 'PPC Management', path: '/services/ppc-management' },
        { label: 'Email Marketing', path: '/services/email-marketing' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', path: '/blog' },
        { label: 'Case Studies', path: '/case-studies' },
        { label: 'News', path: '/news' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Marketing Guide', path: '/marketing-guide' },
      ],
    },
    {
      title: 'Tools',
      links: [
        { label: 'Digital Tools', path: '/digital-tools' },
        { label: 'ROI Calculator', path: '/roi-calculator' },
        { label: 'Free Consultation', path: '/free-consultation', isNew: true },
        { label: 'Newsletter Signup', path: '/news/letter/form' },
        { label: 'Ticket Status', path: '/check-ticket' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Team', path: '/team' },
        { label: 'Careers', path: '/careers' },
        { label: 'Support', path: '/support' },
        { label: 'Job Application', path: '/job/application/form' },
        { label: 'Community', path: '/Community', isNew: true },
      ],
    },
    {
      title: 'Auth',
      links: [
        { label: 'Login', path: '/auth/login' },
        { label: 'Register', path: '/auth/register' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy-policy' },
        { label: 'Terms of Service', path: '/terms-of-service' },
        { label: 'Disclaimer', path: '/disclaimer' },
      ],
    },
    {
      title: 'Popular',
      links: [
        { label: 'Free Consultation', path: '/free-consultation' },
        { label: 'ROI Calculator', path: '/roi-calculator' },
        { label: 'Blog', path: '/blog' },
        { label: 'Live Chat', path: '/livechat' },
        { label: 'Community', path: '/Community' },
      ],
    },
  ];

  // Generate XML sitemap
  const generateXMLSitemap = () => {
    const baseUrl = 'https://rtnglobal.site';
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add all pages from the sitemap data
    const allLinks = [];
    sitemapData.forEach(section => {
      section.links.forEach(link => {
        allLinks.push(link);
      });
    });
    
    // Remove duplicates
    const uniqueLinks = allLinks.filter((link, index, self) => 
      index === self.findIndex((l) => l.path === link.path)
    );
    
    // Generate XML entries
    uniqueLinks.forEach(link => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${link.path}</loc>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    setXmlContent(xml);
    setShowXmlGeneratedAlert(true);
    setTimeout(() => setShowXmlGeneratedAlert(false), 3000);
    return xml;
  };
  
  // Download XML sitemap
  const downloadXMLSitemap = () => {
    const xml = generateXMLSitemap();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Filter links based on search term
  const filteredSitemapData = sitemapData.map(section => ({
    ...section,
    links: section.links.filter(link => 
      link.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.links.length > 0);

  const handlePrint = () => {
    window.print();
  };

  // Create structured data for sitemap page
  const sitemapSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sitemap | RTN Global",
    "description": "Complete sitemap of RTN Global website with all pages and sections organized for easy navigation.",
    "publisher": {
      "@type": "Organization",
      "name": "RTN Global",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rtnglobal.site/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://rtnglobal.site/sitemap"
    }
  };

  return (
    <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
      <SEO
        title="Sitemap | Website Structure & Navigation"
        description="Complete sitemap of RTN Global website with all pages and sections organized for easy navigation. Find the content you're looking for quickly."
        keywords="sitemap, website structure, site navigation, RTN Global pages, website map, site index"
        canonicalUrl="/sitemap"
        schema={sitemapSchema}
      />
      <Container maxWidth="lg">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <MapIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Sitemap
          </Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h2" gutterBottom component="div">
            Sitemap
          </Typography>
          <Box>
            <Button 
              variant="outlined" 
              startIcon={<PrintIcon />} 
              onClick={handlePrint}
              sx={{ display: { xs: 'none', sm: 'flex' }, mr: 2 }}
            >
              Print
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<DownloadIcon />} 
              onClick={downloadXMLSitemap}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              XML Sitemap
            </Button>
          </Box>
        </Box>
        
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Find everything you need on our website
        </Typography>

        {showXmlGeneratedAlert && (
          <Alert 
            severity="success" 
            sx={{ mb: 2 }}
            onClose={() => setShowXmlGeneratedAlert(false)}
          >
            XML Sitemap generated successfully!
          </Alert>
        )}

        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)} 
          sx={{ mb: 3 }}
          variant="fullWidth"
        >
          <Tab icon={<MapIcon />} label="HTML Sitemap" />
          <Tab icon={<CodeIcon />} label="XML Sitemap" />
        </Tabs>

        {activeTab === 0 ? (
          <>
            {/* Search Box */}
            <TextField
              fullWidth
              placeholder="Search pages..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Grid container spacing={3}>
              {filteredSitemapData.map((section, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <SitemapSection 
                    title={section.title} 
                    links={section.links} 
                    icon={categoryIcons[section.title]}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Paper sx={{ p: 3, bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">XML Sitemap Preview</Typography>
                <Button 
                  variant="contained" 
                  size="small" 
                  startIcon={<DownloadIcon />}
                  onClick={downloadXMLSitemap}
                >
                  Download
                </Button>
              </Box>
              <Box 
                sx={{ 
                  p: 2, 
                  bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#fff',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? '#333' : '#ddd',
                  borderRadius: 1,
                  maxHeight: '500px',
                  overflow: 'auto'
                }}
              >
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {xmlContent || generateXMLSitemap()}
                </pre>
              </Box>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Sitemap;