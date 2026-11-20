import React from 'react';
import { ChevronDown } from 'lucide-react';
import back from '../img/back.jpg';

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#18181A]">
      {/* Фоновое историческое изображение */}
      <div className="absolute inset-0 z-0">
        <img src={back} alt="Архивное фото" className="w-full h-full object-cover opacity-40 scale-105 transition-transform duration-1000" />
        {/* Затемнение для читаемости текста */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Контент обложки */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#B89658]/40 bg-[#5B1921]/30 backdrop-blur-md">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89658] font-medium">
            Интерактивный плакат
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F7F4EE] tracking-wide mb-6 leading-tight drop-shadow-lg">
          ДОЧЕРИ ОТЕЧЕСТВА<br />
          <span className="text-[#D4AF37]">КРАСНОГО БЕРЕГА</span>
        </h1>

        <p className="text-lg sm:text-xl text-[#F7F4EE]/80 font-light tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed">
          Женские судьбы. История подвига. Память поколений
        </p>

        <div className="flex items-center justify-center">
          <button
            onClick={onExplore}
            className="px-8 py-4 bg-[#5B1921] hover:bg-[#72202A] text-[#F7F4EE] border border-[#B89658]/50 rounded font-medium tracking-wider transition-all shadow-lg hover:shadow-[#5B1921]/50 group flex items-center space-x-2"
          >
            <span>Исследовать историю</span>
            <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Индикатор прокрутки вниз */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer" onClick={onExplore}>
        <span className="text-[10px] uppercase tracking-widest text-[#B89658] mb-2">Листайте вниз</span>
        <div className="w-5 h-9 rounded-full border-2 border-[#B89658]/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#B89658] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};