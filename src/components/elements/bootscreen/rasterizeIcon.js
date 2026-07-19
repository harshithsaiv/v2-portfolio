import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Local coordinate box each icon is rasterized into before being mapped
// onto screen space, and the particle-count ceiling per icon.
export const ICON_STAGE_SIZE = 140;
const MAX_POINTS = 360;
const SAMPLE_STEP = 2;
const ALPHA_THRESHOLD = 100;

// Renders a react-icons component to an offscreen canvas and samples pixel
// positions where the glyph is opaque, so LogoAssembly can animate binary
// digits into that shape instead of just swapping in the SVG directly.
export function rasterizeIcon(Icon) {
  return new Promise((resolve) => {
    const markup = renderToStaticMarkup(
      <Icon size={ICON_STAGE_SIZE} color="#ffffff" />
    );
    const blob = new Blob([markup], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = ICON_STAGE_SIZE;
      canvas.height = ICON_STAGE_SIZE;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, ICON_STAGE_SIZE, ICON_STAGE_SIZE);
      URL.revokeObjectURL(url);

      let points = [];
      try {
        const { data } = ctx.getImageData(0, 0, ICON_STAGE_SIZE, ICON_STAGE_SIZE);
        for (let y = 0; y < ICON_STAGE_SIZE; y += SAMPLE_STEP) {
          for (let x = 0; x < ICON_STAGE_SIZE; x += SAMPLE_STEP) {
            const alpha = data[(y * ICON_STAGE_SIZE + x) * 4 + 3];
            if (alpha > ALPHA_THRESHOLD) points.push({ x, y });
          }
        }
      } catch (e) {
        points = [];
      }

      if (points.length > MAX_POINTS) {
        const stride = points.length / MAX_POINTS;
        points = Array.from({ length: MAX_POINTS }, (_, i) => points[Math.floor(i * stride)]);
      }

      resolve(points);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve([]);
    };

    img.src = url;
  });
}
