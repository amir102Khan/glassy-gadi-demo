import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { ShieldCheck, HardHat, User, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const RoleSwitcher: React.FC = () => {
  const { role, setRole, staffMembers, activeStaffId, setActiveStaffId } = useDemo();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = (newRole: 'admin' | 'staff' | 'customer') => {
    setRole(newRole);
    if (newRole === 'admin' && !location.pathname.startsWith('/admin')) {
      navigate('/admin/dashboard');
    } else if (newRole === 'staff' && !location.pathname.startsWith('/staff')) {
      navigate('/staff');
    } else if (newRole === 'customer' && (location.pathname.startsWith('/admin') || location.pathname.startsWith('/staff'))) {
      navigate('/');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex p-1 bg-slate-900/60 rounded-xl border border-slate-700/60 text-xs shadow-inner">
        <button
          type="button"
          onClick={() => handleRoleChange('admin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
            role === 'admin'
              ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
          title="Switch to Owner / Admin Dashboard"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Owner / Admin</span>
        </button>

        <button
          type="button"
          onClick={() => handleRoleChange('staff')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
            role === 'staff'
              ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
          title="Switch to Staff Workshop Terminal"
        >
          <HardHat className="w-3.5 h-3.5" />
          <span>Staff Floor</span>
        </button>

        <button
          type="button"
          onClick={() => handleRoleChange('customer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
            role === 'customer'
              ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
          title="Switch to Customer Facing Portal"
        >
          <User className="w-3.5 h-3.5" />
          <span>Customer View</span>
        </button>
      </div>

      {/* Staff selection dropdown when in staff mode */}
      {role === 'staff' && (
        <div className="hidden sm:flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700 text-xs text-slate-200">
          <span className="text-slate-400 text-[11px]">Logged in as:</span>
          <select
            value={activeStaffId}
            onChange={(e) => setActiveStaffId(e.target.value)}
            className="bg-transparent text-emerald-400 font-medium focus:outline-none cursor-pointer pr-1"
          >
            {staffMembers.map((s) => (
              <option key={s.id} value={s.id} className="bg-slate-800 text-slate-200">
                {s.name} ({s.role})
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 pointer-events-none -ml-1" />
        </div>
      )}
    </div>
  );
};
