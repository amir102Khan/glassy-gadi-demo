import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  KanbanSquare,
  Users,
  Wrench,
  UserCheck,
  BarChart3,
  ExternalLink,
  MapPin,
  Sparkles,
  Car
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const { carsInWorkshopCount, todayBookingsCount } = useDemo();

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/bookings', icon: CalendarCheck, label: 'Bookings', badge: todayBookingsCount > 0 ? todayBookingsCount : undefined },
    { to: '/admin/jobs', icon: KanbanSquare, label: 'Workshop Board', badge: carsInWorkshopCount > 0 ? `${carsInWorkshopCount} Active` : undefined, highlight: true },
    { to: '/admin/customers', icon: Users, label: 'Customers CRM' },
    { to: '/admin/services', icon: Wrench, label: 'Services Catalogue' },
    { to: '/admin/staff', icon: UserCheck, label: 'Staff Workload' },
    { to: '/admin/reports', icon: BarChart3, label: 'Reports & Analytics' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-slate-900 border-r border-slate-800 text-slate-300 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80">
          <Link to="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold text-white tracking-tight">GLOSSY GAADI</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Hyderabad, TS</span>
              </div>
            </div>
          </Link>
          <div className="mt-3 px-2 py-1 rounded bg-slate-800/80 border border-slate-700/60 text-[10px] text-slate-400 font-mono tracking-tight flex items-center justify-between">
            <span>DETIALING PLATFORM</span>
            <span className="text-emerald-400 font-semibold">v2.4 DEMO</span>
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Operations Management
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-slate-900 text-emerald-300'
                          : item.highlight
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}

          <div className="pt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Client & Demo Showcase
          </div>

          <Link
            to="/track/GG-1024"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition group"
          >
            <div className="flex items-center gap-3">
              <Car className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
              <span>Customer Tracking View</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
          </Link>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition group"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition" />
              <span>Customer Booking Site</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
          </Link>
        </div>

        {/* Studio Info Card at bottom */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="rounded-xl p-3 bg-slate-800/60 border border-slate-700/50 text-xs">
            <div className="font-semibold text-slate-200">Glossy Gaadi Hub</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Jubilee Hills Workshop, Bay 1-6</p>
            <div className="mt-2 flex items-center justify-between text-[10px] text-emerald-400">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Workshop Live
              </span>
              <span className="text-slate-400">9 Bays Active</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
