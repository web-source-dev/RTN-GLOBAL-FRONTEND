import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Hero from './Hero';
import Features from './Features';
import Services from './Services';
import About from './About';
import Stats from './Stats';
import Portfolio from './Portfolio';
import Blog from './Blog';
import CTA from './CTA';
import Contact from './Contact';
import NewsLetter from '../forms/NewsletterForm';
import Marquee from '../common/Marquee';
import StickTextSection from '../AnimatedSections/StickText';
import TestimonialsAnim from '../AnimatedSections/TestimonialsAnim';
import SEO from '../common/SEO';

const HomePage = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Define enhanced structured data with multiple entities in a graph
  const enhancedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization entity
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": "https://rtnglobal.site/#organization",
        "name": "RTN Global",
        "url": "https://rtnglobal.site",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://rtnglobal.site/#logo",
          "url": "https://rtnglobal.site/images/logo.png",
          "contentUrl": "https://rtnglobal.site/images/logo.png",
          "caption": "RTN Global Logo",
          "inLanguage": "en-US",
          "width": "800",
          "height": "800"
        },
        "email": "info@rtnglobal.site",
        "telephone": "+15055286780",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1209 MOUNTAIN ROAD PL NE STE R",
          "addressLocality": "ALBUQUERQUE",
          "addressRegion": "NM",
          "postalCode": "87110",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "35.1068",
          "longitude": "-106.6293"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "sameAs": [
          "https://facebook.com/rtnglobal",
          "https://twitter.com/rtnglobal",
          "https://linkedin.com/company/rtnglobal",
          "https://instagram.com/rtnglobal"
        ],
        "priceRange": "$$"
      },
      // Website entity
      {
        "@type": "WebSite",
        "@id": "https://rtnglobal.site/#website",
        "url": "https://rtnglobal.site",
        "name": "RTN Global: Professional Web Development Solutions",
        "description": "Custom web development services including Wix websites, MERN stack applications, and React Native mobile apps",
        "publisher": {
          "@id": "https://rtnglobal.site/#organization"
        },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://rtnglobal.site/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      // WebPage entity
      {
        "@type": "WebPage",
        "@id": "https://rtnglobal.site/#webpage",
        "url": "https://rtnglobal.site/",
        "name": "Custom Web Development Solutions | Wix, MERN Stack & React Native",
        "datePublished": "2023-01-01T08:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "about": {
          "@id": "https://rtnglobal.site/#organization"
        },
        "isPartOf": {
          "@id": "https://rtnglobal.site/#website"
        },
        "inLanguage": "en-US",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "@id": "https://rtnglobal.site/images/og-home.png",
          "url": "https://rtnglobal.site/images/og-home.png"
        },
        "description": "Professional web development services including custom Wix websites, MERN stack applications, and React Native mobile apps. Fast, scalable, and user-friendly digital experiences for your business."
      },
      // Services offered
      {
        "@type": "Service",
        "@id": "https://rtnglobal.site/services/wix-development#service",
        "name": "Wix Website Development",
        "url": "https://rtnglobal.site/services/wix-development",
        "provider": {
          "@id": "https://rtnglobal.site/#organization"
        },
        "description": "Custom Wix websites with professional design and functionality for businesses of all sizes",
        "areaServed": {
          "@type": "State",
          "name": "New Mexico"
        }
      },
      {
        "@type": "Service",
        "@id": "https://rtnglobal.site/services/mern-stack#service",
        "name": "MERN Stack Web Applications",
        "url": "https://rtnglobal.site/services/mern-stack",
        "provider": {
          "@id": "https://rtnglobal.site/#organization"
        },
        "description": "Full-stack web applications using MongoDB, Express.js, React, and Node.js",
        "areaServed": {
          "@type": "State",
          "name": "New Mexico"
        }
      },
      {
        "@type": "Service",
        "@id": "https://rtnglobal.site/services/react-native#service",
        "name": "React Native Mobile Apps",
        "url": "https://rtnglobal.site/services/react-native",
        "provider": {
          "@id": "https://rtnglobal.site/#organization"
        },
        "description": "Cross-platform mobile applications for iOS and Android",
        "areaServed": {
          "@type": "State",
          "name": "New Mexico"
        }
      }
    ]
  };

  return (
    <Box>
      <SEO
        title="Custom Web Development Solutions | Wix, MERN Stack & React Native"
        description="Professional web development services including custom Wix websites, MERN stack applications, and React Native mobile apps. Fast, scalable, and user-friendly digital experiences for your business."
        keywords="web development, Wix development, MERN stack, React Native, mobile apps, custom websites, web solutions, responsive design, professional web development, ecommerce websites, business websites, web applications, Albuquerque web design, New Mexico web development"
        canonicalUrl="/"
        ogType="website"
        ogImage="/images/og-home.png"
        schema={enhancedSchema}
      />
      <Hero />
      <Features />
      <Marquee />
      <Services />
      {isDesktop && <StickTextSection />}
      <About />
      {isDesktop && <Stats />}
      <Portfolio />
      <TestimonialsAnim />
      <Blog />
      <Contact />
      {isDesktop && <NewsLetter />}
      <CTA />
    </Box>
  );
};

export default HomePage;
