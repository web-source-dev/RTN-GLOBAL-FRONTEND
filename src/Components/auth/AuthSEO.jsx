import React from 'react';
import SEO from '../common/SEO';

/**
 * AuthSEO - A wrapper component for auth pages that adds SEO settings
 * with noindex to prevent search engines from indexing auth pages
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description 
 * @param {string} props.canonicalUrl - Relative URL for canonical link
 * @param {React.ReactNode} props.children - Child components
 */
const AuthSEO = ({ title, description, canonicalUrl, children }) => {
  return (
    <>
      <SEO
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        noIndex={true} // Always set noIndex to true for auth pages
      />
      {children}
    </>
  );
};

export default AuthSEO; 