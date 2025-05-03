import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DeskSetup = () => {
  const [currentSetupIndex, setCurrentSetupIndex] = useState(0);
  
  // Desk setup evolution data
  const deskSetups = [
    {
      id: 1,
      date: "January 2021",
      title: "Starter Setup",
      image: "https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      specs: [
        "Single 24\" Monitor",
        "Basic Logitech Keyboard",
        "IKEA Desk",
        "Standard Office Chair"
      ],
      description: "Where it all began. A simple setup focused on functionality with minimal extras."
    },
    {
      id: 2,
      date: "September 2021",
      title: "Productivity Upgrade",
      image: "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      specs: [
        "Dual 27\" Monitors",
        "Keychron K2 Keyboard",
        "Logitech MX Master Mouse",
        "Ergonomic Chair"
      ],
      description: "Added a second monitor and upgraded peripherals for better productivity and comfort during longer sessions."
    },
    {
      id: 3,
      date: "May 2022",
      title: "WFH Professional",
      image: "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      specs: [
        "Ultrawide 34\" + Vertical 27\"",
        "Custom Mechanical Keyboard",
        "Standing Desk",
        "Herman Miller Chair",
        "Audio Interface + Mic"
      ],
      description: "Complete overhaul with focus on ergonomics, video conferencing, and flexibility for both work and personal projects."
    },
    {
      id: 4,
      date: "Current",
      title: "Developer Command Center",
      image: "https://images.unsplash.com/photo-1616587894289-86480e533129?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      specs: [
        "Triple Monitor Setup (49\" Ultrawide + 2x27\")",
        "Custom GMMK Pro Keyboard",
        "Autonomous Standing Desk",
        "GPU Workstation Under Desk",
        "Studio Lighting + Camera Setup",
        "Acoustic Treatment"
      ],
      description: "The ultimate developer workspace with powerful local computation capabilities, optimal ergonomics, and a professional environment for remote collaboration."
    }
  ];
  
  const currentSetup = deskSetups[currentSetupIndex];
  
  const nextSetup = () => {
    setCurrentSetupIndex((prevIndex) => 
      prevIndex === deskSetups.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSetup = () => {
    setCurrentSetupIndex((prevIndex) => 
      prevIndex === 0 ? deskSetups.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentSetupIndex(index);
  };
  
  return (
    <div className="bg-gray-800/40 rounded-xl overflow-hidden">
      <div className="relative h-72 md:h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSetup.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 h-full"
          >
            <img 
              src={currentSetup.image} 
              alt={`Desk setup: ${currentSetup.title}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-white text-xl font-bold">{currentSetup.title}</h3>
                  <p className="text-gray-300 text-sm">{currentSetup.date}</p>
                </div>
                
                <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                  {currentSetupIndex + 1}/{deskSetups.length}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation arrows */}
        <button 
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 opacity-70 hover:opacity-100 transition-opacity"
          onClick={prevSetup}
          aria-label="Previous desk setup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button 
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 opacity-70 hover:opacity-100 transition-opacity"
          onClick={nextSetup}
          aria-label="Next desk setup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Timeline dots */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
          {deskSetups.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSetupIndex ? "bg-white w-4" : "bg-white/50"
              }`}
              aria-label={`Go to desk setup ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Desk Setup Evolution</h3>
        <p className="text-gray-400 text-sm mb-4">{currentSetup.description}</p>
        
        <h4 className="text-xs uppercase text-gray-400 mb-2">Specs</h4>
        <ul className="space-y-1 text-sm text-gray-300">
          {currentSetup.specs.map((spec, index) => (
            <li key={index} className="flex items-center">
              <svg className="w-3 h-3 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
              {spec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeskSetup;
