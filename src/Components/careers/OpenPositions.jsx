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
    slug: 'senior-digital-marketing-strategist'
  },
  {
    title: 'Content Marketing Manager',
    department: 'Content',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Create and manage content marketing campaigns.',
    slug: 'content-marketing-manager'
  },
  {
    title: 'SEO Specialist',
    department: 'SEO',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    experience: '2+ years',
    description: 'Optimize client websites and improve search rankings.',
    slug: 'seo-specialist'
  },
];

const OpenPositions = () => {
  const theme = useTheme();

  return (
    <Box 
      component="section"
      id="open-positions"
      aria-labelledby="open-positions-heading"
      py={12} 
      sx={{ 
        background: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 10%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 10%)`,
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          id="open-positions-heading"
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
          component="p"
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
                component="article"
                itemScope
                itemType="https://schema.org/JobPosting"
                sx={{
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <meta itemProp="datePosted" content={new Date().toISOString()} />
                  <meta itemProp="employmentType" content="FULL_TIME" />
                  <meta itemProp="hiringOrganization" content="RTN Global" />

                  <Typography 
                    variant="h5" 
                    component="h3"
                    itemProp="title"
                    gutterBottom 
                    fontWeight="bold"
                  >
                    {position.title}
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Chip
                      icon={<WorkIcon />}
                      label={position.department}
                      itemProp="occupationalCategory"
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <Chip
                      icon={<LocationOnIcon />}
                      label={position.location}
                      itemProp="jobLocation"
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={position.type}
                      sx={{ mb: 1 }}
                      aria-label={`Job type: ${position.type}`}
                    />
                  </Box>
                  <Typography 
                    color="text.secondary" 
                    paragraph
                    component="p"
                    itemProp="description"
                  >
                    {position.description}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="p"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    <span itemProp="qualifications">Experience Required: {position.experience}</span>
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    href={`/careers/apply/${position.slug}`}
                    aria-label={`Apply for ${position.title} position`}
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