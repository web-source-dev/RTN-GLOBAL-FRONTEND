import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const popularQuestions = [
  {
    question: 'How can I track my marketing campaign performance?',
    answer: 'Our platform provides real-time analytics dashboard where you can monitor key metrics, ROI, and campaign performance across all channels. You can access detailed reports and set up custom alerts for important metrics.',
    category: 'Analytics',
    views: 2500,
    id: 'track-marketing-performance'
  },
  {
    question: 'What integrations are available with your platform?',
    answer: 'We offer integrations with major CRM systems, social media platforms, analytics tools, and marketing automation software. This includes Salesforce, HubSpot, Google Analytics, Facebook Ads, and many more.',
    category: 'Integrations',
    views: 2100,
    id: 'available-integrations'
  },
  {
    question: 'How do I set up automated email campaigns?',
    answer: 'You can create automated email campaigns through our Email Marketing tool. Simply define your audience, create your email content, set trigger conditions, and schedule your campaign. We also provide templates and A/B testing features.',
    category: 'Email Marketing',
    views: 1800,
    id: 'setup-email-campaigns'
  },
  {
    question: 'What security measures are in place to protect my data?',
    answer: 'We implement industry-leading security measures including end-to-end encryption, regular security audits, and compliance with GDPR and other privacy regulations. Your data is stored in secure, redundant servers with 24/7 monitoring.',
    category: 'Security',
    views: 1500,
    id: 'security-measures'
  },
  {
    question: 'Can I upgrade or downgrade my subscription plan?',
    answer: 'Yes, you can change your subscription plan at any time. Changes take effect at the start of your next billing cycle. When upgrading, you will get immediate access to new features, and when downgrading, you will retain access until the current period ends.',
    category: 'Billing',
    views: 1200,
    id: 'change-subscription'
  }
];

const PopularQuestions = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      component="section"
      id="popular-questions"
      aria-labelledby="popular-questions-heading"
      py={8}
      sx={{
        background: theme.palette.background.default,
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
          opacity: 0.2,
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
          id="popular-questions-heading"
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
          Popular Questions
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Quick answers to our most frequently asked questions
        </Typography>

        <Card
          component="div"
          role="region"
          aria-label="Frequently asked questions accordion"
          sx={{
            maxWidth: 800,
            mx: 'auto',
            background: isDark
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <CardContent>
            {popularQuestions.map((item, index) => (
              <Accordion
                key={index}
                id={item.id}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  background: 'transparent',
                  '&:before': { display: 'none' },
                  boxShadow: 'none',
                  '&:not(:last-child)': {
                    borderBottom: 1,
                    borderColor: 'divider',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${item.id}-content`}
                  id={`${item.id}-header`}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 2,
                    },
                  }}
                >
                  <Typography 
                    component="h3" 
                    sx={{ fontWeight: 500, flex: 1 }}
                  >
                    {item.question}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip
                      label={item.category}
                      size="small"
                      aria-label={`Category: ${item.category}`}
                      sx={{
                        bgcolor: theme.palette.primary.main + '15',
                        color: theme.palette.primary.main,
                      }}
                    />
                    <Box
                      component="span"
                      aria-label={`${item.views.toLocaleString()} views`}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                      }}
                    >
                      <TrendingUpIcon fontSize="small" aria-hidden="true" />
                      {item.views.toLocaleString()}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails id={`${item.id}-content`}>
                  <Typography 
                    component="p"
                    color="text.secondary" 
                    sx={{ pl: 0 }}
                  >
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default PopularQuestions;