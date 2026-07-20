import React, { useEffect, useState } from 'react';

// Each pass represents one round of context/prompt optimization. Fill drops
// as tokens get trimmed, mirroring the "brewing" widget this was inspired
// by, but for compute instead of kombucha.
const PASSES = [
  { label: 'INDEXING', fill: 92, caption: 'Loading full context window' },
  { label: 'ANALYZING', fill: 78, caption: 'Scoring token redundancy' },
  { label: 'TRIMMING', fill: 61, caption: 'Trimming redundant tokens' },
  { label: 'OPTIMIZING', fill: 45, caption: 'Cache hit rate rising' },
  { label: 'DISTILLED', fill: 34, caption: 'Context distilled 38%' },
];

const CYCLE_MS = 3200;

const TokenJar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % PASSES.length), CYCLE_MS);
    return () => clearInterval(t);
  }, []);

  const pass = PASSES[index];

  return (
    <div className="w-40 h-52 sm:w-48 sm:h-64 lg:w-56 lg:h-72 shrink-0 mx-auto lg:mx-0 flex flex-col items-center justify-between rounded-lg border border-stone-900/10 bg-white/40 px-4 py-5 text-center">
      <div>
        <p className="text-[10px] font-mono text-secondary tracking-widest uppercase">Run #128</p>
        <p className="text-xs text-text-secondary mt-0.5">Prompt Compression</p>
      </div>

      <div className="relative w-16 h-20">
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-9 h-1.5 rounded-sm bg-stone-400/70" />
        <div className="absolute inset-x-0 top-1 bottom-0 rounded-b-xl rounded-t-md border border-stone-900/15 bg-white/50 overflow-hidden shadow-inner">
          <div
            className="absolute bottom-0 left-0 right-0 bg-secondary/70 transition-all duration-1000 ease-in-out"
            style={{ height: `${pass.fill}%` }}
          >
            <span className="absolute bottom-1 left-2 w-1 h-1 rounded-full bg-primary animate-bubble" style={{ animationDelay: '0s' }} />
            <span className="absolute bottom-1 left-6 w-1 h-1 rounded-full bg-primary animate-bubble" style={{ animationDelay: '0.9s' }} />
            <span className="absolute bottom-1 left-9 w-1 h-1 rounded-full bg-primary animate-bubble" style={{ animationDelay: '1.7s' }} />
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-mono text-secondary tracking-wide">
          PASS {index + 1} &middot; {pass.label}
        </p>
        <p className="text-xs text-text-secondary mt-1 min-h-[2.5em] leading-snug max-w-[9.5rem]">
          {pass.caption}
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {PASSES.map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                i === index ? 'bg-secondary' : 'bg-stone-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenJar;
