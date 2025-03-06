import React, { useState, useEffect, useRef } from 'react';
import './Loading.css';

const Loading = () => {
  const [dots, setDots] = useState(0); 
  const canvasRef = useRef(null);

  useEffect(() => {
    
    const dotInterval = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4); 
    }, 500);

    return () => clearInterval(dotInterval); 
  }, []);

  useEffect(() => {
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const binaryPrimes = generatePrimes(1000).map((num) => num.toString(2)); 

    const words = [];
    const rows = Math.floor(canvas.height / 30); 
    const spacing = 50; // Space between words

    class Word {
      constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.word = binaryPrimes[Math.floor(Math.random() * binaryPrimes.length)];
        this.speed = speed;
      }

      update() {
        this.x -= this.speed;
        if (this.x < -this.getWordWidth()) {
          this.x = canvas.width + spacing;
          this.word = binaryPrimes[Math.floor(Math.random() * binaryPrimes.length)];
        }
      }

      draw() {
        ctx.font = '18px Courier New';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.word, this.x, this.y);
      }

      getWordWidth() {
        return ctx.measureText(this.word).width;
      }
    }

    // Initialize words
    for (let i = 0; i < rows; i++) {
      let x = 0;
      const y = i * 30 + 20;
      while (x < canvas.width) {
        const speed = Math.random() * 2 + 1;
        words.push(new Word(x, y, speed));
        x += ctx.measureText(binaryPrimes[0]).width + spacing;
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      words.forEach((word) => {
        word.update();
        word.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animate);
    };
  }, []);

  // Function to generate prime numbers
  const generatePrimes = (limit) => {
    const primes = [];
    const isPrime = Array(limit).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i < limit; i++) {
      if (isPrime[i]) {
        primes.push(i);
        for (let j = i * 2; j < limit; j += i) {
          isPrime[j] = false;
        }
      }
    }
    return primes;
  };

  return (
    <>
      <div className="loading-text">Loading{'.'.repeat(dots)}</div>
      <canvas ref={canvasRef} className="background-canvas"></canvas>
    </>
  );
};

export default Loading;
