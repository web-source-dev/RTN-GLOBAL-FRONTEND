import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  useTheme,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const leaders = [
  {
    id: 'john-smith',
    name: 'John Smith',
    position: 'Chief Executive Officer',
    image: '/images/team/leader1.jpg',
    bio: 'Over 15 years of experience in digital marketing and business strategy.',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    position: 'Chief Marketing Officer',
    image: '/images/team/leader2.jpg',
    bio: 'Digital marketing pioneer with expertise in growth strategies.',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    position: 'Chief Technology Officer',
    image: '/images/team/leader3.jpg',
    bio: 'Tech innovator with a passion for digital transformation.',
    linkedin: '#',
    twitter: '#',
  },
];

const Leadership = () => {
  const theme = useTheme();

  return (
    <Box 
      component="section"
      id="leadership-team"
      aria-labelledby="leadership-heading"
      py={12} 
      sx={{ 
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)'
      }}
    >
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            component="h2"
            id="leadership-heading"
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
            Our Leadership Team
          </Typography>
          <Typography
            variant="h5"
            component="p"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            Meet the visionaries driving our success and innovation
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={4}
          role="list"
          aria-label="Leadership team members"
        >
          {leaders.map((leader) => (
            <Grid 
              item 
              xs={12} 
              md={4} 
              key={leader.id}
              role="listitem"
            >
              <Card
                component="article"
                id={`leader-${leader.id}`}
                aria-labelledby={`leader-name-${leader.id}`}
                aria-describedby={`leader-bio-${leader.id}`}
                sx={{
                  height: '100%',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(145deg, rgba(40,40,40,0.9), rgba(30,30,30,0.9))'
                    : 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,245,245,0.9))',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Avatar
                    src={leader.image}
                    alt={`${leader.name}, ${leader.position}`}
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      border: '4px solid',
                      borderColor: 'primary.main',
                    }}
                  />
                  <Typography 
                    variant="h5" 
                    component="h3"
                    id={`leader-name-${leader.id}`}
                    gutterBottom 
                    fontWeight="bold"
                  >
                    {leader.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: 500 }}
                    id={`leader-position-${leader.id}`}
                  >
                    {leader.position}
                  </Typography>
                  <Typography 
                    color="text.secondary" 
                    paragraph
                    id={`leader-bio-${leader.id}`}
                  >
                    {leader.bio}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <IconButton
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener"
                      aria-label={`Visit ${leader.name}'s LinkedIn profile`}
                      sx={{ color: 'primary.main', mr: 1 }}
                    >
                      <LinkedInIcon aria-hidden="true" />
                    </IconButton>
                    <IconButton
                      href={leader.twitter}
                      target="_blank"
                      rel="noopener"
                      aria-label={`Visit ${leader.name}'s Twitter profile`}
                      sx={{ color: 'primary.main' }}
                    >
                      <TwitterIcon aria-hidden="true" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Leadership;