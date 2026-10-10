import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, FileText, ArrowUpRight, Phone, Send, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Clean, authentic vector icons for GitHub and LinkedIn
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.85,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 bg-white border-b-2 border-black overflow-hidden"
    >
      {/* Background Screentone */}
      <div className="absolute inset-0 pointer-events-none screentone-faint opacity-30" />

      {/* Decorative Manga End Tag Watermark */}
      <div 
        className="absolute -top-6 right-8 text-8xl sm:text-9xl font-headline font-black text-neutral-900/[0.04] select-none pointer-events-none"
        aria-hidden="true"
      >
        完
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div ref={contentRef} className="space-y-12">
          
          {/* Chapter Header */}
          <div className="border-b-2 border-black pb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-black text-white font-mono text-xs font-bold uppercase">
                CHAPTER 08 &bull; FINAL CHAPTER
              </span>
              <span className="font-mono text-xs text-neutral-600 font-bold tracking-widest uppercase">
                COMMUNICATION CHANNEL
              </span>
            </div>

            <h2 className="font-headline text-5xl sm:text-7xl md:text-8xl text-black leading-none tracking-tight">
              SO, YOU MADE IT TO THE END.
            </h2>
          </div>

          {/* Action Hub & Destinations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Primary Action Buttons */}
            <div className="lg:col-span-6 bg-white border-2 border-black p-5 sm:p-8 shadow-[6px_6px_0px_#000000] space-y-4 sm:space-y-5">
              <div className="border-b border-black pb-2 font-mono text-xs uppercase font-bold">
                <span>PRIMARY ACTIONS</span>
              </div>

              <div className="flex flex-col gap-3">
                {/* 1. Contact Me */}
                <a
                  href="mailto:arrsathsheriff37@gmail.com?subject=Regarding%20Backend%20Engineering%20Role%20-%20Arrsath%20Sheriff"
                  className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-1.5 p-3.5 sm:p-4 bg-black text-white hover:bg-neutral-800 border-2 border-black font-mono text-sm font-bold uppercase transition-all shadow-[3px_3px_0px_#888]"
                >
                  <span className="flex items-center gap-2">
                    <Send size={16} />
                    <span>CONTACT ME</span>
                  </span>
                  <span className="text-xs text-neutral-300 truncate max-w-full">arrsathsheriff37@gmail.com</span>
                </a>

                {/* 2. Download Resume */}
                <a
                  href="/Arrsath_Sheriff_J_Resume.pdf"
                  download="Arrsath_Sheriff_J_Resume.pdf"
                  className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-1.5 p-3.5 sm:p-4 bg-white text-black hover:bg-neutral-100 border-2 border-black font-mono text-sm font-bold uppercase transition-all shadow-[3px_3px_0px_#000000]"
                >
                  <span className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>DOWNLOAD RESUME</span>
                  </span>
                  <span className="text-xs text-neutral-600 flex items-center gap-1">
                    VERIFIED PDF <ArrowUpRight size={14} />
                  </span>
                </a>

                {/* 3. View Projects */}
                <button
                  onClick={handleScrollToProjects}
                  className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-1.5 p-3.5 sm:p-4 bg-neutral-50 text-black hover:bg-neutral-200 border-2 border-black font-mono text-sm font-bold uppercase transition-all cursor-pointer shadow-[3px_3px_0px_#000000]"
                >
                  <span className="flex items-center gap-2">
                    <Eye size={16} />
                    <span>VIEW PROJECTS</span>
                  </span>
                  <span className="text-xs text-neutral-600">SCROLL TO CH. 04</span>
                </button>
              </div>

            </div>

            {/* Verified Channels */}
            <div className="lg:col-span-6 bg-white border-2 border-black p-5 sm:p-8 shadow-[6px_6px_0px_#000000] space-y-4 sm:space-y-5">
              <div className="border-b border-black pb-2 flex items-center justify-between font-mono text-xs uppercase font-bold">
                <span>VERIFIED DESTINATIONS</span>
                <span className="text-neutral-500">[ AUTHENTIC PROFILES ]</span>
              </div>

              <div className="space-y-3 font-mono text-sm">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/arrsath-sheriff-j-194b51292?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-1 p-3 sm:p-3.5 border border-black hover:bg-black hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon />
                    <span className="font-bold">LINKEDIN</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs opacity-80 group-hover:opacity-100">
                    <span>Arrsath sheriff j</span>
                    <ArrowUpRight size={14} />
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/S3I7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-1 p-3 sm:p-3.5 border border-black hover:bg-black hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon />
                    <span className="font-bold">GITHUB</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs opacity-80 group-hover:opacity-100">
                    <span>@S3I7</span>
                    <ArrowUpRight size={14} />
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:arrsathsheriff37@gmail.com"
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-1 p-3 sm:p-3.5 border border-black hover:bg-black hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail size={18} />
                    <span className="font-bold">EMAIL</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs opacity-80 group-hover:opacity-100 truncate max-w-full">
                    <span className="truncate">arrsathsheriff37@gmail.com</span>
                    <ArrowUpRight size={14} />
                  </div>
                </a>

                {/* Direct Phone Line */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-1 p-3 sm:p-3.5 border border-neutral-300 bg-neutral-50 text-neutral-800">
                  <div className="flex items-center gap-2.5">
                    <Phone size={18} />
                    <span className="font-bold">PHONE</span>
                  </div>
                  <span className="text-xs font-bold">+91 9344665342</span>
                </div>
              </div>
            </div>

          </div>

          {/* Manga Volume Closing Monologue */}
          <div className="relative border-4 border-black bg-black text-white p-8 sm:p-10 shadow-[8px_8px_0px_#000000] text-center overflow-hidden">
            <div className="absolute inset-0 screentone-inverted opacity-15 pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <div className="inline-block px-3 py-1 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest">
                FINAL FRAME &bull; TO BE CONTINUED
              </div>

              <h3 className="font-headline text-4xl sm:text-6xl text-white tracking-wider leading-none">
                SEE YOU IN THE NEXT CHAPTER.
              </h3>

              <div className="pt-2 font-mono text-xs text-neutral-400 tracking-widest uppercase">
                END OF VOLUME 01 &bull; ARRSATH SH3RIF7 J
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
