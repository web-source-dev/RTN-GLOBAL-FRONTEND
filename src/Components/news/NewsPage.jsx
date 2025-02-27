import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import LatestNews from './LatestNews';
import PressReleases from './PressReleases';
import MediaCoverage from './MediaCoverage';
import Newsletter from './Newsletter';
import CTA from '../home/CTA';

const NewsPage = () => {
  return (
    <Box>
      <Hero />
      <LatestNews />
      <PressReleases />
      <MediaCoverage />
      <Newsletter />
      <CTA />
    </Box>
  );
};

export default NewsPage;
