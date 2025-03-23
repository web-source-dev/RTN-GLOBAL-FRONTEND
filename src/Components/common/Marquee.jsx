import { Box, Typography, keyframes } from "@mui/material";

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Marquee = () => {
  const content = "RTN Global Agency | Web Development | SEO | Digital Marketing | Branding";

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        background: (theme) => `linear-gradient(90deg, ${theme.palette.background.alternate} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.background.alternate} 100%)`,
        py: 2.5,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: `${scroll} 15s linear infinite`,
          '&:hover': {
            animationPlayState: 'paused',
          },
        }}
      >
        {[...Array(6)].map((_, index) => (
          <Typography
            key={index}
            variant="h3"
            sx={{
              color: 'text.primary',
              fontWeight: 900,
              px: 10,
              letterSpacing: '0.05em',
              flex: '0 0 auto',
              transition: 'all 0.4s ease',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                color: 'secondary.main',
                transform: 'scale(1.05)',
              },
            }}
          >
            {content}
          </Typography>
        ))}
        {[...Array(6)].map((_, index) => (
          <Typography
            key={`duplicate-${index}`}
            variant="h3"
            sx={{
              color: 'text.primary',
              fontWeight: 900,
              px: 10,
              letterSpacing: '0.05em',
              flex: '0 0 auto',
              transition: 'all 0.4s ease',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                color: 'secondary.main',
                transform: 'scale(1.05)',
              },
            }}
          >
            {content}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Marquee;
