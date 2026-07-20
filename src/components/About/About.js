import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TokenJar from '../elements/TokenJar';
import BookShelf from '../elements/BookShelf';

const About = () => {
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursor(p => !p), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen py-24 lg:py-0">
      <div className="max-w-4xl w-full animate-fade-in px-4 lg:px-0">

        {/* Hero */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-14">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono text-secondary tracking-[0.2em] mb-5 uppercase">01 / About</p>
            <h1 className="font-serif italic text-6xl lg:text-8xl text-text-primary mb-3 tracking-tight leading-none">
              Harshith Sai Veeraiah
            </h1>
            <p className="font-mono text-sm lg:text-base text-secondary mb-4">
              The question I keep coming back to: how much intelligence can you squeeze out of{' '}
              <span className="text-text-primary font-medium">a watt</span>, or out of{' '}
              <span className="text-text-primary font-medium">a single training sample</span>.
            </p>
            <h2 className="font-sans text-2xl lg:text-4xl font-bold text-text-secondary mb-10 tracking-tight leading-snug">
              I build intelligent systems that ship.
              <span
                className="inline-block w-0.5 h-7 lg:h-10 bg-secondary ml-1.5 align-middle"
                style={{ opacity: cursor ? 1 : 0, transition: 'opacity 0.05s' }}
              />
            </h2>

            <div className="max-w-2xl space-y-4 text-base text-text-secondary leading-relaxed">
              <p>
                AI Engineer at{' '}
                <span className="text-secondary font-medium">Optispan</span>{' '}
                (a longevity healthcare startup), building the clinical intelligence systems
                doctors and patients actually talk to: voice agents for medical scribing,
                telehealth AI infrastructure, and OpenEvidence-style clinical reasoning pipelines.
                I take these from a design doc to something running in production.
              </p>
              <p>
                Previously at{' '}
                <span className="text-text-primary font-medium">State Street Global Markets</span>{' '}
                and{' '}
                <span className="text-text-primary font-medium">CSU Sacramento</span>{' '}
                building GPU-accelerated ML systems and trading infrastructure.
                MS Computer Science (4.0 GPA) with published research in
                GPU-accelerated smart contract security at{' '}
                <span className="text-text-primary font-medium">IEEE TPS 2025</span>.
              </p>
              <p>
                Lately I've been pulling on two threads outside of work: compiler
                internals (LLVM/MLIR) for ML acceleration, and client-side
                architecture patterns (MVVM). I'm trying to understand the whole
                stack a model runs on, not just the inference layer. More on
                that on the{' '}
                <Link to="/now" className="text-text-primary font-medium hover:text-secondary transition-colors">/now page</Link>.
              </p>
            </div>
          </div>

          <div className="lg:mt-24 flex flex-col gap-6">
            <TokenJar />
            <BookShelf />
          </div>
        </div>

        {/* Core Technologies */}
        <div className="mb-20">
          <p className="text-xs font-mono text-stone-500 mb-4 tracking-widest">// core technologies</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Python & LangGraph',
              'CUDA & GPU Inference',
              'Rust & Systems',
              'LLMs & RAG',
              'FastAPI & WebRTC',
              'AWS & Cloud',
            ].map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm font-mono text-secondary bg-secondary/5 border border-secondary/20 rounded hover:border-secondary/50 hover:bg-secondary/10 transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Numbers */}
        <div className="mb-20">
          <p className="text-xs font-mono text-stone-500 mb-6 tracking-widest">// by the numbers</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { value: 'Agentic', label: 'clinical AI systems in production at Optispan' },
              { value: '4.0', label: 'GPA · MS Computer Science' },
              { value: 'IEEE', label: 'TPS 2025 · published paper' },
            ].map((stat, i) => (
              <div key={i} className="border-l-2 border-secondary/40 pl-5">
                <div className="text-2xl lg:text-3xl font-black text-text-primary mb-1">{stat.value}</div>
                <div className="text-xs font-mono text-stone-500 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Targeting */}
        <div className="border border-stone-900/10 rounded-lg p-6">
          <p className="text-xs font-mono text-secondary mb-3 tracking-widest">// targeting</p>
          <p className="text-sm font-mono text-text-primary mb-1">
            AI Engineer &nbsp;·&nbsp; Inference Engineer &nbsp;·&nbsp; Product Engineer &nbsp;·&nbsp; Software Engineer
          </p>
          <p className="text-sm text-text-secondary mb-5 mt-3 max-w-xl leading-relaxed">
            I'd rather be the one deciding how a system gets built than just implementing
            someone else's spec for it. If that's{' '}
            <span className="text-text-primary font-medium">healthcare AI</span>,{' '}
            <span className="text-text-primary font-medium">developer tools</span>, or{' '}
            <span className="text-text-primary font-medium">inference infrastructure</span>, let's talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/Harshith_Resume_Software_Engineering-4.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-mono text-primary bg-secondary hover:bg-secondary/90 rounded transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Resume
            </a>
            <Link
              to="/now"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-mono text-secondary border border-secondary/30 rounded hover:border-secondary/60 hover:bg-secondary/5 transition-all duration-200"
            >
              What I&apos;m building now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
