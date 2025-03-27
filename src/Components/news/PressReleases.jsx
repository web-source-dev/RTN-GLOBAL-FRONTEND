import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  useTheme,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GetAppIcon from '@mui/icons-material/GetApp';

const pressReleases = [
  {
    title: 'RTN Global Announces Record-Breaking Q4 2023 Results',
    summary: 'Company achieves unprecedented growth with 150% increase in revenue and expansion into new markets.',
    date: 'March 20, 2024',
    category: 'Financial Results',
    downloadUrl: '/press/q4-2023-results.pdf'
  },
  {
    title: 'Strategic Partnership with Leading Tech Companies Announced',
    summary: 'RTN Global forms strategic alliances with major technology providers to enhance digital marketing capabilities.',
    date: 'March 15, 2024',
    category: 'Partnership',
    downloadUrl: '/press/partnership-announcement.pdf'
  },
  {
    title: 'New AI-Powered Marketing Platform Launch',
    summary: 'Revolutionary platform leverages artificial intelligence to transform digital marketing automation and optimization.',
    date: 'March 10, 2024',
    category: 'Product Launch',
    downloadUrl: '/press/ai-platform-launch.pdf'
  },
  {
    title: 'RTN Global Expands Global Operations',
    summary: 'Company announces major expansion into Asia-Pacific region with new offices in Singapore and Tokyo.',
    date: 'March 5, 2024',
    category: 'Company News',
    downloadUrl: '/press/global-expansion.pdf'
  }
];

const PressReleases = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      py={12}
      sx={{
        background: theme.palette.background.default,
        position: 'relative',
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
          opacity: 0.2,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 10%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 10%)`,
          zIndex: 1
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
          Press Releases
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Official announcements and press releases from RTN Global
        </Typography>

        <Grid container spacing={4}>
          {pressReleases.map((release, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Chip
                      label={release.category}
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        fontWeight: 500
                      }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {release.date}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    {release.title}
                  </Typography>

                  <Typography color="text.secondary" paragraph sx={{ mb: 4 }}>
                    {release.summary}
                  </Typography>

                  <Button
                    variant="outlined"
                    startIcon={<GetAppIcon />}
                    href={release.downloadUrl}
                    target="_blank"
                    sx={{
                      borderRadius: 2,
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Download PDF
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

export default PressReleases;