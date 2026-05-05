import { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit, 
  ExternalLink, 
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Loader2,
  Upload,
  Link as LinkIcon
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { uploadToCloudinary } from "../../lib/cloudinary";
import AdminTable from "../../components/admin/AdminTable";

const BannerManager = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setBanners(data || []);
    } catch (err) {
      console.error("Error fetching banners:", err);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file) => {
    setIsUploading(true);
    const url = await uploadToCloudinary(file, "banners");
    setIsUploading(false);
    return url;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    let imageUrl = editingBanner?.image_url;
    const imageFile = e.target.image_file.files[0];

    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) imageUrl = uploadedUrl;
      else return;
    }

    if (!imageUrl) {
      alert("Please upload an image first.");
      return;
    }

    const payload = {
      title: data.title,
      redirect_url: data.redirect_url,
      display_order: parseInt(data.display_order) || 0,
      is_active: data.is_active === "on",
      image_url: imageUrl
    };

    try {
      if (editingBanner) {
        const { error } = await supabase
          .from('banners')
          .update(payload)
          .eq('id', editingBanner.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('banners')
          .insert([payload]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      setEditingBanner(null);
      setPreviewUrl(null);
      fetchBanners();
    } catch (err) {
      console.error("Error saving banner:", err);
      alert("Error saving banner details.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      const { error } = await supabase
        .from('banners')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchBanners();
    } catch (err) {
      console.error("Error deleting banner:", err);
    }
  };

  const toggleStatus = async (banner) => {
    try {
      const { error } = await supabase
        .from('banners')
        .update({ is_active: !banner.is_active })
        .eq('id', banner.id);
      if (error) throw error;
      fetchBanners();
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const columns = [
    {
      key: "image_url",
      label: "Banner Preview",
      render: (url) => (
        <div className="w-40 h-20 rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
          <img src={url} alt="Banner" className="w-full h-full object-cover" />
        </div>
      )
    },
    {
      key: "title",
      label: "Title",
      render: (val) => <span className="font-bold text-slate-700">{val || "Untitled Offer"}</span>
    },
    {
      key: "redirect_url",
      label: "Redirect URL",
      render: (val) => (
        <div className="flex items-center gap-2 text-slate-500 max-w-[200px] truncate">
          <LinkIcon size={12} className="shrink-0" />
          <span className="text-xs truncate">{val || "No Link"}</span>
        </div>
      )
    },
    {
      key: "is_active",
      label: "Status",
      render: (val, row) => (
        <button 
          onClick={() => toggleStatus(row)}
          className={`px-3 py-1 text-[10px] font-black uppercase rounded-full flex items-center gap-1.5 ${
            val ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-200'
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${val ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
          {val ? 'Active' : 'Inactive'}
        </button>
      )
    },
    {
      key: "id",
      label: "Actions",
      render: (id, row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setEditingBanner(row);
              setPreviewUrl(row.image_url);
              setIsModalOpen(true);
            }}
            className="p-2 hover:bg-primary/10 text-primary rounded-xl transition-all"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={() => handleDelete(id)}
            className="p-2 hover:bg-rose-50 text-rose-500 rounded-xl transition-all"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Home Page Banners</h1>
          <p className="text-slate-500 text-sm">Manage dynamic offers and marketing banners.</p>
        </div>
        <button 
          onClick={() => {
            setEditingBanner(null);
            setPreviewUrl(null);
            setIsModalOpen(true);
          }}
          className="btn-premium flex items-center gap-2"
        >
          <Plus size={20} /> Add New Banner
        </button>
      </div>

      <AdminTable 
        columns={columns}
        data={banners}
        loading={loading}
      />

      {/* Banner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl relative z-10 overflow-hidden shadow-2xl border border-white/20">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <h3 className="text-xl font-bold text-slate-800">{editingBanner ? "Update Banner" : "Upload New Banner"}</h3>
               <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <XCircle size={24} />
               </button>
            </div>
            
            <form className="p-8 space-y-6" onSubmit={handleSave}>
              {/* Image Upload Area */}
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest block">Banner Image (1200x400 Recommended)</label>
                <div className="relative group h-48 rounded-[2rem] overflow-hidden border-2 border-dashed border-slate-200 hover:border-primary/50 transition-all bg-slate-50/50 flex flex-col items-center justify-center gap-3">
                  {previewUrl ? (
                    <>
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <Upload className="text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                        <Upload size={24} />
                      </div>
                      <p className="text-xs font-bold text-slate-400">Click or Drag to Upload</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    name="image_file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setPreviewUrl(URL.createObjectURL(file));
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest block">Banner Title (Internal)</label>
                  <input 
                    name="title"
                    defaultValue={editingBanner?.title}
                    placeholder="e.g. Festival Offer 2024"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:border-primary outline-none font-bold"
                  />
                </div>
                
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest block">Click Redirect URL</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      name="redirect_url"
                      defaultValue={editingBanner?.redirect_url}
                      placeholder="https://kruthik.com/loans"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 focus:border-primary outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest block">Display Order</label>
                  <input 
                    name="display_order"
                    type="number"
                    defaultValue={editingBanner?.display_order || 0}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:border-primary outline-none font-bold"
                  />
                </div>

                <div className="flex items-center gap-3 pt-8">
                  <input 
                    type="checkbox" 
                    name="is_active" 
                    defaultChecked={editingBanner ? editingBanner.is_active : true}
                    className="w-5 h-5 rounded-lg accent-primary" 
                  />
                  <span className="text-xs font-bold text-slate-700">Active Banner</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isUploading}
                className="w-full btn-premium py-5 text-lg flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isUploading ? <Loader2 className="animate-spin" /> : editingBanner ? "Update Banner" : "Publish Banner"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManager;
