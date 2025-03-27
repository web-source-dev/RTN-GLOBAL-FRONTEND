import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Rating, IconButton, useTheme } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VerifiedIcon from '@mui/icons-material/Verified';
import { keyframes } from '@mui/system';

const testimonials = [
  {
    name: 'Nahaz Quddus',
    position: 'BOD, Harmony 4All.',
    content: 'What a great experience with RTN Global again! We are so grateful for their exceptional work and willingness to go beyond the scope of the project to help us. We’re definitely coming back to RTN Global for future projects—highly recommended! 🙏💓🙏',
    avatar: '/images/clients/client1.png',
    rating: 5,
    country: 'United States',
    verified: true,
  },
  {
    name: 'Jean Pierre',
    position: 'Director, Youngers',
    content: 'Professional, creative, has a can do attitude and willingly goes the extra mile.',
    avatar: '/images/clients/client2.png',
    rating: 5,
    country: 'United Kingdom',
    verified: true,
  },
  {
    name: 'Raphael Mubake',
    position: 'Ceo ,Maid Sparkling Clean',
    content: 'Was very understanding and able to make the requested changes. I appreciate his efforts!',
    avatar: '/images/clients/client3.png',
    rating: 5,
    country: 'Australia',
    verified: true,
  },
  {
    name: 'Nabeel',
    position: 'Founder ,Handy Men Directory',
    content: 'I placed the order and went to sleep when I woke up I check my account and the order was delivered😃😃 that was really really quick delivery. Thank you so very much for the hard work. The quality was excellent . I will definitely come back for more.',
    avatar: '/images/clients/client4.png',
    rating: 5,
    country: 'United States',
    verified: true,
  },
  {
    name: 'Troy',
    position: 'Founder ,Troys Crib',
    content: 'I asked for a custom Wix website and after going through many other freelancers we finally found someone who could do the job and do it well. We supplied photographs, sketches, and a general idea of what we were looking for And he delivered Communication is fantastic and language fluency is excellent. you won’t be disappointed.',
    avatar: '/images/clients/client5.jpg',
    rating: 5,
    country: 'United States',
    verified: true,
  },
  {
    name: 'Ashley',
    position: 'Co Owner ,Precision impressions',
    content: 'RTN Global is an outstanding Agency who truly exceeded my expectations. His professionalism and code expertise transformed my site beyond what I imagined. Quick to respond and going above and beyond in every aspect, I’ve already recommended him to two others – HIGHLY recommend! 👏',
    avatar: '/images/clients/client6.jpg',
    rating: 5,
    country: 'United States',
    verified: true,
  },
  {
    name: 'Estevan Lujannc',
    position: 'Project Manager ,NMGA',
    content: 'RTN Global are wonderful professional to work with. He went above and beyond to address our needs and did it quickly. I would highly recommend them to anyone looking to navigate tough projects.',
    avatar: '/images/clients/client7.jpg',
    rating: 5,
    country: 'United States',
    verified: true,
  },
  {
    name: 'Annie Kat',
    position: 'Co Owner ,Flamingo Bay Tanning & Beauty',
    content: 'RTN Global has been available to assist 100% of the time, demonstrating patience and professionalism, even when I wasnt always available. They have understood everything I asked for and have gone above and beyond to help in every possible way. If you are looking for a professional agency that delivers top-notch service and responds to your questions promptly, RTN Global is the team you need to handle your projects efficiently. Thank you once again for all your help!',
    avatar: '/images/clients/client8.jpg',
    rating: 5,
    country: 'United Kingdom',
    verified: true,
  },
];

const slideAnimation = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const Testimonials = () => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    if (sliderRef.current) {
      const scrollWidth = sliderRef.current.scrollWidth;
      const animationDuration = scrollWidth * 0.01; // Adjust speed based on content width
      sliderRef.current.style.animationDuration = `${animationDuration}s`;
    }
  }, []);

  return (
    <Box 
      py={12} 
      sx={{ 
        bgcolor: 'background.default',
        background: theme.palette.background.default,
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

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
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
          ref={sliderRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{ 
            display: 'flex',
            gap: 4,
            animation: `${slideAnimation} 30s linear infinite`,
            animationPlayState: isHovered ? 'paused' : 'running',
            '&:hover': {
              cursor: 'grab',
            },
            width: 'fit-content',
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <Card
              key={index}
              sx={{
                width: 550,
                height: 'auto',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                },
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
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
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
