import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import CasesList from './CasesList';
import Industries from './Industries';
import Results from './Results';
import Testimonials from '../home/Testimonials';
import CTA from '../home/CTA';
import TestimonialsAnim from '../AnimatedSections/TestimonialsAnim';

const CaseStudiesPage = () => {
  return (
    <Box>
      <Hero />
      <CasesList />
      <Industries />
      <Results />
      <TestimonialsAnim />
      <CTA />
    </Box>
  );
};

export default CaseStudiesPage;
