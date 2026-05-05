import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Lock, Mail, ChevronRight, AlertCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden font-secondary">
      {/* Abstract Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full -mr-96 -mt-96"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full -ml-72 -mb-72"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-3xl border border-white/10 p-10 md:p-14 rounded-[3rem] shadow-2xl space-y-10">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center text-primary mx-auto border border-primary/20 mb-6">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-primary text-white">Executive Login</h1>
            <p className="text-slate-400 text-xs md:text-sm uppercase tracking-[0.3em] font-bold">Kruthik Financial Services</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-bold"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-1">Administrator Email</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kruthik.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:border-primary outline-none text-white font-bold transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-1">Secure Passkey</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:border-primary outline-none text-white font-bold transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-premium py-5 text-xl group shadow-2xl disabled:opacity-70 mt-4"
            >
              {loading ? "Authenticating..." : "Initialize Session"} 
              {!loading && <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />}
            </button>
          </form>

          <div className="text-center">
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
               <Lock size={12} /> Institutional Grade Security
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
