import React, { useState, useEffect } from 'react';
import type { WomanData } from '../types';
import { Award, Shield, Clock, FileText, X, Image as ImageIcon } from 'lucide-react';

interface WomenSectionProps {
  women: WomanData[];
}

export const WomenSection: React.FC<WomenSectionProps> = ({ women }) => {
  const [activeWoman, setActiveWoman] = useState<WomanData | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveWoman(null);
      }
    };

    if (activeWoman) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Блокируем скролл основного сайта
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // Возвращаем скролл при закрытии
    };
  }, [activeWoman]);

  return (
    <section id="women" className="py-24 bg-[#18181A] text-[#F7F4EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок блока */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89658] block mb-3 font-medium">
            Пять судеб. Одна история мужества.
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F7F4EE] mb-4">
            Женщины на войне
          </h2>
          <div className="w-16 h-0.5 bg-[#B89658] mx-auto opacity-60" />
        </div>

        {/* Карточки женщин */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {women.map((woman) => (
            <div
              key={woman.id}
              onClick={() => setActiveWoman(woman)}
              className="group cursor-pointer bg-[#121214] border border-[#B89658]/20 rounded-lg overflow-hidden hover:border-[#B89658]/60 transition-all duration-300 flex flex-col shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {/* Фото или заглушка */}
              <div className="h-72 w-full bg-[#1A1A1C] relative overflow-hidden flex items-center justify-center border-b border-[#B89658]/10">
                {woman.photoUrl ? (
                  <img 
                    src={woman.photoUrl} 
                    alt={woman.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="text-center p-6 text-[#F7F4EE]/40 group-hover:text-[#B89658] transition-colors">
                    <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                    <span className="text-xs uppercase tracking-widest font-medium">Добавить фотографию</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-80" />
              </div>

              {/* Информация */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#B89658] tracking-widest block mb-1 font-mono">{woman.years}</span>
                  <h3 className="font-serif text-xl font-bold text-[#F7F4EE] mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {woman.name}
                  </h3>
                  <p className="text-xs text-[#F7F4EE]/70 line-clamp-2 leading-relaxed">
                    {woman.shortDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-[#B89658] uppercase tracking-wider font-medium group-hover:underline">Подробнее</span>
                  <div className="w-7 h-7 rounded-full bg-[#5B1921]/40 border border-[#B89658]/30 flex items-center justify-center text-[#B89658] group-hover:bg-[#5B1921] transition-colors">
                    →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Модальное окно биографии */}
      {activeWoman && (
        <div 
          onClick={() => setActiveWoman(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
        >
          <div
            data-lenis-prevent 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#18181A] border border-[#B89658]/40 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl p-6 sm:p-8"
          >
            
            <button 
              onClick={() => setActiveWoman(null)}
              className="absolute top-6 right-6 text-[#F7F4EE]/60 hover:text-[#F7F4EE] p-2 rounded-full hover:bg-white/5 transition-colors z-10"
              aria-label="Закрыть"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Левая колонка: портрет */}
              <div className="lg:w-1/3 flex flex-col items-center">
                <div className="w-full h-80 lg:h-96 bg-[#121214] rounded-lg border border-[#B89658]/30 overflow-hidden relative flex items-center justify-center">
                  {activeWoman.photoUrl ? (
                    <img src={activeWoman.photoUrl} alt={activeWoman.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-6 text-[#F7F4EE]/40">
                      <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                      <span className="text-xs uppercase tracking-widest">Добавить фотографию</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Правая колонка: полная информация */}
              <div className="lg:w-2/3 space-y-6">
                <div>
                  <span className="text-xs text-[#B89658] tracking-widest block mb-1 font-mono">{activeWoman.years}</span>
                  <h2 className="font-serif text-3xl font-bold text-[#F7F4EE] mb-2">{activeWoman.name}</h2>
                  <p className="text-sm text-[#F7F4EE]/70 font-light">{activeWoman.shortDesc}</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10 text-sm text-[#F7F4EE]/90 leading-relaxed">
                  
                {/* Подробная биография */}
                {activeWoman.biography && (
                  <div className="p-4 bg-white/5 rounded border border-white/5">
                    <h4 className="text-xs uppercase tracking-widest text-[#B89658] mb-2 font-semibold flex items-center space-x-2">
                      <FileText size={14} />
                      <span>Подробная биография</span>
                    </h4>
                    <p className="text-[#F7F4EE]/80 whitespace-pre-line">{activeWoman.biography}</p>
                  </div>
                )}

                {/* Военная деятельность */}
                {activeWoman.militaryActivity && (
                  <div className="p-4 bg-white/5 rounded border border-white/5">
                    <h4 className="text-xs uppercase tracking-widest text-[#B89658] mb-2 font-semibold flex items-center space-x-2">
                      <Shield size={14} />
                      <span>Военная деятельность</span>
                    </h4>
                    <p className="text-[#F7F4EE]/80 whitespace-pre-line">{activeWoman.militaryActivity}</p>
                  </div>
                )}

                {/* Награды — скроется автоматически, если поле пустое */}
                {activeWoman.awards && (
                  <div className="p-4 bg-white/5 rounded border border-white/5">
                    <h4 className="text-xs uppercase tracking-widest text-[#B89658] mb-2 font-semibold flex items-center space-x-2">
                      <Award size={14} />
                      <span>Награды</span>
                    </h4>
                    <p className="text-[#F7F4EE]/80 whitespace-pre-line">{activeWoman.awards}</p>
                  </div>
                )}

                {/* Послевоенная жизнь */}
                {activeWoman.postwarLife && (
                  <div className="p-4 bg-white/5 rounded border border-white/5">
                    <h4 className="text-xs uppercase tracking-widest text-[#B89658] mb-2 font-semibold flex items-center space-x-2">
                      <Clock size={14} />
                      <span>Послевоенная жизнь</span>
                    </h4>
                    <p className="text-[#F7F4EE]/80 whitespace-pre-line">{activeWoman.postwarLife}</p>
                  </div>
                )}

                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};