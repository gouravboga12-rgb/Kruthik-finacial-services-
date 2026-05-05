import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  ShieldCheck,
  Save,
  Loader2,
  List
} from "lucide-react";

const FormFieldManager = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchServiceAndFields();
  }, [serviceId]);

  const fetchServiceAndFields = async () => {
    try {
      const [serviceRes, fieldsRes] = await Promise.all([
        supabase.from('loan_services').select('*').eq('id', serviceId).single(),
        supabase.from('loan_service_fields').select('*').eq('service_id', serviceId).order('display_order', { ascending: true })
      ]);

      if (serviceRes.error) throw serviceRes.error;
      setService(serviceRes.data);
      setFields(fieldsRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/admin/services");
    } finally {
      setLoading(false);
    }
  };

  const addField = () => {
    const newField = {
      id: `temp-${Date.now()}`,
      service_id: serviceId,
      label: "",
      field_name: "",
      field_type: "text",
      placeholder: "",
      is_required: true,
      display_order: fields.length
    };
    setFields([...fields, newField]);
  };

  const addStandardFields = () => {
    const now = Date.now();
    const standardFields = [
      { id: `s1-${now}`, service_id: serviceId, label: "Full Name", field_name: "name", field_type: "text", placeholder: "Legal Name", is_required: true, display_order: fields.length },
      { id: `s2-${now}`, service_id: serviceId, label: "Phone Number", field_name: "phone", field_type: "tel", placeholder: "10 Digits", is_required: true, display_order: fields.length + 1 },
      { id: `s3-${now}`, service_id: serviceId, label: "Email Address", field_name: "email", field_type: "email", placeholder: "official@email.com", is_required: true, display_order: fields.length + 2 },
      { id: `s4-${now}`, service_id: serviceId, label: "Loan Requirement", field_name: "requirement", field_type: "number", placeholder: "Loan Amount", is_required: true, display_order: fields.length + 3 },
      { id: `s5-${now}`, service_id: serviceId, label: "Aadhaar Card", field_name: "aadhaar", field_type: "file", placeholder: "Front & Back Copy", is_required: true, display_order: fields.length + 4 },
      { id: `s6-${now}`, service_id: serviceId, label: "PAN Card", field_name: "pan", field_type: "file", placeholder: "Clear Photo", is_required: true, display_order: fields.length + 5 },
      { id: `s7-${now}`, service_id: serviceId, label: "Bank Statement", field_name: "bank_statement", field_type: "file", placeholder: "Latest 3 Months PDF", is_required: true, display_order: fields.length + 6 },
    ];

    // Add ITR for non-personal loans
    if (service?.title?.toLowerCase() !== 'personal loan') {
      standardFields.push({ id: `s8-${now}`, service_id: serviceId, label: "ITR Documents", field_name: "itr", field_type: "file", placeholder: "Latest 2 Years", is_required: true, display_order: fields.length + 7 });
    }

    setFields([...fields, ...standardFields]);
  };

  const removeField = (id) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id, updates) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await supabase.from('loan_service_fields').delete().eq('service_id', serviceId);
      
      const fieldsToInsert = fields.map((f, idx) => {
        const { id, ...rest } = f;
        const field_name = rest.field_name || rest.label.toLowerCase().replace(/ /g, '_').replace(/[^\w]/g, '');
        return { ...rest, field_name, display_order: idx };
      });

      if (fieldsToInsert.length > 0) {
        const { error } = await supabase.from('loan_service_fields').insert(fieldsToInsert);
        if (error) throw error;
      }

      alert("Form configuration saved successfully!");
      fetchServiceAndFields();
    } catch (error) {
      console.error("Error saving fields:", error);
      alert("Failed to save configuration.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 size={40} className="animate-spin text-primary" />
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Form Architect...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-20 z-10">
        <div className="flex items-center gap-4">
          <Link to="/admin/services" className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800 font-primary">{service?.title}</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
              Form Protocol: <span className="text-primary">{fields.length} Fields Active</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              const now = Date.now();
              const docs = [
                { id: `d1-${now}`, service_id: serviceId, label: "Aadhaar Card", field_name: "aadhaar", field_type: "file", placeholder: "Front & Back Copy", is_required: true, display_order: fields.length },
                { id: `d2-${now}`, service_id: serviceId, label: "PAN Card", field_name: "pan", field_type: "file", placeholder: "Clear Photo", is_required: true, display_order: fields.length + 1 },
                { id: `d3-${now}`, service_id: serviceId, label: "Bank Statement", field_name: "bank_statement", field_type: "file", placeholder: "Latest 3 Months PDF", is_required: true, display_order: fields.length + 2 },
              ];
              if (service?.title?.toLowerCase() !== 'personal loan') {
                docs.push({ id: `d4-${now}`, service_id: serviceId, label: "ITR Documents", field_name: "itr", field_type: "file", placeholder: "Latest 2 Years", is_required: true, display_order: fields.length + 3 });
              }
              setFields([...fields, ...docs]);
            }}
            className="hidden md:flex py-3 px-6 text-xs font-bold text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl border border-dashed border-amber-300 hover:border-amber-400 transition-all items-center gap-2"
          >
            <ShieldCheck size={14} /> Add Document Checklist
          </button>
          <button 
            onClick={addStandardFields}
            className="hidden md:flex py-3 px-6 text-xs font-bold text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl border border-dashed border-slate-300 hover:border-primary transition-all items-center gap-2"
          >
            <Plus size={14} /> Add Standard Fields
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="btn-premium py-3 px-8 text-sm flex items-center gap-2 disabled:opacity-70 shadow-lg shadow-primary/20"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Form
          </button>
        </div>
      </div>

      {/* Field List */}
      <div className="space-y-4">
        {fields.length === 0 ? (
          <div className="py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm">
              <List size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800">Form is Currently Empty</h3>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">Click below to add custom questions or use the shortcut above.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {fields.map((field, idx) => (
              <div 
                key={field.id} 
                className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden group hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4 p-6">
                  <div className="text-slate-300 font-black text-xl w-8">
                    {idx + 1}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">Question Label</label>
                      <input 
                        value={field.label} 
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm font-bold" 
                        placeholder="e.g. Monthly Income"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">Input Type</label>
                      <select 
                        value={field.field_type} 
                        onChange={(e) => updateField(field.id, { field_type: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm font-bold appearance-none cursor-pointer"
                      >
                        <option value="text">Short Text</option>
                        <option value="number">Number / Currency</option>
                        <option value="tel">Phone Number</option>
                        <option value="email">Email Address</option>
                        <option value="textarea">Long Text / Message</option>
                        <option value="file">File Upload (Document)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">Placeholder</label>
                      <input 
                        value={field.placeholder} 
                        onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm font-medium" 
                        placeholder="e.g. Enter amount"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={field.is_required} 
                        onChange={(e) => updateField(field.id, { is_required: e.target.checked })}
                        className="w-4 h-4 accent-primary cursor-pointer"
                      />
                      <label className="text-[9px] uppercase font-bold text-slate-400">Required</label>
                    </div>
                    <button 
                      onClick={() => removeField(field.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={addField}
          className="w-full py-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 group shadow-sm bg-white"
        >
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-all">
            <Plus size={24} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">Add Custom Field</span>
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl flex items-start gap-4">
         <ShieldCheck size={24} className="text-amber-500 shrink-0" />
         <div>
            <h4 className="text-sm font-bold text-amber-800 uppercase tracking-widest mb-1">Live Integration</h4>
            <p className="text-xs text-amber-700 leading-relaxed">
              Any changes you save here will immediately update the <strong>Apply Loan</strong> form for {service?.title}. 
            </p>
         </div>
      </div>
    </div>
  );
};

export default FormFieldManager;
