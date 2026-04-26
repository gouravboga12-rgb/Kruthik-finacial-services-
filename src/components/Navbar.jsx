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
    { name: 'CIBIL Score', path: '/cibil-score' },
    { name: 'Contact', path: '/contact' },
  ]

  const isHome = location.pathname === '/'

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 py-2 bg-primary shadow-lg',
        scrolled ? 'py-1' : 'py-2'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <img 
            src={logo} 
            alt="Kruthik Financial Services" 
            className="h-16 md:h-24 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-xs font-bold uppercase tracking-widest transition-all hover:text-accent relative group text-white/80',
                location.pathname === link.path ? 'text-accent' : ''
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
          className="md:hidden p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
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
