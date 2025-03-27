import React from 'react';
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardMedia,
  CardContent,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  BusinessCenter as StrategyIcon, 
  Search as SeoIcon, 
  Article as ContentIcon, 
  People as SocialMediaIcon, 
  MonetizationOn as PPCIcon, 
  Email as EmailIcon, 
  Language as WebIcon, 
  Storage as MernIcon, 
  Smartphone as ReactNativeIcon 
} from '@mui/icons-material';
const services = [
  {
    id: 1,
    title: 'Digital Strategy',
    description: 'Crafting effective strategies for digital success',
    icon: StrategyIcon,
    subServices: ['Brand Positioning', 'Market Research', 'User Experience Strategy', 'Growth Planning'],
    path: '/services/digital-strategy'
  },
  {
    id: 2,
    title: 'SEO Optimization',
    description: 'Improve your search rankings and visibility',
    icon: SeoIcon,
    subServices: ['On-Page SEO', 'Off-Page SEO', 'Technical SEO', 'Keyword Research'],
    path: '/services/seo-optimization'
  },
  {
    id: 3,
    title: 'Content Marketing',
    description: 'Engaging content to boost your brand',
    icon: ContentIcon,
    subServices: ['Blog Writing', 'Video Content', 'Infographics', 'Whitepapers & E-books'],
    path: '/services/content-marketing'
  },
  {
    id: 4,
    title: 'Social Media Management',
    description: 'Grow your audience with strategic social media campaigns',
    icon: SocialMediaIcon,
    subServices: ['Facebook & Instagram Ads', 'LinkedIn Marketing', 'Community Engagement', 'Social Analytics'],
    path: '/services/social-media'
  },
  {
    id: 5,
    title: 'PPC Management',
    description: 'Maximize ROI with targeted pay-per-click campaigns',
    icon: PPCIcon,
    subServices: ['Google Ads', 'Bing Ads', 'Retargeting Campaigns', 'Display Advertising'],
    path: '/services/ppc-management'
  },
  {
    id: 6,
    title: 'Email Marketing',
    description: 'Convert and retain customers with powerful email strategies',
    icon: EmailIcon,
    subServices: ['Automated Campaigns', 'Newsletter Management', 'Drip Sequences', 'Email Analytics'],
    path: '/services/email-marketing'
  }
];

const featuredServices = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Modern websites built for performance and scalability',
    icon: WebIcon,
    image: '/images/services/web-development.jpg',
    path: '/services/web-development'
  },
  {
    id: 2,
    title: 'MERN Stack Development',
    description: 'Full-stack JavaScript applications using MongoDB, Express, React, and Node.js',
    icon: MernIcon,
    image: '/images/services/mern-stack.jpg',
    path: '/services/mern-stack'
  },
  {
    id: 3,
    title: 'React Native Apps',
    description: 'Cross-platform mobile apps with React Native',
    icon: ReactNativeIcon,
    image: '/images/services/react-native.jpg',
    path: '/services/react-native-apps'
  }
];


const ServicesMegaMenu = () => {
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const isMedium = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box 
      sx={{ 
        p: { xs: 0.5, sm: 1, md: 1.5 }, 
        width: '100%', 
        maxWidth: '100%', 
        margin: '0 auto', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'stretch',
        overflow: 'auto',
        maxHeight: { xs: '70vh', sm: '65vh', md: 'none' }
      }}
    >
      <Grid container spacing={{ xs: 0.5, sm: 1, md: 1.5 }}>
        {/* Main Services */}
        <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant={isSmall ? "body1" : "subtitle1"} 
            gutterBottom 
            sx={{ 
              mb: { xs: 0.25, sm: 0.5, md: 0.75 }, 
              fontWeight: 600,
              px: { xs: 0.5, sm: 0.75 }
            }}
          >
            Our Services
          </Typography>
          <Grid container spacing={{ xs: 0.5, sm: 0.75, md: 1 }}>
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Grid item xs={12} sm={6} md={4} key={service.id}>
                  <Card
                    component={Link}
                    to={service.path}
                    sx={{
                      height: '100%',
                      textDecoration: 'none',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: { xs: 1, sm: 1.5 },
                      border: '1px solid',
                      borderColor: 'divider',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 2,
                        borderColor: 'primary.light',
                      },
                    }}
                  >
                    <CardContent 
                      sx={{ 
                        p: { xs: 0.75, sm: 1, md: 1.25 }, 
                        flex: 1, 
                        display: 'flex', 
                        flexDirection: 'column',
                        '&:last-child': { pb: { xs: 0.75, sm: 1, md: 1.25 } }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Icon sx={{ 
                          mr: 0.5, 
                          color: 'primary.main', 
                          fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } 
                        }} />
                        <Typography 
                          variant="body1" 
                          component="h3" 
                          sx={{ 
                            fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' }, 
                            fontWeight: 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {service.title}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 0.5, 
                          fontSize: { xs: '0.7rem', sm: '0.725rem', md: '0.75rem' },
                          display: { xs: isExtraSmall ? 'none' : '-webkit-box', sm: '-webkit-box' },
                          WebkitLineClamp: { xs: 2, sm: 2, md: 2 },
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.3,
                          height: { xs: isExtraSmall ? '0' : '2.6em', sm: '2.6em' }
                        }}
                      >
                        {service.description}
                      </Typography>
                      <List 
                        dense 
                        sx={{ 
                          p: 0, 
                          mt: 'auto',
                          display: isExtraSmall ? 'none' : 'block'
                        }}
                      >
                        {service.subServices.map((subService, index) => (
                          <ListItem 
                            key={index} 
                            sx={{ 
                              py: { xs: 0.1, sm: 0.125 },
                              minHeight: { xs: '16px', sm: '20px' }
                            }}
                          >
                            <ListItemText
                              primary={subService}
                              sx={{ 
                                m: 0,
                                '& .MuiListItemText-primary': { 
                                  fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                } 
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        {/* Featured Services */}
        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant={isSmall ? "body1" : "subtitle1"} 
            gutterBottom 
            sx={{ 
              mb: { xs: 0.25, sm: 0.5, md: 0.75 }, 
              fontWeight: 600,
              mt: { xs: 1, md: 0 },
              px: { xs: 0.5, sm: 0.75 }
            }}
          >
            Featured Solutions
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'row', md: 'column' },
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              gap: { xs: 0.5, sm: 0.75, md: 1 },
              height: '100%'
            }}
          >
            {featuredServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.id}
                  component={Link}
                  to={service.path}
                  sx={{
                    display: 'flex',
                    textDecoration: 'none',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    flex: { xs: '1 1 calc(50% - 4px)', sm: '1 1 calc(33.333% - 8px)', md: '1 1 auto' },
                    minWidth: { xs: 'calc(50% - 4px)', sm: 'calc(33.333% - 8px)', md: 'auto' },
                    maxWidth: { xs: 'calc(50% - 4px)', sm: 'calc(33.333% - 8px)', md: '100%' },
                    borderRadius: { xs: 1, sm: 1.5 },
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: { xs: 'scale(1.02)', md: 'translateX(2px)' },
                      boxShadow: 1,
                      borderColor: 'primary.light',
                    },
                  }}
                >
                  <CardContent 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      flex: 1, 
                      p: { xs: 0.75, sm: 1, md: 1.25 },
                      '&:last-child': { pb: { xs: 0.75, sm: 1, md: 1.25 } }
                    }}
                  >
                    <Icon sx={{ 
                      mr: 1, 
                      color: 'primary.main', 
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } 
                    }} />
                    <Box>
                      <Typography 
                        variant="body1" 
                        component="h3" 
                        sx={{ 
                          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' }, 
                          fontWeight: 500,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                          display: { xs: isExtraSmall ? 'none' : '-webkit-box', sm: '-webkit-box' },
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServicesMegaMenu;