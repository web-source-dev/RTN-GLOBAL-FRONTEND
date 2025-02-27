import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './Components/layout/Layout';
import HomePage from './Components/home/HomePage';
import ServicesPage from './Components/services/ServicesPage';
import CaseStudiesPage from './Components/case-studies/CaseStudiesPage';
import TeamPage from './Components/team/TeamPage';
import CareersPage from './Components/careers/CareersPage';
import NewsPage from './Components/news/NewsPage';
import MarketingGuidePage from './Components/marketing-guide/MarketingGuidePage';
import DigitalToolsPage from './Components/digital-tools/DigitalToolsPage';
import RoiCalculatorPage from './Components/roi-calculator/RoiCalculatorPage';
import FaqPage from './Components/faq/FaqPage';
import SupportPage from './Components/support/SupportPage';
import DigitalStrategy from './Components/services/digital-strategy/DigitalStrategy';
import SeoOptimization from './Components/services/seo-optimization/SeoOptimization';
import ContentMarketing from './Components/services/content-marketing/ContentMarketing';
import SocialMedia from './Components/services/social-media/SocialMedia';
import PpcManagement from './Components/services/ppc-management/PpcManagement';
import EmailMarketing from './Components/services/email-marketing/EmailMarketing';
import BlogPage from './Components/blog/BlogPage';
import BlogPost from './Components/blog/BlogPost';
import NewsletterForm from './Components/forms/NewsletterForm';
import JobApplicationForm from './Components/forms/JobApplicationForm';
import SupportForm from './Components/forms/SupportForm';
import Contact from './Components/home/Contact';
import LoginForm from './Components/auth/LoginForm';
import RegisterForm from './Components/auth/RegisterForm';
import ForgotPasswordForm from './Components/auth/ForgotPasswordForm';
import ResetPasswordForm from './Components/auth/ResetPasswordForm';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/post" element={<BlogPost />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/marketing-guide" element={<MarketingGuidePage />} />
            <Route path="/digital-tools" element={<DigitalToolsPage />} />
            <Route path="/roi-calculator" element={<RoiCalculatorPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="//services/digital-strategy" element={<DigitalStrategy />} />
            <Route path="/services/seo-optimization" element={<SeoOptimization />} />
            <Route path="/services/content-marketing" element={<ContentMarketing />} />
            <Route path="/services/social-media" element={<SocialMedia/>} />
            <Route path="/services/ppc-management" element={<PpcManagement />} />
            <Route path="/services/email-marketing" element={<EmailMarketing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news/letter/form" element={<NewsletterForm />} />
            <Route path="/job/application/form" element={<JobApplicationForm />} />
            <Route path="/support/form" element={<SupportForm />} />
            <Route path="/auth/login" element={<LoginForm />} />
            <Route path="/auth/register" element={<RegisterForm />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/auth/reset-password" element={<ResetPasswordForm />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;