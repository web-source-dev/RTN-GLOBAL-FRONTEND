import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from '@mui/material';
import DiversityIcon from '@mui/icons-material/Diversity3';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';

const values = [
  {
    title: 'Innovation First',
    description: 'We embrace new ideas and technologies to stay ahead in digital marketing',
    icon: EmojiObjectsIcon,
    color: '#2196f3',
  },
  {
    title: 'Collaboration',
    description: 'Working together to achieve exceptional results for our clients',
    icon: GroupsIcon,
    color: '#4caf50',
  },
  {
    title: 'Diversity & Inclusion',
    description: 'Celebrating different perspectives and creating an inclusive environment',
    icon: DiversityIcon,
    color: '#ff9800',
  },
  {
    title: 'Growth Mindset',
    description: 'Continuous learning and development opportunities for all team members',
    icon: PsychologyIcon,
    color: '#e91e63',
  },
  {
    title: 'Client Success',
    description: 'Dedicated to delivering outstanding results for our clients',
    icon: HandshakeIcon,
    color: '#9c27b0',
  },
  {
    title: 'Excellence',
    description: 'Striving for excellence in everything we do',
    icon: StarIcon,
    color: '#00bcd4',
  },
];

const Culture = () => {
  const theme = useTheme();

  return (
    <Box
      py={12}
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: theme.palette.mode === 'dark' ? 0.1 : 0.05,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 40%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 40%)`,
          zIndex: 1,
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          textAlign="center"
          sx={{
            fontWeight: 800,
            mb: 3,
            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Our Culture
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Join a team that values innovation, collaboration, and personal growth
        </Typography>

        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .value-icon': {
                      transform: 'scale(1.1)',
                    },
                  },
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle at top right, ${value.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%',
                  }}
                />
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <IconButton
                    className="value-icon"
                    sx={{
                      mb: 2,
                      bgcolor: `${value.color}15`,
                      color: value.color,
                      transition: 'transform 0.3s ease',
                      '&:hover': { bgcolor: `${value.color}25` },
                    }}
                    size="large"
                  >
                    <value.icon fontSize="large" />
                  </IconButton>
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {value.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Culture;