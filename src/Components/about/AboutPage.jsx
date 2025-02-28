import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import Mission from './Mission';
import Values from './Values';
import Team from './Team';
import Expertise from './Expertise';

const AboutPage = () => {
  return (
    <Box 
      sx={{
        minHeight: '100vh',
        background: theme => theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
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