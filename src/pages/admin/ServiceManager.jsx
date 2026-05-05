import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { uploadToCloudinary } from "../../lib/cloudinary";
import AdminTable from "../../components/admin/AdminTable";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Settings, 
  Eye, 
  CheckCircle, 
  XCircle,
  Image as ImageIcon,
  Layout
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    setIsUploading(true);
    const url = await uploadToCloudinary(file, "loan-services");
    setIsUploading(false);
    return url;
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('loan_services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service? All associated form fields will also be deleted.")) return;
    
    try {
      const { error } = await supabase
        .from('loan_services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setServices(services.filter(s => s.id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service.");
    }
  };

  const columns = [
    { 
      key: "title", 
      label: "Service Name",
      render: (val, row) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
            {row.image_url ? (
              <img src={row.image_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <Layout size={20} />
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-slate-800 leading-tight">{val}</p>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">/{row.slug}</p>
          </div>
        </div>
      )
    },
    { 
      key: "description", 
      label: "Description",
      render: (val) => (
        <p className="max-w-[200px] truncate text-xs text-slate-500">{val}</p>
      )
    },
    { 
      key: "is_active", 
      label: "Visibility",
      render: (val) => (
        <span className={`flex items-center gap-1.5 font-bold text-[10px] uppercase ${val ? 'text-emerald-500' : 'text-slate-400'}`}>
          {val ? <CheckCircle size={14} /> : <XCircle size={14} />}
          {val ? "Live" : "Hidden"}
        </span>
      )
    },
    { 
      key: "id", 
      label: "Controls",
      render: (id, row) => (
        <div className="flex items-center gap-2">
          <button 
            className="p-2.5 hover:bg-blue-50 text-blue-600 rounded-xl transition-all border border-slate-100 hover:border-blue-200"
            title="Edit Content"
            onClick={() => {
              setEditingService(row);
              setPreviewUrl(row.image_url);
              setIsModalOpen(true);
            }}
          >
            <Edit2 size={16} />
          </button>
          <Link 
            to={`/admin/services/${id}/form`}
            className="p-2.5 hover:bg-amber-50 text-amber-600 rounded-xl transition-all border border-slate-100 hover:border-amber-200"
            title="Manage Form Fields"
          >
            <Settings size={16} />
          </Link>
          <button 
            className="p-2.5 hover:bg-red-50 text-red-600 rounded-xl transition-all border border-slate-100 hover:border-red-200"
            title="Delete"
            onClick={() => handleDelete(id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-primary">Service Manager</h1>
          <p className="text-slate-500 text-sm">Create and manage your loan services and custom application forms.</p>
        </div>
        <button 
          onClick={() => {
            setEditingService(null);
            setPreviewUrl(null);
            setIsModalOpen(true);
          }}
          className="btn-premium py-3 px-6 text-sm flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Plus size={18} /> Add New Service
        </button>
      </div>

      <AdminTable 
        title="Services"
        columns={columns}
        data={services}
        loading={loading}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl border border-white/20">
             <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-xl font-bold text-slate-800">{editingService ? "Edit Service" : "Add New Service"}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <XCircle size={24} />
                </button>
             </div>
             
              <form className="p-8 space-y-6 max-h-[70vh] overflow-y-auto" onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                
                let imageUrl = editingService?.image_url;
                const imageFile = e.target.image_file.files[0];

                if (imageFile) {
                  const uploadedUrl = await uploadImage(imageFile);
                  if (uploadedUrl) imageUrl = uploadedUrl;
                  else return;
                }

                // Parse features from newline-separated string to array
                const featuresArray = data.features
                  ? data.features.split('\n').filter(line => line.trim() !== '')
                  : [];

                const serviceData = {
                  title: data.title,
                  slug: data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
                  description: data.description,
                  image_url: imageUrl,
                  features: featuresArray,
                  is_active: data.is_active === 'on',
                  display_order: parseInt(data.display_order) || 0,
                  icon_name: 'Layout'
                };

                try {
                  if (editingService) {
                    const { error } = await supabase
                     .from('loan_services')
                     .update(serviceData)
                     .eq('id', editingService.id);
                    if (error) throw error;
                  } else {
                    const { data: newService, error } = await supabase
                     .from('loan_services')
                     .insert([serviceData])
                     .select()
                     .single();
                    if (error) throw error;

                    // Automatically add default fields for the new service
                    const defaultFields = [
                      { service_id: newService.id, label: 'Full Name', field_name: 'name', field_type: 'text', placeholder: 'Legal Name', is_required: true, display_order: 0 },
                      { service_id: newService.id, label: 'Phone Number', field_name: 'phone', field_type: 'tel', placeholder: '10 Digits', is_required: true, display_order: 1 },
                      { service_id: newService.id, label: 'Email Address', field_name: 'email', field_type: 'email', placeholder: 'official@email.com', is_required: true, display_order: 2 },
                      { service_id: newService.id, label: 'Loan Requirement', field_name: 'requirement', field_type: 'number', placeholder: 'Loan Amount', is_required: true, display_order: 3 },
                      { service_id: newService.id, label: 'Description', field_name: 'description', field_type: 'textarea', placeholder: 'Tell us more...', is_required: false, display_order: 4 }
                    ];
                    await supabase.from('loan_service_fields').insert(defaultFields);
                  }
                  
                  await fetchServices();
                  setIsModalOpen(false);
                  alert("Service saved successfully!");
                } catch (error) {
                  alert("Error saving service: " + error.message);
                }
              }}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Service Title</label>
                    <input name="title" defaultValue={editingService?.title} required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all font-bold" placeholder="e.g. Personal Loan" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Display Order</label>
                    <input name="display_order" type="number" defaultValue={editingService?.display_order || 0} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all font-bold" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-2">
                    <ImageIcon size={14} className="text-primary" /> Service Image
                  </label>
                  
                  <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shadow-md border-2 border-white shrink-0">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                          <ImageIcon size={32} />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <input 
                        type="file" 
                        name="image_file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer" 
                      />
                      <p className="mt-2 text-[9px] text-slate-400">Choose a new image to replace the current one.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Description</label>
                  <textarea name="description" defaultValue={editingService?.description} rows="2" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all font-medium text-sm" placeholder="Briefly describe the loan service..."></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center justify-between">
                    <span>Description Points (Features)</span>
                    <span className="text-primary normal-case">One per line</span>
                  </label>
                  <textarea 
                    name="features" 
                    defaultValue={editingService?.features?.join('\n')} 
                    rows="5" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all font-medium text-sm leading-relaxed" 
                    placeholder="Instant approval for all profiles&#10;No collateral required&#10;Rates starting from 7.5%"
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <input type="checkbox" name="is_active" defaultChecked={editingService?.is_active ?? true} id="is_active" className="w-5 h-5 accent-primary" />
                  <label htmlFor="is_active" className="text-sm font-bold text-slate-700">Make this service visible on the website</label>
                </div>

                <div className="pt-4 flex gap-4 sticky bottom-0 bg-white py-4 border-t border-slate-100">
                  <button 
                    type="submit" 
                    disabled={isUploading}
                    className="flex-grow btn-premium py-4 disabled:opacity-50 shadow-lg shadow-primary/20"
                  >
                    {isUploading ? "Uploading Image..." : "Save Service Configuration"}
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 font-bold text-slate-500 hover:text-slate-800 transition-colors">Cancel</button>
                </div>
              </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManager;
