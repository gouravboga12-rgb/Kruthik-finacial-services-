import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Banknote,
  TrendingUp,
  User,
  Mail,
  Smartphone,
  Calendar,
  Wallet,
  ArrowLeft,
  Shield,
  Clock,
  Lock
} from "lucide-react";

const ApplyLoan = () => {
  const location = useLocation();
  const serviceTitle = location.state?.service || "Executive Loan";
  
  const [phase, setPhase] = useState("form"); // form, success
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const errors = {};

    // Strict Validations
    if (!/^[A-Za-z\s]+$/.test(data.name)) errors.name = "Letters only";
    if (!data.age || Number(data.age) < 18 || Number(data.age) > 100) errors.age = "Invalid Age (18+)";
    if (!data.income || Number(data.income) <= 0) errors.income = "Required";
    if (!data.requirement || Number(data.requirement) <= 0) errors.requirement = "Required";
    if (!data.cibil || Number(data.cibil) < 300 || Number(data.cibil) > 900) errors.cibil = "300 - 900 only";
    if (!/^[6-9]\d{9}$/.test(data.phone)) errors.phone = "Valid 10-digit required";
    if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Invalid Gmail/Email";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setFormErrors({});
      setPhase("success");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-white font-outfit">
      <AnimatePresence mode="wait">
        {phase === "form" ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container py-8 md:py-16 overflow-hidden"
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
              
              {/* Sidebar: Information */}
              <div className="lg:col-span-4 space-y-6 md:space-y-8 lg:sticky lg:top-32 order-2 lg:order-1">
                <div className="glass-card-premium p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border-white/5 space-y-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/20 rounded-xl md:rounded-2xl flex items-center justify-center text-accent">
                    <ShieldCheck size={32} className="md:w-10 md:h-10" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold font-playfair italic">Executive Protocol</h3>
                    <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                      Your application is prioritized by our senior lending board. All data is protected by bank-level 256-bit encryption.
                    </p>
                  </div>
                  
                  <div className="space-y-4 md:space-y-6 pt-6 md:pt-8 border-t border-white/5">
                    {[
                      { icon: <Shield size={18} />, title: "Bank-Grade Security", desc: "Digital verification" },
                      { icon: <Clock size={18} />, title: "Priority Queue", desc: "4hr response window" },
                      { icon: <CheckCircle2 size={18} />, title: "No CIBIL Impact", desc: "Confidential soft-pull" }
                    ].map(item => (
                      <div key={item.title} className="flex gap-4">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-accent shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-xs md:text-sm">{item.title}</h4>
                          <p className="text-text-secondary text-[10px] md:text-xs tracking-tighter">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main: Form */}
              <div className="lg:col-span-8 order-1 lg:order-2">
                <div className="glass-card-premium p-8 md:p-14 rounded-3xl md:rounded-[3.5rem] border-accent/20">
                  <div className="mb-10 md:mb-12">
                    <Link to="/loans" className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-[10px] md:text-xs hover:gap-3 transition-all mb-4">
                      <ArrowLeft size={14} /> Back to Loans
                    </Link>
                    <h2 className="text-3xl md:text-5xl font-bold font-playfair italic mb-3">Initialize <span className="text-gradient">Application</span></h2>
                    <p className="text-text-secondary text-sm md:text-base uppercase tracking-widest font-bold">
                      Service: <span className="text-white border-b border-accent/30">{serviceTitle}</span>
                    </p>
                  </div>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10" onSubmit={handleFormSubmit}>
                    {/* Name */}
                    <div className="space-y-3">
                      <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                        <User size={14} className="text-accent" /> Full Name
                      </label>
                      <input 
                        name="name" required placeholder="Legal Name" 
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '') }}
                        className={`w-full bg-white/5 border ${formErrors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl md:rounded-2xl py-4 md:py-5 px-6 focus:border-accent outline-none text-white font-bold transition-all`} 
                      />
                      {formErrors.name && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{formErrors.name}</p>}
                    </div>

                    {/* Age */}
                    <div className="space-y-3">
                      <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                        <Calendar size={14} className="text-accent" /> Age
                      </label>
                      <input 
                        name="age" type="number" required placeholder="18+" 
                        className={`w-full bg-white/5 border ${formErrors.age ? 'border-red-500/50' : 'border-white/10'} rounded-xl md:rounded-2xl py-4 md:py-5 px-6 focus:border-accent outline-none text-white font-bold transition-all`} 
                      />
                      {formErrors.age && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{formErrors.age}</p>}
                    </div>

                    {/* Income */}
                    <div className="space-y-3">
                      <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                        <Wallet size={14} className="text-accent" /> Monthly Income
                      </label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-accent font-bold md:text-lg">₹</span>
                        <input 
                          name="income" type="number" required placeholder="Monthly Salary" 
                          className={`w-full bg-white/5 border ${formErrors.income ? 'border-red-500/50' : 'border-white/10'} rounded-xl md:rounded-2xl py-4 md:py-5 pl-12 md:pl-14 pr-6 focus:border-accent outline-none text-white font-bold transition-all`} 
                        />
                      </div>
                    </div>

                    {/* Requirement */}
                    <div className="space-y-3">
                      <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                        <Banknote size={14} className="text-accent" /> Loan Requirement
                      </label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-accent font-bold md:text-lg">₹</span>
                        <input 
                          name="requirement" type="number" required placeholder="Loan Amount" 
                          className={`w-full bg-white/5 border ${formErrors.requirement ? 'border-red-500/50' : 'border-white/10'} rounded-xl md:rounded-2xl py-4 md:py-5 pl-12 md:pl-14 pr-6 focus:border-accent outline-none text-white font-bold transition-all`} 
                        />
                      </div>
                    </div>

                    {/* CIBIL */}
                    <div className="space-y-3">
                      <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                        <TrendingUp size={14} className="text-accent" /> CIBIL Score
                      </label>
                      <input 
                        name="cibil" type="number" required placeholder="300-900" 
                        className={`w-full bg-white/5 border ${formErrors.cibil ? 'border-red-500/50' : 'border-white/10'} rounded-xl md:rounded-2xl py-4 md:py-5 px-6 focus:border-accent outline-none text-white font-bold transition-all`} 
                      />
                      {formErrors.cibil && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{formErrors.cibil}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-3">
                      <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                        <Smartphone size={14} className="text-accent" /> Phone Number
                      </label>
                      <input 
                        name="phone" type="tel" required placeholder="10 Digits" maxLength={10}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                        className={`w-full bg-white/5 border ${formErrors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-xl md:rounded-2xl py-4 md:py-5 px-6 focus:border-accent outline-none text-white font-bold transition-all`} 
                      />
                      {formErrors.phone && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{formErrors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                        <Mail size={14} className="text-accent" /> Gmail / Email Address
                      </label>
                      <input 
                        name="email" type="email" required placeholder="official@email.com" 
                        className={`w-full bg-white/5 border ${formErrors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl md:rounded-2xl py-4 md:py-5 px-6 focus:border-accent outline-none text-white font-bold transition-all`} 
                      />
                      {formErrors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{formErrors.email}</p>}
                    </div>

                    <div className="md:col-span-2 pt-6 md:pt-10">
                      <button type="submit" className="w-full btn-premium py-5 md:py-6 text-lg md:text-2xl group shadow-2xl">
                         Initialize Application <ChevronRight size={32} className="group-hover:translate-x-2 transition-transform" />
                      </button>
                      <div className="flex items-center justify-center gap-3 mt-6 text-[10px] text-text-secondary font-bold uppercase tracking-[0.2em]">
                        <Lock size={12} className="text-accent" /> Secure AES-256 Bit Transmission
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-8 md:space-y-12 py-20 md:py-32 px-4"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-accent/20 rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center text-accent shadow-[0_0_50px_rgba(245,158,11,0.2)]">
              <CheckCircle2 size={48} className="md:w-16 md:h-16 animate-pulse" />
            </div>
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-3xl md:text-5xl font-bold font-playfair italic">Application Priority Secured</h3>
              <p className="text-text-secondary text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
                Your records for <span className="text-white font-black border-b border-accent/40">{serviceTitle}</span> have been ingested into our private ledger. An executive advisor will initiate contact within <span className="text-accent font-bold">4 business hours</span>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
              <Link to="/" className="btn-premium px-12 py-4 md:py-5 text-base md:text-lg">
                Back to Portfolio
              </Link>
              <Link to="/loans" className="px-12 py-4 md:py-5 text-base md:text-lg font-bold border border-white/10 rounded-2xl hover:bg-white/5 transition-all text-center">
                View More Loans
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Badges */}
      <section className="py-16 md:py-24 border-t border-white/5 bg-primary/20 mt-auto overflow-hidden">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6 md:gap-16 items-center opacity-40">
            {['Bank-Grade Security', 'Institutional Vault', 'High Fidelity Scanning', 'Instant Decisioning'].map(badge => (
              <div key={badge} className="flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">
                <ShieldCheck size={20} className="text-accent" /> {badge}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyLoan;
