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
    <div className="min-h-screen">
      {/* Hero / Vision Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" 
            alt="Kruthik Heritage" 
            className="w-full h-full object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background"></div>
        </div>
        
        <div className="container relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase mb-4 block text-xs md:text-sm"
          >
            The Kruthik Heritage
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold mb-6 md:mb-8"
          >
            Redefining <span className="text-gradient">Financial Excellence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Born from the union of Dhana Lakshmi and Mahandra Capital, KRUTHIK FINANCIAL SERVICES is the standard-bearer for elite lending in India.
          </motion.p>
        </div>
      </section>

      {/* Legacy & History */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
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
              className="relative z-10 rounded-[2.5rem] shadow-2xl brightness-90 transition-all duration-700 hover:scale-[1.02]"
            />
          </div>
        </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-16 md:py-24 bg-primary/20 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card-premium p-8 md:p-12 rounded-3xl md:rounded-[3.5rem] space-y-4 md:space-y-6"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-accent rounded-xl md:rounded-2xl flex items-center justify-center text-primary shrink-0">
              <Target size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">Our Mission</h3>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              To empower elite individuals and dynamic businesses by providing sophisticated financial instruments that fuel growth, foster stability, and unlock unprecedented opportunities.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card-premium p-8 md:p-12 rounded-3xl md:rounded-[3.5rem] space-y-4 md:space-y-6 border-accent/20"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-accent shrink-0">
              <Eye size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold italic">Our Vision</h3>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              To be recognized globally as India's premier boutique financial services firm, defined by our unwavering commitment to precision, integrity, and the enduring success of our clients.
            </p>
          </motion.div>
        </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-6xl font-bold mb-4">The Pillars of Kruthik</h2>
          <p className="text-text-secondary text-sm md:text-base">Excellence is not an act, but a habit.</p>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-premium p-8 md:p-10 rounded-3xl text-center space-y-6 group"
            >
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                {v.icon}
              </div>
              <h4 className="text-xl md:text-2xl font-bold">{v.title}</h4>
              <p className="text-text-secondary text-sm md:text-base">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Director's Message Section */}
      <section className="py-24 bg-primary/30 relative overflow-hidden">
        <div className="container">
          <div className="max-w-6xl mx-auto glass-card-premium rounded-[4rem] overflow-hidden border-accent/20">
            <div className="grid lg:grid-cols-5 items-stretch">
              {/* Profile Sidebar */}
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

              {/* Message Content */}
              <div className="lg:col-span-3 p-10 md:p-14 relative flex flex-col justify-center">
                <div className="absolute top-10 right-10 opacity-10">
                  <Quote size={120} className="rotate-180" />
                </div>
                
                <h3 className="text-3xl font-bold mb-8 italic">Director's Message</h3>
                
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

                <div className="pt-8 border-t border-white/10">
                  <p className="text-accent font-bold uppercase tracking-widest text-sm">— Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container">
          <div className="glass-card-premium rounded-3xl md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden bg-gradient-to-br from-primary to-background">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 italic leading-tight text-white">Partner with Prestige</h2>
              <p className="text-lg md:text-xl text-text-secondary mb-8 md:mb-12 max-w-2xl mx-auto">
                Ready to elevate your financial strategy? Join the exclusive circle of Kruthik clients.
              </p>
              <div className="flex justify-center gap-6 flex-wrap">
                <button className="btn-premium px-10 md:px-12 w-full sm:w-auto">
                  Request Private Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
