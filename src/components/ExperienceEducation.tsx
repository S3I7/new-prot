import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  arc: string;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  points: string[];
  badge: string;
}

const timelineItems: TimelineItem[] = [
  {
    arc: 'ARC 03',
    type: 'experience',
    title: 'Full Stack Java Developer Intern',
    organization: 'Pentagon Space',
    location: 'Vijayanagar, Bangalore',
    period: 'May 2026 – Present',
    badge: 'ACTIVE RESIDENCY',
    points: [
      'Engineered backend modules and RESTful endpoints using Java and Spring Boot ecosystem.',
      'Designed relational database schema tables and integrated JPA/Hibernate entities for optimized persistence.',
      'Collaborated on full-stack application development ensuring clean API contracts and proper exception handling.'
    ]
  },
  {
    arc: 'ARC 02',
    type: 'experience',
    title: 'Software Developer Intern',
    organization: 'LearnerCircle',
    location: 'Chennai / Remote',
    period: 'Verified Internship Work',
    badge: 'PRODUCTION SYSTEMS',
    points: [
      'Contributed to the Learning Management System (LMS) and Writathon CRM platform architecture.',
      'Engineered registration management modules to handle incoming user and student records securely.',
      'Developed story submission workflows and submission tracking pipelines, ensuring seamless status updates.'
    ]
  },
  {
    arc: 'ARC 01',
    type: 'education',
    title: 'B.E. in Computer Science and Engineering',
    organization: 'KCG College of Technology',
    location: 'Karappakkam, Chennai',
    period: '2022 – 2026',
    badge: 'CGPA: 7.54',
    points: [
      'Comprehensive study of Data Structures, Algorithms, Operating Systems, Database Management Systems, and Object-Oriented Software Design.',
      'Graduating with a CGPA of 7.54; active participant in technical hackathons and competitive programming challenges.'
    ]
  }
];

export const ExperienceEducation = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.timeline-manga-card', {
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 85%',
        },
        x: -30,
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
      id="experience"
      ref={sectionRef}
      className="relative py-20 bg-white border-b-2 border-black overflow-hidden"
    >
      {/* Background Screentone */}
      <div className="absolute inset-0 pointer-events-none screentone-faint opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Chapter Header */}
        <div className="mb-14 pb-6 border-b-2 border-black flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-black text-white font-mono text-xs font-bold uppercase">
                CHAPTER 06
              </span>
              <span className="font-mono text-xs text-neutral-600 font-bold tracking-widest uppercase">
                CHRONICLES &bull; TIMELINE
              </span>
            </div>
            <h2 className="font-headline text-5xl sm:text-7xl md:text-8xl text-black leading-none tracking-tight">
              EXPERIENCE & EDUCATION
            </h2>
          </div>

          <div className="speech-bubble max-w-sm border-2 border-black shadow-[3px_3px_0px_#000000]">
            <p className="font-mono text-xs uppercase font-bold text-black">
              VERIFIED CHRONOLOGY. AUTHENTIC RESPONSIBILITIES ONLY.
            </p>
          </div>
        </div>

        {/* Manga Timeline with Chapter/Arc Markers */}
        <div className="timeline-container space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-8 before:w-0.5 before:bg-black before:hidden md:before:block">
          {timelineItems.map((item, idx) => (
            <div
              key={idx}
              className="timeline-manga-card relative bg-white border-2 border-black p-6 sm:p-8 shadow-[5px_5px_0px_#000000] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000000] transition-all"
            >
              {/* Arc Stamp */}
              <div className="flex flex-wrap items-center justify-between border-b border-black pb-3 mb-4 gap-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-black text-white font-mono text-xs font-bold uppercase">
                    {item.arc}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-600 font-bold uppercase">
                    {item.type === 'experience' ? <Briefcase size={14} /> : <GraduationCap size={14} />}
                    <span>{item.type.toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="px-2 py-0.5 bg-neutral-100 border border-black font-bold uppercase text-black">
                    {item.badge}
                  </span>
                  <div className="flex items-center gap-1 text-neutral-600">
                    <Calendar size={13} />
                    <span>{item.period}</span>
                  </div>
                </div>
              </div>

              {/* Title & Organization */}
              <div className="mb-4">
                <h3 className="font-headline text-3xl sm:text-4xl text-black tracking-wide leading-tight">
                  {item.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mt-1 font-mono text-xs text-neutral-700">
                  <span className="font-bold text-black text-sm">{item.organization}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Verified Points */}
              <ul className="space-y-2.5 font-sans text-sm text-neutral-800">
                {item.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-black flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
