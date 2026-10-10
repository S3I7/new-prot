import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowDown, Terminal } from 'lucide-react';

interface HeroProps {
  isReady?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isReady = true }) => {
  const heroRef = useRef<HTMLElement>(null);
  const panelImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isReady) return;
    if (!heroRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(['.hero-top-strip', '.hero-left-item', '.hero-center-panel', '.hero-right-item', '.hero-scroll-prompt'], {
          opacity: 1,
          clearProps: 'all'
        });
        return;
      }

      // Dynamic Fade-In Pop-Up Sequence triggered after preloading
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Top editorial row slides down into place
      tl.fromTo('.hero-top-strip',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity' }
      )
      // 2. Character Manga Panel springs forward with comic pop-up impact
      .fromTo('.hero-center-panel',
        { scale: 0.8, y: 45, opacity: 0, rotate: -3 },
        { scale: 1, y: 0, opacity: 1, rotate: -1.5, duration: 0.85, ease: 'back.out(1.5)', clearProps: 'opacity' }
      , '-=0.35')
      // 3. Left Headline & Details Pop Up
      .fromTo('.hero-left-item',
        { y: 35, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'back.out(1.25)', clearProps: 'transform,opacity' }
      , '-=0.6')
      // 4. Right Name & Speech Box Pop Up
      .fromTo('.hero-right-item',
        { y: 35, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'back.out(1.25)', clearProps: 'transform,opacity' }
      , '-=0.6')
      // 5. Scroll Prompt fades in
      .fromTo('.hero-scroll-prompt',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', clearProps: 'transform,opacity' }
      , '-=0.25');

      // Restrained cursor parallax on desktop (only if fine pointer / mouse)
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current || !panelImgRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const xPos = (e.clientX - rect.left) / rect.width - 0.5;
        const yPos = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(panelImgRef.current, {
          x: xPos * 14,
          y: yPos * 14,
          rotation: -1.5 + xPos * 2,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      const heroEl = heroRef.current;
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      if (heroEl && window.innerWidth >= 1024 && isFinePointer) {
        heroEl.addEventListener('mousemove', handleMouseMove);
      }

      return () => {
        if (heroEl) {
          heroEl.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }, heroRef);

    return () => ctx.revert();
  }, [isReady]);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative hero-section min-h-screen pt-4 sm:pt-8 pb-8 sm:pb-12 flex flex-col justify-between bg-white border-b-2 border-black overflow-hidden"
    >
      {/* Background Screentone Textures */}
      <div className="absolute inset-0 pointer-events-none screentone-faint opacity-40" />

      {/* Top Editorial Row (Chapter 01 Header) */}
      <div className="hero-top-strip relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col sm:flex-row sm:items-center justify-between border-b border-black pb-3 mb-4 gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 bg-black inline-block"></span>
          <span className="font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-black">
            CHAPTER 01 — INTRODUCTION
          </span>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="/Arrsath_Sheriff_J_Resume.pdf"
            download="Arrsath_Sheriff_J_Resume.pdf"
            className="px-2.5 py-1 border border-black bg-neutral-100 hover:bg-black hover:text-white font-mono text-[11px] font-bold uppercase transition-all shadow-[2px_2px_0px_#000000]"
          >
            RESUME PDF
          </a>
          <span className="px-2.5 py-1 border border-black bg-black text-white font-mono text-xs font-bold tracking-widest uppercase">
            PORTFOLIO
          </span>
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full my-auto py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-center">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-3 sm:space-y-4">
            <div className="hero-left-item inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-mono tracking-widest font-bold uppercase shadow-[2px_2px_0px_#666]">
              <Terminal size={14} />
              <span>SOFTWARE DEVELOPER</span>
            </div>

            <h1 className="hero-left-item font-headline text-4xl sm:text-6xl md:text-7xl xl:text-8xl text-black leading-none tracking-tight break-words">
              JAVA BACKEND
              <br />
              DEVELOPER
            </h1>

            <p className="hero-left-item font-display text-base sm:text-lg text-neutral-700 max-w-md font-medium leading-relaxed border-l-2 border-black pl-3 py-1">
              “Building secure, scalable, and efficient backend applications.”
            </p>

            {/* Small Chapter Marker */}
            <div className="hero-left-item pt-1">
              <div className="font-mono text-xs tracking-wider uppercase text-neutral-900 font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-black inline-block"></span>
                <span>CODE / BUILD / LEARN / REPEAT</span>
              </div>
            </div>
          </div>

          {/* CENTER: Supplied Character Artwork in Tilted Manga Panel */}
          <div className="hero-center-panel lg:col-span-4 flex justify-center items-center my-4 lg:my-0">
            <div className="relative group max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[400px] w-full">
              {/* Offset Comic Shadow Box */}
              <div 
                className="absolute inset-0 bg-black border-2 border-black translate-x-2 translate-y-2 sm:translate-x-2.5 sm:translate-y-2.5 transition-transform group-hover:translate-x-3.5 group-hover:translate-y-3.5"
                aria-hidden="true"
              />

              {/* Main Artwork Panel */}
              <div 
                ref={panelImgRef}
                className="relative bg-white border-2 border-black p-3 sm:p-4 rotate-[-1.5deg] group-hover:rotate-0 transition-transform duration-300 ease-out"
                style={{ transformOrigin: 'center center' }}
              >
                {/* Panel Header Strip */}
                <div className="flex justify-between items-center text-[10px] font-mono border-b border-black pb-1.5 mb-2 uppercase text-neutral-800">
                  <span className="font-bold">PANEL 01 &bull; PROTAGONIST</span>
                  <span>SERIAL NO. S3I7</span>
                </div>

                {/* Image Container with Screentone Backdrop */}
                <div className="relative overflow-hidden border border-black bg-neutral-50 flex items-center justify-center min-h-[300px] sm:min-h-[380px] md:min-h-[440px]">
                  {/* Screentone texture behind character */}
                  <div className="absolute inset-0 screentone opacity-15 pointer-events-none" />

                  {/* Supplied Genuine Character Artwork (New Portrait Cut) */}
                  <img
                    src="/hero-manga.jpg?v=2"
                    alt="Arrsath Sh3rif7 J - Manga Protagonist Illustration"
                    className="w-full h-auto object-contain max-h-[460px] relative z-10 manga-halftone-img"
                    loading="eager"
                  />

                  {/* Corner Comic Registration Marks */}
                  <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-black pointer-events-none z-20" />
                  <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-black pointer-events-none z-20" />
                  <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-black pointer-events-none z-20" />
                  <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-black pointer-events-none z-20" />
                </div>

                {/* Panel Footer Caption */}
                <div className="mt-2.5 pt-1.5 border-t border-black flex justify-between items-center text-[10px] font-mono text-neutral-600">
                  <span>FIG 1.1: ARRSATH SHERIFF</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end text-left lg:text-right space-y-3 sm:space-y-4">
            <div className="hero-right-item font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold flex items-center gap-2">
              <span>LABEL</span>
              <span className="w-3 h-0.5 bg-black inline-block"></span>
              <span>NAME</span>
            </div>

            <div className="hero-right-item font-headline text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-black leading-none tracking-tight break-words">
              <div>ARRSATH</div>
              <div>SH3RIF7 J</div>
            </div>

            {/* Supporting Speech / Editorial Box */}
            <div className="hero-right-item speech-bubble speech-bubble-white-inner max-w-sm border-2 border-black shadow-[3px_3px_0px_#000000]">
              <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-black">
                YES, THIS IS MY PORTFOLIO. KEEP READING.
              </p>
            </div>

            {/* Verified Quick Links */}
            <div className="hero-right-item pt-1 flex flex-col lg:items-end gap-1.5 text-xs font-mono text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black inline-block"></span>
                <span>BASED IN CHENNAI, INDIA</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black inline-block"></span>
                <span>B.E. COMPUTER SCIENCE & ENGINEERING</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM: Scroll Prompt */}
      <div 
        className="hero-scroll-prompt relative z-10 w-full flex justify-center items-center pt-2 sm:pt-4"
      >
        <button
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black px-4 py-2"
          aria-label="Scroll to read story"
        >
          <span className="font-mono text-xs tracking-widest font-bold uppercase text-black group-hover:underline">
            SCROLL TO READ MY STORY ↓
          </span>
          <div className="w-5 h-5 flex items-center justify-center animate-bounce">
            <ArrowDown size={16} className="text-black" />
          </div>
        </button>
      </div>
    </section>
  );
};
