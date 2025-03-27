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
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

const faqs = [
  {
    category: 'Web Development Services',
    questions: [
      {
        question: 'What web development services does RTN Global offer?',
        answer: 'We specialize in three core areas: Professional Wix website development, full-stack MERN (MongoDB, Express.js, React, Node.js) applications, and React Native mobile app development. Our services cover everything from initial design to deployment and maintenance.'
      },
      {
        question: 'Why should I choose RTN Global for my web development needs?',
        answer: 'With over 10 years of experience, we offer expertise in modern web technologies, a proven track record of successful projects, and a client-centric approach. Our solutions are scalable, performant, and tailored to your specific business needs.'
      },
      {
        question: 'How long does it typically take to complete a web development project?',
        answer: 'Project timelines vary based on complexity and requirements. Typically, Wix websites take 2-4 weeks, MERN stack applications 6-12 weeks, and React Native mobile apps 8-16 weeks. We provide detailed timelines during the initial consultation.'
      }
    ]
  },
  {
    category: 'Technical Expertise',
    questions: [
      {
        question: 'What makes your Wix development services stand out?',
        answer: 'We are certified Wix Partners with extensive experience in custom Wix development. We leverage Wix Velo for advanced functionality, create custom animations, and implement complex business logic while maintaining the ease of use of the Wix platform.'
      },
      {
        question: 'Can you handle complex MERN stack applications?',
        answer: 'Absolutely! We excel in building sophisticated MERN applications with features like real-time data processing, complex authentication systems, API integrations, and high-performance database operations. Our team ensures scalability and security at every step.'
      },
      {
        question: 'Do you provide cross-platform mobile app development?',
        answer: 'Yes, using React Native, we develop high-performance mobile apps that work seamlessly on both iOS and Android platforms. Our apps feature native-like performance, offline capabilities, and can integrate with various device features and APIs.'
      }
    ]
  },
  {
    category: 'Project Management & Support',
    questions: [
      {
        question: 'What is your development process like?',
        answer: 'We follow an agile development methodology with regular client communications and iterative development cycles. This includes requirements gathering, design approval, development sprints, testing, and deployment, ensuring transparency throughout the project.'
      },
      {
        question: 'Do you provide post-launch support and maintenance?',
        answer: 'Yes, we offer comprehensive post-launch support packages including regular updates, security patches, performance monitoring, and technical support. We also provide training for your team to manage the platform effectively.'
      },
      {
        question: 'What are your payment terms and project costs?',
        answer: 'We offer flexible payment plans with clear milestones. Project costs are determined based on scope, complexity, and timeline. We provide detailed quotes after initial consultation and requirements gathering, with no hidden fees.'
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
        background: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
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

      <Container 
        sx={{ 
          position: 'relative', 
          zIndex: 2,
          height: '100%',
        }}
      >
        <Grid container spacing={4}>
          {/* Left side - Search */}
          <Grid 
            item 
            xs={12} 
            md={6} 
          >
            <Box sx={{ 
              width: '100%', 
              mb: { xs: 4, md: 0 },
              position: 'sticky',
              top: '10vh',
              paddingRight: 2,
              paddingBottom: 2,
              zIndex: 10,
              maxHeight: 'calc(90vh - 32px)',
              overflowY: 'auto',
            }}>
              <Typography
                variant="h2"
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
                sx={{ maxWidth: '800px', mx: 'auto', mb: 3 }}
              >
                Find answers to common questions about our digital marketing tools
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.primary.main }}>
                Search Questions
              </Typography>
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
              {searchTerm && (
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                  {filteredFaqs.reduce((total, category) => total + category.questions.length, 0)} results found
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Right side - FAQ content - make this deliberately longer */}
          <Grid item xs={12} md={6}>
            <Box>
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQ;