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

import businessLoanImg from "../assets/images/Businessloan.png";
import homeLoanImg from "../assets/images/Homeloan.png";
import lapImg from "../assets/images/LoanAgainstProperty.png";
import projectLoanImg from "../assets/images/Projectloan.png";

// Partner Logos
import tataLogo from "../assets/partners/tata.png";
import sbiLogo from "../assets/partners/sbi.png";
import shriramLogo from "../assets/partners/shriram.png";
import southIndianLogo from "../assets/partners/south_indian.png";
import vastuLogo from "../assets/partners/vastu.png";
import ltLogo from "../assets/partners/lt.png";
import adityaBirlaLogo from "../assets/partners/aditya_birla.png";
import heroLogo from "../assets/partners/hero.png";
import flexiLogo from "../assets/partners/flexi.png";
import licLogo from "../assets/partners/lic.png";
import dhflLogo from "../assets/partners/dhfl.png";
import equitasLogo from "../assets/partners/equitas.png";
import hdbLogo from "../assets/partners/hdb.png";
import edelweissLogo from "../assets/partners/edelweiss.png";
import lendingkartLogo from "../assets/partners/lendingkart.png";
import firstCapitalLogo from "../assets/partners/first_capital.png";

const Hero = () => {
  const heroImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070";

  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 md:pt-32 overflow-hidden font-secondary">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Premium Finance"
          className="w-full h-full object-cover brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } }
          }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm">
            <TrendingUp size={16} />
            <span>India's Most Trusted Financial Partner</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold leading-tight text-text-primary font-primary">
            {"Unlock Your Financial Potential".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: index * 0.05 }}
              >
                {char === " " ? "\u00A0" : char}
                {index === 10 && <br />}
              </motion.span>
            ))}
          </h1>

          <p className="text-lg md:text-lg text-text-secondary max-w-md leading-relaxed border-l-4 border-accent pl-6 py-1 font-medium italic">
            {"Experience prestige banking with KRUTHIK FINANCIAL SERVICES. Instant approvals, tailor-made solutions, and elite service for your journey.".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.01, delay: 1.5 + (index * 0.01) }}
              >
                {char}
              </motion.span>
            ))}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/cibil-score" className="btn-premium">
              Check Eligibility <ArrowRight size={20} />
            </Link>
            <Link to="/loans" className="btn-outline-gold">
              View All Loans
            </Link>
          </motion.div>
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
              <h3 className="text-3xl font-bold font-primary">Priority Capital</h3>
              <p className="text-text-secondary leading-relaxed tracking-wide uppercase text-xs font-bold">
                Elite Interest Rates Starting @ 7.5%
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
    <div className="bg-background font-secondary">
      {/* Heritage */}
      <section id="about" className="py-12 md:py-16 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              data-aos="fade-right"
              className="space-y-6 md:space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-primary">A Foundation Built on <br className="hidden md:block" />Trust and Performance</h2>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                With a combined heritage of over two decades, our founding entities recognized a gap in the market for sophisticated, responsive, and truly personalized lending solutions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {heritage.map((item) => (
                  <div key={item.title} data-aos="zoom-in" className="glass-card-premium p-6 rounded-2xl border-l-4 border-l-accent">
                    <h4 className="font-bold text-lg mb-2 font-primary">{item.title}</h4>
                    <p className="text-sm text-text-secondary">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative order-first lg:order-last" data-aos="fade-left">
              <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full"></div>
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2078"
                alt="Legacy Meeting"
                className="relative z-10 rounded-3xl md:rounded-[2.5rem] shadow-2xl brightness-90 transition-all duration-700 hover:scale-[1.02] w-full aspect-video md:aspect-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 bg-primary/20 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              data-aos="fade-up"
              whileHover={{ y: -10 }}
              className="glass-card-premium p-8 md:p-12 rounded-3xl md:rounded-[3.5rem] space-y-4 md:space-y-6 border-primary/10"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-accent rounded-xl md:rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Target size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-primary">Our Mission</h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                To empower elite individuals and dynamic businesses by providing sophisticated financial instruments that fuel growth, foster stability, and unlock unprecedented opportunities.
              </p>
            </motion.div>

            <motion.div
              data-aos="fade-up"
              data-aos-delay="200"
              whileHover={{ y: -10 }}
              className="glass-card-premium p-8 md:p-12 rounded-3xl md:rounded-[3.5rem] space-y-4 md:space-y-6 border-accent/20"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-accent shrink-0">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold italic font-primary">Our Vision</h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                To be recognized globally as India's premier boutique financial services firm, defined by our unwavering commitment to precision, integrity, and the enduring success of our clients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 overflow-hidden">
        <div className="container text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary font-primary" data-aos="fade-down">The Pillars of Kruthik</h2>
          <p className="text-text-secondary" data-aos="fade-up">Excellence is not an act, but a habit.</p>
        </div>
        <div className="container grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="glass-card-premium p-10 rounded-3xl text-center space-y-6 group border-primary/5"
            >
              <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                {v.icon}
              </div>
              <h4 className="text-2xl font-bold font-primary">{v.title}</h4>
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
    <section className="py-12 md:py-16 bg-primary/30 relative overflow-hidden font-secondary">
      <div className="container">
        <div className="max-w-6xl mx-auto glass-card-premium rounded-3xl md:rounded-[4rem] overflow-hidden border-accent/20">
          <div className="grid grid-cols-1 lg:grid-cols-5 items-stretch">
            <div className="lg:col-span-2 bg-white/5 p-8 md:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-primary font-primary italic">Kruthik Reddy</h2>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
                      <Briefcase size={16} /> COO & Director
                    </div>
                    <div className="flex items-center gap-3 text-text-secondary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                      <GraduationCap size={16} /> B.SC Computer
                    </div>
                  </div>
                </div>
                <div className="pt-8 md:pt-10 border-t border-primary/10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary mb-2">Expertise</p>
                  <p className="text-xl md:text-2xl font-bold text-primary">15+ Years</p>
                  <p className="text-[10px] md:text-xs text-text-secondary uppercase tracking-widest">Industry Experience</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 p-8 md:p-14 relative flex flex-col justify-center">
              <div className="absolute top-10 right-10 opacity-10 hidden md:block text-primary">
                <Quote size={120} className="rotate-180" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 italic text-text-primary font-primary">Director's Message</h3>
              <div className="space-y-4 md:space-y-6 text-text-secondary text-base md:text-lg leading-relaxed">
                <p>
                  With over 15 years of experience in the Home Loan and Loan Against Property (LAP) industry, we have built a strong foundation in providing reliable and customer-focused financial solutions. Our journey has been shaped by hands-on experience working with leading banks and NBFCs, which has given us deep insights into the lending process and customer needs.
                </p>
                <p>
                  We understand that every customer's financial requirement is unique. Our goal is to simplify the loan process by offering the right guidance, transparent communication, and quick turnaround times. We are committed to helping individuals and businesses achieve their financial goals with confidence and ease.
                </p>
                <p>
                  At our organization, trust, integrity, and customer satisfaction are our top priorities. We continuously strive to deliver the best services and build long-term relationships with our clients.
                </p>
              </div>
              <div className="pt-6 md:pt-8 mt-6 border-t border-primary/10">
                <p className="text-primary font-bold uppercase tracking-widest text-sm">— Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomeLoanCard = ({ s, i, navigate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      key={s.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="glass-card-premium rounded-3xl md:rounded-[2.5rem] overflow-hidden group hover:bg-primary/5 transition-all duration-500 border-primary/10 shadow-lg flex flex-col"
    >
      <div className="h-40 md:h-48 relative overflow-hidden shrink-0">
        <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-95 group-hover:brightness-100" />
      </div>
      <div className="p-6 md:p-8 space-y-4 flex flex-col flex-grow">
        <h3 className="text-lg md:text-xl font-bold font-primary">{s.title}</h3>
        <p className="text-text-secondary text-xs md:text-sm">{s.desc}</p>

        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 12 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex flex-col gap-2 pt-2 border-t border-primary/5">
            {s.features.map(f => (
              <span key={f} className="text-[10px] md:text-xs font-semibold py-1 flex items-center gap-3 text-text-secondary">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {f}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="pt-4 border-t border-primary/10 flex flex-col gap-4 mt-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/apply-loan", { state: { service: s.title } })}
              className="flex items-center gap-2 text-primary font-bold text-xs md:text-sm hover:gap-3 transition-all"
            >
              Apply Now <ChevronRight size={16} />
            </button>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-2 bg-primary/5 hover:bg-primary/10 text-primary font-bold text-[10px] md:text-xs rounded-lg transition-colors border border-primary/10 uppercase tracking-widest flex items-center justify-center gap-2"
          >
            {isExpanded ? "Show Less" : "View More"}
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ChevronRight size={12} className="rotate-90" />
            </motion.div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const LoanPortfolio = () => {
  const navigate = useNavigate();
  const services = [
    {
      title: "Personal Loan",
      icon: <Banknote size={24} />,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2070",
      desc: "Achieve your personal goals with our swift and transparent personal loan solutions.",
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
      desc: "Empower your enterprise with strategic capital. We provide high-value business loans.",
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
      desc: "Acquire your dream property with the market's lowest interest rates.",
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
      desc: "Specialized funding for large-scale industrial and commercial developments.",
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
      desc: "Unlock the idle value of your property. Get maximum liquidity while retaining ownership.",
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
      desc: "Transfer your high-interest existing loans and save on monthly EMIs.",
      features: [
        "Reduce interest rates significantly",
        "No hidden transfer charges",
        "Additional top-up available",
        "Consolidate multiple EMIs",
        "Minimal transfer paperwork"
      ]
    }
  ];

  return (
    <section className="py-16 bg-background overflow-hidden font-secondary">
      <div className="container text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-text-primary font-primary">Elite Loan Portfolio</h2>
        <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base">Tailored lending products designed for sophisticated requirements.</p>
      </div>
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        {services.map((s, i) => (
          <HomeLoanCard key={s.title} s={s} i={i} navigate={navigate} />
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
    <section className="container py-16 overflow-hidden font-secondary">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary font-primary">EMI <span className="text-gradient">Navigator</span></h2>
        <p className="text-text-secondary max-w-2xl mx-auto">Precision engineering for your financial future. Calculate your installments with our executive-grade planning tool.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">

        {/* Controls */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-8 md:space-y-12 order-2 xl:order-1">
          <div className="glass-card-premium p-6 md:p-14 rounded-3xl md:rounded-[3rem] border-primary/10 space-y-8 md:space-y-12 text-text-primary">

            {/* Loan Amount */}
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 md:gap-6">
                <label className="flex items-center gap-3 text-text-primary font-bold uppercase tracking-widest text-[10px] md:text-sm">
                  <Banknote size={20} className="text-primary" /> Loan Amount
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold md:text-xl">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setAmount(val);
                    }}
                    className="bg-white border border-primary/20 rounded-xl md:rounded-2xl py-3 md:py-4 pl-8 md:pl-10 pr-4 md:pr-6 w-full sm:w-56 text-right font-black text-text-primary text-lg md:text-xl focus:border-primary outline-none transition-all shadow-sm"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100000000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-1.5 md:h-2 bg-primary/10 rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">
                <span>₹ 0</span>
                <span>No Limits</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 md:gap-6">
                <label className="flex items-center gap-3 text-text-primary font-bold uppercase tracking-widest text-[10px] md:text-sm">
                  <Percent size={20} className="text-primary" /> Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={interest}
                    step="0.1"
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setInterest(val);
                    }}
                    className="bg-white border border-primary/20 rounded-xl md:rounded-2xl py-3 md:py-4 pl-4 md:pl-6 pr-10 md:pr-12 w-full sm:w-40 text-right font-black text-text-primary text-lg md:text-xl focus:border-primary outline-none transition-all shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-bold md:text-xl">%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={interest}
                onChange={(e) => setInterest(Number(e.target.value))}
                className="w-full h-1.5 md:h-2 bg-primary/10 rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 md:gap-6">
                <label className="flex items-center gap-3 text-text-primary font-bold uppercase tracking-widest text-[10px] md:text-sm">
                  <Calendar size={20} className="text-primary" /> Tenure (Months)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setTenure(val);
                    }}
                    className="bg-white border border-primary/20 rounded-xl md:rounded-2xl py-3 md:py-4 pl-4 md:pl-6 pr-24 md:pr-28 w-full sm:w-52 text-right font-black text-text-primary text-lg md:text-xl focus:border-primary outline-none transition-all shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/50 text-[10px] font-bold tracking-widest text-xs uppercase">MONTHS</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="600"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-1.5 md:h-2 bg-primary/10 rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">
                <span>0 Months</span>
                <span>600 Months</span>
              </div>
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="glass-card-premium p-8 md:p-10 rounded-2xl md:rounded-3xl border-primary/10 flex gap-6 md:gap-8 items-center text-text-primary">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 border border-primary/20 rounded-xl md:rounded-2xl flex items-center justify-center text-primary shrink-0">
                <TrendingUp size={24} className="md:w-8 md:h-8" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold mb-1 font-primary">Lowest Market Rates</h4>
                <p className="text-text-secondary text-xs md:text-sm">Starting at 7.5% for HNW individuals.</p>
              </div>
            </div>
            <div className="glass-card-premium p-8 md:p-10 rounded-2xl md:rounded-3xl border-primary/10 flex gap-6 md:gap-8 items-center text-text-primary">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 border border-primary/20 rounded-xl md:rounded-2xl flex items-center justify-center text-primary shrink-0">
                <CheckCircle2 size={24} className="md:w-8 md:h-8" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold mb-1 font-primary">Instant Discretion</h4>
                <p className="text-text-secondary text-xs md:text-sm">Approvals within 24-48 business hours.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="lg:col-span-12 xl:col-span-5 xl:sticky top-32 order-1 xl:order-2">
          <motion.div
            className="glass-card-premium p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border-primary/20 bg-primary/5 relative overflow-hidden text-text-primary shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl"></div>

            <div className="space-y-6 md:space-y-8 relative z-10">
              <div className="text-center">
                <p className="text-text-secondary uppercase font-bold tracking-[0.4em] text-[10px] md:text-xs mb-3">Estimated Monthly EMI</p>
                <h3 className="text-3xl md:text-5xl font-bold text-primary drop-shadow-[0_0_20px_rgba(6,95,70,0.1)] font-secondary">
                  ₹ {emi.toLocaleString()}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-primary/5 rounded-xl md:rounded-2xl border border-primary/10">
                  <span className="text-text-secondary font-bold text-xs md:text-sm">Principal Amount</span>
                  <span className="font-bold text-sm md:text-base">₹ {amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-primary/5 rounded-xl md:rounded-2xl border border-primary/10">
                  <span className="text-text-secondary font-bold text-xs md:text-sm">Total Interest</span>
                  <span className="font-bold text-sm md:text-base text-primary">₹ {totalInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-5 md:p-6 bg-primary text-white rounded-2xl md:rounded-3xl font-black text-lg md:text-xl shadow-lg">
                  <span>Total Cost</span>
                  <span>₹ {totalPayment.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/apply-loan" className="w-full btn-premium py-4 md:py-5 group text-base md:text-lg">
                  Initialize Application <ArrowRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-3 transition-transform" />
                </Link>
              </div>

              <p className="text-center text-[9px] md:text-[10px] text-text-secondary font-bold uppercase tracking-[0.3em] opacity-50">
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
    <section className="py-12 md:py-16 bg-background overflow-hidden font-secondary">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
        <div className="space-y-10 md:space-y-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-text-primary font-primary">Executive Channels</h2>
            <div className="space-y-4 md:space-y-6">
              {[
                {
                  icon: <Phone size={20} />,
                  title: "Private Line",
                  value: "+91 7026133444",
                  link: "https://wa.me/917026133444?text=Hello,%20I%20would%20like%20to%20discuss%20a%20private%20consultation."
                },
                { icon: <Mail size={20} />, title: "Secure Email", value: "kasireddykruthik@gmail.com", link: "mailto:kasireddykruthik@gmail.com" },
                { icon: <MapPin size={20} />, title: "Hub", value: "Financial District, Bangalore" }
              ].map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  target={item.link?.startsWith('http') ? "_blank" : undefined}
                  rel={item.link?.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="flex gap-4 items-center p-5 md:p-6 glass-card-premium rounded-2xl md:rounded-3xl hover:bg-white/10 transition-all border-primary/5 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-primary transition-all">{item.icon}</div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{item.title}</p>
                    <p className="text-base md:text-lg font-bold truncate font-primary">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="glass-card-premium p-8 rounded-3xl md:rounded-[2.5rem] border-accent/20">
            <h3 className="text-xl font-bold mb-4 font-primary">Check Your CIBIL Prestige</h3>
            <p className="text-text-secondary mb-6 text-sm">Our advanced scanner analyzes your history to unlock preferential rates.</p>
            <Link to="/cibil-score" className="text-accent font-bold flex items-center gap-2 hover:gap-3 transition-all">Scanner <ChevronRight size={16} /></Link>
          </div>
        </div>
        <div className="glass-card-premium p-8 md:p-14 rounded-3xl md:rounded-[3.5rem] border-primary/5">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 font-primary">Formal Inquiry</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input {...register("name", { required: true })} placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 outline-none focus:border-accent text-sm md:text-base" />
                <input {...register("phone", { required: true })} placeholder="Phone" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 outline-none focus:border-accent text-sm md:text-base" />
              </div>
              <input {...register("email", { required: true })} placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 outline-none focus:border-accent text-sm md:text-base" />
              <select
                {...register("loanType", { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 outline-none focus:border-accent text-sm md:text-base text-text-primary font-bold appearance-none cursor-pointer"
              >
                <option value="" className="bg-primary text-white">Select Loan Type</option>
                <option value="Personal Loan" className="bg-primary text-white">Personal Loan</option>
                <option value="Business Loan" className="bg-primary text-white">Business Loan</option>
                <option value="Home Loan" className="bg-primary text-white">Home Loan</option>
                <option value="Project Loan" className="bg-primary text-white">Project Loan</option>
                <option value="Loan Against Property" className="bg-primary text-white">Loan Against Property</option>
                <option value="Loan Takeover / BT" className="bg-primary text-white">Loan Takeover / BT</option>
              </select>
              <textarea rows="4" placeholder="Requirements..." className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 outline-none focus:border-accent text-sm md:text-base"></textarea>
              <button type="submit" className="w-full btn-premium py-4">Submit Formal Request <Send size={18} /></button>
            </form>
          ) : (
            <div className="text-center py-16 md:py-20 space-y-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent mx-auto"><CheckCircle2 size={40} /></div>
              <h3 className="text-2xl md:text-3xl font-bold font-primary">Inquiry Sent</h3>
              <p className="text-text-secondary text-sm md:text-base">We will contact you within 24-48 business hours.</p>
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
    <section className="py-12 md:py-16 bg-primary/5 overflow-hidden font-secondary">
      <div className="container text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary font-primary">Our Streamlined Execution</h2>
        <p className="text-text-secondary text-sm md:text-base">From application to disbursement in record time.</p>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {steps.map((step, i) => (
          <div key={step.num} className="relative group" data-aos="fade-up" data-aos-delay={i * 200}>
            <div className="text-6xl md:text-8xl font-black text-white/5 absolute -top-8 md:-top-12 left-0 group-hover:text-accent/10 transition-colors">
              {step.num}
            </div>
            <div className="relative z-10 pt-6 md:pt-8">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary font-primary">{step.title}</h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Partners = () => {
  const partners = [
    { name: "TATA CAPITAL", logo: tataLogo },
    { name: "SBI", logo: sbiLogo },
    { name: "SRI RAM HOUSING FINANCE", logo: shriramLogo },
    { name: "South Indian Bank", logo: southIndianLogo },
    { name: "VASTU FINSERVE", logo: vastuLogo },
    { name: "L&T Finance", logo: ltLogo },
    { name: "ADITYA BIRLA GROUP", logo: adityaBirlaLogo },
    { name: "Hero FINCROP", logo: heroLogo },
    { name: "Flexi Loans India", logo: flexiLogo },
    { name: "LIC HFL", logo: licLogo },
    { name: "DHFL", logo: dhflLogo },
    { name: "EQUITAS", logo: equitasLogo },
    { name: "HDB FINANCIAL SERVICES", logo: hdbLogo },
    { name: "EDELWEISS", logo: edelweissLogo },
    { name: "Lendingkart", logo: lendingkartLogo },
    { name: "FIRST CAPITAL BANK", logo: firstCapitalLogo },
  ];

  // Double the array for seamless infinite scroll
  const scrollPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden font-secondary border-t border-primary/5">
      <div className="container text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text-primary font-primary">Our Partners</h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full"></div>
      </div>
      
      <div className="relative">
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10"></div>

        <div className="flex overflow-hidden">
          <motion.div 
            className="flex whitespace-nowrap gap-16 md:gap-24 py-8 items-center"
            animate={{
              x: ["0%", "-33.33%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {scrollPartners.map((p, i) => (
              <div key={i} className="flex flex-col items-center justify-center group">
                <div className="h-20 md:h-28 w-48 md:w-64 bg-white rounded-2xl md:rounded-[2.5rem] p-2 md:p-3 border border-primary/10 hover:border-primary/30 transition-all duration-500 flex items-center justify-center shadow-md hover:shadow-2xl hover:-translate-y-2">
                  <img 
                    src={p.logo} 
                    alt={p.name} 
                    className="h-full w-full object-contain" 
                  />
                </div>
                <span className="mt-4 text-[10px] md:text-xs font-bold text-primary uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {p.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-12 md:py-16 bg-primary/5 overflow-hidden font-secondary">
      <div className="container">
        <div className="glass-card-premium rounded-3xl md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden border-primary/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight text-text-primary font-primary">
              Ready to Experience <br className="hidden md:block" /><span className="text-gradient">Premium Lending?</span>
            </h2>
            <p className="text-base md:text-xl text-text-secondary mb-8 md:mb-12 max-w-2xl mx-auto">
              Join our network of elite clients and unlock financial opportunities you never thought possible.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/contact" className="btn-premium px-8 md:px-12 w-full sm:w-auto">
                Apply for Your Priority Loan
              </Link>
              <a href="tel:7026133444" className="btn-outline-gold flex items-center gap-2 w-full sm:w-auto">
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
      <Partners />
      <ContactSection />
      <FinalCTA />
    </div>
  );
};

export default Home;
