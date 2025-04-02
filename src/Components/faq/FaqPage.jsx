import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import FaqCategories from './FaqCategories';
import PopularQuestions from './PopularQuestions';
import CTA from '../home/CTA';
import Contact from '../home/Contact';

const FaqPage = () => {
  return (
    <Box>
      <Hero />
      <FaqCategories />
      <PopularQuestions />
      <Contact />
      <CTA />
    </Box>
  );
};

export default FaqPage;
