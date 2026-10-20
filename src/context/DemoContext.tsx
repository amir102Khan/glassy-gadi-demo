import React, { createContext, useContext, useState } from 'react';
import {
  Booking,
  Customer,
  ServicePackage,
  AddOnService,
  StaffMember,
  JobStage,
  DemoRole,
  ToastMessage,
  PaymentStatus,
  PaymentMethod
} from '../types';
import {
  INITIAL_BOOKINGS,
  CUSTOMERS,
  SERVICE_PACKAGES,
  ADD_ON_SERVICES,
  STAFF_MEMBERS,
  JOB_STAGES
} from '../data/mockData';

interface DemoContextType {
  role: DemoRole;
  setRole: (role: DemoRole) => void;
  activeStaffId: string;
  setActiveStaffId: (id: string) => void;
  bookings: Booking[];
  customers: Customer[];
  services: ServicePackage[];
  addOns: AddOnService[];
  staffMembers: StaffMember[];
  toasts: ToastMessage[];

  // Metrics
  todayBookingsCount: number;
  carsInWorkshopCount: number;
  readyForPickupCount: number;
  todayRevenue: number;
  pendingPaymentsAmount: number;

  // Actions
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'checklist' | 'stageHistory' | 'beforePhotos' | 'afterPhotos' | 'invoiceNumber'>) => Booking;
  updateBookingStage: (bookingId: string, newStage: JobStage, note?: string, updatedBy?: string) => void;
  advanceBookingStage: (bookingId: string) => void;
  toggleChecklistItem: (bookingId: string, checklistItemId: string) => void;
  updateBookingNotes: (bookingId: string, staffNotes: string) => void;
  toggleBookingDelay: (bookingId: string, isDelayed: boolean, reason?: string) => void;
  addBookingPhoto: (bookingId: string, type: 'before' | 'after', photoUrl: string) => void;
  updatePaymentStatus: (bookingId: string, status: PaymentStatus, method?: PaymentMethod, amountPaid?: number) => void;
  updateStaffAssignment: (bookingId: string, staffId: string) => void;
  cancelBooking: (bookingId: string) => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'totalVisits' | 'totalSpend' | 'lastVisit' | 'joinedDate'>) => Customer;
  updateCustomer: (customerId: string, data: Partial<Customer>) => void;
  updateServicePackage: (service: ServicePackage) => void;
  toggleServiceStatus: (serviceId: string) => void;
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  resetDemoData: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<DemoRole>('admin');
  const [activeStaffId, setActiveStaffId] = useState<string>('staff-1');
  const [bookings, setBookings] = useState<Booking[]>(() => JSON.parse(JSON.stringify(INITIAL_BOOKINGS)));
  const [customers, setCustomers] = useState<Customer[]>(() => JSON.parse(JSON.stringify(CUSTOMERS)));
  const [services, setServices] = useState<ServicePackage[]>(() => JSON.parse(JSON.stringify(SERVICE_PACKAGES)));
  const [addOns] = useState<AddOnService[]>(() => JSON.parse(JSON.stringify(ADD_ON_SERVICES)));
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(() => JSON.parse(JSON.stringify(STAFF_MEMBERS)));
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast handler
  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Reset Demo to Seed
  const resetDemoData = () => {
    setBookings(JSON.parse(JSON.stringify(INITIAL_BOOKINGS)));
    setCustomers(JSON.parse(JSON.stringify(CUSTOMERS)));
    setServices(JSON.parse(JSON.stringify(SERVICE_PACKAGES)));
    setStaffMembers(JSON.parse(JSON.stringify(STAFF_MEMBERS)));
    setActiveStaffId('staff-1');
    addToast('Demo Data Reset', 'All bookings, job stages, and customer states restored to original demo seeds.', 'success');
  };

  // Derived Metrics
  const todayBookingsCount = bookings.filter((b) => b.appointmentDate === '2026-10-20').length;
  const carsInWorkshopCount = bookings.filter((b) =>
    ['received', 'inspection', 'washing', 'interior', 'polishing', 'quality_check'].includes(b.currentStage)
  ).length;
  const readyForPickupCount = bookings.filter((b) => b.currentStage === 'ready_pickup').length;
  const todayRevenue = bookings
    .filter((b) => b.appointmentDate === '2026-10-20')
    .reduce((sum, b) => sum + (b.paymentStatus === 'paid' ? b.totalAmount : b.paidAmount || 0), 0);
  const pendingPaymentsAmount = bookings
    .filter((b) => b.paymentStatus !== 'paid' && b.status !== 'cancelled')
    .reduce((sum, b) => sum + (b.totalAmount - b.paidAmount), 0);

  // Add Booking
  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'checklist' | 'stageHistory' | 'beforePhotos' | 'afterPhotos' | 'invoiceNumber'>): Booking => {
    const nextNum = 1030 + bookings.length;
    const newId = `GG-${nextNum}`;
    const invoiceNum = `INV-2026-08${50 + bookings.length}`;
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    // Generate smart checklist based on service
    const defaultChecklist = [
      { id: `chk-${Date.now()}-1`, label: 'Vehicle check-in & mileage logging', completed: false, stage: 'received' as JobStage },
      { id: `chk-${Date.now()}-2`, label: 'Exterior condition & paint thickness check', completed: false, stage: 'inspection' as JobStage },
      { id: `chk-${Date.now()}-3`, label: 'Underbody & high-pressure foam wash', completed: false, stage: 'washing' as JobStage },
      { id: `chk-${Date.now()}-4`, label: 'Cabin vacuum & deep upholstery extraction', completed: false, stage: 'interior' as JobStage },
      { id: `chk-${Date.now()}-5`, label: 'Paint correction & machine gloss buffing', completed: false, stage: 'polishing' as JobStage },
      { id: `chk-${Date.now()}-6`, label: '24-point supervisor quality check', completed: false, stage: 'quality_check' as JobStage },
      { id: `chk-${Date.now()}-7`, label: 'Customer handover & digital signoff', completed: false, stage: 'completed' as JobStage }
    ];

    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      invoiceNumber: invoiceNum,
      currentStage: 'booked',
      status: 'confirmed',
      checklist: defaultChecklist,
      stageHistory: [
        {
          stage: 'booked',
          label: 'Booking Confirmed',
          timestamp: `Today, ${nowTime}`,
          note: 'Booking registered in Glossy Gaadi digital portal',
          updatedBy: 'Glossy Gaadi Portal'
        }
      ],
      beforePhotos: [],
      afterPhotos: [],
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Update customer stats if existing customer
    if (bookingData.customerId) {
      setCustomers((prev) =>
        prev.map((c) => {
          if (c.id === bookingData.customerId) {
            return {
              ...c,
              totalVisits: c.totalVisits + 1,
              totalSpend: c.totalSpend + bookingData.totalAmount,
              lastVisit: bookingData.appointmentDate
            };
          }
          return c;
        })
      );
    }

    addToast('Booking Created', `Booking ${newId} for ${bookingData.customerName} created successfully!`, 'success');
    return newBooking;
  };

  // Update Booking Stage
  const updateBookingStage = (bookingId: string, newStage: JobStage, note?: string, updatedBy?: string) => {
    const stageDef = JOB_STAGES.find((s) => s.id === newStage);
    const stageName = stageDef?.label || newStage;
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    setBookings((prev) =>
      prev.map((booking) => {
        if (booking.id !== bookingId) return booking;

        let newStatus = booking.status;
        let actualCompletion = booking.actualCompletionTime;

        if (newStage === 'completed') {
          newStatus = 'completed';
          actualCompletion = nowTime;
        } else if (newStage === 'ready_pickup') {
          newStatus = 'ready';
        } else if (newStage === 'booked') {
          newStatus = 'confirmed';
        } else {
          newStatus = 'in_progress';
        }

        // Auto mark checklist items for stages passed
        const targetStageOrder = stageDef?.order || 1;
        const updatedChecklist = booking.checklist.map((chk) => {
          const chkStageDef = JOB_STAGES.find((s) => s.id === chk.stage);
          if (chkStageDef && chkStageDef.order < targetStageOrder) {
            return { ...chk, completed: true, completedAt: chk.completedAt || nowTime };
          }
          return chk;
        });

        const newHistoryItem = {
          stage: newStage,
          label: stageName,
          timestamp: nowTime,
          note: note || (newStage === 'ready_pickup' ? 'Vehicle ready in Bay #1' : `Progressed to ${stageName}`),
          updatedBy: updatedBy || 'Staff / Admin'
        };

        return {
          ...booking,
          currentStage: newStage,
          status: newStatus,
          actualCompletionTime: actualCompletion,
          checklist: updatedChecklist,
          stageHistory: [...booking.stageHistory, newHistoryItem]
        };
      })
    );

    addToast('Stage Updated', `Job ${bookingId} transitioned to "${stageName}"`, 'info');
  };

  // Advance Stage sequentially
  const advanceBookingStage = (bookingId: string) => {
    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (!targetBooking) return;

    const currentIndex = JOB_STAGES.findIndex((s) => s.id === targetBooking.currentStage);
    if (currentIndex < JOB_STAGES.length - 1) {
      const nextStage = JOB_STAGES[currentIndex + 1].id;
      updateBookingStage(bookingId, nextStage);
    } else {
      addToast('Already Completed', `Job ${bookingId} is already in the final stage.`, 'info');
    }
  };

  // Toggle checklist item
  const toggleChecklistItem = (bookingId: string, checklistItemId: string) => {
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          checklist: b.checklist.map((item) => {
            if (item.id === checklistItemId) {
              const nextCompleted = !item.completed;
              return {
                ...item,
                completed: nextCompleted,
                completedAt: nextCompleted ? nowTime : undefined
              };
            }
            return item;
          })
        };
      })
    );
  };

  // Update staff notes
  const updateBookingNotes = (bookingId: string, staffNotes: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, staffNotes } : b))
    );
    addToast('Notes Saved', `Staff notes updated for ${bookingId}`, 'success');
  };

  // Toggle delay flag
  const toggleBookingDelay = (bookingId: string, isDelayed: boolean, reason?: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, isDelayed, delayReason: reason || (isDelayed ? 'Waiting for paint curing / extra prep' : undefined) }
          : b
      )
    );
    addToast(
      isDelayed ? 'Job Flagged Delayed' : 'Delay Cleared',
      isDelayed ? `Job ${bookingId} marked as delayed.` : `Job ${bookingId} back on schedule.`,
      isDelayed ? 'warning' : 'success'
    );
  };

  // Add simulated photo
  const addBookingPhoto = (bookingId: string, type: 'before' | 'after', photoUrl: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        if (type === 'before') {
          return { ...b, beforePhotos: [...b.beforePhotos, photoUrl] };
        } else {
          return { ...b, afterPhotos: [...b.afterPhotos, photoUrl] };
        }
      })
    );
    addToast('Photo Added', `New ${type} photo attached to job ${bookingId}`, 'success');
  };

  // Update payment status
  const updatePaymentStatus = (bookingId: string, status: PaymentStatus, method?: PaymentMethod, amountPaid?: number) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        let newPaid = b.paidAmount;
        if (status === 'paid') newPaid = b.totalAmount;
        if (status === 'unpaid') newPaid = 0;
        if (status === 'partially_paid' && amountPaid !== undefined) newPaid = amountPaid;

        return {
          ...b,
          paymentStatus: status,
          paymentMethod: method || (status === 'paid' ? 'upi' : b.paymentMethod),
          paidAmount: newPaid
        };
      })
    );
    addToast('Payment Updated', `Payment status for ${bookingId} updated to: ${status.toUpperCase()}`, 'success');
  };

  // Reassign staff
  const updateStaffAssignment = (bookingId: string, staffId: string) => {
    const staff = staffMembers.find((s) => s.id === staffId);
    if (!staff) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, assignedStaffId: staff.id, assignedStaffName: staff.name }
          : b
      )
    );

    // Update staff active list
    setStaffMembers((prev) =>
      prev.map((s) => {
        if (s.id === staffId && !s.assignedJobIds.includes(bookingId)) {
          return { ...s, assignedJobIds: [...s.assignedJobIds, bookingId] };
        }
        return s;
      })
    );

    addToast('Staff Assigned', `${staff.name} assigned to job ${bookingId}`, 'info');
  };

  // Cancel booking
  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
    addToast('Booking Cancelled', `Booking ${bookingId} has been cancelled.`, 'warning');
  };

  // Add customer
  const addCustomer = (customerData: Omit<Customer, 'id' | 'totalVisits' | 'totalSpend' | 'lastVisit' | 'joinedDate'>): Customer => {
    const newCust: Customer = {
      ...customerData,
      id: `cust-${Date.now()}`,
      totalVisits: 0,
      totalSpend: 0,
      lastVisit: 'Never',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCustomers((prev) => [newCust, ...prev]);
    addToast('Customer Added', `Customer ${newCust.name} added to CRM`, 'success');
    return newCust;
  };

  // Update customer
  const updateCustomer = (customerId: string, data: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, ...data } : c))
    );
    addToast('Customer Updated', 'Customer profile details updated successfully.', 'success');
  };

  // Update Service
  const updateServicePackage = (updatedService: ServicePackage) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updatedService.id ? updatedService : s))
    );
    addToast('Catalogue Updated', `Service "${updatedService.name}" updated successfully.`, 'success');
  };

  // Toggle service active
  const toggleServiceStatus = (serviceId: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, active: !s.active } : s))
    );
  };

  return (
    <DemoContext.Provider
      value={{
        role,
        setRole,
        activeStaffId,
        setActiveStaffId,
        bookings,
        customers,
        services,
        addOns,
        staffMembers,
        toasts,
        todayBookingsCount,
        carsInWorkshopCount,
        readyForPickupCount,
        todayRevenue,
        pendingPaymentsAmount,
        addBooking,
        updateBookingStage,
        advanceBookingStage,
        toggleChecklistItem,
        updateBookingNotes,
        toggleBookingDelay,
        addBookingPhoto,
        updatePaymentStatus,
        updateStaffAssignment,
        cancelBooking,
        addCustomer,
        updateCustomer,
        updateServicePackage,
        toggleServiceStatus,
        addToast,
        removeToast,
        resetDemoData
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
