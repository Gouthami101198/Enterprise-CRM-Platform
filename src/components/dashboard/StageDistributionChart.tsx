import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useAppSelector } from '../../store';
import { DealStage } from '../../types/crm';
import { formatCurrency, formatIndianShortCurrency } from '../../utils/formatters';

const STAGE_COLORS: Record<DealStage, string> = {
  Discovery: '#0284c7', // sky-600
  Qualification: '#2563eb', // blue-600
  Proposal: '#d97706', // amber-600
  Negotiation: '#9333ea', // purple-600
  'Closed Won': '#059669', // emerald-600
  'Closed Lost': '#e11d48', // rose-600
};

const STAGE_DISPLAY_NAMES: Record<DealStage, string> = {
  Discovery: 'Discovery',
  Qualification: 'Qualify',
  Proposal: 'Proposal',
  Negotiation: 'Negotiate',
  'Closed Won': 'Won',
  'Closed Lost': 'Lost',
};

export const StageDistributionChart: React.FC = () => {
  const deals = useAppSelector((state) => state.deals.deals);
  const theme = useAppSelector((state) => state.ui.theme);
  const isDark = theme === 'dark';

  const stages: DealStage[] = [
    'Discovery',
    'Qualification',
    'Proposal',
    'Negotiation',
    'Closed Won',
  ];

  const data = stages.map((stage) => {
    const stageDeals = deals.filter((d) => d.stage === stage);
    const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
    return {
      stage,
      shortLabel: STAGE_DISPLAY_NAMES[stage],
      count: stageDeals.length,
      value: totalValue,
      color: STAGE_COLORS[stage],
    };
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between h-full transition-colors duration-200">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Pipeline Value by Stage</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Active deal volume across progression stages
          </p>
        </div>
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-full whitespace-nowrap">
          {deals.length} Active Deals
        </span>
      </div>

      <div className="flex-1 w-full min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#f1f5f9'} vertical={false} />
            <XAxis
              dataKey="shortLabel"
              stroke={isDark ? '#94a3b8' : '#64748b'}
              fontSize={11}
              fontWeight={600}
              interval={0}
              tickLine={false}
              axisLine={{ stroke: isDark ? '#334155' : '#e2e8f0' }}
            />
            <YAxis
              stroke={isDark ? '#64748b' : '#94a3b8'}
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatIndianShortCurrency(v)}
            />
            <Tooltip
              cursor={{ fill: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(241, 245, 249, 0.6)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 border border-slate-800">
                      <p className="font-bold text-slate-200">{item.stage}</p>
                      <p className="text-indigo-300 font-semibold">
                        Pipeline Value: {formatCurrency(item.value)}
                      </p>
                      <p className="text-slate-400">Total Deals: {item.count}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
