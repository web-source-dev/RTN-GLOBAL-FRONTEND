import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Add preconnect hints for third-party resources
const preconnectLinks = [
  { rel: 'preconnect', href: 'https://res.cloudinary.com' },
  { rel: 'dns-prefetch', href: 'https://res.cloudinary.com' },
  { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossOrigin: 'anonymous' }
];

preconnectLinks.forEach(({ rel, href, crossOrigin }) => {
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  if (crossOrigin) link.crossOrigin = crossOrigin;
  document.head.appendChild(link);
});

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function detectSystemTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme('dark');
  }
}

// Set theme based on system preference or saved preference on initial load
detectSystemTheme();

// Create root with concurrent mode for better performance
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render app with automatic batching for better performance
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure and report Core Web Vitals with minimal impact
reportWebVitals(metric => {
  // Use requestIdleCallback to defer non-critical measurements
  if (window.requestIdleCallback) {
    requestIdleCallback(() => {
      const { name, value, id } = metric;
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.log({ name, value, id });
      }
      // Send to analytics when ready
      // Example: if (window.gtag) window.gtag('event', name, { value });
    });
  } else {
    const { name, value, id } = metric;
    if (process.env.NODE_ENV === 'development') {
      console.log({ name, value, id });
    }
  }
});
