import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    let isFinished = false;

    const finish = () => {
      if (isFinished) return;
      isFinished = true;
      setIsDismissed(true);
      onComplete();
    };

    // Safety fallback: Never stay stuck under any circumstance!
    const safetyTimer = setTimeout(() => {
      finish();
    }, 2400);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!containerRef.current) {
      finish();
      return () => clearTimeout(safetyTimer);
    }

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.3,
          delay: 0.3,
          onComplete: finish
        });
        return;
      }

      const tl = gsap.timeline({
        onComplete: finish
      });

      // 1. Initial State
      gsap.set(containerRef.current, { opacity: 1, display: 'flex' });
      gsap.set('.preloader-fade', { opacity: 0, y: 20 });
      gsap.set('.preloader-bar', { scaleX: 0, transformOrigin: 'left center' });

      // 2. Entrance sequence
      tl.to('.preloader-screentone', {
        opacity: 0.35,
        duration: 0.3,
        ease: 'power2.out'
      })
      .to('.preloader-title', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.1')
      .to('.preloader-label', {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.2')
      .to('.preloader-bar', {
        scaleX: 1,
        duration: 0.7,
        ease: 'power2.inOut'
      }, '-=0.2')
      .to('.preloader-fade', {
        y: -15,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        delay: 0.15
      })
      // 3. Manga Page Slide Up Wipe
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.65,
        ease: 'power4.inOut'
      }, '-=0.05');

    }, containerRef);

    return () => {
      clearTimeout(safetyTimer);
      ctx.revert();
    };
  }, [onComplete]);

  if (isDismissed) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-black px-6 select-none overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        zIndex: 99999
      }}
      role="progressbar"
      aria-label="Loading Chapter 01"
    >
      {/* Halftone Screentone Accent Background */}
      <div
        className="preloader-screentone absolute inset-0 pointer-events-none screentone-faint"
        style={{ opacity: 0.15 }}
      />

      {/* Decorative Manga Framing Box */}
      <div className="relative z-10 max-w-2xl w-full p-8 md:p-12 border-2 border-black bg-white shadow-[6px_6px_0px_#000000] flex flex-col items-center text-center">
        {/* Subtle Chapter Marker */}
        <div className="preloader-fade flex items-center gap-2 mb-6">
          <span className="w-2.5 h-2.5 bg-black inline-block"></span>
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold">
            PROLOGUE / CHAPTER 00
          </span>
          <span className="w-2.5 h-2.5 bg-black inline-block"></span>
        </div>

        {/* Main Preloader Typography (Exclusive to Chapter Zero) */}
        <h1
          className="preloader-title preloader-fade font-headline text-4xl sm:text-6xl md:text-7xl font-black tracking-wider text-black leading-none mb-6"
          style={{ letterSpacing: '0.04em' }}
        >
          OH, YOU'RE CURIOUS ABOUT ME?
        </h1>

        {/* Progress Bar Container */}
        <div className="w-full max-w-md h-2 border border-black bg-neutral-100 p-0.5 mb-4 relative overflow-hidden">
          <div
            className="preloader-bar h-full bg-black w-full"
            style={{ transformOrigin: 'left center' }}
          />
        </div>

        {/* Label */}
        <div
          className="preloader-label preloader-fade flex justify-between w-full max-w-md text-xs font-mono tracking-widest uppercase text-neutral-800"
        >
          <span>ARRSATH SH3RIF7 J</span>
          <span className="font-bold flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-black animate-pulse"></span>
            LOADING CHAPTER 01
          </span>
        </div>
      </div>

      {/* Manga Watermark Accents */}
      <div className="absolute bottom-6 font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
        VOLUME 01 : THE BACKEND ARCHITECT &bull; 2026 EDITION
      </div>
    </div>
  );
};
