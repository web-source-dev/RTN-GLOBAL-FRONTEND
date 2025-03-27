import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import Culture from './Culture';
import JoinTeam from './JoinTeam';
import CTA from '../home/CTA';
import Team from '../AnimatedSections/Team';

const TeamPage = () => {
  return (
    <Box>
      <Hero />
      <Team />
      <Culture />
      <JoinTeam />
      <CTA />
    </Box>
  );
};

export default TeamPage;
