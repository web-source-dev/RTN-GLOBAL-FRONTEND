import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const sectionData = [
  {
    text: "Our Projects",
    images: [
      { src: "/images/portfolio/project1.png", width: 500, height: 350, position: 'left' },
      { src: "/images/portfolio/project2.jpg", width: 600, height: 400, position: 'right' },
      { src: "/images/portfolio/project3.jpg", width: 600, height: 400, position: 'center' },
      { src: "/images/portfolio/project4.png", width: 400, height: 500, position: 'right' }
    ]
  },
  {
    text: "Our Projects",
    images: [
      { src: "/images/portfolio/project5.jpg", width: 500, height: 500, position: 'left' },
      { src: "/images/portfolio/project6.png", width: 300, height: 600, position: 'right' },
      { src: "/images/portfolio/project1.png", width: 500, height: 500, position: 'left' },
      { src: "/images/portfolio/project4.png", width: 400, height: 360, position: 'right' }
    ]
  }
];

const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '400vh',
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
  zIndex: 10,
  mixBlendMode: 'difference',
  fontWeight: 'bold',
  position: 'absolute',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '12vw'
  }
}));

const FloatingImage = styled('img')(({ 
  position,
  animationState,
  width,
  height
}) => {
  // Handle horizontal positioning
  let translateX = '0%';
  if (position === 'left') translateX = '-75%';
  if (position === 'right') translateX = '75%';
  
  // Different animation states
  let translateY = '120vh';  // Default - below viewport
  let opacity = 0;  // Default - invisible
  
  if (animationState === 'active') {
    translateY = '0vh';  // Center of viewport
    opacity = 1;  // Fully visible
  } else if (animationState === 'exited-top') {
    translateY = '-120vh';  // Above viewport
    opacity = 0;
  } else if (animationState === 'exited-bottom') {
    translateY = '120vh';  // Below viewport
    opacity = 0;
  }

  return {
    position: 'absolute',
    width: `${width}px`,
    height: `${height}px`,
    objectFit: 'cover',
    opacity: opacity,
    transform: `translate(${translateX}, ${translateY})`,
    transition: 'opacity 0.8s ease-out, transform 1.5s ease-out',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
    borderRadius: '8px',
    maxWidth: '80vw',
    maxHeight: '80vh',
    zIndex: 1
  };
});

const StickTextSection = () => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(-1);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(false);
  const lastScrollTop = useRef(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const theme = useTheme();
  // Handle scrolling and animation state calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const element = containerRef.current;
      const scrollTop = window.scrollY;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight - window.innerHeight;
      
      // Determine scroll direction
      const isScrollingUp = scrollTop < lastScrollTop.current;
      setScrollingUp(isScrollingUp);
      lastScrollTop.current = scrollTop;
      
      // Calculate overall progress through the component
      const progress = Math.max(0, Math.min(1, (scrollTop - elementTop) / elementHeight));
      
      // Determine which section we're in (0 or 1)
      const targetSection = progress < 0.5 ? 0 : 1;
      
      // Handle section change
      if (targetSection !== currentSection) {
        setIsTransitioning(true);
        setCurrentSection(targetSection);
        setActiveImageIndex(-1);
        
        // Brief delay before starting the first image in the new section
        setTimeout(() => {
          setActiveImageIndex(0);
          setIsTransitioning(false);
        }, 300);
      }
      
      // Calculate progress within the current section (0-1)
      const currentSectionProgress = targetSection === 0 
        ? progress * 2  // First half
        : (progress - 0.5) * 2;  // Second half
      
      setSectionProgress(currentSectionProgress);
      
      // If we're not in a section transition, update the active image based on scroll
      if (!isTransitioning) {
        const imageCount = sectionData[targetSection].images.length;
        
        // Distribute images evenly across section, leaving room for enter/exit
        // Each image gets (0.8 / imageCount) of the scroll distance
        const segmentSize = 0.8 / imageCount;
        const scrollOffset = 0.1; // Start 10% into the section
        
        // Calculate which image should be visible
        let targetImageIndex = -1;
        
        for (let i = 0; i < imageCount; i++) {
          const rangeStart = scrollOffset + (i * segmentSize);
          const rangeEnd = rangeStart + segmentSize;
          
          if (currentSectionProgress >= rangeStart && currentSectionProgress < rangeEnd) {
            targetImageIndex = i;
            break;
          }
        }
        
        // If we're at the end of the section, show the last image
        if (currentSectionProgress >= scrollOffset + (imageCount - 1) * segmentSize && 
            currentSectionProgress <= 1) {
          targetImageIndex = imageCount - 1;
        }
        
        // Special handling when scrolling up - make sure we have a valid image
        if (isScrollingUp && targetImageIndex === -1 && activeImageIndex > 0) {
          targetImageIndex = activeImageIndex - 1;
        }
        
        // Update active image if needed
        if (targetImageIndex !== -1 && targetImageIndex !== activeImageIndex) {
          setActiveImageIndex(targetImageIndex);
        }
      }
    };

    // Initial setup and event listeners
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    // Set first image active after initial render with a small delay
    if (activeImageIndex === -1) {
      setTimeout(() => {
        setActiveImageIndex(0);
      }, 500);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, activeImageIndex, isTransitioning]);

  // Determine animation state for each image
  const getImageAnimationState = (index) => {
    if (index === activeImageIndex) {
      return 'active';
    } else if (index < activeImageIndex) {
      return scrollingUp ? 'exited-bottom' : 'exited-top';
    } else {
      return 'exited-bottom'; // Images not yet shown wait below
    }
  };

  return (
    <Container ref={containerRef}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.2,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 10%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 10%)`,
          zIndex: 1,
        }}
      />
      <StickyContainer>
        <StickText sx={{
          opacity: currentSection === 0 ? 1 : 0,
          transform: currentSection === 0 ? 'translateY(0)' : 'translateY(-50vh)',
          transition: 'all 0.8s ease-in-out'
        }}>
          {sectionData[0].text}
        </StickText>
        <StickText sx={{
          opacity: currentSection === 1 ? 1 : 0,
          transform: currentSection === 1 ? 'translateY(0)' : 'translateY(50vh)',
          transition: 'all 0.8s ease-in-out'
        }}>
          {sectionData[1].text}
        </StickText>
        
        {/* Current section images */}
        {sectionData[currentSection].images.map((image, index) => (
          <FloatingImage
            key={`image-${currentSection}-${index}`}
            src={image.src}
            alt={`Project ${index + 1}`}
            width={image.width}
            height={image.height}
            position={image.position}
            animationState={getImageAnimationState(index)}
          />
        ))}
      </StickyContainer>
    </Container>
  );
};

export default StickTextSection;