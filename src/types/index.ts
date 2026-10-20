export type VehicleType = 'hatchback' | 'sedan' | 'suv' | 'luxury';

export type JobStage =
  | 'booked'
  | 'received'
  | 'inspection'
  | 'washing'
  | 'interior'
  | 'polishing'
  | 'quality_check'
  | 'ready_pickup'
  | 'completed';

export interface StageDefinition {
  id: JobStage;
  label: string;
  description: string;
  order: number;
}

export type BookingStatus = 'confirmed' | 'in_progress' | 'ready' | 'completed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'partially_paid' | 'paid';
export type PaymentMethod = 'cash' | 'upi' | 'card' | 'pending';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year?: number;
  regNumber: string;
  type: VehicleType;
  color?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  locality: string;
  vehicles: Vehicle[];
  totalVisits: number;
  totalSpend: number;
  lastVisit: string;
  preferredService: string;
  notes?: string;
  joinedDate: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  features: string[];
  pricing: Record<VehicleType, number>;
  popular?: boolean;
  active: boolean;
  image?: string;
}

export interface AddOnService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  active: boolean;
}

export interface ServiceChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  stage: JobStage;
  completedAt?: string;
}

export interface StageHistoryItem {
  stage: JobStage;
  label: string;
  timestamp: string;
  note?: string;
  updatedBy?: string;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  vehicle: Vehicle;
  servicePackageId: string;
  servicePackageName: string;
  addOnIds: string[];
  appointmentDate: string;
  appointmentTime: string;
  assignedStaffId: string;
  assignedStaffName: string;
  currentStage: JobStage;
  status: BookingStatus;
  checkInTime?: string;
  estimatedCompletion: string;
  actualCompletionTime?: string;
  customerNotes?: string;
  staffNotes?: string;
  checklist: ServiceChecklistItem[];
  stageHistory: StageHistoryItem[];
  beforePhotos: string[];
  afterPhotos: string[];
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  tax: number;
  totalAmount: number;
  paidAmount: number;
  invoiceNumber: string;
  isDelayed?: boolean;
  delayReason?: string;
  additionalRequests?: {
    id: string;
    item: string;
    amount: number;
    approved: boolean;
    suggestedByStaff: boolean;
  }[];
  createdAt: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  phone: string;
  assignedJobIds: string[];
  jobsCompletedToday: number;
  avatar: string;
  status: 'active' | 'break' | 'off_duty';
}

export type DemoRole = 'admin' | 'staff' | 'customer';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
