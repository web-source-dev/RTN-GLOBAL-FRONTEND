import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Hero from './Hero';
import Features from './Features';
import Services from './Services';
import About from './About';
import Stats from './Stats';
import Portfolio from './Portfolio';
import Testimonials from './Testimonials';
import Blog from './Blog';
import CTA from './CTA';
import Contact from './Contact';
import NewsLetter from '../forms/NewsletterForm'
import Marquee from '../common/Marquee';
import StickTextSection from '../AnimatedSections/StickText';
import TestimonialsAnim from '../AnimatedSections/TestimonialsAnim';

const HomePage = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box>
      <Hero />
      <Features />
      <Services />
      <Marquee />
      {isDesktop && <StickTextSection />}
      <About />
      <Stats />
      <Portfolio />
      <TestimonialsAnim />
      <Blog />
      <Contact />
      <NewsLetter />
      <CTA />
    </Box>
  );
};

export default HomePage;
