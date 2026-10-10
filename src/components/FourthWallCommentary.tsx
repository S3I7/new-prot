import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MessageSquare, X, ChevronRight } from 'lucide-react';

interface FourthWallProps {
  activeChapter: string;
}

const chapterDialogues: Record<string, string[]> = {
  home: [
    "YOU'RE STILL HERE?",
    "WELCOME TO CHAPTER 01. SCROLL DOWN TO READ.",
    "YES, THIS IS MY PORTFOLIO. KEEP READING."
  ],
  about: [
    "STILL READING? LET'S GET TO THE DETAILS.",
    "JAVA BACKEND AT HEART. CLEAN CODE ALWAYS.",
    "NO MAGIC TRICKS HERE, JUST PROPER ARCHITECTURE."
  ],
  skills: [
    "YES, THESE APIs ACTUALLY WORK.",
    "SPRING BOOT & POSTGRESQL: THE HEAVYWEIGHT DUO.",
    "MULTITHREADING? CONCURRENCY IS MY SPECIALTY."
  ],
  projects: [
    "ENOUGH ABOUT ME. LOOK AT WHAT I BUILT.",
    "YOU SKIPPED THE DETAILS, DIDN'T YOU?",
    "EVENT TICKETING, REAL-TIME STREAMS, AND HEALTHCARE."
  ],
  achievements: [
    "150+ DSA PROBLEMS. NO SHORTCUTS.",
    "TOP 5 INNOTHON'24 HACKFEST.",
    "SOLVING LOGIC UNDER PRESSURE."
  ],
  experience: [
    "END OF CHAPTER? NOT YET.",
    "HANDS-ON PRODUCTION EXPERIENCE.",
    "BUILDING REAL APIS WITH ZERO BULLSHIT."
  ],
  'beyond-code': [
    "NOT EVERYTHING HAPPENS IN AN IDE.",
    "EDITING, READING, MUSIC, CINEMA.",
    "CREATIVE BALANCE FUELS BETTER SYSTEM DESIGN."
  ],
  contact: [
    "SO, YOU MADE IT TO THE END.",
    "INTERESTING. LET'S BUILD SOMETHING TOGETHER.",
    "SEE YOU IN THE NEXT CHAPTER."
  ]
};

export const FourthWallCommentary: React.FC<FourthWallProps> = ({ activeChapter }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const prevChapter = useRef(activeChapter);

  useEffect(() => {
    setCurrentLineIndex(0);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isMinimized && bubbleRef.current && textRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        bubbleRef.current,
        { scale: 0.9, y: 10, opacity: 0.6 },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
      );
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', delay: 0.1 }
      );
    }

    prevChapter.current = activeChapter;
  }, [activeChapter, isMinimized]);

  const dialogues = chapterDialogues[activeChapter] || chapterDialogues.home;
  const currentText = dialogues[currentLineIndex % dialogues.length];

  const handleNextDialogue = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentLineIndex((prev) => prev + 1);
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
      );
    }
  };

  return (
    <aside
      className="fixed bottom-5 right-5 z-40 max-w-xs sm:max-w-sm select-none"
      aria-label="Interactive Manga Commentary"
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3 py-2 bg-black text-white border-2 border-black shadow-[3px_3px_0px_#888] font-mono text-xs font-bold uppercase hover:bg-neutral-800 transition-all cursor-pointer"
          aria-label="Open Manga Dialogue"
        >
          <MessageSquare size={14} />
          <span>[ MANGA NOTES ]</span>
          <span className="w-2 h-2 bg-white rounded-full animate-ping" />
        </button>
      ) : (
        <div
          ref={bubbleRef}
          className="relative bg-white border-2 border-black p-3.5 shadow-[4px_4px_0px_#000000] transition-all"
        >
          {/* Comic Pointer Tail */}
          <div 
            className="absolute -top-2.5 right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black"
            aria-hidden="true"
          />
          <div 
            className="absolute -top-1.5 right-6 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-white z-10"
            aria-hidden="true"
          />

          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-black pb-1.5 mb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-800">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-black inline-block"></span>
              FOURTH-WALL COMMENTARY
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="hover:text-black text-neutral-500 p-0.5"
                title="Minimize commentary"
                aria-label="Minimize"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Speech Text */}
          <p
            ref={textRef}
            className="font-headline text-lg sm:text-xl text-black leading-tight tracking-wide font-black"
          >
            “{currentText}”
          </p>

          {/* Action Row */}
          <div className="mt-2.5 pt-1.5 border-t border-neutral-200 flex items-center justify-between text-[10px] font-mono text-neutral-600">
            <button
              onClick={handleNextDialogue}
              className="flex items-center gap-1 text-black font-bold hover:underline cursor-pointer"
              title="Read next line"
            >
              <span>NEXT LINE</span>
              <ChevronRight size={12} />
            </button>
            <span className="text-neutral-500 uppercase">
              ACT: {activeChapter.toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};
