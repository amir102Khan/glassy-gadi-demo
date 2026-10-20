import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { StaffMember } from '../../types';
import {
  UserCheck,
  Phone,
  Car,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  HardHat,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const StaffPage: React.FC = () => {
  const { staffMembers, bookings, updateStaffAssignment } = useDemo();
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Reassignment modal
  const [reassignJobId, setReassignJobId] = useState<string | null>(null);
  const [targetStaffId, setTargetStaffId] = useState<string>(staffMembers[0]?.id || '');

  const handleReassign = (e: React.FormEvent) => {
    e.preventDefault();
    if (reassignJobId && targetStaffId) {
      updateStaffAssignment(reassignJobId, targetStaffId);
      setReassignJobId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Staff Management & Bay Allocation</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor technician floor allocation, job distribution, and bay assignments.
          </p>
        </div>

        <Link
          to="/staff"
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start"
        >
          <HardHat className="w-4 h-4 text-emerald-400" />
          <span>Open Staff Floor Terminal</span>
        </Link>
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {staffMembers.map((staff) => {
          // Find currently active jobs assigned to this staff
          const activeJobs = bookings.filter(
            (b) => b.assignedStaffId === staff.id && !['completed', 'cancelled'].includes(b.status)
          );
          const completedJobs = bookings.filter(
            (b) => b.assignedStaffId === staff.id && b.status === 'completed'
          );

          return (
            <div
              key={staff.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                    <img src={staff.avatar} alt={staff.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">{staff.name}</h3>
                    <p className="text-xs text-emerald-700 font-semibold">{staff.role}</p>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{staff.specialization}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs text-slate-500">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{staff.phone}</span>
                </div>

                {/* Workload Stats */}
                <div className="mt-3 grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Active Bay Jobs</span>
                    <strong className="text-base font-black text-slate-900">{activeJobs.length}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Completed Today</span>
                    <strong className="text-base font-black text-emerald-700">{staff.jobsCompletedToday}</strong>
                  </div>
                </div>

                {/* Active Jobs Mini List */}
                <div className="mt-3 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Currently Working On:
                  </span>
                  {activeJobs.slice(0, 3).map((job) => (
                    <div
                      key={job.id}
                      className="p-2 rounded-lg bg-slate-100/70 border border-slate-200 flex items-center justify-between text-[11px]"
                    >
                      <div className="truncate pr-1">
                        <strong className="font-mono text-emerald-800">{job.id}</strong>{' '}
                        <span className="text-slate-700 font-medium">{job.vehicle.make} {job.vehicle.model}</span>
                      </div>
                      <button
                        onClick={() => {
                          setReassignJobId(job.id);
                          setTargetStaffId(staff.id);
                        }}
                        className="text-[10px] text-slate-500 hover:text-emerald-700 font-bold shrink-0 underline"
                      >
                        Reassign
                      </button>
                    </div>
                  ))}
                  {activeJobs.length === 0 && (
                    <div className="text-[11px] text-slate-400 italic py-1">Available for next vehicle</div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Status: Active on Bay
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* REASSIGN JOB MODAL */}
      {/* ========================================================================= */}
      {reassignJobId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Reassign Job {reassignJobId}</h3>
            <p className="text-xs text-slate-500 mt-1">
              Select a different specialist to take over this vehicle detailing job.
            </p>

            <form onSubmit={handleReassign} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Assign to Specialist</label>
                <select
                  value={targetStaffId}
                  onChange={(e) => setTargetStaffId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none"
                >
                  {staffMembers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.role.split(' ')[0]})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReassignJobId(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
