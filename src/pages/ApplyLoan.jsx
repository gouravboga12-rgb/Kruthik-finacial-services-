import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { 
  X, 
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
  ArrowLeft
} from "lucide-react";

const ApplyLoan = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    <div className="pt-24 min-h-screen bg-background text-white font-outfit">
      {/* Hero Header */}
      <section className="bg-primary/50 py-20 px-4 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[130px] rounded-full -mr-24 -mt-24"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10 space-y-6">
          <Link 
            to="/loans" 
            className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all mb-4"
          >
            <ArrowLeft size={14} /> Back to Loans
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-playfair italic"
          >
            Loan <span className="text-gradient">Application</span>
          </motion.h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto uppercase tracking-widest font-medium">
            Applying for: <span className="text-white border-b border-accent/30">{serviceTitle}</span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {phase === "form" ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid lg:grid-cols-12 gap-12 items-start"
              >
                {/* Branding Sidebar */}
                <div className="lg:col-span-4 space-y-8 sticky top-32">
                  <div className="glass-card-premium p-10 rounded-[2.5rem] border-white/5 space-y-8">
                    <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                      <ShieldCheck size={32} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold font-playfair italic">Executive Protocol</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        Your application is prioritized by our senior lending board. All data is protected by bank-level 256-bit encryption.
                      </p>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-text-secondary opacity-70">
                        <CheckCircle2 size={16} className="text-accent" /> No CIBIL Impact
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-text-secondary opacity-70">
                        <CheckCircle2 size={16} className="text-accent" /> 4hr Decision Window
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Area */}
                <div className="lg:col-span-8">
                   <div className="glass-card-premium p-10 md:p-14 rounded-[3.5rem] border-accent/20 space-y-12">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white font-playfair">Information Disclosure</h3>
                        <p className="text-text-secondary text-sm">Please provide accurate financial credentials to expedite your approval.</p>
                      </div>

                      <form className="grid md:grid-cols-2 gap-10" onSubmit={handleFormSubmit}>
                        {/* Name */}
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                            <User size={12} className="text-accent" /> Full Name
                          </label>
                          <input 
                            name="name" required placeholder="Legal Name" 
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '') }}
                            className={`w-full bg-white/5 border ${formErrors.name ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-5 px-6 focus:border-accent outline-none text-white font-bold transition-all shadow-inner`} 
                          />
                          {formErrors.name && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-4">{formErrors.name}</p>}
                        </div>

                        {/* Age */}
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                            <Calendar size={12} className="text-accent" /> Age
                          </label>
                          <input 
                            name="age" type="number" required placeholder="18+" 
                            className={`w-full bg-white/5 border ${formErrors.age ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-5 px-6 focus:border-accent outline-none text-white font-bold transition-all shadow-inner`} 
                          />
                          {formErrors.age && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-4">{formErrors.age}</p>}
                        </div>

                        {/* Income */}
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                            <Wallet size={12} className="text-accent" /> Monthly Income
                          </label>
                          <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-accent font-bold text-lg">₹</span>
                            <input 
                              name="income" type="number" required placeholder="Income" 
                              className={`w-full bg-white/5 border ${formErrors.income ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-5 pl-12 pr-6 focus:border-accent outline-none text-white font-bold transition-all shadow-inner`} 
                            />
                          </div>
                        </div>

                        {/* Requirement */}
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                            <TrendingUp size={12} className="text-accent" /> Loan Requirement
                          </label>
                          <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-accent font-bold text-lg">₹</span>
                            <input 
                              name="requirement" type="number" required placeholder="Amount" 
                              className={`w-full bg-white/5 border ${formErrors.requirement ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-5 pl-12 pr-6 focus:border-accent outline-none text-white font-bold transition-all shadow-inner`} 
                            />
                          </div>
                        </div>

                        {/* CIBIL */}
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-accent" /> CIBIL Score
                          </label>
                          <input 
                            name="cibil" type="number" required placeholder="300-900" 
                            className={`w-full bg-white/5 border ${formErrors.cibil ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-5 px-6 focus:border-accent outline-none text-white font-bold transition-all shadow-inner`} 
                          />
                          {formErrors.cibil && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-4">{formErrors.cibil}</p>}
                        </div>

                        {/* Phone */}
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                            <Smartphone size={12} className="text-accent" /> Phone Number
                          </label>
                          <input 
                            name="phone" type="tel" required placeholder="10 Digits" maxLength={10}
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                            className={`w-full bg-white/5 border ${formErrors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-5 px-6 focus:border-accent outline-none text-white font-bold transition-all shadow-inner`} 
                          />
                          {formErrors.phone && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-4">{formErrors.phone}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                            <Mail size={12} className="text-accent" /> Gmail / Email
                          </label>
                          <input 
                            name="email" type="email" required placeholder="official@gmail.com" 
                            className={`w-full bg-white/5 border ${formErrors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-5 px-6 focus:border-accent outline-none text-white font-bold transition-all shadow-inner`} 
                          />
                          {formErrors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-4">{formErrors.email}</p>}
                        </div>

                        <div className="md:col-span-2 pt-10">
                          <button type="submit" className="w-full btn-premium py-6 text-2xl group shadow-2xl">
                             Initialize Application <ChevronRight size={32} className="group-hover:translate-x-2 transition-transform" />
                          </button>
                          <p className="text-center text-[10px] text-text-secondary mt-6 uppercase tracking-widest font-bold opacity-60">
                            By clicking initialize, you agree to our institutional lending disclosures.
                          </p>
                        </div>
                      </form>
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-12 py-32"
              >
                <div className="w-32 h-32 bg-accent/20 rounded-[3rem] flex items-center justify-center text-accent shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                  <CheckCircle2 size={72} className="animate-pulse" />
                </div>
                <div className="space-y-6">
                  <h3 className="text-5xl font-bold font-playfair italic">Application Priority Secured</h3>
                  <p className="text-text-secondary text-xl max-w-2xl mx-auto leading-relaxed">
                    Your records for <span className="text-white font-black border-b border-accent/40">{serviceTitle}</span> have been ingested into our private ledger. An executive advisor will initiate contact within <span className="text-accent font-bold">4 business hours</span>.
                  </p>
                </div>
                <div className="flex gap-6">
                  <Link to="/" className="btn-premium px-12 py-5 text-lg">
                    Back to Portfolio
                  </Link>
                  <Link to="/loans" className="px-12 py-5 text-lg font-bold border border-white/10 rounded-2xl hover:bg-white/5 transition-all">
                    View More Loans
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-24 border-t border-white/5 bg-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-16 items-center opacity-60">
            {['Bank-Grade Security', 'Institutional Vault', 'High Fidelity Scanning', 'Instant Decisioning'].map(badge => (
              <div key={badge} className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em]">
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
