
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const inkSplashRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<HTMLAudioElement>(null);
  
  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowLoadingScreen(false);
            setTimeout(() => {
              onLoadingComplete();
            }, 1000);
          }, 1000);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, [onLoadingComplete]);
  
  // Create ink splash effect
  useEffect(() => {
    if (progress > 0 && progress % 25 === 0) {
      if (inkSplashRef.current) {
        const splash = document.createElement('div');
        splash.className = 'ink-splash animate-ink-splash';
        
        // Random size between 50px and 150px
        const size = Math.floor(Math.random() * 100) + 50;
        splash.style.width = `${size}px`;
        splash.style.height = `${size}px`;
        
        // Random position
        const maxX = window.innerWidth - size;
        const maxY = window.innerHeight - size;
        splash.style.left = `${Math.floor(Math.random() * maxX)}px`;
        splash.style.top = `${Math.floor(Math.random() * maxY)}px`;
        
        inkSplashRef.current.appendChild(splash);
        
        // Play sound effect
        if (soundRef.current) {
          soundRef.current.currentTime = 0;
          soundRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
        
        // Remove splash after animation
        setTimeout(() => {
          splash.remove();
        }, 800);
      }
    }
  }, [progress]);

  if (!showLoadingScreen) {
    return null;
  }

  return (
    <motion.div 
      className="fixed inset-0 bg-manga-white z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: showLoadingScreen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <audio 
        ref={soundRef} 
        src="https://www.soundjay.com/buttons/button-43.mp3" 
        preload="auto"
      />
      
      <div ref={inkSplashRef} className="absolute inset-0 overflow-hidden" />
      
      <motion.h1 
        className="manga-title text-manga-red"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        THE LEGEND BEGINS...
      </motion.h1>
      
      <motion.div 
        className="mt-8 w-full max-w-md px-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-manga text-manga-black">0%</span>
          <span className="font-manga text-manga-black">100%</span>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-6 speech-bubble"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <p className="font-manga text-center text-manga-black">
          {progress < 30 && "Preparing the ink..."}
          {progress >= 30 && progress < 60 && "Drawing the panels..."}
          {progress >= 60 && progress < 90 && "Adding the final touches..."}
          {progress >= 90 && "Ready to explore the story!"}
        </p>
      </motion.div>
      
      <div className="absolute bottom-4 text-center w-full">
        <p className="text-sm text-manga-gray">Click anywhere to discover hidden elements!</p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
