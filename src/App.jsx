import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, ArrowUpRight, X } from 'lucide-react';

const websitesData = [
    {
  id: 'anantachitra',
  name: 'Anantachitra',
  shortDesc: 'Cinematic wallpaper collection with immersive 3D visuals.',
  url: 'https://snadiok4923a.github.io/ANANTACHITRA/',
  description: `Anantachitra is an interactive wallpaper exploration platform that combines a large visual collection with immersive 3D animations.

The website features a Three.js-powered particle background, responsive masonry gallery, wallpaper search, category filtering, fullscreen image viewing, and direct downloads.

It is designed to make wallpaper discovery feel more like exploring a visual experience than browsing a traditional image gallery.`,
  features: ['3D Experience', 'Interactive', 'Gallery']
},
  {
    id: 'thoughtflow',
    name: 'ThoughtFlow',
    shortDesc: 'A visual thinking and mind-mapping workspace.',
    url: 'https://snadiok4923a.github.io/Thought_Flow/',
    description: `ThoughtFlow is a visual thinking and mind-mapping workspace for organizing ideas, thoughts, knowledge, studies, plans, and projects in a clear and structured way.\n\nIt allows users to connect related ideas visually instead of keeping information scattered across separate notes.`,
    features: ['Shortcuts', 'User Manual'],
    shortcuts: [
      { key: 'Ctrl + Z', action: 'Undo last Mind Map action' },
      { key: 'Ctrl + Shift + Z', action: 'Redo last Mind Map action' },
      { key: 'Ctrl + Shift + X', action: 'Toggle Preview window' },
      { key: 'Ctrl + Alt + Z', action: 'Reset Node Inspector/sidebar width' },
      { key: 'Ctrl + Alt + X', action: 'Open/close Node Inspector' },
      { key: 'Delete', action: 'Delete selected node/nodes' },
      { key: 'Triple Left Click', action: 'Delete node' },
      { key: 'Alt + +', action: 'Zoom In Mind Map' },
      { key: 'Alt + -', action: 'Zoom Out' },
      { key: 'Alt + 0', action: 'Reset file-content zoom' },
      { key: 'Shift + Drag', action: 'Select nodes' }
    ],
    manual: [
      'Creating a Mind Map', 'Creating New Nodes By Pressing + on Node', 'Move The Nodes For Adjustment',
      'Selecting Nodes', 'Moving Nodes', 'Writing Detailed Notes',
      'Formatting Notes', 'Adding Images', 'Read Mode',
      'Resizing Inspector', 'Organizing Node Layout', 'Collapsing Branches',
      'Deleting Nodes', 'Undo and Redo', 'Importing and Exporting Mind Maps',
      'Working With Other Files', '3 click on a node is going to delete it'
    ]
    },
  {
    id: 'aatmikx',
    name: 'AatmikX',
    shortDesc: 'Personal portfolio showcasing skills and creative work.',
    url: 'https://snadiok4923a.github.io/AatmikX/',
    description: `AatmikX is a personal portfolio website created to showcase Sandipan Paul's skills, creative work, projects, and professional identity.\n\nIt brings together work related to:\n• UI/UX Design\n• Game Development\n• Web Development\n• Music Production\n• Content Creation\n• Information Technology\n\nVisitors can explore skills, projects, creative work, music and gaming work, and professional opportunities/collaboration.`,
    features: ['Portfolio']
  },
  {
    id: 'aaxmusic',
    name: 'AAX Music',
    shortDesc: 'Modern music platform for experiencing original sounds.',
    url: 'https://snadiok4923a.github.io/AAX-Music/',
    description: `AAX Music is a personal music platform created around original music and a dedicated listening experience.\n\nVisitors can explore music, playlists, different sound/vibes, and enter the Nexus Player for an immersive listening experience.\n\nIt is designed as a modern music platform for experiencing and discovering music.`,
    features: ['Music', 'Nexus Player']
  },
  {
    id: 'soundspace',
    name: 'SoundSpace',
    shortDesc: 'Interactive music exploration and visual universe.',
    url: 'https://snadiok4923a.github.io/SPACE/',
    description: `SoundSpace is an interactive music exploration website that presents music as a visual universe of galaxies, genres, and songs.\n\nInstead of presenting music only as a traditional list, users can explore relationships between genres and tracks through an interactive musical universe.\n\nIt is designed for music discovery and visual exploration.`,
    features: ['Discovery', 'Interactive']
  },

  
];

const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let shapeInterval;
    let particles = [];
    let width = 0;
    let height = 0;

    // --------------------------------------------------
    // CONFIG
    // --------------------------------------------------

    const NUM_PARTICLES = 70;
    const MORPH_DURATION = 5000;
    const CONNECTION_DISTANCE = 125;

    let currentShape = 0;

    const shapes = [
      'infinity',
      'circle',
      'organic',
      'random'
    ];

    // --------------------------------------------------
    // RESIZE
    // --------------------------------------------------

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // --------------------------------------------------
    // TARGET GENERATION
    // --------------------------------------------------

    const generateTargets = (shape) => {
      const targets = [];

      const cx = width / 2;
      const cy = height / 2;

      const minDim = Math.min(width, height);

      // ----------------------------------------------
      // INFINITY / LOOP
      // ----------------------------------------------

      if (shape === 'infinity') {
        const scale = minDim * 0.42;

        for (let i = 0; i < NUM_PARTICLES; i++) {
          const t = (i / NUM_PARTICLES) * Math.PI * 2;

          const wobble =
            Math.sin(t * 3.0) * minDim * 0.008;

          const x =
            cx +
            Math.cos(t) *
              scale *
              0.95;

          const y =
            cy +
            Math.sin(t * 2) *
              scale *
              0.38 +
            wobble;

          targets.push({
            x,
            y
          });
        }
      }

      // ----------------------------------------------
      // CIRCLE
      // ----------------------------------------------

      else if (shape === 'circle') {
        const radius = minDim * 0.34;

        for (let i = 0; i < NUM_PARTICLES; i++) {
          const angle =
            (i / NUM_PARTICLES) *
            Math.PI *
            2;

          const radiusVariation =
            Math.sin(i * 1.7) * 8 +
            Math.cos(i * 0.8) * 5;

          targets.push({
            x:
              cx +
              Math.cos(angle) *
                (radius + radiusVariation),

            y:
              cy +
              Math.sin(angle) *
                (radius + radiusVariation)
          });
        }
      }

      // ----------------------------------------------
      // ORGANIC BLOB
      // ----------------------------------------------

      else if (shape === 'organic') {
        for (let i = 0; i < NUM_PARTICLES; i++) {
          const angle =
            (i / NUM_PARTICLES) *
            Math.PI *
            2;

          const wave =
            Math.sin(angle * 3) * 20 +
            Math.cos(angle * 5) * 12;

          const radius =
            minDim * 0.24 +
            wave;

          targets.push({
            x:
              cx +
              Math.cos(angle) *
                radius,

            y:
              cy +
              Math.sin(angle) *
                radius *
                0.75
          });
        }
      }

      // ----------------------------------------------
      // RANDOM / SCATTER
      // ----------------------------------------------

      else {
        for (let i = 0; i < NUM_PARTICLES; i++) {
          targets.push({
            x:
              width * 0.15 +
              Math.random() *
                width * 0.7,

            y:
              height * 0.2 +
              Math.random() *
                height * 0.6
          });
        }
      }

      return targets;
    };

    // --------------------------------------------------
    // PARTICLE
    // --------------------------------------------------

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;

        this.targetX = x;
        this.targetY = y;

        this.baseX = x;
        this.baseY = y;

        this.radius =
          Math.random() * 1.5 + 1;

        this.phase =
          Math.random() *
          Math.PI *
          2;

        this.speed =
          Math.random() * 0.008 +
          0.003;

        this.floatAmount =
          Math.random() * 0.7 +
          0.3;
      }

      update(time) {
        // --------------------------------------------
        // SMOOTH MORPH
        // --------------------------------------------

        const dx =
          this.targetX - this.x;

        const dy =
          this.targetY - this.y;

        this.x += dx * 0.025;
        this.y += dy * 0.025;

        // --------------------------------------------
        // ORGANIC FLOATING
        // --------------------------------------------

        this.phase += this.speed;

        this.x +=
          Math.cos(
            this.phase + time * 0.00015
          ) *
          this.floatAmount;

        this.y +=
          Math.sin(
            this.phase * 1.15 +
            time * 0.00012
          ) *
          this.floatAmount;
      }

      draw() {
        // Small soft glow

        ctx.beginPath();

        ctx.arc(
          this.x,
          this.y,
          this.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          'rgba(255,255,255,0.95)';

        ctx.fill();
      }
    }

    // --------------------------------------------------
    // INITIALIZE
    // --------------------------------------------------

    const initialize = () => {
      resize();

      particles = [];

      const targets =
        generateTargets(
          shapes[currentShape]
        );

      for (
        let i = 0;
        i < NUM_PARTICLES;
        i++
      ) {
        const p = new Particle(
          targets[i].x,
          targets[i].y
        );

        p.targetX = targets[i].x;
        p.targetY = targets[i].y;

        particles.push(p);
      }
    };

    // --------------------------------------------------
    // CHANGE SHAPE
    // --------------------------------------------------

    const changeShape = () => {
      currentShape =
        (currentShape + 1) %
        shapes.length;

      const targets =
        generateTargets(
          shapes[currentShape]
        );

      particles.forEach((particle, i) => {
        particle.targetX =
          targets[i].x;

        particle.targetY =
          targets[i].y;
      });
    };

    // --------------------------------------------------
    // DRAW CONNECTIONS
    // --------------------------------------------------

    const drawConnections = () => {
      for (
        let i = 0;
        i < particles.length;
        i++
      ) {
        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx =
            p1.x - p2.x;

          const dy =
            p1.y - p2.y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          if (
            distance <
            CONNECTION_DISTANCE
          ) {
            const opacity =
              1 -
              distance /
                CONNECTION_DISTANCE;

            ctx.beginPath();

            ctx.moveTo(
              p1.x,
              p1.y
            );

            ctx.lineTo(
              p2.x,
              p2.y
            );

            ctx.strokeStyle =
              `rgba(190,210,255,${
                opacity * 0.32
              })`;

            ctx.lineWidth =
              0.55;

            ctx.stroke();
          }
        }
      }
    };

    // --------------------------------------------------
    // ANIMATION LOOP
    // --------------------------------------------------

    const animate = (time) => {
      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      // Update particles

      particles.forEach(
        particle =>
          particle.update(time)
      );

      // Connections first

      drawConnections();

      // Nodes

      particles.forEach(
        particle =>
          particle.draw()
      );

      animationFrameId =
        requestAnimationFrame(
          animate
        );
    };

    // --------------------------------------------------
    // START
    // --------------------------------------------------

    initialize();

    window.addEventListener(
      'resize',
      resize
    );

    shapeInterval =
      setInterval(
        changeShape,
        MORPH_DURATION
      );

    animationFrameId =
      requestAnimationFrame(
        animate
      );

    // --------------------------------------------------
    // CLEANUP
    // --------------------------------------------------

    return () => {
      window.removeEventListener(
        'resize',
        resize
      );

      clearInterval(
        shapeInterval
      );

      cancelAnimationFrame(
        animationFrameId
      );
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-white/[0.025] blur-3xl pointer-events-none" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-90 mix-blend-screen"
      />
    </div>
  );
};

const ProjectCard = ({ site, index, onClick }) => {
  return (
    <div 
      className={`group cursor-pointer border border-[#1f2937] rounded-2xl p-8 bg-[#0a0a0a]/50 hover:bg-[#111827] backdrop-blur-sm h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-1`}
      style={{ animationDelay: `${(index % 2) * 100}ms` }}
      onClick={() => onClick(site)}
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl font-display font-bold text-[#d1d5db] group-hover:text-[#f3f4f6] transition-colors">{site.name}</h3>
          <div className="w-10 h-10 rounded-full border border-[#374151] flex items-center justify-center group-hover:border-[#6b7280] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
            <ArrowUpRight size={18} className="text-[#6b7280] group-hover:text-[#9ca3af]" />
          </div>
        </div>
        <p className="text-[#6b7280] font-light leading-relaxed">{site.shortDesc}</p>
      </div>
      
      {site.features && (
        <div className="mt-8 flex flex-wrap gap-2">
          {site.features.map(f => (
            <span key={f} className="text-[10px] font-display uppercase tracking-wider px-2 py-1 rounded border border-[#374151] bg-[#111827] text-[#6b7280]">
              {f}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

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

    // Reset scroll position to top when opening a new site
    el.scrollTop = 0;
    
    // Respect accessibility settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        el.style.WebkitOverflowScrolling = 'touch';
        return;
    }

    let targetY = el.scrollTop;
    let currentY = el.scrollTop;
    let rafId = null;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const render = () => {
      // Factor 0.12 provides an ultra-smooth, buttery glide (lowered from 0.2)
      currentY = lerp(currentY, targetY, 0.12); 
      
      // Stop loop if close enough to target
      if (Math.abs(targetY - currentY) < 0.5) {
        currentY = targetY;
        el.scrollTop = currentY;
        rafId = null;
        return;
      }
      
      el.scrollTop = currentY;
      rafId = requestAnimationFrame(render);
    };

    const onWheel = (e) => {
      // Allow standard horizontal scrolling to function normally
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      e.preventDefault();
      const maxScroll = el.scrollHeight - el.clientHeight;
      
      // Calculate target position with boundaries
      targetY = Math.max(0, Math.min(maxScroll, targetY + e.deltaY));

      if (!rafId) {
        currentY = el.scrollTop; 
        rafId = requestAnimationFrame(render);
      }
    };

    const onScroll = () => {
      // Sync coordinates immediately if the user manually drags the scrollbar or uses native touch swipe
      if (!rafId) {
        targetY = el.scrollTop;
        currentY = el.scrollTop;
      }
    };

    // Enhance native mobile feel
    el.style.WebkitOverflowScrolling = 'touch';
    el.style.overscrollBehaviorY = 'contain';

    // passive: false is required so we can call e.preventDefault() on wheel ticks
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [site]);

  if (!site && !isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-12 transition-all duration-500 ${site ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#000000]/90 backdrop-blur-md cursor-pointer transition-opacity duration-500"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative w-full max-w-5xl max-h-full bg-[#0a0a0a] border border-[#1f2937] rounded-2xl md:rounded-[2rem] flex flex-col transition-all duration-500 shadow-2xl ${site ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-[#1f2937] bg-[#050505]/80 backdrop-blur-sm sticky top-0 z-10 rounded-t-2xl md:rounded-t-[2rem]">
          <h3 className="text-2xl md:text-4xl font-display font-bold text-[#d1d5db]">{site?.name}</h3>
          <div className="flex items-center gap-4">
            <a 
              href={site?.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center px-6 py-3 rounded-full border border-[#374151] bg-[#111827] text-[#9ca3af] font-display font-semibold text-sm tracking-wider uppercase hover:bg-[#1f2937] hover:text-[#d1d5db] transition-colors"
            >
              Go to Website <ArrowUpRight size={16} className="ml-2" />
            </a>
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-full border border-[#374151] flex items-center justify-center text-[#6b7280] hover:bg-[#1f2937] hover:text-[#d1d5db] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div 
          ref={scrollRef}
          className="p-6 md:p-10 lg:p-16 overflow-y-auto custom-scrollbar"
        >
          
          <a 
            href={site?.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex sm:hidden w-full mb-12 items-center justify-center px-6 py-3 rounded-full border border-[#374151] bg-[#111827] text-[#9ca3af] font-display font-semibold text-sm tracking-wider uppercase hover:bg-[#1f2937] hover:text-[#d1d5db] transition-colors"
          >
            Go to Website <ArrowUpRight size={16} className="ml-2" />
          </a>

          {/* About Section */}
          <div className="mb-16">
            <h4 className="text-sm font-display text-[#4b5563] uppercase tracking-widest mb-6 flex items-center gap-4">
              <span>About {site?.name}</span>
              <div className="h-[1px] flex-grow bg-[#1f2937]"></div>
            </h4>
            <div className="text-lg md:text-xl font-light leading-relaxed text-[#9ca3af] whitespace-pre-wrap">
              {site?.description}
            </div>
          </div>

          {/* Shortcuts Section */}
          {site?.shortcuts && (
            <div className="mb-16">
              <h4 className="text-sm font-display text-[#4b5563] uppercase tracking-widest mb-6 flex items-center gap-4">
                <span>Keyboard Shortcuts</span>
                <div className="h-[1px] flex-grow bg-[#1f2937]"></div>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {site.shortcuts.map((sc, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:bg-[#111827] transition-colors">
                    <span className="font-display font-semibold tracking-wide text-[#d1d5db] mb-1 sm:mb-0">{sc.key}</span>
                    <span className="text-[#6b7280] font-light text-sm text-left sm:text-right">{sc.action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manual Section */}
          {site?.manual && (
            <div>
              <h4 className="text-sm font-display text-[#4b5563] uppercase tracking-widest mb-6 flex items-center gap-4">
                <span>User Manual Topics</span>
                <div className="h-[1px] flex-grow bg-[#1f2937]"></div>
              </h4>
              <div className="bg-[#0a0a0a] rounded-2xl border border-[#1f2937] p-2">
                {site.manual.map((topic, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border-b border-[#1f2937] last:border-0 group">
                    <span className="text-xs font-display text-[#374151] group-hover:text-[#6b7280] transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-light text-[#9ca3af]">{topic}</span>
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

export default function App() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle escape key for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedSite) {
        setSelectedSite(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSite]);

  // Handle ultra-smooth page transitions
  const navigateTo = (page) => {
    if (page === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 400); // Wait for fade out before swapping content
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#9ca3af] font-sans selection:bg-[#374151] selection:text-[#d1d5db] overflow-hidden">
      
      {/* Global Styles injected safely via style tag in React */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@400;600;700;800&display=swap');
        
        * { 
          box-sizing: border-box; 
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #030303; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #374151; }

        @keyframes text-gradient-loop {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .colorful-gradient-text {
          background: linear-gradient(to right, #38bdf8, #818cf8, #c084fc, #e879f9, #38bdf8);
          background-size: 200% auto;
          color: #000;
          background-clip: text;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-gradient-loop 6s linear infinite, minimal-float 8s ease-in-out infinite;
          will-change: background-position, transform;
        }

        /* GPU Hardware Acceleration for Canvases */
        .hardware-accelerated {
          transform: translateZ(0);
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        .bg-grid {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; z-index: 0;
          display: flex; justify-content: space-evenly;
          opacity: 0.15;
        }
        
        .bg-grid-line {
          width: 1px; height: 100%;
          background: linear-gradient(to bottom, transparent, #111111, transparent);
        }

        /* Ultra-smooth Reveal Animations */
        .reveal-up {
          animation: revealUpAnim 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(30px);
          will-change: transform, opacity;
        }

        @keyframes revealUpAnim {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Page Transition Animations */
        .page-fade-enter {
          animation: pageFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .page-fade-exit {
          animation: pageFadeOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pageFadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-15px); }
        }

        @keyframes shimmer-sweep {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .premium-shine {
          background: linear-gradient(
            110deg, 
            #6b7280 20%, 
            #4b5563 40%, 
            #ffffff 50%, 
            #4b5563 60%, 
            #6b7280 80%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer-sweep 3.5s linear infinite;
        }

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}} />

      {/* Global Background Grid Lines */}
      <div className="bg-grid">
        <div className="bg-grid-line"></div>
        <div className="bg-grid-line hidden md:block"></div>
        <div className="bg-grid-line"></div>
        <div className="bg-grid-line hidden md:block"></div>
        <div className="bg-grid-line"></div>
      </div>

      <main className={`relative z-10 container mx-auto px-6 md:px-12 lg:px-24 transition-opacity duration-500 ${isTransitioning ? 'page-fade-exit' : 'page-fade-enter'}`}>
        
        {currentPage === 'home' ? (
          <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between relative pt-20 pb-12 gap-12">
            
            {/* Left Column: Text & Intro */}
            <div className="flex-1 w-full max-w-2xl reveal-up z-20">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-[1px] w-12 bg-[#374151]"></div>
                <span className="font-display tracking-widest text-xs uppercase text-[#6b7280]">Creator: Sandipan Paul</span>
              </div>
              
              <h1 className="text-7xl md:text-8xl lg:text-[9rem] font-display font-bold leading-[0.9] tracking-tighter mb-8 colorful-gradient-text">
                My<br/>Web.
              </h1>
              
              <p className="text-lg md:text-xl text-[#6b7280] font-light leading-relaxed mb-12 border-l border-[#374151] pl-6">
                A central collection of my websites and digital projects. 
                It allows visitors to discover my different projects, understand what each website is made for, and directly visit the websites.
              </p>

              <button 
                onClick={() => navigateTo('collection')}
                className="flex items-center gap-3 hover:text-[#d1d5db] text-[#6b7280] transition-colors duration-500 ease-out cursor-pointer border-none bg-transparent group"
              >
                <div className="w-8 h-8 rounded-full border border-[#1f2937] flex items-center justify-center group-hover:border-[#4b5563] group-hover:bg-[#111] transition-all duration-500 ease-out">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-500 ease-out" />
                </div>
                <span className="text-sm font-display uppercase tracking-widest premium-shine group-hover:brightness-125 transition-all duration-500">View Collection</span>
              </button>
            </div>

            {/* Right Column: Shape-shifting Node Diagram */}
            <div className="flex-1 w-full h-[50vh] lg:h-screen lg:absolute lg:right-0 lg:top-0 lg:w-1/2 reveal-up delay-200 pointer-events-none lg:pointer-events-auto hardware-accelerated">
              <ParticleNetwork />
            </div>

          </section>
        ) : (
          <section className="py-24 min-h-screen relative z-20">
            
            {/* Back to Home Button */}
            <button 
              onClick={() => navigateTo('home')}
              className="mb-16 flex items-center gap-3 hover:text-[#d1d5db] text-[#6b7280] transition-colors duration-500 ease-out cursor-pointer border-none bg-transparent group reveal-up"
            >
              <div className="w-8 h-8 rounded-full border border-[#1f2937] flex items-center justify-center group-hover:border-[#4b5563] group-hover:bg-[#111] transition-all duration-500 ease-out">
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-500 ease-out" />
              </div>
              <span className="text-sm font-display uppercase tracking-widest">Home</span>
            </button>

            <div className="mb-16 reveal-up delay-100">
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4 flex items-baseline gap-4 text-[#d1d5db]">
                Collection <span className="text-[#374151] text-2xl font-light">04</span>
              </h2>
              <div className="h-[1px] w-full bg-[#1f2937]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {websitesData.map((site, index) => (
                <ProjectCard 
                  key={site.id} 
                  site={site} 
                  index={index} 
                  onClick={(s) => setSelectedSite(s)} 
                />
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Dynamic Details Modal */}
      <DetailsModal 
        site={selectedSite} 
        onClose={() => setSelectedSite(null)} 
      />

    </div>
  );
}
