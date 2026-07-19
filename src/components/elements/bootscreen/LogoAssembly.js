import React, { useEffect, useRef, useState } from 'react';
import { rasterizeIcon, ICON_STAGE_SIZE } from './rasterizeIcon';
import { bootLogos } from './bootLogos';

const ASSEMBLE_MS = 420;
const HOLD_MS = 380;
const DISPERSE_MS = 260;
const GAP_MS = 60;
const CYCLE_MS = ASSEMBLE_MS + HOLD_MS + DISPERSE_MS + GAP_MS;

const RAIN_FONT = '13px "JetBrains Mono", monospace';
const PARTICLE_FONT = '12px "JetBrains Mono", monospace';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t) => t * t * t;
const randomChar = () => (Math.random() < 0.5 ? '0' : '1');

// Continuous Matrix-style binary rain, with the current logo's silhouette
// assembled out of the same 0/1 particles on top, cycling through
// bootLogos. Calls onComplete once every logo has had its turn.
const LogoAssembly = ({ width, height, onComplete }) => {
  const canvasRef = useRef(null);
  const [pointSets, setPointSets] = useState(null);
  const [activeLabel, setActiveLabel] = useState(bootLogos[0]?.label ?? '');
  const [showLabel, setShowLabel] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;
    Promise.all(bootLogos.map(({ Icon }) => rasterizeIcon(Icon))).then((sets) => {
      if (!cancelled) setPointSets(sets);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!pointSets || !width || !height) return;

    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const centerX = width / 2;
    const centerY = height / 2;
    const stageOffset = ICON_STAGE_SIZE / 2;

    const colWidth = 16;
    const colCount = Math.ceil(width / colWidth);
    const rainCols = Array.from({ length: colCount }, (_, i) => ({
      x: i * colWidth,
      y: Math.random() * -height,
      speed: 2 + Math.random() * 3,
      char: randomChar(),
    }));

    const randomScatter = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
    });

    const buildParticles = (points) =>
      (points || []).map((p) => {
        const from = randomScatter();
        return {
          targetX: centerX - stageOffset + p.x,
          targetY: centerY - stageOffset + p.y,
          fromX: from.x,
          fromY: from.y,
          outX: randomScatter().x,
          outY: randomScatter().y,
          char: randomChar(),
          locked: false,
        };
      });

    let logoIndex = 0;
    let particles = buildParticles(pointSets[0]);
    let prevPhase = null;
    let completed = false;
    const startTime = performance.now();
    let raf;

    const drawRain = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = RAIN_FONT;
      rainCols.forEach((col) => {
        ctx.fillStyle = 'rgba(100, 255, 218, 0.35)';
        ctx.fillText(col.char, col.x, col.y);
        col.y += col.speed;
        if (Math.random() < 0.05) col.char = randomChar();
        if (col.y > height) {
          col.y = Math.random() * -100;
          col.speed = 2 + Math.random() * 3;
        }
      });
    };

    const drawParticles = (phase, phaseElapsed) => {
      if (phase === 'gap') return;
      ctx.font = PARTICLE_FONT;
      particles.forEach((particle) => {
        let px;
        let py;
        let alpha;

        if (phase === 'assemble') {
          const t = easeOutCubic(Math.min(phaseElapsed / ASSEMBLE_MS, 1));
          px = particle.fromX + (particle.targetX - particle.fromX) * t;
          py = particle.fromY + (particle.targetY - particle.fromY) * t;
          alpha = 0.3 + 0.7 * t;
          if (t > 0.7) particle.locked = true;
          if (!particle.locked && Math.random() < 0.25) particle.char = randomChar();
        } else if (phase === 'hold') {
          px = particle.targetX;
          py = particle.targetY;
          alpha = 1;
        } else {
          const t = easeInCubic(Math.min(phaseElapsed / DISPERSE_MS, 1));
          px = particle.targetX + (particle.outX - particle.targetX) * t;
          py = particle.targetY + (particle.outY - particle.targetY) * t;
          alpha = 1 - t;
        }

        ctx.fillStyle = `rgba(100, 255, 218, ${alpha})`;
        ctx.shadowColor = 'rgba(100, 255, 218, 0.6)';
        ctx.shadowBlur = phase === 'hold' ? 1.5 : 0;
        ctx.fillText(particle.char, px, py);
      });
      ctx.shadowBlur = 0;
    };

    const tick = (now) => {
      drawRain();

      const elapsed = now - startTime;
      const currentLogoIndex = Math.floor(elapsed / CYCLE_MS);

      if (currentLogoIndex >= pointSets.length) {
        if (!completed) {
          completed = true;
          onCompleteRef.current && onCompleteRef.current();
        }
        return;
      }

      if (currentLogoIndex !== logoIndex) {
        logoIndex = currentLogoIndex;
        particles = buildParticles(pointSets[logoIndex]);
        setActiveLabel(bootLogos[logoIndex]?.label ?? '');
      }

      const cycleElapsed = elapsed - logoIndex * CYCLE_MS;
      let phase;
      let phaseElapsed;
      if (cycleElapsed < ASSEMBLE_MS) {
        phase = 'assemble';
        phaseElapsed = cycleElapsed;
      } else if (cycleElapsed < ASSEMBLE_MS + HOLD_MS) {
        phase = 'hold';
        phaseElapsed = cycleElapsed - ASSEMBLE_MS;
      } else if (cycleElapsed < ASSEMBLE_MS + HOLD_MS + DISPERSE_MS) {
        phase = 'disperse';
        phaseElapsed = cycleElapsed - ASSEMBLE_MS - HOLD_MS;
      } else {
        phase = 'gap';
        phaseElapsed = 0;
      }

      if (phase !== prevPhase) {
        if (phase === 'hold') setShowLabel(true);
        if (phase === 'disperse') setShowLabel(false);
        prevPhase = phase;
      }

      drawParticles(phase, phaseElapsed);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pointSets, width, height]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <p
        className="absolute left-1/2 -translate-x-1/2 text-xs font-mono tracking-[0.3em] text-secondary/80 transition-opacity duration-300 uppercase"
        style={{
          top: `calc(50% + ${ICON_STAGE_SIZE / 2 + 28}px)`,
          opacity: showLabel ? 1 : 0,
        }}
      >
        {activeLabel}
      </p>
    </>
  );
};

export default LogoAssembly;
