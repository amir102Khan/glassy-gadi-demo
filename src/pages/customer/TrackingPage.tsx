import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { JOB_STAGES } from '../../data/mockData';
import { JobStage } from '../../types';
import { StageBadge, VehicleTypeBadge } from '../../components/common/Badges';
import { PhotoModal } from '../../components/common/PhotoModal';
import {
  Car,
  Clock,
  Sparkles,
  CheckCircle2,
  Circle,
  AlertTriangle,
  FileText,
  Phone,
  Receipt,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Play,
  RotateCw,
  ExternalLink,
  Info
} from 'lucide-react';

export const TrackingPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId?: string }>();
  const { bookings, updateBookingStage, advanceBookingStage, toggleBookingDelay } = useDemo();

  // Selected booking (default to GG-1024 if not specified or not found)
  const targetId = bookingId || 'GG-1024';
  const booking = bookings.find((b) => b.id.toLowerCase() === targetId.toLowerCase()) || bookings[0];

  const [activePhoto, setActivePhoto] = useState<{ url: string; title: string; subtitle?: string } | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);

  if (!booking) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <Car className="w-12 h-12 mx-auto text-slate-400 mb-3" />
        <h2 className="text-xl font-bold text-slate-800">Booking Not Found</h2>
        <p className="text-sm text-slate-500 mt-1">We couldn't find a booking with ID "{targetId}".</p>
        <Link to="/track/GG-1024" className="mt-4 inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold">
          View Demo Booking GG-1024
        </Link>
      </div>
    );
  }

  // Current stage details
  const currentStageIndex = JOB_STAGES.findIndex((s) => s.id === booking.currentStage);
  const currentStageDef = JOB_STAGES[currentStageIndex] || JOB_STAGES[0];
  const isReady = booking.currentStage === 'ready_pickup';
  const isCompleted = booking.currentStage === 'completed';

  const progressPercent = Math.round(((currentStageIndex + 1) / JOB_STAGES.length) * 100);

  return (
    <div className="bg-slate-100 min-h-screen pb-16 font-sans">
      {/* ========================================================================= */}
      {/* PRESENTER-ONLY DEMO CONTROL PANEL (Distinctly marked, clearly for pitch) */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 border-b border-slate-800 text-white px-4 py-3 shadow-md">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
              Presenter Live Stage Advancer
            </span>
            <span className="text-slate-500 text-xs hidden sm:inline">|</span>
            <span className="text-xs text-slate-300 font-mono hidden sm:inline">
              Car: {booking.vehicle.model} ({booking.id})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Advance to next sequential stage */}
            <button
              onClick={() => advanceBookingStage(booking.id)}
              disabled={isCompleted}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition disabled:opacity-50"
              title="Move car to next stage in real-time"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Advance Stage</span>
            </button>

            {/* Jump to specific stage */}
            <select
              value={booking.currentStage}
              onChange={(e) => updateBookingStage(booking.id, e.target.value as JobStage, undefined, 'Presenter Demo')}
              className="bg-slate-800 text-slate-200 border border-slate-700 text-xs rounded-lg px-2 py-1.5 font-semibold focus:outline-none cursor-pointer"
            >
              {JOB_STAGES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.order}. {s.label}
                </option>
              ))}
            </select>

            {/* Delay toggle */}
            <button
              onClick={() => toggleBookingDelay(booking.id, !booking.isDelayed)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition ${
                booking.isDelayed
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-750'
              }`}
              title="Simulate delay notice"
            >
              {booking.isDelayed ? 'Delayed: ON' : 'Flag Delay'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Readiness Alert Banner if ready for pickup */}
        {isReady && (
          <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center justify-between gap-4 animate-bounce-subtle">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">Your Car is Ready for Pickup!</h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Parked in Delivery Bay #1 at Jubilee Hills Studio. Settle invoice at reception.
                </p>
              </div>
            </div>
            <Link
              to={`/invoice/${booking.id}`}
              className="px-3 py-2 rounded-xl bg-white text-emerald-900 font-extrabold text-xs shrink-0 shadow-sm hover:bg-emerald-50 transition"
            >
              View Invoice
            </Link>
          </div>
        )}

        {/* Delay notice if flagged */}
        {booking.isDelayed && !isReady && !isCompleted && (
          <div className="p-4 rounded-2xl bg-amber-500 text-slate-950 shadow-md flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div className="text-xs">
              <span className="font-extrabold block">Extra Detailing Care in Progress:</span>
              <span>{booking.delayReason || 'Our master detailer is applying additional infrared curing to ensure mirror finish.'}</span>
            </div>
          </div>
        )}

        {/* Vehicle & Live Status Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-emerald-400">
                  {booking.id}
                </span>
                <span className="text-xs text-slate-500">• Fictional Demo Car</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                {booking.vehicle.year} {booking.vehicle.make} {booking.vehicle.model}
              </h1>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="font-mono font-semibold text-slate-700">{booking.vehicle.regNumber}</span>
                <span>•</span>
                <span className="capitalize">{booking.vehicle.color || 'Obsidian Black'}</span>
                <span>•</span>
                <VehicleTypeBadge type={booking.vehicle.type} />
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Current Stage</span>
              <div className="mt-1">
                <StageBadge stage={booking.currentStage} size="md" />
              </div>
            </div>
          </div>

          {/* Service & Time Meta */}
          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Service Package</span>
              <strong className="text-slate-900 font-bold block mt-0.5">{booking.servicePackageName}</strong>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Bay Check-in</span>
              <strong className="text-slate-900 font-bold block mt-0.5">{booking.checkInTime || '10:15 AM'}</strong>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Est. Completion</span>
              <strong className="text-emerald-700 font-bold block mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                {booking.estimatedCompletion}
              </strong>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Assigned Specialist</span>
              <strong className="text-slate-900 font-bold block mt-0.5">{booking.assignedStaffName}</strong>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-slate-500">Overall Detailing Progress</span>
              <span className="text-emerald-600 font-bold">{progressPercent}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 9-Stage Live Detailing Timeline */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Detailing Stage Tracker</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                9 verified digital checkpoints with technician timestamps.
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg font-semibold">
              LIVE WORKSHOP SYNC
            </span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {JOB_STAGES.map((stage) => {
              const isCurrent = stage.id === booking.currentStage;
              const isPassed = stage.order < currentStageDef.order;
              const isUpcoming = stage.order > currentStageDef.order;

              // Find history match if any
              const historyItem = booking.stageHistory.find((h) => h.stage === stage.id);

              return (
                <div key={stage.id} className="relative group">
                  {/* Timeline Node Icon */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-100 shadow-md scale-110'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                    ) : (
                      <Circle className="w-2.5 h-2.5 text-slate-400" />
                    )}
                  </div>

                  {/* Stage Content */}
                  <div
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-emerald-50/40 border-emerald-300 shadow-xs'
                        : isPassed
                        ? 'bg-slate-50/70 border-slate-200/80'
                        : 'bg-transparent border-dashed border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400">0{stage.order}</span>
                        <h4
                          className={`text-sm font-bold ${
                            isCurrent ? 'text-emerald-950 font-extrabold' : isPassed ? 'text-slate-800' : 'text-slate-500'
                          }`}
                        >
                          {stage.label}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white animate-pulse">
                            In Progress Now
                          </span>
                        )}
                        {isPassed && (
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                            Completed
                          </span>
                        )}
                        {isUpcoming && (
                          <span className="text-[10px] font-medium text-slate-400">Pending</span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mt-1">{stage.description}</p>

                    {/* Historical timestamp & staff note */}
                    {historyItem && (
                      <div className="mt-2 pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                        <span className="flex items-center gap-1 font-mono text-slate-700 font-medium">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {historyItem.timestamp}
                        </span>
                        {historyItem.note && (
                          <span className="italic text-slate-600">"{historyItem.note}"</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Before-and-After Photo Showcase */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Before & After Detailing Proof</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                High-definition photos uploaded by our technicians during service.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {booking.beforePhotos.length + booking.afterPhotos.length} Photos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Before Photos */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Pre-Wash & Inspection
              </span>
              {booking.beforePhotos.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {booking.beforePhotos.map((photo, i) => (
                    <div
                      key={i}
                      onClick={() => setActivePhoto({ url: photo, title: 'Pre-Wash Inspection Photo', subtitle: `${booking.vehicle.make} ${booking.vehicle.model}` })}
                      className="group relative rounded-xl overflow-hidden aspect-video cursor-pointer border border-slate-200"
                    >
                      <img src={photo} alt="Before" className="w-full h-full object-cover group-hover:scale-105 transition" />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition" />
                      <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-slate-900/80 text-[10px] font-bold text-slate-200">
                        Before
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                  Technician logging pre-wash photos...
                </div>
              )}
            </div>

            {/* After Photos */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">
                Polished & Sealed (Showroom Gloss)
              </span>
              {booking.afterPhotos.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {booking.afterPhotos.map((photo, i) => (
                    <div
                      key={i}
                      onClick={() => setActivePhoto({ url: photo, title: 'Finished Detailing Photo', subtitle: `${booking.vehicle.make} ${booking.vehicle.model}` })}
                      className="group relative rounded-xl overflow-hidden aspect-video cursor-pointer border border-emerald-300 ring-1 ring-emerald-500/20"
                    >
                      <img src={photo} alt="After" className="w-full h-full object-cover group-hover:scale-105 transition" />
                      <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/0 transition" />
                      <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-emerald-600 text-[10px] font-bold text-white shadow-xs">
                        Showroom Finish
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                  After-photos will appear once compounding and quality check are complete.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Summary & Contact Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Digital Invoice #{booking.invoiceNumber}</span>
              <div className="text-xl font-black text-slate-900 mt-0.5">
                Total: ₹{booking.totalAmount.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-semibold text-slate-500 font-normal">
                  ({booking.paymentStatus.toUpperCase()})
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowSupportModal(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>Contact Workshop Bay</span>
            </button>

            <Link
              to={`/invoice/${booking.id}`}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <span>View Full Invoice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Photo Enlarger Modal */}
      {activePhoto && (
        <PhotoModal
          isOpen={!!activePhoto}
          onClose={() => setActivePhoto(null)}
          imageUrl={activePhoto.url}
          title={activePhoto.title}
          subtitle={activePhoto.subtitle}
        />
      )}

      {/* Support Simulation Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Jubilee Hills Workshop Supervisor</h3>
            <p className="text-xs text-slate-500 mt-1">
              Need to add an extra service or adjust your delivery pickup time?
            </p>
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800">
              Direct Bay Phone: +91 98490 12345
            </div>
            <button
              onClick={() => setShowSupportModal(false)}
              className="mt-5 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
