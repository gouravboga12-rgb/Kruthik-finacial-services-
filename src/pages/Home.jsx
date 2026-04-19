import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Percent, 
  Clock, 
  ShieldCheck, 
  Users, 
  ChevronRight,
  TrendingUp,
  Banknote,
  Target,
  Eye,
  Award,
  Quote,
  GraduationCap,
  Briefcase,
  Building2,
  RefreshCw,
  Zap,
  Phone,
  Mail,
  MapPin,
  Send,
  AlertCircle,
  BarChart4,
  Home as HomeIcon,
  Calendar,
  PieChart
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Hero = () => {
  const heroImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070";
  
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Premium Finance" 
          className="w-full h-full object-cover brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent font-semibold text-sm">
            <TrendingUp size={16} />
            <span>India's Most Trusted Financial Partner</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Unlock Your <br />
            <span className="text-gradient">Financial Potential</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-lg leading-relaxed">
            Experience prestige banking with KRUTHIK FINANCIAL SERVICES. Instant approvals, tailor-made solutions, and elite service for your journey.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/cibil-score" className="btn-premium">
              Check Eligibility <ArrowRight size={20} />
            </Link>
            <Link to="/loans" className="btn-outline-gold">
              View All Loans
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full"></div>
          <div className="glass-card-premium p-10 rounded-[3rem] border-accent/20 relative overflow-hidden text-center space-y-8">
            <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center mx-auto text-accent">
              <TrendingUp size={40} />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">Priority Capital</h3>
              <p className="text-text-secondary leading-relaxed tracking-wide uppercase text-xs font-bold">
                Elite Interest Rates Starting @ 8.25%
              </p>
            </div>
            <Link to="/cibil-score" className="w-full btn-premium py-4 block">
              Analyze Your Eligibility
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const heritage = [
    { title: "Dhana Lakshmi Foundation", desc: "A legacy of personal finance empowerment." },
    { title: "Mahandra Capital", desc: "Strategic enterprise lending excellence." }
  ];

  const values = [
    { icon: <ShieldCheck size={28} />, title: "Unwavering Integrity", desc: "Absolute transparency in every transaction." },
    { icon: <Award size={28} />, title: "Elite Service", desc: "A white-glove experience for every client." },
    { icon: <Target size={28} />, title: "Precision Funding", desc: "Locating the exact capital structure for your needs." }
  ];

  return (
    <div className="bg-background">
      {/* Heritage */}
      <section className="py-24">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">A Foundation Built on <br />Trust and Performance</h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              With a combined heritage of over two decades, our founding entities recognized a gap in the market for sophisticated, responsive, and truly personalized lending solutions.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {heritage.map((item) => (
                <div key={item.title} className="glass-card-premium p-6 rounded-2xl border-l-4 border-l-accent">
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="relative" data-aos="fade-left">
            <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2078" 
              alt="Legacy Meeting" 
              className="relative z-10 rounded-[2.5rem] shadow-2xl brightness-90 transition-all duration-700 hover:scale-[1.02] w-full"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-primary/20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card-premium p-12 rounded-[3.5rem] space-y-6"
          >
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary">
              <Target size={32} />
            </div>
            <h3 className="text-3xl font-bold">Our Mission</h3>
            <p className="text-text-secondary text-lg leading-relaxed">
              To empower elite individuals and dynamic businesses by providing sophisticated financial instruments that fuel growth, foster stability, and unlock unprecedented opportunities.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card-premium p-12 rounded-[3.5rem] space-y-6 border-accent/20"
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-accent">
              <Eye size={32} />
            </div>
            <h3 className="text-3xl font-bold italic">Our Vision</h3>
            <p className="text-text-secondary text-lg leading-relaxed">
              To be recognized globally as India's premier boutique financial services firm, defined by our unwavering commitment to precision, integrity, and the enduring success of our clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Pillars of Kruthik</h2>
          <p className="text-text-secondary">Excellence is not an act, but a habit.</p>
        </div>
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-premium p-10 rounded-3xl text-center space-y-6 group"
            >
              <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                {v.icon}
              </div>
              <h4 className="text-2xl font-bold">{v.title}</h4>
              <p className="text-text-secondary">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const DirectorMessage = () => {
  return (
    <section className="py-24 bg-primary/30 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto glass-card-premium rounded-[4rem] overflow-hidden border-accent/20">
          <div className="grid lg:grid-cols-5 items-stretch">
            <div className="lg:col-span-2 bg-white/5 p-10 md:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold uppercase tracking-tight text-white font-playfair italic">Kruthik Reddy</h2>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.2em] text-xs">
                      <Briefcase size={16} /> COO & Director
                    </div>
                    <div className="flex items-center gap-3 text-text-secondary text-xs font-bold uppercase tracking-[0.2em]">
                      <GraduationCap size={16} /> B.SC Computer
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-10 mt-10 border-t border-white/10">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-text-secondary mb-2">Expertise</p>
                <p className="text-2xl font-black text-white">15+ Years</p>
                <p className="text-xs text-text-secondary uppercase tracking-widest">Industry Experience</p>
              </div>
            </div>
            <div className="lg:col-span-3 p-10 md:p-14 relative flex flex-col justify-center">
              <div className="absolute top-10 right-10 opacity-10">
                <Quote size={120} className="rotate-180" />
              </div>
              <h3 className="text-3xl font-bold mb-8 italic">Director's Message</h3>
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                <p>With over 15 years of experience in the industry, we have built a strong foundation in providing reliable and customer-focused financial solutions. Our goal is to simplify the loan process by offering the right guidance, transparent communication, and quick turnaround times.</p>
                <p>We continuously strive to deliver the best services and build long-term relationships with our clients.</p>
              </div>
              <div className="pt-8 border-t border-white/10">
                <p className="text-accent font-bold uppercase tracking-widest text-sm">— Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

};

const LoanPortfolio = () => {
  const navigate = useNavigate();
  const services = [
    {
      title: "Personal Loan",
      icon: <Banknote size={24} />,
      image: "/service_personal_loan_premium_1776423994502.png",
      desc: "Achieve your personal goals with our swift and transparent solutions.",
      features: ["Fast Disbursement", "Flexible Tenure"]
    },
    {
      title: "Business Loan",
      icon: <Building2 size={24} />,
      image: "/service_business_loan_premium_1776423907771.png",
      desc: "Empower your enterprise with strategic capital and competitive rates.",
      features: ["High Loan Values", "Custom EMI plans"]
    },
    {
      title: "Home Loan",
      icon: <HomeIcon size={24} />,
      image: "/service_home_loan_premium_1776423819918.png",
      desc: "Acquire your dream property with market's lowest interest rates.",
      features: ["Lowest ROI", "Tenure up to 30 years"]
    },
    {
      title: "Loan Against Property",
      icon: <ShieldCheck size={24} />,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2070",
      desc: "Unlock the value of your property with maximum liquidity.",
      features: ["Lower Interest Rates", "Hassle-free process"]
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Elite Loan Portfolio</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">Tailored lending products designed for sophisticated requirements.</p>
      </div>
      <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-premium rounded-[2.5rem] overflow-hidden group hover:bg-white/10 transition-all duration-500"
          >
            <div className="h-48 relative overflow-hidden">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-95" />
              <div className="absolute top-4 left-4 w-10 h-10 bg-accent text-primary rounded-xl flex items-center justify-center shadow-lg">
                {s.icon}
              </div>
            </div>
            <div className="p-8 space-y-4">
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="text-text-secondary text-sm line-clamp-2">{s.desc}</p>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <button onClick={() => navigate("/loans")} className="flex items-center gap-2 text-accent font-bold text-sm hover:gap-3 transition-all">
                  Explore <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const EMICalculatorSection = () => {
  const [amount, setAmount] = useState(2500000);
  const [interest, setInterest] = useState(10.5);
  const [tenure, setTenure] = useState(120);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    const r = interest / 12 / 100;
    const n = tenure;
    const emiValue = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(Math.round(emiValue) || 0);
  }, [amount, interest, tenure]);

  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - amount;

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">EMI <span className="text-gradient">Navigator</span></h2>
        <p className="text-text-secondary max-w-2xl mx-auto">Precision engineering for your financial future. Calculate your installments with our executive-grade planning tool.</p>
      </div>
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Controls */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-12">
          <div className="glass-card-premium p-10 md:p-14 rounded-[3rem] border-white/5 space-y-12 text-white">
            
            {/* Loan Amount */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                <label className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm">
                  <Banknote size={20} className="text-accent" /> Loan Amount
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-accent font-bold">₹</span>
                  <input 
                    type="number" 
                    value={amount}
                    min={2000}
                    max={10000000}
                    onChange={(e) => {
                      const val = Math.min(10000000, Math.max(0, Number(e.target.value)));
                      setAmount(val);
                    }}
                    onBlur={() => {
                      if (amount < 2000) setAmount(2000);
                    }}
                    className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-6 w-full md:w-56 text-right font-black text-white text-xl focus:border-accent outline-none transition-all" 
                  />
                </div>
              </div>
              <input 
                type="range"
                min="2000"
                max="10000000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em]">
                <span>₹ 2,000</span>
                <span>1 Crore</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                <label className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm">
                  <Percent size={20} className="text-accent" /> Interest Rate
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={interest}
                    step="0.1"
                    min={1}
                    max={30}
                    onChange={(e) => {
                      const val = Math.min(30, Math.max(0, Number(e.target.value)));
                      setInterest(val);
                    }}
                    onBlur={() => {
                      if (interest < 1) setInterest(1);
                    }}
                    className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-12 w-full md:w-40 text-right font-black text-white text-xl focus:border-accent outline-none transition-all" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-accent font-bold">%</span>
                </div>
              </div>
              <input 
                type="range"
                min="8"
                max="24"
                step="0.1"
                value={interest}
                onChange={(e) => setInterest(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em]">
                <span>8%</span>
                <span>24%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                <label className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm">
                  <Calendar size={20} className="text-accent" /> Tenure (Months)
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={tenure}
                    min={12}
                    max={360}
                    onChange={(e) => {
                      const val = Math.min(360, Math.max(0, Number(e.target.value)));
                      setTenure(val);
                    }}
                    onBlur={() => {
                      if (tenure < 12) setTenure(12);
                    }}
                    className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-28 w-full md:w-52 text-right font-black text-white text-xl focus:border-accent outline-none transition-all" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-accent/50 text-xs font-bold tracking-widest">MONTHS</span>
                </div>
              </div>
              <input 
                type="range"
                min="12"
                max="360"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em]">
                <span>12 Months</span>
                <span>360 Months</span>
              </div>
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card-premium p-10 rounded-3xl border-white/5 flex gap-8 items-center text-white">
              <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center text-accent shrink-0">
                <TrendingUp size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Lowest Market Rates</h4>
                <p className="text-text-secondary text-sm">Starting at 8.75% for HNW individuals.</p>
              </div>
            </div>
            <div className="glass-card-premium p-10 rounded-3xl border-white/5 flex gap-8 items-center text-white">
              <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center text-accent shrink-0">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Instant Discretion</h4>
                <p className="text-text-secondary text-sm">Approvals within 4 business hours.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="lg:col-span-12 xl:col-span-5 sticky top-32">
          <motion.div 
            className="glass-card-premium p-6 md:p-10 rounded-[2.5rem] border-accent/20 bg-gradient-to-b from-white/10 to-transparent relative overflow-hidden text-white shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl"></div>
            
            <div className="space-y-6 relative z-10">
              <div className="text-center">
                <p className="text-text-secondary uppercase font-bold tracking-[0.4em] text-xs mb-3">Estimated Monthly EMI</p>
                <h3 className="text-5xl md:text-6xl font-black text-accent drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  ₹ {emi.toLocaleString()}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-text-secondary font-bold text-sm">Principal Amount</span>
                  <span className="font-bold">₹ {amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-text-secondary font-bold text-sm">Total Interest</span>
                  <span className="font-bold text-accent">₹ {totalInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-6 bg-accent text-primary rounded-3xl font-black text-xl shadow-lg">
                  <span>Total Cost</span>
                  <span>₹ {totalPayment.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/cibil-score" className="w-full btn-premium py-5 group text-lg">
                  Initialize Application <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
                </Link>
              </div>
              
              <p className="text-center text-[10px] text-text-secondary font-bold uppercase tracking-[0.3em] opacity-50">
                *Indicative values based on current market trends
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log("Lead Received:", data);
    setIsSubmitted(true);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
          <div>
            <h2 className="text-4xl font-bold mb-8">Executive Channels</h2>
            <div className="space-y-6">
              {[
                { icon: <Phone size={20} />, title: "Private Line", value: "+91 7026133444" },
                { icon: <Mail size={20} />, title: "Secure Email", value: "SUPPORT@SUREKILL.CO.IN" },
                { icon: <MapPin size={20} />, title: "Hub", value: "Financial District, Bangalore" }
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-center p-6 glass-card-premium rounded-3xl hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">{item.icon}</div>
                  <div>
                    <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{item.title}</p>
                    <p className="text-lg font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card-premium p-8 rounded-[2.5rem] border-accent/20">
            <h3 className="text-xl font-bold mb-4">Check Your CIBIL Prestige</h3>
            <p className="text-text-secondary mb-6 text-sm">Our advanced scanner analyzes your history to unlock preferential rates.</p>
            <Link to="/cibil-score" className="text-accent font-bold flex items-center gap-2">Scanner <ChevronRight size={16} /></Link>
          </div>
        </div>
        <div className="glass-card-premium p-10 md:p-14 rounded-[3.5rem]">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h3 className="text-3xl font-bold mb-2">Formal Inquiry</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input {...register("name", { required: true })} placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent" />
                <input {...register("phone", { required: true })} placeholder="Phone" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent" />
              </div>
              <input {...register("email", { required: true })} placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent" />
              <textarea rows="4" placeholder="Requirements..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-accent"></textarea>
              <button type="submit" className="w-full btn-premium">Submit Formal Request <Send size={18} /></button>
            </form>
          ) : (
            <div className="text-center py-20 space-y-6">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent mx-auto"><CheckCircle2 size={40} /></div>
              <h3 className="text-3xl font-bold">Inquiry Sent</h3>
              <p className="text-text-secondary">We will contact you within 4 business hours.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ProcessSteps = () => {
  const steps = [
    { num: "01", title: "Check Eligibility", desc: "Submit basic details online in 2 minutes." },
    { num: "02", title: "Instant Approval", desc: "Get your loan processed within 24 hours." },
    { num: "03", title: "Get Funds", desc: "Digital verification and direct disbursement." },
  ];

  return (
    <section className="py-24 bg-primary/20">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-white">Our Streamlined Execution</h2>
        <p className="text-text-secondary">From application to disbursement in record time.</p>
      </div>
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12">
        {steps.map((step, i) => (
          <div key={step.num} className="relative group" data-aos="fade-up" data-aos-delay={i * 200}>
            <div className="text-8xl font-black text-white/5 absolute -top-12 left-0 group-hover:text-accent/10 transition-colors">
              {step.num}
            </div>
            <div className="relative z-10 pt-8">
              <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { name: 'Rajesh K.', location: 'Bangalore', text: 'Elite service. The turnaround time for my business capital was exceptional.', loan: 'Business Loan' },
    { name: 'Priya S.', location: 'Hyderabad', text: 'Transformative experience. They understood my complex requirements immediately.', loan: 'Home Loan' },
    { name: 'Anil M.', location: 'Chennai', text: 'Absolute transparency and prestige. Highly recommended for HNW individuals.', loan: 'Loan Takeover' },
  ];

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Executive Testimonials</h2>
        <p className="text-text-secondary">Voices of our esteemed clientele.</p>
      </div>
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-white">
        {testimonials.map((t, i) => (
          <div key={t.name}
            className="glass-card-premium p-8 rounded-3xl border border-white/5"
            data-aos="fade-up" data-aos-delay={i * 100}>
            <p className="text-text-secondary italic leading-relaxed mb-8">"{t.text}"</p>
            <div className="flex items-center justify-between border-t border-white/5 pt-6">
              <div>
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-text-secondary text-xs uppercase tracking-tighter">{t.location}</p>
              </div>
              <div className="text-right">
                <p className="text-accent font-bold text-xs uppercase tracking-widest">{t.loan}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="glass-card-premium rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-3xl rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-white">
              Ready to Experience <br /><span className="text-gradient">Premium Lending?</span>
            </h2>
            <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
              Join our network of elite clients and unlock financial opportunities you never thought possible.
            </p>
            <div className="flex flex-center justify-center gap-4 flex-wrap">
              <Link to="/contact" className="btn-premium px-12">
                Apply for Your Priority Loan
              </Link>
              <a href="tel:7026133444" className="btn-outline-gold flex items-center gap-2">
                Talk to an Expert
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <AboutSection />
      <DirectorMessage />
      <LoanPortfolio />
      <EMICalculatorSection />
      <ProcessSteps />
      <Testimonials />
      <ContactSection />
      <FinalCTA />
    </div>
  );
};

export default Home;
