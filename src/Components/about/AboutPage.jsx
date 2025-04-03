import React from 'react';
import { Box, useTheme } from '@mui/material';
import Hero from './Hero';
import Mission from './Mission';
import Values from './Values';
import Expertise from './Expertise';
import Team from '../AnimatedSections/Team';
import SEO from '../common/SEO';

const AboutPage = () => {
  const theme = useTheme();

  // Define structured data for About page
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About RTN Global | Web Development & Digital Marketing Experts",
    "description": "Learn about RTN Global's expertise in Wix websites, MERN stack applications, and React Native mobile development. Discover our mission, values, and approach to digital excellence.",
    "publisher": {
      "@type": "Organization",
      "name": "RTN Global",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rtnglobal.site/images/rtnglobal-logo.png"
      },
      "sameAs": [
        "https://www.facebook.com/rtnglobal",
        "https://www.twitter.com/rtnglobal",
        "https://www.linkedin.com/company/rtnglobal",
        "https://www.instagram.com/rtnglobal"
      ],
      "foundingDate": "2025",
      "founders": {
        "@type": "Person",
        "name": "RTN Global Muhammad Tayyab"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Albuquerque",
        "addressRegion": "NM",
        "postalCode": "87102",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-505-555-0123",
        "contactType": "customer service",
        "availableLanguage": ["English"]
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://rtnglobal.site/about"
    }
  };
  
  return (
    <Box 
      sx={{
        minHeight: '100vh',
        background: theme => theme.palette.background.default
      }}
    >
      <SEO
        title="About RTN Global | Web Development & Digital Marketing Experts"
        description="Learn about RTN Global's expertise in Wix websites, MERN stack applications, and React Native mobile apps. We're committed to building digital excellence through innovative solutions."
        keywords="about RTN Global, web development company, Wix experts, MERN stack developers, React Native app developers, digital marketing agency, Albuquerque web design, professional web development, company mission, company values"
        canonicalUrl="/about"
        ogType="website"
        ogImage="/images/og-about.png"
        schema={aboutPageSchema}
      />
      <Hero />
      <Mission />
      <Values />
      <Expertise />
      {/* <Team /> */}
    </Box>
  );
};

export default AboutPage;