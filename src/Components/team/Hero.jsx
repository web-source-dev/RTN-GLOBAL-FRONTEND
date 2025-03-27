import React, { useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useTheme,
} from '@mui/material';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import GroupsIcon from '@mui/icons-material/Groups';
import styled from 'styled-components';

const HeroContainer = styled(Box)`
  background-color: ${props => props.bgcolor};
  color: ${props => props.textcolor};
  padding-top: 120px;
  padding-bottom: 100px;
  position: relative;
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  align-items: center;
`;

const AnimatedImage = styled(motion.img)`
  width: 100%;
  height: auto;
  max-width: 600px;
  display: block;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.bg};
  filter: blur(${props => props.blur}px);
  opacity: ${props => props.opacity};
  z-index: 1;
`;

const Hero = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Theme-aware colors directly from theme
  const bgColor = theme.palette.background.paper;
  const textColor = theme.palette.text.primary;
  const accentColor = theme.palette.primary.main;

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  
  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const imageX = useSpring(useTransform(mouseX, (value) => (value - window.innerWidth / 2) / 15), springConfig);
  const imageY = useSpring(useTransform(mouseY, (value) => (value - window.innerHeight / 2) / 15), springConfig);

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 50
      }
    }
  };

  return (
    <HeroContainer bgcolor={bgColor} textcolor={textColor} ref={containerRef}>
      {/* Decorative background elements */}
      <FloatingShape 
        bg={theme.palette.primary.main}
        blur={40}
        opacity={0.1}
        style={{ 
          top: '10%', 
          left: '5%', 
          width: '400px', 
          height: '400px', 
          x: useTransform(scrollYProgress, [0, 1], [0, -100]),
          y: useTransform(scrollYProgress, [0, 1], [0, 50])
        }}
      />
      <FloatingShape 
        bg={theme.palette.secondary.main}
        blur={50}
        opacity={0.1}
        style={{ 
          bottom: '10%', 
          right: '5%', 
          width: '350px', 
          height: '350px',
          x: useTransform(scrollYProgress, [0, 1], [0, 100]),
          y: useTransform(scrollYProgress, [0, 1], [0, -50])
        }}
      />

      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ opacity: titleOpacity }}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant="overline"
                  sx={{ 
                    letterSpacing: 3, 
                    fontWeight: 600, 
                    color: theme.palette.primary.main,
                    display: 'block',
                    mb: 1,
                    fontSize: { xs: '0.8rem', md: '1rem' }
                  }}
                >
                  MEET OUR EXPERTS
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography
                  component="h1"
                  variant="h2"
                  color="text.primary"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    fontSize: { xs: '3rem', md: '4.5rem' },
                    lineHeight: 1.1,
                    background: isDarkMode 
                      ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` 
                      : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Meet Our Team
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ 
                    mb: 5, 
                    maxWidth: '600px', 
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    lineHeight: 1.5
                  }}
                >
                  Get to know the passionate experts behind our successful digital marketing strategies
                  and innovative solutions.
                </Typography>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<GroupsIcon />}
                  sx={{ 
                    borderRadius: 3,
                    padding: { xs: '12px 24px', md: '16px 32px' },
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    fontWeight: 'bold',
                    boxShadow: `0 8px 20px ${theme.palette.primary.main}33`,
                    bgcolor: theme.palette.primary.main,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                      transform: 'translateY(-5px)',
                      boxShadow: `0 15px 25px ${theme.palette.primary.main}66`,
                    },
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  Join Our Team
                </Button>
              </motion.div>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div
              style={{ 
                y,
                scale: imageScale,
                rotateY: imageX,
                rotateX: imageY,
                perspective: 1000
              }}
            >
              <AnimatedImage
                src="/images/Team/tayyab.png"
                alt="Team Hero"
                initial={{ opacity: 0, y: 100 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    type: "spring", 
                    damping: 15, 
                    delay: 0.3
                  }
                }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: `0 20px 40px rgba(0,0,0,0.3)`,
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </HeroContainer>
  );
};

export default Hero;