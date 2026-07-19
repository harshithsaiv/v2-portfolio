import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Components from './components/components';
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
  return (
    <div className="min-h-screen bg-primary text-text-primary flex flex-col">
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
        <footer className="w-full py-4 text-center border-t border-stone-900/10 mt-auto">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()} Harshith Sai. All rights reserved.
          </p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
