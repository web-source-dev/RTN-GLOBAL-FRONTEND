import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';

const culturePoints = [
  {
    title: 'Innovation First',
    description: 'We embrace new technologies and creative solutions to drive digital marketing forward.'
  },
  {
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and open communication to achieve exceptional results.'
  },
  {
    title: 'Client Success',
    description: 'Our team is dedicated to delivering measurable results and exceeding client expectations.'
  },
  {
    title: 'Continuous Learning',
    description: 'We invest in our team growth through ongoing training and professional development.'
  }
];

const Culture = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="xl">
        <Typography
          component="h2"
          variant="h3"
          color="text.primary"
          align="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Our Culture
        </Typography>
        <Grid container spacing={4}>
          {culturePoints.map((point, index) => (
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
                    {point.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {point.description}
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