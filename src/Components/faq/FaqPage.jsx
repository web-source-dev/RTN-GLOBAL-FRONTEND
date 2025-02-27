import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import FaqCategories from './FaqCategories';
import PopularQuestions from './PopularQuestions';
import SearchFaq from './SearchFaq';
import ContactSupport from './ContactSupport';
import CTA from '../home/CTA';

const FaqPage = () => {
  return (
    <Box>
      <Hero />
      <SearchFaq />
      <FaqCategories />
      <PopularQuestions />
      <ContactSupport />
      <CTA />
    </Box>
  );
};

export default FaqPage;
