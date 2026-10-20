import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { PaymentStatus, PaymentMethod } from '../../types';
import { PaymentBadge, VehicleTypeBadge } from '../../components/common/Badges';
import {
  Printer,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Car,
  Calendar,
  CreditCard,
  QrCode,
  ArrowLeft,
  Share2,
  Check
} from 'lucide-react';

export const InvoicePage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId?: string }>();
  const { bookings, addOns, updatePaymentStatus } = useDemo();

  const targetId = bookingId || 'GG-1024';
  const booking = bookings.find((b) => b.id.toLowerCase() === targetId.toLowerCase()) || bookings[0];

  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<PaymentStatus>(booking?.paymentStatus || 'unpaid');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(booking?.paymentMethod || 'upi');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!booking) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Invoice Not Found</h2>
        <Link to="/admin/bookings" className="mt-4 inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold">
          Return to Bookings
        </Link>
      </div>
    );
  }

  const handleStatusChange = (status: PaymentStatus) => {
    setSelectedPaymentStatus(status);
    updatePaymentStatus(booking.id, status, selectedMethod);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const balanceDue = booking.totalAmount - booking.paidAmount;

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6">
      {/* Top action bar (hidden in print) */}
      <div className="max-w-3xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 no-print">
        <Link
          to={`/track/${booking.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Car Tracking</span>
        </Link>

        {/* Presenter Simulated Payment Control Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase px-2">
            Simulate Payment:
          </span>
          <button
            onClick={() => handleStatusChange('paid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              booking.paymentStatus === 'paid'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Mark Paid (₹{booking.totalAmount.toLocaleString('en-IN')})
          </button>
          <button
            onClick={() => handleStatusChange('partially_paid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              booking.paymentStatus === 'partially_paid'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Partial (50%)
          </button>
          <button
            onClick={() => handleStatusChange('unpaid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              booking.paymentStatus === 'unpaid'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Unpaid
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1" />

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 transition"
            title="Copy link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Invoice Document Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl invoice-container text-slate-900">
        {/* Header with Brand & Invoice Info */}
        <div className="flex flex-wrap items-start justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xl font-black text-slate-950 tracking-tight">GLOSSY GAADI</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Road No. 36, Near Peddamma Temple Metro Station<br />
              Jubilee Hills, Hyderabad, Telangana 500033
            </p>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              GSTIN: 36AABCU9603R1ZM (Sample Demo Number)
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              TAX INVOICE
            </span>
            <div className="text-lg font-mono font-black text-slate-900 mt-0.5">
              {booking.invoiceNumber}
            </div>
            <div className="mt-2 flex items-center justify-end gap-2 text-xs text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Date: {booking.appointmentDate}</span>
            </div>
            <div className="mt-2">
              <PaymentBadge status={booking.paymentStatus} />
            </div>
          </div>
        </div>

        {/* Billed To & Vehicle Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 border-b border-slate-200 text-xs">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Billed To
            </span>
            <h4 className="text-sm font-extrabold text-slate-900">{booking.customerName}</h4>
            <p className="text-slate-600 mt-0.5">{booking.customerPhone}</p>
            {booking.customerEmail && <p className="text-slate-600">{booking.customerEmail}</p>}
            <p className="text-slate-500 mt-1">Hyderabad, Telangana</p>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Vehicle Information
            </span>
            <div className="text-sm font-extrabold text-slate-900">
              {booking.vehicle.year} {booking.vehicle.make} {booking.vehicle.model}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                {booking.vehicle.regNumber}
              </span>
              <VehicleTypeBadge type={booking.vehicle.type} />
            </div>
            <p className="text-slate-500 mt-1">
              Job Reference: <span className="font-mono font-bold text-slate-700">{booking.id}</span>
            </p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="py-6">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Description</th>
                <th className="pb-3 text-center">Category</th>
                <th className="pb-3 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Primary Service Package */}
              <tr>
                <td className="py-3.5">
                  <div className="font-bold text-slate-900">{booking.servicePackageName}</div>
                  <div className="text-slate-500 text-[11px]">
                    Comprehensive treatment for {booking.vehicle.type.toUpperCase()}
                  </div>
                </td>
                <td className="py-3.5 text-center text-slate-600">Base Package</td>
                <td className="py-3.5 text-right font-bold text-slate-900">
                  ₹{(booking.subtotal - (booking.addOnIds.reduce((sum, id) => {
                    const add = addOns.find((a) => a.id === id);
                    return sum + (add?.price || 0);
                  }, 0))).toLocaleString('en-IN')}
                </td>
              </tr>

              {/* Add-ons */}
              {booking.addOnIds.map((id) => {
                const add = addOns.find((a) => a.id === id);
                if (!add) return null;
                return (
                  <tr key={id}>
                    <td className="py-3">
                      <div className="font-medium text-slate-800">{add.name}</div>
                      <div className="text-slate-500 text-[11px]">{add.description}</div>
                    </td>
                    <td className="py-3 text-center text-slate-600">Enhancement</td>
                    <td className="py-3 text-right font-medium text-slate-900">₹{add.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals Calculation */}
        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <div className="w-full sm:w-72 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span>₹{booking.subtotal.toLocaleString('en-IN')}</span>
            </div>

            {booking.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Promotional Discount:</span>
                <span>- ₹{booking.discount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>GST @ 18% (Illustrative):</span>
              <span>₹{booking.tax.toLocaleString('en-IN')}</span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
              <span>Grand Total:</span>
              <span className="text-emerald-700">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-slate-600 pt-1">
              <span>Amount Paid:</span>
              <span className="font-semibold text-slate-800">₹{booking.paidAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-xs font-bold pt-1 border-t border-slate-100">
              <span className={balanceDue > 0 ? 'text-rose-600' : 'text-slate-600'}>Balance Due:</span>
              <span className={balanceDue > 0 ? 'text-rose-600 font-extrabold' : 'text-slate-900'}>
                ₹{balanceDue.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Methods & Verification Note */}
        <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-500">
          <div>
            <h5 className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
              Accepted In-Studio Payments
            </h5>
            <p className="leading-relaxed">
              We accept UPI (Google Pay, PhonePe, Paytm), All Major Credit/Debit Cards, and Cash at the Jubilee Hills studio desk.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
              Demo Platform Note
            </h5>
            <p className="leading-relaxed">
              This invoice is illustrative dummy data generated for the Glossy Gaadi software sales demo. No real monetary transactions or tax liability exists.
            </p>
          </div>
        </div>

        {/* Thank You Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
          <p className="font-semibold text-slate-700">Thank you for choosing Glossy Gaadi!</p>
          <p className="text-[11px] mt-0.5">Your car. Our care. Every step, visible.</p>
        </div>
      </div>
    </div>
  );
};
