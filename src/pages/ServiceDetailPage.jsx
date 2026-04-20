import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { servicesData } from '@/lib/data';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [service, setService] = useState(null);

  useEffect(() => {
    // 1. Try to get service from state (navigation)
    if (location.state?.service) {
      setService(location.state.service);
    } 
    // 2. Fallback: Find service by ID from local data
    else if (id) {
      const foundService = servicesData.find(s => s.id === id);
      if (foundService) {
        setService(foundService);
      }
    }
  }, [id, location.state]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">جاري تحميل الخدمة...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-cairo pb-20">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-primary/95 to-teal-secondary/70" />
        <div className="container relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">{service.title}</h1>
          <p className="text-xl text-gold-accent max-w-2xl mx-auto">{service.desc}</p>
        </div>
      </div>

      <div className="container py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/services')}
          className="text-gray-500 hover:text-teal-primary mb-8 p-0 hover:bg-transparent flex gap-2 items-center text-base"
        >
          <ArrowRight className="w-5 h-5" /> العودة للخدمات
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-teal-primary mb-6">تفاصيل الخدمة</h2>
              <p className="text-gray-700 text-lg leading-loose whitespace-pre-line">
                {service.fullContent || service.desc}
              </p>
            </div>

            <div className="bg-beige-light p-8 rounded-2xl border border-gray-100">
               <h3 className="text-teal-primary mb-6">مزايا الخدمة</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features && service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                       <CheckCircle className="w-5 h-5 text-gold-accent shrink-0" />
                       <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="bg-teal-primary text-white p-8 rounded-2xl sticky top-24 shadow-xl">
               <h3 className="text-white mb-4 text-2xl">هل أنت مهتم بهذه الخدمة؟</h3>
               <p className="text-gray-200 mb-8 text-lg leading-relaxed">
                 تواصل معنا اليوم لبدء التعاون والحصول على استشارة مجانية حول كيف يمكننا مساعدتك.
               </p>
               <Button 
                 onClick={() => navigate('/contact')}
                 className="w-full bg-gold-accent text-teal-primary hover:bg-white hover:text-teal-primary font-bold py-6 text-lg"
               >
                 اطلب استشارة مجانية <ArrowLeft className="w-5 h-5 mr-2" />
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;