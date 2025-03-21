
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
  hackerMode?: boolean;
}

const Hero = ({ onNavigate, hackerMode = false }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const soundEffectRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      const xPos = (clientX / width - 0.5) * 20;
      const yPos = (clientY / height - 0.5) * 20;
      
      const layers = containerRef.current.querySelectorAll('.parallax-layer');
      layers.forEach((layer, index) => {
        const el = layer as HTMLElement;
        const speed = index + 1;
        const xMove = xPos * speed * 0.5;
        const yMove = yPos * speed * 0.5;
        
        el.style.transform = `translate(${xMove}px, ${yMove}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Sound effect on hover
  const playSoundEffect = () => {
    if (soundEffectRef.current) {
      soundEffectRef.current.classList.remove('opacity-0');
      soundEffectRef.current.classList.add('opacity-100', 'scale-110');
      
      setTimeout(() => {
        if (soundEffectRef.current) {
          soundEffectRef.current.classList.remove('opacity-100', 'scale-110');
          soundEffectRef.current.classList.add('opacity-0', 'scale-100');
        }
      }, 700);
    }
    
    // Play sound effect
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  return (
    <div 
      ref={containerRef} 
      className={`w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden ${hackerMode ? 'bg-manga-black' : ''}`}
    >
      {/* Background elements with parallax effect */}
      <div className="absolute inset-0">
        <div className={`parallax-layer absolute top-10 left-10 w-32 h-32 ${hackerMode ? 'bg-neon-cyan' : 'bg-manga-yellow'} rounded-full opacity-20`} />
        <div className={`parallax-layer absolute bottom-20 right-20 w-48 h-48 ${hackerMode ? 'bg-neon-pink' : 'bg-manga-blue'} rounded-full opacity-20`} />
        <div className={`parallax-layer absolute bottom-40 left-40 w-24 h-24 ${hackerMode ? 'bg-neon-green' : 'bg-manga-red'} rounded-full opacity-20`} />
        
        {/* Speed lines */}
        <div className="parallax-layer absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className={`absolute ${hackerMode ? 'bg-neon-cyan' : 'bg-manga-black'}`}
              style={{
                height: '2px',
                width: `${Math.random() * 100 + 100}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main hero content */}
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center">
          <motion.div 
            className={`panel p-8 mb-8 max-w-3xl w-full clip-panel ${hackerMode ? 'border-neon-cyan bg-manga-black/80' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.h1 
              className={`manga-title ${hackerMode ? 'text-neon-cyan' : 'text-manga-blue'} mb-4`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              onMouseEnter={playSoundEffect}
            >
              {hackerMode ? 'CYBER DIMENSION' : 'THE PORTFOLIO'}
            </motion.h1>
            
            <motion.div 
              className={`speech-bubble mb-8 ${hackerMode ? 'border-neon-pink bg-manga-black/70' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className={`font-manga text-xl text-center ${hackerMode ? 'text-neon-green' : ''}`}>
                {hackerMode 
                  ? 'Welcome to the cyber dimension. Hack into my digital portfolio to discover encrypted skills and projects.'
                  : 'Welcome to my manga-inspired portfolio! Turn the pages to discover my story, skills, and creations.'}
              </p>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button 
                className={`manga-button ${hackerMode ? 'bg-neon-pink text-manga-black' : 'bg-manga-red text-white'}`}
                onClick={() => onNavigate('about')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {hackerMode ? 'ACCESS PROFILE' : 'MEET THE HERO'}
              </motion.button>
              
              <motion.button 
                className={`manga-button ${hackerMode ? 'bg-neon-cyan text-manga-black' : ''}`}
                onClick={() => onNavigate('projects')}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {hackerMode ? 'VIEW MISSIONS' : 'VIEW ADVENTURES'}
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <ChevronDown 
              className={`animate-bounce cursor-pointer ${hackerMode ? 'text-neon-cyan' : ''}`}
              size={32}
              onClick={() => onNavigate('about')}
            />
          </motion.div>
          
          {/* Sound effect element */}
          <div 
            ref={soundEffectRef} 
            className={`sound-effect absolute top-1/4 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${hackerMode ? 'text-neon-pink' : ''}`}
          >
            {hackerMode ? 'SYSTEM ONLINE!' : 'WHOOSH!'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
