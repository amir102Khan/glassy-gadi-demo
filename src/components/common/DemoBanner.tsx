import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { RotateCcw, Sparkles, Navigation, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoBanner: React.FC = () => {
  const { resetDemoData } = useDemo();
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-slate-900 text-white text-xs border-b border-slate-800 px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 shadow-sm z-50">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-400 tracking-wide uppercase text-[10px]">Demo Mode</span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-300 truncate">
            All data is fictional. Interactive pitch prototype for Glossy Gaadi (Hyderabad, Telangana).
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Quick link to featured demo booking */}
          <button
            onClick={() => navigate('/track/GG-1024')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition text-[11px] font-medium"
            title="Open pre-seeded flagship demo booking"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Featured Demo Car:</span>
            <span className="font-semibold">GG-1024</span>
          </button>

          {/* Quick link to Workshop */}
          <button
            onClick={() => navigate('/admin/jobs')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition text-[11px] font-medium"
          >
            <Navigation className="w-3 h-3 text-slate-400" />
            <span className="hidden md:inline">Workshop Board</span>
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition text-[11px] font-medium"
            title="Reset all bookings, changes and states back to original initial seeds"
          >
            <RotateCcw className="w-3 h-3 text-rose-400" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Reset Demo Data?</h3>
            <p className="text-sm text-slate-600 mt-2">
              This will restore all pre-seeded bookings (including GG-1024), staff workloads, and customer records back to their original presentation state. Any demo bookings you created will be removed.
            </p>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
              >
                Keep Current State
              </button>
              <button
                type="button"
                onClick={() => {
                  resetDemoData();
                  setShowConfirm(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition"
              >
                Yes, Reset Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
