import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

const benefits = [
  {
    title: 'Competitive Salary',
    description: 'We offer industry-leading compensation packages to attract and retain top talent.'
  },
  {
    title: 'Professional Growth',
    description: 'Continuous learning opportunities and clear career advancement paths.'
  },
  {
    title: 'Work-Life Balance',
    description: 'Flexible working hours and remote work options to support your lifestyle.'
  },
  {
    title: 'Great Benefits',
    description: 'Comprehensive health insurance, retirement plans, and other attractive perks.'
  }
];

const JoinTeam = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="xl">
        <Typography
          component="h2"
          variant="h3"
          color="text.primary"
          align="center"
          sx={{ mb: 2, fontWeight: 700 }}
        >
          Join Our Team
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          align="center"
          sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
        >
          Be part of a dynamic team that's shaping the future of digital marketing.
          We're always looking for talented individuals to join our mission.
        </Typography>

        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    color="primary"
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<WorkIcon />}
            sx={{ borderRadius: 2 }}
          >
            View Open Positions
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default JoinTeam;