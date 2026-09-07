import React, { useEffect, useRef } from 'react';

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

export default ParticleNetwork;
