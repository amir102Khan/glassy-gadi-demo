import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { JOB_STAGES } from '../../data/mockData';
import { JobStage, Booking } from '../../types';
import { StageBadge, PaymentBadge, VehicleTypeBadge } from '../../components/common/Badges';
import { PhotoModal } from '../../components/common/PhotoModal';
import {
  KanbanSquare,
  Clock,
  Car,
  User,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Camera,
  FileText,
  X,
  Play,
  Check,
  Sparkles,
  Receipt
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const WorkshopPage: React.FC = () => {
  const {
    bookings,
    staffMembers,
    updateBookingStage,
    advanceBookingStage,
    toggleChecklistItem,
    updateBookingNotes,
    toggleBookingDelay,
    updateStaffAssignment
  } = useDemo();

  const [selectedJob, setSelectedJob] = useState<Booking | null>(null);
  const [activePhoto, setActivePhoto] = useState<{ url: string; title: string } | null>(null);
  const [drawerStaffNote, setDrawerStaffNote] = useState('');

  // Keep selected job in sync with state changes
  const activeJob = bookings.find((b) => b.id === selectedJob?.id) || selectedJob;

  const handleOpenJob = (job: Booking) => {
    setSelectedJob(job);
    setDrawerStaffNote(job.staffNotes || '');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Board Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Workshop Job Workflow Board</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              9 Verified Stages
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Drag or click "Advance" to move vehicles across workshop bays. Real-time sync with customer tracking page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/track/GG-1024"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open Flagship Demo (GG-1024)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* 9-Column Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="inline-flex gap-4 min-w-[1700px] items-start">
          {JOB_STAGES.map((col) => {
            const jobsInCol = bookings.filter((b) => b.currentStage === col.id && b.status !== 'cancelled');

            return (
              <div
                key={col.id}
                className="w-72 bg-slate-200/60 rounded-2xl p-3 border border-slate-300/80 shrink-0 flex flex-col max-h-[80vh]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-300/70">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-600" />
                    <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                      {col.label}
                    </h3>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 text-[11px] font-bold flex items-center justify-center">
                    {jobsInCol.length}
                  </span>
                </div>

                {/* Job Cards */}
                <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                  {jobsInCol.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => handleOpenJob(job)}
                      className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-500/50 transition cursor-pointer space-y-2.5 relative group"
                    >
                      {job.isDelayed && (
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded flex items-center gap-0.5">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          <span>Delayed</span>
                        </div>
                      )}

                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-mono text-xs font-bold text-emerald-700">{job.id}</span>
                          <h4 className="text-xs font-bold text-slate-900 mt-0.5">
                            {job.vehicle.make} {job.vehicle.model}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono">{job.vehicle.regNumber}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600 flex items-center justify-between">
                        <span className="truncate font-medium">{job.servicePackageName}</span>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{job.estimatedCompletion}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-700 font-medium">
                          <User className="w-3 h-3 text-emerald-600" />
                          <span>{job.assignedStaffName.split(' ')[0]}</span>
                        </div>
                      </div>

                      {/* Card Action footer */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                        <select
                          value={job.currentStage}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updateBookingStage(job.id, e.target.value as JobStage)}
                          className="text-[10px] font-semibold bg-slate-100 border border-slate-200 rounded px-1.5 py-1 text-slate-700 focus:outline-none"
                        >
                          {JOB_STAGES.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.label}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            advanceBookingStage(job.id);
                          }}
                          disabled={job.currentStage === 'completed'}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition flex items-center gap-1 disabled:opacity-40"
                          title="Advance to next stage"
                        >
                          <span>Next</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {jobsInCol.length === 0 && (
                    <div className="py-8 text-center text-slate-400 text-xs italic">
                      No cars in this bay
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DETAILED JOB VIEW DRAWER / MODAL */}
      {/* ========================================================================= */}
      {activeJob && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-2xl h-full p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-black text-emerald-700">{activeJob.id}</span>
                    <StageBadge stage={activeJob.currentStage} size="md" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {activeJob.vehicle.year} {activeJob.vehicle.make} {activeJob.vehicle.model}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span className="font-mono font-bold text-slate-700">{activeJob.vehicle.regNumber}</span>
                    <span>•</span>
                    <VehicleTypeBadge type={activeJob.vehicle.type} />
                    <span>•</span>
                    <span>Customer: {activeJob.customerName} ({activeJob.customerPhone})</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Stage Mover */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                    Move Detailing Stage
                  </span>
                  <button
                    onClick={() => advanceBookingStage(activeJob.id)}
                    disabled={activeJob.currentStage === 'completed'}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>Advance to Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 pt-1">
                  {JOB_STAGES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => updateBookingStage(activeJob.id, s.id)}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold border transition truncate ${
                        activeJob.currentStage === s.id
                          ? 'bg-emerald-600 text-white border-emerald-700 font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Checklist Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Workshop Detailing Checklist ({activeJob.checklist.filter((c) => c.completed).length} / {activeJob.checklist.length})
                  </h4>
                  <span className="text-xs font-bold text-emerald-600 font-mono">
                    {Math.round((activeJob.checklist.filter((c) => c.completed).length / (activeJob.checklist.length || 1)) * 100)}% Done
                  </span>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {activeJob.checklist.map((chk) => (
                    <div
                      key={chk.id}
                      onClick={() => toggleChecklistItem(activeJob.id, chk.id)}
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition ${
                        chk.completed
                          ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            chk.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {chk.completed && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={chk.completed ? 'line-through text-slate-400' : 'font-medium'}>
                          {chk.label}
                        </span>
                      </div>
                      {chk.completedAt && (
                        <span className="text-[10px] font-mono text-emerald-600">{chk.completedAt}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage History */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Technician Stage History & Timestamps
                </h4>
                <div className="space-y-2 text-xs">
                  {activeJob.stageHistory.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between">
                      <div>
                        <strong className="text-slate-900 block">{item.label}</strong>
                        {item.note && <p className="text-slate-500 text-[11px] mt-0.5">"{item.note}"</p>}
                        {item.updatedBy && <span className="text-[10px] text-slate-400">By: {item.updatedBy}</span>}
                      </div>
                      <span className="font-mono text-slate-500 font-semibold">{item.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staff Reassignment & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Assigned Specialist</label>
                  <select
                    value={activeJob.assignedStaffId}
                    onChange={(e) => updateStaffAssignment(activeJob.id, e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none"
                  >
                    {staffMembers.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.specialization.split('&')[0]})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Delay Status</label>
                  <button
                    onClick={() => toggleBookingDelay(activeJob.id, !activeJob.isDelayed)}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold border transition ${
                      activeJob.isDelayed
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {activeJob.isDelayed ? 'Delayed: Flagged Active' : 'Mark Job Delayed'}
                  </button>
                </div>
              </div>

              {/* Staff Notes */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Logged Inspection & Staff Notes</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={drawerStaffNote}
                    onChange={(e) => setDrawerStaffNote(e.target.value)}
                    placeholder="Add observation..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => updateBookingNotes(activeJob.id, drawerStaffNote)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-3">
              <Link
                to={`/track/${activeJob.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition flex items-center justify-center gap-1.5"
              >
                <span>Live Customer Tracking Link</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </Link>

              <Link
                to={`/invoice/${activeJob.id}`}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs text-center transition flex items-center justify-center gap-1.5"
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>View Invoice</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
