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
} from '@mui/material';
import { Link } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import CloudIcon from '@mui/icons-material/Cloud';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';

const services = [
  {
    id: 1,
    title: 'Custom Software Development',
    description: 'Tailored solutions to meet your unique business needs',
    icon: CodeIcon,
    subServices: ['Web Applications', 'Mobile Apps', 'Desktop Software', 'API Development'],
    path: '/services/custom-software-development'
  },
  {
    id: 2,
    title: 'Cloud Solutions',
    description: 'Scalable and secure cloud infrastructure services',
    icon: CloudIcon,
    subServices: ['Cloud Migration', 'Cloud Architecture', 'DevOps', 'Serverless Solutions'],
    path: '/services/cloud-solutions'
  },
  {
    id: 3,
    title: 'Enterprise Solutions',
    description: 'Comprehensive solutions for large-scale organizations',
    icon: BusinessIcon,
    subServices: ['ERP Systems', 'CRM Implementation', 'Business Intelligence', 'Digital Transformation'],
    path: '/services/enterprise-solutions'
  },
  {
    id: 4,
    title: 'Cybersecurity',
    description: 'Protect your business with advanced security measures',
    icon: SecurityIcon,
    subServices: ['Security Audits', 'Penetration Testing', 'Compliance', 'Security Training'],
    path: '/services/cybersecurity'
  }
];

const featuredServices = [
  {
    id: 1,
    title: 'Data Analytics',
    description: 'Transform your data into actionable insights',
    icon: AnalyticsIcon,
    image: '/images/services/data-analytics.jpg',
    path: '/services/data-analytics'
  },
  {
    id: 2,
    title: 'System Integration',
    description: 'Seamlessly connect your business systems',
    icon: IntegrationInstructionsIcon,
    image: '/images/services/system-integration.jpg',
    path: '/services/system-integration'
  },
  {
    id: 3,
    title: 'Network Solutions',
    description: 'Optimize your network infrastructure',
    icon: NetworkCheckIcon,
    image: '/images/services/network-solutions.jpg',
    path: '/services/network-solutions'
  }
];

const ServicesMegaMenu = () => {
  return (
    <Box sx={{ p: 0.5, width: '100%', maxWidth: 1200, margin: '0 auto', height: '60vh', display: 'flex', alignItems: 'stretch' }}>
      <Grid container spacing={1}>
        {/* Main Services */}
        <Grid item xs={12} md={8}>
          <Typography variant="subtitle1" gutterBottom sx={{ mb: 0.5, fontWeight: 600 }}>
            Our Services
          </Typography>
          <Grid container spacing={1}>
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Grid item xs={12} sm={6} key={service.id}>
                  <Card
                    component={Link}
                    to={service.path}
                    sx={{
                      height: '100%',
                      textDecoration: 'none',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 2,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Icon sx={{ mr: 0.5, color: 'primary.main', fontSize: '1rem' }} />
                        <Typography variant="body1" component="h3" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                          {service.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.75rem' }}>
                        {service.description}
                      </Typography>
                      <List dense sx={{ p: 0, mt: 'auto' }}>
                        {service.subServices.map((subService, index) => (
                          <ListItem key={index} sx={{ py: 0.125 }}>
                            <ListItemText
                              primary={subService}
                              sx={{ '& .MuiListItemText-primary': { fontSize: '0.75rem' } }}
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
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" gutterBottom sx={{ mb: 0.5, fontWeight: 600 }}>
            Featured Solutions
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                    '&:hover': {
                      transform: 'translateX(2px)',
                      boxShadow: 1,
                    },
                  }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', flex: 1, p: 1 }}>
                    <Icon sx={{ mr: 1, color: 'primary.main', fontSize: '1rem' }} />
                    <Box>
                      <Typography variant="body1" component="h3" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
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