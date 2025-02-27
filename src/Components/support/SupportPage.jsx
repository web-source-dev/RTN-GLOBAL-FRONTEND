import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import SupportOptions from './SupportOptions';
import KnowledgeBase from './KnowledgeBase';
import ContactForm from './ContactForm';
import LiveChat from './LiveChat';
import CTA from '../home/CTA';

const SupportPage = () => {
  return (
    <Box>
      <Hero />
      <SupportOptions />
      <KnowledgeBase />
      <ContactForm />
      <LiveChat />
      <CTA />
    </Box>
  );
};

export default SupportPage;
