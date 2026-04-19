import { motion } from "framer-motion";
import { ShieldCheck, Eye, Database, Share2, Clock, Mail, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: <Eye size={24} />,
    title: "Information We Collect",
    content: [
      {
        sub: "Personal Identity Information",
        text: "When you use our CIBIL Score checker or loan application services, we collect: Full name, Date of birth, PAN card number (masked in storage), Aadhaar number (where applicable and consented), Mobile number, and Email address."
      },
      {
        sub: "Financial Information",
        text: "We collect monthly income details, existing loan obligations, required loan amount, and current CIBIL score (self-declared or bureau-fetched) solely for the purpose of assessing your loan eligibility and connecting you with appropriate lenders."
      },
      {
        sub: "Usage Information",
        text: "We automatically collect non-personally identifiable information such as browser type, pages visited, time spent, and referring URLs to improve our services and user experience."
      }
    ]
  },
  {
    icon: <Database size={24} />,
    title: "How We Use Your Information",
    content: [
      {
        sub: "Loan Advisory Services",
        text: "Your information is used exclusively to assess your financial profile, provide loan recommendations, and connect you with our lending partners. We do not use your data for any unrelated marketing or commercial purposes without explicit consent."
      },
      {
        sub: "CIBIL Bureau Enquiries",
        text: "When you use our CIBIL Score diagnostic tool, you provide explicit consent for us to initiate a soft-pull enquiry with credit bureaus (TransUnion CIBIL, Experian, or CRIF High Mark). A soft-pull does NOT affect your credit score."
      },
      {
        sub: "Service Improvement",
        text: "Aggregated and anonymized usage data is used to improve the functionality, performance, and content of our platform."
      }
    ]
  },
  {
    icon: <Share2 size={24} />,
    title: "Data Sharing & Disclosure",
    content: [
      {
        sub: "Lending Partners",
        text: "With your explicit consent, we share your financial profile with our network of registered banks and NBFCs to process your loan application. We only share the minimum information required."
      },
      {
        sub: "Bureau Partners",
        text: "We share your PAN, DOB, and mobile number with licensed credit bureaus (via our technology partner FinBox) to fetch your CIBIL report. This is always a soft enquiry."
      },
      {
        sub: "No Sale of Data",
        text: "We do not sell, trade, rent, or otherwise transfer your personally identifiable information to third parties for their commercial purposes under any circumstances."
      },
      {
        sub: "Legal Requirements",
        text: "We may disclose your information if required by law, court order, or governmental authority in compliance with applicable Indian laws."
      }
    ]
  },
  {
    icon: <Clock size={24} />,
    title: "Data Retention",
    content: [
      {
        sub: "Retention Period",
        text: "Lead data captured through our contact and application forms is retained for a period of 30 days unless required for an ongoing loan process. CIBIL check records are purged within 30 days of capture as per RBI data minimization guidelines."
      },
      {
        sub: "Deletion Requests",
        text: "You may request deletion of your personal data at any time by contacting us at SUPPORT@SUREKILL.CO.IN. We will process verified deletion requests within 7 business days."
      }
    ]
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Security",
    content: [
      {
        sub: "Technical Safeguards",
        text: "All data is transmitted over SSL/TLS encrypted connections. PAN and Aadhaar numbers are masked before storage. We do not store raw sensitive financial identifiers."
      },
      {
        sub: "Access Control",
        text: "Access to personal data is restricted to authorized personnel on a need-to-know basis. All staff are bound by confidentiality obligations."
      },
      {
        sub: "Breach Notification",
        text: "In the unlikely event of a data breach, we will notify affected users within 72 hours of becoming aware of the breach, as required by applicable regulations."
      }
    ]
  }
];

const PrivacyPolicy = () => {
  const lastUpdated = "April 18, 2025";

  return (
    <div className="pt-24 min-h-screen bg-background text-white">

      {/* Hero */}
      <section className="bg-primary/50 py-20 px-4 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full -mr-64 -mt-64"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10 space-y-6">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent font-bold tracking-[0.4em] uppercase block">
            Legal Documentation
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-bold">
            Privacy <span className="text-gradient">Policy</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-text-secondary text-lg max-w-2xl mx-auto">
            Kruthik Financial Services is committed to protecting your privacy and handling your personal data with the highest standards of care and transparency.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-text-secondary uppercase tracking-widest">
            <Clock size={12} className="text-accent" /> Last Updated: {lastUpdated}
          </motion.div>
        </div>
      </section>

      {/* Intro Banner */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="glass-card-premium p-8 rounded-[2.5rem] border-accent/20 flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent shrink-0">
            <ShieldCheck size={28} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Our Commitment to You</h2>
            <p className="text-text-secondary leading-relaxed">
              This Privacy Policy governs the collection, use, and protection of your personal information by <strong className="text-white">Kruthik Financial Services</strong> ("we," "us," or "our"), accessible at this website. By using our services, you agree to the terms outlined in this policy. This policy is compliant with the <strong className="text-accent">Information Technology Act, 2000</strong> and the <strong className="text-accent">Credit Information Companies (Regulation) Act (CICRA), 2005</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="container mx-auto px-4 pb-24 max-w-4xl space-y-8">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card-premium rounded-[2.5rem] overflow-hidden"
          >
            <div className="flex items-center gap-4 p-8 border-b border-white/5">
              <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent shrink-0">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold">{section.title}</h2>
            </div>
            <div className="p-8 space-y-6">
              {section.content.map((item) => (
                <div key={item.sub} className="flex gap-4">
                  <ChevronRight size={16} className="text-accent shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-white mb-1">{item.sub}</p>
                    <p className="text-text-secondary leading-relaxed text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Contact Block */}
        <div className="glass-card-premium p-10 rounded-[2.5rem] border-accent/20 text-center space-y-6">
          <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mx-auto">
            <Mail size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Privacy Questions?</h3>
            <p className="text-text-secondary">For any privacy-related queries, data deletion requests, or concerns, please contact our Data Protection Officer.</p>
          </div>
          <a href="mailto:SUPPORT@SUREKILL.CO.IN" className="btn-premium inline-flex">
            Contact DPO <Mail size={18} />
          </a>
        </div>

        {/* Footer Nav */}
        <div className="flex flex-wrap justify-center gap-8 pt-4 text-xs font-bold uppercase tracking-widest text-text-secondary">
          <Link to="/terms-and-conditions" className="hover:text-accent transition-colors">Terms & Conditions</Link>
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
