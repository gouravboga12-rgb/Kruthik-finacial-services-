import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  User,
  Mail,
  Smartphone,
  Briefcase,
  Lock,
  ArrowRight,
  HelpCircle,
  TrendingUp,
  Building,
  Calculator,
  UserPlus
} from "lucide-react";

const BecomePartner = () => {
  const [phase, setPhase] = useState("form");
  const [formErrors, setFormErrors] = useState({});
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const errors = {};

    if (!/^[A-Za-z\s]+$/.test(data.name)) errors.name = "Letters only";
    if (!/^[6-9]\d{9}$/.test(data.phone)) errors.phone = "Valid 10-digit required";
    if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Invalid Email";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setPhase("success");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const professions = [
    { icon: <Building size={24} />, title: "Ex-Banker" },
    { icon: <TrendingUp size={24} />, title: "Mutual Fund Agent" },
    { icon: <Calculator size={24} />, title: "Chartered Accountant" },
    { icon: <Briefcase size={24} />, title: "Builder" },
    { icon: <ShieldCheck size={24} />, title: "Civil Engineer" }
  ];

  const faqs = [
    {
      q: "Who can become a partner with Kruthik Financial Services?",
      a: "Anyone such as ex-bankers, CAs, mutual fund agents, real estate professionals, or individuals with good customer networks can join our partner program."
    },
    {
      q: "What are the benefits of becoming a partner?",
      a: "You gain access to a wide range of financial products, competitive payout structures, dedicated relationship manager support, and a transparent tracking system for all your leads."
    },
    {
      q: "Is there any registration fee for becoming a partner?",
      a: "No, joining our elite partner program is completely free of charge. There are no hidden fees or deposits required."
    },
    {
      q: "Do I need prior loan or finance experience?",
      a: "While prior experience in the financial sector is highly beneficial, it is not strictly required. We provide necessary guidance and support for driven individuals."
    },
    {
      q: "How much commission can a partner earn?",
      a: "Earnings are highly competitive, uncapped, and scale with the volume and type of loans successfully disbursed through your elite referrals."
    },
    {
      q: "How does the lead submission process work?",
      a: "Partners can submit leads directly through our secure online channels or directly to their dedicated executive relationship manager for priority processing."
    },
    {
      q: "What documents are required to join as a partner?",
      a: "Standard KYC documents (Aadhaar, PAN), bank account details for commission payouts, and professional proof/credentials (if applicable)."
    },
    {
      q: "How soon can I start earning after joining?",
      a: "You can start submitting leads immediately after your onboarding is complete. Payouts are processed swiftly upon the successful disbursement of the loan."
    },
    {
      q: "Is this partnership available across India?",
      a: "Yes, our digital processes and extensive network allow partners from any location across the country to submit leads and earn."
    },
    {
      q: "How can I apply to become a partner?",
      a: "Simply fill out the partnership inquiry form on this page with your details, and our executive team will get in touch with you to initiate the onboarding protocol."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary font-secondary">
      {/* Hero Section */}
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full -mr-48 -mt-48"></div>
        <div className="container max-w-4xl relative z-10 space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-bold tracking-[0.4em] uppercase block text-xs md:text-sm"
          >
            Elite Partnership
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-primary italic"
          >
            Become A <span className="text-accent">Partner</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Enhance your professional status. Fire up your entrepreneurial instincts and drive into victory with Kruthik Financial Services.
          </motion.p>
        </div>
      </section>

      <div className="container py-12 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main Form Area */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              {phase === "form" ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card-premium p-8 md:p-12 rounded-3xl md:rounded-[3.5rem] border-primary/20 shadow-xl"
                >
                  <div className="mb-10">
                    <h2 className="text-2xl md:text-4xl font-bold font-primary italic mb-3 text-text-primary">
                      Partnership <span className="text-gradient">Application</span>
                    </h2>
                    <p className="text-text-secondary text-sm md:text-base uppercase tracking-widest font-bold">
                      Initialize <span className="text-primary border-b border-primary/30">Protocol</span>
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    {/* Name */}
                    <div className="space-y-3">
                      <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                        <User size={14} className="text-primary" /> Full Name
                      </label>
                      <input 
                        name="name" required placeholder="Your Legal Name" 
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '') }}
                        className={`w-full bg-primary/5 border ${formErrors.name ? 'border-red-500/50' : 'border-primary/10'} rounded-xl md:rounded-2xl py-4 px-6 focus:border-primary outline-none text-text-primary font-bold transition-all placeholder:text-text-secondary/50`} 
                      />
                      {formErrors.name && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{formErrors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="space-y-3">
                        <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                          <Smartphone size={14} className="text-primary" /> Phone Number
                        </label>
                        <input 
                          name="phone" type="tel" required placeholder="10 Digits" maxLength={10}
                          onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                          className={`w-full bg-primary/5 border ${formErrors.phone ? 'border-red-500/50' : 'border-primary/10'} rounded-xl md:rounded-2xl py-4 px-6 focus:border-primary outline-none text-text-primary font-bold transition-all placeholder:text-text-secondary/50`} 
                        />
                        {formErrors.phone && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{formErrors.phone}</p>}
                      </div>

                      {/* Email */}
                      <div className="space-y-3">
                        <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                          <Mail size={14} className="text-primary" /> Email Address
                        </label>
                        <input 
                          name="email" type="email" required placeholder="official@email.com" 
                          className={`w-full bg-primary/5 border ${formErrors.email ? 'border-red-500/50' : 'border-primary/10'} rounded-xl md:rounded-2xl py-4 px-6 focus:border-primary outline-none text-text-primary font-bold transition-all placeholder:text-text-secondary/50`} 
                        />
                        {formErrors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{formErrors.email}</p>}
                      </div>
                    </div>

                    {/* Profession */}
                    <div className="space-y-3">
                      <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                        <Briefcase size={14} className="text-primary" /> Current Profession
                      </label>
                      <select 
                        name="profession" required
                        className="w-full bg-primary/5 border border-primary/10 rounded-xl md:rounded-2xl py-4 px-6 focus:border-primary outline-none text-text-primary font-bold transition-all appearance-none cursor-pointer"
                      >
                        <option value="Ex-Banker">Ex-Banker</option>
                        <option value="Mutual Fund Agent">Mutual Fund Agent</option>
                        <option value="Chartered Accountant">Chartered Accountant</option>
                        <option value="Builder">Builder</option>
                        <option value="Civil Engineer">Civil Engineer</option>
                        <option value="Real Estate Professional">Real Estate Professional</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="pt-6">
                      <button type="submit" className="w-full btn-premium py-5 md:py-6 text-lg group shadow-2xl">
                        Submit Application <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                      </button>
                      <div className="flex items-center justify-center gap-3 mt-6 text-[10px] text-text-secondary font-bold uppercase tracking-[0.2em]">
                        <Lock size={12} className="text-primary" /> Secure Transmission
                      </div>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="glass-card-premium p-12 md:p-20 rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-8"
                >
                  <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary shadow-[0_0_50px_rgba(6,95,70,0.1)]">
                    <CheckCircle2 size={48} className="animate-pulse" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-4xl font-bold font-primary italic text-text-primary">Application Received</h3>
                    <p className="text-text-secondary text-base md:text-lg max-w-md mx-auto leading-relaxed">
                      Your partnership request has been logged. An executive will contact you shortly to complete the onboarding protocol.
                    </p>
                  </div>
                  <button onClick={() => setPhase("form")} className="btn-outline-gold px-10 py-3 mt-4">
                    Submit Another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-8">
            <div className="glass-card-premium p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border-primary/10">
              <h3 className="text-xl md:text-2xl font-bold font-primary italic text-text-primary mb-6">Who Can Become A Partner?</h3>
              <p className="text-text-secondary mb-8 text-sm md:text-base">
                Professionals with strong networks can significantly elevate their earning potential with us.
              </p>
              
              <div className="space-y-4">
                {professions.map((prof, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-5 p-4 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/5"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                      {prof.icon}
                    </div>
                    <span className="font-bold text-text-primary md:text-lg">{prof.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="glass-card-premium p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border-accent/20 bg-accent/5">
              <div className="flex items-center gap-4 mb-4">
                <UserPlus size={28} className="text-primary" />
                <h3 className="text-xl font-bold font-primary text-text-primary">Why Partner With Us?</h3>
              </div>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                Join an elite network of financial facilitators. Benefit from our robust digital infrastructure, high approval rates, and swift payout cycles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-primary italic text-text-primary mb-4">Frequently Asked <span className="text-gradient">Questions</span></h2>
            <p className="text-text-secondary uppercase tracking-widest font-bold text-xs md:text-sm">Partnership Details</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`glass-card-premium rounded-2xl md:rounded-3xl border transition-all duration-300 overflow-hidden cursor-pointer ${openFaq === index ? 'border-primary/30 shadow-lg' : 'border-primary/10 hover:border-primary/20'}`}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              >
                <div className="p-6 md:p-8 flex justify-between items-center gap-4">
                  <h4 className="font-bold text-text-primary text-sm md:text-base pr-8">{index + 1}. {faq.q}</h4>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${openFaq === index ? 'bg-primary text-white rotate-180' : 'bg-primary/10 text-primary'}`}>
                    <ChevronRight size={18} className="transform rotate-90" />
                  </div>
                </div>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 md:p-8 pt-0 text-text-secondary text-sm md:text-base leading-relaxed border-t border-primary/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomePartner;
