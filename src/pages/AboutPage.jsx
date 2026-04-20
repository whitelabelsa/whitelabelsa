
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-beige-light">
      {/* Hero */}
      <div className="relative h-[400px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1654026995029-fee529d17f9f")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-primary/90 to-teal-secondary/80" />
        <div className="relative z-10 text-center text-white p-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            من نحن
          </motion.h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-gold-accent font-medium leading-relaxed">شريكك الاستراتيجي للتبادل التجاري بين السعودية ومصر</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-teal-primary">قصتنا</h2>
            <div className="space-y-6 text-gray-600 text-lg leading-[1.8]">
              <p>
                تأسست منصة "وايت ليبل" انطلاقاً من رؤية طموحة لتعزيز التبادل التجاري وتوطيد العلاقات الاقتصادية بين المملكة العربية السعودية وجمهورية مصر العربية. نحن ندرك حجم الفرص الكامنة في التكامل بين هذين الاقتصادين الكبيرين، ونسعى لتذليل العقبات التي تواجه المستثمرين ورواد الأعمال.
              </p>
              <p>
                فريقنا يجمع بين الخبرة العميقة في الأنظمة والقوانين التجارية في كلا البلدين، وشبكة علاقات واسعة، مما يمكننا من تقديم حلول عملية وفعالة لعملائنا.
              </p>
            </div>
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-gold-accent hover:bg-[#B5952F] text-teal-primary font-bold mt-4 text-base px-8 py-3 h-auto"
            >
                تواصل معنا
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white p-8 rounded-xl border-r-4 border-teal-primary shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Target className="w-8 h-8 text-gold-accent" />
                <h3 className="text-teal-primary m-0">رسالتنا</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">تمكين التجار وروّاد الأعمال من التوسع بثقة عبر حلول تبادل تجاري متكاملة وآمنة.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border-r-4 border-gold-accent shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Eye className="w-8 h-8 text-teal-primary" />
                <h3 className="text-teal-primary m-0">رؤيتنا</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">أن نكون المنصة الأولى والمرجع الموثوق للتبادل التجاري بين السعودية ومصر بحلول عام 2030.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container text-center">
          <h2 className="mb-16 text-teal-primary">قيمنا الجوهرية</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "الثقة", icon: Award },
              { title: "الاحترافية", icon: Target },
              { title: "الشفافية", icon: Eye },
              { title: "الشراكة", icon: Target }
            ].map((val, idx) => (
              <div key={idx} className="bg-beige-light p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-20 h-20 bg-teal-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <val.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-teal-primary m-0">{val.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Partnership Image Section */}
      <section className="py-16 bg-beige-light">
          <div className="container">
              <div className="rounded-2xl overflow-hidden shadow-xl h-[400px] relative">
                  <img src="https://images.unsplash.com/photo-1696919119335-42ece0cec9d4" alt="Strategic Partnership" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-teal-primary/40 flex items-center justify-center p-6 text-center">
                      <h2 className="text-[#fbbf24] drop-shadow-lg leading-tight max-w-4xl font-extrabold text-4xl">للتبادل التجاري بين السعودية ومصر</h2>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default AboutPage;
