import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

const DetailsModal = ({ site, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (site) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [site]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !site) return;

    // Start every manual at the top smoothly
    el.scrollTop = 0;

    // Use the browser's native scrolling pipeline for maximum responsiveness.
    el.style.WebkitOverflowScrolling = 'touch';
    el.style.overscrollBehavior = 'contain';
    el.style.scrollBehavior = 'smooth'; // Changed to smooth for better manual navigation

    // Keep the scrolling surface isolated from the rest of the page.
    el.style.contain = 'layout paint';
    el.style.willChange = 'scroll-position';
  }, [site]);

  if (!site && !isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-12 transition-all duration-700 ease-[0.16,1,0.3,1] ${site ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#000000]/90 backdrop-blur-md cursor-pointer transition-opacity duration-700 ease-[0.16,1,0.3,1]"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative w-full max-w-5xl max-h-full bg-[#0a0a0a] border border-[#1f2937] rounded-2xl md:rounded-[2rem] flex flex-col transition-all duration-700 ease-[0.16,1,0.3,1] shadow-2xl ${site ? 'scale-100 translate-y-0' : 'scale-[0.98] translate-y-8'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-[#1f2937] bg-[#050505]/80 backdrop-blur-md sticky top-0 z-10 rounded-t-2xl md:rounded-t-[2rem] transition-colors duration-300">
          <h3 className="text-2xl md:text-4xl font-display font-bold text-[#d1d5db] transition-colors duration-300">{site?.name}</h3>
          <div className="flex items-center gap-4">
            <a 
              href={site?.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center px-6 py-3 rounded-full border border-[#374151] bg-[#111827] text-[#9ca3af] font-display font-semibold text-sm tracking-wider uppercase hover:bg-[#1f2937] hover:text-[#f3f4f6] hover:border-[#4b5563] transition-all duration-300 ease-out group"
            >
              Go to Website <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ease-out" />
            </a>
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-full border border-[#374151] flex items-center justify-center text-[#6b7280] hover:bg-[#1f2937] hover:text-[#f3f4f6] hover:border-[#4b5563] hover:rotate-90 transition-all duration-500 ease-out"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div 
          ref={scrollRef}
          className="p-6 md:p-10 lg:p-16 overflow-y-auto custom-scrollbar manual-scroll-container"
        >
          
          <a 
            href={site?.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex sm:hidden w-full mb-12 items-center justify-center px-6 py-3 rounded-full border border-[#374151] bg-[#111827] text-[#9ca3af] font-display font-semibold text-sm tracking-wider uppercase hover:bg-[#1f2937] hover:text-[#f3f4f6] hover:border-[#4b5563] transition-all duration-300 ease-out group"
          >
            Go to Website <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ease-out" />
          </a>

          {/* About Section */}
          <div className="mb-16 reveal-up" style={{ animationDelay: '100ms' }}>
            <h4 className="text-sm font-display text-[#4b5563] uppercase tracking-widest mb-6 flex items-center gap-4">
              <span>About {site?.name}</span>
              <div className="h-[1px] flex-grow bg-[#1f2937] opacity-50"></div>
            </h4>
            <div className="text-lg md:text-xl font-light leading-relaxed text-[#9ca3af] whitespace-pre-wrap transition-colors duration-300">
              {site?.description}
            </div>
          </div>

          {/* Shortcuts Section */}
          {site?.shortcuts && (
            <div className="mb-16 reveal-up" style={{ animationDelay: '200ms' }}>
              <h4 className="text-sm font-display text-[#4b5563] uppercase tracking-widest mb-6 flex items-center gap-4">
                <span>Keyboard Shortcuts</span>
                <div className="h-[1px] flex-grow bg-[#1f2937] opacity-50"></div>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {site.shortcuts.map((sc, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:bg-[#111827] hover:border-[#374151] transition-all duration-300 ease-out hover:-translate-y-0.5 group cursor-default">
                    <span className="font-display font-semibold tracking-wide text-[#d1d5db] mb-1 sm:mb-0 group-hover:text-white transition-colors duration-300">{sc.key}</span>
                    <span className="text-[#6b7280] font-light text-sm text-left sm:text-right group-hover:text-[#9ca3af] transition-colors duration-300">{sc.action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manual Section */}
          {site?.manual && (
            <div className="reveal-up" style={{ animationDelay: '300ms' }}>
              <h4 className="text-sm font-display text-[#4b5563] uppercase tracking-widest mb-6 flex items-center gap-4">
                <span>User Manual Topics</span>
                <div className="h-[1px] flex-grow bg-[#1f2937] opacity-50"></div>
              </h4>
              <div className="bg-[#0a0a0a] rounded-2xl border border-[#1f2937] p-2 transition-colors duration-300 hover:border-[#374151]">
                {site.manual.map((topic, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border-b border-[#1f2937]/50 last:border-0 group hover:bg-[#111827] rounded-xl transition-all duration-300 ease-out cursor-pointer">
                    <span className="text-xs font-display text-[#374151] group-hover:text-[#6b7280] transition-colors duration-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-light text-[#9ca3af] group-hover:text-[#f3f4f6] group-hover:translate-x-1 transition-all duration-300 ease-out">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
