import { motion } from "framer-motion";
import { FileText, Users, AlertTriangle, Scale, Ban, CreditCard, ChevronRight, Clock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: <FileText size={24} />,
    title: "Nature of Services",
    content: [
      {
        sub: "Advisory Platform Only",
        text: "Kruthik Financial Services operates exclusively as a loan advisory and lead generation platform. We are NOT a bank, NBFC (Non-Banking Financial Company), or any form of licensed lender. We do not disburse loans, collect repayments, or hold any financial instruments on your behalf."
      },
      {
        sub: "Intermediary Role",
        text: "Our role is to assess your financial profile based on the information you provide and connect you with appropriate registered lending institutions (banks, NBFCs) for your loan requirements. Final credit decisions rest solely with the lending institution."
      },
      {
        sub: "CIBIL Score Tool",
        text: "The CIBIL Score diagnostic tool is provided for informational purposes to help you understand your credit standing. It is not a guarantee of loan approval or specific interest rates from any lender."
      }
    ]
  },
  {
    icon: <Users size={24} />,
    title: "User Eligibility & Obligations",
    content: [
      {
        sub: "Age Requirement",
        text: "You must be at least 18 years of age and a resident of India to use our services. By submitting any form on this website, you represent and warrant that you meet this eligibility criterion."
      },
      {
        sub: "Accuracy of Information",
        text: "You agree to provide accurate, current, and complete information in all forms and applications. Providing false, misleading, or fraudulent information is a violation of these Terms and may constitute an offence under applicable Indian law, including the Indian Penal Code and the Prevention of Money Laundering Act."
      },
      {
        sub: "Consent for Bureau Enquiry",
        text: "By submitting the CIBIL Score form and checking the consent checkbox, you explicitly authorize Kruthik Financial Services and its technology partners to initiate a soft-pull enquiry with licensed credit information companies on your behalf. You may withdraw this consent at any time by contacting us."
      },
      {
        sub: "Prohibited Use",
        text: "You may not use this platform for any unlawful purpose, to impersonate another person, to submit another person's personal information without their express consent, or to attempt to gain unauthorized access to our systems."
      }
    ]
  },
  {
    icon: <AlertTriangle size={24} />,
    title: "Disclaimers & Limitation of Liability",
    content: [
      {
        sub: "No Guarantee of Loan Approval",
        text: "The information and recommendations provided on this platform do not constitute a guarantee, commitment, or assurance of loan approval from any lender. Lending decisions are made solely at the discretion of the respective financial institution."
      },
      {
        sub: "Indicative Information",
        text: "Interest rates, EMI calculations, eligibility assessments, and other financial figures displayed on this website are indicative only and are based on prevailing market conditions at the time of display. Actual rates may vary."
      },
      {
        sub: "Limitation of Liability",
        text: "To the maximum extent permitted by applicable law, Kruthik Financial Services shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, our services or the information provided herein."
      },
      {
        sub: "CIBIL Score Accuracy",
        text: "The CIBIL score displayed through our tool is fetched in real-time from licensed credit bureaus. While we strive for accuracy, we are not responsible for any discrepancies in the bureau data. For disputes regarding your credit report, contact the respective credit bureau directly."
      }
    ]
  },
  {
    icon: <CreditCard size={24} />,
    title: "Fees & Charges",
    content: [
      {
        sub: "Platform Services",
        text: "Access to this website and the submission of enquiries, loan applications, and CIBIL score checks is provided free of charge to end users. Kruthik Financial Services is compensated by lending partners upon successful loan disbursement — this arrangement does not affect the interest rates or terms offered to you."
      },
      {
        sub: "No Hidden Charges",
        text: "We do not charge any upfront fees for our advisory services. If any associated loan processing fees are applicable, they will be disclosed by the respective lending institution as part of the formal loan offer document."
      }
    ]
  },
  {
    icon: <Ban size={24} />,
    title: "Intellectual Property",
    content: [
      {
        sub: "Ownership",
        text: "All content on this website, including text, graphics, logos, design elements, and software, is the exclusive property of Kruthik Financial Services and is protected by applicable copyright and intellectual property laws."
      },
      {
        sub: "Restricted Use",
        text: "You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content from this website without our prior written consent."
      }
    ]
  },
  {
    icon: <Scale size={24} />,
    title: "Governing Law & Dispute Resolution",
    content: [
      {
        sub: "Jurisdiction",
        text: "These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising from or related to these Terms shall be subject to the exclusive jurisdiction of the courts located in Bangalore, Karnataka, India."
      },
      {
        sub: "Arbitration",
        text: "Any dispute or claim arising out of these Terms that cannot be resolved amicably shall be referred to arbitration under the Arbitration and Conciliation Act, 1996. The place of arbitration shall be Bangalore, and proceedings shall be conducted in English."
      },
      {
        sub: "Amendments",
        text: "Kruthik Financial Services reserves the right to modify these Terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of our services after any modification constitutes your acceptance of the revised Terms."
      }
    ]
  }
];

const TermsAndConditions = () => {
  const lastUpdated = "April 18, 2025";

  return (
    <div className="pt-32 md:pt-48 min-h-screen bg-background text-text-primary">

      {/* Hero */}
      <section className="bg-primary/5 py-20 px-4 border-b border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full -mr-64 -mt-64"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10 space-y-6">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary font-bold tracking-[0.4em] uppercase block">
            Legal Documentation
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-bold text-text-primary">
            Terms & <span className="text-gradient">Conditions</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-text-secondary text-lg max-w-2xl mx-auto">
            Please read these Terms and Conditions carefully before using our services. By accessing or using Kruthik Financial Services, you agree to be bound by these terms.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full text-xs font-bold text-text-secondary uppercase tracking-widest">
            <Clock size={12} className="text-primary" /> Last Updated: {lastUpdated}
          </motion.div>
        </div>
      </section>

      {/* Intro Banner */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="glass-card-premium p-8 rounded-[2.5rem] border-accent/20 flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent shrink-0">
            <Scale size={28} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Agreement to Terms</h2>
            <p className="text-text-secondary leading-relaxed">
              These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User") and <strong className="text-white">Kruthik Financial Services</strong> ("Company," "we," "us," or "our"). These Terms govern your use of our website and all associated services. If you do not agree to these Terms, you must discontinue use of our services immediately. These Terms are executed in compliance with the <strong className="text-accent">Information Technology Act, 2000</strong>, the <strong className="text-accent">Consumer Protection (E-Commerce) Rules, 2020</strong>, and applicable RBI guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Sections */}
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
            <div className="flex items-center gap-4 p-8 border-b border-primary/5">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold text-text-primary">{section.title}</h2>
            </div>
            <div className="p-8 space-y-6">
              {section.content.map((item) => (
                <div key={item.sub} className="flex gap-4">
                  <ChevronRight size={16} className="text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-text-primary mb-1">{item.sub}</p>
                    <p className="text-text-secondary leading-relaxed text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Contact Block */}
        <div className="glass-card-premium p-10 rounded-[2.5rem] border-primary/20 text-center space-y-6">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
            <Mail size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-text-primary">Legal Queries?</h3>
            <p className="text-text-secondary">For any questions regarding these Terms, please contact our legal team. We respond to all legal queries within 5 business days.</p>
          </div>
          <a href="mailto:kasireddykruthik@gmail.com" className="btn-premium inline-flex">
            Contact Legal Team <Mail size={18} />
          </a>
        </div>

        {/* Footer Nav */}
        <div className="flex flex-wrap justify-center gap-8 pt-4 text-xs font-bold uppercase tracking-widest text-text-secondary">
          <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
