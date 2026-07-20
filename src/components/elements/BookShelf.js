import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Mirrors the reading list on the /now page. Kept as a local copy rather
// than a shared import since the two views style/slice it differently.
const BOOKS = [
  {
    title: 'LLVM Code Generation',
    author: 'Quentin Colombet',
    progress: 15,
    gradient: 'linear-gradient(160deg, #4a2f45 0%, #201018 100%)',
  },
  {
    title: 'Programming Massively Parallel Processors',
    author: 'Kirk & Hwu',
    progress: 45,
    gradient: 'linear-gradient(160deg, #5a4433 0%, #2e2018 100%)',
  },
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    progress: 35,
    gradient: 'linear-gradient(160deg, #2a3b52 0%, #10161f 100%)',
  },
  {
    title: 'Deep Learning with PyTorch',
    author: 'Stevens & Antiga',
    progress: 28,
    gradient: 'linear-gradient(160deg, #2F6D5F 0%, #16332c 100%)',
  },
];

const CYCLE_MS = 3800;

const BookShelf = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % BOOKS.length), CYCLE_MS);
    return () => clearInterval(t);
  }, []);

  const book = BOOKS[index];

  return (
    <div className="w-40 h-52 sm:w-48 sm:h-64 lg:w-56 lg:h-72 shrink-0 mx-auto lg:mx-0 flex flex-col items-center justify-between rounded-lg border border-stone-900/10 bg-white/40 px-4 py-5 text-center">
      <div>
        <p className="text-[10px] font-mono text-secondary tracking-widest uppercase">Nightstand</p>
        <p className="text-xs text-text-secondary mt-0.5">Currently Reading</p>
      </div>

      <div className="relative w-24 h-32 rounded-sm overflow-hidden shadow-sm">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${index * (100 / BOOKS.length)}%)`,
            width: `${BOOKS.length * 100}%`,
          }}
        >
          {BOOKS.map((b, i) => (
            <div
              key={i}
              className="h-full shrink-0 flex flex-col justify-between p-2"
              style={{ width: `${100 / BOOKS.length}%`, background: b.gradient }}
            >
              <span className="text-[7px] font-mono text-white/60 tracking-widest uppercase">Nightstand</span>
              <span className="text-[11px] font-serif italic text-white leading-tight">{b.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-mono text-secondary tracking-wide">
          {book.progress}% &middot; IN PROGRESS
        </p>
        <p className="text-xs text-text-secondary mt-1 leading-snug max-w-[9.5rem]">
          {book.author}
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-2 mb-1">
          {BOOKS.map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                i === index ? 'bg-secondary' : 'bg-stone-300'
              }`}
            />
          ))}
        </div>
        <Link to="/now" className="text-[10px] font-mono text-text-secondary hover:text-secondary transition-colors">
          Browse the shelf &rarr;
        </Link>
      </div>
    </div>
  );
};

export default BookShelf;
