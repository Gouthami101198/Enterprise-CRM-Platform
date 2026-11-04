import React from 'react';
import { MetricsGrid } from './MetricsGrid';
import { RevenueChart } from './RevenueChart';
import { StageDistributionChart } from './StageDistributionChart';
import { LeadSourceChart } from './LeadSourceChart';
import { RepPerformanceChart } from './RepPerformanceChart';
import { RecentActivityWidget } from './RecentActivityWidget';
import { UrgentTasksWidget } from './UrgentTasksWidget';
import { useAppDispatch, useAppSelector } from '../../store';
import { openModal } from '../../store/slices/uiSlice';
import {
  Sparkles,
  UserPlus,
  Briefcase,
  CheckSquare,
  PhoneCall,
  Calendar,
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const currentDate = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDate} • Executive Overview</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white m-0">
              Welcome back, {currentUser?.name || 'Priya Patel'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Your sales team closed <span className="font-bold text-emerald-400">₹3,40,00,000</span> in October (123% of target). You have 2 high-priority proposals waiting for final contract reviews with Tata Digital and Reliance Jio.
            </p>
          </div>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => dispatch(openModal({ type: 'new-lead' }))}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-indigo-500/30"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Lead</span>
            </button>
            <button
              onClick={() => dispatch(openModal({ type: 'new-deal' }))}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer border border-white/10"
            >
              <Briefcase className="w-3.5 h-3.5 text-indigo-300" />
              <span>New Deal</span>
            </button>
            <button
              onClick={() => dispatch(openModal({ type: 'new-task' }))}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer border border-white/10"
            >
              <CheckSquare className="w-3.5 h-3.5 text-amber-300" />
              <span>Add Task</span>
            </button>
            <button
              onClick={() => dispatch(openModal({ type: 'log-activity' }))}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer border border-white/10"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-300" />
              <span>Log Activity</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <MetricsGrid />

      {/* Primary Analytics Grid: Revenue Performance & Stage Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <StageDistributionChart />
        </div>
      </div>

      {/* Secondary Analytics Grid: Channel Breakdown & AE Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <LeadSourceChart />
        </div>
        <div className="lg:col-span-2">
          <RepPerformanceChart />
        </div>
      </div>

      {/* Operational Widgets: Urgent Tasks & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UrgentTasksWidget />
        <RecentActivityWidget />
      </div>
    </div>
  );
};

