import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Components from './components/components';
import { AnimatePresence } from "framer-motion";
import BootElement from './components/elements/bootscreen/BootElement';
import Now from './components/Now/Now';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 3000);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-primary text-text-primary flex flex-col">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <BootElement />
        ) : (
          <Router>
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Components />} />
                <Route path="/now" element={<Now />} />
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