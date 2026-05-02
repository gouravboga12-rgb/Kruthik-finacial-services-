import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ChevronLeft, User } from 'lucide-react';

const WhatsAppChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Welcome to Kruthik Financial Services! How can we assist you today with your financial needs?' }
  ]);
  const [currentStep, setCurrentStep] = useState('start');
  const [userInput, setUserInput] = useState('');
  const [selectionSummary, setSelectionSummary] = useState({});
  const messagesEndRef = useRef(null);

  const phoneNumber = '7026133444';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const addMessage = (type, text) => {
    setMessages(prev => [...prev, { type, text }]);
  };

  const handleOptionClick = (option, nextStep, category) => {
    addMessage('user', option);
    setSelectionSummary(prev => ({ ...prev, [category]: option }));
    
    // Simulated Bot Typing delay
    setTimeout(() => {
      processNextStep(nextStep, option);
    }, 600);
  };

  const processNextStep = (nextStep, value) => {
    setCurrentStep(nextStep);
    
    switch (nextStep) {
      case 'loan_amount':
        addMessage('bot', `Excellent. What is the approximate loan amount you are looking for?`);
        break;
      case 'employment':
        addMessage('bot', `Understood. And what is your current employment type?`);
        break;
      case 'cibil_check':
        addMessage('bot', `Great! A high CIBIL score unlocks lower interest rates. Would you like to check it for free on our website first, or talk to an expert?`);
        break;
      case 'other_describe':
        addMessage('bot', `Please describe your financial requirement or query. Our senior advisors will review it immediately.`);
        break;
      case 'final':
        addMessage('bot', `Thank you for the details. I have prepared your profile. Click the button below to connect with our executive on WhatsApp.`);
        break;
      default:
        break;
    }
  };

  const handleSendCustom = () => {
    if (!userInput.trim()) return;
    const text = userInput;
    setUserInput('');
    addMessage('user', text);
    
    setTimeout(() => {
      setSelectionSummary(prev => ({ ...prev, details: text }));
      processNextStep('final');
    }, 600);
  };

  const startWhatsApp = () => {
    let msg = "Hello Kruthik Financial Services, I am interested in your services.\n\nDetails:";
    Object.entries(selectionSummary).forEach(([key, val]) => {
      msg += `\n- ${key}: ${val}`;
    });
    window.open(`https://wa.me/91${phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-secondary">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-24 right-0 w-[350px] md:w-[400px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-primary/10 flex flex-col max-h-[600px]"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white shrink-0 relative">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-white/30 shadow-inner overflow-hidden">
                   <div className="w-full h-full bg-white flex items-center justify-center text-primary font-black text-xl">K</div>
                </div>
                <div>
                  <h3 className="font-primary text-lg font-bold leading-none">Kruthik AI Assistant</h3>
                  <p className="text-[9px] text-white/80 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></span>
                    Online & Ready to Help
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-grow p-6 bg-[#f0f2f5] overflow-y-auto relative scrollbar-hide">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcd2de5.png')` }}></div>
              
              <div className="space-y-4 relative z-10">
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: msg.type === 'bot' ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`p-4 rounded-2xl shadow-sm max-w-[85%] text-sm ${
                      msg.type === 'bot' 
                      ? 'bg-white text-text-secondary rounded-tl-none font-medium' 
                      : 'bg-primary text-white rounded-tr-none font-bold'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Interaction Layer */}
              <div className="mt-6 space-y-3 relative z-10">
                {currentStep === 'start' && (
                  <div className="flex flex-wrap gap-2">
                    {['Personal Loan', 'Business Loan', 'Home Loan', 'Check CIBIL', 'Others'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => handleOptionClick(opt, opt === 'Check CIBIL' ? 'cibil_check' : opt === 'Others' ? 'other_describe' : 'loan_amount', 'service')}
                        className="bg-white border border-primary/10 px-4 py-2 rounded-xl text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {currentStep === 'loan_amount' && (
                  <div className="flex flex-wrap gap-2">
                    {['Under 5 Lakhs', '5-20 Lakhs', '20-50 Lakhs', 'Above 50L'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => handleOptionClick(opt, 'employment', 'budget')}
                        className="bg-white border border-primary/10 px-4 py-2 rounded-xl text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {currentStep === 'employment' && (
                  <div className="flex flex-wrap gap-2">
                    {['Salaried Individual', 'Self-Employed', 'Business Owner'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => handleOptionClick(opt, 'final', 'employment')}
                        className="bg-white border border-primary/10 px-4 py-2 rounded-xl text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {currentStep === 'cibil_check' && (
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => window.location.href = '/cibil-score'}
                      className="bg-white border border-primary/10 px-4 py-2 rounded-xl text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
                    >
                      Check on Website
                    </button>
                    <button 
                      onClick={() => handleOptionClick('Talk to Expert', 'final', 'cibil_interest')}
                      className="bg-white border border-primary/10 px-4 py-2 rounded-xl text-xs font-bold text-accent hover:bg-accent hover:text-white transition-all shadow-sm active:scale-95"
                    >
                      Talk to Expert
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
              {currentStep === 'final' ? (
                <button 
                  onClick={startWhatsApp}
                  className="w-full bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-sm shadow-xl shadow-[#25D366]/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <MessageCircle size={20} /> Finalize on WhatsApp
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={currentStep === 'other_describe' ? "Describe requirement..." : "Type a message..."}
                    className="flex-grow bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[11px] font-bold text-slate-700 outline-none focus:border-primary/30 transition-all placeholder:text-slate-400 placeholder:uppercase"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendCustom()}
                  />
                  <button 
                    onClick={handleSendCustom}
                    className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/10"
                  >
                    <Send size={18} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[110] w-16 h-16 md:w-20 md:h-20 bg-[#25D366] text-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 group ${isOpen ? 'rotate-90 !bg-slate-800 shadow-none' : 'animate-bounce shadow-[#25D366]/40'}`}
      >
        {isOpen ? <X size={32} /> : (
          <div className="relative">
            <MessageCircle size={32} className="md:w-10 md:h-10" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#25D366] rounded-full animate-ping"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default WhatsAppChatbot;
