import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { DemoBanner } from '../common/DemoBanner';
import { RoleSwitcher } from '../common/RoleSwitcher';
import { ToastContainer } from '../common/ToastContainer';
import { Sparkles, MapPin, Phone, Clock, Shield, Menu, X, Car } from 'lucide-react';

export const CustomerLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isNavActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <DemoBanner />

      {/* Customer Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Wordmark */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-black text-slate-950 tracking-tight flex items-center gap-1.5">
                  GLOSSY GAADI
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="block text-[11px] font-semibold text-slate-500 tracking-wide uppercase">
                  Digital Detailing Studio • Hyderabad
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm font-semibold transition ${
                  isNavActive('/') ? 'text-emerald-600' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Home
              </Link>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.hash = '#/';
                }}
                className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition"
              >
                Services & Pricing
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.hash = '#/';
                }}
                className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition"
              >
                How It Works
              </button>
              <Link
                to="/track/GG-1024"
                className={`text-sm font-semibold flex items-center gap-1.5 transition ${
                  location.pathname.startsWith('/track') ? 'text-emerald-600' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Car className="w-4 h-4 text-emerald-500" />
                Track My Car
              </Link>
            </nav>

            {/* Role Switcher & Book Now CTA */}
            <div className="flex items-center gap-3">
              <RoleSwitcher />

              <Link
                to="/book"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition-all hover:shadow-emerald-500/20 hover:scale-[1.02]"
              >
                Book a Service
              </Link>

              {/* Mobile menu trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700 py-2 border-b border-slate-100"
            >
              Home
            </Link>
            <a
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700 py-2 border-b border-slate-100"
            >
              Services & Pricing
            </a>
            <a
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700 py-2 border-b border-slate-100"
            >
              How It Works
            </a>
            <Link
              to="/track/GG-1024"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-emerald-700 py-2 border-b border-slate-100"
            >
              Track My Car (Demo GG-1024)
            </Link>
            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm"
            >
              Book a Service
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Customer Footer */}
      <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-lg font-black text-white tracking-tight">GLOSSY GAADI</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your car. Our care. Every step, visible. Premium automotive detailing and glassmorphism-grade care in Hyderabad.
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-400">
                <Shield className="w-3.5 h-3.5" />
                <span>Ceramic & Paint Protection Specialists</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Popular Services</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/book" className="hover:text-emerald-400">Full Showroom Detailing</Link></li>
                <li><Link to="/book" className="hover:text-emerald-400">9H Ceramic Shield Coating</Link></li>
                <li><Link to="/book" className="hover:text-emerald-400">Interior Antimicrobial Deep Extraction</Link></li>
                <li><Link to="/book" className="hover:text-emerald-400">Two-Bucket Premium Foam Wash</Link></li>
                <li><Link to="/book" className="hover:text-emerald-400">Engine Bay Steam & Dress</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Studio Location</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Road No. 36, Near Peddamma Temple Metro, Jubilee Hills, Hyderabad, Telangana 500033</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>+91 98490 00000 (Sample Demo Helpline)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mon – Sun: 8:00 AM – 8:00 PM</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Demo Prototype Note</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                This website is a proposed digital platform interactive prototype built for business presentation. No real payments or bookings are made.
              </p>
              <div className="mt-4">
                <Link
                  to="/track/GG-1024"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Test Demo Car Tracking</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 Glossy Gaadi. All dummy data is illustrative for presentation.</p>
            <div className="flex items-center gap-4">
              <span>Hyderabad, Telangana</span>
              <span>•</span>
              <span className="text-emerald-400">Sales Pitch Prototype</span>
            </div>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
};
