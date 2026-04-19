import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  BarChart4,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Elite Lead Received:", data);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary/50 py-16 md:py-24 px-4 border-b border-white/5 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full -mr-64 -mt-64"></div>
        <div className="container max-w-5xl text-center relative z-10 space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-bold tracking-[0.4em] uppercase block"
          >
            Priority Concierge
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold"
          >
            Begin Your <span className="text-gradient">Elite Journey</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-xl max-w-2xl mx-auto"
          >
            Reach out to our executive financial architects for a private consultation or get a rapid eligibility scan.
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Information & CTAs */}
          <div className="space-y-12">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold mb-8">Executive Channels</h2>
              <div className="space-y-6">
                {[
                  { icon: <Phone size={24} />, title: "Private Line", value: "+91 7026133444" },
                  { icon: <Mail size={24} />, title: "Secure Email", value: "SUPPORT@SUREKILL.CO.IN" },
                  { icon: <MapPin size={24} />, title: "Global Hub", value: "Financial District, Bangalore, India" }
                ].map((item) => (
                  <div key={item.title} className="flex gap-6 items-center p-6 glass-card-premium rounded-3xl hover:bg-white/10 transition-all border-accent/10">
                    <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary font-bold uppercase tracking-widest">{item.title}</p>
                      <p className="text-xl font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Link to CIBIL Score Page */}
            <div 
              className="glass-card-premium p-10 rounded-[3rem] border-accent/20 relative overflow-hidden group cursor-pointer"
              data-aos="zoom-in"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl"></div>
              <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                  <BarChart4 size={24} />
                </div>
                <h3 className="text-2xl font-bold">Check Your CIBIL Prestige</h3>
                <p className="text-text-secondary">
                  Our advanced eligibility scanner is now available on a dedicated page for a more comprehensive analysis.
                </p>
                <Link 
                  to="/cibil-score" 
                  className="inline-flex items-center gap-2 text-accent font-bold hover:gap-3 transition-all"
                >
                  Go to CIBIL Scanner <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card-premium p-10 md:p-14 rounded-[3.5rem] relative" data-aos="fade-left">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold">Formal Inquiry</h3>
                  <p className="text-text-secondary">All inquiries are treated with absolute discretion.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Full Name</label>
                    <input 
                      {...register("name", { 
                        required: "Required",
                        pattern: { value: /^[A-Za-z\s]+$/, message: "Letters only" }
                      })}
                      placeholder="Enter legal name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-accent focus:bg-white/10 outline-none transition-all" 
                    />
                    {errors.name && <span className="text-red-400 text-[10px] flex items-center gap-1 mt-1 font-bold uppercase tracking-widest"><AlertCircle size={10}/> {errors.name.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Private Mobile</label>
                    <input 
                      {...register("phone", { 
                        required: "Required",
                        pattern: { value: /^[6-9]\d{9}$/, message: "Valid 10-digit number only" }
                      })}
                      placeholder="9876543210"
                      maxLength={10}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-accent focus:bg-white/10 outline-none transition-all" 
                    />
                    {errors.phone && <span className="text-red-400 text-[10px] flex items-center gap-1 mt-1 font-bold uppercase tracking-widest"><AlertCircle size={10}/> {errors.phone.message}</span>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Secure Email</label>
                  <input 
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    placeholder="name@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-accent focus:bg-white/10 outline-none transition-all" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Service Segment</label>
                  <select 
                    {...register("loan_type")}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-accent focus:bg-white/10 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="Personal" className="bg-primary text-white">Personal Loan</option>
                    <option value="Business" className="bg-primary text-white">Business Loan</option>
                    <option value="Home" className="bg-primary text-white">Home Loan</option>
                    <option value="Project" className="bg-primary text-white">Project Loan</option>
                    <option value="LAP" className="bg-primary text-white">Loan Against Property</option>
                    <option value="Takeover" className="bg-primary text-white">Loan Takeover / BT</option>
                    <option value="Other" className="bg-primary text-white">Others</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Specific Requirements</label>
                  <textarea 
                    {...register("message")}
                    rows="4" 
                    placeholder="Briefly describe your funding objectives..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-accent focus:bg-white/10 outline-none transition-all"
                  ></textarea>
                </div>

                <button type="submit" className="w-full btn-premium">
                  Submit Formal Request <Send size={18} className="rotate-45" />
                </button>

                <div className="flex items-center justify-center gap-4 pt-2 opacity-50">
                  <ShieldCheck size={16} className="text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encryption Secured</span>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-8 py-10"
              >
                <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-accent mb-4">
                  <CheckCircle2 size={48} className="animate-pulse" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold">Inquiry Transmitted</h3>
                  <p className="text-text-secondary max-w-sm mx-auto leading-relaxed">
                    Our executive financial architect will review your protocol and contact you within 4 business hours for a private consultation.
                  </p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="btn-outline-gold px-10"
                >
                  New Application
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
