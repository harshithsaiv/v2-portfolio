import React from 'react';
import { Link } from 'react-router-dom';

const Now = () => {
  const books = [
    {
      title: "Programming Massively Parallel Processors",
      author: "David B. Kirk & Wen-mei W. Hwu",
      progress: 45,
      link: "https://www.elsevier.com/books/programming-massively-parallel-processors/kirk/978-0-12-811986-0"
    },
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      progress: 35,
      link: "https://dataintensive.net/"
    },
    {
      title: "Deep Learning with PyTorch",
      author: "Eli Stevens, Luca Antiga",
      progress: 28,
      link: "https://www.manning.com/books/deep-learning-with-pytorch"
    }
  ];

  const learningResources = [
    {
      title: "CUDA Programming & GPU Optimization",
      url: "https://www.nvidia.com/en-us/training/",
      icon: "🖥️",
      description: "Parallel computing, GPU architecture, and CUDA kernel optimization for ML workloads"
    },
    {
      title: "vLLM & LLM Inference Optimization",
      url: "https://docs.vllm.ai/",
      icon: "⚡",
      description: "PagedAttention, continuous batching, quantization — making LLM serving fast and memory-efficient"
    },
    {
      title: "Advanced Deep Learning Architectures",
      url: "https://www.deeplearning.ai/",
      icon: "🧠",
      description: "Transformer models, attention mechanisms, and state-of-the-art neural network architectures"
    },
    {
      title: "Distributed Systems & Consensus",
      url: "https://www.youtube.com/watch?v=cQP8WApzIQQ&list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB",
      icon: "🔗",
      description: "Raft, Paxos, replication protocols, and scalable system design"
    },
    {
      title: "LLVM & MLIR — Compiler Infrastructure for ML",
      url: "https://mlir.llvm.org/",
      icon: "⚙️",
      description: "Poking at how ML compilers lower graphs to hardware-specific IR — the compiler side of fast inference, not just the kernel side"
    },
    {
      title: "MVVM & Client Architecture Patterns",
      url: "https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel",
      icon: "🧩",
      description: "Rounding out inference/backend work with how state and UI composition hold together on the client side"
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Nav */}
        <nav className="mb-12 flex items-center gap-4">
          <Link to="/" className="text-xs font-mono text-stone-500 hover:text-secondary transition-colors">
            ← home
          </Link>
          <span className="text-stone-300 text-xs">·</span>
          <Link to="/knowledge-base" className="text-xs font-mono text-stone-500 hover:text-secondary transition-colors">
            writing
          </Link>
          <span className="text-stone-300 text-xs">·</span>
          <span className="text-xs font-mono text-secondary">now</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono text-secondary tracking-widest mb-2">// now</p>
          <h1 className="text-3xl lg:text-4xl font-black text-text-primary mb-3">What I'm up to</h1>
          <p className="text-xs font-mono text-stone-500">
            A <a href="https://nownownow.com/about" className="text-secondary hover:text-text-primary transition-colors" target="_blank" rel="noopener noreferrer">/now page</a>
            {' '}— last updated{' '}
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-16">
          {/* Intro */}
          <section>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              A snapshot of what I'm currently reading, building, and obsessing over.
              Splitting time between Rust systems projects, distributed systems papers, and GPU inference work.
            </p>
          </section>

          {/* Pixel Vignette */}
          <section>
            <div className="inline-block border border-stone-900/10 rounded-lg p-3 bg-stone-50">
              <img
                src="/pixel-town.png"
                alt="A small pixel-art village"
                className="w-64 sm:w-72 rounded [image-rendering:pixelated]"
              />
              <p className="text-[10px] font-mono text-stone-400 mt-2 text-center">
                pixel art by kenney.nl (CC0)
              </p>
            </div>
          </section>

          {/* Reading Section */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono text-stone-500 tracking-widest mb-6">// reading</h2>
            {books.map((book, index) => (
              <a
                key={index}
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 border border-stone-900/10 rounded-lg p-4 hover:border-secondary/30 transition-all duration-300"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-primary group-hover:text-secondary transition-colors mb-0.5 leading-snug">{book.title}</p>
                  <p className="text-xs font-mono text-stone-500">{book.author}</p>
                </div>
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-xs font-mono text-stone-500 mb-1">{book.progress}%</div>
                  <div className="w-full bg-stone-200 rounded-full h-1">
                    <div className="bg-secondary/60 h-1 rounded-full" style={{ width: `${book.progress}%` }} />
                  </div>
                </div>
              </a>
            ))}
          </section>

          {/* Learning Section */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono text-stone-500 tracking-widest mb-6">// learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {learningResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 border border-stone-900/10 rounded-lg p-4 hover:border-secondary/30 transition-all duration-200"
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">{resource.icon}</span>
                  <div>
                    <p className="text-sm font-mono text-text-primary group-hover:text-secondary transition-colors mb-1">{resource.title}</p>
                    <p className="text-xs text-stone-500 leading-relaxed">{resource.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Building Section */}
          <section className="space-y-6">
            <h2 className="text-xs font-mono text-stone-500 tracking-widest mb-6">// building</h2>
            <ul className="space-y-2.5">
              {[
                'RAFT-WAL — Write-Ahead Log with Raft consensus in safe Rust',
                'lsm-tree — LSM storage engine (MemTable → SSTable → compaction) in Rust',
                'Exploring CUDA kernel fusion for transformer attention blocks',
                'API-Gateway-Rust — async Tokio gateway with rate limiting and zero-copy routing',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-stone-500 leading-relaxed">
                  <span className="text-secondary flex-shrink-0 mt-0.5 text-xs">▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Away From the Keyboard */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono text-stone-500 tracking-widest mb-6">// away from the keyboard</h2>
            <div className="flex items-center gap-5 border border-stone-900/10 rounded-lg p-4">
              <img
                src="/Strava.jpg"
                alt="Running"
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0 border border-stone-900/10"
              />
              <p className="text-sm text-stone-500 leading-relaxed">
                When I'm not at a keyboard, I'm usually running. The same discipline that gets me
                through a long training block is the one that gets me through a long debugging session.
              </p>
            </div>
          </section>

          {/* GitHub Activity */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono text-stone-500 tracking-widest mb-6">// github activity</h2>
            <div className="border border-stone-900/10 rounded-lg p-5 overflow-x-auto">
              <img
                src="https://ghchart.rshah.org/2f6d5f/harshithsaiv"
                alt="Harshith's GitHub contribution graph"
                className="w-full min-w-[600px]"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-stone-400">contributions over the past year</p>
              <a
                href="https://github.com/harshithsaiv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-secondary hover:text-text-primary transition-colors"
              >
                github.com/harshithsaiv ↗
              </a>
            </div>
          </section>

          {/* Footer */}
          <section className="pt-8 border-t border-stone-900/10">
            <p className="text-xs font-mono text-stone-400">
              Inspired by{' '}
              <a href="https://nownownow.com/about" className="text-secondary hover:text-text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                the /now movement
              </a>
              {' '}· updated whenever life changes
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Now;
