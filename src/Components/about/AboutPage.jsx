import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import Mission from './Mission';
import Values from './Values';
import Expertise from './Expertise';
import Team from '../AnimatedSections/Team';

const AboutPage = () => {
  return (
    <Box 
      sx={{
        minHeight: '100vh',
        background: theme => theme.palette.mode.default
      }}
    >
      <Hero />
      <Mission />
      <Values />
      <Expertise />
      <Team />
    </Box>
  );
};

export default AboutPage;