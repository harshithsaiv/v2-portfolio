import React from 'react';
import { Link } from 'react-router-dom';

const KnowledgeBase = () => {
  const sections = [
    {
      title: "Book Notes",
      description: "I read a lot of books and I started compiling my learnings and notes from them; here's a collection of my book notes that you might find useful.",
      link: "/book-notes",
    },
    {
      title: "Engineering Explorations",
      description: "My learnings and notes from exploring engineering and building prototypes based on core CS concepts and everything that amused me.",
      link: "/engineering-explorations",
    },
  ];

  return (
    <div className="flex justify-center min-h-screen py-12">
      <div className="max-w-4xl w-full animate-fade-in px-4 lg:px-0">
        <nav className="mb-12 flex flex-wrap gap-4">
          <Link to="/" className="text-secondary hover:text-white transition-colors text-sm">
            ← Back home
          </Link>
          <Link to="/knowledge-base" className="text-secondary hover:text-white transition-colors text-sm font-medium">
            Knowledge Base
          </Link>
          <Link to="/now" className="text-secondary hover:text-white transition-colors text-sm">
            Now
          </Link>
          <Link to="/blog" className="text-secondary hover:text-white transition-colors text-sm">
            Blog
          </Link>
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">My Knowledge Base</h1>
          <p className="text-text-secondary">
            This is a collection of my journey of active learning from blogs, books, and papers organized by topics. Here you'll find my notes, videos, and write-ups. Hope it helps.
          </p>
          <div className="h-px bg-gray-800 w-16 mt-6"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-gray-800/40 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-white mb-2">{section.title}</h2>
              <p className="text-text-secondary mb-4">{section.description}</p>
              <Link
                to={section.link}
                className="inline-block px-4 py-2 bg-secondary text-black font-medium rounded hover:bg-opacity-90 transition-all"
              >
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
