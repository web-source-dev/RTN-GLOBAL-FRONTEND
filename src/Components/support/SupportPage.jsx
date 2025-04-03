import React from 'react';
import { Box, useTheme } from '@mui/material';
import Hero from './Hero';
import SupportOptions from './SupportOptions';
import KnowledgeBase from './KnowledgeBase';
import CTA from '../home/CTA';
import Contact from '../home/Contact';
import LiveChatSection from './LiveChatSection';
import SEO from '../common/SEO';

const SupportPage = () => {
  const theme = useTheme();
  
  // Define structured data for Support page
  const supportPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Customer Support & Help | RTN Global",
    "description": "Get help with RTN Global's services. Access our knowledge base, support options, and live chat assistance for immediate solutions to your questions.",
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
      "@id": "https://rtnglobal.site/support"
    },
    "offers": {
      "@type": "Offer",
      "name": "Customer Support",
      "description": "Free customer support for all RTN Global services",
      "price": "0",
      "priceCurrency": "USD"
    }
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
        title="Customer Support & Help | RTN Global"
        description="Get help with RTN Global's services. Access our knowledge base, support options, and live chat for immediate assistance with your questions."
        keywords="RTN Global support, customer help, technical support, knowledge base, help center, customer service, live chat support"
        canonicalUrl="/support"
        ogType="website"
        ogImage="/images/og-support.png"
        schema={supportPageSchema}
      />
      <Hero />
      <SupportOptions />
      <KnowledgeBase />
      <Contact />
      <LiveChatSection />
      <CTA />
    </Box>
  );
};

export default SupportPage;
