import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeChapter: string;
}

const navItems = [
  { id: 'home', label: '01. HOME', chapter: 'CHAPTER 01 — INTRODUCTION' },
  { id: 'about', label: '02. ABOUT', chapter: 'CHAPTER 02 — WHO AM I' },
  { id: 'skills', label: '03. SKILLS', chapter: 'CHAPTER 03 — TECHNICAL ARSENAL' },
  { id: 'projects', label: '04. PROJECTS', chapter: 'CHAPTER 04 — PROJECT ARCHIVE' },
  { id: 'achievements', label: '05. AWARDS', chapter: 'CHAPTER 05 — ACHIEVEMENTS' },
  { id: 'experience', label: '06. EXPERIENCE', chapter: 'CHAPTER 06 — CHRONICLES' },
  { id: 'beyond-code', label: '07. BEYOND CODE', chapter: 'CHAPTER 07 — BEYOND CODE' },
  { id: 'contact', label: '08. CONTACT', chapter: 'CHAPTER 08 — FINAL CHAPTER' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeChapter }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentNav = navItems.find((item) => item.id === activeChapter) || navItems[0];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Manga Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Main Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b-2 border-black transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          
          {/* Left: Dynamic Chapter Indicator from spec */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-black inline-block flex-shrink-0" aria-hidden="true" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-black truncate max-w-[210px] sm:max-w-xs md:max-w-none">
              {currentNav.chapter}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeChapter === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-2.5 py-1 text-xs font-mono tracking-wider uppercase transition-colors border ${
                    isActive 
                      ? 'bg-black text-white border-black font-bold shadow-[2px_2px_0px_#888]' 
                      : 'bg-white text-neutral-800 border-transparent hover:border-black hover:bg-neutral-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Portfolio tag & Resume / Menu button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/Arrsath_Sheriff_J_Resume.pdf"
              download="Arrsath_Sheriff_J_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 hover:bg-black hover:text-white border border-black font-mono text-xs font-bold transition-all shadow-[2px_2px_0px_#000000]"
              title="Download Verified Resume"
            >
              <FileText size={13} />
              <span>RESUME</span>
              <ArrowUpRight size={12} />
            </a>

            <div className="hidden sm:flex items-center border border-black px-2.5 py-1 bg-black text-white font-mono text-xs font-bold tracking-widest uppercase">
              PORTFOLIO
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 border border-black bg-white hover:bg-neutral-100 transition-colors focus:ring-2 focus:ring-black"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 top-14 z-40 bg-white border-b-4 border-black p-6 overflow-y-auto lg:hidden flex flex-col justify-between"
          role="dialog"
          aria-modal="true"
        >
          <div className="space-y-3">
            <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest pb-2 border-b border-neutral-300">
              TABLE OF CONTENTS — CHAPTER DIRECTORY
            </div>
            {navItems.map((item) => {
              const isActive = activeChapter === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-4 py-3 border-2 font-mono text-sm tracking-wider flex items-center justify-between transition-all ${
                    isActive 
                      ? 'bg-black text-white border-black font-bold shadow-[4px_4px_0px_#888]' 
                      : 'bg-white text-black border-black hover:bg-neutral-100'
                  }`}
                >
                  <span>{item.chapter}</span>
                  <span className="text-xs opacity-75">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-neutral-300 mt-6 flex flex-col gap-3">
            <a
              href="/Arrsath_Sheriff_J_Resume.pdf"
              download="Arrsath_Sheriff_J_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-900 text-white border-2 border-black font-mono text-sm font-bold shadow-[4px_4px_0px_#000000]"
            >
              <FileText size={16} />
              DOWNLOAD VERIFIED RESUME
            </a>
            <div className="text-center font-mono text-xs text-neutral-500 uppercase">
              ARRSATH SH3RIF7 J &bull; JAVA BACKEND ARCHITECT
            </div>
          </div>
        </div>
      )}
    </>
  );
};
