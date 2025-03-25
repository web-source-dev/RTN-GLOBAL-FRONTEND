import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import GuideCategories from './GuideCategories';
import FeaturedGuides from './FeaturedGuides';
import LatestResources from './LatestResources';
import Newsletter from './Newsletter';
import CTA from '../home/CTA';
import NewsletterForm from '../forms/NewsletterForm';

const MarketingGuidePage = () => {
  return (
    <Box>
      <Hero />
      <GuideCategories />
      <FeaturedGuides />
      <LatestResources />
      <NewsletterForm />
      <CTA />
    </Box>
  );
};

export default MarketingGuidePage;
