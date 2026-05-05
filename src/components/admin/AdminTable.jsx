import { useState } from "react";
import { 
  Search, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical,
  Filter
} from "lucide-react";

const AdminTable = ({ 
  title, 
  columns, 
  data, 
  loading, 
  onSearch, 
  onFilter, 
  onExport,
  actions 
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Table Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder={`Search ${title}...`}
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-6 focus:border-primary outline-none text-sm shadow-sm transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onFilter}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Filter size={16} /> Filter
          </button>
          <button 
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-200">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-8 py-5 font-bold">{col.label}</th>
                ))}
                {actions && <th className="px-8 py-5 text-right font-bold">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={columns.length + (actions ? 1 : 0)} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                      <p className="text-slate-400 font-bold text-sm">Processing Data Protocol...</p>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (actions ? 1 : 0)} className="px-8 py-20 text-center text-slate-400 italic">
                    No records found matching your query.
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors group">
                    {columns.map((col) => (
                      <td key={col.key} className="px-8 py-5 text-sm">
                        {col.render ? col.render(item[col.key], item) : (
                          <span className="text-slate-700 font-medium">{item[col.key] || "—"}</span>
                        )}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Showing <span className="text-slate-800">{data.length}</span> entries
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-primary disabled:opacity-50 transition-all shadow-sm">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(p => (
                <button key={p} className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${p === 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                  {p}
                </button>
              ))}
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-primary disabled:opacity-50 transition-all shadow-sm">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
