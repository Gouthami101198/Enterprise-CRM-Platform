import React, { useEffect } from 'react';
import { useAppSelector } from './store';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/common/ToastContainer';

// Authentication page
import { AuthPage } from './components/auth/AuthPage';

// Main views
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { LeadList } from './components/leads/LeadList';
import { PipelineBoard } from './components/pipeline/PipelineBoard';
import { CustomerList } from './components/customers/CustomerList';
import { TaskList } from './components/tasks/TaskList';
import { ActivityFeed } from './components/activities/ActivityFeed';

// Modals & Drawers
import { LeadModal } from './components/leads/LeadModal';
import { ConvertLeadModal } from './components/leads/ConvertLeadModal';
import { DealModal } from './components/pipeline/DealModal';
import { CustomerModal } from './components/customers/CustomerModal';
import { CustomerProfileDrawer } from './components/customers/CustomerProfileDrawer';
import { TaskModal } from './components/tasks/TaskModal';
import { LogActivityModal } from './components/activities/LogActivityModal';

export const App: React.FC = () => {
  const activeTab = useAppSelector((state) => state.ui.activeTab);
  const theme = useAppSelector((state) => state.ui.theme);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Sync theme to document root on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // If not authenticated, render login / signup / forgot password screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased">
        <AuthPage />
        <ToastContainer />
      </div>
    );
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'leads':
        return <LeadList />;
      case 'pipeline':
        return <PipelineBoard />;
      case 'customers':
        return <CustomerList />;
      case 'tasks':
        return <TaskList />;
      case 'activities':
        return <ActivityFeed />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased overflow-hidden transition-colors duration-200">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Drawer */}
      <MobileNav />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
          <div className="w-full max-w-[1600px] mx-auto">{renderActiveView()}</div>
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <LeadModal />
      <ConvertLeadModal />
      <DealModal />
      <CustomerModal />
      <CustomerProfileDrawer />
      <TaskModal />
      <LogActivityModal />

      {/* Floating Toasts */}
      <ToastContainer />
    </div>
  );
};

export default App;
