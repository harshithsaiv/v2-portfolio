import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import LogoAssembly from "./LogoAssembly";

// How long the curve-wipe exit animation takes to play before we hand off
// to the real site. Keep in sync with the `exit` variant durations below.
const EXIT_TRANSITION_MS = 700;
// Safety net: never let the boot screen hang indefinitely if the canvas
// animation fails to fire its completion callback for any reason.
const FAILSAFE_MS = 9000;

const BootElement = ({ onComplete }) => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const handleSequenceComplete = useCallback(() => {
    setShouldExit((already) => {
      if (already) return already;
      setTimeout(() => onComplete && onComplete(), EXIT_TRANSITION_MS);
      return true;
    });
  }, [onComplete]);

  useEffect(() => {
    const failsafe = setTimeout(handleSequenceComplete, FAILSAFE_MS);
    return () => clearTimeout(failsafe);
  }, [handleSequenceComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
    },
  };

  return (
    <motion.div
      variants={{
        initial: {
          top: 0,
        },
        exit: {
          top: "-100vh",
          transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
        },
      }}
      initial="initial"
      animate={shouldExit ? "exit" : "initial"}
      exit="exit"
      className="h-[100vh] w-[100vw] flex items-center justify-center fixed z-[99] bg-[#000000] overflow-hidden"
    >
      {dimension.width > 0 && (
        <>
          <LogoAssembly
            width={dimension.width}
            height={dimension.height}
            onComplete={handleSequenceComplete}
          />
          <svg className="absolute top-0 w-[100%] h-[calc(100% + 200px)] pointer-events-none">
            <motion.path
              variants={curve}
              initial="initial"
              animate={shouldExit ? "exit" : "initial"}
              fill="#000000"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
};

export default BootElement;
