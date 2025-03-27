import React, { useRef } from 'react';
import styled from 'styled-components';
import { Container, Box, Typography, IconButton, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const TeamContainer = styled(Container)`
  padding: 100px 0;
  background-color: ${props => props.bgcolor};
  color: ${props => props.textcolor};
  text-align: center;
  position: relative;
`;

const TeamHeader = styled(Box)`
  margin-bottom: 60px;
  position: relative;
  z-index: 2;
`;


const TeamLayout = styled(Box)`
  position: relative;
  width: 100%;
  height: 1000px;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 2;
  
  @media (max-width: 992px) {
    height: auto;
    margin-top: 50px;
    padding-bottom: 50px;
  }
`;

// Each team member will be a completely separate component to prevent styling conflicts
const JohnCard = styled(Box)`
  position: absolute;
  top: 50px;
  left: 130px;
  
  @media (max-width: 992px) {
    position: relative;
    top: auto;
    left: auto;
    margin-bottom: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const TinaCard = styled(Box)`
  position: absolute;
  top: 350px;
  left: 400px;
  
  @media (max-width: 992px) {
    position: relative;
    top: auto;
    left: auto;
    margin-bottom: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const AnaCard = styled(Box)`
  position: absolute;
  top: 650px;
  left: 670px;
  
  @media (max-width: 992px) {
    position: relative;
    top: auto;
    left: auto;
    margin-bottom: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const MemberImageBase = styled(motion.div)`
  width: 250px;
  height: 320px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 992px) {
    margin-bottom: 20px;
  }
`;

const JohnImage = styled(MemberImageBase)`
  background-color: ${props => props.theme.palette.background.paper};
  z-index: 3;
`;

const TinaImage = styled(MemberImageBase)`
  background-color: ${props => props.theme.palette.background.paper};
  z-index: 2;
`;

const AnaImage = styled(MemberImageBase)`
  background-color: ${props => props.theme.palette.background.paper};
  z-index: 1;
`;

const MemberInfoBase = styled(Box)`
  position: absolute;
  padding: 20px;
  border-radius: 16px;
  
  @media (max-width: 992px) {
    position: relative;
    top: auto !important;
    left: auto !important;
    text-align: center;
    background-color: transparent;
    box-shadow: none;
    padding: 0;
  }
`;

const JohnInfo = styled(MemberInfoBase)`
  top: 70px;
  left: 270px;
  text-align: left;
  z-index: 3;
`;

const TinaInfo = styled(MemberInfoBase)`
  top: 70px;
  left: 270px;
  text-align: left;
  z-index: 2;
`;

const AnaInfo = styled(MemberInfoBase)`
  top: 70px;
  left: 270px;
  text-align: left;
  z-index: 1;
`;

const SocialIcons = styled(Box)`
  display: flex;
  gap: 10px;
  justify-content: ${props => props.justify || 'flex-start'};
  
  .MuiIconButton-root {
    color: ${props => props.color};
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
      background-color: ${props => props.hoverBg};
      transform: translateY(-3px);
    }
  }
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const Team = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const containerRef = useRef(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Using theme colors directly
  const bgColor = theme.palette.background.default;
  const textColor = theme.palette.text.primary;
  const cardBgColor = theme.palette.background.paper;
  const iconBgColor = theme.palette.background.default;
  const iconHoverBgColor = `${theme.palette.primary.main}22`;
  const FloatingShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.bg};
  filter: blur(${props => props.blur}px);
  opacity: ${props => props.opacity};
  z-index: 1;
`;
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: i => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: i * 0.2
      }
    })
  };

  return (
    <TeamContainer maxWidth={false} id="team" bgcolor={bgColor} textcolor={textColor}>
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

      <Container>
        <TeamHeader>
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
            GET TO KNOW US
          </Typography>
          <Typography
            component="h2"
            variant="h2"
            color="text.primary"
            sx={{
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.1,
              background: isDarkMode 
                ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` 
                : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            The Team
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '700px', margin: '0 auto', color: theme.palette.text.secondary }}>
            Our team of talented designers and developers bring expertise and creativity to every project.
          </Typography>
        </TeamHeader>

        <TeamLayout>
          {/* Muhammad Tayyab - CEO */}
          <JohnCard>
            <JohnImage 
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              custom={0}
              theme={theme}
            >
              <img src="/images/Team/tayyab.png" alt="Muhammad Tayyab" />
            </JohnImage>
            <JohnInfo>
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
          > CEO
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 600, marginBottom: 1, fontSize: { xs: '1.75rem', md: '2rem' }, color: theme.palette.text.primary }}>
                Muhammad Tayyab
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1, letterSpacing: 1, color: theme.palette.text.secondary }}>
                muhammadtayyab2928@gmail.com
              </Typography>
              <SocialIcons 
                justify="flex-start" 
                color={theme.palette.text.primary}
                hoverBg={iconHoverBgColor}
              >
                <IconButton color="inherit" size="small">
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton color="inherit" size="small">
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton color="inherit" size="small">
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </SocialIcons>
            </JohnInfo>
          </JohnCard>

          {/* Muhammad Rizwan - Project Manager */}
          <TinaCard>
            <TinaImage 
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              custom={1}
              theme={theme}
            >
              <img src="/images/Team/Rizwan.jpg" alt="Muhammad Rizwan" />
            </TinaImage>
            <TinaInfo>
            <Typography variant="h3" sx={{ fontWeight: 600, marginBottom: 1,letterSpacing:3, fontSize: { xs: '0.8rem', md: '1rem' }, color: theme.palette.primary.main }}>
          
          Project Manager
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 600, marginBottom: 1, fontSize: { xs: '1.75rem', md: '2rem' }, color: theme.palette.text.primary }}>
                Muhammad Rizwan
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1, letterSpacing: 1, color: theme.palette.text.secondary }}>
                rizzeditx@gmail.com
              </Typography>
              <SocialIcons 
                justify="flex-start" 
                color={theme.palette.text.primary}
                hoverBg={iconHoverBgColor}
              >
                <IconButton color="inherit" size="small">
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton color="inherit" size="small">
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton color="inherit" size="small">
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </SocialIcons>
            </TinaInfo>
          </TinaCard>

          {/* Muhammad Nouman - Designer */}
          <AnaCard>
            <AnaImage 
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              custom={2}
              theme={theme}
            >
              <img src="/images/Team/Nouman.jpg" alt="Muhammad Nouman" />
            </AnaImage>
            <AnaInfo>
            <Typography
            variant="overline"
            sx={{ 
              letterSpacing: 3, 
              fontWeight: 600, 
              color: theme.palette.primary.main,
              fontSize: { xs: '0.8rem', md: '1rem' }
            }}
          >  DESIGNER
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 600, marginBottom: 1, fontSize: { xs: '1.75rem', md: '2rem' }, color: theme.palette.text.primary }}>
                Muhammad Nouman
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1, letterSpacing: 1, color: theme.palette.text.secondary }}>
                muhammadnouman72321@gmail.com
              </Typography>
              <SocialIcons 
                justify="flex-start" 
                color={theme.palette.text.primary}
                hoverBg={iconHoverBgColor}
              >
                <IconButton color="inherit" size="small">
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton color="inherit" size="small">
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton color="inherit" size="small">
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </SocialIcons>
            </AnaInfo>
          </AnaCard>
        </TeamLayout>
      </Container>
    </TeamContainer>
  );
};

export default Team;
