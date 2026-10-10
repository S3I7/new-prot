import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.achievement-manga-card', {
        scrollTrigger: {
          trigger: '.achievements-grid-container',
          start: 'top 85%',
        },
        scale: 0.95,
        y: 35,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative py-20 bg-neutral-900 text-white border-b-2 border-black overflow-hidden"
    >
      {/* Inverted Screentone Dot Background */}
      <div className="absolute inset-0 pointer-events-none screentone-inverted opacity-20" />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Chapter Flag */}
        <div className="mb-12 pb-6 border-b border-neutral-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-white text-black font-mono text-xs font-bold uppercase">
              CHAPTER 05
            </span>
            <span className="font-mono text-xs text-neutral-400 font-bold tracking-widest uppercase">
              ACCOLADES &bull; TRACK RECORD
            </span>
          </div>
          <h2 className="font-headline text-5xl sm:text-7xl md:text-8xl text-white leading-none tracking-tight">
            PROVEN MILESTONES
          </h2>
        </div>

        {/* Oversized Typography Achievement Panels */}
        <div className="achievements-grid-container grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Milestone 01: DSA */}
          <div className="achievement-manga-card bg-black border-2 border-white p-8 sm:p-10 shadow-[6px_6px_0px_#FFFFFF] relative group hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6">
              <span className="font-mono text-xs text-neutral-400 font-bold uppercase tracking-wider">
                RECORD 01 &bull; PROBLEM SOLVING
              </span>
              <Code2 size={24} className="text-white" />
            </div>

            <div className="font-headline text-7xl sm:text-8xl md:text-9xl text-white leading-none tracking-tight mb-2">
              150+
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
              DSA PROBLEMS SOLVED IN JAVA
            </h3>

            <p className="font-sans text-sm text-neutral-400 leading-relaxed mb-6">
              Practiced and solved across competitive coding platforms including LeetCode and HackerRank.
              Focused on algorithmic efficiency, dynamic programming, tree traversals, and optimal space-time tradeoffs.
            </p>

            <div className="pt-3 border-t border-neutral-800 flex items-center gap-2 font-mono text-xs text-neutral-300">
              <span className="w-2 h-2 bg-white inline-block"></span>
              <span>PLATFORMS: LEETCODE &bull; HACKERRANK</span>
            </div>
          </div>

          {/* Milestone 02: INNOTHON'24 */}
          <div className="achievement-manga-card bg-black border-2 border-white p-8 sm:p-10 shadow-[6px_6px_0px_#FFFFFF] relative group hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6">
              <span className="font-mono text-xs text-neutral-400 font-bold uppercase tracking-wider">
                RECORD 02 &bull; HACKATHON ARENA
              </span>
              <Trophy size={24} className="text-white" />
            </div>

            <div className="font-headline text-7xl sm:text-8xl md:text-9xl text-white leading-none tracking-tight mb-2">
              TOP 5
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
              INNOTHON'24 HACKFEST
            </h3>

            <p className="font-sans text-sm text-neutral-400 leading-relaxed mb-6">
              Secured Top 5 Position in the high-stakes INNOTHON'24 Hackfest conducted by
              Hindustan Institute of Technology and Science, engineering rapid backend solutions under intense time limits.
            </p>

            <div className="pt-3 border-t border-neutral-800 flex items-center gap-2 font-mono text-xs text-neutral-300">
              <span className="w-2 h-2 bg-white inline-block"></span>
              <span>ORGANIZER: HINDUSTAN INSTITUTE OF TECH & SCIENCE</span>
            </div>
          </div>

        </div>

        {/* Short Narration Panel */}
        <div className="border border-white bg-black/60 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="w-3 h-3 bg-white mt-1.5 flex-shrink-0" />
            <div>
              <div className="font-mono text-xs text-neutral-400 uppercase font-bold mb-1">
                [ NARRATION &bull; THE CODE ETHIC ]
              </div>
              <p className="font-display text-base sm:text-lg text-white font-medium">
                “Every line of test code passed, every edge case handled. Real confidence comes from solving the hard problems first.”
              </p>
            </div>
          </div>
          <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest text-right">
            FACTUAL LOG &bull; ZERO FABRICATION
          </div>
        </div>
      </div>
    </section>
  );
};
