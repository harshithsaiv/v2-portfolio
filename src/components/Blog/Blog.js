import React from 'react';
import { Link } from 'react-router-dom';
import posts from './posts';

const Blog = () => {
  return (
    <div className="flex justify-center min-h-screen py-12">
      <div className="max-w-4xl w-full animate-fade-in px-4 lg:px-0">
        <nav className="mb-12 flex flex-wrap gap-4">
          <Link to="/" className="text-secondary hover:text-white transition-colors text-sm">
            ← Back home
          </Link>
          <Link to="/knowledge-base" className="text-secondary hover:text-white transition-colors text-sm">
            Knowledge Base
          </Link>
          <Link to="/now" className="text-secondary hover:text-white transition-colors text-sm">
            Now
          </Link>
          <Link to="/blog" className="text-secondary hover:text-white transition-colors text-sm font-medium">
            Blog
          </Link>
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">Blog</h1>
          <p className="text-text-secondary">
            Write-ups on the projects, papers, and rabbit holes I'm currently digging into. Mostly ML, systems, and
            the occasional detour into historical linguistics.
          </p>
          <div className="h-px bg-gray-800 w-16 mt-6"></div>
        </header>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block bg-gray-800/40 rounded-lg overflow-hidden hover:bg-gray-800/60 transition-all"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden bg-gray-900">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-gray-400">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    {post.status && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/30">
                        {post.status}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white group-hover:text-secondary transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
