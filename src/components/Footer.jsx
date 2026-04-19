import { Link } from 'react-router-dom'
import { 
  Phone, 
  Mail, 
  MapPin 
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 mb-16 md:mb-20">
          {/* Company Identity */}
          <div className="space-y-6 md:space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-xl md:rounded-2xl flex items-center justify-center border border-white/20">
                <span className="text-primary font-black text-xl md:text-2xl">K</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg md:text-xl tracking-tight text-white group-hover:text-accent transition-colors">KRUTHIK</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-accent">FINANCIAL</span>
              </div>
            </Link>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              India's premier boutique financial services firm, specializing in bespoke lending solutions for HNIs and corporate entities. Precision, integrity, and elite service.
            </p>
          </div>

          {/* Premium Services */}
          <div className="space-y-6 md:space-y-8">
            <h4 className="text-white font-bold uppercase tracking-[0.3em] text-xs md:text-sm italic">Premium Services</h4>
            <ul className="space-y-3 md:space-y-4">
              {['Personal Prestige', 'Commercial Capital', 'Luxury Mortgages', 'EMI Navigator', 'CIBIL Diagnostic'].map(item => (
                <li key={item}>
                  <Link to="/loans" className="text-text-secondary hover:text-accent transition-colors text-sm md:text-base flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent/40 rounded-full"></div> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact Details */}
          <div className="space-y-6 md:space-y-8">
            <h4 className="text-white font-bold uppercase tracking-[0.3em] text-xs md:text-sm italic">Contact Info</h4>
            <div className="space-y-4 md:space-y-6">
              {[
                { icon: <MapPin size={18} />, text: "Financial District, Bangalore, KA" },
                { icon: <Phone size={18} />, text: "+91 7026133444" },
                { icon: <Mail size={18} />, text: "support@surekill.co.in" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 text-text-secondary text-sm md:text-base">
                  <div className="text-accent shrink-0">{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[10px] md:text-xs text-text-secondary font-bold uppercase tracking-[0.3em]">
            © {currentYear} KRUTHIK FINANCIAL SERVICES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 md:gap-8 text-[10px] md:text-xs text-text-secondary font-bold uppercase tracking-[0.2em]">
            <Link to="/terms" className="hover:text-accent transition-colors">Digital Agreement</Link>
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Charter</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
