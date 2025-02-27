import React from 'react';
import { Box } from '@mui/material';
import Hero from './Hero';
import Features from './Features';
import Services from './Services';
import About from './About';
import Stats from './Stats';
import Process from './Process';
import Portfolio from './Portfolio';
import Testimonials from './Testimonials';
import Blog from './Blog';
import CTA from './CTA';
import Contact from './Contact';

const HomePage = () => {
  return (
    <Box>
      <Hero />
      <Features />
      <Services />
      <About />
      <Stats />
      <Process />
      <Portfolio />
      <Testimonials />
      <Blog />
      <CTA />
      <Contact />
    </Box>
  );
};

export default HomePage;
