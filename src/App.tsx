import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoProvider } from './context/DemoContext';

// Layouts
import { AdminLayout } from './components/layout/AdminLayout';
import { CustomerLayout } from './components/layout/CustomerLayout';

// Admin Pages
import { DashboardPage } from './pages/admin/DashboardPage';
import { BookingsPage } from './pages/admin/BookingsPage';
import { WorkshopPage } from './pages/admin/WorkshopPage';
import { CustomersPage } from './pages/admin/CustomersPage';
import { ServicesPage } from './pages/admin/ServicesPage';
import { StaffPage } from './pages/admin/StaffPage';
import { ReportsPage } from './pages/admin/ReportsPage';

// Staff Workspace Page
import { StaffWorkspacePage } from './pages/staff/StaffWorkspacePage';

// Customer Pages
import { HomePage } from './pages/customer/HomePage';
import { BookingWizardPage } from './pages/customer/BookingWizardPage';
import { TrackingPage } from './pages/customer/TrackingPage';
import { InvoicePage } from './pages/customer/InvoicePage';

export const App: React.FC = () => {
  return (
    <DemoProvider>
      <HashRouter>
        <Routes>
          {/* Customer Facing Routes (No Admin Sidebar) */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/book" element={<BookingWizardPage />} />
            <Route path="/track" element={<TrackingPage />} />
            <Route path="/track/:bookingId" element={<TrackingPage />} />
            <Route path="/invoice/:bookingId" element={<InvoicePage />} />
          </Route>

          {/* Staff Workspace Route */}
          <Route path="/staff" element={<StaffWorkspacePage />} />

          {/* Admin / Owner Operations Routes (With Admin Sidebar) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="jobs" element={<WorkshopPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </DemoProvider>
  );
};

export default App;
