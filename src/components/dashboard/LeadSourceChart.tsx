import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAppSelector } from '../../store';
import { LeadSource } from '../../types/crm';

const SOURCE_COLORS: Record<LeadSource, string> = {
  Website: '#4f46e5', // indigo-600
  Referral: '#10b981', // emerald-500
  LinkedIn: '#0ea5e9', // sky-500
  'Cold Outreach': '#f59e0b', // amber-500
  Webinar: '#8b5cf6', // purple-500
  'Google Ads': '#ec4899', // pink-500
  Partner: '#06b6d4', // cyan-500
};

export const LeadSourceChart: React.FC = () => {
  const leads = useAppSelector((state) => state.leads.leads);

  // Aggregate lead sources
  const sourceCounts: Record<string, number> = {};
  leads.forEach((l) => {
    sourceCounts[l.source] = (sourceCounts[l.source] || 0) + 1;
  });

  const total = leads.length || 1;
  const data = Object.entries(sourceCounts).map(([name, count]) => ({
    name,
    value: count,
    percentage: Math.round((count / total) * 100),
    color: SOURCE_COLORS[name as LeadSource] || '#64748b',
  }));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between h-full transition-colors duration-200">
      <div className="mb-2">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Lead Acquisition by Channel</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Inbound and outbound source efficiency breakdown
        </p>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Donut Chart */}
        <div className="w-48 h-48 relative shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-xl text-xs space-y-0.5 border border-slate-800">
                        <p className="font-bold text-slate-200">{item.name}</p>
                        <p className="text-indigo-300 font-semibold">
                          {item.value} leads ({item.percentage}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={data}
                innerRadius={52}
                outerRadius={76}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{leads.length}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Leads
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-slate-700 dark:text-slate-300 truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white">{item.value}</span>
                <span className="text-slate-400 dark:text-slate-500 text-[11px] w-8 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
