import React, { useState, useEffect } from 'react';
import type { TimelineEvent } from '../types';
import { Clock, X } from 'lucide-react';

interface TimelineSectionProps {
  events: TimelineEvent[];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEvent(null);
    };
    if (selectedEvent) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEvent]);

  return (
    <section id="timeline" className="py-24 bg-[#121214] text-[#F7F4EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок блока */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89658] block mb-3 font-medium">
            Хронология событий 1941–1944 годов
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F7F4EE] mb-4">
            Красный Берег в годы оккупации
          </h2>
          <div className="w-16 h-0.5 bg-[#B89658] mx-auto opacity-60" />
        </div>

        {/* Шкала времени */}
        <div className="relative">
          {/* Сплошная золотая линия строго по центру для ПК */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-[#B89658]/40 -translate-y-1/2 z-0" />

          {/* Вертикальная линия шкалы для мобильных */}
          <div className="lg:hidden absolute top-0 bottom-0 left-[23px] w-px bg-[#B89658]/40 z-0" />

          {/* Динамическая сетка под любое количество событий */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-5 lg:gap-3 relative z-10"
            style={{ '--cols': Math.max(events.length, 1) } as React.CSSProperties}
          >
            {events.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedEvent(item)}
                  className="group cursor-pointer bg-[#18181A] lg:bg-transparent p-5 lg:p-0 rounded-lg border border-[#B89658]/20 lg:border-none hover:border-[#B89658]/60 transition-all flex flex-col lg:grid lg:grid-rows-[1fr_auto_1fr] lg:items-center text-left lg:text-center"
                >
                  {/* Верхний слот (для чётных карточек на ПК) */}
                  <div className="hidden lg:flex flex-col justify-end items-center pb-6 px-1.5 min-h-[140px]">
                    {isEven && (
                      <div className="p-3 rounded-lg bg-[#18181A]/80 border border-[#B89658]/15 group-hover:border-[#B89658]/50 transition-colors w-full">
                        <span className="text-[11px] font-semibold text-[#B89658] tracking-wider block mb-1">
                          {item.date}
                        </span>
                        <h3 className="font-serif text-sm font-semibold text-[#F7F4EE] group-hover:text-[#D4AF37] transition-colors leading-snug mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-[#F7F4EE]/60 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Центральная точка на линии (ПК) */}
                  <div className="hidden lg:flex justify-center items-center py-1">
                    <div className="w-5 h-5 rounded-full bg-[#121214] border-2 border-[#B89658] group-hover:scale-125 group-hover:bg-[#5B1921] transition-all flex items-center justify-center shadow-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B89658] group-hover:bg-white" />
                    </div>
                  </div>

                  {/* Нижний слот (для нечётных карточек на ПК) */}
                  <div className="hidden lg:flex flex-col justify-start items-center pt-6 px-1.5 min-h-[140px]">
                    {!isEven && (
                      <div className="p-3 rounded-lg bg-[#18181A]/80 border border-[#B89658]/15 group-hover:border-[#B89658]/50 transition-colors w-full">
                        <span className="text-[11px] font-semibold text-[#B89658] tracking-wider block mb-1">
                          {item.date}
                        </span>
                        <h3 className="font-serif text-sm font-semibold text-[#F7F4EE] group-hover:text-[#D4AF37] transition-colors leading-snug mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-[#F7F4EE]/60 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Мобильная версия карточки */}
                  <div className="lg:hidden flex items-center space-x-3 mb-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#121214] border-2 border-[#B89658] flex-shrink-0" />
                    <span className="text-xs font-semibold text-[#B89658] tracking-wider">{item.date}</span>
                  </div>
                  <div className="lg:hidden pl-6">
                    <h3 className="font-serif text-base font-semibold text-[#F7F4EE] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#F7F4EE]/60 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Модальное окно события */}
      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#18181A] border border-[#B89658]/40 rounded-lg max-w-lg w-full p-6 sm:p-8 relative shadow-2xl"
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-[#F7F4EE]/60 hover:text-[#F7F4EE] p-1"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>

            <div className="flex items-center space-x-2 text-[#B89658] text-xs uppercase tracking-widest mb-2 font-medium">
              <Clock size={14} />
              <span>{selectedEvent.date}</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#F7F4EE] mb-4">
              {selectedEvent.title}
            </h3>

            <div className="space-y-4 text-sm text-[#F7F4EE]/80 leading-relaxed">
              <p className="p-4 bg-white/5 rounded border border-white/5">
                {selectedEvent.description}
              </p>
              <p className="text-xs text-[#F7F4EE]/60 italic">
                {selectedEvent.details}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-2 bg-[#5B1921] hover:bg-[#72202A] text-[#F7F4EE] text-sm rounded font-medium transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};