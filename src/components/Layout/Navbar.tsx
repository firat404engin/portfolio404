"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiHome4Line, RiUser3Line, RiCodeLine, RiMailLine } from 'react-icons/ri';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const navItems = [
    { id: 'home', icon: RiHome4Line, label: 'Ana Sayfa' },
    { id: 'about', icon: RiUser3Line, label: 'Hakkımda' },
    { id: 'projects', icon: RiCodeLine, label: 'Projeler' },
    { id: 'contact', icon: RiMailLine, label: 'İletişim' },
  ];

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-2 p-2 backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`relative group flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeSection === id
                ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">{label}</span>
            {activeSection === id && (
              <motion.div
                layoutId="activeNav"
                className="absolute inset-0 border-2 border-emerald-500 rounded-xl"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar; 