# Glossy Gaadi — Digital Detailing Platform Demo (Hyderabad)

> **"Your car. Our care. Every step, visible."**  
> An interactive sales prototype built for presenting a proposed digital platform to the business owner of **Glossy Gaadi**, Hyderabad, Telangana.

---

## 🌟 Demo Highlights

- **Three Switchable Experiences (No Login Required)**:
  - **Owner / Admin Operations**: Executive dashboard, 9-stage workshop Kanban board, bookings management, customer CRM, staff workload allocations, and business analytics.
  - **Staff Floor Terminal**: Mobile-first workshop technician interface for logging pre-wash checkpoints, updating stage progress, attaching before/after photo proof, and flagging delays.
  - **Customer Portal**: Transparent booking wizard, live 9-stage order tracking with verified checkpoints, and print-ready digital invoices with payment simulation.
- **Hyderabad Market Context**: Seeded with local landmarks (Jubilee Hills Road No. 36, Banjara Hills, Gachibowli, Madhapur), realistic Indian vehicle models (Creta, Thar, Seltos, Nexon, BMW 330i), INR (₹) pricing, and GST tax lines.
- **Live Client-Side State Synchronization**: Moving a vehicle in the Workshop Board or Staff Terminal immediately updates the Customer Tracking page and executive dashboard counters.
- **Presenter Control Bar**: Direct stage-advancing controls on the customer tracking view so you can advance through stages during the sales pitch.
- **Reset Demo Button**: One-click restoration back to the initial seeded state.

---

## 🚀 Quick Start Instructions

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **npm** v9+

### 2. Install & Start Development Server

```bash
# Navigate to the project folder
cd "glossy gadi/demo"

# Install dependencies (already pre-installed)
npm install

# Start the Vite development server
npm run dev
```

Open your browser at:
👉 **[http://localhost:5173/](http://localhost:5173/)**

### 3. Production Build & Preview

```bash
# Verify TypeScript compilation and generate optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🗺️ Key Routes & Pitch Walkthrough

| Route | Role | Description |
|---|---|---|
| `/` | **Customer** | Studio homepage with transparent detailing workflow, packages, and quick tracking lookup. |
| `/book` | **Customer** | 7-step booking wizard with vehicle category pricing (Hatchback / Sedan / SUV / Luxury). |
| `/track/GG-1024` | **Customer** | **Flagship Demo**: 2023 Hyundai Creta with 9-stage live tracker, before/after photos, and presenter controls. |
| `/invoice/GG-1024`| **Customer** | Itemized tax invoice with browser print layout and payment status simulator. |
| `/admin/dashboard`| **Owner** | High-level KPIs (Today's bookings, Bay occupancy, Revenue), live workshop table, and Recharts graphs. |
| `/admin/jobs` | **Owner** | 9-bay Kanban workshop board with drag/advance controls and detailed checklist drawers. |
| `/admin/bookings` | **Owner** | Searchable booking directory with card/table views and modal booking creation. |
| `/admin/customers`| **Owner** | Customer CRM tracking vehicle garage records, lifetime spend, and visit history. |
| `/admin/services` | **Owner** | Live service catalogue editor with dynamic pricing and add-on toggling. |
| `/admin/staff` | **Owner** | Master detailer bay allocations, workload distribution, and job reassignment. |
| `/admin/reports` | **Owner** | Revenue trends, turnaround time efficiencies, vehicle segment distributions, and customer retention metrics. |
| `/staff` | **Staff** | Technician floor terminal with quick checklist check-offs and simulated camera uploads. |

---

## 🛠️ Technology Stack

- **React 18** with **TypeScript**
- **Vite** for fast hot-module reloading and optimized bundling
- **Tailwind CSS** for dark charcoal surfaces, clean cards, and electric emerald accents
- **React Router v7** for multi-view client routing
- **Lucide React** for automotive and UI iconography
- **Recharts** for executive analytics and operational charts
- **Client React Context** for synchronized demo state with instant reset capability

---

## ⚠️ Safety & Demo Boundary Disclaimer

- **100% Fictional Data**: All customer names, phone numbers, vehicle registrations, and revenue figures are fictional samples created solely for demonstration.
- **No External Integrations**: Does not connect to real payment gateways, SMS/WhatsApp gateways, external databases, or GPS hardware.
