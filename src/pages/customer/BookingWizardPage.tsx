import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { VehicleType, ServicePackage, AddOnService } from '../../types';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  Car,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  ArrowRight
} from 'lucide-react';

const TIME_SLOTS = [
  '08:30 AM',
  '09:30 AM',
  '11:00 AM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM',
  '06:00 PM'
];

export const BookingWizardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { services, addOns, staffMembers, addBooking } = useDemo();

  // Wizard Step (1 to 7)
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const initialServiceId = searchParams.get('service') || services[1]?.id || 'pkg-premium-wash';
  const initialType = (searchParams.get('type') as VehicleType) || 'suv';

  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);
  const [vehicleType, setVehicleType] = useState<VehicleType>(initialType);
  const [vehicleMake, setVehicleMake] = useState('Hyundai');
  const [vehicleModel, setVehicleModel] = useState('Creta SX');
  const [vehicleYear, setVehicleYear] = useState('2023');
  const [vehicleRegNumber, setVehicleRegNumber] = useState('TS 09 EA 4521');
  const [vehicleColor, setVehicleColor] = useState('Phantom Black');

  const [appointmentDate, setAppointmentDate] = useState('2026-10-21');
  const [appointmentTime, setAppointmentTime] = useState('09:30 AM');

  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(['addon-tyre-polish']);

  const [customerName, setCustomerName] = useState('Kishore Kumar');
  const [customerPhone, setCustomerPhone] = useState('+91 98491 55667');
  const [customerEmail, setCustomerEmail] = useState('kishore.kumar@example.in');
  const [customerLocality, setCustomerLocality] = useState('Jubilee Hills, Road No. 45');
  const [customerNotes, setCustomerNotes] = useState('Special request: Clean coffee spill on passenger door armrest.');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);

  // Selected Service object
  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];

  // Pricing calculations
  const packagePrice = selectedService?.pricing[vehicleType] || 0;
  const addOnsTotal = selectedAddOnIds.reduce((sum, id) => {
    const addon = addOns.find((a) => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);
  const subtotal = packagePrice + addOnsTotal;
  const discount = 0;
  const tax = Math.round(subtotal * 0.18); // 18% GST illustrative
  const grandTotal = subtotal - discount + tax;

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!selectedServiceId) newErrors.service = 'Please choose a service package.';
    }

    if (step === 2) {
      if (!vehicleMake.trim()) newErrors.make = 'Car make is required.';
      if (!vehicleModel.trim()) newErrors.model = 'Car model is required.';
      if (!vehicleRegNumber.trim()) newErrors.regNumber = 'Vehicle registration number is required (e.g. TS 09 EA 4521).';
    }

    if (step === 3) {
      if (!appointmentDate) newErrors.date = 'Please pick a booking date.';
      if (!appointmentTime) newErrors.time = 'Please pick an available time slot.';
    }

    if (step === 5) {
      if (!customerName.trim()) newErrors.name = 'Full name is required.';
      if (!customerPhone.trim() || customerPhone.length < 10) newErrors.phone = 'Valid phone number is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitBooking = () => {
    if (!validateStep(5)) return;

    // Pick a staff member with least workload
    const assignedStaff = staffMembers[0];

    const newBooking = addBooking({
      customerId: `cust-${Date.now()}`,
      customerName,
      customerPhone,
      customerEmail,
      vehicle: {
        id: `veh-${Date.now()}`,
        make: vehicleMake,
        model: vehicleModel,
        year: Number(vehicleYear) || 2023,
        regNumber: vehicleRegNumber.toUpperCase(),
        type: vehicleType,
        color: vehicleColor
      },
      servicePackageId: selectedService.id,
      servicePackageName: selectedService.name,
      addOnIds: selectedAddOnIds,
      appointmentDate,
      appointmentTime,
      assignedStaffId: assignedStaff.id,
      assignedStaffName: assignedStaff.name,
      currentStage: 'booked',
      status: 'confirmed',
      estimatedCompletion: '3.5 hrs from check-in',
      customerNotes,
      paymentStatus: 'unpaid',
      paymentMethod: 'pending',
      subtotal,
      discount,
      tax,
      totalAmount: grandTotal,
      paidAmount: 0
    });

    setCreatedBookingId(newBooking.id);
    setCurrentStep(7); // Jump to Confirmation
  };

  const stepsList = [
    'Service',
    'Vehicle',
    'Date & Time',
    'Add-ons',
    'Customer Info',
    'Review',
    'Confirmation'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Step Indicator Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>STEP {currentStep} OF 7</span>
          <span className="text-emerald-600 font-bold">{stepsList[currentStep - 1]}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>

        {/* Step dots for desktop */}
        <div className="hidden sm:flex items-center justify-between mt-3 text-[11px] font-medium text-slate-500">
          {stepsList.map((step, idx) => (
            <span
              key={step}
              className={`${
                idx + 1 === currentStep
                  ? 'text-emerald-600 font-bold'
                  : idx + 1 < currentStep
                  ? 'text-slate-800'
                  : 'text-slate-400'
              }`}
            >
              {idx + 1}. {step}
            </span>
          ))}
        </div>
      </div>

      {/* Step 1: Choose Service */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Choose a Service Package</h2>
            <p className="text-sm text-slate-500 mt-1">
              Select the car detailing or wash package that matches your car's needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((pkg) => {
              const isSelected = selectedServiceId === pkg.id;
              const price = pkg.pricing[vehicleType] || 0;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedServiceId(pkg.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20 shadow-md'
                      : 'border-slate-200/90 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">{pkg.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{pkg.tagline}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-400">Duration: {pkg.duration}</span>
                    <span className="text-base font-black text-slate-900">₹{price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {errors.service && <p className="text-xs text-rose-500 font-semibold">{errors.service}</p>}
        </div>
      )}

      {/* Step 2: Vehicle Details */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Vehicle Information</h2>
            <p className="text-sm text-slate-500 mt-1">
              Specify your vehicle segment and details for accurate bay assignment.
            </p>
          </div>

          {/* Vehicle Category Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
              Vehicle Segment
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['hatchback', 'sedan', 'suv', 'luxury'] as VehicleType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setVehicleType(type)}
                  className={`p-4 rounded-xl border text-center transition ${
                    vehicleType === type
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Car className="w-6 h-6 mx-auto mb-1 text-emerald-600" />
                  <span className="capitalize text-xs font-bold block">{type}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    ₹{selectedService.pricing[type]?.toLocaleString('en-IN')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Make / Brand *</label>
              <input
                type="text"
                value={vehicleMake}
                onChange={(e) => setVehicleMake(e.target.value)}
                placeholder="e.g. Hyundai, Tata, Mahindra, BMW"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
              {errors.make && <p className="text-xs text-rose-500 mt-1">{errors.make}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Model *</label>
              <input
                type="text"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                placeholder="e.g. Creta SX(O), Thar 4x4, City ZX"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
              {errors.model && <p className="text-xs text-rose-500 mt-1">{errors.model}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Registration Number *</label>
              <input
                type="text"
                value={vehicleRegNumber}
                onChange={(e) => setVehicleRegNumber(e.target.value.toUpperCase())}
                placeholder="e.g. TS 09 EA 4521"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono uppercase text-slate-900 focus:outline-none focus:border-emerald-500"
              />
              {errors.regNumber && <p className="text-xs text-rose-500 mt-1">{errors.regNumber}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Exterior Color</label>
              <input
                type="text"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                placeholder="e.g. Phantom Black, Portimao Blue"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Date & Slot */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Select Date & Arrival Slot</h2>
            <p className="text-sm text-slate-500 mt-1">
              Choose your drop-off time at our Jubilee Hills Studio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Service Date *
              </label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                min="2026-10-20"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
              {errors.date && <p className="text-xs text-rose-500 mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                Available Time Slots *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setAppointmentTime(slot)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                      appointmentTime === slot
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.time && <p className="text-xs text-rose-500 mt-1">{errors.time}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Add-ons */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Optional Add-on Enhancements</h2>
            <p className="text-sm text-slate-500 mt-1">
              Boost your car's gloss, interior freshness, and protection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addOns.map((addon) => {
              const isChecked = selectedAddOnIds.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    isChecked
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{addon.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{addon.description}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ml-3 ${
                        isChecked ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Est. +{addon.duration}</span>
                    <span className="font-extrabold text-emerald-700">+₹{addon.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 5: Customer Details */}
      {currentStep === 5 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Customer Information</h2>
            <p className="text-sm text-slate-500 mt-1">
              We'll send live tracking checkpoints and invoice updates to this phone number.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
              {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (WhatsApp) *</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
              {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="e.g. customer@example.in"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Hyderabad Locality / Area</label>
              <input
                type="text"
                value={customerLocality}
                onChange={(e) => setCustomerLocality(e.target.value)}
                placeholder="e.g. Jubilee Hills, Banjara Hills, Gachibowli"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">Special Instructions / Focus Areas</label>
              <textarea
                rows={3}
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="Any special stains, dog hair, swirl marks on bonnet, or aftermarket accessory precautions..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 6: Review Booking */}
      {currentStep === 6 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Review & Confirm Booking</h2>
            <p className="text-sm text-slate-500 mt-1">
              Please verify your vehicle details and service estimate before confirming.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Vehicle & Slot</h4>
                <div className="font-extrabold text-base text-slate-900">
                  {vehicleMake} {vehicleModel} ({vehicleYear})
                </div>
                <div className="text-xs text-slate-600 mt-1 font-mono">
                  Reg: {vehicleRegNumber} • Category: {vehicleType.toUpperCase()}
                </div>
                <div className="mt-3 text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{appointmentDate} at {appointmentTime}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Customer Details</h4>
                <div className="font-bold text-sm text-slate-900">{customerName}</div>
                <div className="text-xs text-slate-600 mt-0.5">{customerPhone}</div>
                <div className="text-xs text-slate-600">{customerLocality}</div>
                {customerNotes && (
                  <div className="mt-2 p-2 rounded bg-slate-50 border border-slate-100 text-[11px] text-slate-600 italic">
                    "{customerNotes}"
                  </div>
                )}
              </div>
            </div>

            {/* Price Breakdown */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Service Breakdown</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-800">
                  <span>{selectedService.name} ({vehicleType.toUpperCase()})</span>
                  <span className="font-bold">₹{packagePrice.toLocaleString('en-IN')}</span>
                </div>

                {selectedAddOnIds.map((id) => {
                  const addon = addOns.find((a) => a.id === id);
                  if (!addon) return null;
                  return (
                    <div key={id} className="flex justify-between text-slate-600">
                      <span>+ {addon.name}</span>
                      <span className="font-medium">₹{addon.price}</span>
                    </div>
                  );
                })}

                <div className="pt-3 border-t border-slate-100 flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (18% illustrative)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
                  <span>Estimated Total</span>
                  <span className="text-emerald-600 text-lg">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Pay after service:</strong> No advance payment required for demo bookings. Settle in person via UPI, Card, or Cash upon delivery.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Step 7: Confirmation */}
      {currentStep === 7 && (
        <div className="text-center space-y-6 py-6 animate-fade-in">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Booking Confirmed</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              We Look Forward to Detailing Your Car!
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
              Your appointment has been registered on Glossy Gaadi's digital platform. You can now track your car's progress live.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 max-w-md mx-auto shadow-sm text-left space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs text-slate-500">Booking ID:</span>
              <span className="font-mono text-base font-extrabold text-emerald-600">{createdBookingId}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Vehicle:</span>
              <span className="font-bold text-slate-800">{vehicleMake} {vehicleModel}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Reg Number:</span>
              <span className="font-mono font-semibold text-slate-800">{vehicleRegNumber}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Service:</span>
              <span className="font-semibold text-slate-800">{selectedService.name}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Scheduled Date:</span>
              <span className="font-semibold text-slate-800">{appointmentDate} at {appointmentTime}</span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-slate-500">Estimated Total:</span>
              <span className="font-black text-slate-900 text-sm">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Primary Action Button: Track My Car */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={`/track/${createdBookingId}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Track My Car Now</span>
              <ArrowRight className="w-4 h-4 font-bold" />
            </Link>

            <Link
              to="/admin/jobs"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm transition"
            >
              Open Workshop Board
            </Link>
          </div>
        </div>
      )}

      {/* Navigation Buttons (Steps 1 to 6) */}
      {currentStep < 7 && (
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep === 6 ? (
            <button
              type="button"
              onClick={handleSubmitBooking}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5"
            >
              <span>Confirm & Book Appointment</span>
              <Check className="w-4 h-4 stroke-[3]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
