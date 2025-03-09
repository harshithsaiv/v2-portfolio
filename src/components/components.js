import React, { useState, useEffect } from 'react';
import About from './About/About';
import Experience from './Experience/Experience';
import Skills from './Skills/Skills';
import Research from './Research/Research';
// import Certifications from './Certifications/Certifications';
import Projects from './Projects/Projects';
import OpenToWork from './OpenToWork/OpenToWork';
import Contact from './Contact/Contact';
import Education from './Education/Education';

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
        <div className="p-4 sm:p-6">
          <h1 className="text-lg sm:text-xl font-bold text-white">Harshith Sai Veeraiah</h1>
          <h2 className="text-sm sm:text-base text-text-secondary">
            Strategic Innovator | AI, Cybersecurity, and Systems Specialist
          </h2>
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
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden lg:fixed lg:block top-0 left-0 w-[400px] h-screen bg-primary/95 backdrop-blur-sm p-8 border-r border-gray-800/50 z-10">
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Harshith Sai Veeraiah</h1>
          <h2 className="text-base lg:text-lg text-text-secondary leading-relaxed">
            Strategic Innovator | AI, Security, and Systems Specialist
          </h2>
          <p className="text-text-secondary mt-4 text-sm lg:text-base leading-relaxed">
            Innovating secure, intelligent systems with AI and engineering expertise.
          </p>
        </div>
        
        <nav className="mb-8">
          <ul className="space-y-4">
            {['about', 'education', 'experience', 'skills', 'projects', 'research'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`group flex items-center space-x-4 text-base lg:text-lg font-medium transition-all duration-300 w-full
                    ${activeSection === section ? 'text-secondary' : 'text-text-secondary hover:text-white'}`}
                >
                  <span className={`h-[1px] w-12 transform transition-all duration-300
                    ${activeSection === section ? 'bg-secondary scale-x-100' : 'bg-text-secondary scale-x-0 group-hover:scale-x-100'}`}
                  />
                  <span className="capitalize">{section}</span>
                </button>
              </li>
            ))}
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
          {/* <section id="certifications" className="min-h-screen px-4 lg:px-8 pb-16">
            <Certifications />
          </section> */}
          <section id="contact" className="min-h-screen px-4 lg:px-8 pb-16">
            <Contact />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Components;