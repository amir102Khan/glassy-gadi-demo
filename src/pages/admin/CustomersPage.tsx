import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Customer, Vehicle } from '../../types';
import { VehicleTypeBadge } from '../../components/common/Badges';
import {
  Users,
  Search,
  Plus,
  Car,
  Calendar,
  IndianRupee,
  Phone,
  Mail,
  MapPin,
  Clock,
  Eye,
  FileText,
  X,
  Check,
  Edit
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CustomersPage: React.FC = () => {
  const { customers, bookings, addCustomer, updateCustomer } = useDemo();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Customer Form
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('+91 98');
  const [newEmail, setNewEmail] = useState('');
  const [newLocality, setNewLocality] = useState('Banjara Hills, Hyderabad');
  const [newMake, setNewMake] = useState('Tata');
  const [newModel, setNewModel] = useState('Harrier Fearless');
  const [newReg, setNewReg] = useState('TS 09 XY 7890');
  const [newType, setNewType] = useState<'hatchback' | 'sedan' | 'suv' | 'luxury'>('suv');
  const [newPreferred, setNewPreferred] = useState('Full Detailing');
  const [newNotes, setNewNotes] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.vehicles.some((v) => v.make.toLowerCase().includes(searchQuery.toLowerCase()) || v.model.toLowerCase().includes(searchQuery.toLowerCase()) || v.regNumber.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    const newCust = addCustomer({
      name: newName,
      phone: newPhone,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@example.in`,
      locality: newLocality,
      vehicles: [
        {
          id: `veh-${Date.now()}`,
          make: newMake,
          model: newModel,
          regNumber: newReg.toUpperCase(),
          type: newType,
          year: 2024
        }
      ],
      preferredService: newPreferred,
      notes: newNotes
    });

    setShowAddModal(false);
    setSelectedCustomer(newCust);
  };

  // Find past bookings for selected customer
  const customerBookings = selectedCustomer
    ? bookings.filter((b) => b.customerId === selectedCustomer.id || b.customerName.toLowerCase() === selectedCustomer.name.toLowerCase())
    : [];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Customer & Vehicle CRM</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Profiles, registered vehicles, service retention history, and lifetime customer value.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer Profile</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, Hyderabad locality, or vehicle..."
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredCustomers.length} registered customers
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((cust) => (
          <div
            key={cust.id}
            onClick={() => setSelectedCustomer(cust)}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition cursor-pointer space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{cust.name}</h3>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{cust.phone}</span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{cust.locality}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Spend</span>
                <span className="text-sm font-black text-slate-900">₹{cust.totalSpend.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Registered vehicles */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Registered Vehicles ({cust.vehicles.length})
              </span>
              <div className="space-y-1">
                {cust.vehicles.map((v) => (
                  <div key={v.id} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <Car className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{v.make} {v.model}</span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500">{v.regNumber}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Visits: <strong className="text-slate-800">{cust.totalVisits}</strong></span>
              <span>Last: <strong className="text-slate-800">{cust.lastVisit}</strong></span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCustomer(cust);
                }}
                className="text-emerald-700 font-bold hover:underline"
              >
                View Profile →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* CUSTOMER DETAIL DRAWER */}
      {/* ========================================================================= */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-xl h-full p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="font-mono text-xs font-bold text-slate-400">{selectedCustomer.id}</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-0.5">{selectedCustomer.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span>{selectedCustomer.phone}</span>
                    <span>•</span>
                    <span>{selectedCustomer.locality}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Visits</span>
                  <span className="text-xl font-black text-slate-900">{selectedCustomer.totalVisits}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Lifetime Spend</span>
                  <span className="text-xl font-black text-emerald-700">₹{selectedCustomer.totalSpend.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Preferred Package</span>
                  <span className="text-xs font-bold text-slate-800 truncate block mt-1">{selectedCustomer.preferredService}</span>
                </div>
              </div>

              {/* Vehicles */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Garage Vehicles
                </h4>
                <div className="space-y-2">
                  {selectedCustomer.vehicles.map((v) => (
                    <div key={v.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <Car className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900">{v.year} {v.make} {v.model}</div>
                          <div className="font-mono text-[11px] text-slate-500">{v.regNumber} • {v.color || 'Standard'}</div>
                        </div>
                      </div>
                      <VehicleTypeBadge type={v.type} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Notes */}
              {selectedCustomer.notes && (
                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900">
                  <strong className="block font-bold mb-0.5">Staff Preferences / Notes:</strong>
                  {selectedCustomer.notes}
                </div>
              )}

              {/* Booking History */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Service Visits History ({customerBookings.length})
                </h4>
                <div className="space-y-2 text-xs">
                  {customerBookings.map((b) => (
                    <div key={b.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-emerald-700">{b.id}</span>
                          <span className="font-semibold text-slate-800">{b.servicePackageName}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {b.appointmentDate} • Total: ₹{b.totalAmount.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <Link
                        to={`/invoice/${b.id}`}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900 px-2 py-1 rounded bg-slate-100"
                      >
                        Invoice
                      </Link>
                    </div>
                  ))}
                  {customerBookings.length === 0 && (
                    <p className="text-xs text-slate-400 italic">No past booking records in current demo state.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ADD CUSTOMER MODAL */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Add New Customer Profile</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Ramesh Reddy"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Hyderabad Locality</label>
                <input
                  type="text"
                  value={newLocality}
                  onChange={(e) => setNewLocality(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Car Make & Model</label>
                  <input
                    type="text"
                    value={`${newMake} ${newModel}`}
                    onChange={(e) => {
                      const parts = e.target.value.split(' ');
                      setNewMake(parts[0] || '');
                      setNewModel(parts.slice(1).join(' ') || '');
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Registration #</label>
                  <input
                    type="text"
                    value={newReg}
                    onChange={(e) => setNewReg(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono uppercase focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
