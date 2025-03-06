import { bootWords } from "../../../stores/bootWords";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const BootElement = () => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index == bootWords.length - 1) {
      setTimeout(() => {
      }, 800);
      return;
    }
    setTimeout(
      () => {
        setIndex(index + 1);
      },
      index == 0 ? 1000 : 500
    );
  }, [index]);

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
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
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
          transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
        },
      }}
      initial="initial"
      exit="exit"
      className="h-[100vh] w-[100vw] flex items-center justify-center fixed z-[99] bg-[#000000]"
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            key={index}
            variants={{
              initial: {
                opacity: 0,
                y: 20,
              },
              enter: {
                opacity: 0.85,
                y: 0,
                transition: { duration: 0.5, delay: 0.1 },
              },
              exit: {
                opacity: 0,
                y: -20,
                transition: { duration: 0.5 },
              }
            }}
            initial="initial"
            animate="enter"
            exit="exit"
            className="flex bg-gradient-to-br from-[#D8E3EB] to-[#4b4b4b] bg-clip-text text-transparent font-poppins font-bold text-[72px] items-center absolute z-[1]"
          >
            {bootWords[index]}
          </motion.p>
          <svg className="absolute top-0 w-[100%] h-[calc(100% + 200px)]">
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill="#000000"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
};

export default BootElement; 