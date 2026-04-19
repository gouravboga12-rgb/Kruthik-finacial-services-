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

const services = [
  {
    title: "Personal Loan",
    icon: <Banknote size={24} />,
    image: "/service_personal_loan_premium_1776423994502.png",
    desc: "Achieve your personal goals with our swift and transparent personal loan solutions. Whether it's a dream wedding, medical emergency, or luxury travel.",
    features: ["Minimal Documentation", "Fast Disbursement", "Flexible Tenure"]
  },
  {
    title: "Business Loan",
    icon: <Building2 size={24} />,
    image: "/service_business_loan_premium_1776423907771.png",
    desc: "Empower your enterprise with strategic capital. We provide high-value business loans with competitive rates to fuel your expansion plans.",
    features: ["Collateral-free options", "High Loan Values", "Custom EMI plans"]
  },
  {
    title: "Home Loan",
    icon: <HomeIcon size={24} />,
    image: "/service_home_loan_premium_1776423819918.png",
    desc: "Acquire your dream property with the market's lowest interest rates. Our home loan experts guide you throughout the entire paperwork process.",
    features: ["Lowest ROI", "Balance Transfer available", "Tenure up to 30 years"]
  },
  {
    title: "Project Loan",
    icon: <Zap size={24} />,
    image: "/service_project_loan_premium_1776424045538.png",
    desc: "Specialized funding for large-scale industrial, commercial, and infrastructure developments. We understand project dynamics better than anyone.",
    features: ["Asset-based lending", "Structured Repayment", "Quick Evaluation"]
  },
  {
    title: "Loan Against Property",
    icon: <ShieldCheck size={24} />,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2070",
    desc: "Unlock the idle value of your residential or commercial property. Get maximum liquidity while retaining complete ownership.",
    features: ["Multi-purpose usage", "Lower Interest Rates", "Hassle-free process"]
  },
  {
    title: "Loan Takeover / BT",
    icon: <RefreshCw size={24} />,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2070",
    desc: "Transfer your high-interest existing loans to us and save on monthly EMIs. Reduce your financial burden with our Balance Transfer facility.",
    features: ["Reduced ROI", "Additional Top-up", "Zero hidden charges"]
  }
];

const Loans = () => {
  const navigate = useNavigate();

  const handleApply = (title) => {
    navigate("/apply-loan", { state: { service: title } });
  };

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-primary py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-bold tracking-[0.3em] uppercase block"
          >
            Our Portfolio
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white"
          >
            Elite Loan <span className="text-gradient">Portfolio</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-xl max-w-2xl mx-auto"
          >
            Tailored lending products designed to meet the sophisticated requirements of modern individuals and growing enterprises.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-premium rounded-[2.5rem] overflow-hidden group hover:bg-white/10 transition-all duration-500"
            >
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={s.image} 
                  alt={s.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-95"
                />
                <div className="absolute top-6 left-6 w-12 h-12 bg-accent text-primary rounded-2xl flex items-center justify-center shadow-lg">
                  {s.icon}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-bold">{s.title}</h3>
                <p className="text-text-secondary leading-relaxed line-clamp-3">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {s.features.map(f => (
                    <span key={f} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-accent">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <button 
                    onClick={() => handleApply(s.title)} 
                    className="flex items-center gap-2 text-accent font-bold hover:gap-3 transition-all outline-none"
                  >
                    Apply Now <ChevronRight size={18} />
                  </button>
                  <ArrowRight className="text-white/20 group-hover:text-accent transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-4 py-24 border-t border-white/5">
        <div className="glass-card-premium p-12 rounded-[3.5rem] grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              A Simplified Funding Experience <br />
              <span className="text-gradient">For Complex Needs</span>
            </h2>
            <div className="space-y-4">
              <p className="text-text-secondary text-lg">
                We eliminate the traditional bureaucracy associated with bank loans. Our digital-first approach ensures that your applications are processed with priority and speed.
              </p>
              <ul className="space-y-4">
                {['Direct access to lenders', 'Tailored EMI structure', 'Transparent fee structure'].map(item => (
                  <li key={item} className="flex items-center gap-3 font-semibold">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                      <ChevronRight size={14} className="text-accent" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/contact" className="btn-premium inline-flex w-auto mt-4">
              Get Your Custom Quote
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2074" 
              alt="Elite Financial Consultation" 
              className="relative z-10 rounded-[2.5rem] shadow-2xl brightness-95 hover:scale-[1.05] transition-all duration-700"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Loans;
