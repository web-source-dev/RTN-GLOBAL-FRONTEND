import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import ServicesGrid from './ServicesGrid';
import Benefits from '../roi-calculator/Benefits';
import CaseStudies from '../case-studies/Industries';
import Testimonials from '../home/Testimonials';
import CTA from '../home/CTA';

const ServicesPage = () => {
  return (
    <Box>
      <Hero />
      <ServicesGrid />
      <Benefits />
      <CaseStudies />
      <Testimonials />
      <CTA />
    </Box>
  );
};

export default ServicesPage;