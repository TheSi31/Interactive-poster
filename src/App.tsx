import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { INITIAL_TIMELINE_EVENTS, INITIAL_WOMEN_DATA, INITIAL_ACTIVITIES_DATA } from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TimelineSection } from './components/TimelineSection';
import { WomenSection } from './components/WomenSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Инициализация плавного инерционного скролла Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Длительность инерции (чем больше, тем мягче)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Плавное затухание
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Плавная прокрутка к блоку
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Отслеживание текущего блока при скролле
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'timeline', 'women', 'activities'];
      const scrollPosition = window.scrollY + 300;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#18181A] text-[#F7F4EE] min-h-screen font-sans selection:bg-[#5B1921] selection:text-[#F7F4EE]">
      <Header activeSection={activeSection} scrollTo={scrollTo} />
      
      <main>
        <HeroSection onExplore={() => scrollTo('timeline')} />
        <TimelineSection events={INITIAL_TIMELINE_EVENTS} />
        <WomenSection women={INITIAL_WOMEN_DATA} />
        <ActivitiesSection activities={INITIAL_ACTIVITIES_DATA} />
      </main>

      <Footer />
    </div>
  );
}