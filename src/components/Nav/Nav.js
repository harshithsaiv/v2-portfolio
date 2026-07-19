import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { trackEvent } from '../../lib/analytics';

const SECTIONS = ['about', 'education', 'experience', 'skills', 'projects', 'research'];

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return undefined;

    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollY = window.scrollY;

        if (scrollY >= sectionTop - 120 && scrollY < sectionTop + sectionHeight - 120) {
          setActiveSection(section.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const goToSection = (sectionId) => {
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (!element) return;
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      // Navigate home with the target section in the hash; Components.js
      // picks up location.hash on mount and scrolls to it there.
      navigate(`/#${sectionId}`);
    }
    setIsMobileMenuOpen(false);
  };

  const isWriting = location.pathname.startsWith('/knowledge-base');
  const isNow = location.pathname === '/now';

  return (
    <>
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-20 bg-primary/95 backdrop-blur-sm border-b border-stone-900/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <button
            onClick={() => (isHome ? goToSection('about') : navigate('/'))}
            className="flex items-center gap-3 text-left"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-stone-900/10 flex-shrink-0">
              <img src="/profile-photo.jpg" alt="Harshith Sai Veeraiah" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-text-primary leading-tight">Harshith Sai Veeraiah</h1>
              <p className="text-[10px] font-mono text-stone-500 tracking-widest uppercase">AI Engineer · Product Engineer</p>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-7">
            {SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => goToSection(section)}
                className={`text-sm font-medium capitalize transition-colors duration-200
                  ${isHome && activeSection === section ? 'text-secondary' : 'text-text-secondary hover:text-text-primary'}`}
              >
                {section}
              </button>
            ))}
            <Link
              to="/knowledge-base"
              className={`text-sm font-medium transition-colors duration-200 ${isWriting ? 'text-secondary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              Writing
            </Link>
            <Link
              to="/now"
              className={`text-sm font-medium transition-colors duration-200 ${isNow ? 'text-secondary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              Now
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/Harshith_Resume_Software_Engineering-4.pdf"
              download
              onClick={() => trackEvent('resume_download', { source: 'nav' })}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-mono text-primary bg-text-primary hover:bg-secondary rounded-md transition-colors duration-200"
            >
              Resume
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-text-secondary hover:text-text-primary p-2 -mr-2"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden fixed inset-0 bg-primary z-30 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-5 right-5 text-text-secondary hover:text-text-primary p-2"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <nav className="mt-16">
            <ul className="space-y-6">
              {SECTIONS.map((section) => (
                <li key={section}>
                  <button
                    onClick={() => goToSection(section)}
                    className={`text-2xl font-serif italic transition-all duration-300 w-full text-left
                      ${isHome && activeSection === section ? 'text-secondary' : 'text-text-primary hover:text-secondary'}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
              <li className="pt-4 border-t border-stone-900/10">
                <Link
                  to="/knowledge-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-serif italic transition-all duration-300 ${isWriting ? 'text-secondary' : 'text-text-primary hover:text-secondary'}`}
                >
                  Writing
                </Link>
              </li>
              <li>
                <Link
                  to="/now"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-serif italic transition-all duration-300 ${isNow ? 'text-secondary' : 'text-text-primary hover:text-secondary'}`}
                >
                  Now
                </Link>
              </li>
              <li className="pt-4">
                <a
                  href="/Harshith_Resume_Software_Engineering-4.pdf"
                  download
                  onClick={() => {
                    trackEvent('resume_download', { source: 'mobile_menu' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono text-primary bg-text-primary rounded-md"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Nav;
