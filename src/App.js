import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './Components/User/UserDashboard';
import UserSupportTickets from './Components/User/UserSupportTickets';
import UserJobApplications from './Components/User/UserJobApplications';
import UserConsultations from './Components/User/UserConsultations';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from './contexts/ThemeContext';
import Sitemap from './Components/sitemap/Sitemap';
import ServerError from './Components/error/ServerError';
import NotFound from './Components/error/NotFound';
import Pricing from './Components/pricing/Pricing';
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
import CreateBlog from './Components/blog/CreateBlog';
import ManageBlog from './Components/blog/ManageBlog';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './Components/common/ProtectedRoute';
import AboutPage from './Components/about/AboutPage';
import TermsOfService from './Components/legal/TermsOfService';
import PrivacyPolicy from './Components/legal/PrivacyPolicy';
import Disclaimer from './Components/legal/Disclaimer';
import UserSettings from './Components/profile/UserSettings';
import ChatDashboard from './Components/admin/ChatDashboard';
import LiveChat from './Components/support/LiveChat';
import GlobalLiveChat from './Components/support/GlobalLiveChat';
import AdminDashboard from './Components/admin/AdminDashboard';
import AdminOverview from './Components/admin/Overview';
import AdminUsers from './Components/admin/Users';
import AdminBlogs from './Components/admin/Blogs';
import AdminJobs from './Components/admin/Jobs';
import AdminNewsletter from './Components/admin/Newsletter';
import AdminSupport from './Components/admin/Support';
import AdminSettings from './Components/admin/Settings';
import TicketStatus from './Components/forms/TicketStatus';
import FreeConsultationForm from './Components/forms/FreeConsultationForm';
import ManageConsultation from './Components/admin/ManageConsultation';
import UserProfile from './Components/profile/UserProfile';
import SessionExpired from './Components/error/SessionExpired';
import PaymentPage from './Pages/PaymentPage';
import VerifyInvoice from './Pages/VerifyInvoice';
import VerifyReceipt from './Pages/VerifyReceipt';
import EmailVerificationForm from './Components/auth/EmailVerificationForm';
import SocialAuthSuccess from './Components/auth/SocialAuthSuccess';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Routes>
            {/* User Dashboard Routes */}
            <Route path="/dashboard/user" element={<UserDashboard />}>
              <Route path="support" element={<UserSupportTickets />} />
              <Route path="applications" element={<UserJobApplications />} />
              <Route path="consultations" element={<UserConsultations />} />
                  <Route path="profile" element={<UserProfile />} />

            </Route>
            <Route path="/livechat" element={<LiveChat />} />
            <Route path="/Community" element={<GlobalLiveChat />} />
            <Route path="/auth/login" element={<LoginForm />} />
                  <Route path="/auth/register" element={<RegisterForm />} />
                  <Route path="/auth/forgot-password" element={<ForgotPasswordForm />} />
                  <Route path="/auth/reset-password" element={<ResetPasswordForm />} />
                  <Route path="/auth/social-success" element={<SocialAuthSuccess />} />
                  <Route path="/auth/verify-email" element={<EmailVerificationForm />} />
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/case-studies" element={<CaseStudiesPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/post/:id" element={<BlogPost />} />
                  <Route path="/blog/create" element={
                    <ProtectedRoute adminOnly>
                      <CreateBlog />
                    </ProtectedRoute>
                  } />
                  <Route path="/blog/edit/:id" element={
                    <ProtectedRoute adminOnly>
                      <CreateBlog />
                    </ProtectedRoute>
                  } />
                  <Route path="/blog/manage" element={
                    <ProtectedRoute adminOnly>
                      <ManageBlog />
                    </ProtectedRoute>
                  } />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/marketing-guide" element={<MarketingGuidePage />} />
                  <Route path="/digital-tools" element={<DigitalToolsPage />} />
                  <Route path="/roi-calculator" element={<RoiCalculatorPage />} />
                  <Route path="/faq" element={<FaqPage />} />
                  <Route path="/settings" element={<UserSettings />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/services/digital-strategy" element={<DigitalStrategy />} />
                  <Route path="/services/seo-optimization" element={<SeoOptimization />} />
                  <Route path="/services/content-marketing" element={<ContentMarketing />} />
                  <Route path="/services/social-media" element={<SocialMedia/>} />
                  <Route path="/services/ppc-management" element={<PpcManagement />} />
                  <Route path="/services/email-marketing" element={<EmailMarketing />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/news/letter/form" element={<NewsletterForm />} />
                  <Route path="/job/application/form" element={<JobApplicationForm />} />
                  <Route path="/support/form" element={<SupportForm />} />

                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/disclaimer" element={<Disclaimer />} />
                  <Route path="/check-ticket" element={<TicketStatus />} />
                  <Route path="/free-consultation" element={<FreeConsultationForm />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/error/server-error" element={<ServerError />} />
                  <Route path="/error/session-expired" element={<SessionExpired />} />
                  <Route path="/payment/:id" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
                  <Route path="/verify-invoice/:invoiceNumber" element={<VerifyInvoice />} />
                  <Route path="/verify-receipt/:receiptNumber" element={<VerifyReceipt />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            } />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminOverview />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="jobs" element={<AdminJobs />} />
              <Route path="newsletter" element={<AdminNewsletter />} />
              <Route path="chat" element={<ChatDashboard />} />
              <Route path="support" element={<AdminSupport />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="consultation" element={<ManageConsultation />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;