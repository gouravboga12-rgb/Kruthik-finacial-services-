import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  TrendingUp, 
  Banknote, 
  Home as HomeIcon, 
  Building2, 
  RefreshCw, 
  Zap,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import businessLoanImg from "../assets/images/Businessloan.png";
import homeLoanImg from "../assets/images/Homeloan.png";
import lapImg from "../assets/images/LoanAgainstProperty.png";
import projectLoanImg from "../assets/images/Projectloan.png";

const services = [
  {
    title: "Personal Loan",
    icon: <Banknote size={24} />,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2070",
    desc: "Achieve your personal goals with our swift and transparent personal loan solutions. Whether it's a dream wedding, medical emergency, or luxury travel.",
    features: [
      "Instant approval for all profiles",
      "Loan amount up to ₹40 Lakhs",
      "No collateral required",
      "Rates starting from 7.5%",
      "Tenure up to 60 months"
    ]
  },
  {
    title: "Business Loan",
    icon: <Building2 size={24} />,
    image: businessLoanImg,
    desc: "Empower your enterprise with strategic capital. We provide high-value business loans with competitive rates to fuel your expansion plans.",
    features: [
      "Funding for expansion & capital",
      "No collateral for select limits",
      "Quick 48-hour disbursement",
      "Special schemes for entrepreneurs",
      "Flexible repayment options"
    ]
  },
  {
    title: "Home Loan",
    icon: <HomeIcon size={24} />,
    image: homeLoanImg,
    desc: "Acquire your dream property with the market's lowest interest rates. Our home loan experts guide you throughout the entire paperwork process.",
    features: [
      "Rates starting from 7.5%",
      "Doorstep document collection",
      "Simplified approval process",
      "Balance transfer with top-up",
      "Tenure up to 30 years"
    ]
  },
  {
    title: "Project Loan",
    icon: <Zap size={24} />,
    image: projectLoanImg,
    desc: "Specialized funding for large-scale industrial, commercial, and infrastructure developments. We understand project dynamics better than anyone.",
    features: [
      "Tailored infrastructure funding",
      "Expert project evaluation",
      "Repayment aligned with cash flow",
      "Greenfield & Brownfield projects",
      "Large-scale financing terms"
    ]
  },
  {
    title: "Loan Against Property",
    icon: <ShieldCheck size={24} />,
    image: lapImg,
    desc: "Unlock the idle value of your residential or commercial property. Get maximum liquidity while retaining complete ownership.",
    features: [
      "High LTV ratio up to 70%",
      "Residential & Commercial property",
      "Lower rates than personal loans",
      "Long tenure for easy repayment",
      "Funds for any business need"
    ]
  },
  {
    title: "Loan Takeover / BT",
    icon: <RefreshCw size={24} />,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2070",
    desc: "Transfer your high-interest existing loans to us and save on monthly EMIs. Reduce your financial burden with our Balance Transfer facility.",
    features: [
      "Reduce interest rates significantly",
      "No hidden transfer charges",
      "Additional top-up available",
      "Consolidate multiple EMIs",
      "Minimal transfer paperwork"
    ]
  }
];

const LoanCard = ({ s, i, handleApply }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      key={s.title}
      data-aos="fade-up"
      data-aos-delay={i * 100}
      className="glass-card-premium rounded-3xl md:rounded-[2.5rem] overflow-hidden group hover:bg-primary/5 transition-all duration-500 shadow-xl border-primary/10 flex flex-col"
    >
      <div className="h-48 md:h-64 relative overflow-hidden shrink-0">
        <img 
          src={s.image} 
          alt={s.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-95 group-hover:brightness-100"
        />
      </div>
      <div className="p-6 md:p-8 space-y-4 flex flex-col flex-grow">
        <h3 className="text-lg md:text-xl font-bold text-text-primary font-primary">{s.title}</h3>
        <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
          {s.desc}
        </p>

        {/* Expandable Features */}
        <motion.div
          initial={false}
          animate={{ 
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 16 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-2 pt-2 border-t border-primary/5">
            {s.features.map(f => (
              <span key={f} className="w-full text-[10px] md:text-xs font-semibold py-1.5 flex items-center gap-3 text-text-secondary">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {f}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="pt-6 border-t border-primary/10 flex flex-col gap-4 mt-auto">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => handleApply(s.title)} 
              className="flex items-center gap-2 text-primary font-bold text-sm md:text-base hover:gap-3 transition-all outline-none"
            >
              Apply Now <ChevronRight size={18} />
            </button>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-2.5 bg-primary/5 hover:bg-primary/10 text-primary font-bold text-[10px] md:text-xs rounded-xl transition-colors border border-primary/10 uppercase tracking-widest flex items-center justify-center gap-2"
          >
            {isExpanded ? "Show Less" : "View More"}
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ChevronRight size={14} className="rotate-90" />
            </motion.div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Loans = () => {
  const navigate = useNavigate();

  const handleApply = (title) => {
    navigate("/apply-loan", { state: { service: title } });
  };

  return (
    <div className="min-h-screen bg-background text-text-primary pt-20">
      {/* Header */}
      <section className="bg-primary/5 py-12 md:py-16 px-4 text-center overflow-hidden border-b border-primary/10">
        <div className="container space-y-4 md:space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary font-bold tracking-[0.3em] uppercase block text-xs md:text-sm"
          >
            Our Portfolio
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-text-primary"
          >
            Elite Loan <span className="text-gradient">Portfolio</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Tailored lending products designed to meet the sophisticated requirements of modern individuals and growing enterprises.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 bg-background overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {services.map((s, i) => (
              <LoanCard key={s.title} s={s} i={i} handleApply={handleApply} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 md:py-16 bg-primary/5 overflow-hidden">
        <div className="container">
          <div className="glass-card-premium p-8 md:p-16 rounded-3xl md:rounded-[3rem] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-primary/10" data-aos="fade-up">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight text-text-primary font-primary">
              A Simplified Funding Experience <br className="hidden md:block" />
              <span className="text-gradient">For Complex Needs</span>
            </h2>
            <div className="space-y-4">
              <p className="text-text-secondary text-base md:text-lg">
                We eliminate the traditional bureaucracy associated with bank loans. Our digital-first approach ensures that your applications are processed with priority and speed.
              </p>
              <ul className="space-y-3 md:space-y-4">
                {['Direct access to lenders', 'Tailored EMI structure', 'Transparent fee structure'].map(item => (
                  <li key={item} className="flex items-center gap-3 font-semibold text-sm md:text-base text-text-primary">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <ChevronRight size={14} className="text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/contact" className="btn-premium inline-flex w-full sm:w-auto mt-4 px-10">
              Get Your Custom Quote
            </Link>
          </div>
          <div className="relative order-first lg:order-last">
            <div className="absolute inset-0 bg-primary/10 blur-[80px] md:blur-[100px] rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2074" 
              alt="Elite Financial Consultation" 
              className="relative z-10 rounded-3xl md:rounded-[2.5rem] shadow-2xl brightness-100 hover:scale-[1.05] transition-all duration-700 w-full object-cover aspect-video md:aspect-auto"
            />
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Loans;
