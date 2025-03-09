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
    <div className="min-h-screen bg-primary text-text-primary">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <BootElement />
        ) : (
          <Components />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App; 