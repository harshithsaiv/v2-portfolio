import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import About from './About/About';
import Experience from './Experience/Experience';
import Skills from './Skills/Skills';
import Research from './Research/Research';
import Projects from './Projects/Projects';
import OpenToWork from './OpenToWork/OpenToWork';
import Contact from './Contact/Contact';
import Education from './Education/Education';
import { trackEvent } from '../lib/analytics';
import { loadPosts } from '../content/loadPosts';
import { categoryLabel } from '../content/postMeta';

const SECTIONS = ['about', 'education', 'experience', 'skills', 'projects', 'research'];

const WritingPreview = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts().then((all) => setPosts(all.slice(0, 3)));
  }, []);

  return (
    <div className="max-w-4xl w-full mx-auto animate-slide-up">
      <div className="mb-10">
        <p className="text-xs font-mono text-secondary tracking-widest mb-2">07 / Writing</p>
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl lg:text-4xl font-black text-text-primary">Notes & Explorations</h2>
          <Link
            to="/knowledge-base"
            className="text-xs font-mono text-secondary hover:text-text-primary transition-colors duration-200 flex items-center gap-1"
          >
            view all
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        <p className="text-xs font-mono text-stone-500 mt-2">
          Papers I'm reading · Systems I'm building · Thinking out loud
        </p>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/knowledge-base/${post.slug}`}
            className="group flex gap-4 border border-stone-900/10 rounded-lg p-5 hover:border-secondary/40 transition-all duration-300"
          >
            <div className="flex-shrink-0 w-20 text-right">
              <span className="text-xs font-mono text-stone-500">{post.date}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono text-stone-500 mb-1">{categoryLabel[post.category]}</p>
              <h3 className="text-sm font-bold text-text-primary group-hover:text-secondary transition-colors duration-200 mb-1.5 leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed overflow-hidden group-hover:text-text-secondary transition-colors duration-200" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {post.body}
              </p>
            </div>
            <div className="flex-shrink-0 self-center">
              <svg className="w-4 h-4 text-stone-400 group-hover:text-secondary transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Components = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');

      sections.forEach(section => {
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
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen">
      <OpenToWork />

      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-20 bg-primary/95 backdrop-blur-sm border-b border-stone-900/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <button
            onClick={() => scrollToSection('about')}
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
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium capitalize transition-colors duration-200
                  ${activeSection === section ? 'text-secondary' : 'text-text-secondary hover:text-text-primary'}`}
              >
                {section}
              </button>
            ))}
            <Link
              to="/knowledge-base"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Writing
            </Link>
            <Link
              to="/now"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
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
                    onClick={() => {
                      scrollToSection(section);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-2xl font-serif italic transition-all duration-300 w-full text-left
                      ${activeSection === section ? 'text-secondary' : 'text-text-primary hover:text-secondary'}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
              <li className="pt-4 border-t border-stone-900/10">
                <Link
                  to="/knowledge-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif italic text-text-primary hover:text-secondary transition-all duration-300"
                >
                  Writing
                </Link>
              </li>
              <li>
                <Link
                  to="/now"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif italic text-text-primary hover:text-secondary transition-all duration-300"
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

      {/* Main Content */}
      <div className="relative z-10 pt-20 sm:pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <section id="about" className="min-h-screen">
            <About />
          </section>
          <section id="education" className="pb-24">
            <Education />
          </section>
          <section id="experience" className="pb-24">
            <Experience />
          </section>
          <section id="skills" className="pb-24">
            <Skills />
          </section>
          <section id="projects" className="pb-16">
            <Projects />
          </section>
          <section id="research" className="pb-16">
            <Research />
          </section>
          <section id="writing" className="pb-24">
            <WritingPreview />
          </section>
          <section id="contact" className="pb-16">
            <Contact />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Components;
