import React, { useState, useEffect } from 'react';
import { Box, Fade } from '@mui/material';
import Hero from './Hero';
import LatestNews from './LatestNews';
import PressReleases from './PressReleases';
import MediaCoverage from './MediaCoverage';
import Newsletter from './Newsletter';
import CTA from '../home/CTA';

const NewsPage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Fade in={loaded} timeout={1000}>
      <Box>
        <Hero />
        <LatestNews />
        <PressReleases />
        <MediaCoverage />
        <Newsletter />
        <CTA />
      </Box>
    </Fade>
  );
};

export default NewsPage;
