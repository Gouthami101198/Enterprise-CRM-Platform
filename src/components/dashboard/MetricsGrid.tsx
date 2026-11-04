import React from 'react';
import { useAppSelector } from '../../store';
import { StatCard } from '../common/StatCard';
import { formatCurrency } from '../../utils/formatters';
import {
  IndianRupee,
  Trophy,
  Users,
  Briefcase,
  TrendingUp,
  Percent,
} from 'lucide-react';

export const MetricsGrid: React.FC = () => {
  const deals = useAppSelector((state) => state.deals.deals);
  const leads = useAppSelector((state) => state.leads.leads);
  const customers = useAppSelector((state) => state.customers.customers);

  // Calculate metrics
  const totalPipeline = deals
    .filter((d) => d.stage !== 'Closed Lost')
    .reduce((sum, d) => sum + d.value, 0);

  const closedWonRevenue = deals
    .filter((d) => d.stage === 'Closed Won')
    .reduce((sum, d) => sum + d.value, 0);

  const closedDeals = deals.filter((d) => d.stage === 'Closed Won' || d.stage === 'Closed Lost');
  const wonDeals = deals.filter((d) => d.stage === 'Closed Won');
  const winRate = closedDeals.length > 0 ? Math.round((wonDeals.length / closedDeals.length) * 100) : 75;

  const activeLeads = leads.filter((l) => l.status !== 'Converted' && l.status !== 'Lost').length;

  const totalMRR = customers.reduce((sum, c) => sum + c.mrr, 0);

  const avgDealSize = deals.length > 0 ? Math.round(totalPipeline / deals.length) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
      <StatCard
        title="Total Pipeline"
        value={formatCurrency(totalPipeline)}
        change="+14.2%"
        isPositive={true}
        subtitle="Active stages"
        icon={<IndianRupee className="w-4 h-4" />}
        iconBg="bg-indigo-50 text-indigo-600"
      />

      <StatCard
        title="Closed Revenue"
        value={formatCurrency(closedWonRevenue)}
        change="+22.5%"
        isPositive={true}
        subtitle="Won this fiscal"
        icon={<Trophy className="w-4 h-4" />}
        iconBg="bg-emerald-50 text-emerald-600"
      />

      <StatCard
        title="Win Rate"
        value={`${winRate}%`}
        change="+4.1%"
        isPositive={true}
        subtitle="Won vs lost"
        icon={<Percent className="w-4 h-4" />}
        iconBg="bg-cyan-50 text-cyan-600"
      />

      <StatCard
        title="Active Leads"
        value={activeLeads}
        change="+18%"
        isPositive={true}
        subtitle="In qualification"
        icon={<Users className="w-4 h-4" />}
        iconBg="bg-blue-50 text-blue-600"
      />

      <StatCard
        title="Portfolio MRR"
        value={formatCurrency(totalMRR)}
        change="+9.4%"
        isPositive={true}
        subtitle="Monthly ARR/12"
        icon={<TrendingUp className="w-4 h-4" />}
        iconBg="bg-purple-50 text-purple-600"
      />

      <StatCard
        title="Avg Deal Size"
        value={formatCurrency(avgDealSize)}
        change="+6.8%"
        isPositive={true}
        subtitle="Weighted average"
        icon={<Briefcase className="w-4 h-4" />}
        iconBg="bg-amber-50 text-amber-600"
      />
    </div>
  );
};
