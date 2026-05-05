import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  PhoneCall, 
  Handshake, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight,
  Clock
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    loans: 0,
    contacts: 0,
    partners: 0,
    cibil: 0,
    pipelineValue: 0,
    conversionRate: 0
  });
  const [recentLoans, setRecentLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [loans, contacts, partners, cibil, allLoans] = await Promise.all([
        supabase.from('loan_applications').select('*', { count: 'exact', head: true }),
        supabase.from('contact_inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('partner_applications').select('*', { count: 'exact', head: true }),
        supabase.from('cibil_checks').select('*', { count: 'exact', head: true }),
        supabase.from('loan_applications').select('requirement, status')
      ]);

      // Calculate Pipeline Value
      const totalPipeline = (allLoans.data || []).reduce((sum, l) => sum + (Number(l.requirement) || 0), 0);
      
      // Calculate Conversion Rate
      const approvedCount = (allLoans.data || []).filter(l => l.status === 'Approved').length;
      const totalCount = (allLoans.data || []).length;
      const conversion = totalCount > 0 ? ((approvedCount / totalCount) * 100).toFixed(1) : 0;

      setStats({
        loans: loans.count || 0,
        contacts: contacts.count || 0,
        partners: partners.count || 0,
        cibil: cibil.count || 0,
        pipelineValue: totalPipeline,
        conversionRate: conversion
      });

      // Fetch 5 most recent
      const { data: recent, error: rError } = await supabase
        .from('loan_applications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (rError) throw rError;
      setRecentLoans(recent || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: "Loan Applications", value: stats.loans, icon: <Users size={24} />, color: "bg-blue-500", path: "/admin/loans" },
    { label: "Contact Inquiries", value: stats.contacts, icon: <PhoneCall size={24} />, color: "bg-emerald-500", path: "/admin/contacts" },
    { label: "Partner Requests", value: stats.partners, icon: <Handshake size={24} />, color: "bg-amber-500", path: "/admin/partners" },
    { label: "CIBIL Checks", value: stats.cibil, icon: <ShieldCheck size={24} />, color: "bg-purple-500", path: "/admin/cibil" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-primary">Executive Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <Clock size={16} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <Link key={stat.label} to={stat.path}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} bg-opacity-10 p-3 rounded-xl text-slate-800 group-hover:bg-opacity-20 transition-all`}>
                  <div style={{ color: stat.color.replace('bg-', '') }}>{stat.icon}</div>
                </div>
                <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                  <TrendingUp size={12} />
                  <span>+12%</span>
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-black text-slate-800 leading-none">{stat.value}</h3>
                  <div className="text-slate-300 group-hover:text-primary transition-colors">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Recent Loan Applications</h3>
            <Link to="/admin/loans" className="text-primary text-xs font-bold hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Loan Type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-400">Loading applications...</td></tr>
                ) : recentLoans.length === 0 ? (
                  <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-400">No applications found</td></tr>
                ) : (
                  recentLoans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-800">{loan.name}</p>
                        <p className="text-xs text-slate-500">{loan.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">{loan.loan_type}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-800">₹{(loan.requirement / 100000).toFixed(1)}L</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border ${
                          loan.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          loan.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                          'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {loan.status || 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Activity Feed */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <h3 className="font-bold text-slate-800">Quick Overview</h3>
          
          <div className="space-y-4">
             <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Conversion Rate</p>
                  <p className="text-lg font-black text-slate-900">{stats.conversionRate}%</p>
                  <p className="text-[10px] text-slate-500">Approved vs Total Applications</p>
                </div>
             </div>

             <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Pipeline Value</p>
                  <p className="text-lg font-black text-slate-900">
                    ₹{stats.pipelineValue >= 10000000 
                      ? (stats.pipelineValue / 10000000).toFixed(2) + " Cr" 
                      : (stats.pipelineValue / 100000).toFixed(1) + " L"}
                  </p>
                  <p className="text-[10px] text-slate-500">Combined value of all requests</p>
                </div>
             </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
             <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Upcoming Protocol</h4>
             <div className="space-y-3">
                {[
                  { title: "Review Partner Onboarding", time: "2:00 PM" },
                  { title: "CIBIL Gateway Audit", time: "4:30 PM" },
                  { title: "Quarterly Growth Sync", time: "Tomorrow" }
                ].map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                    <p className="text-xs font-bold text-slate-700 group-hover:text-primary transition-colors">{task.title}</p>
                    <span className="text-[10px] text-slate-400">{task.time}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
