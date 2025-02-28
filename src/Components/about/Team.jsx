import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, Avatar, useTheme } from '@mui/material';

const Team = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Digital Marketing Director',
      bio: 'Over 10 years of experience in digital strategy and campaign management.',
      avatar: '/images/team/sarah.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'SEO Specialist',
      bio: 'Expert in technical SEO and content optimization strategies.',
      avatar: '/images/team/michael.jpg'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Social Media Manager',
      bio: 'Specializes in social media strategy and community engagement.',
      avatar: '/images/team/emily.jpg'
    },
    {
      name: 'David Kim',
      role: 'Content Strategist',
      bio: 'Creates compelling content strategies that drive engagement.',
      avatar: '/images/team/david.jpg'
    }
  ];
  return (
    <Box
      sx={{
        py: 8,
        position: 'relative',
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
        overflow: 'hidden'
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
          opacity: isDark ? 0.1 : 0.05,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 40%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 40%)`,
          zIndex: 1
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            fontWeight: 800,
            background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .member-avatar': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                <Avatar
                  className="member-avatar"
                  src={member.avatar}
                  alt={member.name}
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2,
                    bgcolor: 'primary.main',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    gutterBottom
                  >
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.bio}
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

export default Team;