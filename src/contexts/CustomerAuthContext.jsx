
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

const CustomerAuthContext = createContext(null);

export const CustomerAuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && session.user.email !== 'admin@example.com') {
          setCustomer(session.user);
          setIsAuthenticated(true);
        } else {
          setCustomer(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Customer session check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      // Ensure we don't accidentally log in the admin as a customer
      if (session?.user && session.user.email !== 'admin@example.com') {
        setCustomer(session.user);
        setIsAuthenticated(true);
      } else {
        setCustomer(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data?.user) {
        if (data.user.email === 'admin@example.com') {
           await supabase.auth.signOut();
           return { success: false, error: 'Access denied. Please use Admin Login.' };
        }
        setCustomer(data.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: 'No user data returned' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setCustomer(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <CustomerAuthContext.Provider value={{ isAuthenticated, customer, isLoading, login, logout }}>
      {children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = () => useContext(CustomerAuthContext);
