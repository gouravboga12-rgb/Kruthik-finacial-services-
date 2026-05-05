import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import AdminTable from "../../components/admin/AdminTable";
import { format } from "date-fns";
import { 
  Eye, 
  Mail, 
  Phone, 
  Calendar, 
  IndianRupee, 
  FileText,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Trash2
} from "lucide-react";

const LoanApplications = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const { data, error } = await supabase
        .from('loan_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLoans(data || []);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('loan_applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setLoans(loans.map(l => l.id === id ? { ...l, status: newStatus } : l));
      if (selectedLoan?.id === id) setSelectedLoan({ ...selectedLoan, status: newStatus });
    } catch (error) {
      alert("Error updating status: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application? This action cannot be undone.")) return;

    try {
      const { error } = await supabase
        .from('loan_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setLoans(loans.filter(l => l.id !== id));
      if (selectedLoan?.id === id) setSelectedLoan(null);
    } catch (error) {
      alert("Error deleting application: " + error.message);
    }
  };

  const columns = [
    { 
      key: "name", 
      label: "Applicant",
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-sm">
            {val.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-slate-800 leading-tight">{val}</p>
            <p className="text-[11px] text-slate-500 font-medium lowercase mt-0.5">{row.email}</p>
          </div>
        </div>
      )
    },
    { 
      key: "phone", 
      label: "Phone",
      render: (val) => (
        <span className="font-mono text-xs font-bold text-slate-600">{val}</span>
      )
    },
    { 
      key: "loan_type", 
      label: "Category",
      render: (val) => (
        <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-600 uppercase tracking-wider">
          {val}
        </span>
      )
    },
    { 
      key: "requirement", 
      label: "Requirement",
      render: (val) => (
        <span className="font-black text-slate-800 flex items-center gap-0.5">
          <IndianRupee size={12} className="text-primary" />
          {val?.toLocaleString('en-IN')}
        </span>
      )
    },
    { 
      key: "status", 
      label: "Status",
      render: (val) => (
        <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full shadow-sm flex items-center gap-1.5 w-fit ${
          val === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-emerald-100/50' :
          val === 'Rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100 shadow-rose-100/50' :
          'bg-amber-50 text-amber-600 border border-amber-100 shadow-amber-100/50'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
             val === 'Approved' ? 'bg-emerald-500' :
             val === 'Rejected' ? 'bg-rose-500' :
             'bg-amber-500'
          }`} />
          {val || 'Pending'}
        </span>
      )
    },
    { 
      key: "created_at", 
      label: "Submitted",
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
            onClick={() => setSelectedLoan(row)}
            className="p-2 hover:bg-primary/10 text-primary rounded-xl transition-all border border-transparent hover:border-primary/20"
          >
            <Eye size={18} />
          </button>
          <button 
            onClick={() => handleDelete(id)}
            className="p-2 hover:bg-rose-50 text-rose-500 rounded-xl transition-all border border-transparent hover:border-rose-200"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  const handleExport = () => {
    const headers = ["Name", "Email", "Phone", "Loan Type", "Requirement", "Status", "Date"];
    const rows = loans.map(loan => [
      loan.name,
      loan.email,
      loan.phone,
      loan.loan_type,
      loan.requirement,
      loan.status,
      format(new Date(loan.created_at), "yyyy-MM-dd HH:mm")
    ].join(",")).join("\n");
    
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `applications_${format(new Date(), "yyyy_MM_dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <AdminTable 
        title="Loan Applications"
        columns={columns}
        data={loans}
        loading={loading}
        onExport={handleExport}
      />

      {/* Details Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedLoan(null)}></div>
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl border border-white/20">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <FileText size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Application Details</h3>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">ID: #{selectedLoan.id.slice(0, 8)}</p>
                </div>
              </div>
              <button onClick={() => setSelectedLoan(null)} className="p-3 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-2xl transition-all border border-slate-100">
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
                    {selectedLoan.status === 'Approved' ? <CheckCircle2 className="text-emerald-500" /> : 
                     selectedLoan.status === 'Rejected' ? <AlertCircle className="text-rose-500" /> : <Clock className="text-amber-500" />}
                    {selectedLoan.status || 'Pending Review'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => updateStatus(selectedLoan.id, 'Approved')}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/20"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => updateStatus(selectedLoan.id, 'Rejected')}
                    className="px-4 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold hover:bg-rose-600 transition-all shadow-md shadow-rose-500/20"
                  >
                    Reject
                  </button>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest flex items-center gap-1.5"><Mail size={12}/> Email Address</p>
                  <p className="text-sm font-bold text-slate-700">{selectedLoan.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest flex items-center gap-1.5"><Phone size={12}/> Phone Number</p>
                  <p className="text-sm font-bold text-slate-700">{selectedLoan.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest flex items-center gap-1.5"><Calendar size={12}/> Date Applied</p>
                  <p className="text-sm font-bold text-slate-700">{format(new Date(selectedLoan.created_at), "PPP p")}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest flex items-center gap-1.5"><IndianRupee size={12}/> Loan Amount</p>
                  <p className="text-sm font-bold text-slate-700">₹{selectedLoan.requirement?.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Dynamic Form Data Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px bg-slate-100 flex-grow" />
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Custom Field Data</p>
                  <div className="h-px bg-slate-100 flex-grow" />
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(selectedLoan.form_data || {}).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-500 capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="text-xs font-black text-slate-800">
                        {typeof val === 'string' && val.startsWith('http') ? (
                          <a href={val} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                            View Document <ExternalLink size={12} />
                          </a>
                        ) : String(val)}
                      </span>
                    </div>
                  ))}
                  {(!selectedLoan.form_data || Object.keys(selectedLoan.form_data).length === 0) && (
                    <p className="text-center text-xs text-slate-400 italic">No additional field data provided.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex gap-4">
               <button 
                onClick={() => setSelectedLoan(null)}
                className="flex-grow py-4 bg-white hover:bg-slate-100 text-slate-500 font-bold rounded-2xl border border-slate-200 transition-all"
               >
                 Close Details
               </button>
               <button 
                onClick={() => handleDelete(selectedLoan.id)}
                className="px-8 py-4 bg-rose-50 hover:bg-rose-100 text-rose-500 font-bold rounded-2xl border border-rose-100 transition-all flex items-center gap-2"
               >
                 <Trash2 size={18} /> Delete
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoanApplications;

