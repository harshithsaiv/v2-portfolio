import React, { useState, useEffect } from 'react';
import Components from './components/components';
import { AnimatePresence } from "framer-motion";
import BootElement from './components/elements/bootscreen/BootElement';

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
          <>
            <div className="flex-grow">
              <Components />
            </div>
            <footer className="w-full py-4 text-center border-t border-gray-800/50 mt-auto">
              <p className="text-sm text-text-secondary">
                © {new Date().getFullYear()} Harshith Sai. All rights reserved.
              </p>
            </footer>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;