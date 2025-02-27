import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import ToolsGrid from './ToolsGrid';
import FeaturedTools from './FeaturedTools';
import Integration from './Integration';
import Pricing from './Pricing';
import FAQ from './FAQ';
import CTA from '../home/CTA';

const DigitalToolsPage = () => {
  return (
    <Box>
      <Hero />
      <ToolsGrid />
      <FeaturedTools />
      <Integration />
      <Pricing />
      <FAQ />
      <CTA />
    </Box>
  );
};

export default DigitalToolsPage;
