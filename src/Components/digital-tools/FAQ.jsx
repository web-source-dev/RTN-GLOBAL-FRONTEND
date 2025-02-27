import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        question: 'What is RTN Global digital marketing platform?',
        answer: 'Our platform is a comprehensive suite of digital marketing tools designed to help businesses grow their online presence, manage campaigns, and track performance across multiple channels.'
      },
      {
        question: 'How do I get started with the tools?',
        answer: 'Getting started is easy! Simply choose a plan that fits your needs, create an account, and our onboarding team will guide you through the setup process.'
      },
      {
        question: 'Do you offer training and support?',
        answer: 'Yes, we provide comprehensive training resources, documentation, and dedicated support to help you make the most of our tools.'
      }
    ]
  },
  {
    category: 'Features',
    questions: [
      {
        question: 'What analytics features are included?',
        answer: 'Our analytics suite includes real-time tracking, custom dashboards, automated reporting, conversion tracking, and detailed audience insights.'
      },
      {
        question: 'Can I integrate with other tools?',
        answer: 'Yes, our platform offers extensive integration capabilities with popular CRM systems, analytics tools, and marketing platforms.'
      },
      {
        question: 'Is there a limit to the number of campaigns?',
        answer: 'Campaign limits vary by plan. Professional and Enterprise plans offer unlimited campaigns.'
      }
    ]
  },
  {
    category: 'Pricing',
    questions: [
      {
        question: 'Do you offer a free trial?',
        answer: 'Yes, we offer a 14-day free trial on all our plans so you can test our tools before committing.'
      },
      {
        question: 'Can I upgrade or downgrade my plan?',
        answer: 'Yes, you can change your plan at any time. Changes take effect at the start of your next billing cycle.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and offer invoice payment options for enterprise customers.'
      }
    ]
  }
];

const FAQ = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
        >
          Find answers to common questions about our digital marketing tools
        </Typography>

        <Box sx={{ maxWidth: 600, mx: 'auto', mb: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: {
                bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                borderRadius: 2,
              }
            }}
          />
        </Box>

        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {filteredFaqs.map((category, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  mb: 2
                }}
              >
                {category.category}
              </Typography>

              {category.questions.map((faq, idx) => (
                <Accordion
                  key={idx}
                  sx={{
                    mb: 1,
                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'white',
                    '&:before': { display: 'none' },
                    boxShadow: 'none',
                    border: 1,
                    borderColor: 'divider',
                    '&:hover': {
                      bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.02)'
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      '& .MuiAccordionSummary-content': {
                        fontWeight: 500
                      }
                    }}
                  >
                    {faq.question}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;