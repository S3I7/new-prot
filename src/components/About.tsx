import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-title', {
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 85%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });

      gsap.from('.about-narration', {
        scrollTrigger: {
          trigger: '.about-narration',
          start: 'top 85%',
        },
        scale: 0.96,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });

      gsap.from('.about-card', {
        scrollTrigger: {
          trigger: '.about-cards-container',
          start: 'top 85%',
        },
        y: 35,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });

      gsap.from('.about-transition', {
        scrollTrigger: {
          trigger: '.about-transition',
          start: 'top 90%',
        },
        x: -25,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 bg-white border-b-2 border-black overflow-hidden"
    >
      {/* Halftone Screentone Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none screentone-faint opacity-30" />

      {/* Manga Chapter Header Flag */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2.5 py-0.5 bg-black text-white font-mono text-xs font-bold uppercase">
            CHAPTER 02
          </span>
          <span className="font-mono text-xs text-neutral-600 font-bold tracking-widest uppercase">
            PROTAGONIST DOSSIER
          </span>
        </div>

        <h2 className="about-title font-headline text-4xl sm:text-6xl md:text-8xl text-black leading-none tracking-tight break-words">
          SO, WHO AM I?
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Main Manga Narration Panel */}
        <div className="about-narration relative bg-white border-2 border-black p-5 sm:p-10 shadow-[6px_6px_0px_#000000]">
          {/* Manga Narration Tag */}
          <div className="absolute -top-3 left-4 sm:left-6 px-3 py-0.5 bg-black text-white font-mono text-[11px] font-bold uppercase tracking-widest">
            [ NARRATION &bull; MONOLOGUE ]
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <p className="font-display text-lg sm:text-2xl md:text-3xl text-black font-semibold leading-relaxed border-l-2 border-black pl-3 py-1">
                “I’m Arrsath Sheriff J, a Computer Science and Engineering graduate from KCG College of Technology, focused on Java backend development.”
              </p>

              <p className="font-sans text-neutral-800 text-sm sm:text-base md:text-lg leading-relaxed">
                I enjoy understanding how things work behind the scenes, from building REST APIs and implementing authentication using Spring Security and JWT to working with databases and solving problems through DSA.
              </p>

              <p className="font-sans text-neutral-700 text-sm sm:text-base leading-relaxed">
                For me, backend development is about more than writing code. It’s about building reliable systems, handling multiple requests efficiently, keeping data secure, and writing code that is easy to maintain.
              </p>

              <p className="font-sans text-neutral-700 text-sm sm:text-base leading-relaxed italic border-t border-neutral-200 pt-3">
                “I believe every line of code should serve a purpose, much like every stroke on a manga page contributes to the bigger picture. I pay attention to the details that users may never see but that make an application work well.”
              </p>
            </div>

            {/* Quick Dossier Fact Column */}
            <div className="lg:col-span-4 bg-neutral-50 border border-black p-4 sm:p-5 space-y-3 font-mono text-xs">
              <div className="text-neutral-500 uppercase font-bold border-b border-black pb-1.5 flex justify-between">
                <span>SPEC SHEET</span>
                <span>STATUS: ACTIVE</span>
              </div>
              <div className="flex flex-col xs:flex-row xs:justify-between py-1 border-b border-neutral-200 gap-0.5">
                <span className="text-neutral-600">SPECIALIZATION:</span>
                <span className="font-bold text-black sm:text-right">Java Backend Architecture</span>
              </div>
              <div className="flex flex-col xs:flex-row xs:justify-between py-1 border-b border-neutral-200 gap-0.5">
                <span className="text-neutral-600">CORE STACK:</span>
                <span className="font-bold text-black sm:text-right">Spring Boot, PostgreSQL</span>
              </div>
              <div className="flex flex-col xs:flex-row xs:justify-between py-1 border-b border-neutral-200 gap-0.5">
                <span className="text-neutral-600">DEGREE:</span>
                <span className="font-bold text-black sm:text-right">B.E. CSE (CGPA: 7.54)</span>
              </div>
              <div className="flex flex-col xs:flex-row xs:justify-between py-1 gap-0.5">
                <span className="text-neutral-600">LOCATION:</span>
                <span className="font-bold text-black sm:text-right">Chennai &bull; Bangalore</span>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Manga Panels */}
        <div className="about-cards-container grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="about-card border-2 border-black p-6 bg-white shadow-[4px_4px_0px_#000000] relative group hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-4 border-b border-black pb-2">
              <span className="font-mono text-xs font-bold uppercase">PANEL 02.1</span>
              <ShieldCheck size={20} className="text-black" />
            </div>
            <h3 className="font-headline text-2xl text-black mb-2 tracking-wide">
              SECURITY & ACCESS CONTROL
            </h3>
            <p className="font-sans text-sm text-neutral-700 leading-relaxed">
              Implementing Spring Security, granular role-based authorization, JWT stateless tokens,
              and tamper-proof QR verification mechanisms.
            </p>
          </div>

          <div className="about-card border-2 border-black p-6 bg-white shadow-[4px_4px_0px_#000000] relative group hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-4 border-b border-black pb-2">
              <span className="font-mono text-xs font-bold uppercase">PANEL 02.2</span>
              <Database size={20} className="text-black" />
            </div>
            <h3 className="font-headline text-2xl text-black mb-2 tracking-wide">
              DATABASE ARCHITECTURE
            </h3>
            <p className="font-sans text-sm text-neutral-700 leading-relaxed">
              Relational schemas in PostgreSQL & Oracle SQL, JPA/Hibernate mapping, query indexing,
              and caching strategies for high-frequency operations.
            </p>
          </div>

          <div className="about-card border-2 border-black p-6 bg-white shadow-[4px_4px_0px_#000000] relative group hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-4 border-b border-black pb-2">
              <span className="font-mono text-xs font-bold uppercase">PANEL 02.3</span>
              <Cpu size={20} className="text-black" />
            </div>
            <h3 className="font-headline text-2xl text-black mb-2 tracking-wide">
              ALGORITHMIC DISCIPLINE
            </h3>
            <p className="font-sans text-sm text-neutral-700 leading-relaxed">
              150+ DSA problems solved in Java. Deep grasp of multithreading, OOP paradigms,
              and memory efficiency under real workloads.
            </p>
          </div>
        </div>

        {/* Transition Dialogue Strip */}
        <div className="about-transition border-2 border-black bg-black text-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[4px_4px_0px_#666]">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-white" />
            <span className="font-headline text-2xl sm:text-3xl tracking-wider text-white">
              STILL READING? LET'S GET TO THE DETAILS.
            </span>
          </div>

          <a
            href="#skills"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-neutral-200 transition-colors"
          >
            <span>NEXT: CHAPTER 03</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
