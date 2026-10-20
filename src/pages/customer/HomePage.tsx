import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { VehicleType } from '../../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Eye,
  Camera,
  CheckCircle2,
  Car,
  MapPin,
  Phone,
  Search,
  Star,
  Zap,
  Award
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { services, bookings } = useDemo();
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType>('suv');
  const [trackInput, setTrackInput] = useState('GG-1024');
  const navigate = useNavigate();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      navigate(`/track/${trackInput.trim()}`);
    }
  };

  const vehicleTypeButtons: { type: VehicleType; label: string }[] = [
    { type: 'hatchback', label: 'Hatchback (Swift, Baleno)' },
    { type: 'sedan', label: 'Sedan (City, Verna)' },
    { type: 'suv', label: 'SUV (Creta, Thar, Seltos)' },
    { type: 'luxury', label: 'Luxury (BMW, Merc)' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-16 sm:py-24">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Hyderabad's First Transparent Digital Detailing Studio</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Premium Car Care,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  Without the Guesswork.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
                Track every stage of your car's wash, interior extraction, and paint correction live from your phone. Before-and-after proof on every job.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/book"
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <span>Book a Service</span>
                  <ArrowRight className="w-4 h-4 font-bold" />
                </Link>

                <Link
                  to="/track/GG-1024"
                  className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-100 font-bold text-sm border border-slate-700/80 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>See Live Tracking Demo</span>
                </Link>
              </div>

              {/* Quick Car Tracking Search Box */}
              <div className="pt-6 border-t border-slate-800/80 max-w-lg">
                <span className="text-xs font-semibold text-slate-400 block mb-2">
                  Already have a booking? Track in real-time:
                </span>
                <form onSubmit={handleTrackSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={trackInput}
                      onChange={(e) => setTrackInput(e.target.value)}
                      placeholder="Enter Booking ID (e.g. GG-1024)"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl transition"
                  >
                    Track
                  </button>
                </form>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">
                  <span>Try seed bookings:</span>
                  <button
                    type="button"
                    onClick={() => { setTrackInput('GG-1024'); navigate('/track/GG-1024'); }}
                    className="text-emerald-400 font-mono underline hover:text-emerald-300"
                  >
                    GG-1024 (Rahul S. - Creta)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => { setTrackInput('GG-1025'); navigate('/track/GG-1025'); }}
                    className="text-emerald-400 font-mono underline hover:text-emerald-300"
                  >
                    GG-1025 (Priya R. - BMW)
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group">
                <img
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1000&q=80"
                  alt="Glossy Gaadi Detailing Studio"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Floating Live Tracking Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-lg">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      LIVE TRACKING DEMO
                    </span>
                    <span className="font-mono text-slate-300">Hyundai Creta • TS 09 EA 4521</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[68%]" />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Stage 6: Polishing / Detailing</span>
                    <span className="text-emerald-400 font-semibold">Est. Ready: 2:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Detailing Workflow / How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Zero Blind Spots</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            How Glossy Gaadi Works
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No more waiting in the lobby or wondering if your car was really shampooed. Every step is documented with digital checkpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">Book Online in 60s</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Select your vehicle type, service package, add-ons, and preferred date and slot at our Jubilee Hills studio.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-lg mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">Pre-Wash Digital Inspection</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Our technician conducts a 24-point walkaround, logging existing paint flaws or scratches into your digital profile.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-lg mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">Live Stage Updates</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Follow washing, interior steam extraction, rotary compounding, and QC right on your phone in real-time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900">Spotless Handover</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Inspect before-and-after photos, receive your itemized digital invoice, and pick up your showroom-ready car.
            </p>
          </div>
        </div>
      </section>

      {/* Service Packages Catalogue with Vehicle Switcher */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Transparent Rates</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Popular Service Packages
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select your vehicle category to preview upfront pricing tailored to your car.
            </p>
          </div>

          {/* Vehicle Type Switcher */}
          <div className="inline-flex p-1 bg-slate-200/80 rounded-xl border border-slate-300 text-xs overflow-x-auto">
            {vehicleTypeButtons.map((btn) => (
              <button
                key={btn.type}
                onClick={() => setSelectedVehicleType(btn.type)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition shrink-0 ${
                  selectedVehicleType === btn.type
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {btn.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((pkg) => {
            const price = pkg.pricing[selectedVehicleType] || 999;
            return (
              <div
                key={pkg.id}
                className={`rounded-2xl bg-white border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  pkg.popular
                    ? 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-md relative'
                    : 'border-slate-200/80 shadow-xs hover:border-slate-300'
                }`}
              >
                {pkg.popular && (
                  <div className="bg-emerald-600 text-white text-[11px] font-extrabold uppercase py-1 text-center tracking-wider">
                    Most Popular Choice
                  </div>
                )}

                <div className="p-6">
                  {pkg.image && (
                    <div className="h-36 -mx-6 -mt-6 mb-5 overflow-hidden">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-extrabold text-slate-900">{pkg.name}</h3>
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {pkg.duration}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {pkg.tagline}
                  </p>

                  <div className="mt-5 pb-5 border-b border-slate-100 flex items-baseline gap-1">
                    <span className="text-xs font-semibold text-slate-500">Starts at</span>
                    <span className="text-3xl font-black text-slate-950">₹{price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400">/ car</span>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Package Includes:
                    </span>
                    {pkg.features.slice(0, 5).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/book?service=${pkg.id}&type=${selectedVehicleType}`}
                    className={`w-full py-2.5 rounded-xl text-center text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      pkg.popular
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Book {pkg.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400 italic">
            * All prices displayed are fictional demo values illustrative for Hyderabad market presentation.
          </p>
        </div>
      </section>

      {/* Detailing Features / Why Glossy Gaadi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Precision Engineering & Craftsmanship
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Why Discerning Car Owners in Hyderabad Choose Glossy Gaadi
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We replace roadside sponges and harsh detergents with German Menzerna compounds, Rupes dual-action polishers, and filtered pH-neutral water.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mb-2" />
              <h4 className="text-sm font-bold text-white">Scratchless 2-Bucket System</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Grit guards isolate dirt at the bucket base, guaranteeing zero swirl marks during shampooing.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800">
              <Camera className="w-8 h-8 text-cyan-400 mb-2" />
              <h4 className="text-sm font-bold text-white">Before-and-After Proof</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Every panel correction and seat extraction is photographed and visible on your tracking portal.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800">
              <Award className="w-8 h-8 text-amber-400 mb-2" />
              <h4 className="text-sm font-bold text-white">Certified Master Detailers</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Trained in ceramic curing, leather preservation, and digital paint thickness depth gauge verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demonstrative Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Customer Experience</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            What Hyderabad Car Owners Are Saying
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            * Demonstrative sample feedback used for software presentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              "Being able to watch the progress of my Creta's ceramic coating while sitting in my office in Hitec City was incredible. The before/after photos showed exactly what was done."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <strong className="text-slate-900 block">Rahul Sharma</strong>
                <span className="text-slate-500">Hyundai Creta • Jubilee Hills</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Full Detailing
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              "I usually dread giving my 330i to regular car washes because of aggressive scrubbers. Glossy Gaadi's two-bucket hand wash and paint sealant was pure perfection."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <strong className="text-slate-900 block">Priya Reddy</strong>
                <span className="text-slate-500">BMW 330i M Sport • Banjara Hills</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Premium Wash
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              "Brought my Thar caked in Vikarabad red soil. Their underbody wash and interior steam extraction restored it like new. The online invoice made payment effortless."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <strong className="text-slate-900 block">Vikram Varma</strong>
                <span className="text-slate-500">Mahindra Thar 4x4 • Gachibowli</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Underbody & Wash
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to Experience Transparent Detailing?</h3>
            <p className="text-sm text-emerald-100 max-w-lg">
              Book your slot now. Enjoy real-time tracking, digital checkpoints, and showroom gloss for your vehicle.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              to="/book"
              className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm shadow-md transition hover:scale-105"
            >
              Book Service Online
            </Link>
            <Link
              to="/track/GG-1024"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/30 backdrop-blur transition hover:scale-105"
            >
              Demo Car Tracking
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
