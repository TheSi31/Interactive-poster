import React, { useState, useEffect, useCallback } from 'react';
import type { ActivityData } from '../types';
import { ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface ActivitiesSectionProps {
  activities: ActivityData[];
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ activities }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Адаптивное количество карточек: 1 на мобильном, 2 на планшете, 3 на ПК
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, activities.length - itemsPerView);
  const showControls = activities.length > itemsPerView;

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerView, maxIndex, currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Автоматическая прокрутка каждые 4.5 секунды с паузой при наведении
  useEffect(() => {
    if (!showControls || isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [showControls, isPaused, handleNext]);

  return (
    <section id="activities" className="py-24 bg-[#121214] text-[#F7F4EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок блока */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89658] block mb-3 font-medium">
            Сохраняем историю. Передаём память будущим поколениям.
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F7F4EE] mb-4">
            Эстафета памяти
          </h2>
          <div className="w-16 h-0.5 bg-[#B89658] mx-auto opacity-60" />
        </div>

        {/* Контейнер слайдера */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative"
        >
          {/* Лента карточек */}
          <div className="overflow-hidden -mx-4">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {activities.map((item) => (
                <div
                  key={item.id}
                  style={{ width: `${100 / itemsPerView}%` }}
                  className="flex-shrink-0 px-4"
                >
                  <div className="h-full group bg-[#18181A] border border-[#B89658]/20 rounded-lg overflow-hidden hover:border-[#B89658]/60 transition-all duration-300 flex flex-col shadow-md">
                    <div className="h-60 w-full bg-[#121214] relative overflow-hidden flex items-center justify-center border-b border-[#B89658]/10">
                      {item.photoUrl ? (
                        <img
                          src={item.photoUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-center p-6 text-[#F7F4EE]/40">
                          <ImageIcon size={36} className="mx-auto mb-2 opacity-50" />
                          <span className="text-xs uppercase tracking-widest font-medium">
                            Фотография мероприятия
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-center">
                      <h3 className="font-serif text-xl font-bold text-[#F7F4EE] group-hover:text-[#D4AF37] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Единый пульт управления снизу: стрелки и индикаторы */}
          {showControls && (
            <div className="flex justify-center items-center space-x-5 mt-10">
              <button
                onClick={handlePrev}
                aria-label="Предыдущий слайд"
                className="w-10 h-10 rounded-full border border-[#B89658]/40 bg-[#18181A] flex items-center justify-center text-[#B89658] hover:bg-[#5B1921] hover:text-[#F7F4EE] hover:border-[#B89658] transition-all cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Перейти к слайду ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? 'w-8 bg-[#B89658]'
                        : 'w-2 bg-[#B89658]/30 hover:bg-[#B89658]/60'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Следующий слайд"
                className="w-10 h-10 rounded-full border border-[#B89658]/40 bg-[#18181A] flex items-center justify-center text-[#B89658] hover:bg-[#5B1921] hover:text-[#F7F4EE] hover:border-[#B89658] transition-all cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};