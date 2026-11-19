import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  scrollTo: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, scrollTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Главная' },
    { id: 'timeline', label: 'История' },
    { id: 'women', label: 'Женщины на войне' },
    { id: 'activities', label: 'Мероприятия' },
  ];

  const handleNavClick = (id: string) => {
    scrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#18181A]/90 backdrop-blur-md border-b border-[#B89658]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Логотип / Название */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="cursor-pointer flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 rounded border border-[#B89658]/40 flex items-center justify-center bg-[#5B1921]/20 text-[#B89658] font-serif text-lg font-bold group-hover:border-[#B89658] transition-colors">
            ДО
          </div>
          <div className="hidden sm:block">
            <span className="font-serif text-lg tracking-wider text-[#F7F4EE] block leading-tight">Дочери Отечества</span>
            <span className="text-xs text-[#B89658] tracking-widest uppercase">Красный Берег</span>
          </div>
        </div>

        {/* Навигация для ПК */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm tracking-wide transition-colors pb-1 border-b-2 ${
                activeSection === item.id
                  ? 'text-[#B89658] border-[#B89658]'
                  : 'text-[#F7F4EE]/80 border-transparent hover:text-[#F7F4EE]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Бургер-кнопка для мобильных */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#F7F4EE] hover:text-[#B89658] p-2"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобильное выпадающее меню */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#18181A] border-b border-[#B89658]/20 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left py-2 px-3 rounded text-base transition-colors ${
                activeSection === item.id
                  ? 'bg-[#5B1921]/30 text-[#B89658] font-medium'
                  : 'text-[#F7F4EE]/90 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};