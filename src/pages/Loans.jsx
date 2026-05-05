import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  TrendingUp, 
  Banknote, 
  Home as HomeIcon, 
  Building2, 
  RefreshCw, 
  Zap,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";

import businessLoanImg from "../assets/images/Businessloan2.png";
import homeLoanImg from "../assets/images/Homeloan.png";
import lapImg from "../assets/images/LoanAgainstProperty.png";
import projectLoanImg from "../assets/images/Projectloan.png";
import fundingExpImg from "../assets/images/funding-experience.png";

const staticServices = [
  {
    title: "Personal Loan",
    icon: <Banknote size={24} />,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2070",
    desc: "Achieve your personal goals with our swift and transparent personal loan solutions. Whether it's a dream wedding, medical emergency, or luxury travel.",
    features: ["Instant approval for all profiles", "Loan amount up to ₹40 Lakhs", "No collateral required", "Rates starting from 7.5%", "Tenure up to 60 months"]
  },
  {
    title: "Business Loan",
    icon: <Building2 size={24} />,
    image: businessLoanImg,
    desc: "Empower your enterprise with strategic capital. We provide high-value business loans with competitive rates to fuel your expansion plans.",
    features: ["Funding for expansion & capital", "No collateral for select limits", "Quick 48-hour disbursement", "Special schemes for entrepreneurs", "Flexible repayment options"]
  },
  {
    title: "Home Loan",
    icon: <HomeIcon size={24} />,
    image: homeLoanImg,
    desc: "Acquire your dream property with the market's lowest interest rates. Our home loan experts guide you throughout the entire paperwork process.",
    features: ["Rates starting from 7.5%", "Doorstep document collection", "Simplified approval process", "Balance transfer with top-up", "Tenure up to 30 years"]
  }
];

const LoanCard = ({ s, i, handleApply }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden group hover:bg-slate-50 transition-all duration-300 shadow-xl border border-slate-100 flex flex-col">
      <div className="h-48 md:h-64 relative overflow-hidden shrink-0">
        <img 
          src={s.image_url || s.image} 
          alt={s.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-8 space-y-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 font-primary">{s.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          {s.description || s.desc}
        </p>

        {isExpanded && (
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-50">
            {(s.features || []).map(f => (
              <span key={f} className="text-xs font-medium py-1 flex items-center gap-3 text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {f}
              </span>
            ))}
          </div>
        )}

        <div className="pt-6 border-t border-slate-100 flex flex-col gap-4 mt-auto">
          <button 
            onClick={() => handleApply(s.title, s.id)} 
            className="flex items-center gap-2 text-primary font-bold text-base hover:gap-3 transition-all outline-none cursor-pointer"
          >
            Apply Now <ChevronRight size={18} />
          </button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-400 font-bold text-xs rounded-xl transition-colors border border-slate-100 uppercase tracking-widest cursor-pointer"
          >
            {isExpanded ? "Show Less" : "View More Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Loans = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [services, setServices] = useState(staticServices);
  const [showBanner, setShowBanner] = useState(true);
  
  const searchParams = new URLSearchParams(location.search);
  const amount = searchParams.get('amount');

  useEffect(() => {
    fetchServices();
    
    // Auto-dismiss banner after 6 seconds
    if (amount) {
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [amount]);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('loan_services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        setServices(data);
      }
    } catch (err) {
      console.error("Error fetching dynamic services:", err);
    }
  };

  const handleApply = (title, id) => {
    const targetUrl = amount ? `/apply-loan?amount=${amount}` : "/apply-loan";
    navigate(targetUrl, { state: { service: title, serviceId: id } });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-28 md:pt-40">
      {/* EMI Progress Message */}
      {amount && showBanner && (
        <div className="bg-primary text-white py-6 shadow-xl relative z-20 animate-[slideDown_0.5s_ease-out] transition-all duration-500">
          <div className="container flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left px-6">
             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                <Sparkles size={24} className="text-white" />
             </div>
             <div>
                <h4 className="text-lg font-bold">Calculation Complete! You're inquiring for ₹{Number(amount).toLocaleString('en-IN')}</h4>
                <p className="text-[10px] opacity-80 uppercase tracking-[0.2em] font-black mt-1">Select your preferred loan service below to continue.</p>
             </div>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="bg-white py-16 px-4 text-center border-b border-slate-200">
        <div className="container space-y-4">
          <span className="text-primary font-bold tracking-[0.4em] uppercase block text-xs">Our Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Elite Loan Portfolio</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Tailored lending products designed to meet the sophisticated requirements of modern individuals and growing enterprises.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {services.map((s, i) => (
              <LoanCard key={s.title} s={s} i={i} handleApply={handleApply} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container">
          <div className="bg-slate-50 p-10 md:p-16 rounded-[3rem] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-slate-100">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-slate-800 font-primary">
                A Simplified Funding Experience <br />
                <span className="text-primary">For Complex Needs</span>
              </h2>
              <div className="space-y-6">
                <p className="text-slate-500 text-lg">
                  Enjoy a simplified funding experience for complex needs with quick approvals, minimal documentation, and reliable support.
                </p>
                <ul className="space-y-4">
                  {['Direct access to lenders', 'Tailored EMI structure', 'Transparent fee structure'].map(item => (
                    <li key={item} className="flex items-center gap-3 font-bold text-slate-700">
                      <ShieldCheck size={20} className="text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/contact" className="btn-premium inline-flex w-full sm:w-auto px-10 py-4">
                Get Your Custom Quote
              </Link>
            </div>
            <div className="relative">
              <img 
                src={fundingExpImg} 
                alt="Elite Financial Consultation" 
                className="relative z-10 rounded-[2.5rem] shadow-2xl w-full object-cover aspect-video"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Loans;
