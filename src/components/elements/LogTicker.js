import React from 'react';

const LOG_LINES = [
  'Log > post-training clinical model, DPO then PPO',
  'Log > shipping iOS build to the App Store',
  'Log > fusing softmax + attention kernels in CUDA',
  'Log > benchmarking RAFT-WAL flush latency',
  'Log > routing telehealth voice sessions',
  'Log > status: deep-work-mode',
  'Log > compacting lsm-tree SSTables',
  'Log > reviewing clinician feedback batch',
  'Log > debugging Android release build',
  'Log > tracing intelligence-per-watt on A100',
];

const LogTicker = () => (
  <div className="relative w-full overflow-hidden border-y border-stone-900/10 py-4 group">
    <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
      {[...LOG_LINES, ...LOG_LINES].map((line, i) => {
        const [prefix, ...rest] = line.split('>');
        return (
          <span key={i} className="flex items-center text-xs sm:text-sm font-mono whitespace-nowrap px-4">
            <span className="text-secondary">{prefix}&gt;</span>
            <span className="text-text-secondary ml-1">{rest.join('>').trim()}</span>
            <span className="text-stone-300 ml-8">/</span>
          </span>
        );
      })}
    </div>
  </div>
);

export default LogTicker;
