import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { DemoBanner } from '../common/DemoBanner';
import { RoleSwitcher } from '../common/RoleSwitcher';
import { ToastContainer } from '../common/ToastContainer';
import { Menu, Plus, Bell, Search, Sparkles } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/admin/dashboard')) return 'Executive Dashboard';
    if (path.includes('/admin/bookings')) return 'Service Booking Management';
    if (path.includes('/admin/jobs')) return 'Workshop Floor & Job Stages';
    if (path.includes('/admin/customers')) return 'Customer & Vehicle CRM';
    if (path.includes('/admin/services')) return 'Service Packages & Pricing';
    if (path.includes('/admin/staff')) return 'Staff Workload & Bay Allocations';
    if (path.includes('/admin/reports')) return 'Business Analytics & Reports';
    return 'Glossy Gaadi Operations';
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Persistent Demo Indicator */}
      <DemoBanner />

      <div className="flex flex-1">
        {/* Admin Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
          {/* Top Navbar */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  {getPageTitle()}
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block">
                  Glossy Gaadi • Jubilee Hills Workshop • Real-time Operations
                </p>
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Role Switcher */}
              <RoleSwitcher />

              {/* Quick Create Booking CTA */}
              <button
                onClick={() => navigate('/admin/bookings?create=true')}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm shadow-emerald-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>New Booking</span>
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};
