import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import ServicesGrid from './ServicesGrid';
import Benefits from '../roi-calculator/Benefits';
import CaseStudies from '../case-studies/Industries';
import Testimonials from '../home/Testimonials';
import CTA from '../home/CTA';
import MegaHero from '../AnimatedSections/Hero';
import TestimonialsAnim from '../AnimatedSections/TestimonialsAnim';

const ServicesPage = () => {
  return (
    <Box>
      <MegaHero />
      <Hero />
      <ServicesGrid />
      <Benefits />
      <CaseStudies />
      <TestimonialsAnim/>
      <CTA />
    </Box>
  );
};

export default ServicesPage;