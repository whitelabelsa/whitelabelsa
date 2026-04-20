
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HeartHandshake as Handshake, TrendingUp, CheckCircle, Ship, Truck, Target, Eye, FileText, ClipboardList, Building2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const HomePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    businessField: '',
    phone: '',
    email: ''
  });
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    console.log("Starting Registration submission...");

    try {
      if (!formData.companyName || !formData.email || !formData.phone) {
        throw new Error('يرجى ملء جميع الحقول المطلوبة');
      }

      // Invoke Edge Function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
          body: { ...formData, subject: 'New Company Registration', message: `Registration for ${formData.companyName} in ${formData.businessField}` }
      });

      if (error) throw new Error(`Network Error: ${error.message}`);
      if (data && !data.success) throw new Error(data.error);

      toast({
        title: "تم التسجيل بنجاح",
        description: "شكراً لتسجيلك، سنتواصل معك قريباً.",
        variant: "default",
        className: "bg-teal-primary text-white"
      });
      setFormData({
        companyName: '',
        country: '',
        businessField: '',
        phone: '',
        email: ''
      });
    } catch (err) {
      console.error("Registration Error:", err);
      toast({
        title: "خطأ",
        description: err.message || "حدث خطأ أثناء التسجيل",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async e => {
    e.preventDefault();
    setContactLoading(true);
    console.log("Starting Homepage Contact submission...");

    try {
       // Validate
       if (!contactData.email || !contactData.message) {
         throw new Error("البريد الإلكتروني والرسالة مطلوبان");
       }

       // Using the new edge function
       const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: { ...contactData, phone: 'N/A', subject: 'Contact from Homepage' }
      });
      
      if (error) throw new Error(`Network Error: ${error.message}`);
      if (data && !data.success) throw new Error(data.error || "Failed to send email");

      toast({
        title: "تم الإرسال بنجاح",
        description: "شكراً لتواصلك معنا، سنرد عليك قريباً.",
        variant: "default",
        className: "bg-teal-primary text-white"
      });
      setContactData({
        name: '',
        email: '',
        message: ''
      });
    } catch (err) {
      console.error("Homepage Contact Error:", err);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الإرسال. يرجى التأكد من البيانات والمحاولة مجدداً.",
        variant: "destructive"
      });
    } finally {
      setContactLoading(false);
    }
  };

  return <div className="flex flex-col gap-0 bg-beige-light font-cairo" dir="rtl">
      
      {/* 1. Hero Banner */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1584869032754-58d2d1d28aa1")'
      }} />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-primary/95 via-teal-primary/80 to-teal-secondary/60 z-10" />
        
        <div className="container relative z-20 text-white text-center max-w-4xl px-6">
          <motion.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="mb-6 inline-block bg-white/10 px-4 py-2 rounded-full text-gold-accent text-sm font-semibold backdrop-blur-sm border border-gold-accent/20">
            رؤية 2030 – نحو تجارة بلا حدود
          </motion.div>
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="mb-8 font-extrabold drop-shadow-md mx-auto">
            <span className="block text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-3">
              المنصة الأولى
            </span>
            <span className="block text-[#d3af37] text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug">
              للتبادل التجاري بين السعودية ومصر
            </span>
          </motion.h1>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2,
          duration: 0.8
        }} className="text-lg md:text-xl mb-12 text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed">
            اطلب أي منتج من مصر أو صنّعه حسب متطلباتك الخاصة. نسهّل عليك الاستيراد والتصنيع بحلول تجارية متكاملة، ودفع آمن داخل المملكة، وجودة مضمونة من المصدر.
          </motion.p>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4,
          duration: 0.8
        }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/contact')} className="bg-gold-accent text-teal-primary hover:bg-[#B5952F] text-base font-bold">
              اطلب منتجك الان
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/contact')} className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-primary text-base font-bold">
              تواصل معنا
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. Statistics Section */}
      <section className="py-12 -mt-20 relative z-30 container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-teal-primary rounded-2xl shadow-xl p-8 border border-teal-secondary relative overflow-hidden">
          {[{
          number: "+500",
          label: "شريك موثوق"
        }, {
          number: "+1,200",
          label: "فرصة تجارية"
        }, {
          number: "2",
          label: "أسواق إقليمية"
        }, {
          number: "24/7",
          label: "دعم مستمر"
        }].map((stat, idx) => <motion.div key={idx} initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} className="text-center relative z-10 group hover:-translate-y-1 transition-transform duration-300">
              <div className="text-[2rem] md:text-[2.5rem] font-bold text-gold-accent mb-2 leading-none">{stat.number}</div>
              <p className="text-white font-medium text-base">{stat.label}</p>
            </motion.div>)}
        </div>
      </section>

      {/* 3. About Us Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="space-y-6">
              <span className="text-gold-accent font-bold text-lg block mb-2">من نحن</span>
              <h2 className="text-teal-primary mb-4">المنصة الرائده للتبادل التجاري بالمملكه</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                وايت ليبل منصة سعودية متخصصة في التبادل التجاري بين المملكة العربية السعودية وجمهورية مصر العربية. فكرتنا نسهّل على التاجر السعودي استيراد أو تصنيع أي منتج في مصر، مع دفع آمن داخل السعودية، وإجراءات واضحة من البداية للنهاية.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div className="flex gap-4 p-6 bg-beige-light rounded-lg border border-teal-secondary/10">
                  <div className="w-12 h-12 bg-teal-primary rounded-lg flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-gold-accent" />
                  </div>
                  <div>
                    <h3 className="text-teal-primary mb-2">رسالتنا</h3>
                    <p className="text-sm text-gray-600">تسهيل التبادل التجاري بثقة وأمان.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-6 bg-beige-light rounded-lg border border-teal-secondary/10">
                  <div className="w-12 h-12 bg-teal-primary rounded-lg flex items-center justify-center shrink-0">
                    <Eye className="w-6 h-6 text-gold-accent" />
                  </div>
                  <div>
                    <h3 className="text-teal-primary mb-2">رؤيتنا</h3>
                    <p className="text-sm text-gray-600">أن نكون المنصة الرائدة للتبادل التجاري بين السعودية ومصر.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1561475699-d6dc71581653" alt="Business Partnership" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-teal-primary/20 hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. What We Offer Section */}
      <section className="py-16 md:py-20 bg-beige-light">
        <div className="container">
          <div className="text-center mb-16 px-4">
            <span className="text-gold-accent font-bold mb-2 block text-lg">خدماتنا</span>
            <h2 className="text-teal-primary mb-6">حلول متكاملة لنمو أعمالك</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">نوفر مجموعة خدمات مصممة خصيصًا لتسهيل عمليات الاستيراد والتصنيع والتبادل التجاري بكل احترافية</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
             {/* Service 1 */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} whileHover={{
            y: -5
          }} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-primary rounded-xl flex items-center justify-center mb-6 shadow-md text-white">
                <Ship className="w-8 h-8" />
              </div>
              <h3 className="mb-4 text-teal-primary">استيراد المنتجات</h3>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">نستورد لك المنتجات من مصر وندير العملية كاملة من المصنع حتى وصولها لك داخل المملكة.</p>
              <Button variant="link" onClick={() => navigate('/services')} className="text-teal-primary font-bold mt-auto hover:text-gold-accent p-0 text-base">
                اطلب الخدمة &larr;
              </Button>
            </motion.div>

            {/* Service 2 */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.1
          }} whileHover={{
            y: -5
          }} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-primary rounded-xl flex items-center justify-center mb-6 shadow-md text-white">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="mb-4 text-teal-primary">التصنيع حسب الطلب</h3>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">نصنّع لك المنتج حسب المواصفات والكميات اللي تحتاجها بالتعاون مع مصانع مصرية معتمدة.</p>
              <Button variant="link" onClick={() => navigate('/services')} className="text-teal-primary font-bold mt-auto hover:text-gold-accent p-0 text-base">
                اطلب الخدمة &larr;
              </Button>
            </motion.div>

            {/* Service 3 */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.2
          }} whileHover={{
            y: -5
          }} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-primary rounded-xl flex items-center justify-center mb-6 shadow-md text-white">
                <Handshake className="w-8 h-8" />
              </div>
              <h3 className="mb-4 text-teal-primary">التبادل التجاري</h3>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">نفتح لك فرص تبادل تجاري موثوقة تساعدك توسّع نشاطك بين السوق السعودي والمصري.</p>
              <Button variant="link" onClick={() => navigate('/services')} className="text-teal-primary font-bold mt-auto hover:text-gold-accent p-0 text-base">
                اطلب الخدمة &larr;
              </Button>
            </motion.div>

             {/* Service 4 */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.3
          }} whileHover={{
            y: -5
          }} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-primary rounded-xl flex items-center justify-center mb-6 shadow-md text-white">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="mb-4 text-teal-primary">الوساطة التجارية</h3>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">نربطك بموردين ومصانع موثوقة ونضمن اتفاقيات واضحة ومربحة للطرفين.</p>
              <Button variant="link" onClick={() => navigate('/services')} className="text-teal-primary font-bold mt-auto hover:text-gold-accent p-0 text-base">
                اطلب الخدمة &larr;
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Process Section */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <span className="text-gold-accent font-bold mb-2 block text-lg">كيف نعمل</span>
            <h2 className="text-teal-primary mb-6">خطوات بسيطة لتجارة مضمونة</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gray-200 z-0 mx-16" />

            {[{
            icon: FileText,
            title: "1. إدخال البيانات",
            desc: "عبّي بياناتك الأساسية بسهولة."
          }, {
            icon: ClipboardList,
            title: "2. التواصل",
            desc: "يتواصل معك أحد خبرائنا لفهم طلبك."
          }, {
            icon: Handshake,
            title: "3. العينة",
            desc: "نوفر لك عينة من المنتج قبل التنفيذ."
          }, {
            icon: CheckCircle,
            title: "4. الاستلام",
            desc: "استلم منتجك النهائي بكل أمان."
          }].map((step, idx) => <motion.div key={idx} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: idx * 0.2
          }} className="relative z-10 text-center group px-4">
                <div className="w-24 h-24 bg-white border-4 border-teal-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-10 h-10 text-teal-primary" />
                </div>
                <h3 className="text-teal-primary mb-3">{step.title}</h3>
                <p className="text-gray-600 text-base">{step.desc}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* 6. Registration Form Section */}
      <section className="py-16 md:py-20 bg-teal-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-5/12 bg-gold-accent p-10 flex flex-col justify-center text-teal-primary relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1671190364105-350df407f834")'
            }} />
              <h3 className="text-[1.75rem] font-bold mb-6 relative z-10">انضم إلينا اليوم</h3>
              <p className="mb-8 opacity-90 font-medium text-lg relative z-10 leading-relaxed">سجّل معنا واستفد من شبكة علاقات قوية وفرص تجارية حصرية بين السعودية ومصر.</p>
              <ul className="space-y-4 text-base font-medium relative z-10">
                <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6" /> وصول مباشر للمصانع</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6" /> دفع آمن داخل السعودية</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6" /> دعم واستشارات مستمرة.</li>
              </ul>
            </div>
            
            <div className="md:w-7/12 p-8 md:p-10 bg-white">
              <div className="mb-8">
                <h3 className="text-teal-primary mb-2">تسجيل شركة جديدة</h3>
                <p className="text-gray-500 text-sm">أكمل البيانات التالية لإنشاء حساب شركتك</p>
              </div>
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-bold mb-2 text-teal-primary">اسم الشركة</label>
                    <Input required value={formData.companyName} onChange={e => setFormData({
                    ...formData,
                    companyName: e.target.value
                  })} placeholder="أدخل اسم الشركة" className="bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-base font-bold mb-2 text-teal-primary">الدولة</label>
                    <select className="w-full h-11 rounded-md border border-gray-300 focus:border-teal-primary bg-gray-50 px-3 py-2 text-base text-slate-900 outline-none" value={formData.country} onChange={e => setFormData({
                    ...formData,
                    country: e.target.value
                  })} required>
                      <option value="">اختر الدولة</option>
                      <option value="saudi">المملكة العربية السعودية</option>
                      <option value="egypt">جمهورية مصر العربية</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-bold mb-2 text-teal-primary">مجال النشاط</label>
                  <select className="w-full h-11 rounded-md border border-gray-300 focus:border-teal-primary bg-gray-50 px-3 py-2 text-base text-slate-900 outline-none" value={formData.businessField} onChange={e => setFormData({
                  ...formData,
                  businessField: e.target.value
                })} required>
                    <option value="">اختر المجال</option>
                    <option value="agriculture">الزراعة</option>
                    <option value="industrial">الصناعة</option>
                    <option value="logistics">الخدمات اللوجستية</option>
                    <option value="trade">التجارة العامة</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-bold mb-2 text-teal-primary">رقم الهاتف</label>
                    <Input type="tel" required value={formData.phone} onChange={e => setFormData({
                    ...formData,
                    phone: e.target.value
                  })} placeholder="+966..." className="bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-base font-bold mb-2 text-teal-primary">البريد الإلكتروني</label>
                    <Input type="email" required value={formData.email} onChange={e => setFormData({
                    ...formData,
                    email: e.target.value
                  })} placeholder="email@company.com" className="bg-gray-50" />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-teal-primary hover:bg-teal-secondary text-white mt-2 font-bold h-12 text-lg shadow-lg hover:shadow-xl transition-all">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاري التسجيل...
                    </>
                  ) : 'تسجيل الشركة الآن'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Contact Us Section */}
      <section className="py-16 md:py-20 bg-beige-light">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-gold-accent font-bold mb-2 block text-lg">تواصل معنا</span>
            <h2 className="text-teal-primary mb-6">نحن هنا للإجابة على استفساراتك</h2>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
            <div>
              <h3 className="text-teal-primary mb-8">معلومات الاتصال</h3>
              <div className="space-y-8">
                 <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-teal-primary/10 rounded-lg flex items-center justify-center text-teal-primary shrink-0">
                     <Building2 className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="font-bold text-teal-primary mb-1">العنوان</h4>
                     <p className="text-gray-600 text-sm">2165 حى العقيق ,عبدالعزيز بن عبدالمنعم ,الرياض</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-teal-primary/10 rounded-lg flex items-center justify-center text-teal-primary shrink-0">
                     <FileText className="w-6 h-6" /> 
                   </div>
                   <div>
                     <h4 className="font-bold text-teal-primary mb-1">البريد الإلكتروني</h4>
                     <a href="mailto:hello@whitelabel.com.sa" className="text-gray-600 text-sm hover:text-teal-primary">hello@whitelabel.com.sa</a>
                   </div>
                 </div>

                 <div className="mt-8 pt-8 border-t border-gray-100">
                   <p className="text-gray-500 text-sm leading-relaxed">
                     فريق خدمة العملاء متاح للرد على استفساراتكم طوال أيام الأسبوع من الساعة 9 صباحاً وحتى 5 مساءً.
                   </p>
                 </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <Input placeholder="الاسم الكامل" value={contactData.name} onChange={e => setContactData({
                  ...contactData,
                  name: e.target.value
                })} className="bg-gray-50 border-gray-200" required />
                </div>
                <div>
                  <Input type="email" placeholder="البريد الإلكتروني" value={contactData.email} onChange={e => setContactData({
                  ...contactData,
                  email: e.target.value
                })} className="bg-gray-50 border-gray-200" required />
                </div>
                <div>
                  <textarea placeholder="اكتب رسالتك هنا..." value={contactData.message} onChange={e => setContactData({
                  ...contactData,
                  message: e.target.value
                })} className="flex min-h-[140px] w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900" required />
                </div>
                <Button type="submit" disabled={contactLoading} className="w-full bg-gold-accent hover:bg-[#B5952F] text-teal-primary font-bold text-base h-12">
                  {contactLoading ? (
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
      </section>

    </div>;
};
export default HomePage;
