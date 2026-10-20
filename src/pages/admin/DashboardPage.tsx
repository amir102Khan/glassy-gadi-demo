import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { StatCard } from '../../components/common/StatCard';
import { StageBadge, PaymentBadge, VehicleTypeBadge } from '../../components/common/Badges';
import { DEMO_ANALYTICS } from '../../data/mockData';
import {
  Calendar,
  Car,
  Sparkles,
  IndianRupee,
  AlertCircle,
  Plus,
  ArrowRight,
  Eye,
  KanbanSquare,
  Users,
  Wrench,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const {
    bookings,
    todayBookingsCount,
    carsInWorkshopCount,
    readyForPickupCount,
    todayRevenue,
    pendingPaymentsAmount,
    advanceBookingStage
  } = useDemo();

  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const navigate = useNavigate();

  // Filter bookings for live workshop table
  const filteredBookings = bookings.filter((b) => {
    if (b.status === 'cancelled') return false;
    const matchesQuery =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vehicle.regNumber.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesQuery) return false;
    if (stageFilter === 'all') return true;
    if (stageFilter === 'workshop') {
      return ['received', 'inspection', 'washing', 'interior', 'polishing', 'quality_check'].includes(b.currentStage);
    }
    if (stageFilter === 'ready') return b.currentStage === 'ready_pickup';
    return b.currentStage === stageFilter;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Welcome Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Detailing Floor • Jubilee Hills Studio
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Glossy Gaadi Business Terminal
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Real-time bird's-eye view of workshop capacity, customer vehicle pipelines, and today's revenue.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/jobs"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/30 transition flex items-center gap-2"
            >
              <KanbanSquare className="w-4 h-4" />
              <span>Open Workshop Board</span>
            </Link>

            <Link
              to="/track/GG-1024"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Preview Customer View</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Today's Bookings"
          value={todayBookingsCount}
          subtitle="Scheduled for today"
          icon={Calendar}
          accentColor="blue"
          trend={{ value: '+14% vs last week', isPositive: true }}
          onClick={() => navigate('/admin/bookings')}
        />

        <StatCard
          title="In Workshop Bays"
          value={carsInWorkshopCount}
          subtitle="Active on floor (Bays 1-6)"
          icon={Car}
          accentColor="emerald"
          onClick={() => navigate('/admin/jobs')}
        />

        <StatCard
          title="Ready for Pickup"
          value={readyForPickupCount}
          subtitle="Awaiting customer arrival"
          icon={Sparkles}
          accentColor="amber"
          onClick={() => setStageFilter('ready')}
        />

        <StatCard
          title="Today's Revenue"
          value={`₹${todayRevenue.toLocaleString('en-IN')}`}
          subtitle="Paid & cleared invoices"
          icon={IndianRupee}
          accentColor="emerald"
          trend={{ value: '+18% target', isPositive: true }}
          onClick={() => navigate('/admin/reports')}
        />

        <StatCard
          title="Pending Payments"
          value={`₹${pendingPaymentsAmount.toLocaleString('en-IN')}`}
          subtitle="Unpaid customer balance"
          icon={AlertCircle}
          accentColor="rose"
          onClick={() => navigate('/admin/bookings')}
        />
      </div>

      {/* Live Workshop Activity Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Current Workshop Floor Activity
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live vehicle progress synced with technician and customer devices.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ID, customer, reg..."
                className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-emerald-500 w-48 sm:w-60"
              />
            </div>

            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="py-1.5 px-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Stages ({bookings.length})</option>
              <option value="workshop">In Workshop Only ({carsInWorkshopCount})</option>
              <option value="ready">Ready for Pickup ({readyForPickupCount})</option>
              <option value="polishing">Polishing / Detailing</option>
              <option value="washing">Washing Bay</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-6 sm:-mx-8">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3 px-6">Booking ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Vehicle Details</th>
                <th className="py-3 px-4">Service Package</th>
                <th className="py-3 px-4">Assigned Specialist</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4">Est. Finish</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.slice(0, 8).map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/80 transition group">
                  <td className="py-3.5 px-6 font-mono font-bold text-slate-900">
                    <Link
                      to={`/track/${booking.id}`}
                      className="text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                    >
                      <span>{booking.id}</span>
                      <Eye className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                    </Link>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{booking.customerName}</div>
                    <div className="text-[11px] text-slate-500">{booking.customerPhone}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">
                      {booking.vehicle.make} {booking.vehicle.model}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <span>{booking.vehicle.regNumber}</span>
                      <VehicleTypeBadge type={booking.vehicle.type} />
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {booking.servicePackageName}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                        {booking.assignedStaffName.charAt(0)}
                      </div>
                      <span className="text-slate-700 font-medium">{booking.assignedStaffName}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <StageBadge stage={booking.currentStage} size="sm" />
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {booking.estimatedCompletion}
                  </td>

                  <td className="py-3.5 px-4">
                    <PaymentBadge status={booking.paymentStatus} />
                  </td>

                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => advanceBookingStage(booking.id)}
                        disabled={booking.currentStage === 'completed'}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-[11px] transition disabled:opacity-40"
                        title="Advance to next stage"
                      >
                        Advance
                      </button>

                      <Link
                        to={`/invoice/${booking.id}`}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition"
                        title="View invoice"
                      >
                        Invoice
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
          <span>Showing {Math.min(8, filteredBookings.length)} of {bookings.length} jobs</span>
          <Link to="/admin/bookings" className="text-emerald-700 font-bold hover:underline flex items-center gap-1">
            <span>View All Bookings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Dashboard Recharts: Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Revenue & Volume Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Weekly Revenue & Booking Volume
              </h3>
              <p className="text-xs text-slate-500">Daily gross turnover at Jubilee Hills studio (₹)</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
              This Week: ₹1,78,150
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DEMO_ANALYTICS.weeklyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Popular Services Donut */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Most Popular Packages
            </h3>
            <p className="text-xs text-slate-500">Service share by booking count</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DEMO_ANALYTICS.serviceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {DEMO_ANALYTICS.serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any) => [`${value} bookings`, name]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {DEMO_ANALYTICS.serviceDistribution.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-slate-700">{s.name}</span>
                </div>
                <span className="font-bold text-slate-900">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
