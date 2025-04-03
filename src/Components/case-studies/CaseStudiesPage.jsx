import React from 'react';
import { Box, useTheme } from '@mui/material';
import Hero from './Hero';
import CasesList from './CasesList';
import Industries from './Industries';
import Results from './Results';
import CTA from '../home/CTA';
import TestimonialsAnim from '../AnimatedSections/TestimonialsAnim';
import SEO from '../common/SEO';

const CaseStudiesPage = () => {
  const theme = useTheme();
  
  // Define structured data for Case Studies page
  const caseStudiesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://rtnglobal.site/case-studies"
    },
    "name": "RTN Global Case Studies & Success Stories",
    "description": "Explore our client success stories and case studies showcasing how we've helped businesses achieve remarkable growth through digital marketing strategies and web development.",
    "publisher": {
      "@type": "Organization",
      "name": "RTN Global",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rtnglobal.site/images/logo.png"
      }
    },
    "item": [
      {
        "@type": "Article",
        "headline": "SEO-Driven Traffic Growth",
        "description": "How strategic SEO increased organic traffic by 120% for an e-commerce brand.",
        "image": "https://rtnglobal.site/images/services/Seo.jpeg",
        "url": "https://rtnglobal.site/case-studies/seo-driven-traffic-growth"
      },
      {
        "@type": "Article",
        "headline": "Content Marketing Success",
        "description": "A SaaS company tripled its lead generation with high-quality content.",
        "image": "https://rtnglobal.site/images/services/Content.jpeg",
        "url": "https://rtnglobal.site/case-studies/content-marketing-success"
      },
      {
        "@type": "Article",
        "headline": "Web Development Success Story",
        "description": "A corporate website revamp increased visitor engagement by 85%.",
        "image": "https://rtnglobal.site/images/services/web2.jpeg",
        "url": "https://rtnglobal.site/case-studies/web-development-success-story"
      }
    ]
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
        title="Case Studies & Success Stories | RTN Global"
        description="Discover how RTN Global has helped businesses achieve remarkable growth through innovative digital marketing strategies and web development solutions."
        keywords="RTN Global case studies, marketing success stories, web development portfolio, SEO case studies, content marketing results, digital marketing ROI, website success stories"
        canonicalUrl="/case-studies"
        ogType="website"
        ogImage="/images/og-case-studies.png"
        schema={caseStudiesSchema}
      />
      <Hero />
      <CasesList />
      <Industries />
      <Results />
      <TestimonialsAnim />
      <CTA />
    </Box>
  );
};

export default CaseStudiesPage;
