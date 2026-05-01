import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Percent, 
  ArrowRight, 
  Banknote, 
  Calendar, 
  TrendingUp, 
  CheckCircle2,
  PieChart
} from "lucide-react";
import { Link } from "react-router-dom";

const Calculator = () => {
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
    <div className="min-h-screen bg-background text-text-primary font-secondary">
      {/* Hero Section */}
      <section className="bg-primary/10 pt-32 md:pt-48 pb-16 md:pb-24 px-4 border-b border-primary/10 relative overflow-hidden text-text-primary">
        <div className="absolute top-0 right-0 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-primary/10 blur-[100px] md:blur-[120px] rounded-full -mr-24 -mt-24"></div>
        <div className="container text-center relative z-10 space-y-6 md:space-y-8">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase block text-xs md:text-sm"
          >
            Institutional Planning
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold font-primary text-text-primary"
          >
            EMI <span className="text-gradient">Calculator PRO</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Precision engineering for your financial future. Calculate your installments with our executive-grade planning tool.
          </motion.p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
          
          {/* Controls */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-8 md:space-y-12" data-aos="fade-right">
            <div className="glass-card-premium p-6 md:p-14 rounded-2xl md:rounded-[3rem] border-primary/20 space-y-10 md:space-y-12 text-text-primary">
              
              {/* Loan Amount */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-6">
                  <label className="flex items-center gap-3 text-text-primary font-bold uppercase tracking-widest text-xs md:text-sm">
                    <Banknote size={18} className="text-primary" /> Loan Amount
                  </label>
                  <div className="relative group w-full md:w-auto">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">₹</span>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setAmount(val);
                      }}
                      className="bg-white border-2 border-primary/40 rounded-xl md:rounded-2xl py-3 md:py-4 pl-10 pr-6 w-full md:w-64 text-right font-black text-black text-lg md:text-xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all shadow-md" 
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
                  className="w-full h-2 bg-primary/10 rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[11px] font-bold text-text-secondary uppercase tracking-[0.2em] pt-1">
                  <span>₹ 0</span>
                  <span>No Limits</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-6">
                  <label className="flex items-center gap-3 text-text-primary font-bold uppercase tracking-widest text-xs md:text-sm">
                    <Percent size={18} className="text-primary" /> Interest Rate
                  </label>
                  <div className="relative w-full md:w-auto">
                    <input 
                      type="number" 
                      value={interest}
                      step="0.1"
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setInterest(val);
                      }}
                      className="bg-white border-2 border-primary/40 rounded-xl md:rounded-2xl py-3 md:py-4 pl-6 pr-12 w-full md:w-48 text-right font-black text-black text-lg md:text-xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all shadow-md" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-bold">%</span>
                  </div>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={interest}
                  onChange={(e) => setInterest(Number(e.target.value))}
                  className="w-full h-2 bg-primary/10 rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Tenure */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-6">
                  <label className="flex items-center gap-3 text-text-primary font-bold uppercase tracking-widest text-xs md:text-sm">
                    <Calendar size={18} className="text-primary" /> Tenure (Months)
                  </label>
                  <div className="relative w-full md:w-auto">
                    <input 
                      type="number" 
                      value={tenure}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setTenure(val);
                      }}
                      className="bg-white border-2 border-primary/40 rounded-xl md:rounded-2xl py-3 md:py-4 pl-6 pr-28 w-full md:w-60 text-right font-black text-black text-lg md:text-xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all shadow-md" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/50 text-[10px] font-bold tracking-widest">MONTHS</span>
                  </div>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="600"
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-primary/10 rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">
                  <span>0 Months</span>
                  <span>600 Months</span>
                </div>
              </div>
            </div>

            {/* Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="glass-card-premium p-6 md:p-10 rounded-2xl md:rounded-3xl border-primary/10 flex gap-4 md:gap-8 items-center text-text-primary" data-aos="zoom-in">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 border border-primary/20 rounded-xl md:rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <TrendingUp size={24} className="md:w-8 md:h-8" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold mb-1">Lowest Market Rates</h4>
                  <p className="text-text-secondary text-xs md:text-sm">Starting at 7.5% for HNW individuals.</p>
                </div>
              </div>
              <div className="glass-card-premium p-6 md:p-10 rounded-2xl md:rounded-3xl border-primary/10 flex gap-4 md:gap-8 items-center text-text-primary" data-aos="zoom-in" data-aos-delay="100">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 border border-primary/20 rounded-xl md:rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <CheckCircle2 size={24} className="md:w-8 md:h-8" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold mb-1">Instant Discretion</h4>
                  <p className="text-text-secondary text-xs md:text-sm">Approvals within 24-48 business hours.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-12 xl:col-span-5 xl:sticky xl:top-32" data-aos="fade-left">
            <motion.div 
              className="glass-card-premium p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border-primary/20 bg-primary/5 relative overflow-hidden text-text-primary shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl"></div>
              
              <div className="space-y-6 relative z-10">
                <div className="text-center">
                  <p className="text-text-secondary uppercase font-bold tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs mb-3">Estimated Monthly EMI</p>
                  <h3 className="text-3xl md:text-5xl font-bold text-primary drop-shadow-[0_0_20px_rgba(6,95,70,0.1)] font-secondary">
                    ₹ {emi.toLocaleString()}
                  </h3>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center p-3 md:p-4 bg-primary/5 rounded-xl md:rounded-2xl border border-primary/10">
                    <span className="text-text-secondary font-bold text-xs md:text-sm">Principal Amount</span>
                    <span className="font-bold text-sm md:text-base text-text-primary">₹ {amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 md:p-4 bg-primary/5 rounded-xl md:rounded-2xl border border-primary/10">
                    <span className="text-text-secondary font-bold text-xs md:text-sm">Total Interest</span>
                    <span className="font-bold text-primary text-sm md:text-base">₹ {totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 md:p-6 bg-primary text-white rounded-2xl md:rounded-3xl font-black text-lg md:text-xl shadow-lg">
                    <span>Total Cost</span>
                    <span>₹ {totalPayment.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 md:pt-4">
                  <Link to="/apply-loan" className="w-full btn-premium py-4 md:py-5 group text-base md:text-lg">
                    Initialize Application <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
                  </Link>
                </div>
                
                <p className="text-center text-[8px] md:text-[10px] text-text-secondary font-bold uppercase tracking-[0.3em] opacity-50">
                  *Indicative values based on current market trends
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculator;
