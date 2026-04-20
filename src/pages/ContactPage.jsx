
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Phone, Mail, Clock, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Starting contact form submission...");

    // Basic Validation
    if (!formData.email || !formData.message || !formData.name) {
       toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة (الاسم، البريد الإلكتروني، والرسالة).",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    try {
      // 1. Call Edge Function for Email
      console.log("Invoking send-contact-email function...");
      const { data, error: functionError } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (functionError) {
        console.error("Function Invocation Error:", functionError);
        throw new Error(`خطأ في الاتصال: ${functionError.message}`);
      }

      if (data && !data.success) {
        console.error("Email Sending API Error:", data.error);
        throw new Error(data.error || "فشل إرسال البريد الإلكتروني");
      }

      console.log("Email sent successfully:", data);

      // 2. Also save to Supabase Database for admin dashboard history
      const { error: dbError } = await supabase.from('contacts').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `${formData.subject ? `[${formData.subject}] ` : ''}${formData.message}`
      }]);
      
      if (dbError) {
        console.warn("Database Save Warning (non-fatal):", dbError);
      }

      toast({
        title: "تم الإرسال بنجاح",
        description: "شكراً لتواصلك معنا، تم استلام رسالتك وسنرد عليك قريباً.",
        className: "bg-teal-primary text-white"
      });
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    } catch (err) {
      console.error('Submission error details:', err);
      
      let errorMsg = "حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.";
      
      // Customize error message for users if possible
      if (err.message.includes("SendGrid Error")) {
        errorMsg = "خطأ في خدمة البريد الإلكتروني. يرجى التواصل معنا عبر الهاتف.";
      } else if (err.message.includes("Email address is required")) {
        errorMsg = "البريد الإلكتروني مطلوب.";
      }

      toast({
        title: "خطأ",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-16 md:py-20">
      <div className="container">
        {/* Banner Image */}
        <div className="w-full h-72 md:h-80 rounded-2xl overflow-hidden mb-16 shadow-lg relative">
            <img src="https://images.unsplash.com/photo-1687155883164-961235e1b7e5" alt="Contact Us" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-teal-primary/60 flex items-center justify-center">
                <h1 className="text-white drop-shadow-lg text-4xl font-bold">تواصل معنا</h1>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-teal-primary mb-6">نسعد بخدمتك والرد على جميع استفساراتك</h2>
              <p className="text-gray-600 text-lg leading-relaxed">نحن هنا للإجابة على استفساراتك ومساعدتك في بدء رحلة نجاحك.</p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-teal-primary rounded-xl flex items-center justify-center text-white shrink-0">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-teal-primary mb-2">المقر الرئيسي</h3>
                  <p className="text-gray-600 text-base">2165 حى العقيق ,عبدالعزيز بن عبدالمنعم ,الرياض</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-teal-primary rounded-xl flex items-center justify-center text-white shrink-0">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-teal-primary mb-2">اتصل بنا</h3>
                  <a href="tel:+966565968771" className="text-gray-600 block hover:text-teal-primary transition-colors text-base">+966 56 596 8771</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-teal-primary rounded-xl flex items-center justify-center text-white shrink-0">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-teal-primary mb-2">البريد الإلكتروني</h3>
                  <a href="mailto:hello@whitelabel.com.sa" className="text-gray-600 block hover:text-teal-primary transition-colors text-base">hello@whitelabel.com.sa</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-teal-primary rounded-xl flex items-center justify-center text-white shrink-0">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-teal-primary mb-2">ساعات العمل</h3>
                  <p className="text-gray-600 text-base">الأحد - الخميس: 9:00 ص - 5:00 م</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-beige-light p-10 rounded-2xl border border-gray-100 shadow-md">
            <h2 className="mb-8 text-teal-primary">أرسل لنا رسالة</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-medium mb-2 text-teal-primary">الاسم</label>
                  <Input 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="الاسم الكامل"
                    className="bg-white border-gray-200 focus:border-teal-primary"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-2 text-teal-primary">رقم الهاتف</label>
                  <Input 
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+966..." 
                    className="bg-white border-gray-200 focus:border-teal-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-base font-medium mb-2 text-teal-primary">البريد الإلكتروني</label>
                <Input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="name@example.com" 
                  className="bg-white border-gray-200 focus:border-teal-primary"
                />
              </div>
              <div>
                <label className="block text-base font-medium mb-2 text-teal-primary">الموضوع</label>
                <Input 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="موضوع الرسالة" 
                  className="bg-white border-gray-200 focus:border-teal-primary"
                />
              </div>
              <div>
                <label className="block text-base font-medium mb-2 text-teal-primary">الرسالة</label>
                <textarea 
                  required
                  className="flex min-h-[140px] w-full rounded-md border border-gray-200 focus:border-teal-primary bg-white px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="كيف يمكننا مساعدتك؟" 
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gold-accent hover:bg-[#B5952F] text-teal-primary font-bold text-base h-12"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : 'إرسال الرسالة'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
