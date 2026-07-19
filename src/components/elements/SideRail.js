import React, { useState } from 'react';

const SIDE_RAIL_SECTIONS = ['about', 'education', 'experience', 'skills', 'projects', 'research', 'contact'];

const SideRail = ({ activeSection, onNavigate }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center">
      <div className="relative flex flex-col items-center gap-6">
        <div className="absolute top-1 bottom-1 left-1/2 -translate-x-1/2 w-px bg-stone-900/10" />
        {SIDE_RAIL_SECTIONS.map((section) => {
          const isActive = activeSection === section;
          return (
            <button
              key={section}
              onClick={() => onNavigate(section)}
              onMouseEnter={() => setHovered(section)}
              onMouseLeave={() => setHovered(null)}
              aria-label={section}
              className="relative z-10 flex items-center justify-center w-3 h-3"
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-secondary shadow-[0_0_8px_rgba(47,109,95,0.55)]'
                    : 'w-1.5 h-1.5 bg-stone-400 group-hover:bg-text-primary'
                }`}
              />
              {hovered === section && (
                <span className="absolute left-5 whitespace-nowrap text-xs uppercase tracking-wider text-text-secondary bg-primary border border-stone-900/10 shadow-sm rounded px-2 py-1">
                  {section}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideRail;
