import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiFolder,
  FiCpu,
  FiEdit3,
  FiMail,
  FiActivity,
  FiDownload,
} from 'react-icons/fi';
import { trackEvent } from '../../lib/analytics';

const DOCK_SECTIONS = [
  { id: 'about', label: 'About', icon: FiUser },
  { id: 'education', label: 'Education', icon: FiBookOpen },
  { id: 'experience', label: 'Experience', icon: FiBriefcase },
  { id: 'skills', label: 'Skills', icon: FiCode },
  { id: 'projects', label: 'Projects', icon: FiFolder },
  { id: 'research', label: 'Research', icon: FiCpu },
  { id: 'writing', label: 'Writing', icon: FiEdit3 },
  { id: 'contact', label: 'Contact', icon: FiMail },
];

const DockButton = ({ label, isActive, onClick, hovered, onHover, children }) => (
  <button
    onClick={onClick}
    onMouseEnter={() => onHover(label)}
    onMouseLeave={() => onHover(null)}
    aria-label={label}
    className="relative flex flex-col items-center justify-center"
  >
    {hovered === label && (
      <span className="absolute -top-9 whitespace-nowrap text-[11px] uppercase tracking-wider text-text-primary bg-primary border border-stone-900/10 shadow-sm rounded px-2 py-1 pointer-events-none">
        {label}
      </span>
    )}
    <span
      className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-300 ${
        isActive
          ? 'bg-secondary/10 text-secondary'
          : 'text-text-secondary hover:text-text-primary hover:bg-stone-900/[0.04]'
      }`}
    >
      {children}
    </span>
    <span
      className={`mt-0.5 h-1 w-1 rounded-full transition-all duration-300 ${
        isActive ? 'bg-secondary opacity-100' : 'opacity-0'
      }`}
    />
  </button>
);

const BottomDock = ({ activeSection, onNavigate }) => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-[calc(100vw-1rem)]">
      <div className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-primary/95 backdrop-blur-md border border-stone-900/10 shadow-lg shadow-stone-900/10 overflow-x-auto no-scrollbar">
        {DOCK_SECTIONS.map(({ id, label, icon: Icon }) => (
          <DockButton
            key={id}
            label={label}
            isActive={activeSection === id}
            onClick={() => onNavigate(id)}
            hovered={hovered}
            onHover={setHovered}
          >
            <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </DockButton>
        ))}

        <span className="w-px h-6 bg-stone-900/10 mx-1 shrink-0" />

        <DockButton
          label="Now"
          isActive={false}
          onClick={() => navigate('/now')}
          hovered={hovered}
          onHover={setHovered}
        >
          <FiActivity className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        </DockButton>
        <DockButton
          label="Resume"
          isActive={false}
          onClick={() => {
            trackEvent('resume_download', { source: 'dock' });
            const link = document.createElement('a');
            link.href = '/Harshith_Resume_Software_Engineering-4.pdf';
            link.download = '';
            link.click();
          }}
          hovered={hovered}
          onHover={setHovered}
        >
          <FiDownload className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        </DockButton>
      </div>
    </nav>
  );
};

export default BottomDock;
