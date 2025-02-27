import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import Leadership from './Leadership';
import TeamMembers from './TeamMembers';
import Culture from './Culture';
import JoinTeam from './JoinTeam';
import CTA from '../home/CTA';

const TeamPage = () => {
  return (
    <Box>
      <Hero />
      <Leadership />
      <TeamMembers />
      <Culture />
      <JoinTeam />
      <CTA />
    </Box>
  );
};

export default TeamPage;
