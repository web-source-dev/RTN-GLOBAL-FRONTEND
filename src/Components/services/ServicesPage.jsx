import React from 'react';
import { Box, useTheme } from '@mui/material';
import ServicesGrid from './ServicesGrid';
import Benefits from '../roi-calculator/Benefits';
import CaseStudies from '../case-studies/Industries';
import CTA from '../home/CTA';
import MegaHero from '../AnimatedSections/Hero';
import TestimonialsAnim from '../AnimatedSections/TestimonialsAnim';
import SEO from '../common/SEO';
import { Helmet } from 'react-helmet-async';

const ServicesPage = () => {
  const theme = useTheme();
  
  // Define structured data for Services page
  const servicesPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Digital Marketing Services | Web Development Solutions | RTN Global",
    "description": "Explore RTN Global's comprehensive range of digital marketing services and web development solutions. From SEO optimization to PPC management, content marketing, and more.",
    "publisher": {
      "@type": "Organization",
      "name": "RTN Global",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rtnglobal.site/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://rtnglobal.site/services"
    },
    "about": [
      {
        "@type": "Service",
        "name": "SEO Optimization",
        "description": "Search engine optimization to improve visibility and organic traffic",
        "url": "https://rtnglobal.site/services/seo-optimization"
      },
      {
        "@type": "Service",
        "name": "PPC Management",
        "description": "Paid advertising campaign management to drive targeted traffic and conversions",
        "url": "https://rtnglobal.site/services/ppc-management"
      },
      {
        "@type": "Service",
        "name": "Content Marketing",
        "description": "Strategic content creation and distribution to attract and engage your target audience",
        "url": "https://rtnglobal.site/services/content-marketing"
      },
      {
        "@type": "Service",
        "name": "Email Marketing",
        "description": "Targeted email campaigns to nurture leads and drive customer engagement",
        "url": "https://rtnglobal.site/services/email-marketing"
      },
      {
        "@type": "Service",
        "name": "Social Media Marketing",
        "description": "Strategic social media management to build brand awareness and engagement",
        "url": "https://rtnglobal.site/services/social-media"
      },
      {
        "@type": "Service",
        "name": "Digital Strategy",
        "description": "Comprehensive digital marketing strategy development and implementation",
        "url": "https://rtnglobal.site/services/digital-strategy"
      }
    ]
  };

  return (
    <Box 
      component="main"
      id="services-page"
      sx={{
        minHeight: '100vh',
        background: theme.palette.background.default
      }}
    >
      <SEO
        title="Digital Marketing Services | Web Development Solutions | RTN Global"
        description="Explore RTN Global's comprehensive range of digital marketing services and web development solutions. From SEO to social media, content marketing to PPC management."
        keywords="digital marketing services, web development solutions, SEO optimization, PPC management, content marketing, email marketing, social media marketing, digital strategy"
        canonicalUrl="/services"
        ogType="website"
        ogImage="/images/og-services.png"
        schema={servicesPageSchema}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(servicesPageSchema)}
        </script>
      </Helmet>
      <MegaHero />
      <ServicesGrid />
      <Benefits />
      <CaseStudies />
      <TestimonialsAnim/>
      <CTA />
    </Box>
  );
};

export default ServicesPage;