import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── ADD NEW ENTRIES HERE ──────────────────────────────────────────────────
// Categories: "paper" | "exploration" | "book"
// Just push a new object to this array to publish a new note
const entries = [
  // ── PAPERS ─────────────────────────────────────────────────────────────
  {
    id: 1,
    date: 'Apr 2026',
    category: 'paper',
    title: 'In Search of an Understandable Consensus Algorithm (Raft)',
    tags: ['Distributed Systems', 'Consensus', 'Rust'],
    readTime: '12 min',
    excerpt:
      'Raft was designed to be more understandable than Paxos. After implementing RAFT-WAL in Rust I wanted to deeply understand the guarantees. Key insight: leader election with randomized timeouts is elegant — the simplicity comes from making only one server responsible for state changes at any time.',
    link: '',
    status: 'notes',
  },
  {
    id: 2,
    date: 'Mar 2026',
    category: 'paper',
    title: 'ReAct: Synergizing Reasoning and Acting in Language Models',
    tags: ['LLMs', 'Agentic AI', 'LangGraph'],
    readTime: '8 min',
    excerpt:
      'The paper that underpins how I think about agentic pipelines at Optispan. ReAct interleaves reasoning traces with actions — the key is that the model can observe tool outputs and update its reasoning. LangGraph\'s state machine model maps directly to this: nodes are actions, edges are reasoning transitions.',
    link: '',
    status: 'notes',
  },
  {
    id: 3,
    date: 'Mar 2026',
    category: 'paper',
    title: 'XAST: GPU-Accelerated Smart Contract Vulnerability Detection via AST-Based Transformers',
    tags: ['GPU', 'Security', 'Transformers', 'CUDA'],
    readTime: '15 min',
    excerpt:
      'My own published paper (IEEE TPS-ISA 2025). Writing this note as a reflection on what I\'d do differently — the AST representation choice, the CUDA kernel design tradeoffs, and what explainability means in a security context. The 40% inference speedup came from fusing attention + softmax kernels.',
    link: 'https://www.computer.org/csdl/proceedings-article/tps-isa/2025/969100a352/2eytftkhp5e',
    status: 'published',
  },
  {
    id: 4,
    date: 'Feb 2026',
    category: 'paper',
    title: 'Efficient Memory Management for Large Language Model Serving with PagedAttention',
    tags: ['LLMs', 'Inference', 'vLLM', 'Memory'],
    readTime: '10 min',
    excerpt:
      'The vLLM paper. PagedAttention treats the KV cache like virtual memory in an OS — blocks allocated on demand, no fragmentation. This is why vLLM achieves near-zero waste in KV cache memory vs. static allocation. Critical reading for anyone doing LLM inference optimization.',
    link: '',
    status: 'notes',
  },

  // ── EXPLORATIONS ────────────────────────────────────────────────────────
  {
    id: 5,
    date: 'Apr 2026',
    category: 'exploration',
    title: 'Building a Write-Ahead Log with Raft Consensus in Rust',
    tags: ['Rust', 'Distributed Systems', 'WAL', 'Raft'],
    readTime: '20 min',
    excerpt:
      'Engineering notes from building RAFT-WAL. The hardest part wasn\'t the consensus protocol — it was getting the WAL flush semantics right. You need fsync on the leader before responding to the client, which dominates latency. I benchmarked group commit strategies to amortize this cost.',
    link: 'https://github.com/harshithsaiv/RAFT-WAL',
    status: 'project',
  },
  {
    id: 6,
    date: 'Mar 2026',
    category: 'exploration',
    title: 'LSM-Trees from First Principles in Safe Rust',
    tags: ['Rust', 'Storage Engines', 'Databases', 'Systems'],
    readTime: '18 min',
    excerpt:
      'Why does RocksDB use an LSM-tree instead of a B-tree? Writes to B-trees cause random I/O; LSM-trees convert random writes into sequential I/O. This exploration documents building a MemTable → SSTable → Compaction pipeline in safe Rust, and why bloom filters are non-negotiable for point lookups.',
    link: 'https://github.com/harshithsaiv/lsm-tree',
    status: 'project',
  },
  {
    id: 8,
    date: 'Jan 2026',
    category: 'exploration',
    title: 'CUDA Kernel Fusion for Transformer Inference',
    tags: ['CUDA', 'GPU', 'Inference', 'Optimization'],
    readTime: '22 min',
    excerpt:
      'Exploring fused attention kernels (FlashAttention-style) and why kernel fusion matters. Each kernel launch has overhead — memory bandwidth is the bottleneck, not FLOPS. By fusing softmax + attention + dropout into one pass, you cut memory round-trips from 4 to 1. My benchmarks on A100 showed 2.3× speedup on the attention block.',
    link: '',
    status: 'notes',
  },

  // ── BOOKS ───────────────────────────────────────────────────────────────
  {
    id: 9,
    date: 'Apr 2026',
    category: 'book',
    title: 'Designing Data-Intensive Applications — Martin Kleppmann',
    tags: ['Distributed Systems', 'Databases', 'Architecture'],
    readTime: '25 min',
    progress: 35,
    excerpt:
      'Chapter 5 (Replication) is worth the entire book. The tradeoffs between sync and async replication, and why "eventual consistency" is a lie without careful reasoning about what "eventual" means. Reading this while building RAFT-WAL made every design decision click.',
    link: 'https://dataintensive.net/',
    status: 'reading',
  },
  {
    id: 10,
    date: 'Mar 2026',
    category: 'book',
    title: 'Programming Massively Parallel Processors — Kirk & Hwu',
    tags: ['CUDA', 'GPU', 'Parallel Computing'],
    readTime: '20 min',
    progress: 45,
    excerpt:
      'The canonical GPU programming book. Chapter 6 on memory coalescing changed how I write CUDA kernels — uncoalesced global memory access can cost 10× throughput. The tiling pattern for matrix multiplication is a mental model I reach for constantly when writing custom kernels.',
    link: 'https://www.elsevier.com/books/programming-massively-parallel-processors/kirk/978-0-12-811986-0',
    status: 'reading',
  },
];
// ──────────────────────────────────────────────────────────────────────────

const CATEGORIES = ['all', 'paper', 'exploration', 'book'];

const categoryLabel = {
  paper: '// paper',
  exploration: '// exploration',
  book: '// book',
};

const statusStyle = {
  published: 'text-secondary border-secondary/30 bg-secondary/5',
  notes: 'text-gray-500 border-gray-700/50 bg-gray-900/30',
  project: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  wip: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  reading: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
};

const statusLabel = {
  published: 'published',
  notes: 'notes',
  project: 'project',
  wip: 'wip',
  reading: 'reading',
};

const KnowledgeBase = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? entries
    : entries.filter(e => e.category === activeCategory);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto animate-fade-in">

        {/* Nav */}
        <nav className="mb-12 flex items-center gap-4">
          <Link
            to="/"
            className="text-xs font-mono text-gray-600 hover:text-secondary transition-colors"
          >
            ← home
          </Link>
          <span className="text-gray-800 text-xs">·</span>
          <span className="text-xs font-mono text-secondary">knowledge base</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono text-secondary tracking-widest mb-2">// writing</p>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-4">Knowledge Base</h1>
          <p className="text-sm font-mono text-gray-500 max-w-xl leading-relaxed">
            Notes from papers I'm reading, projects I'm building, and books I'm working through.
            This is a thinking-out-loud space — rough ideas alongside polished write-ups.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono rounded border transition-all duration-200 ${
                activeCategory === cat
                  ? 'text-secondary border-secondary/40 bg-secondary/5'
                  : 'text-gray-600 border-gray-800/60 hover:text-gray-400 hover:border-gray-700'
              }`}
            >
              {cat === 'all' ? '// all' : categoryLabel[cat]}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono text-gray-700 self-center">
            {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>

        {/* Entries */}
        <div className="space-y-4">
          {filtered.map(entry => (
            <div
              key={entry.id}
              className="group border border-gray-800/60 rounded-lg p-6 hover:border-secondary/30 hover:bg-gray-900/20 transition-all duration-300"
            >
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-mono text-gray-700">{entry.date}</span>
                <span className="text-gray-800 text-xs">·</span>
                <span className={`text-xs font-mono text-gray-600`}>
                  {categoryLabel[entry.category]}
                </span>
                <span className="text-gray-800 text-xs">·</span>
                <span className={`text-xs font-mono px-1.5 py-0.5 rounded border ${statusStyle[entry.status]}`}>
                  {statusLabel[entry.status]}
                </span>
                <span className="ml-auto text-xs font-mono text-gray-700">{entry.readTime}</span>
              </div>

              {/* Title */}
              <h2 className="text-base font-bold text-gray-100 group-hover:text-secondary transition-colors duration-200 mb-2 leading-snug">
                {entry.title}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {entry.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-mono text-gray-600 hover:text-gray-400 cursor-default transition-colors">
                    #{tag.toLowerCase().replace(/\s+/g, '-')}
                  </span>
                ))}
              </div>

              {/* Progress bar for books */}
              {entry.progress !== undefined && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs font-mono text-gray-700 mb-1">
                    <span>progress</span>
                    <span>{entry.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800/60 rounded-full h-1">
                    <div
                      className="bg-secondary/60 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${entry.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Excerpt */}
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-200 mb-4">
                {entry.excerpt}
              </p>

              {/* Link */}
              {entry.link && (
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-white transition-colors duration-200"
                >
                  {entry.category === 'paper' ? 'Read paper' : entry.category === 'book' ? 'Book link' : 'View on GitHub'}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-gray-800/50">
          <p className="text-xs font-mono text-gray-700 text-center">
            updated continuously · newest entries first · more coming soon
          </p>
        </div>

      </div>
    </div>
  );
};

export default KnowledgeBase;
