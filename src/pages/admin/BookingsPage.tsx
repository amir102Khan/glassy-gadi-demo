import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { Booking, VehicleType, JobStage, PaymentStatus, PaymentMethod } from '../../types';
import { StageBadge, PaymentBadge, StatusBadge, VehicleTypeBadge } from '../../components/common/Badges';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Calendar,
  Search,
  Filter,
  Plus,
  Eye,
  Trash2,
  Edit,
  ExternalLink,
  Car,
  Clock,
  User,
  Check,
  X,
  CreditCard,
  LayoutGrid,
  List,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const BookingsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const {
    bookings,
    services,
    addOns,
    staffMembers,
    addBooking,
    cancelBooking,
    updatePaymentStatus,
    advanceBookingStage
  } = useDemo();

  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  // Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBookingForDrawer, setSelectedBookingForDrawer] = useState<Booking | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);

  // Form State for Create Booking
  const [formName, setFormName] = useState('Ravi Varma');
  const [formPhone, setFormPhone] = useState('+91 98495 11223');
  const [formEmail, setFormEmail] = useState('ravi.varma@example.in');
  const [formMake, setFormMake] = useState('Mahindra');
  const [formModel, setFormModel] = useState('XUV700 AX7');
  const [formYear, setFormYear] = useState('2024');
  const [formReg, setFormReg] = useState('TS 08 ZZ 1008');
  const [formType, setFormType] = useState<VehicleType>('suv');
  const [formServiceId, setFormServiceId] = useState(services[0]?.id || 'pkg-premium-wash');
  const [formAddOnIds, setFormAddOnIds] = useState<string[]>(['addon-tyre-polish']);
  const [formDate, setFormDate] = useState('2026-10-21');
  const [formTime, setFormTime] = useState('11:00 AM');
  const [formStaffId, setFormStaffId] = useState(staffMembers[0]?.id || 'staff-1');
  const [formNotes, setFormNotes] = useState('Ceramic booster application requested.');
  const [formPaymentStatus, setFormPaymentStatus] = useState<PaymentStatus>('unpaid');
  const [formPaymentMethod, setFormPaymentMethod] = useState<PaymentMethod>('upi');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Trigger modal if query param has ?create=true
  useEffect(() => {
    if (searchParams.get('create') === 'true') {
      setShowCreateModal(true);
    }
  }, [searchParams]);

  // Pricing calculation in form
  const currentService = services.find((s) => s.id === formServiceId) || services[0];
  const packagePrice = currentService?.pricing[formType] || 0;
  const addOnsPrice = formAddOnIds.reduce((sum, id) => {
    const addon = addOns.find((a) => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);
  const subtotal = packagePrice + addOnsPrice;
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + tax;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formName.trim()) errors.name = 'Customer name is required';
    if (!formPhone.trim()) errors.phone = 'Phone number is required';
    if (!formMake.trim()) errors.make = 'Car make is required';
    if (!formModel.trim()) errors.model = 'Car model is required';
    if (!formReg.trim()) errors.reg = 'Registration number is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const assignedStaff = staffMembers.find((s) => s.id === formStaffId) || staffMembers[0];

    addBooking({
      customerId: `cust-${Date.now()}`,
      customerName: formName,
      customerPhone: formPhone,
      customerEmail: formEmail,
      vehicle: {
        id: `veh-${Date.now()}`,
        make: formMake,
        model: formModel,
        year: Number(formYear) || 2024,
        regNumber: formReg.toUpperCase(),
        type: formType
      },
      servicePackageId: currentService.id,
      servicePackageName: currentService.name,
      addOnIds: formAddOnIds,
      appointmentDate: formDate,
      appointmentTime: formTime,
      assignedStaffId: assignedStaff.id,
      assignedStaffName: assignedStaff.name,
      currentStage: 'booked',
      status: 'confirmed',
      estimatedCompletion: '3.5 hrs from check-in',
      customerNotes: formNotes,
      paymentStatus: formPaymentStatus,
      paymentMethod: formPaymentMethod,
      subtotal,
      discount: 0,
      tax,
      totalAmount: grandTotal,
      paidAmount: formPaymentStatus === 'paid' ? grandTotal : 0
    });

    setShowCreateModal(false);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vehicle.regNumber.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (serviceFilter !== 'all' && b.servicePackageId !== serviceFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Booking Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage scheduled appointments, customer vehicle details, and payment statuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'table' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'cards' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Card grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-emerald-700/20 transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Booking</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, customer name, vehicle, or registration..."
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_progress">In Progress</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">All Services</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content: Table or Cards */}
      {filteredBookings.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No Bookings Found"
          description="No bookings matched your filter criteria. Try clearing search filters or create a new booking."
          actionText="Create New Booking"
          onAction={() => setShowCreateModal(true)}
        />
      ) : viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3 px-5">Booking ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Vehicle</th>
                  <th className="py-3 px-4">Service & Slot</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4">Assigned Staff</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-5 font-mono font-bold text-slate-900">
                      <button
                        onClick={() => setSelectedBookingForDrawer(b)}
                        className="text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                      >
                        <span>{b.id}</span>
                      </button>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{b.customerName}</div>
                      <div className="text-[11px] text-slate-500">{b.customerPhone}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800">
                        {b.vehicle.make} {b.vehicle.model}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span>{b.vehicle.regNumber}</span>
                        <VehicleTypeBadge type={b.vehicle.type} />
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900">{b.servicePackageName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{b.appointmentDate} • {b.appointmentTime}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <StageBadge stage={b.currentStage} size="sm" />
                    </td>

                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {b.assignedStaffName}
                    </td>

                    <td className="py-3 px-4">
                      <PaymentBadge status={b.paymentStatus} />
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-900">
                      ₹{b.totalAmount.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedBookingForDrawer(b)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <Link
                          to={`/track/${b.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50"
                          title="Open Customer Live Tracking"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        {b.status !== 'cancelled' && (
                          <button
                            onClick={() => setBookingToCancel(b)}
                            className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                            title="Cancel Booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-600">{b.id}</span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                    {b.vehicle.make} {b.vehicle.model}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span className="font-mono">{b.vehicle.regNumber}</span>
                    <VehicleTypeBadge type={b.vehicle.type} />
                  </div>
                </div>
                <StageBadge stage={b.currentStage} size="sm" />
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer:</span>
                  <strong className="text-slate-800">{b.customerName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-medium text-slate-800">{b.servicePackageName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Slot:</span>
                  <span className="text-slate-700">{b.appointmentDate} at {b.appointmentTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Staff Assigned:</span>
                  <span className="text-slate-700">{b.assignedStaffName}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-100">
                  <span className="text-slate-500">Total & Payment:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">₹{b.totalAmount.toLocaleString('en-IN')}</span>
                    <PaymentBadge status={b.paymentStatus} />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedBookingForDrawer(b)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Details</span>
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/track/${b.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <span>Track</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <Link
                    to={`/invoice/${b.id}`}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    Invoice
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* CREATE BOOKING MODAL */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-black text-slate-900">Create New Booking</h3>
                <p className="text-xs text-slate-500 mt-0.5">Register customer vehicle and service appointment.</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 mt-4 text-xs">
              {/* Customer info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
                  />
                  {formErrors.name && <p className="text-rose-500 mt-0.5">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
                  />
                  {formErrors.phone && <p className="text-rose-500 mt-0.5">{formErrors.phone}</p>}
                </div>
              </div>

              {/* Vehicle info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Make *</label>
                  <input
                    type="text"
                    value={formMake}
                    onChange={(e) => setFormMake(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Model *</label>
                  <input
                    type="text"
                    value={formModel}
                    onChange={(e) => setFormModel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Reg Number *</label>
                  <input
                    type="text"
                    value={formReg}
                    onChange={(e) => setFormReg(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono uppercase focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Vehicle Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as VehicleType)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none"
                  >
                    <option value="hatchback">Hatchback</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service Package *</label>
                  <select
                    value={formServiceId}
                    onChange={(e) => setFormServiceId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (₹{s.pricing[formType]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add-ons Selector */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Optional Add-ons</label>
                <div className="grid grid-cols-2 gap-2">
                  {addOns.slice(0, 4).map((add) => (
                    <label key={add.id} className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={formAddOnIds.includes(add.id)}
                        onChange={(e) => {
                          if (e.target.checked) setFormAddOnIds([...formAddOnIds, add.id]);
                          else setFormAddOnIds(formAddOnIds.filter((id) => id !== add.id));
                        }}
                        className="rounded text-emerald-600 focus:ring-0"
                      />
                      <span className="truncate">{add.name} (+₹{add.price})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Slot & Staff */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Slot Time</label>
                  <input
                    type="text"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assign Staff</label>
                  <select
                    value={formStaffId}
                    onChange={(e) => setFormStaffId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none"
                  >
                    {staffMembers.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Payment status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Payment Status</label>
                  <select
                    value={formPaymentStatus}
                    onChange={(e) => setFormPaymentStatus(e.target.value as PaymentStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none"
                  >
                    <option value="unpaid">Unpaid (Pay after service)</option>
                    <option value="paid">Paid in Full</option>
                    <option value="partially_paid">Partially Paid</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Payment Method</label>
                  <select
                    value={formPaymentMethod}
                    onChange={(e) => setFormPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none"
                  >
                    <option value="upi">UPI (GPay / PhonePe)</option>
                    <option value="card">Credit / Debit Card</option>
                    <option value="cash">Cash at Desk</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              {/* Total preview */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-700">Calculated Grand Total (incl. 18% GST):</span>
                <span className="text-base font-black text-emerald-700">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Save & Register Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOOKING DETAIL DRAWER */}
      {/* ========================================================================= */}
      {selectedBookingForDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg h-full p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-extrabold text-emerald-700">
                      {selectedBookingForDrawer.id}
                    </span>
                    <StageBadge stage={selectedBookingForDrawer.currentStage} size="sm" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {selectedBookingForDrawer.vehicle.make} {selectedBookingForDrawer.vehicle.model}
                  </h3>
                  <div className="text-xs font-mono text-slate-500">
                    Reg: {selectedBookingForDrawer.vehicle.regNumber}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBookingForDrawer(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Customer info */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-900 text-sm">{selectedBookingForDrawer.customerName}</div>
                <div className="text-slate-600">{selectedBookingForDrawer.customerPhone}</div>
                {selectedBookingForDrawer.customerNotes && (
                  <div className="text-slate-500 italic mt-2 pt-2 border-t border-slate-200">
                    "{selectedBookingForDrawer.customerNotes}"
                  </div>
                )}
              </div>

              {/* Service & Stage details */}
              <div className="text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-900">{selectedBookingForDrawer.servicePackageName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Assigned Technician:</span>
                  <span className="font-bold text-slate-900">{selectedBookingForDrawer.assignedStaffName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Slot Scheduled:</span>
                  <span className="text-slate-800">{selectedBookingForDrawer.appointmentDate} at {selectedBookingForDrawer.appointmentTime}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Total Invoice Amount:</span>
                  <span className="font-black text-slate-900 text-sm">₹{selectedBookingForDrawer.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Payment Status:</span>
                  <PaymentBadge status={selectedBookingForDrawer.paymentStatus} />
                </div>
              </div>

              {/* Quick stage advance */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    advanceBookingStage(selectedBookingForDrawer.id);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
                >
                  Advance Stage
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-3">
              <Link
                to={`/track/${selectedBookingForDrawer.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition flex items-center justify-center gap-1.5"
              >
                <span>Live Tracking</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={`/invoice/${selectedBookingForDrawer.id}`}
                className="flex-1 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs text-center transition"
              >
                View Invoice
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CANCEL BOOKING CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {bookingToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center">
            <h3 className="text-base font-bold text-slate-900">Cancel Booking {bookingToCancel.id}?</h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to cancel the booking for {bookingToCancel.customerName} ({bookingToCancel.vehicle.make} {bookingToCancel.vehicle.model})?
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setBookingToCancel(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Keep Booking
              </button>
              <button
                onClick={() => {
                  cancelBooking(bookingToCancel.id);
                  setBookingToCancel(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
