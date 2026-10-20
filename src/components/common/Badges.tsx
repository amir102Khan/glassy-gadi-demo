import React from 'react';
import { JobStage, BookingStatus, PaymentStatus, VehicleType } from '../../types';
import { JOB_STAGES } from '../../data/mockData';
import { CheckCircle2, Clock, Sparkles, Check, Car, AlertTriangle } from 'lucide-react';

export const StageBadge: React.FC<{ stage: JobStage; size?: 'sm' | 'md' }> = ({ stage, size = 'md' }) => {
  const stageDef = JOB_STAGES.find((s) => s.id === stage);
  const label = stageDef?.label || stage;

  const styleMap: Record<JobStage, { bg: string; text: string; border: string; dot: string }> = {
    booked: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-400' },
    received: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
    inspection: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', dot: 'bg-indigo-500' },
    washing: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', dot: 'bg-cyan-500' },
    interior: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', dot: 'bg-purple-500' },
    polishing: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', dot: 'bg-amber-500' },
    quality_check: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', border: 'border-fuchsia-200', dot: 'bg-fuchsia-500' },
    ready_pickup: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', dot: 'bg-emerald-500' },
    completed: { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-200', dot: 'bg-teal-500' },
  };

  const style = styleMap[stage] || styleMap.booked;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${style.bg} ${style.text} ${style.border} ${padding}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      <span>{label}</span>
    </span>
  );
};

export const StatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
  switch (status) {
    case 'ready':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          Ready for Pickup
        </span>
      );
    case 'in_progress':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
          <Clock className="w-3 h-3 text-sky-600 animate-spin" style={{ animationDuration: '4s' }} />
          In Progress
        </span>
      );
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200">
          <CheckCircle2 className="w-3 h-3 text-teal-600" />
          Completed
        </span>
      );
    case 'confirmed':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <Check className="w-3 h-3 text-slate-500" />
          Confirmed
        </span>
      );
    case 'cancelled':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200">
          <AlertTriangle className="w-3 h-3 text-rose-500" />
          Cancelled
        </span>
      );
  }
};

export const PaymentBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  switch (status) {
    case 'paid':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          PAID
        </span>
      );
    case 'partially_paid':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          PARTIAL
        </span>
      );
    case 'unpaid':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          UNPAID
        </span>
      );
  }
};

export const VehicleTypeBadge: React.FC<{ type: VehicleType }> = ({ type }) => {
  const labels: Record<VehicleType, string> = {
    hatchback: 'Hatchback',
    sedan: 'Sedan',
    suv: 'SUV',
    luxury: 'Luxury'
  };

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wider">
      <Car className="w-3 h-3 text-slate-500" />
      {labels[type] || type}
    </span>
  );
};
