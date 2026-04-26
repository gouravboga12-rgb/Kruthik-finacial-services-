import { motion } from "framer-motion";
import { 
  History, 
  Target, 
  Eye, 
  Award, 
  Users, 
  ShieldCheck, 
  CheckCircle2,
  ChevronRight,
  Quote,
  GraduationCap,
  Briefcase
} from "lucide-react";

const About = () => {
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
    <div className="min-h-screen font-secondary">
      {/* Hero / Vision Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" 
            alt="Kruthik Heritage" 
            className="w-full h-full object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background/40 to-primary/5"></div>
        </div>
        
        <div className="container relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase mb-4 block text-xs md:text-sm"
          >
            The Kruthik Heritage
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 text-white font-primary"
          >
            Redefining <span className="text-gradient">Financial Excellence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Born from the union of Dhana Lakshmi and Mahandra Capital, KRUTHIK FINANCIAL SERVICES is the standard-bearer for elite lending in India.
          </motion.p>
        </div>
      </section>

      {/* Legacy & History */}
      <section className="py-16 md:py-24 overflow-hidden bg-primary/5 relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div 
              data-aos="fade-right"
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-primary">A Foundation Built on <br />Trust and Performance</h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                With a combined heritage of over two decades, our founding entities recognized a gap in the market for sophisticated, responsive, and truly personalized lending solutions.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {heritage.map((item) => (
                  <div key={item.title} data-aos="zoom-in" className="glass-card-premium p-6 rounded-2xl border-l-4 border-l-accent">
                    <h4 className="font-bold text-lg mb-2 font-primary">{item.title}</h4>
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
                className="relative z-10 rounded-[2.5rem] shadow-2xl brightness-90 transition-all duration-700 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-16 md:py-24 bg-white overflow-hidden relative">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div 
              data-aos="fade-up"
              whileHover={{ y: -10 }}
              className="glass-card-premium p-8 md:p-12 rounded-3xl md:rounded-[3.5rem] space-y-4 md:space-y-6 border-primary/10"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-xl md:rounded-2xl flex items-center justify-center text-white shrink-0">
                <Target size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary font-primary">Our Mission</h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                To empower elite individuals and dynamic businesses by providing sophisticated financial instruments that fuel growth, foster stability, and unlock unprecedented opportunities.
              </p>
            </motion.div>

            <motion.div 
              data-aos="fade-up"
              data-aos-delay="200"
              whileHover={{ y: -10 }}
              className="glass-card-premium p-8 md:p-12 rounded-3xl md:rounded-[3.5rem] space-y-4 md:space-y-6 border-primary/20"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold italic text-text-primary font-primary">Our Vision</h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                To be recognized globally as India's premier boutique financial services firm, defined by our unwavering commitment to precision, integrity, and the enduring success of our clients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 md:py-24 bg-primary/5 overflow-hidden">
        <div className="container text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary font-primary" data-aos="fade-down">The Pillars of Kruthik</h2>
          <p className="text-text-secondary text-sm md:text-base" data-aos="fade-up">Excellence is not an act, but a habit.</p>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="glass-card-premium p-8 md:p-10 rounded-3xl text-center space-y-6 group border-primary/5"
            >
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                {v.icon}
              </div>
              <h4 className="text-xl md:text-2xl font-bold font-primary">{v.title}</h4>
              <p className="text-text-secondary text-sm md:text-base">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Director's Message Section */}
      <section className="py-24 bg-primary/5 relative overflow-hidden">
        <div className="container">
          <div className="max-w-6xl mx-auto glass-card-premium rounded-[4rem] overflow-hidden border-primary/20">
            <div className="grid lg:grid-cols-5 items-stretch">
              {/* Profile Sidebar */}
              <div className="lg:col-span-2 bg-primary/5 p-10 md:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-primary/10">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold uppercase tracking-tight text-primary font-primary italic">Kruthik Reddy</h2>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.2em] text-xs">
                        <Briefcase size={16} /> COO & Director
                      </div>
                      <div className="flex items-center gap-3 text-text-secondary text-xs font-bold uppercase tracking-[0.2em]">
                        <GraduationCap size={16} /> B.SC Computer
                      </div>
                    </div>
                  </div>
                  <div className="pt-10 border-t border-primary/10">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-text-secondary mb-2">Expertise</p>
                    <p className="text-2xl font-black text-primary font-primary">15+ Years</p>
                    <p className="text-xs text-text-secondary uppercase tracking-widest">Industry Experience</p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="lg:col-span-3 p-10 md:p-14 relative flex flex-col justify-center">
                <div className="absolute top-10 right-10 opacity-10 text-primary">
                  <Quote size={120} className="rotate-180" />
                </div>
                
                <h3 className="text-3xl font-bold mb-8 italic text-text-primary font-primary">Director's Message</h3>
                
                <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                  <p>
                    With over 15 years of experience in the Home Loan and Loan Against Property (LAP) industry, we have built a strong foundation in providing reliable and customer-focused financial solutions. Our journey has been shaped by hands-on experience working with leading banks and NBFCs, which has given us deep insights into the lending process and customer needs.
                  </p>
                  <p>
                    We understand that every customer's financial requirement is unique. Our goal is to simplify the loan process by offering the right guidance, transparent communication, and quick turnaround times. We are committed to helping individuals and businesses achieve their financial goals with confidence and ease.
                  </p>
                  <p className="pb-8">
                    At our organization, trust, integrity, and customer satisfaction are our top priorities. We continuously strive to deliver the best services and build long-term relationships with our clients.
                  </p>
                </div>

                <div className="pt-8 border-t border-primary/10">
                  <p className="text-primary font-bold uppercase tracking-widest text-sm">— Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Standards Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-primary">Our Executive <span className="text-gradient">Standards</span></h2>
            <p className="text-text-secondary">Excellence across every touchpoint of your journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck size={32} />, title: "Secure Lending", desc: "Enterprise-grade data protection and ethical lending practices." },
              { icon: <Award size={32} />, title: "Prestige Recognition", desc: "Consistently ranked as India's preferred boutique financial partner." },
              { icon: <CheckCircle2 size={32} />, title: "Precision Execution", desc: "Rigorous attention to detail in every capital disbursement." }
            ].map((std, i) => (
              <div key={i} className="flex gap-6 items-start p-8 glass-card-premium rounded-3xl border-primary/5">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  {std.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-xl font-primary">{std.title}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">{std.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container">
          <div className="glass-card-premium rounded-3xl md:rounded-[4rem] p-8 md:p-24 text-center relative overflow-hidden bg-primary/5 border-primary/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -mr-48 -mt-48"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-6xl font-bold italic leading-tight text-text-primary font-primary">Partner with <span className="text-gradient">Prestige</span></h2>
              <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Ready to elevate your financial strategy? Join the exclusive circle of Kruthik clients and experience the pinnacle of Indian lending.
              </p>
              <div className="flex justify-center pt-4">
                <a 
                  href="https://wa.me/917026133444?text=Hello,%20I%20would%20like%20to%20request%20a%20private%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium px-12 md:px-20 py-5 text-xl shadow-2xl shadow-primary/20"
                >
                  Request Private Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
