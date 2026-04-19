import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      <motion.a
        href="https://wa.me/966532860020"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        className="bg-teal-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center border-2 border-white/20"
        aria-label="تواصل عبر واتساب"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      <motion.a
        href="tel:+966565968771"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        className="bg-teal-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center border-2 border-white/20"
        aria-label="اتصل بنا"
      >
        <Phone className="w-6 h-6" />
      </motion.a>
    </div>
  );
};

export default FloatingButtons;