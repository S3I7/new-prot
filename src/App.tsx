import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from './components/Preloader';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { TechnicalArsenal } from './components/TechnicalArsenal';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { ExperienceEducation } from './components/ExperienceEducation';
import { BeyondCode } from './components/BeyondCode';
import { Contact } from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  useEffect(() => {
    if (!preloaderComplete) return;

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
    };
  }, [preloaderComplete]);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* Chapter Zero Preloader */}
      <Preloader onComplete={() => setPreloaderComplete(true)} />

      {/* Main Manga Portfolio */}
      <main className="relative">
        <Hero isReady={preloaderComplete} />
        <About />
        <TechnicalArsenal />
        <Projects />
        <Achievements />
        <ExperienceEducation />
        <BeyondCode />
        <Contact />
      </main>
    </div>
  );
}

export default App;
