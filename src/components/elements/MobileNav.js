import React, { useState } from 'react';
import { SidebarContent } from './Sidebar';

const MobileNav = ({ activeSection, onNavigate }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="fixed top-0 left-0 right-0 z-20 bg-primary/95 backdrop-blur-sm border-b border-stone-900/10 flex items-center justify-between px-4 h-14">
        <button onClick={() => onNavigate('about')} className="font-serif italic text-lg text-text-primary">
          Harshith Sai Veeraiah
        </button>
        <button
          onClick={() => setOpen(true)}
          className="text-text-secondary hover:text-text-primary p-2 -mr-2"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-primary z-30 transform transition-transform duration-300 overflow-y-auto ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-7 py-8">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 text-text-secondary hover:text-text-primary p-2"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="mt-8">
            <SidebarContent
              activeSection={activeSection}
              onNavigate={onNavigate}
              onLinkClick={() => setOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
