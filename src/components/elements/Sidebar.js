import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../lib/analytics';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];

const pad = (n) => String(n).padStart(2, '0');

const SectionsList = ({ activeSection, onNavigate }) => (
  <nav>
    <p className="text-[10px] font-mono text-stone-500 tracking-[0.2em] uppercase mb-3">Sections</p>
    <ul className="space-y-3">
      {SECTIONS.map(({ id, label }, i) => {
        const isActive = activeSection === id;
        return (
          <li key={id}>
            <button
              onClick={() => onNavigate(id)}
              className="group flex items-center gap-3 w-full text-left"
            >
              <span className={`text-xs font-mono w-5 shrink-0 ${isActive ? 'text-secondary' : 'text-stone-400'}`}>
                {pad(i + 1)}
              </span>
              <span
                className={`text-sm transition-colors duration-200 ${
                  isActive ? 'text-text-primary font-medium' : 'text-text-secondary group-hover:text-text-primary'
                }`}
              >
                {label}
              </span>
              <span className={`ml-auto h-px transition-all duration-300 ${isActive ? 'w-6 bg-secondary' : 'w-0 bg-secondary'}`} />
            </button>
          </li>
        );
      })}
    </ul>
  </nav>
);

const SocialRow = () => (
  <div className="flex items-center gap-4 text-xs font-mono tracking-wide">
    <a
      href="https://www.linkedin.com/in/harshith-sai-v/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-stone-500 hover:text-[#0A66C2] transition-colors duration-200"
    >
      LI
    </a>
    <a
      href="https://github.com/harshithsaiv"
      target="_blank"
      rel="noopener noreferrer"
      className="text-stone-500 hover:text-text-primary transition-colors duration-200"
    >
      GH
    </a>
    <a
      href="mailto:harshithsaiveeraiah@gmail.com"
      className="text-stone-500 hover:text-secondary transition-colors duration-200"
    >
      EM
    </a>
  </div>
);

export const SidebarContent = ({ activeSection, onNavigate, onLinkClick }) => {
  return (
    <>
      <div className="flex items-start justify-between mb-5">
        <button onClick={() => onNavigate('about')} className="flex items-center gap-3 text-left">
          <div className="w-11 h-11 rounded overflow-hidden border border-stone-900/10 shrink-0 grayscale">
            <img src="/profile-photo.jpg" alt="Harshith Sai Veeraiah" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-serif italic text-xl leading-tight text-text-primary">
            Harshith Sai<br />Veeraiah
          </h1>
        </button>
        <span className="text-[10px] font-mono text-stone-400 mt-1">CA</span>
      </div>

      <div className="mb-8">
        <div className="text-xs font-mono text-text-secondary tracking-wide">
          AI ENGINEER &middot; OPTISPAN
        </div>
      </div>

      <div className="mb-8">
        <SectionsList activeSection={activeSection} onNavigate={(id) => { onNavigate(id); onLinkClick && onLinkClick(); }} />
      </div>

      <div className="mb-8">
        <p className="text-[10px] font-mono text-stone-500 tracking-[0.2em] uppercase mb-3">Pages</p>
        <ul className="space-y-2.5">
          <li>
            <Link
              to="/now"
              onClick={onLinkClick}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <span className="text-stone-400">&rarr;</span> Now
            </Link>
          </li>
          <li>
            <Link
              to="/knowledge-base"
              onClick={onLinkClick}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <span className="text-stone-400">&rarr;</span> Writing
            </Link>
          </li>
        </ul>
      </div>

      <a
        href="/Harshith_Resume_Software_Engineering-4.pdf"
        download
        onClick={() => trackEvent('resume_download', { source: 'sidebar' })}
        className="inline-flex items-center gap-2 px-3 py-2 mb-8 text-xs font-mono text-primary bg-text-primary hover:bg-secondary rounded transition-colors duration-200"
      >
        Resume
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>

      <div className="pt-4 border-t border-stone-900/10">
        <SocialRow />
      </div>
    </>
  );
};

const Sidebar = ({ activeSection, onNavigate }) => (
  <aside className="hidden lg:block fixed left-0 top-0 h-screen w-[280px] border-r border-stone-900/10 bg-primary overflow-y-auto px-7 py-10 z-20">
    <SidebarContent activeSection={activeSection} onNavigate={onNavigate} />
  </aside>
);

export default Sidebar;
