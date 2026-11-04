import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setActiveTab, setMobileMenuOpen, NavigationTab } from '../../store/slices/uiSlice';
import {
  LayoutDashboard,
  Users,
  Kanban,
  Building2,
  CheckSquare,
  Activity as ActivityIcon,
  X,
  Sparkles,
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector((state) => state.ui.mobileMenuOpen);
  const activeTab = useAppSelector((state) => state.ui.activeTab);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const leads = useAppSelector((state) => state.leads.leads);
  const deals = useAppSelector((state) => state.deals.deals);
  const tasks = useAppSelector((state) => state.tasks.tasks);

  if (!mobileMenuOpen) return null;

  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const activeDealsCount = deals.filter(
    (d) => d.stage !== 'Closed Won' && d.stage !== 'Closed Lost'
  ).length;
  const pendingTasksCount = tasks.filter((t) => t.status !== 'Completed').length;

  const navItems = [
    {
      id: 'dashboard' as NavigationTab,
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5 shrink-0" />,
      badge: null,
    },
    {
      id: 'leads' as NavigationTab,
      label: 'Lead Management',
      icon: <Users className="w-5 h-5 shrink-0" />,
      badge: newLeadsCount > 0 ? `${newLeadsCount} new` : null,
      badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'pipeline' as NavigationTab,
      label: 'Sales Pipeline',
      icon: <Kanban className="w-5 h-5 shrink-0" />,
      badge: activeDealsCount > 0 ? `${activeDealsCount}` : null,
      badgeColor: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'customers' as NavigationTab,
      label: 'Customer Profiles',
      icon: <Building2 className="w-5 h-5 shrink-0" />,
      badge: null,
    },
    {
      id: 'tasks' as NavigationTab,
      label: 'Task Management',
      icon: <CheckSquare className="w-5 h-5 shrink-0" />,
      badge: pendingTasksCount > 0 ? `${pendingTasksCount}` : null,
      badgeColor: 'bg-amber-100 text-amber-700',
    },
    {
      id: 'activities' as NavigationTab,
      label: 'Activity Tracking',
      icon: <ActivityIcon className="w-5 h-5 shrink-0" />,
      badge: null,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(setMobileMenuOpen(false))}
      />

      {/* Drawer */}
      <div className="relative w-72 max-w-[80vw] bg-slate-900 text-slate-300 flex flex-col h-full shadow-2xl z-10">
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-white text-base tracking-tight">
              Vanguard<span className="text-indigo-400">CRM</span>
            </span>
          </div>
          <button
            onClick={() => dispatch(setMobileMenuOpen(false))}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => dispatch(setActiveTab(item.id))}
                className={`w-full flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      item.badgeColor || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser?.name || 'Priya Patel'}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-white truncate">
                {currentUser?.name || 'Priya Patel'}
              </span>
              <span className="text-xs text-slate-400 truncate">
                {currentUser?.role || 'Senior Enterprise AE'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

