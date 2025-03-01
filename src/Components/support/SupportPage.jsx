import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import SupportOptions from './SupportOptions';
import KnowledgeBase from './KnowledgeBase';
import CTA from '../home/CTA';
import Contact from '../home/Contact';
import LiveChatSection from './LiveChatSection';

const SupportPage = () => {
  return (
    <Box>
      <Hero />
      <SupportOptions />
      <KnowledgeBase />
      <Contact />
      <LiveChatSection />
      <CTA />
    </Box>
  );
};

export default SupportPage;
