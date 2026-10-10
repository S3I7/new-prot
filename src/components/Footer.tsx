import { ArrowUp, Terminal } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t-2 border-black py-10 px-4 sm:px-6 relative select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Colophon Info */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-headline text-xl font-bold">
            07
          </div>
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-black">
              ARRSATH SH3RIF7 J &bull; VOLUME 01
            </div>
            <div className="font-mono text-[11px] text-neutral-500">
              JAVA BACKEND ARCHITECT &bull; CHENNAI, INDIA
            </div>
          </div>
        </div>

        {/* Center: System Spec */}
        <div className="font-mono text-xs text-neutral-600 flex items-center gap-2 text-center">
          <Terminal size={14} className="text-black inline" />
          <span>BUILT WITH REACT &bull; TYPESCRIPT &bull; GSAP &bull; PURE CSS</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3.5 py-2 border-2 border-black bg-white hover:bg-black hover:text-white font-mono text-xs font-bold uppercase transition-all shadow-[2px_2px_0px_#000000] cursor-pointer"
          aria-label="Scroll back to top"
        >
          <span>RETURN TO TOP</span>
          <ArrowUp size={14} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-neutral-200 text-center font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
        &copy; {new Date().getFullYear()} ARRSATH SH3RIF7 J. ALL ORIGINAL ASSETS PRESERVED. NO FABRICATED ARTWORK.
      </div>
    </footer>
  );
};
