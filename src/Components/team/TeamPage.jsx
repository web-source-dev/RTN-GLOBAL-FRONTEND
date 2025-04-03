import React from 'react';
import { Box, useTheme } from '@mui/material';
import Hero from './Hero';
import Culture from './Culture';
import JoinTeam from './JoinTeam';
import CTA from '../home/CTA';
import Team from '../AnimatedSections/Team';
import SEO from '../common/SEO';

const TeamPage = () => {
  const theme = useTheme();
  
  // Define structured data for Team page using Organization and Person types
  const teamPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Our Team | Meet RTN Global's Digital Marketing Experts",
    "description": "Meet the talented professionals behind RTN Global. Our team of digital marketing specialists and web developers is dedicated to driving your business growth.",
    "about": {
      "@type": "Organization",
      "name": "RTN Global",
      "member": [
        {
          "@type": "Person",
          "name": "John Smith",
          "jobTitle": "Chief Executive Officer",
          "image": "https://rtnglobal.site/images/team/leader1.jpg"
        },
        {
          "@type": "Person",
          "name": "Sarah Johnson",
          "jobTitle": "Chief Marketing Officer",
          "image": "https://rtnglobal.site/images/team/leader2.jpg"
        },
        {
          "@type": "Person",
          "name": "Michael Chen",
          "jobTitle": "Chief Technology Officer",
          "image": "https://rtnglobal.site/images/team/leader3.jpg"
        }
      ]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://rtnglobal.site/team"
    }
  };

  return (
    <Box 
      component="main"
      sx={{ 
        minHeight: '100vh',
        background: theme => theme.palette.background.default
      }}
    >
      <SEO
        title="Our Team | Meet RTN Global's Digital Marketing Experts"
        description="Meet the talented professionals behind RTN Global. Our team of digital marketing specialists and web developers is dedicated to driving your business growth."
        keywords="RTN Global team, digital marketing experts, web development team, marketing professionals, company culture, join our team, career opportunities"
        canonicalUrl="/team"
        ogType="website"
        ogImage="/images/og-team.png"
        schema={teamPageSchema}
      />
      <Hero />
      <Team />
      <Culture />
      <JoinTeam />
      <CTA />
    </Box>
  );
};

export default TeamPage;
