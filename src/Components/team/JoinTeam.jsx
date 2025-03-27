import React, { useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import WorkIcon from '@mui/icons-material/Work';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BalanceIcon from '@mui/icons-material/Balance';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import styled from 'styled-components';

const benefits = [
  {
    title: 'Competitive Salary',
    description: 'We offer industry-leading compensation packages to attract and retain top talent.',
    icon: <TrendingUpIcon sx={{ fontSize: '2.5rem' }} />,
  },
  {
    title: 'Professional Growth',
    description: 'Continuous learning opportunities and clear career advancement paths.',
    icon: <EmojiPeopleIcon sx={{ fontSize: '2.5rem' }} />,
  },
  {
    title: 'Work-Life Balance',
    description: 'Flexible working hours and remote work options to support your lifestyle.',
    icon: <BalanceIcon sx={{ fontSize: '2.5rem' }} />,
  },
  {
    title: 'Great Benefits',
    description: 'Comprehensive health insurance, retirement plans, and other attractive perks.',
    icon: <MedicalServicesIcon sx={{ fontSize: '2.5rem' }} />,
  }
];

const JoinTeamContainer = styled(Box)`
  padding: 120px 0;
  background-color: ${props => props.bgcolor};
  color: ${props => props.textcolor};
  position: relative;
  overflow: hidden;
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.bg};
  filter: blur(${props => props.blur}px);
  opacity: ${props => props.opacity};
  z-index: 1;
`;

const BenefitCard = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.bgcolor};
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 2;
  padding: 30px;
  
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const IconWrapper = styled(Box)`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background-color: ${props => props.bgcolor};
  color: white;
`;

const JoinTeam = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const containerRef = useRef(null);
  
  // Using theme colors directly
  const bgColor = theme.palette.background.default;
  const textColor = theme.palette.text.primary;
  const cardBgColor = theme.palette.background.paper;
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Staggered animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <JoinTeamContainer 
      bgcolor={bgColor} 
      textcolor={textColor} 
      ref={containerRef}
    >
      {/* Decorative background elements */}
      <FloatingShape 
        bg={theme.palette.primary.main}
        blur={50}
        opacity={0.05}
        style={{ 
          top: '15%', 
          right: '10%', 
          width: '400px', 
          height: '400px', 
          y: y1
        }}
      />
      <FloatingShape 
        bg={theme.palette.secondary.main}
        blur={60}
        opacity={0.05}
        style={{ 
          bottom: '10%', 
          left: '5%', 
          width: '350px', 
          height: '350px',
          y: y2
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          sx={{ textAlign: 'center', mb: 8, position: 'relative', zIndex: 2 }}
        >
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
            BE PART OF OUR JOURNEY
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
            Join Our Team
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ 
              maxWidth: '800px', 
              margin: '0 auto', 
              mb: 4,
              lineHeight: 1.6
            }}
          >
            Be part of a dynamic team that's shaping the future of digital marketing.
            We're always looking for talented individuals to join our mission.
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={4}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {benefits.map((benefit, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={3} 
              key={index}
              component={motion.div}
              variants={itemVariants}
            >
              <BenefitCard 
                bgcolor={cardBgColor}
                whileHover={{ 
                  boxShadow: `0 20px 40px ${theme.palette.primary.main}33`,
                }}
              >
                <IconWrapper 
                  bgcolor={theme.palette.primary.main}
                >
                  {benefit.icon}
                </IconWrapper>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    color: theme.palette.primary.main
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: '1rem',
                    lineHeight: 1.6
                  }}
                >
                  {benefit.description}
                </Typography>
              </BenefitCard>
            </Grid>
          ))}
        </Grid>

        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          sx={{ textAlign: 'center', mt: 6, position: 'relative', zIndex: 2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<WorkIcon />}
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
              View Open Positions
            </Button>
          </motion.div>
        </Box>
      </Container>
    </JoinTeamContainer>
  );
};

export default JoinTeam;