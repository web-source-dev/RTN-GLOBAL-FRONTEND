import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  useTheme,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const positions = [
  {
    title: 'Senior Digital Marketing Strategist',
    department: 'Marketing',
    location: 'New York, NY',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Lead digital marketing strategies for enterprise clients.',
  },
  {
    title: 'Content Marketing Manager',
    department: 'Content',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Create and manage content marketing campaigns.',
  },
  {
    title: 'SEO Specialist',
    department: 'SEO',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    experience: '2+ years',
    description: 'Optimize client websites and improve search rankings.',
  },
];

const OpenPositions = () => {
  const theme = useTheme();

  return (
    <Box py={12}>
      <Container>
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
          Open Positions
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Join our team of digital marketing experts and help shape the future of online success
        </Typography>

        <Grid container spacing={4}>
          {positions.map((position, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {position.title}
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Chip
                      icon={<WorkIcon />}
                      label={position.department}
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <Chip
                      icon={<LocationOnIcon />}
                      label={position.location}
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={position.type}
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  <Typography color="text.secondary" paragraph>
                    {position.description}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Experience Required: {position.experience}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                    }}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default OpenPositions;