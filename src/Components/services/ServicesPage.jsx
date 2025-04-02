import React from 'react';
import { Box } from '@mui/material';
import ServicesGrid from './ServicesGrid';
import Benefits from '../roi-calculator/Benefits';
import CaseStudies from '../case-studies/Industries';
import CTA from '../home/CTA';
import MegaHero from '../AnimatedSections/Hero';
import TestimonialsAnim from '../AnimatedSections/TestimonialsAnim';

const ServicesPage = () => {
  return (
    <Box>
      <MegaHero />
      <ServicesGrid />
      <Benefits />
      <CaseStudies />
      <TestimonialsAnim/>
      <CTA />
    </Box>
  );
};

export default ServicesPage;