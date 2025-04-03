import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  const pageRef = useRef(null);

  useEffect(() => {
    // Ensure smooth scroll to top on component mount
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Focus management - set focus to the main content container
    // This helps screen reader users know that the page has changed
    if (pageRef.current) {
      // We use a slight delay to allow the DOM to settle
      const timer = setTimeout(() => {
        // Find the first heading or focusable element to focus on
        const focusTarget = pageRef.current.querySelector('h1, h2, [tabindex="0"]');
        if (focusTarget) {
          focusTarget.focus({ preventScroll: true });
        } else {
          // If no focusable element is found, set focus to the container itself
          pageRef.current.setAttribute('tabindex', '-1');
          pageRef.current.focus({ preventScroll: true });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <motion.div
      ref={pageRef}
      aria-live="polite"
      initial={{ opacity: 0, y:30 }} // Start from slightly below
      animate={{ opacity: 1, y: 0 }} // Move to normal position
      exit={{ opacity: 0 }}
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 1
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
