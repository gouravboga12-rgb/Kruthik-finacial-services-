import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  PhoneCall, 
  Handshake, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Briefcase,
  Image as ImageIcon
} from "lucide-react";
import { supabase } from "../../lib/supabase";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login"); 
      } else {
        setAdminEmail(session.user.email);
      }
    };
    checkAuth();
  }, [navigate]);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin" },
    { icon: <ImageIcon size={20} />, label: "Banner Manager", path: "/admin/banners" },
    { icon: <Users size={20} />, label: "Loan Applications", path: "/admin/loans" },
    { icon: <Briefcase size={20} />, label: "Service Manager", path: "/admin/services" },
    { icon: <PhoneCall size={20} />, label: "Contact Inquiries", path: "/admin/contacts" },
    { icon: <Handshake size={20} />, label: "Partner Requests", path: "/admin/partners" },
    { icon: <ShieldCheck size={20} />, label: "CIBIL History", path: "/admin/cibil" },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-secondary">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 text-white transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          <h1 className={`${!isSidebarOpen && "hidden"} font-primary font-bold text-xl text-accent`}>
            Kruthik <span className="text-white">Admin</span>
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-slate-800 rounded-lg"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-grow mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                location.pathname === item.path 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="shrink-0">{item.icon}</div>
              <span className={`${!isSidebarOpen && "hidden"} font-medium`}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 p-3 w-full text-slate-400 hover:bg-slate-800 hover:text-red-400 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className={`${!isSidebarOpen && "hidden"} font-medium`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"} flex flex-col min-h-screen`}>
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
             <h2 className="text-slate-800 font-bold text-lg">
                {menuItems.find(item => item.path === location.pathname)?.label || "Admin Panel"}
             </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">Kruthik Admin</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{adminEmail}</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-primary font-bold border border-slate-200">
                KA
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
