/**
 * Utility functions for handling links
 */

/**
 * Safely create props for external links with security attributes
 * @param {string} url - The URL to link to
 * @param {boolean} shouldOpenNewTab - Whether the link should open in a new tab
 * @returns {Object} - Props to spread onto the link component
 */
export const getExternalLinkProps = (url, shouldOpenNewTab = true) => {
  const props = {
    href: url,
  };

  if (shouldOpenNewTab) {
    props.target = '_blank';
    props.rel = 'noopener noreferrer';
  }

  return props;
};

/**
 * Check if a URL is external to the current domain
 * @param {string} url - The URL to check
 * @returns {boolean} - True if the URL is external
 */
export const isExternalLink = (url) => {
  // If the URL starts with http:// or https:// and doesn't include the current domain
  if (!url) return false;
  
  // Remove any protocol and www
  const cleanUrl = url.replace(/^https?:\/\/(www\.)?/, '');
  const currentDomain = window.location.hostname.replace(/^www\./, '');
  
  // Check if the cleaned URL starts with the current domain
  return !cleanUrl.startsWith(currentDomain) && /^https?:\/\//.test(url);
};

/**
 * Get props for a link based on whether it's internal or external
 * @param {string} url - The URL to link to
 * @param {boolean} shouldOpenNewTab - Whether external links should open in a new tab
 * @returns {Object} - Props to spread onto the link component
 */
export const getLinkProps = (url, shouldOpenNewTab = true) => {
  if (isExternalLink(url)) {
    return getExternalLinkProps(url, shouldOpenNewTab);
  }
  
  // For internal links, just return the URL
  return { href: url };
}; 