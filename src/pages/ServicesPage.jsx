import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { servicesData } from '@/lib/data';

const ServicesPage = () => {
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    navigate(`/service/${service.id}`, { state: { service } });
  };

  return (
    <div className="bg-beige-light min-h-screen py-16 md:py-20">
      <div className="container">
        <div className="text-center mb-20 px-4">
          <h1 className="text-teal-primary mb-6">خدماتنا المتكاملة</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">نوفر باقة خدمات متكاملة مصممة خصيصًا لدعم التجار والمستثمرين في السعودية ومصر، وتسهيل عمليات التبادل التجاري بكل أمان ووضوح.</p>
        </div>
        
        {/* The requested heading has been removed from here */}

        <div className="grid grid-cols-1 gap-12">
          {servicesData.map((service, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-center border border-gray-100 hover:shadow-md transition-shadow">
              <div className="md:w-1/2 order-2 md:order-1">
                <div className="w-14 h-14 bg-teal-primary text-white rounded-xl flex items-center justify-center font-bold text-2xl mb-6">
                  {idx + 1}
                </div>
                <h2 className="text-teal-primary mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">{service.desc}</p>
                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-4 text-base text-gray-700">
                      <div className="w-6 h-6 rounded-full bg-gold-accent/20 flex items-center justify-center text-gold-accent shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                    <Button 
                      onClick={() => handleServiceClick(service)}
                      className="bg-gold-accent hover:bg-[#B5952F] text-teal-primary font-bold text-base px-6 py-3 h-auto"
                    >
                      اطلب الخدمة <ArrowLeft className="w-5 h-5 mr-2" />
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleServiceClick(service)}
                      className="border-teal-primary text-teal-primary hover:bg-teal-primary hover:text-white text-base px-6 py-3 h-auto"
                    >
                        تفاصيل أكثر
                    </Button>
                </div>
              </div>
              <div 
                className="md:w-1/2 rounded-xl h-72 md:h-auto w-full min-h-[300px] bg-cover bg-center shadow-md order-1 md:order-2"
                style={{ backgroundImage: `url(${service.image})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;