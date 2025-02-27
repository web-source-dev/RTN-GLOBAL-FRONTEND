import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import OpenPositions from './OpenPositions';
import Benefits from './Benefits';
import Culture from './Culture';
import LifeAtRTN from './LifeAtRTN';
import CTA from '../home/CTA';

const CareersPage = () => {
  return (
    <Box>
      <Hero />
      <OpenPositions />
      <Benefits />
      <Culture />
      <LifeAtRTN />
      <CTA />
    </Box>
  );
};

export default CareersPage;
