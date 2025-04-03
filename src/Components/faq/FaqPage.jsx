import React from 'react';
import { Box, useTheme } from '@mui/material';
import Hero from './Hero';
import FaqCategories from './FaqCategories';
import PopularQuestions from './PopularQuestions';
import CTA from '../home/CTA';
import Contact from '../home/Contact';
import SEO from '../common/SEO';

const FaqPage = () => {
  const theme = useTheme();
  
  // Define structured data for FAQ page using FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I track my marketing campaign performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our platform provides real-time analytics dashboard where you can monitor key metrics, ROI, and campaign performance across all channels. You can access detailed reports and set up custom alerts for important metrics."
        }
      },
      {
        "@type": "Question",
        "name": "What integrations are available with your platform?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer integrations with major CRM systems, social media platforms, analytics tools, and marketing automation software. This includes Salesforce, HubSpot, Google Analytics, Facebook Ads, and many more."
        }
      },
      {
        "@type": "Question",
        "name": "How do I set up automated email campaigns?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can create automated email campaigns through our Email Marketing tool. Simply define your audience, create your email content, set trigger conditions, and schedule your campaign. We also provide templates and A/B testing features."
        }
      },
      {
        "@type": "Question",
        "name": "What security measures are in place to protect my data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We implement industry-leading security measures including end-to-end encryption, regular security audits, and compliance with GDPR and other privacy regulations. Your data is stored in secure, redundant servers with 24/7 monitoring."
        }
      },
      {
        "@type": "Question",
        "name": "Can I upgrade or downgrade my subscription plan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can change your subscription plan at any time. Changes take effect at the start of your next billing cycle. When upgrading, you will get immediate access to new features, and when downgrading, you will retain access until the current period ends."
        }
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
        title="Frequently Asked Questions | RTN Global Support"
        description="Find answers to common questions about our web development services, digital tools, and solutions. Browse our comprehensive FAQ section for detailed information."
        keywords="FAQ, frequently asked questions, RTN Global support, web development help, digital tools FAQ, MERN stack questions, React Native help, customer support"
        canonicalUrl="/faq"
        ogType="website"
        ogImage="/images/og-faq.png"
        schema={faqSchema}
      />
      <Hero />
      <FaqCategories />
      <PopularQuestions />
      <Contact />
      <CTA />
    </Box>
  );
};

export default FaqPage;
