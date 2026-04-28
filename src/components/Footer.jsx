import { Link } from 'react-router-dom'
import { 
  Phone, 
  Mail, 
  MapPin 
} from 'lucide-react'

import logo from '../assets/logo.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-text-primary pt-12 pb-8 border-t border-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-10 md:mb-12">
          {/* Company Identity */}
          <div className="space-y-6 md:space-y-8">
            <Link to="/" className="flex items-center group relative inline-block">
              <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl group-hover:bg-primary/10 transition-all"></div>
              <img 
                src={logo} 
                alt="Kruthik Financial Services" 
                className="h-40 md:h-56 w-auto object-contain relative z-10 transition-all hover:scale-105 filter contrast-125 brightness-105 drop-shadow-[0_0_30px_rgba(16,185,129,0.15)]"
              />
            </Link>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
              India's premier boutique financial services firm, specializing in bespoke lending solutions for HNIs and corporate entities. Precision, integrity, and elite service.
            </p>
          </div>

          {/* Premium Services */}
          <div className="space-y-6 md:space-y-8">
            <h4 className="text-text-primary font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs italic">Premium Services</h4>
            <ul className="space-y-3 md:space-y-4">
              {['Personal Prestige', 'Commercial Capital', 'Luxury Mortgages', 'EMI Navigator', 'CIBIL Diagnostic'].map(item => (
                <li key={item}>
                  <Link to="/loans" className="text-text-secondary hover:text-primary transition-colors text-xs md:text-sm flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary/40 rounded-full"></div> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact Details */}
          <div className="space-y-6 md:space-y-8">
            <h4 className="text-text-primary font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs italic">Contact Info</h4>
            <div className="space-y-4 md:space-y-6">
              {[
                { icon: <MapPin size={18} />, text: "Financial District, Bangalore, KA" },
                { icon: <Phone size={18} />, text: "+91 7026133444" },
                { icon: <Mail size={18} />, text: "kasireddykruthik@gmail.com" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 text-text-secondary text-xs md:text-sm">
                  <div className="text-primary shrink-0">{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:pt-10 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[10px] md:text-xs text-text-secondary font-bold uppercase tracking-[0.3em]">
            © {currentYear} KRUTHIK FINANCIAL SERVICES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 md:gap-8 text-[10px] md:text-xs text-text-secondary font-bold uppercase tracking-[0.2em]">
            <Link to="/terms" className="hover:text-primary transition-colors">Digital Agreement</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Charter</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
