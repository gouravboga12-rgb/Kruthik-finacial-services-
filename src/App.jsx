import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppCTA from './components/WhatsAppCTA'
import ScrollToTop from './components/ScrollToTop'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      disable: 'mobile', 
    })
  }, [])

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col pt-20 overflow-x-hidden">
        <Navbar />
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
          </Routes>
        </main>
        <Footer />
        <WhatsAppCTA />
      </div>
    </Router>
  )
}

export default App
