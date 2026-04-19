import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Globe, Share2, Camera, ChevronRight } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {/* Company Info */}
        <div className="space-y-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center border border-white/10">
              <span className="text-primary font-black text-2xl">K</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight">KRUTHIK</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">FINANCIAL SERVICES</span>
            </div>
          </Link>
          <p className="text-text-secondary leading-relaxed">
            Standard-bearer in premium lending. Providing tailored financial instruments for elite individuals and visionary enterprises with absolute transparency.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-white">Navigation</h3>
          <ul className="space-y-4">
            {['Home', 'About', 'Loans', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-text-secondary hover:text-accent transition-colors flex items-center gap-2 group">
                  <ChevronRight size={14} className="text-accent/50 group-hover:text-accent transition-colors" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-white">Elite Portfolio</h3>
          <ul className="space-y-4">
            {['Personal Loan', 'Business Loan', 'Home Loan', 'Project Funding'].map((service) => (
              <li key={service}>
                <Link to="/loans" className="text-text-secondary hover:text-accent transition-colors">
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-white">Executive Support</h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <Phone size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-secondary uppercase font-bold tracking-tighter">Direct Line</span>
                <a href="tel:7026133444" className="text-lg font-bold hover:text-accent transition-colors">+91 7026133444</a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <Mail size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-secondary uppercase font-bold tracking-tighter">Email Inquiry</span>
                <a href="mailto:SUPPORT@SUREKILL.CO.IN" className="text-lg font-bold hover:text-accent transition-colors break-all">SUPPORT@SUREKILL.CO.IN</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-text-secondary font-medium uppercase tracking-widest text-[10px]">
          &copy; {currentYear} KRUTHIK FINANCIAL SERVICES. ELITE LENDING GROUP.
        </p>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
          <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy</Link>
          <Link to="/terms-and-conditions" className="hover:text-accent transition-colors">Terms</Link>
          <Link to="/contact" className="hover:text-accent transition-colors">Legal</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
