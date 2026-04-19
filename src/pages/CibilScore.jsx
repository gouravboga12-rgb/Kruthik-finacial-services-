import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Zap, 
  TrendingUp,
  ArrowRight,
  ChevronRight,
  History,
  Lock,
  MessageSquare,
  Loader2,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import { initiateCibilCheck, verifyCibilOtp } from "../services/cibilService";

// ─── Score Gauge ────────────────────────────────────────────
const CibilGauge = ({ score }) => {
  const percentage = (score - 300) / (900 - 300);
  const strokeDasharray = 440;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage);
  
  let status = "Elite";
  let color = "#F59E0B";
  if (score < 500) { status = "Attention Required"; color = "#EF4444"; }
  else if (score < 700) { status = "Standard"; color = "#6366F1"; }
  else if (score < 800) { status = "Good"; color = "#10B981"; }

  return (
    <div className="relative flex flex-col items-center">
      <svg className="w-64 h-64 -rotate-90">
        <circle cx="128" cy="128" r="70" className="fill-transparent stroke-white/5" strokeWidth="12" />
        <motion.circle
          cx="128" cy="128" r="70"
          className="fill-transparent"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ strokeDashoffset: strokeDasharray }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ strokeDasharray }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-2">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-1">
          Your Score
        </motion.span>
        <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, type: "spring" }} className="text-7xl font-black text-white">
          {score}
        </motion.span>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-2 py-1 px-4 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest" style={{ color }}>
          {status}
        </motion.div>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────
const CibilScore = () => {
  // phase: landing → form → initiating → otp → verifying → scanning → result | error
  const [phase, setPhase] = useState("landing");
  const [cibilStep, setCibilStep] = useState(0);
  const [cibilScore, setCibilScore] = useState(null);
  const [cibilReport, setCibilReport] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [timer, setTimer] = useState(30);
  const [apiError, setApiError] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [userPan, setUserPan] = useState('');
  const otpRefs = useRef([]);
  const dobRef = useRef();

  // ── Timer for OTP resend ──
  useEffect(() => {
    let interval;
    if (phase === "otp" && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [phase, timer]);

  // ── Fake SMS notification ──
  useEffect(() => {
    if (phase === "otp") {
      const show = setTimeout(() => setShowNotification(true), 1500);
      const hide = setTimeout(() => setShowNotification(false), 8000);
      return () => { clearTimeout(show); clearTimeout(hide); };
    }
  }, [phase]);

  // ── Form Submit → Call initiateCibilCheck ──
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const errors = {};

    if (!/^[A-Za-z\s]+$/.test(data.name)) errors.name = "Names must contain letters only.";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.pan.toUpperCase())) errors.pan = "Official format: 5 Letters, 4 Digits, 1 Letter.";
    if (!/^[6-9]\d{9}$/.test(data.mobile)) errors.mobile = "10 digit Indian number required.";
    if (!data.dob) errors.dob = "Please select your date of birth.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setApiError(null);
    setUserPan(data.pan.toUpperCase());
    setPhase("initiating");

    try {
      const result = await initiateCibilCheck({
        name: data.name,
        pan: data.pan.toUpperCase(),
        mobile: data.mobile,
        dob: data.dob,
      });
      setRequestId(result.requestId);
      setPhase("otp");
      setTimer(30);
    } catch (err) {
      setApiError("Failed to reach the bureau. Please check your details and try again.");
      setPhase("form");
    }
  };

  // ── OTP Verify → Call verifyCibilOtp ──
  const verifyOtp = async () => {
    const enteredOtp = otp.join('');
    setOtpError(false);
    setPhase("verifying");

    try {
      const report = await verifyCibilOtp({ requestId, otp: enteredOtp, pan: userPan });
      setCibilScore(report.score);
      setCibilReport(report);
      setPhase("scanning");
    } catch (err) {
      if (err.code === 'INVALID_OTP') {
        setOtp(['', '', '', '', '', '']);
        setOtpError(true);
        setPhase("otp");
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } else {
        setApiError("Verification failed. Please try again.");
        setPhase("otp");
      }
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setOtpError(false);
    if (value && index < 5) otpRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(['', '', '', '', '', '']);
    setShowNotification(false);
    setTimeout(() => setShowNotification(true), 1000);
  };

  const scanSteps = [
    { title: "Identity Verification", desc: "Authenticating your profile via bureau gateway.", log: "Validating PAN & identity handshake..." },
    { title: "Bureau Data Fetch", desc: "Querying CIBIL TransUnion for your report.", log: "Accessing TransUnion CIBIL repositories..." },
    { title: "Risk Tier Analysis", desc: "Computing your elite eligibility tier.", log: "Analyzing 48 dynamic financial data points..." }
  ];

  const handleNext = () => {
    if (cibilStep < 2) {
      setCibilStep(prev => prev + 1);
    } else {
      setPhase("result");
    }
  };

  const handleReset = () => {
    setCibilScore(null);
    setCibilReport(null);
    setPhase("landing");
    setCibilStep(0);
    setOtp(['', '', '', '', '', '']);
    setApiError(null);
    setRequestId(null);
    setUserPan('');
  };

  return (
    <div className="pt-24 min-h-screen bg-background text-white font-outfit relative">

      {/* ── SMS Toast Notification ── */}
      <AnimatePresence>
        {showNotification && (
          <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-5 rounded-3xl shadow-2xl flex items-center gap-5">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shrink-0">
                <MessageSquare size={24} className="text-primary fill-current" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Incoming Message</p>
                <p className="text-sm font-bold">Protocol Verification: Your Kruthik code is <span className="text-accent underline">123456</span>. Do not share.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section className="bg-primary/50 py-24 px-4 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full -mr-32 -mt-32"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10 space-y-8">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent font-bold tracking-[0.4em] uppercase block">
            Digital CIBIL Portfolio
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold font-playfair">
            Monitor Your <br /><span className="text-gradient">Financial Reputation</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-text-secondary text-xl max-w-2xl mx-auto leading-relaxed">
            Experience a bank-grade CIBIL diagnostic. Accurate, instantaneous, and designed to respect your privacy.
          </motion.p>
        </div>
      </section>

      {/* ── Main Experience ── */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">

            {/* LANDING */}
            {phase === "landing" && (
              <motion.div key="landing" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="flex flex-col items-center text-center space-y-12">
                <div className="w-24 h-24 bg-accent/20 rounded-[2.5rem] flex items-center justify-center text-accent">
                  <TrendingUp size={48} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold italic font-playfair">Ready to see your Prestige Tier?</h2>
                  <p className="text-text-secondary max-w-xl">Join thousands of elite clients who monitor their CIBIL health with Kruthik.</p>
                </div>
                <button onClick={() => setPhase("form")} className="btn-premium px-12 py-5 text-lg">
                  Check CIBIL Score <ArrowRight size={24} />
                </button>
              </motion.div>
            )}

            {/* FORM */}
            {phase === "form" && (
              <motion.div key="form" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="max-w-2xl mx-auto">
                <div className="glass-card-premium p-10 md:p-14 rounded-[3.5rem] border-accent/20 space-y-10">
                  <div className="text-center space-y-2">
                    <h3 className="text-3xl font-bold italic text-white font-playfair text-gradient">Elite Information Protocol</h3>
                    <p className="text-text-secondary text-sm">Please provide the details required to query the bureaus safely.</p>
                  </div>

                  {apiError && (
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl">
                      <AlertTriangle size={18} className="text-red-400 shrink-0" />
                      <p className="text-red-400 text-sm font-bold">{apiError}</p>
                    </div>
                  )}

                  <form className="space-y-8" onSubmit={handleFormSubmit}>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary">Full Name</label>
                        <input name="name" type="text" required placeholder="John Doe"
                          onInput={(e) => { e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '') }}
                          className={`w-full bg-white/5 border ${formErrors.name ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-5 px-6 focus:border-accent outline-none text-white font-bold transition-all shadow-inner`}
                        />
                        {formErrors.name && <p className="text-[10px] text-red-500 uppercase font-bold tracking-widest ml-4">{formErrors.name}</p>}
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary">PAN Number</label>
                        <input name="pan" type="text" required placeholder="ABCDE1234F" maxLength={10}
                          onInput={(e) => { e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '') }}
                          className={`w-full bg-white/5 border ${formErrors.pan ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-5 px-6 focus:border-accent outline-none text-white font-bold transition-all uppercase shadow-inner`}
                        />
                        {formErrors.pan && <p className="text-[10px] text-red-500 uppercase font-bold tracking-widest ml-4">{formErrors.pan}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary">Mobile Number</label>
                        <input name="mobile" type="tel" required placeholder="9876543210" maxLength={10}
                          onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                          className={`w-full bg-white/5 border ${formErrors.mobile ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-5 px-6 focus:border-accent outline-none text-white font-bold transition-all shadow-inner`}
                        />
                        {formErrors.mobile && <p className="text-[10px] text-red-500 uppercase font-bold tracking-widest ml-4">{formErrors.mobile}</p>}
                      </div>
                      <div className="group space-y-3">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-text-secondary">Date of Birth</label>
                        <div className="relative cursor-pointer" onClick={() => dobRef.current?.showPicker()}>
                          <input name="dob" ref={dobRef} type="date" required
                            className={`w-full bg-white/5 border ${formErrors.dob ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-5 px-6 focus:border-accent outline-none text-white font-bold transition-all cursor-pointer shadow-inner [color-scheme:dark]`}
                          />
                        </div>
                        {formErrors.dob && <p className="text-[10px] text-red-500 uppercase font-bold tracking-widest ml-4">{formErrors.dob}</p>}
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-white/5 rounded-3xl border border-white/10 hover:border-accent/30 transition-colors group">
                      <input type="checkbox" required className="mt-1 w-5 h-5 accent-accent cursor-pointer rounded-lg border-white/20" />
                      <p className="text-[11px] leading-relaxed text-text-secondary group-hover:text-white/80 transition-colors">
                        I hereby accord my consent to Kruthik Financial Services to retrieve my CIBIL information from bureaus as a soft inquiry. I understand this will NOT impact my CIBIL score.
                      </p>
                    </div>

                    <button type="submit" className="w-full btn-premium py-6 text-xl group shadow-2xl">
                      Initialize Diagnostic <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* INITIATING (loading after form submit) */}
            {phase === "initiating" && (
              <motion.div key="initiating" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center space-y-10 py-24">
                <div className="relative">
                  <div className="w-24 h-24 bg-accent/20 rounded-[2.5rem] flex items-center justify-center text-accent">
                    <Loader2 size={48} className="animate-spin" />
                  </div>
                  <div className="absolute -inset-4 bg-accent/10 blur-2xl rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold font-playfair">Connecting to Bureau</h2>
                  <p className="text-text-secondary">Establishing a secure handshake with TransUnion CIBIL...</p>
                </div>
                <div className="flex flex-col gap-2 text-xs font-mono text-accent/70 text-left bg-white/5 border border-white/10 rounded-2xl px-6 py-4 w-full max-w-sm">
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>› Initializing secure channel...</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>› Validating PAN identity...</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>› Dispatching OTP to mobile...</motion.p>
                </div>
              </motion.div>
            )}

            {/* OTP */}
            {phase === "otp" && (
              <motion.div key="otp" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="max-w-xl mx-auto">
                <div className="glass-card-premium p-10 md:p-14 rounded-[3.5rem] border-accent/20 text-center space-y-10">
                  <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center mx-auto text-accent">
                    <MessageSquare size={32} />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold font-playfair italic">Verification Protocol</h2>
                    <p className="text-text-secondary">A 6-digit verification code has been sent to your registered mobile.</p>
                  </div>

                  {apiError && (
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-left">
                      <AlertTriangle size={18} className="text-red-400 shrink-0" />
                      <p className="text-red-400 text-sm font-bold">{apiError}</p>
                    </div>
                  )}

                  <div className="flex justify-center gap-3 md:gap-4">
                    {otp.map((digit, i) => (
                      <input key={i} ref={el => otpRefs.current[i] = el} type="text" value={digit} maxLength={1}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        className={`w-12 h-16 md:w-14 md:h-20 bg-white/5 border ${otpError ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-center text-2xl font-black text-white focus:border-accent outline-none transition-all`}
                      />
                    ))}
                  </div>
                  {otpError && <p className="text-red-400 text-xs font-bold uppercase tracking-widest">Invalid Protocol Code. Please check and try again.</p>}

                  <div className="space-y-6">
                    <button onClick={verifyOtp} disabled={otp.join('').length < 6} className="w-full btn-premium py-5 text-lg group disabled:opacity-50">
                      Verify Securely <ShieldCheck size={24} className="group-hover:scale-110 transition-transform" />
                    </button>
                    {timer > 0 ? (
                      <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Resend code in <span className="text-accent">{timer}s</span></p>
                    ) : (
                      <button onClick={handleResend} className="text-xs font-bold text-accent uppercase tracking-widest hover:underline hover:underline-offset-4 transition-all">
                        Resend Verification Code
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* VERIFYING (loading after OTP) */}
            {phase === "verifying" && (
              <motion.div key="verifying" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center space-y-10 py-24">
                <div className="relative">
                  <div className="w-24 h-24 bg-accent/20 rounded-[2.5rem] flex items-center justify-center text-accent">
                    <Loader2 size={48} className="animate-spin" />
                  </div>
                  <div className="absolute -inset-4 bg-accent/10 blur-2xl rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold font-playfair">Fetching Your Report</h2>
                  <p className="text-text-secondary">Decrypting bureau data. Please wait...</p>
                </div>
                <div className="flex flex-col gap-2 text-xs font-mono text-accent/70 text-left bg-white/5 border border-white/10 rounded-2xl px-6 py-4 w-full max-w-sm">
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>› OTP verified successfully...</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>› Fetching full credit report...</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>› Compiling risk analysis...</motion.p>
                </div>
              </motion.div>
            )}

            {/* SCANNING */}
            {phase === "scanning" && (
              <motion.div key="scanning" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <h2 className="text-4xl font-bold italic font-playfair text-white">Secure Verification</h2>
                    <p className="text-text-secondary text-lg">Processing {scanSteps[cibilStep].title}.</p>
                  </div>
                  <div className="space-y-8">
                    {scanSteps.map((s, i) => (
                      <div key={i} className={`flex gap-6 transition-opacity duration-300 ${cibilStep === i ? 'opacity-100' : cibilStep > i ? 'opacity-60' : 'opacity-20'}`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg border ${cibilStep > i ? 'border-green-500 text-green-400 bg-green-500/10' : cibilStep === i ? 'border-accent text-accent bg-accent/10' : 'border-white/10 text-white/40'}`}>
                          {cibilStep > i ? <CheckCircle2 size={20} /> : i + 1}
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold">{s.title}</h4>
                          <p className="text-text-secondary text-sm">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full"></div>
                  <div className="glass-card-premium p-10 md:p-14 rounded-[3.5rem] border-accent/20 relative overflow-hidden h-[500px] flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl"></div>
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 text-accent mb-10">
                        <Lock size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">End-to-End Encrypted</span>
                      </div>
                      <div className="space-y-4">
                        <p className="text-xs text-accent font-mono italic">{scanSteps[cibilStep].log}</p>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div key={cibilStep} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1 }} className="h-full bg-accent" />
                        </div>
                      </div>
                    </div>
                    <button onClick={handleNext} className="w-full btn-premium py-5 group">
                      {cibilStep === 2 ? 'Reveal My Score' : 'Authorize Next Step'}
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* RESULT */}
            {phase === "result" && cibilScore && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-16">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold italic font-playfair">Your Executive Profile</h2>
                  <p className="text-text-secondary">
                    Bureau: <span className="text-accent font-bold">{cibilReport?.bureau}</span> &nbsp;·&nbsp; Report Date: <span className="text-white font-bold">{cibilReport?.reportDate}</span>
                  </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5 flex justify-center">
                    <CibilGauge score={cibilScore} />
                  </div>
                  <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
                    {[
                      { icon: <History className="text-accent" />, label: "Payment History", status: "Excellent", desc: "100% on-time institutional payments." },
                      { icon: <Zap className="text-accent" />, label: "CIBIL Mix", status: "Stable", desc: "Balanced portfolio of secured loans." },
                      { icon: <TrendingUp className="text-accent" />, label: "Age of Account", status: "Mature", desc: "Long-term established record." },
                      { icon: <ShieldCheck className="text-accent" />, label: "Bureau Safety", status: "Verified", desc: "Safe soft-pull. Zero score impact." }
                    ].map((factor, i) => (
                      <motion.div key={factor.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + (i * 0.1) }} className="glass-card-premium p-6 rounded-3xl border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">{factor.icon}</div>
                          <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{factor.status}</span>
                        </div>
                        <div>
                          <h4 className="font-bold">{factor.label}</h4>
                          <p className="text-text-secondary text-xs mt-1">{factor.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Banner */}
                <div className="max-w-3xl mx-auto glass-card-premium p-10 rounded-[3rem] border-accent/20 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
                    <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center shrink-0">
                      <TrendingUp size={40} className="text-accent" />
                    </div>
                    <div className="space-y-3 flex-grow">
                      <h3 className="text-2xl font-bold text-white font-playfair text-gradient">
                        {cibilReport?.tier === 'Elite' ? 'Congratulations! You Qualify for Priority Rates' : 'Unlock Your Loan Options'}
                      </h3>
                      <p className="text-text-secondary">{cibilReport?.advice}</p>
                    </div>
                    <Link to="/contact" className="btn-premium whitespace-nowrap">
                      Talk to an Expert <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>

                <div className="text-center">
                  <button onClick={handleReset} className="text-text-secondary font-bold text-xs uppercase tracking-[0.4em] hover:text-accent transition-colors underline underline-offset-8">
                    Reset Diagnostic Protocol
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="py-24 border-t border-white/5 opacity-60">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12 items-center text-center">
            {['Bank-Grade Encryption', 'Soft-Pull Only', 'Zero Score Impact', 'Executive Trust'].map(item => (
              <div key={item} className="flex-1 min-w-[200px] flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[10px]">
                <ShieldCheck size={18} className="text-accent" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CibilScore;
