import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import { loadPost } from '../../content/loadPosts';
import { categoryLabel, statusStyle, statusLabel } from '../../content/postMeta';

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setPost(null);
    setNotFound(false);

    loadPost(slug).then((result) => {
      if (!active) return;
      if (result) setPost(result);
      else setNotFound(true);
    });

    return () => {
      active = false;
    };
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-mono text-gray-500 mb-4">Post not found.</p>
          <Link to="/knowledge-base" className="text-xs font-mono text-secondary hover:text-white transition-colors">
            ← back to knowledge base
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-600">loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Nav */}
        <nav className="mb-12 flex items-center gap-4">
          <Link to="/" className="text-xs font-mono text-gray-600 hover:text-secondary transition-colors">
            ← home
          </Link>
          <span className="text-gray-800 text-xs">·</span>
          <Link to="/knowledge-base" className="text-xs font-mono text-gray-600 hover:text-secondary transition-colors">
            knowledge base
          </Link>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-mono text-gray-700">{post.date}</span>
            <span className="text-gray-800 text-xs">·</span>
            <span className="text-xs font-mono text-gray-600">{categoryLabel[post.category]}</span>
            <span className="text-gray-800 text-xs">·</span>
            <span className={`text-xs font-mono px-1.5 py-0.5 rounded border ${statusStyle[post.status]}`}>
              {statusLabel[post.status]}
            </span>
            <span className="ml-auto text-xs font-mono text-gray-700">{post.readTime}</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-black text-white mb-4 leading-snug">{post.title}</h1>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {(post.tags || []).map((tag) => (
              <span key={tag} className="text-xs font-mono text-gray-600">
                #{tag.toLowerCase().replace(/\s+/g, '-')}
              </span>
            ))}
          </div>

          {post.link && (
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-white transition-colors duration-200"
            >
              {post.category === 'paper' ? 'Read paper' : post.category === 'book' ? 'Book link' : 'View on GitHub'}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        {/* Body */}
        <div className="prose prose-invert prose-sm max-w-none border-t border-gray-800/50 pt-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {post.body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
