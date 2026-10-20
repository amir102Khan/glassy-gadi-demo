import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { DEMO_ANALYTICS } from '../../data/mockData';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  IndianRupee,
  Car,
  Filter
} from 'lucide-react';

const MONTHLY_REVENUE_DATA = [
  { month: 'May', revenue: 290000, bookings: 120, avgTicket: 2416 },
  { month: 'Jun', revenue: 345000, bookings: 142, avgTicket: 2429 },
  { month: 'Jul', revenue: 380000, bookings: 155, avgTicket: 2451 },
  { month: 'Aug', revenue: 420000, bookings: 168, avgTicket: 2500 },
  { month: 'Sep', revenue: 475000, bookings: 185, avgTicket: 2567 },
  { month: 'Oct', revenue: 520000, bookings: 198, avgTicket: 2626 }
];

const TURNAROUND_DATA = [
  { service: 'Express Wash', targetHours: 0.75, actualHours: 0.72 },
  { service: 'Premium Wash', targetHours: 1.5, actualHours: 1.45 },
  { service: 'Interior Deep', targetHours: 2.5, actualHours: 2.4 },
  { service: 'Full Detailing', targetHours: 4.5, actualHours: 4.2 },
  { service: 'Ceramic Coating', targetHours: 18, actualHours: 17.5 }
];

export const ReportsPage: React.FC = () => {
  const { bookings, customers } = useDemo();
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '6m'>('30d');

  const totalBookings = bookings.length;
  const completedJobs = bookings.filter((b) => b.status === 'completed').length;
  const cancelledJobs = bookings.filter((b) => b.status === 'cancelled').length;
  const repeatCustomerCount = customers.filter((c) => c.totalVisits > 1).length;
  const repeatRate = Math.round((repeatCustomerCount / customers.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Business Reports & Analytics</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold uppercase">
              Illustrative Demo Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Key operational metrics, service turnaround efficiencies, and revenue growth.
          </p>
        </div>

        {/* Date Filter */}
        <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 text-xs shadow-xs">
          <button
            onClick={() => setDateRange('7d')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              dateRange === '7d' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setDateRange('30d')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              dateRange === '30d' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setDateRange('6m')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              dateRange === '6m' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            6-Month Trend
          </button>
        </div>
      </div>

      {/* KPI High Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Avg. Booking Value</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">₹2,626</div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            +8.6% from premium add-ons
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Customer Retention</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">{repeatRate}%</div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {repeatCustomerCount} of {customers.length} repeat visitors
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Completion Rate</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">97.8%</div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Only 1 cancellation recorded
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Turnaround Time Target</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">96.4%</div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            Completed on or ahead of time
          </span>
        </div>
      </div>

      {/* Row 1: Revenue & Volume Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Monthly Revenue Growth (₹)</h3>
              <p className="text-xs text-slate-500">Gross revenue trend over the past two quarters</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 font-mono">
              +79% H2 GROWTH
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_REVENUE_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Gross Revenue']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vehicle Segment Share */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Vehicle Type Distribution</h3>
            <p className="text-xs text-slate-500">Categories serviced at Hyderabad studio</p>
          </div>

          <div className="space-y-3 my-auto">
            {DEMO_ANALYTICS.vehicleTypeDistribution.map((item) => (
              <div key={item.type} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">{item.type}</span>
                  <strong className="text-slate-900">{item.percentage}% ({item.count})</strong>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
            * SUVs (Creta, Thar, Fortuner) represent nearly 50% of detailing tickets in Hyderabad.
          </div>
        </div>
      </div>

      {/* Row 2: Turnaround Time & Staff Workload */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Job Turnaround Efficiencies</h3>
            <p className="text-xs text-slate-500">Actual vs Target duration (Hours)</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TURNAROUND_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="service" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} unit="h" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="targetHours" name="Target (hrs)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actualHours" name="Actual (hrs)" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Staff Workload & Efficiency Rate</h3>
            <p className="text-xs text-slate-500">Daily productivity benchmarked against bay time</p>
          </div>

          <div className="space-y-3 pt-2">
            {DEMO_ANALYTICS.staffWorkload.map((staff) => (
              <div key={staff.name} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-slate-900 block font-bold">{staff.name}</strong>
                  <span className="text-slate-500 text-[11px]">
                    {staff.activeJobs} active bay jobs • {staff.completedToday} completed today
                  </span>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                    {staff.efficiency} Efficiency
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 italic pt-1">
            * All figures are illustrative presentation values created for product demonstration.
          </div>
        </div>
      </div>
    </div>
  );
};
