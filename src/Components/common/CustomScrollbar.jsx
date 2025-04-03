import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const CustomScrollbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      role="presentation"
      aria-hidden="true"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '9px',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          height: `${scrollProgress}%`,
          width: '100%',
          background: (theme) => `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          transition: 'height 0.1s',
          borderRadius: '3px',
        }}
      />
    </Box>
  );
};

export default CustomScrollbar;