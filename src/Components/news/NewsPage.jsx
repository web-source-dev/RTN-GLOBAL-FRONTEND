import React, { useState, useEffect } from 'react';
import { Box, Fade, useTheme } from '@mui/material';
import Hero from './Hero';
import LatestNews from './LatestNews';
import PressReleases from './PressReleases';
import MediaCoverage from './MediaCoverage';
import CTA from '../home/CTA';
import NewsletterForm from '../forms/NewsletterForm';
import SEO from '../common/SEO';

const NewsPage = () => {
  const [loaded, setLoaded] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setLoaded(true);
  }, []);
  
  // Define structured data for News page
  const newsPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "News & Updates | RTN Global",
    "description": "Stay up to date with the latest news, press releases, and updates from RTN Global. Discover how we're shaping the future of digital marketing and web development.",
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
      "@id": "https://rtnglobal.site/news"
    },
    "about": {
      "@type": "Thing",
      "name": "Digital Marketing & Web Development",
      "description": "News and updates about RTN Global's services, company developments, and industry innovations"
    }
  };

  return (
    <Fade in={loaded} timeout={1000}>
      <Box 
        component="main"
        sx={{ 
          minHeight: '100vh',
          background: theme => theme.palette.background.default
        }}
      >
        <SEO
          title="News & Updates | Company Announcements | RTN Global"
          description="Stay up to date with the latest news, press releases, and company updates from RTN Global. Discover our newest initiatives, partnerships, and industry innovations."
          keywords="RTN Global news, company updates, press releases, digital marketing news, web development news, tech industry updates, company announcements, media coverage"
          canonicalUrl="/news"
          ogType="website"
          ogImage="/images/og-news.png"
          schema={newsPageSchema}
        />
        <Hero />
        <LatestNews />
        <PressReleases />
        <MediaCoverage />
        <NewsletterForm />
        <CTA />
      </Box>
    </Fade>
  );
};

export default NewsPage;
