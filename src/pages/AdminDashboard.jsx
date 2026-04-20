
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Users,
  FileText,
  Mail,
  BarChart,
  Globe,
  Tag
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import New Components
import SEOSettingsManager from '@/components/admin/SEOSettingsManager';
import BlogManagementPanel from '@/components/admin/BlogManagementPanel';
import EmailManagementPanel from '@/components/admin/EmailManagementPanel';
import RequestTicketManager from '@/components/admin/RequestTicketManager';
import AnalyticsSetup from '@/components/admin/AnalyticsSetup';

const AdminDashboard = () => {
  const { logout } = useAdminAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ contacts: 0, customers: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { count: contactsCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true });
      const { count: customersCount } = await supabase.from('customers').select('*', { count: 'exact', head: true });
      setStats({ contacts: contactsCount || 0, customers: customersCount || 0 });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-cairo" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-primary text-white fixed h-full shadow-xl z-20 hidden md:block overflow-y-auto">
        <div className="p-6 border-b border-teal-secondary">
          <h2 className="text-xl font-bold">لوحة التحكم</h2>
        </div>
        <nav className="p-4 space-y-1">
          <NavButton id="dashboard" label="نظرة عامة" icon={LayoutDashboard} active={activeTab} set={setActiveTab} />
          <NavButton id="seo" label="إدارة SEO" icon={Globe} active={activeTab} set={setActiveTab} />
          <NavButton id="blog" label="المدونة" icon={FileText} active={activeTab} set={setActiveTab} />
          <NavButton id="email" label="الرسائل" icon={Mail} active={activeTab} set={setActiveTab} />
          <NavButton id="requests" label="الطلبات" icon={Tag} active={activeTab} set={setActiveTab} />
          <NavButton id="customers" label="العملاء" icon={Users} active={activeTab} set={setActiveTab} />
          <NavButton id="analytics" label="التحليلات" icon={BarChart} active={activeTab} set={setActiveTab} />
        </nav>
        <div className="p-4 border-t border-teal-secondary mt-auto">
          <button onClick={logout} className="w-full flex items-center gap-2 text-red-300 hover:text-red-100 px-4 py-2">
            <LogOut size={20} />
            تسجيل خروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:mr-64 p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {activeTab === 'dashboard' && 'نظرة عامة'}
              {activeTab === 'seo' && 'إدارة محركات البحث (SEO)'}
              {activeTab === 'blog' && 'إدارة المحتوى والمدونة'}
              {activeTab === 'email' && 'صندوق الوارد والمراسلات'}
              {activeTab === 'requests' && 'طلبات العملاء (Tickets)'}
              {activeTab === 'customers' && 'إدارة العملاء والمستخدمين'}
              {activeTab === 'analytics' && 'إعدادات التحليلات'}
            </h1>
            <Button variant="outline" onClick={logout} className="md:hidden text-red-600 border-red-200">
              <LogOut size={16} />
            </Button>
          </div>

          <div className="animate-in fade-in zoom-in duration-300">
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard title="إجمالي الرسائل" value={stats.contacts} icon={MessageSquare} color="blue" />
                <DashboardCard title="العملاء المسجلين" value={stats.customers} icon={Users} color="green" />
                <DashboardCard title="حالة النظام" value="ممتاز" icon={Settings} color="purple" isText />
              </div>
            )}

            {activeTab === 'seo' && <SEOSettingsManager />}
            {activeTab === 'blog' && <BlogManagementPanel />}
            {activeTab === 'email' && <EmailManagementPanel />}
            {activeTab === 'requests' && <RequestTicketManager />}
            {activeTab === 'analytics' && <AnalyticsSetup />}
            
            {/* Kept Customer view minimal for this update, relying on existing logic or placeholder if you prefer */}
            {activeTab === 'customers' && (
               <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
                  يرجى استخدام قسم "العملاء" من التحديث السابق أو دمج الكود هنا. 
                  (تم التركيز على المكونات الجديدة في هذا التحديث)
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const NavButton = ({ id, label, icon: Icon, active, set }) => (
  <button 
    onClick={() => set(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 ${active === id ? 'bg-gold-accent text-teal-primary font-bold shadow-md' : 'hover:bg-white/10'}`}
  >
    <Icon size={20} />
    {label}
  </button>
);

const DashboardCard = ({ title, value, icon: Icon, color, isText }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600"
  };


  const [orders, setOrders] = useState([]);

const fetchOrders = async () => {
  const { data } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  setOrders(data || []);
};

useEffect(() => {
  if (activeTab === "requests") {
    fetchOrders();
  }
}, [activeTab]);

  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${colors[color] || colors.blue}`}><Icon size={24} /></div>
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className={`text-3xl font-bold text-gray-800 mt-1 ${isText ? 'text-xl' : ''}`}>{value}</p>
    </div>
  );
};

export default AdminDashboard;
