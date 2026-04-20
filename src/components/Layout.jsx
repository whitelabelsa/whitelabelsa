
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingButtons from './FloatingButtons';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navItems = [{
    name: 'الرئيسية',
    path: '/'
  }, {
    name: 'من نحن',
    path: '/about'
  }, {
    name: 'الخدمات',
    path: '/services'
  }, {
    name: 'المدونة',
    path: '/blog'
  }, {
    name: 'تواصل معنا',
    path: '/contact'
  }];

  const isActive = path => location.pathname === path;

  return (
    <header className="sticky top-0 w-full z-40 bg-teal-primary border-b border-teal-secondary shadow-md">
      <div className="container h-24 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105 duration-200">
           <img src="https://horizons-cdn.hostinger.com/d8df565e-7657-4982-9163-6bb9593a16cd/74481e4b0ad84f5ff175d2cbca858f28.png" alt="White Label Logo" className="h-[48px] md:h-[60px] w-auto object-contain drop-shadow-md" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`text-base font-medium transition-colors px-2 py-1 hover:text-gold-accent flex items-center gap-2 ${isActive(item.path) ? 'text-gold-accent font-bold' : 'text-white'}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:text-gold-accent hover:bg-white/10">
            <Globe className="w-6 h-6" />
          </Button>
          <Link to="/contact">
            <Button className="bg-gold-accent hover:bg-[#B5952F] text-teal-primary font-bold text-base px-6 py-2 h-auto">ابدأ الآن</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-white hover:text-gold-accent" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} className="md:hidden overflow-hidden bg-teal-primary border-t border-teal-secondary shadow-xl">
            <nav className="flex flex-col p-6 space-y-6">
              {navItems.map(item => <Link key={item.path} to={item.path} className={`text-lg font-medium block p-2 ${isActive(item.path) ? 'text-gold-accent' : 'text-white'}`} onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>)}
              <div className="pt-6 border-t border-teal-secondary">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gold-accent hover:bg-[#B5952F] text-teal-primary font-bold text-lg h-12">ابدأ الآن</Button>
                </Link>
              </div>
            </nav>
          </motion.div>}
      </AnimatePresence>
    </header>
  );
};
const Footer = () => {
  return <footer className="bg-[#0f3a2e] text-white py-16 border-t border-teal-secondary">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-6">
            {/* Footer Logo */}
            <Link to="/" className="inline-block">
               <img src="https://horizons-cdn.hostinger.com/d8df565e-7657-4982-9163-6bb9593a16cd/74481e4b0ad84f5ff175d2cbca858f28.png" alt="White Label Logo" className="h-[50px] w-auto object-contain" />
            </Link>
            <p className="text-gray-300 text-base leading-relaxed mt-2">منصة سعودية رائدة تسهّل التبادل التجاري والتصنيع بين المملكة العربية السعودية وجمهورية مصر العربية.
          </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-gold-accent">روابط سريعة</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors text-base">من نحن</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors text-base">خدماتنا</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors text-base">المدونة</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-base">تواصل معنا</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-gold-accent">الخدمات</h4>
            <ul className="space-y-4">
              <li className="text-gray-300 text-base">الاستيراد والتصدير</li>
              <li className="text-gray-300 text-base">الوساطة التجارية</li>
              <li className="text-gray-300 text-base">الاستشارات القانونية</li>
              <li className="text-gray-300 text-base">دراسات الجدوى</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-gold-accent">تواصل معنا</h4>
            <ul className="space-y-4 text-base text-gray-300">
              <li>2165 حى العقيق ,عبدالعزيز بن عبدالمنعم ,الرياض</li>
              <li>
                <a href="mailto:hello@whitelabel.com.sa" className="hover:text-gold-accent transition-colors">
                  hello@whitelabel.com.sa
                </a>
              </li>
              <li>
                <a href="tel:+966565968771" className="hover:text-gold-accent transition-colors">
                  +966 56 596 8771
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-teal-secondary text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} White Label. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>;
};
const Layout = ({
  children
}) => {
  return <div className="min-h-screen flex flex-col bg-beige-light font-cairo" dir="rtl">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
      <Toaster />
    </div>;
};
export default Layout;
