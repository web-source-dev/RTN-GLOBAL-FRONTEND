# RTN Global Frontend

This repository contains the frontend codebase for RTN Global, a web development and digital marketing company offering custom web solutions including Wix development, MERN stack applications, and React Native mobile apps.

![RTN Global Logo](https://rtnglobal.site/images/logo.png)

## Technology Stack

- **React** - Frontend library
- **Material UI (MUI)** - Component library
- **React Router** - Routing solution
- **Framer Motion** - Animation library
- **React Helmet Async** - Document head manager for SEO
- **Axios** - HTTP client
- **Formik & Yup** - Form handling and validation
- **Stripe** - Payment processing
- **Socket.io** - Real-time communication

## SEO Implementation

This project implements a comprehensive SEO strategy through the following:

### Core SEO Component

The application uses a centralized `SEO.jsx` component that provides consistent metadata management across all pages. This component:

- Manages document `<head>` tags via React Helmet Async
- Provides fallbacks for missing metadata
- Handles Open Graph and Twitter Card metadata
- Implements JSON-LD structured data
- Optimizes resource loading with preconnect, prefetch directives

```jsx
// Example usage in page components
<SEO
  title="Page Title"
  description="Page description"
  keywords="relevant, comma, separated, keywords"
  canonicalUrl="/page-path"
  ogType="website"
  ogImage="/images/og-image.png"
  schema={structuredDataObject}
/>
```

### Structured Data Implementation

The codebase uses JSON-LD structured data for various page types:

- Organization data in the root document
- Enhanced schema graphs for the homepage
- Specific schemas for different content types:
  - BlogPosting for blog content
  - FAQPage for FAQ sections
  - CollectionPage for listing pages
  - WebApplication for tools
  - JobPosting for career pages

### Technical SEO

Technical SEO is handled through:

- Optimized `robots.txt` with granular crawler directives
- PWA support via complete `manifest.json`
- XML sitemap generation capabilities in the Sitemap component
- HTML sitemap for user navigation
- Canonical URL management
- Preconnect directives for key resources

### Accessibility Features

The codebase implements accessibility features that also benefit SEO:

- Semantic HTML structure
- Proper heading hierarchy
- ARIA attributes
- Keyboard navigation support
- Skip links
- Focus management

## Project Structure

```
src/
├── App.js               # Main application component with routing
├── Components/          # Reusable components
│   ├── common/          # Common utility components
│   │   └── SEO.jsx      # SEO component for metadata management
│   ├── layout/          # Layout components (Header, Footer)
│   ├── home/            # Homepage components
│   ├── blog/            # Blog related components
│   ├── services/        # Service page components
│   └── ...              # Other feature components
├── Pages/               # Top-level page components
├── contexts/            # React contexts
├── BackendAPi/          # API integration
└── theme/               # Theme configuration
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## SEO Best Practices

When adding new pages or content:

1. Always include the `SEO` component at the top level of the page component
2. Provide unique titles and descriptions for each page
3. Use appropriate structured data based on the page content
4. Include relevant keywords in headings and content
5. Ensure proper semantic HTML structure
6. Add new pages to the sitemap component

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Proprietary - All rights reserved by RTN Global.

## Contact

For questions about the codebase, please contact: dev@rtnglobal.site
