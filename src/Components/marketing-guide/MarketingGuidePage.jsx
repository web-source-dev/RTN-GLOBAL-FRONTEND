import React from 'react';
import { Box, useTheme } from '@mui/material';
import Hero from './Hero';
import GuideCategories from './GuideCategories';
import FeaturedGuides from './FeaturedGuides';
import LatestResources from './LatestResources';
import CTA from '../home/CTA';
import NewsletterForm from '../forms/NewsletterForm';
import SEO from '../common/SEO';

const MarketingGuidePage = () => {
  const theme = useTheme();
  
  // Define structured data for Marketing Guide page
  const marketingGuideSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Marketing Resources & Guides | RTN Global",
    "description": "Comprehensive marketing guides, tutorials, and resources to help you master digital marketing strategies and grow your business online.",
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
      "@id": "https://rtnglobal.site/marketing-guide"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Digital Marketing",
        "description": "Strategies and techniques for promoting products and services using digital technologies"
      },
      {
        "@type": "Thing",
        "name": "SEO",
        "description": "Search engine optimization techniques for improving website visibility in search results"
      },
      {
        "@type": "Thing",
        "name": "Content Marketing",
        "description": "Creating and distributing valuable content to attract and engage a target audience"
      }
    ]
  };
  
  return (
    <Box 
      component="main"
      sx={{ 
        minHeight: '100vh',
        background: theme => theme.palette.background.default
      }}
    >
      <SEO
        title="Marketing Resources & Guides | Digital Marketing Strategies | RTN Global"
        description="Access comprehensive digital marketing guides, tutorials, and resources to help grow your business online. Learn SEO, content marketing, social media strategies, and more."
        keywords="digital marketing guide, marketing resources, SEO tutorials, content marketing strategies, social media marketing tips, email marketing guides, marketing best practices"
        canonicalUrl="/marketing-guide"
        ogType="website"
        ogImage="/images/og-marketing-guide.png"
        schema={marketingGuideSchema}
      />
      <Hero />
      <GuideCategories />
      <FeaturedGuides />
      <LatestResources />
      <NewsletterForm />
      <CTA />
    </Box>
  );
};

export default MarketingGuidePage;
