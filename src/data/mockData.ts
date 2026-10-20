import { Customer, ServicePackage, AddOnService, StaffMember, Booking, StageDefinition, JobStage } from '../types';

export const JOB_STAGES: StageDefinition[] = [
  { id: 'booked', label: 'Booked', description: 'Booking confirmed and slot reserved', order: 1 },
  { id: 'received', label: 'Car Received', description: 'Vehicle checked in at workshop bay', order: 2 },
  { id: 'inspection', label: 'Inspection', description: 'Pre-service condition & damage check', order: 3 },
  { id: 'washing', label: 'Washing', description: 'Underbody & high-pressure foam wash', order: 4 },
  { id: 'interior', label: 'Interior Cleaning', description: 'Deep vacuum, steam & upholstery care', order: 5 },
  { id: 'polishing', label: 'Polishing / Detailing', description: 'Machine cut, dual-action polish & gloss sealant', order: 6 },
  { id: 'quality_check', label: 'Quality Check', description: '24-point supervisor inspection & wipe down', order: 7 },
  { id: 'ready_pickup', label: 'Ready for Pickup', description: 'Car cleaned, parked in delivery bay', order: 8 },
  { id: 'completed', label: 'Completed', description: 'Delivered to customer & payment cleared', order: 9 },
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'pkg-express-wash',
    name: 'Express Wash',
    tagline: 'Quick 45-min foam wash & vacuum',
    description: 'Exterior high-pressure snow foam wash, tyre dressing, interior floor mats wash and quick cabin vacuuming. Ideal for regular weekly maintenance.',
    duration: '45 mins',
    features: [
      'High-pressure snow foam wash',
      'Wheel arch & tyre cleaning',
      'Floor mat wash & cabin vacuum',
      'Windshield cleaning',
      'Tyre gloss dressing'
    ],
    pricing: {
      hatchback: 399,
      sedan: 499,
      suv: 599,
      luxury: 799
    },
    popular: false,
    active: true,
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pkg-premium-wash',
    name: 'Premium Wash',
    tagline: 'Thorough two-bucket exterior & interior detailing',
    description: 'Comprehensive gentle wash with pH-neutral shampoo, deep wheel de-ironing, complete interior wipe-down, dashboard UV conditioning and liquid wax protection.',
    duration: '1.5 hrs',
    features: [
      'Two-bucket scratchless foam wash',
      'Alloy wheel de-ironing & tyre shine',
      'Underbody high-pressure spray',
      'Detailed interior vacuum & air blower',
      'Dashboard & door trim UV protection',
      'Spray sealant for instant gloss'
    ],
    pricing: {
      hatchback: 799,
      sedan: 999,
      suv: 1199,
      luxury: 1499
    },
    popular: true,
    active: true,
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pkg-interior-deep',
    name: 'Interior Deep Cleaning',
    tagline: 'Intensive stain removal, steam wash & sanitization',
    description: 'Complete deep extraction for fabric/leather seats, steam sanitization of AC vents, roof-liner gentle cleaning, boot space detailing and ozone air purification.',
    duration: '2.5 hrs',
    features: [
      'Deep hot-water seat foam extraction',
      'Leather deep clean & nourishing balm',
      'Roof liner & door pad spot extraction',
      'AC vent antimicrobial steam cleaning',
      'Carpet & boot shampooing',
      'Ozone deodorization & odour remover'
    ],
    pricing: {
      hatchback: 1999,
      sedan: 2499,
      suv: 2999,
      luxury: 3499
    },
    popular: false,
    active: true,
    image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pkg-full-detailing',
    name: 'Full Detailing',
    tagline: 'Showroom finish paint correction & complete interior restoration',
    description: 'Our flagship 360° overhaul. Includes 2-stage machine compounding to remove swirl marks, synthetic sealant layer, complete engine bay dress and full interior revitalization.',
    duration: '4.5 hrs',
    features: [
      'Everything in Premium Wash & Interior Deep Cleaning',
      'Clay bar decontamination on all panels',
      '2-stage machine polish (swirl & scratch removal)',
      'Synthetic polymer gloss sealant (6-month shine)',
      'Detailed engine bay steam wash & dress',
      'Headlight & tail light clarity restoration'
    ],
    pricing: {
      hatchback: 3999,
      sedan: 4999,
      suv: 5999,
      luxury: 7499
    },
    popular: true,
    active: true,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pkg-ceramic-coating',
    name: 'Ceramic Coating 9H Pro',
    tagline: 'Ultra-hydrophobic 3-year scratch & UV shield',
    description: 'Multi-layer 9H nano-ceramic coating bonding directly to clear coat. Provides extreme candy-like gloss, hydrophobic water beading, and UV oxidation resistance.',
    duration: '1.5 days',
    features: [
      '3-stage mirror paint correction',
      'Dual-layer 9H ceramic shield application',
      'Alloy wheels face ceramic treatment',
      'Glass hydrophobic ceramic coating',
      '3-year warranty certificate with 6-month top-ups'
    ],
    pricing: {
      hatchback: 12999,
      sedan: 15999,
      suv: 18999,
      luxury: 24999
    },
    popular: false,
    active: true,
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80'
  }
];

export const ADD_ON_SERVICES: AddOnService[] = [
  {
    id: 'addon-tyre-polish',
    name: 'Tyre & Trim Polishing',
    description: 'High-shine hydrophobic silicon tyre dressing and faded exterior plastics restoration.',
    price: 199,
    duration: '15 mins',
    active: true
  },
  {
    id: 'addon-interior-sanitization',
    name: 'Interior Sanitization & Mist',
    description: 'Hospital-grade disinfectant smoke mist treating upholstery, headliners and floor mats.',
    price: 399,
    duration: '20 mins',
    active: true
  },
  {
    id: 'addon-engine-bay',
    name: 'Engine Bay Detailing',
    description: 'Safe dry steam cleaning of engine bay components and water-repellent satin dressing.',
    price: 499,
    duration: '30 mins',
    active: true
  },
  {
    id: 'addon-paint-protection',
    name: 'Paint Protection Wax Layer',
    description: 'Hand-buffed Brazilian carnauba paste wax for warmth, depth and rainwater beading.',
    price: 999,
    duration: '45 mins',
    active: true
  },
  {
    id: 'addon-rain-x',
    name: 'Rain-X Windshield Treatment',
    description: 'Hydrophobic glass coating to disperse rain effortlessly at speeds above 50 km/h.',
    price: 299,
    duration: '15 mins',
    active: true
  },
  {
    id: 'addon-ac-disinfection',
    name: 'AC Vent Ozone Disinfection',
    description: 'Removes foul musty odour and eradicates fungus/bacteria inside evaporator coils.',
    price: 349,
    duration: '20 mins',
    active: true
  }
];

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Ramesh Kumar',
    role: 'Lead Master Detailer',
    specialization: 'Paint Correction & Ceramic Coating',
    phone: '+91 98490 12345',
    assignedJobIds: ['GG-1024', 'GG-1021'],
    jobsCompletedToday: 2,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    status: 'active'
  },
  {
    id: 'staff-2',
    name: 'Suresh Babu',
    role: 'Detailing Specialist',
    specialization: 'Rotary Machine Polishing & Finishing',
    phone: '+91 98490 23456',
    assignedJobIds: ['GG-1025'],
    jobsCompletedToday: 3,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'active'
  },
  {
    id: 'staff-3',
    name: 'Mohammed Farooq',
    role: 'Interior Specialist',
    specialization: 'Upholstery Extraction & Leather Care',
    phone: '+91 98490 34567',
    assignedJobIds: ['GG-1026', 'GG-1028'],
    jobsCompletedToday: 2,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'active'
  },
  {
    id: 'staff-4',
    name: 'Venkat Rao',
    role: 'Wash & Inspection Tech',
    specialization: 'Foam Prep, Undercarriage & QC',
    phone: '+91 98490 45678',
    assignedJobIds: ['GG-1027', 'GG-1029'],
    jobsCompletedToday: 4,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    status: 'active'
  }
];

export const CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@example.in',
    locality: 'Jubilee Hills, Road No. 36',
    vehicles: [
      { id: 'veh-1', make: 'Hyundai', model: 'Creta SX(O)', year: 2023, regNumber: 'TS 09 EA 4521', type: 'suv', color: 'Phantom Black' }
    ],
    totalVisits: 4,
    totalSpend: 18450,
    lastVisit: '2026-10-20',
    preferredService: 'Full Detailing',
    notes: 'Very particular about alloy wheel cleanliness and piano black interior trims.',
    joinedDate: '2025-06-12'
  },
  {
    id: 'cust-2',
    name: 'Priya Reddy',
    phone: '+91 98851 23490',
    email: 'priya.reddy@example.in',
    locality: 'Banjara Hills, Road No. 12',
    vehicles: [
      { id: 'veh-2', make: 'BMW', model: '330i M Sport', year: 2024, regNumber: 'TS 07 HK 9082', type: 'luxury', color: 'Portimao Blue' }
    ],
    totalVisits: 6,
    totalSpend: 34200,
    lastVisit: '2026-10-18',
    preferredService: 'Premium Wash & Wax',
    notes: 'Premium regular client. Prefers morning 9:00 AM slots. Complimentary coffee appreciated.',
    joinedDate: '2025-02-14'
  },
  {
    id: 'cust-3',
    name: 'Vikram Varma',
    phone: '+91 99482 99881',
    email: 'vikram.varma@example.in',
    locality: 'Gachibowli, Telecom Nagar',
    vehicles: [
      { id: 'veh-3', make: 'Mahindra', model: 'Thar 4x4', year: 2023, regNumber: 'TS 08 FG 1104', type: 'suv', color: 'Napoli Black' }
    ],
    totalVisits: 3,
    totalSpend: 9800,
    lastVisit: '2026-10-15',
    preferredService: 'Underbody & Engine Bay Wash',
    notes: 'Often brings vehicle after off-roading trips in Vikarabad.',
    joinedDate: '2025-08-01'
  },
  {
    id: 'cust-4',
    name: 'Ananya Rao',
    phone: '+91 97034 55122',
    email: 'ananya.rao@example.in',
    locality: 'Madhapur, Near Avasa Hotel',
    vehicles: [
      { id: 'veh-4', make: 'Honda', model: 'City ZX', year: 2022, regNumber: 'TS 10 BJ 7720', type: 'sedan', color: 'Platinum White' }
    ],
    totalVisits: 5,
    totalSpend: 14500,
    lastVisit: '2026-10-10',
    preferredService: 'Interior Deep Cleaning',
    notes: 'Has pet dog; always request extra hair vacuuming.',
    joinedDate: '2025-04-19'
  },
  {
    id: 'cust-5',
    name: 'Karthik Teja',
    phone: '+91 98661 77234',
    email: 'karthik.teja@example.in',
    locality: 'Kondapur, Raghavendra Colony',
    vehicles: [
      { id: 'veh-5', make: 'Tata', model: 'Nexon EV Empowered', year: 2024, regNumber: 'TS 09 CD 3399', type: 'suv', color: 'Daytona Grey' }
    ],
    totalVisits: 2,
    totalSpend: 4200,
    lastVisit: '2026-10-02',
    preferredService: 'Express Wash',
    notes: 'EV charging request if available during detailing.',
    joinedDate: '2026-01-11'
  },
  {
    id: 'cust-6',
    name: 'Siddharth Nair',
    phone: '+91 99590 66341',
    email: 'siddharth.nair@example.in',
    locality: 'Financial District, Nanakramguda',
    vehicles: [
      { id: 'veh-6', make: 'Kia', model: 'Seltos GTX+', year: 2023, regNumber: 'TS 07 JN 4811', type: 'suv', color: 'Gravity Grey' }
    ],
    totalVisits: 4,
    totalSpend: 16800,
    lastVisit: '2026-09-28',
    preferredService: 'Full Detailing',
    notes: 'Corporate fleet discount inquiry pending.',
    joinedDate: '2025-09-05'
  },
  {
    id: 'cust-7',
    name: 'Meera Kulkarni',
    phone: '+91 98480 33499',
    email: 'meera.k@example.in',
    locality: 'Begumpet, Mayur Marg',
    vehicles: [
      { id: 'veh-7', make: 'Maruti Suzuki', model: 'Baleno Alpha', year: 2023, regNumber: 'TS 09 KL 8219', type: 'hatchback', color: 'Celestial Blue' }
    ],
    totalVisits: 3,
    totalSpend: 3197,
    lastVisit: '2026-09-19',
    preferredService: 'Express Wash',
    notes: 'Requests gentle treatment on aftermarket dashboard camera wires.',
    joinedDate: '2025-11-20'
  },
  {
    id: 'cust-8',
    name: 'Arjun Somani',
    phone: '+91 98711 00293',
    email: 'arjun.somani@example.in',
    locality: 'Jubilee Hills, Prashasan Nagar',
    vehicles: [
      { id: 'veh-8', make: 'Mercedes-Benz', model: 'C-Class C200', year: 2024, regNumber: 'TS 09 MM 0007', type: 'luxury', color: 'Obsidian Black' }
    ],
    totalVisits: 5,
    totalSpend: 48900,
    lastVisit: '2026-10-12',
    preferredService: 'Ceramic Coating 9H Pro',
    notes: 'VIP customer. Always assign Ramesh Kumar (Master Detailer).',
    joinedDate: '2025-03-30'
  },
  {
    id: 'cust-9',
    name: 'Deepak Chowdary',
    phone: '+91 99890 14890',
    email: 'deepak.c@example.in',
    locality: 'Kukatpally, KPHB Phase 4',
    vehicles: [
      { id: 'veh-9', make: 'Toyota', model: 'Fortuner Legender', year: 2023, regNumber: 'TS 08 XY 9999', type: 'suv', color: 'Pearl White' }
    ],
    totalVisits: 7,
    totalSpend: 28400,
    lastVisit: '2026-10-14',
    preferredService: 'Full Detailing',
    notes: 'Frequent road trips to Vijayawada; focuses on bug removal and ceramic reload.',
    joinedDate: '2025-01-18'
  },
  {
    id: 'cust-10',
    name: 'Sneha Patel',
    phone: '+91 99632 88471',
    email: 'sneha.patel@example.in',
    locality: 'Hitec City, Cyber Towers lane',
    vehicles: [
      { id: 'veh-10', make: 'Volkswagen', model: 'Taigun GT Plus', year: 2023, regNumber: 'TS 10 LK 5012', type: 'suv', color: 'Wild Cherry Red' }
    ],
    totalVisits: 2,
    totalSpend: 5498,
    lastVisit: '2026-10-08',
    preferredService: 'Interior Deep Cleaning',
    notes: 'Prefers contactless UPI payment.',
    joinedDate: '2026-02-09'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'GG-1024',
    customerId: 'cust-1',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    customerEmail: 'rahul.sharma@example.in',
    vehicle: {
      id: 'veh-1',
      make: 'Hyundai',
      model: 'Creta SX(O)',
      year: 2023,
      regNumber: 'TS 09 EA 4521',
      type: 'suv',
      color: 'Phantom Black'
    },
    servicePackageId: 'pkg-full-detailing',
    servicePackageName: 'Full Detailing',
    addOnIds: ['addon-tyre-polish', 'addon-ac-disinfection'],
    appointmentDate: '2026-10-20',
    appointmentTime: '10:00 AM',
    assignedStaffId: 'staff-1',
    assignedStaffName: 'Ramesh Kumar',
    currentStage: 'polishing',
    status: 'in_progress',
    checkInTime: '10:15 AM',
    estimatedCompletion: '2:30 PM',
    customerNotes: 'Please focus on removing hairline swirls on bonnet and side door cups.',
    staffNotes: 'Car received in good condition. Minor scratch on rear left fender logged in pre-inspection.',
    checklist: [
      { id: 'chk-1', label: 'Vehicle check-in & mileage logging', completed: true, stage: 'received', completedAt: '10:18 AM' },
      { id: 'chk-2', label: 'Existing paint and glass damage inspection', completed: true, stage: 'inspection', completedAt: '10:30 AM' },
      { id: 'chk-3', label: 'Underbody high-pressure rinse', completed: true, stage: 'washing', completedAt: '10:50 AM' },
      { id: 'chk-4', label: 'Snow foam wash & two-bucket hand bath', completed: true, stage: 'washing', completedAt: '11:20 AM' },
      { id: 'chk-5', label: 'Iron remover & clay bar paint decontamination', completed: true, stage: 'washing', completedAt: '11:55 AM' },
      { id: 'chk-6', label: 'Cabin vacuum & dashboard deep clean', completed: true, stage: 'interior', completedAt: '12:45 PM' },
      { id: 'chk-7', label: 'Leather upholstery conditioning & AC mist', completed: true, stage: 'interior', completedAt: '1:15 PM' },
      { id: 'chk-8', label: 'Dual-action machine compound polish', completed: false, stage: 'polishing' },
      { id: 'chk-9', label: 'High gloss polymer synthetic sealant application', completed: false, stage: 'polishing' },
      { id: 'chk-10', label: '24-point supervisor quality check & delivery prep', completed: false, stage: 'quality_check' },
      { id: 'chk-11', label: 'Handover to customer with service certificate', completed: false, stage: 'completed' }
    ],
    stageHistory: [
      { stage: 'booked', label: 'Booking Confirmed', timestamp: '2026-10-19 08:30 PM', note: 'Booked online via Glossy Gaadi portal', updatedBy: 'System' },
      { stage: 'received', label: 'Vehicle Received', timestamp: '10:15 AM', note: 'Customer arrived at Jubilee Hills Bay #2', updatedBy: 'Venkat Rao' },
      { stage: 'inspection', label: 'Inspection Completed', timestamp: '10:35 AM', note: 'Pre-existing minor clearcoat scratch near fuel cap documented', updatedBy: 'Ramesh Kumar' },
      { stage: 'washing', label: 'Exterior Decontamination Complete', timestamp: '12:05 PM', note: 'Foam wash & clay bar treatment completed', updatedBy: 'Venkat Rao' },
      { stage: 'interior', label: 'Interior Detailing Done', timestamp: '1:20 PM', note: 'Steamed AC vents and sanitized upholstery', updatedBy: 'Mohammed Farooq' },
      { stage: 'polishing', label: 'Polishing & Machine Buffing in Progress', timestamp: '1:30 PM', note: 'Applying Menzerna 400 compound on bonnet', updatedBy: 'Ramesh Kumar' }
    ],
    beforePhotos: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80'
    ],
    afterPhotos: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=600&q=80'
    ],
    paymentStatus: 'unpaid',
    paymentMethod: 'pending',
    subtotal: 6547,
    discount: 0,
    tax: 1178,
    totalAmount: 7725,
    paidAmount: 0,
    invoiceNumber: 'INV-2026-0842',
    isDelayed: false,
    additionalRequests: [
      { id: 'req-1', item: 'Silicate Glass Rain Treatment', amount: 299, approved: false, suggestedByStaff: true }
    ],
    createdAt: '2026-10-19T20:30:00Z'
  },
  {
    id: 'GG-1025',
    customerId: 'cust-2',
    customerName: 'Priya Reddy',
    customerPhone: '+91 98851 23490',
    customerEmail: 'priya.reddy@example.in',
    vehicle: {
      id: 'veh-2',
      make: 'BMW',
      model: '330i M Sport',
      year: 2024,
      regNumber: 'TS 07 HK 9082',
      type: 'luxury',
      color: 'Portimao Blue'
    },
    servicePackageId: 'pkg-premium-wash',
    servicePackageName: 'Premium Wash',
    addOnIds: ['addon-paint-protection'],
    appointmentDate: '2026-10-20',
    appointmentTime: '09:00 AM',
    assignedStaffId: 'staff-2',
    assignedStaffName: 'Suresh Babu',
    currentStage: 'ready_pickup',
    status: 'ready',
    checkInTime: '09:05 AM',
    estimatedCompletion: '11:00 AM',
    actualCompletionTime: '10:55 AM',
    customerNotes: 'Please ensure brake dust from M-Sport alloys is completely cleared.',
    staffNotes: 'Car finished on schedule. Ultra glossy result on Portimao Blue.',
    checklist: [
      { id: 'c-1', label: 'Check-in vehicle & inspection', completed: true, stage: 'received' },
      { id: 'c-2', label: 'Two-bucket hand wash & alloy de-ironing', completed: true, stage: 'washing' },
      { id: 'c-3', label: 'Cabin vacuum & interior conditioning', completed: true, stage: 'interior' },
      { id: 'c-4', label: 'Liquid wax coat hand buffing', completed: true, stage: 'polishing' },
      { id: 'c-5', label: 'Final quality control and tyre dressing', completed: true, stage: 'quality_check' }
    ],
    stageHistory: [
      { stage: 'booked', label: 'Booked', timestamp: '2026-10-18 11:00 AM' },
      { stage: 'received', label: 'Car Received', timestamp: '09:05 AM' },
      { stage: 'inspection', label: 'Inspection', timestamp: '09:15 AM' },
      { stage: 'washing', label: 'Washing', timestamp: '09:40 AM' },
      { stage: 'interior', label: 'Interior Done', timestamp: '10:10 AM' },
      { stage: 'polishing', label: 'Wax Applied', timestamp: '10:35 AM' },
      { stage: 'quality_check', label: 'Quality Passed', timestamp: '10:50 AM' },
      { stage: 'ready_pickup', label: 'Ready for Pickup', timestamp: '10:55 AM', note: 'Parked in VIP Bay #1' }
    ],
    beforePhotos: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80'],
    afterPhotos: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80'],
    paymentStatus: 'paid',
    paymentMethod: 'upi',
    subtotal: 2498,
    discount: 200,
    tax: 413,
    totalAmount: 2711,
    paidAmount: 2711,
    invoiceNumber: 'INV-2026-0839',
    isDelayed: false,
    createdAt: '2026-10-18T11:00:00Z'
  },
  {
    id: 'GG-1026',
    customerId: 'cust-4',
    customerName: 'Ananya Rao',
    customerPhone: '+91 97034 55122',
    customerEmail: 'ananya.rao@example.in',
    vehicle: {
      id: 'veh-4',
      make: 'Honda',
      model: 'City ZX',
      year: 2022,
      regNumber: 'TS 10 BJ 7720',
      type: 'sedan',
      color: 'Platinum White'
    },
    servicePackageId: 'pkg-interior-deep',
    servicePackageName: 'Interior Deep Cleaning',
    addOnIds: ['addon-ac-disinfection', 'addon-interior-sanitization'],
    appointmentDate: '2026-10-20',
    appointmentTime: '11:30 AM',
    assignedStaffId: 'staff-3',
    assignedStaffName: 'Mohammed Farooq',
    currentStage: 'interior',
    status: 'in_progress',
    checkInTime: '11:35 AM',
    estimatedCompletion: '2:15 PM',
    customerNotes: 'Pet hair removal needed from rear seat fabric.',
    staffNotes: 'High-power suction used for dog hair removal. Hot water extraction underway.',
    checklist: [
      { id: 'c-1', label: 'Check-in & seat fabric check', completed: true, stage: 'received' },
      { id: 'c-2', label: 'Vacuuming and pet hair brushing', completed: true, stage: 'interior' },
      { id: 'c-3', label: 'Hot water seat extraction shampoo', completed: true, stage: 'interior' },
      { id: 'c-4', label: 'Ozone steam sanitization', completed: false, stage: 'interior' },
      { id: 'c-5', label: 'Drying and inspection', completed: false, stage: 'quality_check' }
    ],
    stageHistory: [
      { stage: 'booked', label: 'Booked', timestamp: '2026-10-19 02:15 PM' },
      { stage: 'received', label: 'Car Received', timestamp: '11:35 AM' },
      { stage: 'inspection', label: 'Inspection', timestamp: '11:45 AM' },
      { stage: 'interior', label: 'Deep Cleaning Active', timestamp: '12:00 PM' }
    ],
    beforePhotos: ['https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=600&q=80'],
    afterPhotos: [],
    paymentStatus: 'unpaid',
    paymentMethod: 'pending',
    subtotal: 3247,
    discount: 0,
    tax: 584,
    totalAmount: 3831,
    paidAmount: 0,
    invoiceNumber: 'INV-2026-0843',
    isDelayed: false,
    createdAt: '2026-10-19T14:15:00Z'
  },
  {
    id: 'GG-1027',
    customerId: 'cust-3',
    customerName: 'Vikram Varma',
    customerPhone: '+91 99482 99881',
    customerEmail: 'vikram.varma@example.in',
    vehicle: {
      id: 'veh-3',
      make: 'Mahindra',
      model: 'Thar 4x4',
      year: 2023,
      regNumber: 'TS 08 FG 1104',
      type: 'suv',
      color: 'Napoli Black'
    },
    servicePackageId: 'pkg-express-wash',
    servicePackageName: 'Express Wash',
    addOnIds: ['addon-engine-bay'],
    appointmentDate: '2026-10-20',
    appointmentTime: '01:00 PM',
    assignedStaffId: 'staff-4',
    assignedStaffName: 'Venkat Rao',
    currentStage: 'washing',
    status: 'in_progress',
    checkInTime: '01:10 PM',
    estimatedCompletion: '02:00 PM',
    customerNotes: 'Heavy mud underneath from trail run.',
    staffNotes: 'Extra underbody degreaser applied to suspension arms.',
    checklist: [
      { id: 'c-1', label: 'Check-in vehicle', completed: true, stage: 'received' },
      { id: 'c-2', label: 'Underbody blast & mud rinse', completed: true, stage: 'washing' },
      { id: 'c-3', label: 'High foam wash & wheels clean', completed: false, stage: 'washing' },
      { id: 'c-4', label: 'Engine bay steam wash', completed: false, stage: 'washing' }
    ],
    stageHistory: [
      { stage: 'booked', label: 'Booked', timestamp: '2026-10-20 09:00 AM' },
      { stage: 'received', label: 'Received', timestamp: '01:10 PM' },
      { stage: 'washing', label: 'Washing in Bay 1', timestamp: '01:20 PM' }
    ],
    beforePhotos: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'],
    afterPhotos: [],
    paymentStatus: 'paid',
    paymentMethod: 'upi',
    subtotal: 1098,
    discount: 0,
    tax: 198,
    totalAmount: 1296,
    paidAmount: 1296,
    invoiceNumber: 'INV-2026-0844',
    isDelayed: false,
    createdAt: '2026-10-20T09:00:00Z'
  },
  {
    id: 'GG-1028',
    customerId: 'cust-5',
    customerName: 'Karthik Teja',
    customerPhone: '+91 98661 77234',
    customerEmail: 'karthik.teja@example.in',
    vehicle: {
      id: 'veh-5',
      make: 'Tata',
      model: 'Nexon EV Empowered',
      year: 2024,
      regNumber: 'TS 09 CD 3399',
      type: 'suv',
      color: 'Daytona Grey'
    },
    servicePackageId: 'pkg-premium-wash',
    servicePackageName: 'Premium Wash',
    addOnIds: ['addon-tyre-polish'],
    appointmentDate: '2026-10-20',
    appointmentTime: '02:00 PM',
    assignedStaffId: 'staff-4',
    assignedStaffName: 'Venkat Rao',
    currentStage: 'inspection',
    status: 'in_progress',
    checkInTime: '01:50 PM',
    estimatedCompletion: '03:30 PM',
    customerNotes: 'Please avoid spraying water directly into battery charging port lid.',
    staffNotes: 'EV charging port sealed before wash. Conducting pre-wash inspection.',
    checklist: [
      { id: 'c-1', label: 'Check-in & EV port cover verification', completed: true, stage: 'received' },
      { id: 'c-2', label: 'Inspection for bird drop etching', completed: true, stage: 'inspection' },
      { id: 'c-3', label: 'Foam wash', completed: false, stage: 'washing' }
    ],
    stageHistory: [
      { stage: 'booked', label: 'Booked', timestamp: '2026-10-19 06:00 PM' },
      { stage: 'received', label: 'Received', timestamp: '01:50 PM' },
      { stage: 'inspection', label: 'Inspection Underway', timestamp: '02:00 PM' }
    ],
    beforePhotos: [],
    afterPhotos: [],
    paymentStatus: 'unpaid',
    paymentMethod: 'pending',
    subtotal: 1398,
    discount: 0,
    tax: 252,
    totalAmount: 1650,
    paidAmount: 0,
    invoiceNumber: 'INV-2026-0845',
    isDelayed: false,
    createdAt: '2026-10-19T18:00:00Z'
  },
  {
    id: 'GG-1029',
    customerId: 'cust-6',
    customerName: 'Siddharth Nair',
    customerPhone: '+91 99590 66341',
    customerEmail: 'siddharth.nair@example.in',
    vehicle: {
      id: 'veh-6',
      make: 'Kia',
      model: 'Seltos GTX+',
      year: 2023,
      regNumber: 'TS 07 JN 4811',
      type: 'suv',
      color: 'Gravity Grey'
    },
    servicePackageId: 'pkg-full-detailing',
    servicePackageName: 'Full Detailing',
    addOnIds: ['addon-paint-protection', 'addon-engine-bay'],
    appointmentDate: '2026-10-20',
    appointmentTime: '03:00 PM',
    assignedStaffId: 'staff-2',
    assignedStaffName: 'Suresh Babu',
    currentStage: 'booked',
    status: 'confirmed',
    estimatedCompletion: '07:30 PM',
    customerNotes: 'Will drop off at 3:00 PM sharp after office lunch.',
    staffNotes: '',
    checklist: [
      { id: 'c-1', label: 'Check-in vehicle', completed: false, stage: 'received' },
      { id: 'c-2', label: 'Full detailing inspection', completed: false, stage: 'inspection' },
      { id: 'c-3', label: 'Foam wash & clay bar', completed: false, stage: 'washing' },
      { id: 'c-4', label: 'Interior extraction', completed: false, stage: 'interior' },
      { id: 'c-5', label: 'Machine buffing & sealant', completed: false, stage: 'polishing' }
    ],
    stageHistory: [
      { stage: 'booked', label: 'Booking Confirmed', timestamp: '2026-10-20 10:15 AM' }
    ],
    beforePhotos: [],
    afterPhotos: [],
    paymentStatus: 'unpaid',
    paymentMethod: 'pending',
    subtotal: 7497,
    discount: 500,
    tax: 1259,
    totalAmount: 8256,
    paidAmount: 0,
    invoiceNumber: 'INV-2026-0846',
    isDelayed: false,
    createdAt: '2026-10-20T10:15:00Z'
  },
  {
    id: 'GG-1021',
    customerId: 'cust-8',
    customerName: 'Arjun Somani',
    customerPhone: '+91 98711 00293',
    customerEmail: 'arjun.somani@example.in',
    vehicle: {
      id: 'veh-8',
      make: 'Mercedes-Benz',
      model: 'C-Class C200',
      year: 2024,
      regNumber: 'TS 09 MM 0007',
      type: 'luxury',
      color: 'Obsidian Black'
    },
    servicePackageId: 'pkg-ceramic-coating',
    servicePackageName: 'Ceramic Coating 9H Pro',
    addOnIds: ['addon-rain-x'],
    appointmentDate: '2026-10-20',
    appointmentTime: '08:30 AM',
    assignedStaffId: 'staff-1',
    assignedStaffName: 'Ramesh Kumar',
    currentStage: 'quality_check',
    status: 'in_progress',
    checkInTime: '08:45 AM',
    estimatedCompletion: '04:00 PM',
    customerNotes: 'Curing in infrared heat booth. Handle with microfibres only.',
    staffNotes: 'Second layer of 9H ceramic cured. Surface gloss reading: 96 GU (Mirror). Final inspection underway.',
    checklist: [
      { id: 'c-1', label: 'Check-in & paint depth measurement', completed: true, stage: 'received' },
      { id: 'c-2', label: '3-stage paint correction & swirl removal', completed: true, stage: 'polishing' },
      { id: 'c-3', label: 'IPA wipe down for chemical bond', completed: true, stage: 'polishing' },
      { id: 'c-4', label: 'Base & top coat ceramic application', completed: true, stage: 'polishing' },
      { id: 'c-5', label: '24-point supervisor inspection & cure test', completed: false, stage: 'quality_check' }
    ],
    stageHistory: [
      { stage: 'booked', label: 'Booked', timestamp: '2026-10-18 04:00 PM' },
      { stage: 'received', label: 'Received', timestamp: '08:45 AM' },
      { stage: 'polishing', label: 'Ceramic Application', timestamp: '11:00 AM' },
      { stage: 'quality_check', label: 'IR Curing & Quality Check', timestamp: '01:45 PM' }
    ],
    beforePhotos: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80'],
    afterPhotos: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80'],
    paymentStatus: 'partially_paid',
    paymentMethod: 'card',
    subtotal: 25298,
    discount: 1500,
    tax: 4284,
    totalAmount: 28082,
    paidAmount: 14000,
    invoiceNumber: 'INV-2026-0835',
    isDelayed: false,
    createdAt: '2026-10-18T16:00:00Z'
  },
  {
    id: 'GG-1020',
    customerId: 'cust-9',
    customerName: 'Deepak Chowdary',
    customerPhone: '+91 99890 14890',
    customerEmail: 'deepak.c@example.in',
    vehicle: {
      id: 'veh-9',
      make: 'Toyota',
      model: 'Fortuner Legender',
      year: 2023,
      regNumber: 'TS 08 XY 9999',
      type: 'suv',
      color: 'Pearl White'
    },
    servicePackageId: 'pkg-full-detailing',
    servicePackageName: 'Full Detailing',
    addOnIds: ['addon-tyre-polish', 'addon-paint-protection'],
    appointmentDate: '2026-10-20',
    appointmentTime: '08:00 AM',
    assignedStaffId: 'staff-2',
    assignedStaffName: 'Suresh Babu',
    currentStage: 'completed',
    status: 'completed',
    checkInTime: '08:10 AM',
    estimatedCompletion: '12:30 PM',
    actualCompletionTime: '12:15 PM',
    customerNotes: 'Picked up on time. Customer rated service 5/5 stars.',
    staffNotes: 'Customer very satisfied with bonnet swirl removal.',
    checklist: [
      { id: 'c-1', label: 'Check-in vehicle', completed: true, stage: 'received' },
      { id: 'c-2', label: 'Full machine polish', completed: true, stage: 'polishing' },
      { id: 'c-3', label: 'Final inspection & delivery', completed: true, stage: 'completed' }
    ],
    stageHistory: [
      { stage: 'booked', label: 'Booked', timestamp: '2026-10-17 01:00 PM' },
      { stage: 'received', label: 'Received', timestamp: '08:10 AM' },
      { stage: 'completed', label: 'Delivered', timestamp: '12:15 PM' }
    ],
    beforePhotos: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'],
    afterPhotos: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'],
    paymentStatus: 'paid',
    paymentMethod: 'upi',
    subtotal: 7197,
    discount: 500,
    tax: 1205,
    totalAmount: 7902,
    paidAmount: 7902,
    invoiceNumber: 'INV-2026-0834',
    isDelayed: false,
    createdAt: '2026-10-17T13:00:00Z'
  },
  {
    id: 'GG-1022',
    customerId: 'cust-7',
    customerName: 'Meera Kulkarni',
    customerPhone: '+91 98480 33499',
    customerEmail: 'meera.k@example.in',
    vehicle: {
      id: 'veh-7',
      make: 'Maruti Suzuki',
      model: 'Baleno Alpha',
      year: 2023,
      regNumber: 'TS 09 KL 8219',
      type: 'hatchback',
      color: 'Celestial Blue'
    },
    servicePackageId: 'pkg-express-wash',
    servicePackageName: 'Express Wash',
    addOnIds: [],
    appointmentDate: '2026-10-20',
    appointmentTime: '04:30 PM',
    assignedStaffId: 'staff-4',
    assignedStaffName: 'Venkat Rao',
    currentStage: 'booked',
    status: 'confirmed',
    estimatedCompletion: '05:15 PM',
    customerNotes: '',
    staffNotes: '',
    checklist: [],
    stageHistory: [
      { stage: 'booked', label: 'Booked', timestamp: '2026-10-20 11:30 AM' }
    ],
    beforePhotos: [],
    afterPhotos: [],
    paymentStatus: 'unpaid',
    paymentMethod: 'pending',
    subtotal: 399,
    discount: 0,
    tax: 72,
    totalAmount: 471,
    paidAmount: 0,
    invoiceNumber: 'INV-2026-0847',
    isDelayed: false,
    createdAt: '2026-10-20T11:30:00Z'
  },
  {
    id: 'GG-1023',
    customerId: 'cust-10',
    customerName: 'Sneha Patel',
    customerPhone: '+91 99632 88471',
    customerEmail: 'sneha.patel@example.in',
    vehicle: {
      id: 'veh-10',
      make: 'Volkswagen',
      model: 'Taigun GT Plus',
      year: 2023,
      regNumber: 'TS 10 LK 5012',
      type: 'suv',
      color: 'Wild Cherry Red'
    },
    servicePackageId: 'pkg-interior-deep',
    servicePackageName: 'Interior Deep Cleaning',
    addOnIds: ['addon-tyre-polish'],
    appointmentDate: '2026-10-20',
    appointmentTime: '05:00 PM',
    assignedStaffId: 'staff-3',
    assignedStaffName: 'Mohammed Farooq',
    currentStage: 'booked',
    status: 'confirmed',
    estimatedCompletion: '07:30 PM',
    customerNotes: 'First time visit. Recommended by friend in Hitec City.',
    staffNotes: '',
    checklist: [],
    stageHistory: [
      { stage: 'booked', label: 'Booked', timestamp: '2026-10-20 12:00 PM' }
    ],
    beforePhotos: [],
    afterPhotos: [],
    paymentStatus: 'unpaid',
    paymentMethod: 'pending',
    subtotal: 3198,
    discount: 0,
    tax: 576,
    totalAmount: 3774,
    paidAmount: 0,
    invoiceNumber: 'INV-2026-0848',
    isDelayed: false,
    createdAt: '2026-10-20T12:00:00Z'
  }
];

export const DEMO_ANALYTICS = {
  weeklyRevenue: [
    { day: 'Mon', revenue: 14200, bookings: 7, completed: 7 },
    { day: 'Tue', revenue: 18450, bookings: 9, completed: 8 },
    { day: 'Wed', revenue: 16800, bookings: 8, completed: 8 },
    { day: 'Thu', revenue: 21900, bookings: 11, completed: 10 },
    { day: 'Fri', revenue: 26500, bookings: 13, completed: 12 },
    { day: 'Sat', revenue: 38200, bookings: 18, completed: 17 },
    { day: 'Sun', revenue: 42100, bookings: 21, completed: 20 },
  ],
  serviceDistribution: [
    { name: 'Full Detailing', count: 34, value: 187000, color: '#10b981' },
    { name: 'Premium Wash', count: 52, value: 62400, color: '#0d9488' },
    { name: 'Interior Deep Clean', count: 28, value: 84000, color: '#06b6d4' },
    { name: 'Express Wash', count: 68, value: 37400, color: '#6366f1' },
    { name: 'Ceramic Coating', count: 8, value: 144000, color: '#f59e0b' },
  ],
  vehicleTypeDistribution: [
    { type: 'SUV / Compact SUV', percentage: 48, count: 91 },
    { type: 'Sedan', percentage: 26, count: 49 },
    { type: 'Hatchback', percentage: 16, count: 31 },
    { type: 'Luxury / Supercar', percentage: 10, count: 19 },
  ],
  staffWorkload: [
    { name: 'Ramesh K.', activeJobs: 2, completedToday: 2, efficiency: '98%' },
    { name: 'Suresh B.', activeJobs: 1, completedToday: 3, efficiency: '95%' },
    { name: 'Farooq M.', activeJobs: 2, completedToday: 2, efficiency: '92%' },
    { name: 'Venkat R.', activeJobs: 2, completedToday: 4, efficiency: '96%' },
  ]
};
