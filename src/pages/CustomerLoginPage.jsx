
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomerAuth } from '@/contexts/CustomerAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const CustomerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useCustomerAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "جاري تحويلك للوحة التحكم...",
          className: "bg-green-50 border-green-200"
        });
        navigate('/customer-dashboard');
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: result.error || "تأكد من صحة البيانات المدخلة",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "خطأ غير متوقع",
        description: "حدث خطأ أثناء الاتصال بالخادم",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige-light flex items-center justify-center p-4 font-cairo" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100"
      >
        <div className="p-8 pb-6 text-center bg-teal-primary text-white">
           <h1 className="text-2xl font-bold">بوابة العملاء</h1>
           <p className="text-teal-100 mt-2 text-sm">أهلاً بك في منصة وايت ليبل</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-teal-primary transition-all"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-teal-primary transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-gold-accent hover:bg-[#B5952F] text-teal-primary font-bold text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'تسجيل الدخول'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button variant="link" onClick={() => navigate('/')} className="text-teal-600 gap-2">
              <ArrowLeft size={16} />
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerLoginPage;
