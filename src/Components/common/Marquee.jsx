import { Box, Typography, keyframes, IconButton, useTheme, Slider, Tooltip } from "@mui/material";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SpeedIcon from '@mui/icons-material/Speed';
import { useState, useEffect } from 'react';

// Modified scroll animation for truly continuous movement
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50%)); }
`;

// Pulse animation for visual interest
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const Marquee = ({ initialSpeed = 20 }) => {
  const theme = useTheme();
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);
  const [showControls, setShowControls] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Enhanced services with more details for potential tooltips
  const services = [
    { text: "RTN Global Agency", icon: "✨", color: theme.palette.primary.light },
    { text: "Web Development", icon: "🌐", color: theme.palette.secondary.light },
    { text: "App Development", icon: "📱", color: theme.palette.primary.light },
    { text: "SEO Optimization", icon: "🔍", color: theme.palette.success.light },
    { text: "Digital Marketing", icon: "📱", color: theme.palette.info.light },
    { text: "Brand Strategy", icon: "🎯", color: theme.palette.warning.light },
    { text: "UI/UX Design", icon: "🎨", color: theme.palette.error.light },
    { text: "E-Commerce Solutions", icon: "🛒", color: theme.palette.secondary.dark }
  ];

  // Reset active index when mouse leaves the component
  useEffect(() => {
    if (!showControls) {
      setActiveIndex(-1);
    }
  }, [showControls]);

  return (
    <Box
      component="section"
      aria-label="Services Marquee"
      sx={{
        width: '100%',
        overflow: 'hidden',
        background: (theme) => `linear-gradient(135deg, 
          ${theme.palette.primary.dark} 0%, 
          ${theme.palette.primary.dark} 100%)`,
        py: { xs: 2.5, md: 3.5 },
        position: 'relative',
        borderTop: `2px solid ${theme.palette.primary.light}`,
        borderBottom: `2px solid ${theme.palette.primary.light}`,
      }}
    >
      {/* Main marquee content with continuous motion */}
      <Box
        className="marquee-container"
        aria-label="Rotating services list"
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          className="marquee-content"
          sx={{
            display: 'flex',
            whiteSpace: 'nowrap',
            animation: isPaused
              ? 'none'
              : `${scroll} ${speed}s linear infinite`,
            position: 'relative',
            zIndex: 1,
            // This ensures we have enough content for continuous scrolling
            width: 'fit-content',
          }}
        >
          {/* We render the services twice to ensure continuous scrolling */}
          {[...Array(2)].map((_, groupIndex) => (
            <Box
              key={`group-${groupIndex}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {services.map((service, index) => (
              
                  <Box
                    role="button"
                    tabIndex={groupIndex === 0 ? 0 : -1} // Only make the first set of items focusable
                    aria-label={`${service.text} service`}
                    aria-pressed={activeIndex === index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mx: { xs: 2, md: 4 },
                      position: 'relative',
                      padding: '0.7rem 1.5rem',
                      borderRadius: '40px',
                      background: activeIndex === index
                        ? `linear-gradient(135deg, ${service.color}80, ${service.color}50)`
                        : 'rgba(255, 255, 255, 0.13)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <Typography
                      variant="span"
                      aria-hidden="true" // Icon is decorative
                      sx={{
                        fontSize: { xs: '1.7rem', md: '2.2rem' },
                        mr: 1.5,
                        animation: `${pulse} 2s ease infinite`,
                        animationDelay: `${index * 0.2}s`,
                        filter: activeIndex === index ? 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' : 'none',
                        transform: activeIndex === index ? 'scale(1.2)' : 'scale(1)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {service.icon}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        color: activeIndex === index ? 'white' : 'rgba(255,255,255,0.85)',
                        fontWeight: 800,
                        letterSpacing: '0.05em',
                        fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.6rem' },
                        transition: 'all 0.3s ease',
                        position: 'relative',
                      }}
                    >
                      {service.text}
                    </Typography>
                  </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Marquee;
