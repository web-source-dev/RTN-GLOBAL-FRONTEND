import React from 'react';
import { Box, useTheme } from '@mui/material';
import Hero from './Hero';
import ToolsGrid from './ToolsGrid';
import FeaturedTools from './FeaturedTools';
import Integration from './Integration';
import Pricing from './Pricing';
import CTA from '../home/CTA';
import SEO from '../common/SEO';

const DigitalToolsPage = () => {
  const theme = useTheme();

  // Define structured data for Digital Tools page
  const digitalToolsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Digital Web Tools & Services | RTN Global",
    "description": "Explore our suite of digital web tools and services designed to enhance your online presence. Custom Wix websites, MERN stack applications, and React Native solutions.",
    "publisher": {
      "@type": "Organization",
      "name": "RTN Global",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rtnglobal.site/images/logo.png"
      }
    },
    "offers": {
      "@type": "AggregateOffer",
      "highPrice": "2000",
      "lowPrice": "500",
      "offerCount": "5",
      "priceCurrency": "USD",
      "offers": [
        {
          "@type": "Offer",
          "name": "Wix Website Development",
          "description": "Professional custom Wix website development",
          "price": "800",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "name": "MERN Stack Applications",
          "description": "Full-stack web applications with MongoDB, Express, React, and Node.js",
          "price": "1500",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "name": "React Native Mobile Apps",
          "description": "Cross-platform mobile applications for iOS and Android",
          "price": "2000",
          "priceCurrency": "USD"
        }
      ]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://rtnglobal.site/digital-tools"
    }
  };

  return (
    <Box 
      component="main" 
      aria-label="Digital Tools and Services"
      sx={{
        minHeight: '100vh',
        background: theme => theme.palette.background.default
      }}
    >
      <SEO
        title="Digital Web Tools & Services | RTN Global"
        description="Explore our suite of digital web tools and services to enhance your online presence. We offer custom Wix websites, MERN stack applications, and React Native mobile solutions."
        keywords="digital tools, web services, Wix development, MERN stack, React Native, web applications, mobile apps, custom websites, web solutions, professional web development"
        canonicalUrl="/digital-tools"
        ogType="website"
        ogImage="/images/og-digital-tools.png"
        schema={digitalToolsSchema}
      />
      <Hero />
      <ToolsGrid />
      <FeaturedTools />
      <Integration />
      <Pricing />
      <CTA />
    </Box>
  );
};

export default DigitalToolsPage;
