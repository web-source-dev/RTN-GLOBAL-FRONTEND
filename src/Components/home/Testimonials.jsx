import React from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Rating, IconButton, useTheme } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VerifiedIcon from '@mui/icons-material/Verified';

const testimonials = [
  {
    name: 'John Smith',
    position: 'CEO, TechStart Inc.',
    content: 'The ROI we\'ve seen since working with this team has been remarkable. Our online presence has never been stronger. They took the time to understand our business and delivered a strategy that perfectly aligned with our goals.',
    avatar: '/images/avatars/avatar1.jpg',
    rating: 5,
    country: 'United States',
    projectValue: '$5,000+',
    verified: true,
  },
  {
    name: 'Sarah Johnson',
    position: 'Marketing Director, Growth Co',
    content: 'Their strategic approach to digital marketing has transformed our business. We\'ve seen a 200% increase in leads and our social media engagement has skyrocketed. The team is responsive, professional, and always delivers results.',
    avatar: '/images/avatars/avatar2.jpg',
    rating: 5,
    country: 'Canada',
    projectValue: '$10,000+',
    verified: true,
  },
  {
    name: 'Michael Brown',
    position: 'Founder, StartUp Inc',
    content: 'Professional, responsive, and results-driven. They\'ve helped us establish a strong digital presence from scratch. Their content strategy has positioned us as thought leaders in our industry. Highly recommended!',
    avatar: '/images/avatars/avatar3.jpg',
    rating: 5,
    country: 'United Kingdom',
    projectValue: '$7,500+',
    verified: true,
  },
  {
    name: 'Emily Chen',
    position: 'E-commerce Manager',
    content: 'Outstanding service and exceptional results! Their PPC campaigns have generated a 300% ROI for our e-commerce business. The team is knowledgeable, creative, and always available when we need them.',
    avatar: '/images/avatars/avatar4.jpg',
    rating: 5,
    country: 'Australia',
    projectValue: '$15,000+',
    verified: true,
  },
];

const Testimonials = () => {
  const theme = useTheme();

  return (
    <Box 
      py={12} 
      sx={{ 
        bgcolor: 'background.default',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(to bottom, #1a1a1a, #2d2d2d)'
          : 'linear-gradient(to bottom, #f5f5f5, #ffffff)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 40%),
                      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.main} 0%, transparent 40%)`,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box textAlign="center" mb={8}>
          <Typography
            component="span"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              display: 'block',
              mb: 2,
            }}
          >
            Success Stories
          </Typography>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            What Our Clients Say
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            Real stories from real clients who have transformed their digital presence with our expertise
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(2, 1fr)',
            },
            gap: 4,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(145deg, rgba(40,40,40,0.9), rgba(30,30,30,0.9))'
                  : 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,245,245,0.9))',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 8px 24px rgba(0,0,0,0.4)'
                    : '0 8px 24px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* Quote Icon */}
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    color: 'primary.main',
                    opacity: 0.2,
                  }}
                >
                  <FormatQuoteIcon fontSize="large" />
                </IconButton>

                {/* Client Info */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    src={testimonial.avatar}
                    sx={{
                      width: 80,
                      height: 80,
                      mr: 2,
                      border: '3px solid',
                      borderColor: 'primary.main',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="h6" component="span" sx={{ mr: 1 }}>
                        {testimonial.name}
                      </Typography>
                      {testimonial.verified && (
                        <VerifiedIcon
                          sx={{
                            color: 'primary.main',
                            fontSize: 20,
                          }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {testimonial.position}
                    </Typography>
                    <Rating value={testimonial.rating} readOnly size="small" />
                  </Box>
                </Box>

                {/* Testimonial Content */}
                <Typography
                  paragraph
                  sx={{
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    mb: 3,
                    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'text.primary',
                  }}
                >
                  "{testimonial.content}"
                </Typography>

                {/* Project Details */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    mt: 3,
                    pt: 3,
                    borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  }}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: '20px',
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      fontSize: '0.875rem',
                    }}
                  >
                    {testimonial.projectValue}
                  </Box>
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: '20px',
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      fontSize: '0.875rem',
                    }}
                  >
                    {testimonial.country}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
