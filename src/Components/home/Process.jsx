import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, useTheme, Button, Fade, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StrategyIcon from '@mui/icons-material/Lightbulb';
import RocketIcon from '@mui/icons-material/Rocket';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TimelineConnector from '@mui/lab/TimelineConnector';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

const processes = [
  {
    icon: SearchIcon,
    label: 'Requirements & Planning',
    title: 'Understanding Your Vision',
    description: 'We begin by thoroughly understanding your business needs, technical requirements, and user experience goals to create the perfect solution.',
    details: [
      'Project Scoping',
      'Technology Assessment',
      'User Experience Planning',
      'Feature Prioritization'
    ],
    color: '#2196f3'
  },
  {
    icon: StrategyIcon,
    label: 'Design & Architecture',
    title: 'Crafting Your Solution',
    description: 'Our team designs the architecture and user interface for your Wix website, MERN stack application, or React Native mobile app.',
    details: [
      'UI/UX Design',
      'Technical Architecture',
      'Database Schema Design',
      'API Planning'
    ],
    color: '#4caf50'
  },
  {
    icon: RocketIcon,
    label: 'Development & Testing',
    title: 'Building with Precision',
    description: 'We develop your solution using modern technologies like Wix, MERN stack, or React Native, with rigorous testing throughout.',
    details: [
      'Frontend Development',
      'Backend Implementation',
      'Quality Assurance',
      'Performance Optimization'
    ],
    color: '#e91e63'
  },
  {
    icon: AnalyticsIcon,
    label: 'Deployment & Support',
    title: 'Launching Your Success',
    description: 'We deploy your solution, provide training, and offer ongoing support to ensure your digital experience continues to excel.',
    details: [
      'Deployment Strategy',
      'User Training',
      'Ongoing Maintenance',
      'Performance Monitoring'
    ],
    color: '#ff9800'
  }
];

const Process = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [activeStep, setActiveStep] = useState(null);
  const [animatedItems, setAnimatedItems] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Animation effect for timeline items
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemIndex = parseInt(entry.target.getAttribute('data-index'));
            setAnimatedItems((prev) => [...prev, itemIndex]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => observer.observe(item));

    return () => {
      timelineItems.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <Box 
      py={12} 
      sx={{ 
        background: isDark 
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
      id="our-process"
    >
      {/* Background Pattern with enhanced animation */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: isDark ? 0.15 : 0.08,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 50%)`,
          zIndex: 1,
          animation: 'pulse 15s infinite alternate',
          '@keyframes pulse': {
            '0%': { opacity: isDark ? 0.1 : 0.05 },
            '100%': { opacity: isDark ? 0.2 : 0.1 }
          }
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Fade in={true} timeout={1000}>
          <Box textAlign="center" mb={10}>
            <Typography
              component="span"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                display: 'block',
                mb: 2,
              }}
            >
              Our Process
            </Typography>
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3
              }}
            >
              How We Build Your Digital Experience
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
            >
              Our proven four-step process delivers fast, scalable, and user-friendly web and mobile solutions
            </Typography>
          </Box>
        </Fade>

        {/* Vertical Timeline */}
        <Timeline position={isMobile ? "right" : "alternate"} sx={{ p: 0, mb: 4 }}>
          {processes.map((process, index) => {
            const isAnimated = animatedItems.includes(index);
            return (
              <TimelineItem 
                key={index} 
                className="timeline-item"
                data-index={index}
                sx={{
                  minHeight: 150,
                  '&::before': isMobile ? { display: 'none' } : {}
                }}
              >
                {!isMobile && (
                  <TimelineOppositeContent
                    sx={{
                      m: 'auto 0',
                      opacity: isAnimated ? 1 : 0,
                      transform: isAnimated ? 'translateX(0)' : (index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)'),
                      transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: `${index * 0.1 + 0.3}s`,
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          top: -10,
                          left: index % 2 === 0 ? 'auto' : -20,
                          right: index % 2 === 0 ? -20 : 'auto',
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: `${process.color}15`,
                          zIndex: -1,
                          opacity: 0.7
                        }
                      }}
                    >
                      <Typography
                        variant="overline"
                        component="span"
                        sx={{
                          color: process.color,
                          fontWeight: 700,
                          display: 'block',
                          mb: 1,
                          fontSize: '1rem',
                          letterSpacing: '2px',
                          textShadow: `0 0 10px ${process.color}50`,
                          animation: isAnimated ? 'fadeInStep 1s forwards' : 'none',
                          '@keyframes fadeInStep': {
                            '0%': { opacity: 0, transform: 'translateY(-10px)' },
                            '100%': { opacity: 1, transform: 'translateY(0)' }
                          }
                        }}
                      >
                        STEP {index + 1}
                      </Typography>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 800, 
                          mb: 1,
                          fontSize: { xs: '1.75rem', md: '2.25rem' },
                          background: `linear-gradient(135deg, ${process.color} 0%, ${process.color}90 100%)`,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          letterSpacing: '0.5px',
                          animation: isAnimated ? 'slideInLabel 0.8s forwards' : 'none',
                          '@keyframes slideInLabel': {
                            '0%': { opacity: 0, transform: 'translateY(10px)' },
                            '100%': { opacity: 1, transform: 'translateY(0)' }
                          }
                        }}
                      >
                        {process.label}
                      </Typography>
                    </Box>
                  </TimelineOppositeContent>
                )}
                
                <TimelineSeparator>
                  <TimelineDot 
                    sx={{
                      background: `linear-gradient(135deg, ${process.color} 0%, ${process.color}90 100%)`,
                      boxShadow: `0 0 15px ${process.color}70, 0 0 0 5px ${process.color}30`,
                      width: 80,
                      height: 80,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '50%',
                      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      opacity: isAnimated ? 1 : 0,
                      transform: isAnimated ? 'scale(1)' : 'scale(0.5)',
                      transitionDelay: `${index * 0.1 + 0.2}s`,
                      position: 'relative',
                      zIndex: 2,
                      border: `4px solid ${isDark ? '#333' : '#fff'}`,
                      '&:hover': {
                        boxShadow: `0 0 25px ${process.color}90, 0 0 0 8px ${process.color}40`,
                        transform: 'scale(1.15) rotate(5deg)'
                      },
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        top: -8,
                        left: -8,
                        right: -8,
                        bottom: -8,
                        borderRadius: '50%',
                        border: `3px dashed ${process.color}60`,
                        animation: 'spin 15s linear infinite',
                        opacity: 0.8,
                        '@keyframes spin': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(360deg)' }
                        }
                      },
                      '&:before': {
                        content: '"' + (index + 1) + '"',
                        position: 'absolute',
                        top: -15,
                        left: -15,
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        backgroundColor: isDark ? '#333' : '#fff',
                        border: `2px solid ${process.color}`,
                        color: process.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        boxShadow: `0 4px 8px rgba(0,0,0,0.2)`,
                        zIndex: 3,
                        opacity: isAnimated ? 1 : 0,
                        transform: isAnimated ? 'scale(1)' : 'scale(0)',
                        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transitionDelay: `${index * 0.1 + 0.4}s`,
                      }
                    }}
                  >
                    <process.icon sx={{ 
                      fontSize: 40, 
                      color: 'white',
                      filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))',
                      transition: 'all 0.3s ease',
                      animation: isAnimated ? 'pulse-icon 2s infinite alternate' : 'none',
                      '@keyframes pulse-icon': {
                        '0%': { transform: 'scale(1)', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' },
                        '100%': { transform: 'scale(1.2)', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }
                      },
                      '&:hover': {
                        transform: 'scale(1.2)',
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))'
                      }
                    }} />
                  </TimelineDot>
                  {index < processes.length - 1 && (
                    <TimelineConnector 
                      sx={{
                        background: `linear-gradient(to bottom, ${process.color} 0%, ${process.color}40 100%)`,
                        width: 6,
                        height: 120,
                        opacity: isAnimated ? 0.9 : 0,
                        transition: 'all 1s ease',
                        transitionDelay: `${index * 0.1 + 0.5}s`,
                        position: 'relative',
                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: -4,
                          right: -4,
                          bottom: 0,
                          background: `linear-gradient(to bottom, ${process.color}50 0%, transparent 100%)`,
                          filter: 'blur(6px)',
                          opacity: isAnimated ? 0.7 : 0,
                          transition: 'opacity 1.5s ease',
                          transitionDelay: `${index * 0.1 + 0.7}s`,
                        },
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: process.color,
                          boxShadow: `0 0 10px ${process.color}`,
                          opacity: isAnimated ? 1 : 0,
                          transition: 'opacity 1s ease',
                          transitionDelay: `${index * 0.1 + 0.6}s`,
                        }
                      }}
                    />
                  )}
                </TimelineSeparator>
                
                <TimelineContent sx={{ py: '12px', px: 2, textAlign: 'left', '& .MuiPaper-root': { textAlign: 'left' } }}>
                  <Paper
                    elevation={6}
                    onClick={() => setActiveStep(index === activeStep ? null : index)}
                    sx={{
                      p: 4,
                      borderRadius: '16px',
                      background: isDark 
                        ? `linear-gradient(145deg, #2a2a2a, #333333)` 
                        : `linear-gradient(145deg, #ffffff, #f8f8f8)`,
                      borderLeft: `6px solid ${process.color}`,
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      opacity: isAnimated ? 1 : 0,
                      transform: isAnimated ? 'translateY(0)' : 'translateY(50px)',
                      transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: `${index * 0.1 + 0.4}s`,
                      boxShadow: activeStep === index
                        ? `0 15px 30px rgba(0,0,0,0.2), 0 0 20px ${process.color}60, inset 0 0 15px rgba(255,255,255,0.05)`
                        : `0 8px 16px rgba(0,0,0,0.1), 0 0 5px ${process.color}30`,
                      '&:hover': {
                        boxShadow: `0 15px 30px rgba(0,0,0,0.15), 0 0 15px ${process.color}50, inset 0 0 10px rgba(255,255,255,0.05)`,
                        transform: 'translateY(-8px) scale(1.02)'
                      },
                      ...(activeStep === index && {
                        transform: 'translateY(-5px) scale(1.03)',
                      })
                    }}
                  >
                    {/* Enhanced glowing background effect */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: activeStep === index ? 0.15 : 0.08,
                        background: `
                          radial-gradient(circle at 10% 0%, ${process.color}80 0%, transparent 30%),
                          radial-gradient(circle at 90% 90%, ${process.color}50 0%, transparent 40%)
                        `,
                        zIndex: 0,
                        transition: 'all 0.5s ease',
                        ...(activeStep === index && {
                          animation: 'pulseGlow 3s infinite alternate',
                        }),
                        '@keyframes pulseGlow': {
                          '0%': { opacity: 0.1, transform: 'scale(1)' },
                          '100%': { opacity: 0.2, transform: 'scale(1.05)' }
                        }
                      }}
                    />
                    
                    {/* Decorative elements */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        border: `2px solid ${process.color}40`,
                        opacity: 0.6,
                        zIndex: 0,
                        transition: 'all 0.3s ease',
                        ...(activeStep === index && {
                          transform: 'scale(1.2)',
                        })
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 20,
                        right: 60,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: `${process.color}30`,
                        opacity: 0.4,
                        zIndex: 0
                      }}
                    />
                    
                    {isMobile && (
                      <Box sx={{ mb: 2 }}>
                        <Box 
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: `${process.color}20`,
                            color: process.color,
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: 1.5,
                            padding: '4px 12px',
                            borderRadius: '20px',
                            mb: 1,
                            border: `1px solid ${process.color}40`,
                            boxShadow: `0 2px 8px ${process.color}30`,
                          }}
                        >
                          STEP {index + 1}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontSize: '1.25rem',
                            color: process.color,
                            letterSpacing: '0.5px',
                            textShadow: `0 1px 2px ${process.color}30`,
                          }}
                        >
                          {process.label}
                        </Typography>
                      </Box>
                    )}

                    <Box 
                      sx={{
                        position: 'relative',
                        mb: 3,
                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -10,
                          left: 0,
                          width: activeStep === index ? '100%' : '50%',
                          height: 3,
                          borderRadius: 3,
                          background: `linear-gradient(90deg, ${process.color} 0%, ${process.color}30 80%, transparent 100%)`,
                          transition: 'width 0.5s ease-in-out',
                        }
                      }}
                    >
                      <Typography 
                        variant="h5" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: 800, 
                          position: 'relative', 
                          zIndex: 1,
                          background: `linear-gradient(135deg, ${process.color} 0%, ${process.color}90 100%)`,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          textShadow: '0px 1px 1px rgba(0,0,0,0.1)',
                          fontSize: { xs: '1.5rem', md: '1.75rem' },
                          letterSpacing: '0.5px',
                          transform: activeStep === index ? 'scale(1.05)' : 'scale(1)',
                          transition: 'transform 0.3s ease',
                          mb: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          '&:before': {
                            content: '""',
                            display: 'inline-block',
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: process.color,
                            marginRight: 1.5,
                            boxShadow: `0 0 8px ${process.color}`
                          }
                        }}
                      >
                        {process.title}
                      </Typography>
                    </Box>

                    <Box 
                      sx={{
                        position: 'relative',
                        mb: 3,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: `${process.color}08`,
                        border: `1px solid ${process.color}20`,
                        boxShadow: activeStep === index ? `inset 0 0 10px ${process.color}15` : 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Typography 
                        paragraph
                        sx={{
                          color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
                          fontSize: '1.05rem',
                          lineHeight: 1.8,
                          position: 'relative',
                          zIndex: 1,
                          fontWeight: 500,
                          letterSpacing: '0.2px',
                          textShadow: isDark ? '0px 1px 2px rgba(0,0,0,0.2)' : 'none',
                          transition: 'all 0.3s ease',
                          mb: 0,
                          ...(activeStep === index && {
                            transform: 'translateY(2px)'
                          })
                        }}
                      >
                        {process.description}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 4, position: 'relative', zIndex: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 700, 
                          mb: 2, 
                          color: process.color,
                          display: 'flex',
                          alignItems: 'center',
                          '&:after': {
                            content: '""',
                            display: 'block',
                            height: 2,
                            width: '30%',
                            ml: 2,
                            background: `linear-gradient(90deg, ${process.color} 0%, transparent 100%)`,
                            borderRadius: 2
                          }
                        }}
                      >
                        Key Deliverables
                      </Typography>
                      <Grid container spacing={1}>
                        {process.details.map((detail, idx) => (
                          <Grid item xs={12} key={idx}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                mb: 1.5,
                                opacity: activeStep === index ? 1 : 0.85,
                                transform: activeStep === index ? 'translateX(8px)' : 'translateX(0)',
                                transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.1}s`,
                                '&:hover': {
                                  transform: 'translateX(12px)',
                                  '& .detail-bullet': {
                                    transform: 'scale(1.2)',
                                    boxShadow: `0 0 12px ${process.color}90`
                                  },
                                  '& .detail-text': {
                                    fontWeight: 600,
                                    letterSpacing: '0.5px'
                                  }
                                },
                                position: 'relative',
                                pl: 1,
                                backgroundColor: activeStep === index ? `${process.color}10` : 'transparent',
                                borderRadius: 2,
                                p: 1,
                                border: activeStep === index ? `1px solid ${process.color}30` : 'none'
                              }}
                            >
                              {/* Enhanced bullet point with number */}
                              <Box
                                className="detail-bullet"
                                sx={{
                                  width: 24,
                                  height: 24,
                                  borderRadius: '50%',
                                  background: `linear-gradient(135deg, ${process.color} 0%, ${process.color}80 100%)`,
                                  mr: 2,
                                  mt: 0.5,
                                  boxShadow: `0 0 8px ${process.color}70`,
                                  transition: 'all 0.3s ease',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: '0.75rem',
                                  animation: activeStep === index ? 'pulse-bullet 2s infinite alternate' : 'none',
                                  '@keyframes pulse-bullet': {
                                    '0%': { transform: 'scale(1)', boxShadow: `0 0 5px ${process.color}60` },
                                    '100%': { transform: 'scale(1.1)', boxShadow: `0 0 12px ${process.color}90` }
                                  }
                                }}
                              >
                                {idx + 1}
                              </Box>
                              
                              <Box sx={{ flex: 1 }}>
                                <Typography 
                                  className="detail-text"
                                  variant="body1" 
                                  sx={{
                                    color: isDark ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.85)',
                                    fontWeight: activeStep === index ? 600 : 500,
                                    letterSpacing: '0.3px',
                                    textShadow: isDark ? '0px 1px 1px rgba(0,0,0,0.2)' : 'none',
                                    transition: 'all 0.3s ease',
                                    fontSize: '1rem',
                                    lineHeight: 1.5
                                  }}
                                >
                                  {detail}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>

                    {/* Enhanced Learn More Button */}
                    <Button
                      variant="contained"
                      size="medium"
                      endIcon={
                        <ArrowForwardIcon 
                          className="arrow-icon" 
                          sx={{ 
                            transition: 'transform 0.3s ease',
                            fontSize: '1.2rem' 
                          }} 
                        />
                      }
                      sx={{ 
                        mt: 4, 
                        mb: 1,
                        background: `linear-gradient(135deg, ${process.color} 0%, ${process.color}90 100%)`,
                        color: 'white',
                        position: 'relative',
                        zIndex: 1,
                        borderRadius: '30px',
                        padding: '8px 20px',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        textTransform: 'none',
                        boxShadow: `0 4px 15px ${process.color}40`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: `linear-gradient(135deg, ${process.color} 20%, ${process.color} 100%)`,
                          boxShadow: `0 6px 20px ${process.color}60`,
                          transform: 'translateY(-2px)',
                          '& .arrow-icon': {
                            transform: 'translateX(5px)'
                          }
                        },
                        '&:active': {
                          transform: 'translateY(1px)',
                          boxShadow: `0 2px 10px ${process.color}40`,
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            )
          })}
        </Timeline>

        {/* Mobile View Process Cards */}
        {isMobile && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h6" textAlign="center" gutterBottom>
              Tap on each step to learn more
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Process;
