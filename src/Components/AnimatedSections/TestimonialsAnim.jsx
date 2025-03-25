import React from "react";
import { Container, Box, Typography, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Testimonials data

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
    name: 'Annie Kat',
    position: 'Co Owner ,Flamingo Bay Tanning & Beauty',
    content: 'RTN Global has been available to assist 100% of the time, demonstrating patience and professionalism, even when I wasnt always available. They have understood everything I asked for and have gone above and beyond to help in every possible way. If you are looking for a professional agency that delivers top-notch service and responds to your questions promptly, RTN Global is the team you need to handle your projects efficiently. Thank you once again for all your help!',
    avatar: '/images/clients/client8.jpg',
    rating: 5,
    country: 'United Kingdom',
    verified: true,
  },
];

const TestimonialsAnim = () => {
  const theme = useTheme(); // Use the current theme
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Testimonial Card Component
  const TestimonialCard = ({ client, index }) => (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        p: 3,
        borderRadius: 2,
        mb: 2,
        boxShadow: "0 5px 20px rgba(0, 0, 0, 0.15)",
        transition: "transform 0.3s ease-out, box-shadow 0.3s ease, background-color 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
          bgcolor: theme.palette.background.alternate,
        },
        ...(isMobile ? {} : {
          position: "sticky",
          top: "16vh", // All cards stick at the same position
          zIndex: testimonials.length + index, // This creates the stacking effect
        }),
      }}
    >
      <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
        <Box
          component="img"
          src={client.avatar}
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            objectFit: "cover",
            border: `2px solid ${theme.palette.text.primary}`,
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography sx={{ fontWeight: 600, fontSize: "16px", color: theme.palette.text.primary }}>
              {client.name}
            </Typography>
            {client.verified && (
              <VerifiedIcon 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontSize: 18
                }} 
              />
            )}
          </Box>
          <Typography sx={{ color: theme.palette.text.secondary, fontSize: "14px" }}>
            {client.position}
          </Typography>
        </Box>
      </Box>
      
      {/* Location and Rating row */}
      <Box 
        display="flex" 
        justifyContent="space-between"
        alignItems="center" 
        sx={{ mb: 1.5 }}
      >
        {/* Location */}
        <Box display="flex" alignItems="center" gap={0.5}>
          <LocationOnIcon sx={{ color: theme.palette.text.secondary, fontSize: 16 }} />
          <Typography sx={{ color: theme.palette.text.secondary, fontSize: "13px" }}>
            {client.country}
          </Typography>
        </Box>
        
        {/* Rating stars */}
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography sx={{ fontWeight: 600, fontSize: "14px", color: theme.palette.text.primary }}>
            {client.rating}
          </Typography>
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              sx={{
                color: i < Math.floor(client.rating) ? "#FFB400" : theme.palette.text.secondary,
                fontSize: 18,
              }}
            />
          ))}
        </Box>
      </Box>
      
      {/* Testimonial content */}
      <Typography
        sx={{
          color: theme.palette.text.secondary,
          fontSize: "14px",
          lineHeight: 1.6,
          maxWidth: "95%",
        }}
      >
        {client.content}
      </Typography>
    </Box>
  );

  // Content for left side
  const LeftContent = () => (
    <Box sx={{ height: "fit-content", width: "100%", mt: 10, mb: 10 }}>
      <Box sx={{ mb: 10 }}>
        <Typography
          component="div"
          sx={{
            mb: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: theme.palette.text.primary,
            fontSize: "14px",
            fontWeight: 500,
            "&::before": {
              content: '"●"',
              color: theme.palette.primary.main,
            },
          }}
        >
          Happy Clients
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "36px", md: "48px" },
            fontWeight: 600,
            lineHeight: 1.2,
            mb: 1,
            color: theme.palette.text.primary,
          }}
        >
          Clients <span style={{ color: theme.palette.text.secondary }}>Love me</span>
        </Typography>

        <Typography sx={{ color: theme.palette.text.secondary, fontSize: "15px" }}>
          Trusted by 100+ happy clients.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={4}>
          <Box
            sx={{
              bgcolor: theme.palette.background.default,
              p: { xs: 1.5, md: 2.5 },
              borderRadius: 2,
            }}
          >
            <Typography sx={{ 
              fontSize: { xs: "24px", md: "32px" }, 
              fontWeight: 600, 
              mb: 0.5,
              color: theme.palette.text.primary 
            }}>
              100+
            </Typography>
            <Typography sx={{ color: theme.palette.text.secondary, fontSize: "14px" }}>
              Happy clients
            </Typography>
          </Box>
        </Grid>
       
        <Grid item xs={4}>
          <Box
            sx={{
              bgcolor: theme.palette.background.default,
              p: { xs: 1.5, md: 2.5 },
              borderRadius: 2,
            }}
          >
            <Typography sx={{ 
              fontSize: { xs: "24px", md: "32px" }, 
              fontWeight: 600, 
              mb: 0.5,
              color: theme.palette.text.primary 
            }}>
              4.9
            </Typography>
            <Typography sx={{ color: theme.palette.text.secondary, fontSize: "14px" }}>
              Average Rating
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box display="flex" gap={2} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button
          sx={{
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
            px: 3,
            py: 1.5,
            borderRadius: 1.5,
            textTransform: "none",
            fontSize: "14px",
            "&:hover": { bgcolor: theme.palette.background.paper },
          }}
        >
          See All Projects
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 1.5,
            textTransform: "none",
            fontSize: "14px",
          }}
        >
          Contact Now
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Layout */}
      {isMobile && (
        <Box sx={{ bgcolor: theme.palette.background.default, py: 8 }}>
          <Container maxWidth="xl">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <LeftContent />
              
              <Box>
                {testimonials.slice(0, 5).map((client, index) => (
                  <TestimonialCard key={index} client={client} index={index} />
                ))}
              </Box>
            </Box>
          </Container>
        </Box>
      )}

      {/* Desktop Layout - Modified for better stacking */}
      {!isMobile && (
        <Box sx={{ bgcolor: theme.palette.background.default, position: "relative", minHeight: "100vh" }}>
          <Container maxWidth="xl" sx={{ position: "relative" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 15,
                maxWidth: "1200px",
                mx: "auto",
              }}
            >
              {/* Left side - stays fixed */}
              <Box
                sx={{
                  flex: 1,
                  position: "sticky",
                  top: "10vh",
                  height: "fit-content",
                  maxWidth: "45%",
                }}
              >
                <LeftContent />
              </Box>
              
              {/* Right side - testimonials stack on scroll */}
              <Box
                sx={{
                  flex: 1,
                  py: 10,
                  mb: 2.5, // 20px margin at bottom
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                }}
              >
                {testimonials.map((client, index) => (
                  <TestimonialCard key={index} client={client} index={index} />
                ))}
                {/* Small spacer at the end to ensure proper margin */}
                <Box sx={{ height: "20px" }}></Box>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default TestimonialsAnim;
