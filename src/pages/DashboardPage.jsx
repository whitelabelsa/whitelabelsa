
import React from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminDashboard from './AdminDashboard';
import AdminLoginPage from './AdminLoginPage';
import { Loader2 } from 'lucide-react';

const DashboardPage = () => {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <Loader2 className="w-8 h-8 animate-spin text-teal-primary" />
      </div>
    );
  }

  return isAuthenticated ? <AdminDashboard /> : <AdminLoginPage />;
};

export default DashboardPage;
