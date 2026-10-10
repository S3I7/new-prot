import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Server, Database, Wrench, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillGroup {
  category: string;
  code: string;
  icon: React.ReactNode;
  skills: string[];
  note: string;
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    code: 'MOD.01',
    icon: <Code size={20} />,
    skills: ['Java', 'SQL', 'JavaScript'],
    note: 'Core syntax, object paradigms, and query composition.'
  },
  {
    category: 'Backend',
    code: 'MOD.02',
    icon: <Server size={20} />,
    skills: ['Spring Boot', 'Spring MVC', 'Spring Security', 'REST APIs'],
    note: 'Microservices foundation, MVC lifecycle, and secure RESTful design.'
  },
  {
    category: 'Database',
    code: 'MOD.03',
    icon: <Database size={20} />,
    skills: ['PostgreSQL', 'Oracle SQL', 'MongoDB', 'Redis'],
    note: 'Relational & NoSQL schemas, in-memory caching, indexing, and tuning.'
  },
  {
    category: 'ORM & Tools',
    code: 'MOD.04',
    icon: <Wrench size={20} />,
    skills: ['JPA', 'Hibernate', 'JDBC', 'Docker', 'Agentic AI', 'Git', 'Postman'],
    note: 'Object-relational mapping, containerization, AI workflows, and API validation.'
  },
  {
    category: 'Core Computer Science',
    code: 'MOD.05',
    icon: <Layers size={20} />,
    skills: ['Data Structures and Algorithms', 'Object-Oriented Programming', 'Multithreading', 'Operating System', 'SDLC'],
    note: 'Memory complexity, concurrency, OS fundamentals, and resilient design.'
  }
];

export const TechnicalArsenal = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.skill-manga-card', {
        scrollTrigger: {
          trigger: '.skills-grid-container',
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
      id="skills"
      ref={sectionRef}
      className="relative py-20 bg-white border-b-2 border-black overflow-hidden"
    >
      {/* Halftone Screentone Pattern */}
      <div className="absolute inset-0 pointer-events-none screentone-faint opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Chapter Header */}
        <div className="mb-12 pb-6 border-b-2 border-black">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-black text-white font-mono text-xs font-bold uppercase">
              CHAPTER 03
            </span>
            <span className="font-mono text-xs text-neutral-600 font-bold tracking-widest uppercase">
              LOADOUT &bull; CAPABILITIES
            </span>
          </div>
          <h2 className="font-headline text-5xl sm:text-7xl md:text-8xl text-black leading-none tracking-tight">
            TECHNICAL ARSENAL
          </h2>
        </div>

        {/* Responsive Monochrome Skill Grid */}
        <div className="skills-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, idx) => (
            <div
              key={group.category}
              className={`skill-manga-card manga-panel p-6 bg-white border-2 border-black shadow-[4px_4px_0px_#000000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000000] transition-all flex flex-col justify-between ${
                idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                {/* Panel Top Metadata */}
                <div className="flex items-center justify-between border-b border-black pb-2.5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1 bg-black text-white">{group.icon}</span>
                    <span className="font-mono text-xs font-bold tracking-widest text-neutral-600 uppercase">
                      {group.code}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-neutral-800 uppercase px-2 py-0.5 bg-neutral-100 border border-black">
                    VERIFIED
                  </span>
                </div>

                {/* Group Title */}
                <h3 className="font-headline text-3xl text-black mb-4 tracking-wide">
                  {group.category.toUpperCase()}
                </h3>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-neutral-50 hover:bg-black hover:text-white border border-black font-mono text-xs font-bold text-black transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Panel Footer Note */}
              <div className="mt-4 pt-3 border-t border-neutral-200">
                <p className="font-sans text-xs text-neutral-600 leading-relaxed italic">
                  {group.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
