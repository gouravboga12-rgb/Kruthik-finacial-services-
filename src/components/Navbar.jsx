import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import logo from '../assets/logo.png'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Loans', path: '/loans' },
    { name: 'EMI Calculator', path: '/emi-calculator' },
    { name: 'Free CIBIL Score', path: '/cibil-score' },
    { name: 'Become Partner', path: '/become-partner' },
    { name: 'Contact', path: '/contact' },
  ]

  const isHome = location.pathname === '/'

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 py-2 bg-gradient-to-r from-secondary via-white to-secondary border-b border-primary/10 shadow-sm',
        scrolled ? 'py-1' : 'py-3'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center group relative">
          <div className="absolute -inset-2 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition-all"></div>
          <img 
            src={logo} 
            alt="Kruthik Financial Services" 
            className="h-20 md:h-32 w-auto object-contain relative z-10 transition-all group-hover:scale-110 filter contrast-125 brightness-105 drop-shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-xs font-bold uppercase tracking-widest transition-all hover:text-primary relative group text-text-primary',
                location.pathname === link.path ? 'text-primary' : ''
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300",
                location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="btn-premium py-2 px-6 text-sm rounded-xl shadow-none"
          >
            Priority Access
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 hover:bg-primary/5 rounded-xl transition-colors text-text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background mt-4 rounded-[2rem] shadow-2xl overflow-hidden border border-primary/5"
          >
            <div className="flex flex-col p-6 md:p-8 gap-4 md:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-sm md:text-base font-bold uppercase tracking-[0.2em] p-2 transition-colors border-b border-primary/5 last:border-0',
                    location.pathname === link.path ? 'text-accent' : 'text-primary'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-premium w-full mt-2"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
