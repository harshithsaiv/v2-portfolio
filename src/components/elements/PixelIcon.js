import React from 'react';

// Hand-drawn 8x8 pixel glyphs, single color via currentColor, crisp edges.
// Kept chunky (2-cell-wide strokes/teeth) so silhouettes stay legible at
// small render sizes instead of washing out into a blur.
const ICONS = {
  // Square ring + center core: reads as a chip/die.
  chip: [
    [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6],
    [1, 2], [1, 3], [1, 4], [1, 5],
    [6, 2], [6, 3], [6, 4], [6, 5],
    [3, 3], [4, 3], [3, 4], [4, 4],
  ],
  // Bold zigzag bolt.
  bolt: [
    [4, 0], [5, 0],
    [3, 1], [4, 1], [5, 1],
    [2, 2], [3, 2], [4, 2],
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
    [2, 4], [3, 4], [4, 4], [5, 4],
    [3, 5], [4, 5],
    [2, 6], [3, 6],
    [1, 7], [2, 7],
  ],
  // Five-node network: center hub connected N/S/E/W.
  network: [
    [3, 3], [4, 3], [3, 4], [4, 4],
    [3, 0], [4, 0], [3, 1], [4, 1],
    [3, 6], [4, 6], [3, 7], [4, 7],
    [0, 3], [1, 3], [0, 4], [1, 4],
    [6, 3], [7, 3], [6, 4], [7, 4],
    [3, 2], [4, 2], [3, 5], [4, 5],
    [2, 3], [2, 4], [5, 3], [5, 4],
  ],
  // Two overlapping square rings.
  chain: [
    [0, 0], [1, 0], [2, 0], [3, 0],
    [0, 3], [1, 3], [2, 3], [3, 3],
    [0, 1], [0, 2], [3, 1], [3, 2],
    [4, 4], [5, 4], [6, 4], [7, 4],
    [4, 7], [5, 7], [6, 7], [7, 7],
    [4, 5], [4, 6], [7, 5], [7, 6],
  ],
  // Octagonal ring: reads as a cog/gear without colliding with the
  // cross-shaped network icon.
  gear: [
    [2, 0], [3, 0], [4, 0], [5, 0],
    [1, 1], [6, 1],
    [0, 2], [2, 2], [3, 2], [4, 2], [5, 2], [7, 2],
    [0, 3], [2, 3], [5, 3], [7, 3],
    [0, 4], [2, 4], [5, 4], [7, 4],
    [0, 5], [2, 5], [3, 5], [4, 5], [5, 5], [7, 5],
    [1, 6], [6, 6],
    [2, 7], [3, 7], [4, 7], [5, 7],
  ],
  // Solid body with a notch cut from one side and a knob on the other.
  puzzle: [
    [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
    [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
    [1, 4], [2, 4], [3, 4], [4, 4], [5, 4],
    [1, 5], [2, 5], [3, 5], [4, 5], [5, 5],
    [6, 2], [7, 2], [6, 3], [7, 3],
  ],
};

const PixelIcon = ({ name, className = '' }) => {
  const cells = ICONS[name] || [];
  return (
    <svg viewBox="0 0 8 8" className={className} shapeRendering="crispEdges" aria-hidden="true">
      {cells.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={1} height={1} fill="currentColor" />
      ))}
    </svg>
  );
};

export default PixelIcon;
