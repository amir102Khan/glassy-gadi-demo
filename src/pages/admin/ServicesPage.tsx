import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { ServicePackage, AddOnService, VehicleType } from '../../types';
import {
  Wrench,
  Plus,
  Edit,
  Clock,
  Sparkles,
  CheckCircle2,
  X,
  Check,
  ToggleLeft,
  ToggleRight,
  Layers
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services, addOns, updateServicePackage, toggleServiceStatus } = useDemo();
  const [editingService, setEditingService] = useState<ServicePackage | null>(null);

  // Form State for editing
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [duration, setDuration] = useState('');
  const [priceHatchback, setPriceHatchback] = useState(399);
  const [priceSedan, setPriceSedan] = useState(499);
  const [priceSuv, setPriceSuv] = useState(599);
  const [priceLuxury, setPriceLuxury] = useState(799);
  const [featuresText, setFeaturesText] = useState('');

  const handleStartEdit = (pkg: ServicePackage) => {
    setEditingService(pkg);
    setName(pkg.name);
    setTagline(pkg.tagline);
    setDuration(pkg.duration);
    setPriceHatchback(pkg.pricing.hatchback);
    setPriceSedan(pkg.pricing.sedan);
    setPriceSuv(pkg.pricing.suv);
    setPriceLuxury(pkg.pricing.luxury);
    setFeaturesText(pkg.features.join('\n'));
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const updated: ServicePackage = {
      ...editingService,
      name,
      tagline,
      duration,
      pricing: {
        hatchback: Number(priceHatchback) || 0,
        sedan: Number(priceSedan) || 0,
        suv: Number(priceSuv) || 0,
        luxury: Number(priceLuxury) || 0
      },
      features: featuresText.split('\n').filter((f) => f.trim().length > 0)
    };

    updateServicePackage(updated);
    setEditingService(null);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Service Packages & Pricing</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure vehicle category tiers, service durations, and optional detailing enhancements.
          </p>
        </div>

        <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
          ✓ Edits immediately update Customer Booking Wizard
        </div>
      </div>

      {/* Service Packages List */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Core Service Packages ({services.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                pkg.active ? 'border-slate-200/90 shadow-xs' : 'border-slate-200 opacity-60 bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-extrabold text-slate-900">{pkg.name}</h4>
                    {pkg.popular && (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{pkg.tagline}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleServiceStatus(pkg.id)}
                    className="p-1 rounded text-slate-400 hover:text-slate-600"
                    title={pkg.active ? 'Disable Package' : 'Enable Package'}
                  >
                    {pkg.active ? (
                      <ToggleRight className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-slate-400" />
                    )}
                  </button>
                  <button
                    onClick={() => handleStartEdit(pkg)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    title="Edit Service Package"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Pricing Matrix per Vehicle Type */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Segment Pricing
                </span>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Hatchback</span>
                    <strong className="text-slate-900">₹{pkg.pricing.hatchback}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Sedan</span>
                    <strong className="text-slate-900">₹{pkg.pricing.sedan}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">SUV</span>
                    <strong className="text-emerald-700 font-extrabold">₹{pkg.pricing.suv}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Luxury</span>
                    <strong className="text-slate-900">₹{pkg.pricing.luxury}</strong>
                  </div>
                </div>
              </div>

              {/* Features list */}
              <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                {pkg.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {pkg.duration}
                </span>
                <span className={`font-semibold ${pkg.active ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {pkg.active ? 'Available for Booking' : 'Temporarily Disabled'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Add-ons Section */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Optional Add-On Extras ({addOns.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {addOns.map((add) => (
            <div key={add.id} className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <h5 className="font-bold text-xs text-slate-900">{add.name}</h5>
                  <span className="text-xs font-black text-emerald-700">₹{add.price}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{add.description}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Duration: +{add.duration}</span>
                <span className="text-emerald-700 font-semibold">Live in wizard</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EDIT SERVICE PACKAGE MODAL */}
      {/* ========================================================================= */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-base font-extrabold text-slate-900">Edit {editingService.name}</h3>
              <button onClick={() => setEditingService(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Package Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              {/* Segment Prices */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Pricing per Vehicle Category (₹)</label>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-0.5">Hatchback</span>
                    <input
                      type="number"
                      value={priceHatchback}
                      onChange={(e) => setPriceHatchback(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-center font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-0.5">Sedan</span>
                    <input
                      type="number"
                      value={priceSedan}
                      onChange={(e) => setPriceSedan(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-center font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-0.5">SUV</span>
                    <input
                      type="number"
                      value={priceSuv}
                      onChange={(e) => setPriceSuv(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-center font-bold text-emerald-700"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-0.5">Luxury</span>
                    <input
                      type="number"
                      value={priceLuxury}
                      onChange={(e) => setPriceLuxury(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-center font-bold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Features (One per line)</label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
