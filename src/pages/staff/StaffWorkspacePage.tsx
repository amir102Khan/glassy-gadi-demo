import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { DemoBanner } from '../../components/common/DemoBanner';
import { RoleSwitcher } from '../../components/common/RoleSwitcher';
import { ToastContainer } from '../../components/common/ToastContainer';
import { StageBadge, PaymentBadge, VehicleTypeBadge } from '../../components/common/Badges';
import { JOB_STAGES } from '../../data/mockData';
import { JobStage, Booking } from '../../types';
import {
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Camera,
  PlusCircle,
  FileText,
  ChevronRight,
  ExternalLink,
  Car,
  Check,
  User,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SAMPLE_PHOTO_PRESETS = [
  { label: 'Bonnet Paint Swirl Correction', url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Leather Seat Hot-Extraction', url: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80' },
  { label: 'High Gloss Ceramic Reflection', url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80' },
  { label: 'Alloy Wheel Iron Decontamination', url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80' }
];

export const StaffWorkspacePage: React.FC = () => {
  const {
    bookings,
    staffMembers,
    activeStaffId,
    setActiveStaffId,
    updateBookingStage,
    advanceBookingStage,
    toggleChecklistItem,
    updateBookingNotes,
    toggleBookingDelay,
    addBookingPhoto,
    addToast
  } = useDemo();

  const [filter, setFilter] = useState<'my' | 'all' | 'in_progress'>('all');
  const [selectedJob, setSelectedJob] = useState<Booking | null>(() => bookings[0] || null);
  const [noteInput, setNoteInput] = useState('');
  const [delayReasonInput, setDelayReasonInput] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoType, setPhotoType] = useState<'before' | 'after'>('after');
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [customServiceName, setCustomServiceName] = useState('');
  const [customServicePrice, setCustomServicePrice] = useState('499');

  const currentStaff = staffMembers.find((s) => s.id === activeStaffId) || staffMembers[0];

  // Keep selected job updated from context
  const activeJob = bookings.find((b) => b.id === selectedJob?.id) || selectedJob;

  const filteredBookings = bookings.filter((b) => {
    if (b.status === 'cancelled') return false;
    if (filter === 'my') return b.assignedStaffId === activeStaffId;
    if (filter === 'in_progress') return ['received', 'inspection', 'washing', 'interior', 'polishing', 'quality_check'].includes(b.currentStage);
    return true;
  });

  const handleStageSelect = (bookingId: string, stage: JobStage) => {
    updateBookingStage(bookingId, stage, undefined, currentStaff.name);
  };

  const handleSaveNotes = () => {
    if (activeJob) {
      updateBookingNotes(activeJob.id, noteInput);
      setNoteInput('');
    }
  };

  const handleSuggestService = () => {
    if (!activeJob || !customServiceName.trim()) return;
    const priceNum = Number(customServicePrice) || 499;

    // Simulate appending additional request
    activeJob.additionalRequests = [
      ...(activeJob.additionalRequests || []),
      {
        id: `req-${Date.now()}`,
        item: customServiceName.trim(),
        amount: priceNum,
        approved: false,
        suggestedByStaff: true
      }
    ];

    addToast(
      'Service Flagged',
      `"${customServiceName}" (₹${priceNum}) flagged for customer approval on job ${activeJob.id}`,
      'info'
    );
    setCustomServiceName('');
    setShowAddServiceModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans pb-12">
      <DemoBanner />

      {/* Staff Header */}
      <header className="bg-slate-950/90 border-b border-slate-800 px-4 sm:px-6 py-3.5 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20 font-black">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-white tracking-tight">Workshop Staff Terminal</h1>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                  Floor View
                </span>
              </div>
              <p className="text-xs text-slate-400">Glossy Gaadi • Jubilee Hills Workshop</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RoleSwitcher />
          </div>
        </div>
      </header>

      {/* Staff Profile Bar */}
      <div className="bg-slate-850 border-b border-slate-800 px-4 sm:px-6 py-2.5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-500">
              <img src={currentStaff.avatar} alt={currentStaff.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-slate-400">Logged in as: </span>
              <span className="font-bold text-white">{currentStaff.name}</span>
              <span className="text-emerald-400 ml-1.5 font-medium">({currentStaff.role})</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-slate-400">Switch Employee:</span>
            <select
              value={activeStaffId}
              onChange={(e) => setActiveStaffId(e.target.value)}
              className="bg-slate-800 text-emerald-400 border border-slate-700 rounded-lg px-2 py-1 font-semibold focus:outline-none"
            >
              {staffMembers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.role.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex-1">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                filter === 'all' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              All Today's Jobs ({bookings.length})
            </button>
            <button
              onClick={() => setFilter('my')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                filter === 'my' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Assigned to Me ({bookings.filter((b) => b.assignedStaffId === activeStaffId).length})
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                filter === 'in_progress' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              In Progress ({bookings.filter((b) => ['received', 'inspection', 'washing', 'interior', 'polishing', 'quality_check'].includes(b.currentStage)).length})
            </button>
          </div>

          <div className="hidden sm:block text-xs text-slate-400 font-mono">
            {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        {/* 2-Column Desktop Grid / Stacked Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Job Cards List */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Active Job Queue ({filteredBookings.length})
            </h2>

            <div className="space-y-3">
              {filteredBookings.map((job) => {
                const isSelected = activeJob?.id === job.id;
                return (
                  <div
                    key={job.id}
                    onClick={() => {
                      setSelectedJob(job);
                      setNoteInput(job.staffNotes || '');
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-slate-800 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-950/20'
                        : 'bg-slate-850/80 hover:bg-slate-800 border-slate-700/80'
                    }`}
                  >
                    {job.isDelayed && (
                      <div className="absolute top-0 right-0 px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-extrabold rounded-bl-lg flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>DELAYED</span>
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-2 pr-12">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-emerald-400">{job.id}</span>
                          <span className="text-xs font-semibold text-slate-200">
                            {job.vehicle.make} {job.vehicle.model}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {job.vehicle.regNumber} • {job.customerName}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <StageBadge stage={job.currentStage} size="sm" />
                      <span className="text-[11px] font-medium text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700">
                        {job.servicePackageName}
                      </span>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Est: <strong className="text-slate-200">{job.estimatedCompletion}</strong></span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-300">
                        <User className="w-3 h-3 text-emerald-400" />
                        <span>{job.assignedStaffName}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Job Action Center */}
          <div className="lg:col-span-7">
            {activeJob ? (
              <div className="bg-slate-850 rounded-2xl border border-slate-700 p-5 sm:p-6 space-y-6 sticky top-20 shadow-xl">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-700">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-mono font-extrabold text-emerald-400">{activeJob.id}</span>
                      <StageBadge stage={activeJob.currentStage} size="md" />
                      {activeJob.isDelayed && (
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Delayed
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {activeJob.vehicle.year} {activeJob.vehicle.make} {activeJob.vehicle.model}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Reg: <span className="font-mono text-slate-200 font-semibold">{activeJob.vehicle.regNumber}</span> • Customer: {activeJob.customerName} ({activeJob.customerPhone})
                    </p>
                  </div>

                  {/* Customer live tracking preview link */}
                  <Link
                    to={`/track/${activeJob.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition"
                    title="Open customer order tracking page in new tab"
                  >
                    <span>View Customer Tracking</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Primary Workflow Stage Controls - Large Touch Buttons */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Current Detailing Stage
                    </label>
                    <button
                      onClick={() => advanceBookingStage(activeJob.id)}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30 transition"
                    >
                      <span>Advance to Next Stage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {JOB_STAGES.map((s) => {
                      const isCurrent = activeJob.currentStage === s.id;
                      const isPassed = s.order < (JOB_STAGES.find((x) => x.id === activeJob.currentStage)?.order || 1);

                      return (
                        <button
                          key={s.id}
                          onClick={() => handleStageSelect(activeJob.id, s.id)}
                          className={`p-2.5 rounded-xl text-left border text-xs font-medium transition flex items-center justify-between ${
                            isCurrent
                              ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md shadow-emerald-500/20 scale-[1.02]'
                              : isPassed
                              ? 'bg-slate-800 text-slate-300 border-slate-700/80 hover:bg-slate-750'
                              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/80'
                          }`}
                        >
                          <span className="truncate">{s.label}</span>
                          {isCurrent && <Check className="w-4 h-4 text-slate-950 shrink-0 font-bold" />}
                          {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Checklist Section */}
                <div className="space-y-3 pt-3 border-t border-slate-700/80">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Service Checklist ({activeJob.checklist.filter((c) => c.completed).length} / {activeJob.checklist.length} Completed)
                    </h4>
                    <span className="text-xs text-emerald-400 font-mono">
                      {Math.round((activeJob.checklist.filter((c) => c.completed).length / (activeJob.checklist.length || 1)) * 100)}%
                    </span>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {activeJob.checklist.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleChecklistItem(activeJob.id, item.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition select-none ${
                          item.completed
                            ? 'bg-emerald-950/20 border-emerald-800/50 text-slate-200'
                            : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                              item.completed
                                ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                                : 'border-slate-600 bg-slate-900'
                            }`}
                          >
                            {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className={item.completed ? 'line-through text-slate-300' : 'text-slate-200'}>
                            {item.label}
                          </span>
                        </div>
                        {item.completedAt && (
                          <span className="text-[10px] text-emerald-400 font-mono">{item.completedAt}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photos & Add-on Extra Flags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-700/80">
                  {/* Photo Upload Simulator */}
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-cyan-400" />
                        Photos ({activeJob.beforePhotos.length + activeJob.afterPhotos.length})
                      </span>
                      <button
                        onClick={() => setShowPhotoModal(true)}
                        className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        <PlusCircle className="w-3 h-3" />
                        Simulate Upload
                      </button>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto py-1">
                      {activeJob.beforePhotos.map((p, i) => (
                        <div key={`b-${i}`} className="relative group shrink-0">
                          <img src={p} alt="Before" className="w-12 h-12 object-cover rounded-lg border border-slate-700" />
                          <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[8px] text-center text-slate-300">Before</span>
                        </div>
                      ))}
                      {activeJob.afterPhotos.map((p, i) => (
                        <div key={`a-${i}`} className="relative group shrink-0">
                          <img src={p} alt="After" className="w-12 h-12 object-cover rounded-lg border border-emerald-500" />
                          <span className="absolute bottom-0 inset-x-0 bg-emerald-950/90 text-[8px] text-center text-emerald-300">After</span>
                        </div>
                      ))}
                      {activeJob.beforePhotos.length === 0 && activeJob.afterPhotos.length === 0 && (
                        <span className="text-xs text-slate-500 italic">No photos logged yet</span>
                      )}
                    </div>
                  </div>

                  {/* Delay / Extra Service Flagging */}
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        Workshop Action Flags
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleBookingDelay(activeJob.id, !activeJob.isDelayed, delayReasonInput)}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition ${
                            activeJob.isDelayed
                              ? 'bg-amber-500 text-slate-950 border-amber-400'
                              : 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-750'
                          }`}
                        >
                          {activeJob.isDelayed ? 'Clear Delay Flag' : 'Flag as Delayed'}
                        </button>

                        <button
                          onClick={() => setShowAddServiceModal(true)}
                          className="flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-emerald-300 border border-slate-700 transition"
                        >
                          + Flag Add-on
                        </button>
                      </div>
                    </div>

                    {activeJob.isDelayed && (
                      <p className="text-[11px] text-amber-400/90 mt-2">
                        Reason: {activeJob.delayReason || 'Extra curing time required'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Staff Notes Form */}
                <div className="space-y-2 pt-3 border-t border-slate-700/80">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-slate-400" />
                    Staff Notes & Vehicle Observations
                  </label>
                  <div className="flex gap-2">
                    <textarea
                      rows={2}
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      placeholder="Add inspection notes, paint thickness reading, clear coat condition, or customer request..."
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition self-end"
                    >
                      Save
                    </button>
                  </div>
                  {activeJob.staffNotes && (
                    <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40 text-xs text-slate-300">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Logged note:</span>
                      {activeJob.staffNotes}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-850 rounded-2xl border border-slate-700 p-8 text-center text-slate-400">
                <Car className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                <p>Select a job from the queue to view detailing checklist and update stages.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Upload Simulator Modal */}
      {showPhotoModal && activeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-cyan-400" />
              Simulate Photo Upload ({activeJob.id})
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select whether this is a Before or After photo, then choose a simulated detailing asset.
            </p>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setPhotoType('before')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                  photoType === 'before'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                Before Photo
              </button>
              <button
                type="button"
                onClick={() => setPhotoType('after')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                  photoType === 'after'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                After Photo (Showroom)
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Sample Detailing Photos:
              </span>
              {SAMPLE_PHOTO_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    addBookingPhoto(activeJob.id, photoType, preset.url);
                    setShowPhotoModal(false);
                  }}
                  className="w-full flex items-center gap-3 p-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-left transition"
                >
                  <img src={preset.url} alt={preset.label} className="w-12 h-10 object-cover rounded-lg" />
                  <span className="text-xs text-slate-200 font-medium">{preset.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flag Extra Service Modal */}
      {showAddServiceModal && activeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-400" />
              Flag Additional Service for Customer
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Recommend a service discovered during detailing (e.g. glass rain treatment, AC ozone mist, scratch blend).
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Service Item Name</label>
                <input
                  type="text"
                  value={customServiceName}
                  onChange={(e) => setCustomServiceName(e.target.value)}
                  placeholder="e.g. Rain-X Windshield Treatment"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={customServicePrice}
                  onChange={(e) => setCustomServicePrice(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAddServiceModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSuggestService}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Flag Service
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};
