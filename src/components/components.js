import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import About from './About/About';
import Experience from './Experience/Experience';
import Skills from './Skills/Skills';
import Research from './Research/Research';
import Projects from './Projects/Projects';
import Contact from './Contact/Contact';
import Education from './Education/Education';
import { loadPosts } from '../content/loadPosts';
import { categoryLabel } from '../content/postMeta';
import Sidebar from './elements/Sidebar';
import MobileNav from './elements/MobileNav';
import LogTicker from './elements/LogTicker';

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
      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />
      <MobileNav activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Content */}
      <div className="relative z-10 pt-20 lg:pt-8 pb-16 lg:ml-[280px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <section id="about" className="min-h-screen">
            <About />
          </section>
        </div>

        <LogTicker />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <section id="education" className="pt-24 pb-24">
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
