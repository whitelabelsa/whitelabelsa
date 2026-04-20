import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BlogPage from './pages/BlogPage';
import BlogPostDetail from './pages/BlogPostDetail';
import ContactPage from './pages/ContactPage';

import DashboardPage from './pages/DashboardPage';

import CustomerLoginPage from './pages/CustomerLoginPage';
import CustomerRegisterPage from './pages/CustomerRegisterPage';
import CustomerDashboard from './pages/CustomerDashboard';
import CustomerProfilePage from './pages/CustomerProfilePage';
import CustomerOrdersPage from './pages/CustomerOrdersPage';
import CustomerMessagesPage from './pages/CustomerMessagesPage';
import EmailConfirmedPage from './pages/EmailConfirmedPage';

import ProtectedCustomerRoute from './components/ProtectedCustomerRoute';

import { supabase } from '@/lib/customSupabaseClient';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import { CustomerAuthProvider } from '@/contexts/CustomerAuthContext';

import useScrollToTop from '@/hooks/useScrollToTop';

function App() {
  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log("Verifying Supabase connection...");
        const { error } = await supabase
          .from('blog_posts')
          .select('count')
          .limit(1);

        if (error && error.code !== '42P01') {
          console.error("Supabase connection error:", error);
        } else {
          console.log("Supabase connection established.");
        }
      } catch (e) {
        console.error("Unexpected error:", e);
      }
    };

    checkConnection();
  }, []);

  return (
    <AdminAuthProvider>
      <CustomerAuthProvider>
        <Router>
          <AppContent />
        </Router>
      </CustomerAuthProvider>
    </AdminAuthProvider>
  );
}

const AppContent = () => {
  useScrollToTop();

  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
      <Route path="/service/:id" element={<Layout><ServiceDetailPage /></Layout>} />
      <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
      <Route path="/blog/:id" element={<Layout><BlogPostDetail /></Layout>} />
      <Route path="/contact" element={<Layout><ContactPage /></Layout>} />

      {/* ================= ADMIN ================= */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* ================= CUSTOMER AUTH ================= */}
      <Route path="/customer-login" element={<CustomerLoginPage />} />
      <Route path="/customer-register" element={<CustomerRegisterPage />} />
      <Route path="/email-confirmed" element={<EmailConfirmedPage />} />

      {/* ================= CUSTOMER DASHBOARD ================= */}
      <Route
        path="/customer-dashboard"
        element={
          <ProtectedCustomerRoute>
            <CustomerDashboard />
          </ProtectedCustomerRoute>
        }
      />

      <Route
        path="/customer-profile"
        element={
          <ProtectedCustomerRoute>
            <CustomerProfilePage />
          </ProtectedCustomerRoute>
        }
      />

      <Route
        path="/customer-orders"
        element={
          <ProtectedCustomerRoute>
            <CustomerOrdersPage />
          </ProtectedCustomerRoute>
        }
      />

      <Route
        path="/customer-messages"
        element={
          <ProtectedCustomerRoute>
            <CustomerMessagesPage />
          </ProtectedCustomerRoute>
        }
      />

    </Routes>
  );
};

export default App;
