import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
        'fixed w-full z-50 transition-all duration-300 px-4 py-3',
        (scrolled || !isHome) ? 'bg-primary/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center border border-white/20 shadow-lg shadow-accent/20 transition-transform group-hover:scale-105">
            <span className="text-primary font-black text-2xl">K</span>
          </div>
          <div className="flex flex-col">
            <span className={cn("font-extrabold text-xl tracking-tight transition-colors", scrolled ? "text-white" : "text-white")}>KRUTHIK</span>
            <span className={cn("text-[10px] font-bold tracking-[0.2em] transition-colors", scrolled ? "text-accent" : "text-accent")}>FINANCIAL SERVICES</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm font-bold uppercase tracking-widest transition-all hover:text-accent relative group',
                location.pathname === link.path ? 'text-accent' : 'text-white/80'
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
          className={cn("md:hidden p-2 hover:bg-white/10 rounded-xl transition-colors", scrolled ? "text-white" : "text-white")}
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
            className="md:hidden bg-background/95 backdrop-blur-xl mt-4 rounded-[2rem] shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-lg font-bold uppercase tracking-[0.2em] p-2 transition-colors',
                    location.pathname === link.path ? 'text-accent' : 'text-white'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-premium w-full"
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
