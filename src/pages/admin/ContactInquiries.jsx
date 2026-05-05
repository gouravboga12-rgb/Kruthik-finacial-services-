import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import AdminTable from "../../components/admin/AdminTable";
import { format } from "date-fns";
import { 
  Eye, 
  Trash2, 
  CheckCircle2, 
  X, 
  Clock, 
  AlertCircle,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  User,
  Zap
} from "lucide-react";

const ContactInquiries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      setData(data.map(p => p.id === id ? { ...p, status: newStatus } : p));
      if (selectedInquiry?.id === id) setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      alert(`Status updated to ${newStatus}`);
    } catch (error) {
      alert("Error updating status: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry? This action cannot be undone.")) return;
    
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setData(data.filter(p => p.id !== id));
      setSelectedInquiry(null);
      alert("Inquiry deleted successfully.");
    } catch (error) {
      alert("Error deleting inquiry: " + error.message);
    }
  };

  const columns = [
    { 
      key: "name", 
      label: "Name",
      render: (val, row) => (
        <div className="py-1">
          <p className="font-bold text-slate-800 leading-tight">{val}</p>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">{row.email.toLowerCase()}</p>
        </div>
      )
    },
    { 
      key: "phone", 
      label: "Phone",
      render: (val) => <span className="font-mono text-xs font-bold text-slate-600">{val}</span>
    },
    { 
      key: "loan_segment", 
      label: "Interest",
      render: (val) => (
        <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-600 uppercase tracking-wider">
          {val}
        </span>
      )
    },
    { 
      key: "status", 
      label: "Status",
      render: (val) => (
        <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full border flex items-center gap-1.5 w-fit ${
          val === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
          val === 'Archived' ? 'bg-slate-50 text-slate-400 border-slate-200' :
          'bg-blue-50 text-blue-600 border-blue-100 animate-pulse'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${
            val === 'Resolved' ? 'bg-emerald-500' :
            val === 'Archived' ? 'bg-slate-300' :
            'bg-blue-500'
          }`} />
          {val || 'New'}
        </span>
      )
    },
    { 
      key: "created_at", 
      label: "Date",
      render: (val) => (
        <div className="text-slate-500">
          <p className="text-xs font-bold text-slate-700">{format(new Date(val), "MMM dd, yyyy")}</p>
          <p className="text-[10px] font-medium opacity-60">{format(new Date(val), "hh:mm a")}</p>
        </div>
      )
    },
    {
      key: "id",
      label: "Actions",
      render: (id, row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSelectedInquiry(row)}
            className="p-2 hover:bg-primary/10 text-primary rounded-xl transition-all border border-transparent hover:border-primary/20"
          >
            <Eye size={18} />
          </button>
          <button 
            onClick={() => handleDelete(id)}
            className="p-2 hover:bg-rose-50 text-rose-500 rounded-xl transition-all border border-transparent hover:border-rose-100"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <AdminTable 
        title="Contact Inquiries"
        columns={columns}
        data={data}
        loading={loading}
      />

      {/* Details Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedInquiry(null)}></div>
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl border border-white/20">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Inquiry Details</h3>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Ref: #{selectedInquiry.id.slice(0, 8)}</p>
                </div>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="p-3 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-2xl transition-all border border-slate-100">
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto space-y-8">
              {/* Status Section */}
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Current Status</p>
                  <div className="flex items-center gap-2 text-slate-800 font-bold">
                    {selectedInquiry.status === 'Resolved' ? <CheckCircle2 className="text-emerald-500" /> : 
                     selectedInquiry.status === 'Archived' ? <Clock className="text-slate-400" /> : <Zap className="text-blue-500 animate-pulse" />}
                    {selectedInquiry.status || 'New Inquiry'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => updateStatus(selectedInquiry.id, 'Resolved')}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/20"
                  >
                    Mark Resolved
                  </button>
                  <button 
                    onClick={() => updateStatus(selectedInquiry.id, 'Archived')}
                    className="px-4 py-2 bg-slate-500 text-white rounded-xl text-xs font-bold hover:bg-slate-600 transition-all shadow-md shadow-slate-500/20"
                  >
                    Archive
                  </button>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                         <User size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Full Name</p>
                        <p className="text-sm font-bold text-slate-700">{selectedInquiry.name}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                         <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Email Address</p>
                        <p className="text-sm font-bold text-slate-700">{selectedInquiry.email}</p>
                      </div>
                   </div>
                </div>
                
                <div className="space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                         <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Phone Number</p>
                        <p className="text-sm font-bold text-slate-700">{selectedInquiry.phone}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                         <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Date Received</p>
                        <p className="text-sm font-bold text-slate-700">{format(new Date(selectedInquiry.created_at), "PPP p")}</p>
                      </div>
                   </div>
                </div>

                <div className="md:col-span-2">
                   <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 space-y-4">
                      <div className="flex items-center gap-2 text-[10px] uppercase font-black text-primary tracking-widest">
                         <Zap size={14} /> Interest: {selectedInquiry.loan_segment}
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">Message from Customer</p>
                        <p className="text-sm font-medium text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-100 italic">
                          "{selectedInquiry.message}"
                        </p>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex gap-4">
               <button 
                onClick={() => handleDelete(selectedInquiry.id)}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-rose-50 text-rose-600 font-bold rounded-2xl border border-rose-100 hover:bg-rose-100 transition-all"
               >
                 <Trash2 size={18} /> Delete inquiry
               </button>
               <button 
                onClick={() => setSelectedInquiry(null)}
                className="flex-grow py-4 bg-white hover:bg-slate-100 text-slate-500 font-bold rounded-2xl border border-slate-200 transition-all"
               >
                 Close Details
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactInquiries;
