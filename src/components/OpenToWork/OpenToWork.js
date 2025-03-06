import React, { useState } from 'react';

const OpenToWork = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Mobile Version */}
      <div className="lg:hidden fixed top-16 right-4 sm:right-6 z-50">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative"
          aria-label="Open to work status"
        >
          {/* Floating Dot */}
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="absolute top-6 right-0 mt-2 w-[calc(100vw-2rem)] sm:w-auto min-w-[200px] max-w-[90vw] sm:max-w-none">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-secondary/30">
                  <img 
                    src="/anime.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-white">OPEN TO WORK</span>
                  <span className="text-[8px] text-text-secondary">
                    AI & Security Engineer
                  </span>
                </div>
              </div>
            </div>
          )}
        </button>
      </div>

      {/* Desktop Version */}
      <div className="hidden lg:block fixed top-8 right-8 z-50">
        <div className="flex items-center gap-3 px-4 py-2 bg-primary/80 backdrop-blur-sm border border-secondary/30 rounded-xl shadow-lg hover:bg-primary/90 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-secondary/30">
              <img 
                src="/anime.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span className="text-sm font-medium text-white tracking-wide whitespace-nowrap">OPEN TO WORK</span>
              </div>
              <span className="text-xs text-text-secondary mt-1 tracking-wide whitespace-nowrap">
                AI & Security Engineer
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenToWork; 