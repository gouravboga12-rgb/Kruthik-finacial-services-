import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Banknote,
  TrendingUp,
  User,
  Mail,
  Smartphone,
  Calendar,
  Wallet,
  ArrowLeft,
  Shield,
  Clock,
  Lock
} from "lucide-react";

import { supabase } from "../lib/supabase";
import { uploadToCloudinary } from "../lib/cloudinary";
import { 
  FileUp
} from "lucide-react";

const ApplyLoan = () => {
  const location = useLocation();
  const serviceTitle = location.state?.service || "Direct Application";
  const serviceId = location.state?.serviceId;
  
  const [phase, setPhase] = useState("form"); // form, success
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dynamicFields, setDynamicFields] = useState([]);
  const [loadingFields, setLoadingFields] = useState(true);
  const [employmentType, setEmploymentType] = useState("");

  const documentChecklists = {
    "Salaried": [
      { field_name: "photo", label: "Live Photo", field_type: "file", is_required: true },
      { field_name: "pan_card", label: "PAN Card", field_type: "file", is_required: true },
      { field_name: "aadhaar_card", label: "Aadhaar Card", field_type: "file", is_required: true },
      { field_name: "salary_slips", label: "3 Months Salary Slips", field_type: "file", is_required: true },
      { field_name: "bank_statement_6m", label: "6 Months Bank Statement", field_type: "file", is_required: true },
    ],
    "Self Employed Professional": [
      { field_name: "photo", label: "Live Photo", field_type: "file", is_required: true },
      { field_name: "aadhaar_card", label: "Aadhaar Card", field_type: "file", is_required: true },
      { field_name: "pan_card", label: "PAN Card", field_type: "file", is_required: true },
      { field_name: "itr_3yr", label: "ITR for 3 Years", field_type: "file", is_required: true },
      { field_name: "gst_copy", label: "GST Copy", field_type: "file", is_required: true },
      { field_name: "msme_cert", label: "MSME Certificate", field_type: "file", is_required: true },
      { field_name: "current_bank_1y", label: "Current Account Bank Statement (1 Year)", field_type: "file", is_required: true },
      { field_name: "saving_bank_1y", label: "Saving Account Statement (1 Year)", field_type: "file", is_required: true },
    ],
    "Self Employed Non-Professional": [
      { field_name: "live_photo", label: "Live Photo", field_type: "file", is_required: true },
      { field_name: "pan_card", label: "PAN Card", field_type: "file", is_required: true },
      { field_name: "aadhaar_card", label: "Aadhaar Card", field_type: "file", is_required: true },
      { field_name: "rental_agreement", label: "Rental Agreement", field_type: "file", is_required: true },
      { field_name: "bank_statement_1y", label: "Bank Statement (1 Year)", field_type: "file", is_required: true },
      { field_name: "income_source", label: "Source of Income Documents", field_type: "file", is_required: true },
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFields();
  }, [serviceId]);

  const fetchFields = async () => {
    if (!serviceId) {
      setLoadingFields(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('loan_service_fields')
        .select('*')
        .eq('service_id', serviceId)
        .order('display_order', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        setDynamicFields(data);
      }
    } catch (err) {
      console.error("Error fetching dynamic fields:", err);
    } finally {
      setLoadingFields(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formElement = e.target;
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());
    const errors = {};

    // Standard fields for validation if dynamicFields is empty
    const baseFields = [
      { field_name: 'name', label: 'Name', is_required: true, field_type: 'text' },
      { field_name: 'phone', label: 'Phone', is_required: true, field_type: 'tel' },
      { field_name: 'email', label: 'Email', is_required: true, field_type: 'email' },
      { field_name: 'requirement', label: 'Requirement', is_required: true, field_type: 'number' },
      { field_name: 'employment_type', label: 'Employment Type', is_required: true, field_type: 'select' }
    ];

    const docFields = employmentType ? documentChecklists[employmentType] : [];
    const fieldsToValidate = [...(dynamicFields.length > 0 ? dynamicFields : baseFields), ...docFields];

    fieldsToValidate.forEach(field => {
      const value = data[field.field_name];
      if (field.is_required) {
        if (field.field_type === 'file') {
          const file = formElement[field.field_name]?.files?.[0];
          if (!file) {
            errors[field.field_name] = "File Required";
          } else {
            // File Size Validation
            const fileSizeMB = file.size / (1024 * 1024);
            const isPDF = file.type === 'application/pdf';
            const isImage = file.type.startsWith('image/');

            if (isImage && fileSizeMB > 2) {
              errors[field.field_name] = "Image must be under 2MB";
            } else if (isPDF && fileSizeMB > 10) {
              errors[field.field_name] = "PDF must be under 10MB";
            } else if (!isImage && !isPDF && fileSizeMB > 10) {
              errors[field.field_name] = "File must be under 10MB";
            }
          }
        } else if (!value || value === "") {
          errors[field.field_name] = "Required";
        }
      }
      
      if (value && field.field_type !== 'file' && field.field_type !== 'select') {
        if (field.field_type === 'tel' && !/^(?:\+91|91)?[6-9]\d{9}$/.test(value.replace(/\s/g, ''))) {
          errors[field.field_name] = "Invalid Phone";
        }
        if (field.field_type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          errors[field.field_name] = "Invalid Email";
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setFormErrors({});
      setIsSubmitting(true);
      
      try {
        // Handle File Uploads to Cloudinary in PARALLEL for speed
        const updatedData = { ...data };
        const fileFields = fieldsToValidate.filter(f => f.field_type === 'file');
        
        const uploadPromises = fileFields.map(async (field) => {
          const file = formElement[field.field_name]?.files?.[0];
          if (file) {
            const uploadUrl = await uploadToCloudinary(file, "customer_documents");
            return { name: field.field_name, url: uploadUrl };
          }
          return null;
        });

        const uploadResults = await Promise.all(uploadPromises);
        uploadResults.forEach(result => {
          if (result) updatedData[result.name] = result.url;
        });

        if (supabase) {
          // Destructure main fields and collect the rest as custom data
          const { name, phone, email, requirement, income, age, cibil, loanType, ...customData } = updatedData;
          
          const normalizedName = (name || "N/A").trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
          const normalizedEmail = (email || "N/A").trim().toLowerCase();

          const payload = {
            name: normalizedName,
            phone: phone || "N/A",
            email: normalizedEmail,
            requirement: Number(requirement) || 0,
            income: Number(income) || 0,
            age: Number(age) || 0,
            cibil: Number(cibil) || 0,
            loan_type: loanType || serviceTitle,
            form_data: { ...customData, employment_type: data.employment_type }, 
            status: 'Pending'
          };

          const { error } = await supabase
            .from('loan_applications')
            .insert([payload]);

          if (error) throw error;

          // --- WhatsApp Direct Redirection ---
          const adminPhone = "917026133444"; 
          const waMessage = encodeURIComponent(`🛎️ *New Loan Update!*\n\nYou received a new loan application. Please check your admin panel for details.\n\n*Review:* https://kruthik.com/admin/loans`);
          const waUrl = `https://wa.me/${adminPhone}?text=${waMessage}`;
          
          // Redirect the CURRENT tab to WhatsApp (this bypasses popup blockers)
          window.location.href = waUrl;
          return; // Exit early as we are redirecting
        }
        
        setPhase("success");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Error submitting application:', error);
        alert('Error: ' + error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderIcon = (type) => {
    switch(type) {
      case 'tel': return <Smartphone size={14} className="text-primary" />;
      case 'email': return <Mail size={14} className="text-primary" />;
      case 'number': return <Banknote size={14} className="text-primary" />;
      case 'file': return <FileUp size={14} className="text-primary" />;
      default: return <User size={14} className="text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary font-secondary">
      <AnimatePresence mode="wait">
        {phase === "form" ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container pt-32 pb-8 md:pt-48 md:pb-16 overflow-hidden"
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
              
              {/* Sidebar: Information */}
              <div className="lg:col-span-4 space-y-6 md:space-y-8 lg:sticky lg:top-32 order-2 lg:order-1">
                <div className="glass-card-premium p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border-primary/10 space-y-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary">
                    <ShieldCheck size={32} className="md:w-10 md:h-10" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-bold font-primary text-text-primary">Executive Protocol</h3>
                    <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                      Your application is prioritized by our senior lending board. All data is protected by bank-level 256-bit encryption.
                    </p>
                  </div>
                  
                  <div className="space-y-4 md:space-y-6 pt-6 md:pt-8 border-t border-primary/10">
                    {[
                      { icon: <Shield size={18} />, title: "Bank-Grade Security", desc: "Digital verification" },
                      { icon: <Clock size={18} />, title: "Priority Queue", desc: "4hr response window" },
                      { icon: <CheckCircle2 size={18} />, title: "No CIBIL Impact", desc: "Confidential soft-pull" }
                    ].map(item => (
                      <div key={item.title} className="flex gap-4">
                        <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-text-primary font-bold text-xs md:text-sm">{item.title}</h4>
                          <p className="text-text-secondary text-[10px] md:text-xs tracking-tighter">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main: Form */}
              <div className="lg:col-span-8 order-1 lg:order-2">
                <div className="glass-card-premium p-8 md:p-14 rounded-3xl md:rounded-[3.5rem] border-primary/20">
                  <div className="mb-10 md:mb-12">
                    <Link to="/loans" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs hover:gap-3 transition-all mb-4">
                      <ArrowLeft size={14} /> Back to Loans
                    </Link>
                    <h2 className="text-2xl md:text-4xl font-bold font-primary mb-3 text-text-primary">Apply for <span className="text-gradient">{serviceTitle}</span></h2>
                  </div>

                  {loadingFields ? (
                    <div className="py-20 flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Constructing Secure Interface...</p>
                    </div>
                  ) : (
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10" onSubmit={handleFormSubmit}>
                      <input type="hidden" name="loanType" value={serviceTitle} />
                      
                      {/* Standard Basic Fields */}
                      {(dynamicFields.length > 0 ? dynamicFields : [
                        { field_name: 'name', label: 'Full Name', field_type: 'text', placeholder: 'Legal Name', is_required: true },
                        { field_name: 'phone', label: 'Phone Number', field_type: 'tel', placeholder: '10 Digits', is_required: true },
                        { field_name: 'email', label: 'Email Address', field_type: 'email', placeholder: 'official@email.com', is_required: true },
                        { field_name: 'requirement', label: 'Loan Requirement', field_type: 'number', placeholder: 'Loan Amount', is_required: true },
                      ]).map((field) => (
                        <div key={field.field_name} className={`${field.field_type === 'textarea' || field.field_name === 'email' ? 'md:col-span-2' : ''} space-y-3`}>
                          <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                            {renderIcon(field.field_type)} {field.label}
                          </label>
                          
                          {field.field_type === 'textarea' ? (
                            <textarea
                              name={field.field_name}
                              required={field.is_required}
                              placeholder={field.placeholder}
                              rows="4"
                              className={`w-full bg-primary/5 border ${formErrors[field.field_name] ? 'border-red-500/50' : 'border-primary/10'} rounded-xl md:rounded-2xl py-4 md:py-5 px-6 focus:border-primary outline-none text-text-primary font-bold transition-all placeholder:text-text-secondary/50`}
                            ></textarea>
                          ) : field.field_type === 'file' ? (
                            <div className="relative">
                              <input 
                                name={field.field_name}
                                type="file"
                                required={field.is_required}
                                className={`w-full bg-primary/5 border ${formErrors[field.field_name] ? 'border-red-500/50' : 'border-primary/10'} rounded-xl md:rounded-2xl py-4 md:py-5 px-6 focus:border-primary outline-none text-text-primary font-bold transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-primary file:text-white cursor-pointer`} 
                              />
                            </div>
                          ) : (
                            <div className="relative">
                              {field.field_type === 'number' && <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary font-bold md:text-lg">₹</span>}
                              <input 
                                name={field.field_name}
                                type={field.field_type}
                                required={field.is_required}
                                defaultValue={field.field_name === 'requirement' ? new URLSearchParams(location.search).get('amount') : ''}
                                placeholder={field.placeholder}
                                className={`w-full bg-primary/5 border ${formErrors[field.field_name] ? 'border-red-500/50' : 'border-primary/10'} rounded-xl md:rounded-2xl py-4 md:py-5 ${field.field_type === 'number' ? 'pl-12 md:pl-14' : 'px-6'} pr-6 focus:border-primary outline-none text-text-primary font-bold transition-all placeholder:text-text-secondary/50`} 
                              />
                            </div>
                          )}
                          {formErrors[field.field_name] && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{formErrors[field.field_name]}</p>}
                        </div>
                      ))}

                      {/* Employment Type Dropdown */}
                      <div className="md:col-span-2 space-y-3 pt-4 border-t border-primary/5">
                        <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-text-secondary flex items-center gap-2">
                          <Wallet size={14} className="text-primary" /> Employment Type
                        </label>
                        <select
                          name="employment_type"
                          required
                          value={employmentType}
                          onChange={(e) => setEmploymentType(e.target.value)}
                          className={`w-full bg-primary/5 border ${formErrors['employment_type'] ? 'border-red-500/50' : 'border-primary/10'} rounded-xl md:rounded-2xl py-4 md:py-5 px-6 focus:border-primary outline-none text-text-primary font-bold transition-all appearance-none cursor-pointer`}
                        >
                          <option value="">Select Employment Type</option>
                          <option value="Salaried">Salaried</option>
                          <option value="Self Employed Professional">Self Employed Professional</option>
                          <option value="Self Employed Non-Professional">Self Employed Non-Professional</option>
                        </select>
                        {formErrors['employment_type'] && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{formErrors['employment_type']}</p>}
                      </div>

                      {/* Conditional Document Uploads */}
                      {employmentType && (
                        <div className="md:col-span-2 space-y-6 pt-6 animate-in fade-in slide-in-from-top-4 duration-500">
                          <div className="flex items-center gap-4">
                            <div className="h-px bg-primary/10 flex-grow"></div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary whitespace-nowrap">Document Protocol: {employmentType}</h4>
                            <div className="h-px bg-primary/10 flex-grow"></div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {documentChecklists[employmentType].map((field) => (
                              <div key={field.field_name} className="space-y-3">
                                <label className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-text-secondary flex items-center justify-between gap-2">
                                  <span className="flex items-center gap-2">
                                    <FileUp size={14} className="text-primary" /> {field.label}
                                  </span>
                                  <span className="text-[9px] opacity-60 font-black">
                                    {field.label.toLowerCase().includes('photo') || field.label.toLowerCase().includes('card') ? 'Max 2MB' : 'Max 10MB'}
                                  </span>
                                </label>
                                <div className="relative">
                                  <input 
                                    name={field.field_name}
                                    type="file"
                                    required={field.is_required}
                                    className={`w-full bg-primary/5 border ${formErrors[field.field_name] ? 'border-red-500/50' : 'border-primary/10'} rounded-xl md:rounded-2xl py-4 md:py-5 px-6 focus:border-primary outline-none text-text-primary font-bold transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-primary file:text-white cursor-pointer`} 
                                  />
                                </div>
                                {formErrors[field.field_name] && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{formErrors[field.field_name]}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="md:col-span-2 pt-6 md:pt-10">
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full btn-premium py-5 md:py-6 text-lg md:text-2xl group shadow-2xl disabled:opacity-70 cursor-pointer"
                        >
                           {isSubmitting ? "Submitting..." : "Apply Now"} 
                           {!isSubmitting && <ChevronRight size={32} className="group-hover:translate-x-2 transition-transform" />}
                        </button>
                        <div className="flex items-center justify-center gap-3 mt-6 text-[10px] text-text-secondary font-bold uppercase tracking-[0.2em]">
                          <Lock size={12} className="text-primary" /> Secure AES-256 Bit Transmission
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-8 md:space-y-12 py-20 md:py-32 px-4"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center text-primary shadow-[0_0_50px_rgba(6,95,70,0.1)]">
              <CheckCircle2 size={48} className="md:w-16 md:h-16 animate-pulse" />
            </div>
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-2xl md:text-4xl font-bold font-primary text-primary">Thank you for your application.</h3>
              <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Your request for <span className="text-primary font-black border-b border-primary/40">{serviceTitle}</span> has been successfully submitted. Our team will get back to you shortly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
              {window.whatsappUrl && (
                <button 
                  onClick={() => window.open(window.whatsappUrl, '_blank')}
                  className="btn-premium px-12 py-4 md:py-5 text-base md:text-lg bg-emerald-600 hover:bg-emerald-700 border-none cursor-pointer"
                >
                  Send WhatsApp Update
                </button>
              )}
              <Link to="/" className="btn-premium px-12 py-4 md:py-5 text-base md:text-lg cursor-pointer">
                Back to Portfolio
              </Link>
              <Link to="/loans" className="px-12 py-4 md:py-5 text-base md:text-lg font-bold border border-primary/10 rounded-2xl hover:bg-primary/5 transition-all text-center text-primary cursor-pointer">
                View More Loans
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Badges */}
      <section className="py-16 md:py-24 border-t border-primary/10 bg-primary/5 mt-auto overflow-hidden">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6 md:gap-16 items-center opacity-60">
            {['Bank-Grade Security', 'Institutional Vault', 'High Fidelity Scanning', 'Instant Decisioning'].map(badge => (
              <div key={badge} className="flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-primary">
                <ShieldCheck size={20} className="text-primary" /> {badge}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyLoan;
