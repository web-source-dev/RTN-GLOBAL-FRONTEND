import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const sectionData = [
  {
    text: "Welcome to RTN Global",
    images: [
      { src: "/images/portfolio/project1.png" },
      { src: "/images/portfolio/project2.jpg" },
      { src: "/images/portfolio/project3.jpg" },
      { src: "/images/portfolio/project4.png" }
    ]
  },
  {
    text: "Our Projects",
    images: [
      { src: "/images/portfolio/project3.jpg" },
      { src: "/images/portfolio/project4.png" },
      { src: "/images/portfolio/project5.jpg" },
      { src: "/images/portfolio/project6.png" }
    ]
  }
];

const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '600vh',
  backgroundColor: theme.palette.background.default
}));

const StickyContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  height: '100vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden'
}));

const StickText = styled(Typography)(({ theme }) => ({
  fontSize: '8vw',
  color: theme.palette.text.primary,
  zIndex: 1,
  mixBlendMode: 'difference',
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    fontSize: '12vw'
  }
}));

const floatAnimation = keyframes`
  0% { transform: translateY(100vh); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh); opacity: 0; }
`;

const fadeOutAnimation = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-50vh); opacity: 0; }
`;

const FloatingImage = styled('img')(({ theme, index, scrollProgress, isActive }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: isActive ? 1 : 0,
  transform: `translateY(${(scrollProgress * 200) - 100}vh)`,
  transition: 'opacity 0.5s ease-out, transform 0.3s ease-out'
}));

const StickTextSection = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const element = containerRef.current;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight - window.innerHeight;
        
        const progress = Math.max(0, Math.min(1, (scrollTop - elementTop) / elementHeight));
        setScrollProgress(progress);
        
        // Calculate current section and active image based on scroll progress
        if (progress <= 0.4) {
          setCurrentSection(0);
          setActiveImageIndex(Math.floor(progress * 10));
        } else if (progress > 0.4 && progress <= 0.5) {
          setCurrentSection(0);
          setActiveImageIndex(-1); // Hide all images during text transition
        } else {
          setCurrentSection(1);
          setActiveImageIndex(Math.floor((progress - 0.5) * 10));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container ref={containerRef}>
      <StickyContainer>
        <StickText variant="h1" sx={{
          opacity: currentSection === 0 ? 1 : 0,
          transform: currentSection === 0 ? 'translateY(0)' : 'translateY(-50vh)',
          transition: 'all 0.8s ease-in-out'
        }}>
          {sectionData[0].text}
        </StickText>
        <StickText variant="h1" sx={{
          position: 'absolute',
          opacity: currentSection === 1 ? 1 : 0,
          transform: currentSection === 1 ? 'translateY(0)' : 'translateY(50vh)',
          transition: 'all 0.8s ease-in-out'
        }}>
          {sectionData[1].text}
        </StickText>
        {sectionData[currentSection].images.map((image, index) => (
          <Paper
            key={`${currentSection}-${index}`}
            elevation={4}
            sx={{
              position: 'absolute',
              borderRadius: 2,
              overflow: 'hidden',
              width: `${20 + (index % 3) * 15}%`,
              height: `${300 + (index % 4) * 80}px`,
              left: `${15 + ((index * 23) % 65)}%`,
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: index === activeImageIndex ? 1 : 0,
              transition: 'opacity 0.5s ease-out',
              zIndex: index
            }}
          >
            <FloatingImage
              src={image.src}
              alt={`Project ${index + 1}`}
              index={index}
              scrollProgress={scrollProgress}
              isActive={index === activeImageIndex}
            />
          </Paper>
        ))}
      </StickyContainer>
    </Container>
  );
};

export default StickTextSection;