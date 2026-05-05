import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import AdminTable from "../../components/admin/AdminTable";
import { format } from "date-fns";

const CibilHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('cibil_checks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(data || []);
    } catch (error) {
      console.error("Error fetching CIBIL history:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      key: "name", 
      label: "Name",
      render: (val, row) => (
        <div>
          <p className="font-bold text-slate-800">{val}</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{row.phone}</p>
        </div>
      )
    },
    { 
      key: "pan", 
      label: "PAN",
      render: (val) => (
        <span className="font-mono text-xs">{val.slice(0, 5) + "****" + val.slice(-1)}</span>
      )
    },
    { 
      key: "score", 
      label: "Score",
      render: (val) => (
        <span className={`font-black text-lg ${
          val >= 750 ? 'text-emerald-500' : val >= 700 ? 'text-blue-500' : 'text-red-500'
        }`}>{val}</span>
      )
    },
    { 
      key: "tier", 
      label: "Tier",
      render: (val) => (
        <span className="px-3 py-1 text-[10px] font-black uppercase rounded-full border border-slate-200 bg-slate-50">
          {val}
        </span>
      )
    },
    { 
      key: "created_at", 
      label: "Date",
      render: (val) => (
        <span className="text-slate-500 text-xs">{format(new Date(val), "MMM dd, hh:mm a")}</span>
      )
    }
  ];

  return (
    <AdminTable 
      title="CIBIL History"
      columns={columns}
      data={data}
      loading={loading}
      actions={true}
    />
  );
};

export default CibilHistory;
