import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  BarChart4,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Elite Lead Received:", data);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background font-secondary">
      {/* 1. Hero Header - Bold & Guaranteed Visible */}
      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-24 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full -mr-48 -mt-48"></div>
        <div className="container max-w-4xl relative z-10 space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-bold tracking-[0.4em] uppercase block text-xs md:text-sm"
          >
            Priority Concierge
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold text-white font-primary italic"
          >
            Begin Your <span className="text-accent">Elite Journey</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Connect with Kruthik's executive financial architects for a private consultation or get an instant eligibility scan.
          </motion.p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">
            
            {/* Left Column: Info Cards */}
            <div className="lg:col-span-5 space-y-8 md:space-y-12">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-4xl font-bold text-text-primary font-primary">Executive Channels</h2>
                
                {[
                  { 
                    icon: <Phone size={24} />, 
                    title: "Private Line", 
                    value: "+91 7026133444",
                    link: "https://wa.me/917026133444?text=Hello,%20I%20would%20like%20to%20request%20a%20private%20consultation."
                  },
                  { 
                    icon: <Mail size={24} />, 
                    title: "Secure Email", 
                    value: "kasireddykruthik@gmail.com",
                    link: "mailto:kasireddykruthik@gmail.com"
                  },
                  { 
                    icon: <MapPin size={24} />, 
                    title: "Global Hub", 
                    value: "Financial District, Bangalore, India" 
                  }
                ].map((item, i) => (
                  <a 
                    key={item.title} 
                    href={item.link}
                    data-aos="fade-right"
                    data-aos-delay={i * 100}
                    target={item.link?.startsWith('http') ? "_blank" : undefined}
                    rel={item.link?.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="flex gap-6 items-center p-6 md:p-8 glass-card-premium rounded-[2rem] border-primary/5 hover:bg-primary/5 transition-all group"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] md:text-xs text-text-secondary font-bold uppercase tracking-widest mb-1">{item.title}</p>
                      <p className="text-lg md:text-xl font-bold text-text-primary truncate font-primary">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* CIBIL CTA */}
              <div 
                data-aos="zoom-in"
                className="glass-card-premium p-8 md:p-12 rounded-[2.5rem] border-accent/20 bg-accent/5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl"></div>
                <div className="relative z-10 space-y-6">
                  <BarChart4 size={32} className="text-primary" />
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary font-primary">Check Your CIBIL Prestige</h3>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                    Our advanced scanner analyzes your credit history to unlock preferential lending rates.
                  </p>
                  <Link to="/cibil-score" className="btn-premium inline-flex py-3 px-8 text-sm">
                    Go to Scanner <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Formal Form */}
            <div className="lg:col-span-7" data-aos="fade-left">
              <div className="glass-card-premium p-8 md:p-14 rounded-[3rem] md:rounded-[4rem] border-primary/10 shadow-2xl relative">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-2" data-aos="fade-up">
                      <h3 className="text-2xl md:text-4xl font-bold text-text-primary font-primary">Formal Inquiry</h3>
                      <p className="text-text-secondary text-sm md:text-base italic font-medium">Treating your financial protocol with absolute discretion.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-secondary ml-2">Full Legal Name</label>
                        <input {...register("name", { required: true })} placeholder="John Doe" className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-4 md:py-5 px-6 focus:border-primary outline-none transition-all text-text-primary font-bold" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-secondary ml-2">Secure Mobile</label>
                        <input {...register("phone", { required: true })} placeholder="+91 00000 00000" className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-4 md:py-5 px-6 focus:border-primary outline-none transition-all text-text-primary font-bold" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-secondary ml-2">Professional Email</label>
                      <input {...register("email", { required: true })} placeholder="official@company.com" className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-4 md:py-5 px-6 focus:border-primary outline-none transition-all text-text-primary font-bold" />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-secondary ml-2">Loan Segment</label>
                      <select {...register("loanType")} className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-4 md:py-5 px-6 focus:border-primary outline-none transition-all appearance-none cursor-pointer text-text-primary font-bold">
                        <option value="Personal">Personal Loan</option>
                        <option value="Business">Business Loan</option>
                        <option value="Home">Home Loan</option>
                        <option value="Project">Project Loan</option>
                        <option value="LAP">Loan Against Property</option>
                        <option value="Takeover">Loan Takeover / BT</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-secondary ml-2">Requirements</label>
                      <textarea rows="4" {...register("message")} placeholder="Describe your capital requirements..." className="w-full bg-primary/5 border border-primary/10 rounded-2xl p-6 focus:border-primary outline-none transition-all text-text-primary font-bold"></textarea>
                    </div>

                    <button type="submit" className="w-full btn-premium py-5 text-lg shadow-xl shadow-primary/20">
                      Transmit Formal Request <Send size={20} className="ml-2" />
                    </button>
                  </form>
                ) : (
                  <div className="py-16 md:py-24 text-center space-y-8">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                      <CheckCircle2 size={48} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl md:text-5xl font-bold font-primary">Protocol Initiated</h3>
                      <p className="text-text-secondary text-lg max-w-sm mx-auto leading-relaxed">
                        Our executive architects will review your requirements and contact you within 4 business hours.
                      </p>
                    </div>
                    <button onClick={() => setIsSubmitted(false)} className="btn-outline-gold px-12 py-3">Submit New Protocol</button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
