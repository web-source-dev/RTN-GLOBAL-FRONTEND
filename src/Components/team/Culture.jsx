import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const culturePoints = [
  {
    id: 'innovation',
    title: 'Innovation First',
    description: 'We embrace new technologies and creative solutions to drive digital marketing forward. Our team constantly explores emerging trends and tools to stay ahead of the competition. We foster a culture where experimentation is encouraged and failure is seen as a stepping stone to success.',
    icon: '🚀',
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and open communication to achieve exceptional results. Our collaborative approach brings together diverse perspectives and skills. Weve created an environment where ideas can flow freely and every team member input is valued.',
    icon: '🤝',
  },
  {
    id: 'client-success',
    title: 'Client Success',
    description: 'Our team is dedicated to delivering measurable results and exceeding client expectations. We take the time to understand each client unique needs and goals. By focusing on outcomes rather than outputs, we build lasting partnerships based on trust and proven results.',
    icon: '🏆',
  },
  {
    id: 'learning',
    title: 'Continuous Learning',
    description: 'We invest in our team growth through ongoing training and professional development. Learning is integrated into our daily workflow, with regular knowledge sharing sessions and access to industry-leading resources. We believe that when our team grows, our clients benefit.',
    icon: '📚',
  }
];

const CultureContainer = styled(Box)`
  background-color: ${props => props.bgcolor};
  color: ${props => props.textcolor};
  position: relative;
  overflow: hidden;
  padding: 100px 0;
`;

const TabsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 10px;
  position: relative;
  z-index: 2;

  @media (max-width: 899px) {
    width: 100%;
    margin-bottom: 30px;
  }
`;

const ContentContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  height: 100%;
`;

const Tab = styled(motion.div)`
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  background-color: ${props => props.active ? props.activecolor : props.bgcolor};
  box-shadow: ${props => props.active ? '0 10px 25px rgba(0,0,0,0.15)' : '0 4px 10px rgba(0,0,0,0.08)'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: ${props => props.isMobile ? '100%' : '280px'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${props => props.primarycolor};
    opacity: ${props => props.active ? 1 : 0.5};
    transition: opacity 0.3s ease;
  }
`;

const TabIconWrapper = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.bgcolor};
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    font-size: 1.5rem;
  }
`;

const ContentCard = styled(motion.div)`
  padding: 30px;
  border-radius: 16px;
  background-color: ${props => props.bgcolor};
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  max-width: 600px;
  height: 100%;
  
  &::after {
    content: '';
    position: absolute;
    right: -10px;
    bottom: -10px;
    width: 150px;
    height: 150px;
    background: linear-gradient(45deg, ${props => props.accentcolor}22, transparent);
    border-radius: 30px;
    z-index: -1;
  }
`;

const ProgressIndicator = styled(motion.div)`
  position: absolute;
  bottom: -10px;
  left: 0;
  height: 3px;
  background-color: ${props => props.primarycolor};
  border-radius: 3px;
`;

const CircleDecoration = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.bgcolor};
  opacity: ${props => props.opacity};
  filter: blur(${props => props.blur}px);
  z-index: 1;
`;

const ShapeDecoration = styled(motion.div)`
  position: absolute;
  border-radius: ${props => props.radius || '50%'};
  background: ${props => props.bgcolor};
  opacity: ${props => props.opacity};
  filter: blur(${props => props.blur || 0}px);
  z-index: 1;
`;

const Culture = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  const [isManualInteraction, setIsManualInteraction] = useState(false);
  const [progress, setProgress] = useState(0);
  const autoRotateIntervalRef = useRef(null);
  const progressIntervalRef = useRef(null);
  
  // Using theme colors directly
  const bgColor = theme.palette.background.default;
  const textColor = theme.palette.text.primary;
  const cardBgColor = theme.palette.background.paper;
  const tabBgColor = isDarkMode ? theme.palette.background.default : '#F5F5F5';
  const activeTabBgColor = theme.palette.background.paper;
  
  const containerRef = useRef(null);
  
  // Animation variants
  const tabVariants = {
    inactive: { 
      scale: 0.98,
      y: 0
    },
    active: { 
      scale: 1,
      y: 0
    },
    tap: {
      scale: 0.95
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Auto rotate tabs functionality
  useEffect(() => {
    const rotationTime = 7000; // 7 seconds per tab
    const progressUpdateInterval = 50; // Update progress every 50ms
    
    const startAutoRotation = () => {
      clearInterval(autoRotateIntervalRef.current);
      clearInterval(progressIntervalRef.current);
      
      setProgress(0);
      
      // Update progress bar
      let currentProgress = 0;
      progressIntervalRef.current = setInterval(() => {
        currentProgress += (progressUpdateInterval / rotationTime) * 100;
        if (currentProgress > 100) currentProgress = 100;
        setProgress(currentProgress);
      }, progressUpdateInterval);
      
      // Change tab after rotationTime
      autoRotateIntervalRef.current = setTimeout(() => {
        if (!isManualInteraction) {
          setActiveTab(prev => (prev + 1) % culturePoints.length);
        }
      }, rotationTime);
    };
    
    startAutoRotation();
    
    return () => {
      clearInterval(autoRotateIntervalRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, [activeTab, isManualInteraction]);
  
  // Reset the manual interaction flag after a delay
  useEffect(() => {
    if (isManualInteraction) {
      const timer = setTimeout(() => {
        setIsManualInteraction(false);
      }, 10000); // Remain manual for 10 seconds after interaction
      
      return () => clearTimeout(timer);
    }
  }, [isManualInteraction]);
  
  const handleTabClick = (index) => {
    setActiveTab(index);
    setIsManualInteraction(true);
    setProgress(0);
  };

  const handleTabKeyPress = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(index);
    }
  };

  return (
    <CultureContainer 
      bgcolor={bgColor} 
      textcolor={textColor}
      ref={containerRef}
      component="section"
      id="culture-section"
      aria-labelledby="culture-title"
    >
      {/* Background decorative elements */}
      <CircleDecoration
        bgcolor={theme.palette.primary.main}
        opacity={0.05}
        blur={30}
        animate={{
          x: [0, 10, 0],
          y: [0, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut"
        }}
        style={{
          top: '15%',
          right: '8%',
          width: '200px',
          height: '200px',
        }}
        aria-hidden="true"
      />
      
      <ShapeDecoration
        bgcolor={theme.palette.secondary.main}
        opacity={0.05}
        blur={20}
        radius="30% 70% 70% 30% / 30% 30% 70% 70%"
        animate={{
          borderRadius: [
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 70% 70% 30% / 30% 30% 70% 70%"
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut"
        }}
        style={{
          bottom: '10%',
          left: '10%',
          width: '250px',
          height: '250px',
        }}
        aria-hidden="true"
      />
      
      <ShapeDecoration
        bgcolor={theme.palette.primary.light}
        opacity={0.03}
        radius="60% 40% 30% 70% / 60% 30% 70% 40%"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut"
        }}
        style={{
          top: '60%',
          right: '15%',
          width: '180px',
          height: '180px',
        }}
        aria-hidden="true"
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="overline"
            sx={{ 
              letterSpacing: 2, 
              opacity: 0.7, 
              fontWeight: 500, 
              color: theme.palette.primary.main,
              display: 'block',
              mb: 1
            }}
          >
            WHAT DRIVES US
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            id="culture-title"
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              background: isDarkMode 
                ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` 
                : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Culture
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ 
              maxWidth: '700px', 
              margin: '0 auto', 
              mb: 4,
              lineHeight: 1.6
            }}
          >
            The values that define how we work together and deliver exceptional results for our clients
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={4}>
            <TabsContainer 
              role="tablist" 
              aria-label="Company culture values"
            >
              {culturePoints.map((point, index) => (
                <Tab
                  key={index}
                  active={activeTab === index}
                  bgcolor={tabBgColor}
                  activecolor={activeTabBgColor}
                  primarycolor={theme.palette.primary.main}
                  isMobile={isMobile}
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeTab === index ? "active" : "inactive"}
                  whileTap="tap"
                  whileHover={{ 
                    x: 5, 
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => handleTabClick(index)}
                  onKeyDown={(e) => handleTabKeyPress(e, index)}
                  tabIndex={0}
                  role="tab"
                  id={`tab-${point.id}`}
                  aria-selected={activeTab === index}
                  aria-controls={`panel-${point.id}`}
                  layout
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative' }}>
                    <TabIconWrapper 
                      bgcolor={`${theme.palette.primary.main}22`}
                      aria-hidden="true"
                    >
                      <span role="img" aria-hidden="true">{point.icon}</span>
                    </TabIconWrapper>
                    <Box>
                      <Typography 
                        variant="h6" 
                        component={activeTab === index ? "h3" : "div"}
                        fontWeight={600}
                        color={activeTab === index ? theme.palette.primary.main : 'inherit'}
                      >
                        {point.title}
                      </Typography>
                      {activeTab === index && (
                        <ProgressIndicator 
                          primarycolor={theme.palette.primary.main}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          aria-hidden="true"
                        />
                      )}
                    </Box>
                    {activeTab === index && (
                      <motion.div 
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          translateY: '-50%',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: theme.palette.primary.main
                        }}
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeInOut"
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </Box>
                </Tab>
              ))}
            </TabsContainer>
          </Grid>
          <Grid item xs={12} md={8}>
            <ContentContainer>
              <AnimatePresence mode="wait">
                <ContentCard 
                  key={activeTab}
                  bgcolor={cardBgColor}
                  accentcolor={theme.palette.primary.main}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  role="tabpanel"
                  id={`panel-${culturePoints[activeTab].id}`}
                  aria-labelledby={`tab-${culturePoints[activeTab].id}`}
                >
                  <Box sx={{ position: 'relative', height: '100%' }}>
                    <CircleDecoration
                      bgcolor={theme.palette.primary.main}
                      opacity={0.03}
                      blur={0}
                      style={{
                        top: '-30px',
                        right: '-30px',
                        width: '100px',
                        height: '100px',
                      }}
                      aria-hidden="true"
                    />
                    
                    <Typography
                      variant="h4"
                      component="h3"
                      sx={{ 
                        mb: 3, 
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        position: 'relative',
                        display: 'inline-block'
                      }}
                    >
                      {culturePoints[activeTab].title}
                      <motion.div 
                        style={{
                          position: 'absolute',
                          bottom: '-8px',
                          left: '0',
                          height: '2px',
                          width: '40%',
                          backgroundColor: theme.palette.primary.main,
                          opacity: 0.5
                        }}
                        layoutId="underline"
                        aria-hidden="true"
                      />
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{ 
                        mb: 4, 
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        color: theme.palette.text.secondary,
                        position: 'relative',
                        zIndex: 2
                      }}
                    >
                      {culturePoints[activeTab].description}
                    </Typography>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative'
                      }}
                    >
                      <CircleDecoration
                        bgcolor={`${theme.palette.primary.main}10`}
                        opacity={0.3}
                        blur={20}
                        style={{
                          width: '120px',
                          height: '120px',
                          position: 'absolute'
                        }}
                        aria-hidden="true"
                      />
                      <motion.div
                        key={`icon-${activeTab}`}
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 260, 
                          damping: 20,
                          delay: 0.2
                        }}
                        aria-hidden="true"
                      >
                        <Box
                          sx={{
                            fontSize: '5rem',
                            filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))',
                            position: 'relative',
                            zIndex: 2
                          }}
                          aria-hidden="true"
                        >
                          <span role="img" aria-hidden="true">{culturePoints[activeTab].icon}</span>
                        </Box>
                      </motion.div>
                    </Box>
                  </Box>
                </ContentCard>
              </AnimatePresence>
            </ContentContainer>
          </Grid>
        </Grid>
      </Container>
    </CultureContainer>
  );
};

export default Culture;