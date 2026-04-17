import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  PlusCircle, 
  LogOut,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login', { replace: true });
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inquiries', label: 'My Inquiries', icon: MessageSquare },
    { id: 'new', label: 'New Inquiry', icon: PlusCircle },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            BuildRight
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={20} className={activeTab === item.id ? 'text-blue-600' : 'text-slate-400'} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between md:hidden">
            <h1 className="text-xl font-bold text-slate-800">BuildRight</h1>
            <button onClick={handleLogout} className="text-slate-600 hover:text-slate-900">
                <LogOut size={24} />
            </button>
        </header>

        <div className="p-8 pb-12 flex-1">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Welcome Back!</h2>
            <p className="text-slate-500 mt-1">Here is the latest update on your inquiries.</p>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-700">Total Inquiries</h3>
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <MessageSquare size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">4</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-700">In Progress</h3>
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                  <Clock size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">1</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-700">Completed</h3>
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <CheckCircle2 size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900">3</p>
            </div>
          </div>

          {/* Recent Inquiries Section */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800">Recent Inquiries</h3>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { title: 'Commercial Office Renovation', status: 'Pending', date: 'Oct 12, 2026' },
                { title: 'Residential Custom Build', status: 'In Progress', date: 'Sep 28, 2026' },
                { title: 'Kitchen Remodel Quote', status: 'Completed', date: 'Sep 15, 2026' },
              ].map((item, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <h4 className="font-medium text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-500 mt-0.5">Submitted on {item.date}</p>
                  </div>
                  {item.status === 'Pending' && (
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium flex items-center gap-1.5">
                      <AlertCircle size={14} /> Pending
                    </span>
                  )}
                  {item.status === 'In Progress' && (
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-medium flex items-center gap-1.5">
                      <Clock size={14} /> In Progress
                    </span>
                  )}
                  {item.status === 'Completed' && (
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium flex items-center gap-1.5">
                      <CheckCircle2 size={14} /> Completed
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
