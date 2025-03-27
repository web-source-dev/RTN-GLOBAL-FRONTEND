import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { styled } from '@mui/material/styles';
import { Box, Typography, Container, useTheme } from '@mui/material';

// Styled components using MUI's styled API
const HeroContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' 
    ? '#f5f5f5' 
    : '#111',
  color: theme.palette.mode === 'light' ? theme.palette.text.primary : 'white',
  minHeight: '100vh',
  marginBottom: '50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const WaveBottom = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: -20,
  left: 0,
  width: '100%',
  height: '25vh',
  zIndex: 1,
  overflow: 'visible',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: theme.palette.mode === 'light'
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 180' preserveAspectRatio='none'%3E%3Cpath d='M0,30 C200,150 400,0 600,100 C800,200 1000,30 1200,70 L1200,180 L0,180 Z' fill='white' /%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 180' preserveAspectRatio='none'%3E%3Cpath d='M0,30 C200,150 400,0 600,100 C800,200 1000,30 1200,70 L1200,180 L0,180 Z' fill='%232323' /%3E%3C/svg%3E")`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat',
    transform: 'scale(1.2) translateY(5%)',
  }
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  zIndex: 2,
  padding: theme.spacing(0, 2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '1200px',
  transform: 'rotate(-5deg)', // Rotate the entire content slightly
}));

const HeroText = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(8),
  textAlign: 'center', // Center text
  width: '100%',
  
}));

const MainHeading = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(4rem, 10vw, 9rem)',
  fontWeight: 900,
  lineHeight: 0.85,
  margin: 0,
  letterSpacing: '-0.03em',
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(3rem, 8vw, 5rem)',
  },
}));

const Tagline = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(4),
  fontWeight: 500,
  lineHeight: 1.2,
  transform: 'rotate(0deg) translateY(2rem)', // Adjust the tagline position
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    marginTop: theme.spacing(4),
    transform: 'translateY(0.5rem)',
  },
}));

const RedDot = styled('span')(({ theme }) => ({
  display: 'inline-block',
  color: theme.palette.primary.main,
  fontSize: '120%',
  position: 'relative',
  top: '0.05em',
}));

const ScrollDown = styled(Link)(({ theme }) => ({
  position: 'absolute',
  bottom: '12vh',
  left: '50%',
  transform: 'translateX(-50%)',
  cursor: 'pointer',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& svg': {
    width: 40,
    height: 40,
    color: theme.palette.primary.main,
    marginBottom: '-15px', // Overlap the arrows
  },
  [theme.breakpoints.down('md')]: {
    bottom: '18vh',
    '& svg': {
      width: 30,
      height: 30,
      marginBottom: '-10px',
    },
  },
}));

const Logo = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(4),
  left: theme.spacing(4),
  fontWeight: 'bold',
  fontSize: '1.75rem',
  zIndex: 10,
  [theme.breakpoints.down('md')]: {
    top: theme.spacing(2),
    left: theme.spacing(2),
    fontSize: '1.5rem',
  },
}));

const MenuButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(4),
  right: theme.spacing(4),
  width: '2.5rem',
  height: '2.5rem',
  backgroundColor: 'transparent',
  borderRadius: '50%',
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0.4rem',
    height: '0.4rem',
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.text.primary : '#fff',
    borderRadius: '50%',
    boxShadow: theme.palette.mode === 'light' 
      ? `0 0.7rem 0 ${theme.palette.text.primary}, 0 1.4rem 0 ${theme.palette.text.primary}` 
      : '0 0.7rem 0 #fff, 0 1.4rem 0 #fff',
  },
  [theme.breakpoints.down('md')]: {
    top: theme.spacing(2),
    right: theme.spacing(2),
    width: '2rem',
    height: '2rem',
  },
}));

const MegaHero = () => {
  const theme = useTheme();
  
  // Animation variants for framer-motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };
  
  // Arrow bounce animation
  const bounce = {
    initial: { y: 0 },
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2,
      }
    }
  };
  
  const bounceDelayed = {
    initial: { y: 0 },
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  return (
    <HeroContainer component="section">
      <ContentWrapper maxWidth="lg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          style={{ width: '100%' }}
        >
          <HeroText>
            <MainHeading variant="h1" sx={{ color: theme.palette.mode === 'light' ? theme.palette.text.primary : 'white' }}>
              You dream it<RedDot>.</RedDot><br />
              We build it<RedDot>.</RedDot>
            </MainHeading>
            <Tagline variant="h2" sx={{ color: theme.palette.mode === 'light' ? theme.palette.text.secondary : 'rgba(255,255,255,0.8)' }}>
              Get the website of your dreams with RTN Global<RedDot>.</RedDot>
            </Tagline>
          </HeroText>
        </motion.div>
      </ContentWrapper>
      
      <ScrollDown
        to="services"
        smooth={true}
        duration={800}
        spy={true}
        aria-label="Scroll to services"
      >
        <motion.div
          variants={bounceDelayed}
          initial="initial"
          animate="animate"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 19.59L4.41 12 6.5 9.91 12 15.42 17.5 9.91 19.59 12 12 19.59z" />
          </svg>
        </motion.div>
        <motion.div
          variants={bounce}
          initial="initial"
          animate="animate"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 19.59L4.41 12 6.5 9.91 12 15.42 17.5 9.91 19.59 12 12 19.59z" />
          </svg>
        </motion.div>
      </ScrollDown>
      
      <WaveBottom />
    </HeroContainer>
  );
};

export default MegaHero;
