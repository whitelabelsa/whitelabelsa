import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gradient-to-r from-teal-primary to-teal-secondary text-white text-center">
      <div className="container mx-auto px-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">ابدأ توسعك التجاري بثقة</h2>
            <p className="text-xl text-gold-accent mb-10 max-w-2xl mx-auto font-medium">
                انضم إلى مئات الشركات الناجحة التي اختارت منصتنا كشريك استراتيجي للنمو في التبادل التجاري بين السعودية ومصر.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/contact')}
              className="bg-gold-accent hover:bg-[#B5952F] text-teal-primary font-bold px-10 py-6 text-lg h-auto"
            >
                سجل الآن مجاناً
            </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;