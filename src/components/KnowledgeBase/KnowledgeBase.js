import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadPosts } from '../../content/loadPosts';
import { CATEGORIES, categoryLabel, statusStyle, statusLabel } from '../../content/postMeta';

const KnowledgeBase = () => {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    loadPosts().then(setPosts);
  }, []);

  const filtered = activeCategory === 'all'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto animate-fade-in">

        {/* Nav */}
        <nav className="mb-12 flex items-center gap-4">
          <Link
            to="/"
            className="text-xs font-mono text-stone-500 hover:text-secondary transition-colors"
          >
            ← home
          </Link>
          <span className="text-stone-300 text-xs">·</span>
          <span className="text-xs font-mono text-secondary">knowledge base</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono text-secondary tracking-widest mb-2">07 / Writing</p>
          <h1 className="text-3xl lg:text-4xl font-black text-text-primary mb-4">Knowledge Base</h1>
          <p className="text-sm font-mono text-stone-500 max-w-xl leading-relaxed">
            Notes from papers I'm reading, projects I'm building, and books I'm working through.
            This is a thinking-out-loud space: rough ideas alongside polished write-ups.
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
                  : 'text-stone-500 border-stone-900/10 hover:text-text-secondary hover:border-stone-300'
              }`}
            >
              {cat === 'all' ? '// all' : categoryLabel[cat]}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono text-stone-400 self-center">
            {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>

        {/* Entries */}
        <div className="space-y-4">
          {filtered.map(post => (
            <Link
              key={post.slug}
              to={`/knowledge-base/${post.slug}`}
              className="group block border border-stone-900/10 rounded-lg p-6 hover:border-secondary/30 transition-all duration-300"
            >
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-mono text-stone-400">{post.date}</span>
                <span className="text-stone-300 text-xs">·</span>
                <span className="text-xs font-mono text-stone-500">
                  {categoryLabel[post.category]}
                </span>
                <span className="text-stone-300 text-xs">·</span>
                <span className={`text-xs font-mono px-1.5 py-0.5 rounded border ${statusStyle[post.status]}`}>
                  {statusLabel[post.status]}
                </span>
                <span className="ml-auto text-xs font-mono text-stone-400">{post.readTime}</span>
              </div>

              {/* Title */}
              <h2 className="text-base font-bold text-text-primary group-hover:text-secondary transition-colors duration-200 mb-2 leading-snug">
                {post.title}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(post.tags || []).map((tag, i) => (
                  <span key={i} className="text-xs font-mono text-stone-500 hover:text-text-secondary cursor-default transition-colors">
                    #{tag.toLowerCase().replace(/\s+/g, '-')}
                  </span>
                ))}
              </div>

              {/* Progress bar for books */}
              {post.progress !== undefined && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs font-mono text-stone-400 mb-1">
                    <span>progress</span>
                    <span>{post.progress}%</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-1">
                    <div
                      className="bg-secondary/60 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${post.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Excerpt (first body line as a preview) */}
              <p className="text-sm text-stone-500 leading-relaxed group-hover:text-text-secondary transition-colors duration-200 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                {post.body}
              </p>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-stone-900/10">
          <p className="text-xs font-mono text-stone-400 text-center">
            updated continuously · newest entries first · more coming soon
          </p>
        </div>

      </div>
    </div>
  );
};

export default KnowledgeBase;
