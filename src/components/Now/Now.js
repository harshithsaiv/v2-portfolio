import React from 'react';
import { Link } from 'react-router-dom';

const Now = () => {
  return (
    <div className="flex items-center justify-center min-h-screen py-20 lg:py-0">
      <div className="max-w-3xl w-full animate-fade-in px-4 lg:px-0">
        <div className="flex items-center mb-8">
          <Link to="/" className="text-secondary hover:text-white transition-colors mr-4">
            ← Back
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-secondary">Now</h1>
        </div>
        
        <div className="space-y-6 text-base lg:text-lg text-text-secondary leading-relaxed">
          <p className="text-xl text-white">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-xl font-semibold text-secondary mt-8">Current Focus</h2>
          <p>
            I'm currently focused on expanding my skills in GPU programming and advanced AI implementation. 
            Working on optimizing machine learning models for real-time applications using CUDA.
          </p>
          
          <h2 className="text-xl font-semibold text-secondary mt-8">Learning</h2>
          <p>
            Diving deeper into distributed systems and cloud architecture. Currently taking courses on 
            advanced Kubernetes patterns and studying papers on efficient distributed computing.
          </p>
          
          <h2 className="text-xl font-semibold text-secondary mt-8">Projects</h2>
          <p>
            Building a personal AI assistant that integrates with my home automation system.
            Also contributing to an open-source project focused on security improvements for containerized applications.
          </p>
          
          <h2 className="text-xl font-semibold text-secondary mt-8">Reading</h2>
          <p>
            Currently enjoying "Designing Data-Intensive Applications" by Martin Kleppmann and "Clean Architecture" by Robert C. Martin.
          </p>
          
          <div className="mt-10 pt-6 border-t border-gray-700">
            <p className="italic">
              This "now" page is inspired by <a href="https://nownownow.com/about" className="text-secondary underline" target="_blank" rel="noopener noreferrer">the /now movement</a>. 
              It's a snapshot of what I'm focused on at this point in my life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Now;
