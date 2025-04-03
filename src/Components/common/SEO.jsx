import React from 'react';
import { Helmet } from 'react-helmet-async';

// Enhanced SEO component for managing all metadata and structured data
const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  ogType = 'website', 
  ogImage = '/images/og-default.png',
  twitterCard = 'summary_large_image',
  schema,
  noIndex = false,
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  articleTags,
  alternateLanguages = [],
  additionalMetaTags = [],
  children
}) => {
  // Build the full title with brand name
  const fullTitle = title ? `${title} | RTN Global - Web Development Solutions` : 'Custom Web Development Solutions | RTN Global';
  
  // Default meta description if none provided
  const metaDescription = description || 'Professional web development services including Wix websites, MERN stack applications, and React Native mobile apps. Fast, scalable, and user-friendly solutions.';
  
  // Default keywords if none provided
  const metaKeywords = keywords || 'web development, Wix development, MERN stack, React Native, mobile apps, custom websites, web solutions, responsive design, professional web development';

  // Build canonical URL with the site domain
  const siteUrl = 'https://rtnglobal.site';
  const canonical = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  // Example implementation for optimized image component
  const OptimizedImage = ({ src, alt, width, height }) => {
    return (
      <img 
        src={`${src}?w=${width}&q=80&format=webp`} 
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
      />
    );
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={canonical} />
      
      {/* Robots Meta Tag */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="RTN Global" />
      
      {/* Article specific meta tags */}
      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {ogType === 'article' && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      {ogType === 'article' && articleTags && articleTags.map((tag, index) => (
        <meta key={`article:tag:${index}`} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Alternate language versions */}
      {alternateLanguages.map(({ href, hrefLang }) => (
        <link 
          key={`alternate-lang-${hrefLang}`} 
          rel="alternate" 
          hrefLang={hrefLang} 
          href={href} 
        />
      ))}
      
      {/* Additional Meta Tags */}
      <meta name="author" content="RTN Global" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="geo.region" content="US-NM" />
      <meta name="geo.placename" content="Albuquerque" />
      <meta name="geo.position" content="35.1068;-106.6293" />
      <meta name="ICBM" content="35.1068, -106.6293" />
      
      {/* Custom additional meta tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta key={`custom-meta-${index}`} {...tag} />
      ))}
      
      {/* Structured Data / JSON-LD */}
      {schema && (
        <script type="application/ld+json" className="rtnglobal-schema">
          {JSON.stringify(schema)}
        </script>
      )}
      
      {/* Additional elements passed as children */}
      {children}

      {/* Performance optimization for fonts and external resources */}
      <link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />
    </Helmet>
  );
};

export default SEO; 