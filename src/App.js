import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Components from './components/components';
import { AnimatePresence } from "framer-motion";
import BootElement from './components/elements/bootscreen/BootElement';
import Now from './components/Now/Now';
import KnowledgeBase from './components/KnowledgeBase/KnowledgeBase';
import PostDetail from './components/KnowledgeBase/PostDetail';
import { trackPageView } from './lib/analytics';

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
}

function App() {
  // Boot animation only plays once per browser session — repeat visits
  // (e.g. a recruiter navigating back and forth) skip straight to content.
  const [isLoading, setIsLoading] = useState(
    () => sessionStorage.getItem('bootSeen') !== 'true'
  );

  useEffect(() => {
    document.body.style.cursor = "default";
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('bootSeen', 'true');
      window.scrollTo(0, 0);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-primary text-text-primary flex flex-col">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <BootElement />
        ) : (
          <Router>
            <AnalyticsTracker />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Components />} />
                <Route path="/now" element={<Now />} />
                <Route path="/knowledge-base" element={<KnowledgeBase />} />
                <Route path="/knowledge-base/:slug" element={<PostDetail />} />
              </Routes>
            </div>
            <footer className="w-full py-4 text-center border-t border-gray-800/50 mt-auto">
              <p className="text-sm text-text-secondary">
                © {new Date().getFullYear()} Harshith Sai. All rights reserved.
              </p>
            </footer>
          </Router>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;