import React, { useEffect, useRef } from 'react';

// Grid resolution of the pixel canvas. Kept small on purpose — the canvas
// is upscaled with CSS `image-rendering: pixelated` so each cell reads as
// a chunky, deliberate pixel rather than an anti-aliased line.
const COLS = 28;
const ROWS = 36;
const TRACE_COUNT = 11;
const DIRECTIONS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const GREY_SHADES = ['#3a3a3a', '#565656', '#737373', '#9a9a9a'];
const NODE_SHADE = '#d9d9d9';

// Deterministic-ish PRNG so the pattern is stable across re-renders of the
// same session (still reshuffles on a full page load).
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGrid(seed) {
  const rand = mulberry32(seed);
  const grid = Array.from({ length: ROWS }, () => new Array(COLS).fill(null));

  for (let t = 0; t < TRACE_COUNT; t++) {
    let x = Math.floor(rand() * COLS);
    let y = Math.floor(rand() * ROWS);
    let dir = DIRECTIONS[Math.floor(rand() * DIRECTIONS.length)];
    const shade = GREY_SHADES[t % GREY_SHADES.length];
    const steps = 8 + Math.floor(rand() * 18);

    for (let s = 0; s < steps; s++) {
      if (x < 0 || x >= COLS || y < 0 || y >= ROWS) break;
      grid[y][x] = shade;

      // Mostly keep going straight — occasional right-angle turn gives the
      // trace-on-a-die look instead of pure noise.
      if (rand() < 0.22) {
        dir = DIRECTIONS[Math.floor(rand() * DIRECTIONS.length)];
      }
      x += dir[0];
      y += dir[1];

      // Drop a small "via" node at bends.
      if (rand() < 0.12 && x >= 0 && x < COLS && y >= 0 && y < ROWS) {
        grid[y][x] = NODE_SHADE;
      }
    }
  }

  // Sparse background static for texture.
  const staticCount = Math.floor(COLS * ROWS * 0.03);
  for (let i = 0; i < staticCount; i++) {
    const x = Math.floor(rand() * COLS);
    const y = Math.floor(rand() * ROWS);
    if (!grid[y][x]) grid[y][x] = '#232323';
  }

  return grid;
}

const PixelPattern = ({ className = '', seed = 7 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = COLS;
    canvas.height = ROWS;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, COLS, ROWS);

    const grid = buildGrid(seed);
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const cell = grid[y][x];
        if (cell) {
          ctx.fillStyle = cell;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }, [seed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ imageRendering: 'pixelated', width: '100%', height: '100%' }}
    />
  );
};

export default PixelPattern;
