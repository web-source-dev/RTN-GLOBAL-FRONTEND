import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import Calculator from './Calculator';
import Benefits from './Benefits';
import CaseStudies from './CaseStudies';
import Testimonials from '../home/Testimonials';
import CTA from '../home/CTA';
import TestimonialsAnim from '../AnimatedSections/TestimonialsAnim';

const RoiCalculatorPage = () => {
  return (
    <Box>
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
