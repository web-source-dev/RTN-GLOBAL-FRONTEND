import React from 'react';
import { Box, useTheme } from '@mui/material';
import Hero from './Hero';
import OpenPositions from './OpenPositions';
import Benefits from './Benefits';
import LifeAtRTN from './LifeAtRTN';
import CTA from '../home/CTA';
import SEO from '../common/SEO';

const CareersPage = () => {
  const theme = useTheme();
  
  // Define structured data for Careers page
  const careersPageSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://rtnglobal.site/careers"
    },
    "hiringOrganization": {
      "@type": "Organization",
      "name": "RTN Global",
      "sameAs": "https://rtnglobal.site",
      "logo": "https://rtnglobal.site/images/logo.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Multiple Locations",
        "addressCountry": "US"
      }
    },
    "title": "Multiple Positions Available",
    "description": "Join our team of digital marketing experts at RTN Global. We're looking for talented individuals who are passionate about innovation and excellence.",
    "datePosted": new Date().toISOString(),
    "employmentType": "FULL_TIME",
    "industry": "Digital Marketing, Web Development"
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
        title="Careers at RTN Global | Job Opportunities in Web Development"
        description="Join our team at RTN Global. Explore career opportunities in web development, digital marketing, and more. Be part of a dynamic team creating innovative digital solutions."
        keywords="RTN Global careers, web developer jobs, digital marketing careers, job opportunities, tech jobs, web development positions, digital marketing positions, tech careers"
        canonicalUrl="/careers"
        ogType="website"
        ogImage="/images/og-careers.png"
        schema={careersPageSchema}
      />
      <Hero />
      <OpenPositions />
      <Benefits />
      <LifeAtRTN />
      <CTA />
    </Box>
  );
};

export default CareersPage;
