import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, CheckCircle2, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  chapterTag: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  tech: string[];
  image: string;
  imageAlt: string;
  bullets: string[];
  keyMetric?: string;
  aspectRatioClass: string;
  imageAspect?: string;
  imageFit?: 'cover' | 'contain';
}

const projects: Project[] = [
  {
    id: 'event-ticket',
    chapterTag: 'PANEL 04.1',
    title: 'Event Ticket Platform',
    subtitle: 'SECURE EVENT MANAGEMENT & QR VALIDATION',
    shortDesc: 'Developed a web based ticketing system that helps organizers manage event capacity and verify tickets using secure QR codes to reduce fraud.',
    tech: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'JPA/Hibernate', 'React'],
    image: '/images/event-ticket.jpg?v=2',
    imageAlt: 'Manga character scanning QR code at event entrance terminal',
    bullets: [
      'Built a web-based event ticketing platform using Java and Spring Boot, enabling organizers to create events, configure multiple ticket types, and manage ticket availability.',
      'Developed secure RESTful APIs using Spring Boot, Spring Security, JPA/Hibernate, and PostgreSQL, implementing authentication and authorization for event organizers and attendees.',
      'Implemented ticket purchasing, sales, and attendance management with QR-code based ticket validation, preventing ticket overselling and duplicate ticket usage while enabling staff to verify tickets at event entry.'
    ],
    keyMetric: 'Anti-fraud QR Ticket Validation Engine',
    aspectRatioClass: 'lg:col-span-7',
    imageAspect: '1024 / 682',
    imageFit: 'cover'
  },
  {
    id: 'read-flow',
    chapterTag: 'PANEL 04.2',
    title: 'Read Flow',
    subtitle: 'REELS-STYLE BOOK DISCOVERY & FEED OPTIMIZATION',
    shortDesc: 'Built a book discovery platform with infinite scrolling, curated story excerpts, JWT based authentication, and database indexing for faster queries.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'JWT', 'React', 'Postman'],
    image: '/images/read-flow.jpg?v=2',
    imageAlt: 'Manga character reading curated literary excerpts on Read Flow',
    bullets: [
      'Built a reels-style book discovery platform with 100+ books and 300+ curated passages, enabling users to discover, like, bookmark, and explore content through an infinite-scroll feed.',
      'Developed secure RESTful APIs using Spring Boot, Spring Security, JWT, JPA/Hibernate, and PostgreSQL, implementing authentication and role-based access control for users and administrators.',
      'Optimized feed performance using PostgreSQL indexing, achieving sub-200ms average API response time during local load testing and validating 30+ API test cases using Postman.'
    ],
    keyMetric: '<200ms Average API Response Time',
    aspectRatioClass: 'lg:col-span-5',
    imageAspect: '1024 / 682',
    imageFit: 'cover'
  },
  {
    id: 'health-bridge',
    chapterTag: 'PANEL 04.3',
    title: 'Health Bridge',
    subtitle: 'HEALTHCARE BACKEND & MEDICAL RECORD SYSTEM',
    shortDesc: 'Digital healthcare infrastructure connecting patients and doctors for appointment scheduling, remote consultation records, and HIPAA-aware data segregation.',
    tech: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'JPA/Hibernate', 'PostgreSQL'],
    image: '/images/health-bridge.png?v=2',
    imageAlt: 'Manga character managing consultations on Health Bridge telemedicine platform',
    bullets: [
      'Developed backend functionality for a digital healthcare platform connecting patients and doctors, supporting online consultations, appointment booking, and medical record management.',
      'Built secure RESTful APIs using Spring Boot, Spring Security, JWT, and JPA/Hibernate, implementing user authentication and role-based access control for patients, doctors, and administrators.',
      'Implemented database-driven workflows using PostgreSQL for appointment scheduling and medical record management, enabling reliable storage, retrieval, and role-specific access to healthcare data.'
    ],
    keyMetric: 'Role-Specific Access Workflows',
    aspectRatioClass: 'lg:col-span-12',
    imageAspect: '1024 / 682',
    imageFit: 'cover'
  }
];

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.project-manga-card', {
        scrollTrigger: {
          trigger: '.projects-grid-container',
          start: 'top 85%',
        },
        y: 40,
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
      id="projects"
      ref={sectionRef}
      className="relative py-20 bg-white border-b-2 border-black overflow-hidden"
    >
      {/* Background Screentone Pattern */}
      <div className="absolute inset-0 pointer-events-none screentone-faint opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Chapter Header */}
        <div className="mb-12 pb-6 border-b-2 border-black flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-black text-white font-mono text-xs font-bold uppercase">
                CHAPTER 04
              </span>
              <span className="font-mono text-xs text-neutral-600 font-bold tracking-widest uppercase">
                EXECUTED WORKS &bull; SCHEMATICS
              </span>
            </div>
            <h2 className="font-headline text-5xl sm:text-7xl md:text-8xl text-black leading-none tracking-tight">
              PROJECT ARCHIVE
            </h2>
          </div>

          {/* Dialogue Tag */}
          <div className="speech-bubble max-w-sm border-2 border-black shadow-[3px_3px_0px_#000000]">
            <p className="font-headline text-lg sm:text-xl font-bold uppercase tracking-wide text-black leading-tight">
              “ENOUGH ABOUT ME. LOOK AT WHAT I BUILT.”
            </p>
          </div>
        </div>

        {/* Asymmetrical Manga Project Grid */}
        <div className="projects-grid-container grid grid-cols-1 lg:grid-cols-12 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`project-manga-card ${project.aspectRatioClass} bg-white border-2 border-black p-5 sm:p-7 shadow-[5px_5px_0px_#000000] hover:shadow-[8px_8px_0px_#000000] hover:-translate-y-1 transition-all flex flex-col justify-between`}
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-black pb-2 mb-4">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase">
                    <span className="w-2.5 h-2.5 bg-black inline-block"></span>
                    <span>{project.chapterTag}</span>
                  </div>
                  {project.keyMetric && (
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-neutral-100 border border-black uppercase">
                      {project.keyMetric}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-headline text-3xl sm:text-4xl text-black tracking-wide leading-tight mb-1">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-neutral-600 tracking-wider font-semibold uppercase mb-4">
                  {project.subtitle}
                </p>

                {/* Content Layout: Split for full-width panel (04.3) on large screens, standard for other panels */}
                {project.aspectRatioClass === 'lg:col-span-12' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7">
                      <div
                        className="relative border-2 border-black bg-white overflow-hidden group flex items-center justify-center"
                        style={{ aspectRatio: project.imageAspect || '1024 / 682' }}
                      >
                        <div className="absolute inset-0 screentone opacity-10 pointer-events-none z-10" />
                        <img
                          src={project.image}
                          alt={project.imageAlt}
                          className="w-full h-full manga-halftone-img transition-transform duration-500 group-hover:scale-105"
                          style={{ objectFit: project.imageFit || 'cover', objectPosition: 'center' }}
                          loading="lazy"
                        />
                        <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 bg-black text-white font-mono text-[10px] uppercase font-bold tracking-widest border border-white">
                          GENUINE ARTIFACT
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-between h-full">
                      <div>
                        {/* Short Description */}
                        <p className="font-sans text-neutral-800 text-sm sm:text-base leading-relaxed mb-4">
                          {project.shortDesc}
                        </p>

                        {/* Tech Chips */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-1 bg-neutral-50 border border-neutral-300 font-mono text-[11px] text-neutral-900 font-semibold"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t border-black flex flex-wrap items-center justify-between gap-3">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="px-4 py-2 bg-black text-white hover:bg-neutral-800 font-mono text-xs font-bold uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_#888]"
                        >
                          <Layers size={14} />
                          <span>VIEW CASE STUDY SPEC</span>
                        </button>

                        <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest">
                          VERIFIED IMPLEMENTATION
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Genuine Visual Container */}
                    <div
                      className="relative border-2 border-black bg-white overflow-hidden mb-5 group flex items-center justify-center"
                      style={{ aspectRatio: project.imageAspect || '16 / 9' }}
                    >
                      <div className="absolute inset-0 screentone opacity-10 pointer-events-none z-10" />
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className="w-full h-full manga-halftone-img transition-transform duration-500 group-hover:scale-105"
                        style={{ objectFit: project.imageFit || 'cover', objectPosition: 'center' }}
                        loading="lazy"
                      />
                      <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 bg-black text-white font-mono text-[10px] uppercase font-bold tracking-widest border border-white">
                        GENUINE ARTIFACT
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="font-sans text-neutral-800 text-sm sm:text-base leading-relaxed mb-4">
                      {project.shortDesc}
                    </p>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 bg-neutral-50 border border-neutral-300 font-mono text-[11px] text-neutral-900 font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons for standard cards */}
              {project.aspectRatioClass !== 'lg:col-span-12' && (
                <div className="pt-4 border-t border-black flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 bg-black text-white hover:bg-neutral-800 font-mono text-xs font-bold uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_#888]"
                  >
                    <Layers size={14} />
                    <span>VIEW CASE STUDY SPEC</span>
                  </button>

                  <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest">
                    VERIFIED IMPLEMENTATION
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Modal / Specification View */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-none"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative bg-white border-4 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-[8px_8px_0px_#FFFFFF]">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b-2 border-black pb-3 mb-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase font-bold mb-1">
                  <span>SPECIFICATION DOCUMENT</span>
                  <span>&bull;</span>
                  <span>{selectedProject.chapterTag}</span>
                </div>
                <h3 className="font-headline text-3xl sm:text-4xl text-black">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Visual */}
            <div
              className="border-2 border-black mb-6 overflow-hidden bg-white flex items-center justify-center"
              style={{ aspectRatio: selectedProject.imageAspect || '16 / 9', maxHeight: '420px' }}
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.imageAlt}
                className="w-full h-full manga-halftone-img"
                style={{ objectFit: selectedProject.imageFit || 'contain', objectPosition: 'center' }}
              />
            </div>

            {/* Detailed Verified Bullet Points */}
            <div className="space-y-4 mb-6">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-black pb-1">
                ENGINEERING SPECIFICATIONS & CONTRIBUTIONS:
              </h4>
              <ul className="space-y-3 font-sans text-sm text-neutral-800">
                {selectedProject.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-black flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Tech Stack */}
            <div className="mb-6">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-black pb-1 mb-2">
                TECHNOLOGY STACK:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-black text-white font-mono text-xs font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Close action */}
            <div className="pt-4 border-t-2 border-black flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 bg-black text-white font-mono text-xs font-bold uppercase hover:bg-neutral-800 transition-colors cursor-pointer shadow-[3px_3px_0px_#000]"
              >
                CLOSE SPECIFICATION [ESC]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
