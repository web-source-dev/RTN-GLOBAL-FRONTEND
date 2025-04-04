import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const teamMembers = [
  {
    id: 'john-smith',
    name: 'John Smith',
    role: 'Senior Developer',
    image: '/images/team/member1.jpg',
    bio: 'Experienced developer with a passion for creating innovative solutions.',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    role: 'UX Designer',
    image: '/images/team/member2.jpg',
    bio: 'Creative designer focused on delivering exceptional user experiences.',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 'michael-brown',
    name: 'Michael Brown',
    role: 'Project Manager',
    image: '/images/team/member3.jpg',
    bio: 'Seasoned project manager with a track record of successful deliveries.',
    linkedin: '#',
    twitter: '#',
  },
];

const TeamMembers = () => {
  return (
    <Box
      component="section"
      id="team-members"
      aria-labelledby="team-members-heading"
      sx={{
        py: 8,
        backgroundColor: 'background.default',
      }}
    >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h3"
          component="h2"
          id="team-members-heading"
          align="center"
          color="text.primary"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Meet Our Team
        </Typography>
        <Grid 
          container 
          spacing={4}
          role="list"
          aria-label="Team members"
        >
          {teamMembers.map((member) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={member.id}
              role="listitem"
            >
              <Card
                component="article"
                id={`member-${member.id}`}
                aria-labelledby={`member-name-${member.id}`}
                aria-describedby={`member-bio-${member.id}`}
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={member.image}
                  alt={`${member.name}, ${member.role} at RTN Global`}
                  loading="lazy"
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h3"
                    id={`member-name-${member.id}`}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    gutterBottom
                    id={`member-role-${member.id}`}
                  >
                    {member.role}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    id={`member-bio-${member.id}`}
                  >
                    {member.bio}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 2 }}
                  >
                    <IconButton
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      color="primary"
                      aria-label={`Visit ${member.name}'s LinkedIn profile`}
                    >
                      <LinkedInIcon aria-hidden="true" />
                    </IconButton>
                    <IconButton
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      color="primary"
                      aria-label={`Visit ${member.name}'s Twitter profile`}
                    >
                      <TwitterIcon aria-hidden="true" />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TeamMembers;