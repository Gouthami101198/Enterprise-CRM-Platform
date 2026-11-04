import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setActiveTab, toggleSidebar, toggleTheme, NavigationTab } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import {
  LayoutDashboard,
  Users,
  Kanban,
  Building2,
  CheckSquare,
  Activity as ActivityIcon,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.ui.activeTab);
  const sidebarCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed);
  const theme = useAppSelector((state) => state.ui.theme);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const leads = useAppSelector((state) => state.leads.leads);
  const deals = useAppSelector((state) => state.deals.deals);
  const tasks = useAppSelector((state) => state.tasks.tasks);

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
      badgeColor: 'bg-blue-100 text-blue-700 font-bold',
    },
    {
      id: 'pipeline' as NavigationTab,
      label: 'Sales Pipeline',
      icon: <Kanban className="w-5 h-5 shrink-0" />,
      badge: activeDealsCount > 0 ? `${activeDealsCount}` : null,
      badgeColor: 'bg-purple-100 text-purple-700 font-semibold',
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
      badgeColor: 'bg-amber-100 text-amber-700 font-bold',
    },
    {
      id: 'activities' as NavigationTab,
      label: 'Activity Tracking',
      icon: <ActivityIcon className="w-5 h-5 shrink-0" />,
      badge: null,
    },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 ease-in-out shrink-0 select-none z-30 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-base tracking-tight leading-tight">
                Vanguard<span className="text-indigo-400">CRM</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Enterprise Edition
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {!sidebarCollapsed && (
          <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Main Navigation
          </div>
        )}

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => dispatch(setActiveTab(item.id))}
              title={sidebarCollapsed ? item.label : undefined}
              className={`w-full flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              } ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}>
                  {item.icon}
                </span>
                {!sidebarCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </div>

              {!sidebarCollapsed && item.badge && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
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

      {/* Enterprise Security Banner */}
      {!sidebarCollapsed && (
        <div className="p-3 mx-3 mb-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>ISO 27001 & RBI Compliant</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            256-bit AES encryption active across all sales records.
          </p>
        </div>
      )}

      {/* User Session Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center flex-col gap-2' : 'justify-between'}`}>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser?.name || 'User'}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/40"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate">
                  {currentUser?.name || 'Priya Patel'}
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  {currentUser?.role || 'Senior Enterprise AE'}
                </span>
              </div>
            )}
          </div>

          {!sidebarCollapsed && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => dispatch(logout())}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
