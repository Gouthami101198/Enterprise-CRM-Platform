import React from 'react';
import { initialSalesReps } from '../../store/mockData';
import { formatCurrency } from '../../utils/formatters';

export const RepPerformanceChart: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between h-full transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Sales Leaderboard</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Quota pacing and closed volume per AE</p>
        </div>
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-full">
          Q4 Pacing
        </span>
      </div>

      <div className="space-y-4">
        {initialSalesReps.map((rep) => {
          const percent = Math.min(100, Math.round((rep.revenue / rep.target) * 100));
          return (
            <div key={rep.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rep.avatar}
                    alt={rep.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                  />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{rep.name}</span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 ml-1.5">
                      ({rep.dealsCount} deals)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formatCurrency(rep.revenue)}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 text-[11px] ml-1">
                    / {formatCurrency(rep.target)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex items-center">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    percent >= 90
                      ? 'bg-emerald-500'
                      : percent >= 75
                      ? 'bg-indigo-600'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500">
                <span>Quota Attainment</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">{percent}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
