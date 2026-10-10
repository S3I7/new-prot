import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clapperboard, BookOpen, Headphones, Film } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Interest {
  title: string;
  category: string;
  panelNum: string;
  icon: React.ReactNode;
  desc: string;
  image: string;
}

const interests: Interest[] = [
  {
    title: 'Editing & Motion Graphics',
    category: 'VISUAL DESIGN',
    panelNum: 'PANEL 07.1',
    icon: <Clapperboard size={18} />,
    desc: 'Creating cinematic edits, experimenting with transitions, visual effects, motion design, and storytelling through visuals.',
    image: '/images/editing.jpg?v=2'
  },
  {
    title: 'Reading',
    category: 'LITERATURE',
    panelNum: 'PANEL 07.2',
    icon: <BookOpen size={18} />,
    desc: 'Exploring fiction, classic literature, compelling characters, and stories that offer new perspectives.',
    image: '/images/reading.jpg?v=2'
  },
  {
    title: 'Listening',
    category: 'AUDIO ESCAPE',
    panelNum: 'PANEL 07.3',
    icon: <Headphones size={18} />,
    desc: 'Enjoying music, discovering different sounds, and finding inspiration through audio.',
    image: '/images/music.jpg?v=2'
  },
  {
    title: 'Watching',
    category: 'CINEMATOGRAPHY',
    panelNum: 'PANEL 07.4',
    icon: <Film size={18} />,
    desc: 'Exploring films, intense narratives, historical stories, and visually striking cinematography.',
    image: '/images/cinema.jpg?v=2'
  }
];

export const BeyondCode = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.interest-manga-card', {
        scrollTrigger: {
          trigger: '.interests-grid-container',
          start: 'top 85%',
        },
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="beyond-code"
      ref={sectionRef}
      className="relative py-20 bg-white border-b-2 border-black overflow-hidden"
    >
      {/* Background Screentone */}
      <div className="absolute inset-0 pointer-events-none screentone-faint opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Chapter Header */}
        <div className="mb-14 pb-6 border-b-2 border-black">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-black text-white font-mono text-xs font-bold uppercase">
              CHAPTER 07
            </span>
            <span className="font-mono text-xs text-neutral-600 font-bold tracking-widest uppercase">
              CREATIVE DIMENSIONS
            </span>
          </div>

          <h2 className="font-headline text-5xl sm:text-7xl md:text-8xl text-black leading-none tracking-tight mb-3">
            NOT EVERYTHING HAPPENS IN AN IDE.
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-800 uppercase tracking-widest font-bold">
            DIFFERENT INTERESTS. DIFFERENT PERSPECTIVES. SAME CURIOSITY.
          </p>
        </div>

        {/* 4 Monochrome Panels with Authentic Supplied Visuals */}
        <div className="interests-grid-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {interests.map((item) => (
            <div
              key={item.title}
              className="interest-manga-card manga-panel bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000000] hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_#000000] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-black pb-2 mb-3">
                  <span className="font-mono text-[11px] font-bold text-neutral-600 uppercase">
                    {item.panelNum}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[11px] text-black font-bold uppercase">
                    {item.icon}
                    <span>{item.category}</span>
                  </div>
                </div>

                {/* Supplied Visual with Halftone Effect */}
                <div className="relative border-2 border-black bg-neutral-100 overflow-hidden mb-4">
                  <div className="absolute inset-0 screentone opacity-10 pointer-events-none z-10" />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-44 object-cover manga-halftone-img transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Title */}
                <h3 className="font-headline text-2xl text-black tracking-wide leading-tight mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Panel Footer */}
              <div className="mt-4 pt-2.5 border-t border-neutral-200 font-mono text-[10px] text-neutral-500 uppercase flex justify-between">
                <span>INSPIRATION LOG</span>
                <span>CHAPTER 07</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
