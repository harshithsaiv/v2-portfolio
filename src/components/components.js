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

// Recent entries shown as a preview on the main page
// Keep in sync with KnowledgeBase.js or pull from a shared data file
const recentWriting = [
  {
    date: 'Apr 2026',
    category: '// exploration',
    title: 'Building a Write-Ahead Log with Raft Consensus in Rust',
    excerpt: 'The hardest part wasn\'t the consensus protocol — it was getting WAL flush semantics right. fsync on the leader before responding to the client dominates latency.',
  },
  {
    date: 'Mar 2026',
    category: '// paper',
    title: 'ReAct: Synergizing Reasoning and Acting in Language Models',
    excerpt: 'The paper underpinning how I think about agentic pipelines at Optispan. LangGraph\'s state machine maps directly to ReAct: nodes are actions, edges are reasoning transitions.',
  },
  {
    date: 'Feb 2026',
    category: '// paper',
    title: 'PagedAttention & vLLM — Why KV Cache Memory Management Matters',
    excerpt: 'PagedAttention treats KV cache like virtual memory in an OS. Near-zero memory waste vs. static allocation. Critical for LLM inference optimization.',
  },
];

const WritingPreview = () => (
  <div className="max-w-4xl w-full mx-auto animate-slide-up">
    <div className="mb-10">
      <p className="text-xs font-mono text-secondary tracking-widest mb-2">// writing</p>
      <div className="flex items-baseline justify-between">
        <h2 className="text-3xl lg:text-4xl font-black text-white">Notes & Explorations</h2>
        <Link
          to="/knowledge-base"
          className="text-xs font-mono text-secondary hover:text-white transition-colors duration-200 flex items-center gap-1"
        >
          view all
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
      <p className="text-xs font-mono text-gray-600 mt-2">
        Papers I'm reading · Systems I'm building · Thinking out loud
      </p>
    </div>

    <div className="space-y-3">
      {recentWriting.map((entry, i) => (
        <Link
          key={i}
          to="/knowledge-base"
          className="group flex gap-4 border border-gray-800/60 rounded-lg p-5 hover:border-secondary/30 hover:bg-gray-900/20 transition-all duration-300"
        >
          <div className="flex-shrink-0 w-20 text-right">
            <span className="text-xs font-mono text-gray-700">{entry.date}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono text-gray-600 mb-1">{entry.category}</p>
            <h3 className="text-sm font-bold text-gray-200 group-hover:text-secondary transition-colors duration-200 mb-1.5 leading-snug">
              {entry.title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed overflow-hidden group-hover:text-gray-500 transition-colors duration-200" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {entry.excerpt}
            </p>
          </div>
          <div className="flex-shrink-0 self-center">
            <svg className="w-4 h-4 text-gray-700 group-hover:text-secondary transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

const Components = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollY = window.scrollY;

        if (scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - 100) {
          setActiveSection(section.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <div className="flex min-h-screen relative overflow-hidden">
      <OpenToWork />
      
      {/* Gradient Follow Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 255, 218, 0.03), transparent 40%)`,
        }}
      />

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-primary/95 backdrop-blur-sm z-20 border-b border-gray-800/50">
        <div className="p-4 sm:p-6 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white">Harshith Sai Veeraiah</h1>
            <h2 className="text-sm sm:text-base text-text-secondary">
              AI Engineer · Product Engineer · Optispan
            </h2>
          </div>
          <a
            href="/Harshith_Resume_Software_Engineering-4.pdf"
            className="flex items-center gap-1 px-3 py-2 text-xs sm:text-sm text-secondary border border-secondary/50 rounded-md hover:bg-secondary/10 transition-all"
            download
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span className="hidden sm:inline">Resume</span>
          </a>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden fixed inset-0 bg-primary/95 backdrop-blur-sm z-30 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-text-secondary hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <nav className="mt-16">
            <ul className="space-y-6">
              {['about', 'education', 'experience', 'skills', 'projects', 'research', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => {
                      scrollToSection(section);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-2xl font-medium transition-all duration-300 w-full text-left
                      ${activeSection === section ? 'text-secondary' : 'text-text-secondary hover:text-white'}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
              <li className="pt-4 border-t border-gray-800/40">
                <Link
                  to="/knowledge-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-medium text-text-secondary hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  Writing
                  <svg className="w-4 h-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  to="/now"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-medium text-text-secondary hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  Now
                  <svg className="w-4 h-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden lg:fixed lg:block top-0 left-0 w-[400px] h-screen bg-primary/95 backdrop-blur-sm p-8 border-r border-gray-800/50 z-10 overflow-y-auto">
        <div className="mb-10">
          {/* Profile Photo */}
          <div className="flex justify-center mb-6">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-secondary/40 shadow-2xl ring-4 ring-secondary/20">
              <img 
                src="/profile-photo.jpg"
                alt="Harshith Sai Veeraiah"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2 text-center">Harshith Sai Veeraiah</h1>
          <h2 className="text-xs font-mono text-secondary leading-relaxed text-center mb-4">
            AI Engineer · Product Engineer
          </h2>
          <p className="text-text-secondary text-xs leading-relaxed text-center px-2 font-mono">
            Building agentic AI systems, inference pipelines, and distributed infrastructure. Currently at Optispan.
          </p>
        </div>
        
        <nav className="mb-8">
          <ul className="space-y-3">
            {['about', 'education', 'experience', 'skills', 'projects', 'research'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`group flex items-center space-x-3 text-sm font-medium transition-all duration-300 w-full
                    ${activeSection === section ? 'text-secondary' : 'text-text-secondary hover:text-white'}`}
                >
                  <span className={`h-[1px] w-10 transform transition-all duration-300
                    ${activeSection === section ? 'bg-secondary scale-x-100' : 'bg-text-secondary scale-x-0 group-hover:scale-x-100'}`}
                  />
                  <span className="capitalize">{section}</span>
                </button>
              </li>
            ))}
            {/* External links */}
            <li className="pt-2 border-t border-gray-800/40">
              <Link
                to="/knowledge-base"
                className="group flex items-center space-x-3 text-sm font-medium transition-all duration-300 text-text-secondary hover:text-white"
              >
                <span className="h-[1px] w-10 bg-text-secondary scale-x-0 group-hover:scale-x-100 transform transition-all duration-300" />
                <span className="flex items-center gap-1.5">
                  writing
                  <svg className="w-3 h-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/now"
                className="group flex items-center space-x-3 text-sm font-medium transition-all duration-300 text-text-secondary hover:text-white"
              >
                <span className="h-[1px] w-10 bg-text-secondary scale-x-0 group-hover:scale-x-100 transform transition-all duration-300" />
                <span className="flex items-center gap-1.5">
                  now
                  <svg className="w-3 h-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Social Links and Resume Button Container */}
        <div className="absolute bottom-8 left-8 right-8 space-y-6">
          {/* Social Links */}
          <div className="flex gap-6 justify-center">
            <a
              href="https://www.linkedin.com/in/harshith-sai-v/"
              className="text-text-secondary hover:text-white transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://github.com/harshithsaiv"
              className="text-text-secondary hover:text-white transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
            </a>
            <a
              href="mailto:harshithsaiveeraiah@gmail.com"
              className="text-text-secondary hover:text-white transition-colors duration-300"
              aria-label="Email"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
          </div>

          {/* Download Resume Button */}
          <a
            href="/Harshith_Resume_Software_Engineering-4.pdf"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm lg:text-base text-white bg-secondary/10 border border-secondary rounded-md hover:bg-secondary/20 transition-all duration-300"
            download
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span>Download Resume</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:ml-[400px] lg:w-[calc(100%-400px)] overflow-y-auto relative z-10">
        <div className="min-h-screen pt-20 lg:pt-8 px-4 sm:px-6 lg:px-8">
          <section id="about" className="min-h-screen">
            <About />
          </section>
          <section id="education" className="min-h-screen px-4 lg:px-8 pb-24">
            <Education />
          </section>
          <section id="experience" className="min-h-screen px-4 lg:px-8 pb-24">
            <Experience />
          </section>
          <section id="skills" className="min-h-screen px-4 lg:px-8 pb-24">
            <Skills />
          </section>
          <section id="projects" className="min-h-screen px-4 lg:px-8 pb-16">
            <Projects />
          </section>
          <section id="research" className="min-h-screen px-4 lg:px-8 pb-16">
            <Research />
          </section>
          <section id="writing" className="px-4 lg:px-8 pb-24">
            <WritingPreview />
          </section>
          <section id="contact" className="min-h-screen px-4 lg:px-8 pb-16">
            <Contact />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Components;