import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CampaignIcon from '@mui/icons-material/Campaign';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShareIcon from '@mui/icons-material/Share';
import LaunchIcon from '@mui/icons-material/Launch';

const tools = [
  {
    title: 'Analytics Dashboard',
    description: 'Comprehensive analytics platform for tracking marketing performance',
    icon: AnalyticsIcon,
    color: '#2196f3',
    features: ['Real-time tracking', 'Custom reports', 'Data visualization'],
    category: 'Analytics'
  },
  {
    title: 'Campaign Manager',
    description: 'All-in-one campaign management and optimization tool',
    icon: CampaignIcon,
    color: '#4caf50',
    features: ['Multi-channel campaigns', 'A/B testing', 'Performance tracking'],
    category: 'Marketing'
  },
  {
    title: 'SEO Optimizer',
    description: 'Advanced SEO tools for improving search rankings',
    icon: SearchIcon,
    color: '#ff9800',
    features: ['Keyword research', 'Site audit', 'Competitor analysis'],
    category: 'SEO'
  },
  {
    title: 'Email Automation',
    description: 'Powerful email marketing automation platform',
    icon: EmailIcon,
    color: '#e91e63',
    features: ['Drip campaigns', 'Personalization', 'Analytics'],
    category: 'Email'
  },
  {
    title: 'ROI Calculator',
    description: 'Calculate and forecast marketing ROI across channels',
    icon: TrendingUpIcon,
    color: '#9c27b0',
    features: ['Multi-channel tracking', 'Forecasting', 'Budget planning'],
    category: 'Analytics'
  },
  {
    title: 'Social Media Suite',
    description: 'Complete social media management and analytics platform',
    icon: ShareIcon,
    color: '#00bcd4',
    features: ['Content scheduling', 'Engagement tracking', 'Analytics'],
    category: 'Social'
  }
];

const ToolsGrid = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      py={12}
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
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
          opacity: isDark ? 0.1 : 0.05,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 40%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 40%)`,
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
          Digital Marketing Tools
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Powerful tools designed to supercharge your digital marketing efforts
        </Typography>

        <Grid container spacing={4}>
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    '& .tool-icon': {
                      transform: 'scale(1.1)'
                    }
                  },
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle at top right, ${tool.color}15, transparent 70%)`,
                    borderRadius: '0 0 0 100%'
                  }}
                />
                <CardContent sx={{ p: 4 }}>
                  <IconButton
                    className="tool-icon"
                    sx={{
                      mb: 2,
                      bgcolor: `${tool.color}15`,
                      color: tool.color,
                      transition: 'transform 0.3s ease',
                      '&:hover': { bgcolor: `${tool.color}25` }
                    }}
                    size="large"
                  >
                    <tool.icon fontSize="large" />
                  </IconButton>

                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 2,
                      py: 0.5,
                      bgcolor: `${tool.color}15`,
                      color: tool.color,
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      mb: 2
                    }}
                  >
                    {tool.category}
                  </Box>

                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {tool.title}
                  </Typography>

                  <Typography color="text.secondary" paragraph>
                    {tool.description}
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    {tool.features.map((feature, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                          '&:before': {
                            content: '""',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: tool.color,
                            mr: 1.5
                          }
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    variant="outlined"
                    endIcon={<LaunchIcon />}
                    fullWidth
                    sx={{
                      mt: 3,
                      borderRadius: 2,
                      borderColor: tool.color,
                      color: tool.color,
                      '&:hover': {
                        borderColor: tool.color,
                        bgcolor: `${tool.color}10`
                      }
                    }}
                  >
                    Learn More
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

export default ToolsGrid;