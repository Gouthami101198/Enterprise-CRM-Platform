import React from 'react';
import { LeadStatus, DealStage, PriorityLevel, CustomerStatus, CustomerTier } from '../../types/crm';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'lead' | 'deal' | 'priority' | 'customer' | 'tier' | 'neutral' | 'custom';
  colorClass?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  colorClass,
}) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
        colorClass || 'bg-slate-100 text-slate-700 border border-slate-200'
      } ${className}`}
    >
      {children}
    </span>
  );
};

export const LeadStatusBadge: React.FC<{ status: LeadStatus }> = ({ status }) => {
  let colorClass = 'bg-slate-100 text-slate-700 border border-slate-200';
  switch (status) {
    case 'New':
      colorClass = 'bg-blue-50 text-blue-700 border border-blue-200';
      break;
    case 'Contacted':
      colorClass = 'bg-cyan-50 text-cyan-700 border border-cyan-200';
      break;
    case 'Qualified':
      colorClass = 'bg-indigo-50 text-indigo-700 border border-indigo-200';
      break;
    case 'Proposal':
      colorClass = 'bg-amber-50 text-amber-700 border border-amber-200';
      break;
    case 'Negotiation':
      colorClass = 'bg-purple-50 text-purple-700 border border-purple-200';
      break;
    case 'Converted':
      colorClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      break;
    case 'Lost':
      colorClass = 'bg-rose-50 text-rose-700 border border-rose-200';
      break;
  }
  return <Badge colorClass={colorClass}>{status}</Badge>;
};

export const DealStageBadge: React.FC<{ stage: DealStage }> = ({ stage }) => {
  let colorClass = 'bg-slate-100 text-slate-700 border border-slate-200';
  switch (stage) {
    case 'Discovery':
      colorClass = 'bg-sky-50 text-sky-700 border border-sky-200';
      break;
    case 'Qualification':
      colorClass = 'bg-blue-50 text-blue-700 border border-blue-200';
      break;
    case 'Proposal':
      colorClass = 'bg-amber-50 text-amber-700 border border-amber-200';
      break;
    case 'Negotiation':
      colorClass = 'bg-purple-50 text-purple-700 border border-purple-200';
      break;
    case 'Closed Won':
      colorClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      break;
    case 'Closed Lost':
      colorClass = 'bg-rose-50 text-rose-700 border border-rose-200';
      break;
  }
  return <Badge colorClass={colorClass}>{stage}</Badge>;
};

export const PriorityBadge: React.FC<{ priority: PriorityLevel }> = ({ priority }) => {
  let colorClass = 'bg-slate-100 text-slate-700 border border-slate-200';
  switch (priority) {
    case 'Urgent':
      colorClass = 'bg-rose-50 text-rose-700 border border-rose-300 font-bold';
      break;
    case 'High':
      colorClass = 'bg-amber-50 text-amber-700 border border-amber-300';
      break;
    case 'Medium':
      colorClass = 'bg-blue-50 text-blue-700 border border-blue-200';
      break;
    case 'Low':
      colorClass = 'bg-slate-100 text-slate-600 border border-slate-200';
      break;
  }
  return (
    <Badge colorClass={colorClass}>
      {priority === 'Urgent' && <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mr-1.5 animate-pulse" />}
      {priority}
    </Badge>
  );
};

export const CustomerStatusBadge: React.FC<{ status: CustomerStatus }> = ({ status }) => {
  let colorClass = 'bg-slate-100 text-slate-700 border border-slate-200';
  switch (status) {
    case 'Active':
      colorClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      break;
    case 'Onboarding':
      colorClass = 'bg-blue-50 text-blue-700 border border-blue-200';
      break;
    case 'At Risk':
      colorClass = 'bg-rose-50 text-rose-700 border border-rose-300 font-semibold';
      break;
    case 'Churned':
      colorClass = 'bg-slate-100 text-slate-600 border border-slate-300';
      break;
  }
  return <Badge colorClass={colorClass}>{status}</Badge>;
};

export const CustomerTierBadge: React.FC<{ tier: CustomerTier }> = ({ tier }) => {
  let colorClass = 'bg-slate-100 text-slate-700 border border-slate-200';
  switch (tier) {
    case 'Enterprise':
      colorClass = 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold';
      break;
    case 'Mid-Market':
      colorClass = 'bg-blue-50 text-blue-700 border border-blue-200';
      break;
    case 'Startup':
      colorClass = 'bg-teal-50 text-teal-700 border border-teal-200';
      break;
    case 'SMB':
      colorClass = 'bg-slate-100 text-slate-700 border border-slate-200';
      break;
  }
  return <Badge colorClass={colorClass}>{tier}</Badge>;
};

