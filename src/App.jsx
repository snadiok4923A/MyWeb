import React, {
  useState,
  useEffect,
  useRef,
  memo,
  useCallback,
} from 'react';

import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  X,
} from 'lucide-react';

/* =========================================================
   PROJECT DATA
========================================================= */

const websitesData = [
  {
    id: 'anantachitra',
    name: 'Anantachitra',
    shortDesc:
      'Cinematic wallpaper collection with immersive 3D visuals.',
    url: 'https://snadiok4923a.github.io/ANANTACHITRA/',
    description: `Anantachitra is an interactive wallpaper exploration platform that combines a large visual collection with immersive 3D animations.

The website features a Three.js-powered particle background, responsive masonry gallery, wallpaper search, category filtering, fullscreen image viewing, and direct downloads.

It is designed to make wallpaper discovery feel more like exploring a visual experience than browsing a traditional image gallery.`,
    features: ['3D Experience', 'Interactive', 'Gallery'],
  },

  {
    id: 'thoughtflow',
    name: 'ThoughtFlow',
    shortDesc:
      'A visual thinking and mind-mapping workspace.',
    url: 'https://snadiok4923a.github.io/Thought_Flow/',
    description: `ThoughtFlow is a visual thinking and mind-mapping workspace for organizing ideas, thoughts, knowledge, studies, plans, and projects in a clear and structured way.

It allows users to connect related ideas visually instead of keeping information scattered across separate notes.`,
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
      { key: 'Shift + Drag', action: 'Select nodes' },
    ],

    manual: [
      'Creating a Mind Map',
      'Creating New Nodes By Pressing + on Node',
      'Move The Nodes For Adjustment',
      'Selecting Nodes',
      'Moving Nodes',
      'Writing Detailed Notes',
      'Formatting Notes',
      'Adding Images',
      'Read Mode',
      'Resizing Inspector',
      'Organizing Node Layout',
      'Collapsing Branches',
      'Deleting Nodes',
      'Undo and Redo',
      'Importing and Exporting Mind Maps',
      'Working With Other Files',
      '3 click on a node is going to delete it',
    ],
  },

  {
    id: 'aatmikx',
    name: 'AatmikX',
    shortDesc:
      'Personal portfolio showcasing skills and creative work.',
    url: 'https://snadiok4923a.github.io/AatmikX/',
    description: `AatmikX is a personal portfolio website created to showcase Sandipan Paul's skills, creative work, projects, and professional identity.

It brings together work related to:
• UI/UX Design
• Game Development
• Web Development
• Music Production
• Content Creation
• Information Technology

Visitors can explore skills, projects, creative work, music and gaming work, and professional opportunities/collaboration.`,
    features: ['Portfolio'],
  },

  {
    id: 'aaxmusic',
    name: 'AAX Music',
    shortDesc:
      'Modern music platform for experiencing original sounds.',
    url: 'https://snadiok4923a.github.io/AAX-Music/',
    description: `AAX Music is a personal music platform created around original music and a dedicated listening experience.

Visitors can explore music, playlists, different sound/vibes, and enter the Nexus Player for an immersive listening experience.

It is designed as a modern music platform for experiencing and discovering music.`,
    features: ['Music', 'Nexus Player'],
  },

  {
    id: 'soundspace',
    name: 'SoundSpace',
    shortDesc:
      'Interactive music exploration and visual universe.',
    url: 'https://snadiok4923a.github.io/SPACE/',
    description: `SoundSpace is an interactive music exploration website that presents music as a visual universe of galaxies, genres, and songs.

Instead of presenting music only as a traditional list, users can explore relationships between genres and tracks through an interactive musical universe.

It is designed for music discovery and visual exploration.`,
    features: ['Discovery', 'Interactive'],
  },
];


/* =========================================================
   PARTICLE NETWORK
   Highly optimized Canvas animation
========================================================= */

const ParticleNetwork = memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    });

    if (!ctx) return;

    let animationFrameId = 0;
    let shapeIntervalId = 0;

    let width = 0;
    let height = 0;

    let particles = [];

    let currentShape = 0;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    /*
      Fewer particles on smaller screens.
      This greatly improves mobile performance.
    */

    const getParticleCount = () => {
      if (window.innerWidth < 640) return 42;
      if (window.innerWidth < 1024) return 55;
      return 70;
    };

    const shapes = [
      'infinity',
      'circle',
      'organic',
      'random',
    ];

    const MORPH_DURATION = 5000;

    const CONNECTION_DISTANCE = 125;

    /* -----------------------------------------------------
       RESIZE
    ----------------------------------------------------- */

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        1.5
      );

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      /*
        Using setTransform avoids accumulating scale.
      */

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      createParticles();
    };


    /* -----------------------------------------------------
       TARGET GENERATOR
    ----------------------------------------------------- */

    const generateTargets = (
      shape,
      count
    ) => {
      const targets = [];

      const cx = width * 0.5;
      const cy = height * 0.5;

      const minDim = Math.min(
        width,
        height
      );

      if (shape === 'infinity') {
        const scale = minDim * 0.42;

        for (let i = 0; i < count; i++) {
          const t =
            (i / count) *
            Math.PI *
            2;

          const wobble =
            Math.sin(t * 3) *
            minDim *
            0.008;

          targets.push({
            x:
              cx +
              Math.cos(t) *
                scale *
                0.95,

            y:
              cy +
              Math.sin(t * 2) *
                scale *
                0.38 +
              wobble,
          });
        }
      }

      else if (shape === 'circle') {
        const radius =
          minDim * 0.34;

        for (let i = 0; i < count; i++) {
          const angle =
            (i / count) *
            Math.PI *
            2;

          const radiusVariation =
            Math.sin(i * 1.7) * 8 +
            Math.cos(i * 0.8) * 5;

          const finalRadius =
            radius +
            radiusVariation;

          targets.push({
            x:
              cx +
              Math.cos(angle) *
                finalRadius,

            y:
              cy +
              Math.sin(angle) *
                finalRadius,
          });
        }
      }

      else if (shape === 'organic') {
        for (let i = 0; i < count; i++) {
          const angle =
            (i / count) *
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
                0.75,
          });
        }
      }

      else {
        for (let i = 0; i < count; i++) {
          targets.push({
            x:
              width * 0.15 +
              Math.random() *
                width * 0.7,

            y:
              height * 0.2 +
              Math.random() *
                height * 0.6,
          });
        }
      }

      return targets;
    };


    /* -----------------------------------------------------
       PARTICLE
    ----------------------------------------------------- */

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;

        this.targetX = x;
        this.targetY = y;

        this.radius =
          Math.random() * 1.3 +
          0.8;

        this.phase =
          Math.random() *
          Math.PI *
          2;

        this.speed =
          Math.random() * 0.006 +
          0.002;

        this.floatAmount =
          Math.random() * 0.45 +
          0.15;
      }

      update(time) {
        /*
          Faster exponential-like interpolation
          without expensive easing functions.
        */

        this.x +=
          (this.targetX - this.x) *
          0.035;

        this.y +=
          (this.targetY - this.y) *
          0.035;

        if (!prefersReducedMotion) {
          this.phase += this.speed;

          this.x +=
            Math.cos(
              this.phase +
              time * 0.00012
            ) *
            this.floatAmount;

          this.y +=
            Math.sin(
              this.phase * 1.15 +
              time * 0.0001
            ) *
            this.floatAmount;
        }
      }

      draw() {
        ctx.beginPath();

        ctx.arc(
          this.x,
          this.y,
          this.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          'rgba(255,255,255,0.9)';

        ctx.fill();
      }
    }


    /* -----------------------------------------------------
       CREATE PARTICLES
    ----------------------------------------------------- */

    const createParticles = () => {
      const count =
        getParticleCount();

      const targets =
        generateTargets(
          shapes[currentShape],
          count
        );

      /*
        Keep existing particles where possible
        instead of destroying/recreating everything.
      */

      if (
        particles.length !== count
      ) {
        particles = targets.map(
          target =>
            new Particle(
              target.x,
              target.y
            )
        );
      } else {
        particles.forEach(
          (particle, index) => {
            particle.targetX =
              targets[index].x;

            particle.targetY =
              targets[index].y;
          }
        );
      }
    };


    /* -----------------------------------------------------
       CHANGE SHAPE
    ----------------------------------------------------- */

    const changeShape = () => {
      currentShape =
        (currentShape + 1) %
        shapes.length;

      const targets =
        generateTargets(
          shapes[currentShape],
          particles.length
        );

      particles.forEach(
        (particle, index) => {
          particle.targetX =
            targets[index].x;

          particle.targetY =
            targets[index].y;
        }
      );
    };


    /* -----------------------------------------------------
       CONNECTIONS
    ----------------------------------------------------- */

    const drawConnections = () => {
      const count =
        particles.length;

      const maxDistance =
        CONNECTION_DISTANCE;

      const maxDistanceSquared =
        maxDistance *
        maxDistance;

      /*
        Squared distance avoids Math.sqrt()
        for every particle pair.
      */

      for (let i = 0; i < count; i++) {
        const p1 = particles[i];

        for (
          let j = i + 1;
          j < count;
          j++
        ) {
          const p2 = particles[j];

          const dx =
            p1.x - p2.x;

          const dy =
            p1.y - p2.y;

          const distanceSquared =
            dx * dx +
            dy * dy;

          if (
            distanceSquared <
            maxDistanceSquared
          ) {
            const distance =
              Math.sqrt(
                distanceSquared
              );

            const opacity =
              1 -
              distance /
                maxDistance;

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
                opacity * 0.28
              })`;

            ctx.lineWidth = 0.5;

            ctx.stroke();
          }
        }
      }
    };


    /* -----------------------------------------------------
       ANIMATION
    ----------------------------------------------------- */

    const animate = (time) => {
      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      for (
        let i = 0;
        i < particles.length;
        i++
      ) {
        particles[i].update(time);
      }

      drawConnections();

      for (
        let i = 0;
        i < particles.length;
        i++
      ) {
        particles[i].draw();
      }

      animationFrameId =
        requestAnimationFrame(
          animate
        );
    };


    /* -----------------------------------------------------
       INITIALIZE
    ----------------------------------------------------- */

    resize();

    window.addEventListener(
      'resize',
      resize,
      { passive: true }
    );

    /*
      Don't animate shape changes when
      reduced motion is requested.
    */

    if (!prefersReducedMotion) {
      shapeIntervalId =
        window.setInterval(
          changeShape,
          MORPH_DURATION
        );
    }

    animationFrameId =
      requestAnimationFrame(
        animate
      );


    /* -----------------------------------------------------
       CLEANUP
    ----------------------------------------------------- */

    return () => {
      window.removeEventListener(
        'resize',
        resize
      );

      window.clearInterval(
        shapeIntervalId
      );

      window.cancelAnimationFrame(
        animationFrameId
      );
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 rounded-full bg-white/[0.025] blur-3xl" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-90 mix-blend-screen"
      />
    </div>
  );
});


/* =========================================================
   PROJECT CARD
========================================================= */

const ProjectCard = memo(
  ({ site, index, onClick }) => {
    const handleClick = useCallback(() => {
      onClick(site);
    }, [onClick, site]);

    return (
      <article
        className="
          group
          cursor-pointer
          border
          border-[#1f2937]
          rounded-2xl
          p-8
          bg-[#0a0a0a]/50
          hover:bg-[#111827]
          backdrop-blur-sm
          h-full
          flex
          flex-col
          justify-between
          transition-transform
          transition-colors
          duration-500
          hover:-translate-y-1
          will-change-transform
        "
        style={{
          animationDelay:
            `${(index % 2) * 100}ms`,
        }}
        onClick={handleClick}
      >

        <div>
          <div className="flex justify-between items-start mb-6">

            <h3 className="
              text-3xl
              font-display
              font-bold
              text-[#d1d5db]
              group-hover:text-[#f3f4f6]
              transition-colors
            ">
              {site.name}
            </h3>

            <div className="
              w-10
              h-10
              shrink-0
              rounded-full
              border
              border-[#374151]
              flex
              items-center
              justify-center
              group-hover:border-[#6b7280]
              group-hover:translate-x-1
              group-hover:-translate-y-1
              transition-all
              duration-300
            ">
              <ArrowUpRight
                size={18}
                className="
                  text-[#6b7280]
                  group-hover:text-[#9ca3af]
                "
              />
            </div>

          </div>

          <p className="
            text-[#6b7280]
            font-light
            leading-relaxed
          ">
            {site.shortDesc}
          </p>
        </div>


        {site.features?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">

            {site.features.map(
              feature => (
                <span
                  key={feature}
                  className="
                    text-[10px]
                    font-display
                    uppercase
                    tracking-wider
                    px-2
                    py-1
                    rounded
                    border
                    border-[#374151]
                    bg-[#111827]
                    text-[#6b7280]
                  "
                >
                  {feature}
                </span>
              )
            )}

          </div>
        )}

      </article>
    );
  }
);


/* =========================================================
   DETAILS MODAL
========================================================= */

const DetailsModal = memo(
  ({ site, onClose }) => {
    const [isVisible, setIsVisible] =
      useState(false);

    const scrollRef =
      useRef(null);

    /* -----------------------------------------------------
       OPEN / CLOSE
    ----------------------------------------------------- */

    useEffect(() => {
      if (site) {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });

        document.body.style.overflow =
          'hidden';
      } else {
        setIsVisible(false);

        document.body.style.overflow =
          '';
      }

      return () => {
        document.body.style.overflow =
          '';
      };
    }, [site]);


    /* -----------------------------------------------------
       ESCAPE KEY
    ----------------------------------------------------- */

    useEffect(() => {
      if (!site) return;

      const handleKeyDown = e => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener(
        'keydown',
        handleKeyDown
      );

      return () => {
        window.removeEventListener(
          'keydown',
          handleKeyDown
        );
      };
    }, [site, onClose]);


    /* -----------------------------------------------------
       RESET SCROLL
    ----------------------------------------------------- */

    useEffect(() => {
      if (!site || !scrollRef.current) {
        return;
      }

      scrollRef.current.scrollTop = 0;
    }, [site]);


    if (!site && !isVisible) {
      return null;
    }


    return (
      <div
        className={`
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          p-3
          sm:p-4
          md:p-6
          lg:p-12
          transition-opacity
          duration-300
          ${site
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
          }
        `}
      >

        {/* BACKDROP */}

        <div
          className="
            absolute
            inset-0
            bg-black/90
            backdrop-blur-md
          "
          onClick={onClose}
        />


        {/* MODAL */}

        <div
          className={`
            relative
            w-full
            max-w-5xl
            h-[94vh]
            md:h-auto
            md:max-h-[90vh]
            bg-[#0a0a0a]
            border
            border-[#1f2937]
            rounded-2xl
            md:rounded-[2rem]
            overflow-hidden
            flex
            flex-col
            shadow-2xl
            transition-transform
            duration-300
            ease-out
            ${
              site
                ? 'scale-100 translate-y-0'
                : 'scale-[0.98] translate-y-3'
            }
          `}
        >

          {/* HEADER */}

          <header
            className="
              shrink-0
              flex
              items-center
              justify-between
              gap-4
              p-5
              md:p-8
              border-b
              border-[#1f2937]
              bg-[#050505]/95
              backdrop-blur-xl
            "
          >

            <h3 className="
              text-2xl
              md:text-4xl
              font-display
              font-bold
              text-[#d1d5db]
              truncate
            ">
              {site?.name}
            </h3>


            <div className="
              flex
              items-center
              gap-3
              shrink-0
            ">

              <a
                href={site?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  hidden
                  sm:flex
                  items-center
                  justify-center
                  px-5
                  py-3
                  rounded-full
                  border
                  border-[#374151]
                  bg-[#111827]
                  text-[#9ca3af]
                  font-display
                  font-semibold
                  text-sm
                  tracking-wider
                  uppercase
                  hover:bg-[#1f2937]
                  hover:text-[#d1d5db]
                  transition-colors
                "
                onClick={e =>
                  e.stopPropagation()
                }
              >
                Go to Website

                <ArrowUpRight
                  size={16}
                  className="ml-2"
                />
              </a>


              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="
                  w-11
                  h-11
                  rounded-full
                  border
                  border-[#374151]
                  flex
                  items-center
                  justify-center
                  hover:bg-[#1f2937]
                  transition-colors
                "
              >
                <X
                  size={20}
                  className="text-[#9ca3af]"
                />
              </button>

            </div>
          </header>


          {/* CONTENT */}

          <main
            ref={scrollRef}
            className="
              flex-1
              min-h-0
              overflow-y-auto
              overscroll-contain
              touch-pan-y
              scroll-smooth
              [scrollbar-width:thin]
              [scrollbar-color:#374151_transparent]
            "
          >

            <div className="
              p-6
              md:p-10
              lg:p-12
            ">

              {/* DESCRIPTION */}

              <div className="
                max-w-3xl
                text-[#9ca3af]
                leading-8
                whitespace-pre-line
                font-light
              ">
                {site?.description}
              </div>


              {/* FEATURES */}

              {site?.features?.length > 0 && (
                <section className="mt-10">

                  <h4 className="
                    text-xs
                    uppercase
                    tracking-[0.25em]
                    text-[#6b7280]
                    mb-4
                  ">
                    Features
                  </h4>

                  <div className="
                    flex
                    flex-wrap
                    gap-2
                  ">

                    {site.features.map(
                      feature => (
                        <span
                          key={feature}
                          className="
                            px-3
                            py-2
                            rounded-lg
                            border
                            border-[#374151]
                            bg-[#111827]
                            text-xs
                            uppercase
                            tracking-wider
                            text-[#9ca3af]
                          "
                        >
                          {feature}
                        </span>
                      )
                    )}

                  </div>

                </section>
              )}


              {/* SHORTCUTS */}

              {site?.shortcuts?.length > 0 && (
                <section className="mt-12">

                  <h4 className="
                    text-xs
                    uppercase
                    tracking-[0.25em]
                    text-[#6b7280]
                    mb-5
                  ">
                    Shortcuts
                  </h4>

                  <div className="
                    border
                    border-[#1f2937]
                    rounded-xl
                    overflow-hidden
                  ">

                    {site.shortcuts.map(
                      shortcut => (
                        <div
                          key={shortcut.key}
                          className="
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-center
                            justify-between
                            gap-3
                            px-4
                            py-4
                            border-b
                            border-[#1f2937]
                            last:border-b-0
                          "
                        >

                          <kbd className="
                            w-fit
                            px-2
                            py-1
                            rounded
                            bg-[#111827]
                            border
                            border-[#374151]
                            text-xs
                            text-[#d1d5db]
                            font-mono
                          ">
                            {shortcut.key}
                          </kbd>

                          <span className="
                            text-sm
                            text-[#6b7280]
                            sm:text-right
                          ">
                            {shortcut.action}
                          </span>

                        </div>
                      )
                    )}

                  </div>

                </section>
              )}


              {/* MANUAL */}

              {site?.manual?.length > 0 && (
                <section className="mt-12">

                  <h4 className="
                    text-xs
                    uppercase
                    tracking-[0.25em]
                    text-[#6b7280]
                    mb-5
                  ">
                    User Manual
                  </h4>

                  <div className="
                    grid
                    sm:grid-cols-2
                    gap-3
                  ">

                    {site.manual.map(
                      (item, index) => (
                        <div
                          key={`${item}-${index}`}
                          className="
                            p-4
                            rounded-xl
                            border
                            border-[#1f2937]
                            bg-[#0d0d0d]
                            text-sm
                            text-[#9ca3af]
                          "
                        >
                          <span className="
                            text-[#4b5563]
                            mr-3
                            font-mono
                          ">
                            {String(
                              index + 1
                            ).padStart(2, '0')}
                          </span>

                          {item}
                        </div>
                      )
                    )}

                  </div>

                </section>
              )}


              {/* MOBILE WEBSITE BUTTON */}

              <div className="
                sm:hidden
                mt-10
              ">

                <a
                  href={site?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full
                    flex
                    items-center
                    justify-center
                    px-5
                    py-4
                    rounded-full
                    border
                    border-[#374151]
                    bg-[#111827]
                    text-[#d1d5db]
                    font-semibold
                    text-sm
                    uppercase
                    tracking-wider
                  "
                >
                  Go to Website

                  <ArrowUpRight
                    size={16}
                    className="ml-2"
                  />
                </a>

              </div>

            </div>
          </main>

        </div>
      </div>
    );
  }
);


/* =========================================================
   MAIN APP
========================================================= */

const App = () => {
  const [selectedSite, setSelectedSite] =
    useState(null);

  const openProject = useCallback(
    site => {
      setSelectedSite(site);
    },
    []
  );

  const closeProject = useCallback(
    () => {
      setSelectedSite(null);
    },
    []
  );

  return (
    <div className="
      relative
      min-h-screen
      bg-[#050505]
      text-white
      overflow-x-hidden
    ">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="
        fixed
        inset-0
        pointer-events-none
        overflow-hidden
      ">

        <ParticleNetwork />

      </div>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="
        relative
        z-10
        w-full
      ">

        {/* HERO */}

        <section className="
          min-h-[70vh]
          flex
          items-center
          justify-center
          px-6
          py-24
        ">

          <div className="
            max-w-5xl
            text-center
          ">

            <p className="
              mb-5
              text-xs
              uppercase
              tracking-[0.4em]
              text-[#6b7280]
            ">
              Selected Works
            </p>

            <h1 className="
              text-5xl
              sm:text-6xl
              md:text-8xl
              font-display
              font-bold
              tracking-tight
              text-[#e5e7eb]
            ">
              Digital
              <span className="text-[#6b7280]">
                {' '}Experiences
              </span>
            </h1>

            <p className="
              max-w-2xl
              mx-auto
              mt-7
              text-[#6b7280]
              leading-7
              font-light
            ">
              A collection of interactive websites,
              creative experiments and digital
              experiences.
            </p>

          </div>

        </section>


        {/* PROJECT GRID */}

        <section className="
          max-w-7xl
          mx-auto
          px-6
          pb-32
        ">

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          ">

            {websitesData.map(
              (site, index) => (
                <ProjectCard
                  key={site.id}
                  site={site}
                  index={index}
                  onClick={openProject}
                />
              )
            )}

          </div>

        </section>

      </main>


      {/* =================================================
          MODAL
      ================================================= */}

      <DetailsModal
        site={selectedSite}
        onClose={closeProject}
      />

    </div>
  );
};


export default App;
