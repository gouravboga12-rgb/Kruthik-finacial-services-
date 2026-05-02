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
      <section className="bg-primary pt-36 pb-16 md:pt-48 md:pb-24 px-6 md:px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full -mr-48 -mt-48"></div>
        <div className="container max-w-4xl relative z-10 space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-bold tracking-[0.4em] uppercase block text-xs md:text-sm"
          >
            Contact Us
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-primary"
          >
            Get in Touch with <br className="hidden md:block" /> <span className="text-accent">Kruthik Financial Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We’re here to make your funding journey simple and stress-free. Whether you have questions about loans, need expert guidance, or want to apply, our team is ready to assist you.
          </motion.p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-12 md:py-24 bg-background flex justify-center">
        <div 
          className="px-6 md:px-12 w-full"
          style={{ maxWidth: '1200px' }}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start justify-center">
            
            {/* Left Column: Info Cards */}
            <div className="lg:col-span-1 space-y-8 md:space-y-12 flex flex-col items-center">
              <div className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                <h2 className="text-2xl md:text-4xl font-bold text-text-primary font-primary px-2">Contact Info</h2>
                
                <div className="w-full space-y-4 md:space-y-6">
                {[
                  { 
                    icon: <Phone size={24} />, 
                    title: "Phone", 
                    value: "+91 7026133444",
                    link: "https://wa.me/917026133444?text=Welcome%20to%20Kruthik%20Financial%20Services%20How%20can%20we%20assist%20you%20today%20with%20your%20financial%20needs%3F"
                  },
                  { 
                    icon: <Mail size={24} />, 
                    title: "Email", 
                    value: "kasireddykruthik@gmail.com",
                    link: "mailto:kasireddykruthik@gmail.com"
                  },
                  { 
                    icon: <MapPin size={24} />, 
                    title: "Location", 
                    value: "Financial District, Bangalore, India" 
                  }
                ].map((item, i) => (
                  <a 
                    key={item.title} 
                    href={item.link}
                    target={item.link?.startsWith('http') ? "_blank" : undefined}
                    rel={item.link?.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="flex gap-5 md:gap-6 items-center glass-card-premium rounded-[2.5rem] border-primary/5 hover:bg-primary/5 transition-all group w-full text-left"
                    style={{ padding: '28px' }}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] md:text-xs text-text-secondary font-bold uppercase tracking-widest mb-1">{item.title}</p>
                      <p className="text-lg md:text-xl text-text-primary truncate font-secondary font-normal">{item.value}</p>
                    </div>
                  </a>
                ))}
                </div>
              </div>

              {/* CIBIL CTA */}
              <div 
                className="glass-card-premium p-8 md:p-12 rounded-[2.5rem] border-accent/20 bg-accent/5 relative overflow-hidden group w-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl"></div>
                <div className="relative z-10 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
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
            <div className="lg:col-span-1 flex justify-center w-full">
              <div 
                className="glass-card-premium rounded-[2.5rem] md:rounded-[3.5rem] border-primary/10 shadow-2xl relative w-full"
                style={{ padding: '32px' }}
              >
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                    <div className="space-y-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary font-primary">Formal Inquiry</h3>
                      <p className="text-text-secondary text-sm md:text-base font-medium">Treating your financial protocol with absolute discretion.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Full Legal Name</label>
                        <input {...register("name", { required: true })} placeholder="John Doe" className="w-full bg-primary/5 border border-primary/10 rounded-xl md:rounded-2xl py-3.5 md:py-5 px-5 md:px-6 focus:border-primary outline-none transition-all text-text-primary font-bold text-sm md:text-base" />
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Secure Mobile</label>
                        <input {...register("phone", { required: true })} placeholder="+91 00000 00000" className="w-full bg-primary/5 border border-primary/10 rounded-xl md:rounded-2xl py-3.5 md:py-5 px-5 md:px-6 focus:border-primary outline-none transition-all text-text-primary font-bold text-sm md:text-base" />
                      </div>
                    </div>

                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Professional Email</label>
                      <input {...register("email", { required: true })} placeholder="official@company.com" className="w-full bg-primary/5 border border-primary/10 rounded-xl md:rounded-2xl py-3.5 md:py-5 px-5 md:px-6 focus:border-primary outline-none transition-all text-text-primary font-bold text-sm md:text-base" />
                    </div>

                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Loan Segment</label>
                      <select {...register("loanType")} className="w-full bg-primary/5 border border-primary/10 rounded-xl md:rounded-2xl py-3.5 md:py-5 px-5 md:px-6 focus:border-primary outline-none transition-all appearance-none cursor-pointer text-text-primary font-bold text-sm md:text-base">
                        <option value="Personal">Personal Loan</option>
                        <option value="Business">Business Loan</option>
                        <option value="Home">Home Loan</option>
                        <option value="Project">Project Loan</option>
                        <option value="LAP">Loan Against Property</option>
                        <option value="Takeover">Loan Takeover / BT</option>
                      </select>
                    </div>

                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Requirements</label>
                      <textarea rows="4" {...register("message")} placeholder="Describe your capital requirements..." className="w-full bg-primary/5 border border-primary/10 rounded-xl md:rounded-2xl p-5 md:p-6 focus:border-primary outline-none transition-all text-text-primary font-bold text-sm md:text-base"></textarea>
                    </div>

                    <button type="submit" className="w-full btn-premium py-4 md:py-5 text-base md:text-lg shadow-xl shadow-primary/20">
                      Transmit Formal Request <Send size={20} className="ml-2" />
                    </button>
                  </form>
                ) : (
                  <div className="py-16 md:py-24 text-center space-y-8">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                      <CheckCircle2 size={48} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl md:text-5xl font-bold font-primary text-primary">Thank you for contacting us.</h3>
                      <p className="text-text-secondary text-lg max-w-sm mx-auto leading-relaxed">
                        Your message has been successfully submitted. Our team will get back to you shortly.
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
