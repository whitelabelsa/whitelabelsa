
import React, { useState } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAdminAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    if (!email || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await login(email, password);
      // Logic handled by parent component re-render on success
      if (!result.success) {
        setError(result.error === 'Invalid login credentials' 
          ? 'بيانات الدخول غير صحيحة' 
          : result.error || 'حدث خطأ أثناء تسجيل الدخول');
      }
    } catch (err) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 flex items-center justify-center p-4 font-cairo relative overflow-hidden" dir="rtl">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-accent/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative z-10"
      >
        <div className="h-2 bg-gradient-to-r from-teal-primary via-teal-500 to-gold-accent"></div>
        
        <div className="p-8 pb-6 text-center border-b border-gray-100">
           <img src="https://horizons-cdn.hostinger.com/d8df565e-7657-4982-9163-6bb9593a16cd/74481e4b0ad84f5ff175d2cbca858f28.png" alt="Logo" className="h-14 mx-auto mb-6 drop-shadow-sm" />
           <h1 className="text-2xl font-bold text-gray-800">بوابة المسؤول</h1>
           <p className="text-gray-500 mt-2 text-sm">مرحباً بعودتك، يرجى تسجيل الدخول للمتابعة</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: error ? 'auto' : 0, opacity: error ? 1 : 0 }}
              className="overflow-hidden"
            >
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm border border-red-100 shadow-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{error}</span>
                </div>
              )}
            </motion.div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block mr-1">البريد الإلكتروني / اسم المستخدم</label>
              <div className="relative group">
                <User className="absolute right-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-teal-primary transition-colors" />
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-teal-primary transition-all shadow-sm"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block mr-1">كلمة المرور</label>
              <div className="relative group">
                <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-teal-primary transition-colors" />
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-teal-primary transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-teal-primary to-teal-700 hover:from-teal-800 hover:to-teal-900 text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري التحقق...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>تسجيل الدخول</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
