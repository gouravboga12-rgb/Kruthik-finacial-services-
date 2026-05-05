import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Loans from './pages/Loans'
import Contact from './pages/Contact'
import CibilScore from './pages/CibilScore'
import Calculator from './pages/Calculator'
import ApplyLoan from './pages/ApplyLoan'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import BecomePartner from './pages/BecomePartner'

// Admin Pages
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import LoanApplications from './pages/admin/LoanApplications'
import ContactInquiries from './pages/admin/ContactInquiries'
import PartnerRequests from './pages/admin/PartnerRequests'
import CibilHistory from './pages/admin/CibilHistory'
import ServiceManager from './pages/admin/ServiceManager'
import FormFieldManager from './pages/admin/FormFieldManager'
import BannerManager from './pages/admin/BannerManager'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppChatbot from './components/WhatsAppChatbot'
import ScrollToTop from './components/ScrollToTop'

function AppContent() {
  const location = useLocation()

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      delay: 100,
    })
  }, [])

  useEffect(() => {
    // Small timeout ensures the DOM has fully rendered before AOS scans it
    const timer = setTimeout(() => {
      AOS.refresh()
    }, 150)
    return () => clearTimeout(timer)
  }, [location])

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {!location.pathname.startsWith('/admin') && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cibil-score" element={<CibilScore />} />
          <Route path="/emi-calculator" element={<Calculator />} />
          <Route path="/apply-loan" element={<ApplyLoan />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/become-partner" element={<BecomePartner />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="banners" element={<BannerManager />} />
            <Route path="loans" element={<LoanApplications />} />
            <Route path="services" element={<ServiceManager />} />
            <Route path="services/:serviceId/form" element={<FormFieldManager />} />
            <Route path="contacts" element={<ContactInquiries />} />
            <Route path="partners" element={<PartnerRequests />} />
            <Route path="cibil" element={<CibilHistory />} />
          </Route>
        </Routes>
      </main>
      {!location.pathname.startsWith('/admin') && <Footer />}
      {!location.pathname.startsWith('/admin') && <WhatsAppChatbot />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  )
}

export default App
