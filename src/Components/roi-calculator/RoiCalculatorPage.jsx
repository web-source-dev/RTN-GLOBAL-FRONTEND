import React from 'react';
import { Box, useTheme } from '@mui/material';
import Hero from './Hero';
import Calculator from './Calculator';
import Benefits from './Benefits';
import CaseStudies from './CaseStudies';
import CTA from '../home/CTA';
import TestimonialsAnim from '../AnimatedSections/TestimonialsAnim';
import SEO from '../common/SEO';

const RoiCalculatorPage = () => {
  const theme = useTheme();
  
  // Define structured data for ROI Calculator page
  const roiCalculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ROI Calculator | RTN Global",
    "applicationCategory": "BusinessApplication",
    "description": "Calculate the potential return on investment for your marketing campaigns with our comprehensive ROI calculator. Make data-driven decisions for your business.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "RTN Global",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rtnglobal.site/images/logo.png"
      }
    },
    "screenshot": "https://rtnglobal.site/images/roi-calculater/roi-calculater.png",
    "featureList": [
      "Marketing budget optimization",
      "Campaign ROI forecasting",
      "Investment planning tools",
      "Performance metrics"
    ],
    "operatingSystem": "Web browser",
    "softwareVersion": "1.0"
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
        title="Marketing ROI Calculator | Plan Your Investment | RTN Global"
        description="Calculate the potential return on investment for your marketing campaigns. Make data-driven decisions with our comprehensive ROI calculator tool."
        keywords="marketing ROI calculator, return on investment calculator, digital marketing ROI, marketing budget planning, ROI estimation tool"
        canonicalUrl="/roi-calculator"
        ogType="website"
        ogImage="/images/og-roi-calculator.png"
        schema={roiCalculatorSchema}
      />
      <Hero />
      <Calculator />
      <Benefits />
      <CaseStudies />
      <TestimonialsAnim />
      <CTA />
    </Box>
  );
};

export default RoiCalculatorPage;
