
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Code, PaintBucket, Globe } from 'lucide-react';

interface AboutProps {
  hackerMode?: boolean;
}

const About = ({ hackerMode = false }: AboutProps) => {
  const [activeStyle, setActiveStyle] = useState('default');
  const [powerLevel, setPowerLevel] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const soundEffectRef = useRef<HTMLDivElement>(null);
  
  // Scroll effect for power level
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top, height } = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how far through the section we've scrolled
        let progress = 1 - (top / windowHeight);
        progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
        
        const newPowerLevel = Math.floor(progress * 100);
        setPowerLevel(newPowerLevel);
        
        // Play sound effect when power level hits certain thresholds
        if (newPowerLevel >= 25 && powerLevel < 25) {
          playPowerUp();
        } else if (newPowerLevel >= 50 && powerLevel < 50) {
          playPowerUp();
        } else if (newPowerLevel >= 75 && powerLevel < 75) {
          playPowerUp();
        } else if (newPowerLevel >= 99 && powerLevel < 99) {
          playPowerUp();
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [powerLevel]);
  
  // Play power up effect
  const playPowerUp = () => {
    if (soundEffectRef.current) {
      soundEffectRef.current.classList.remove('opacity-0');
      soundEffectRef.current.classList.add('opacity-100');
      
      setTimeout(() => {
        if (soundEffectRef.current) {
          soundEffectRef.current.classList.remove('opacity-100');
          soundEffectRef.current.classList.add('opacity-0');
        }
      }, 1000);
    }
    
    // Play power up sound
    const audio = new Audio('https://www.soundjay.com/button/sounds/button-35.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };
  
  // Different character styles with their associated skills
  const characterStyles = {
    default: {
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1470&auto=format',
      name: hackerMode ? 'The Netrunner' : 'The Developer',
      description: hackerMode 
        ? 'A digital ghost navigating the datastreams of the cyber network.' 
        : 'A coding hero with a passion for building amazing web experiences.',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'CSS/Tailwind', level: 80 },
        { name: 'Node.js', level: 75 }
      ]
    },
    cyberpunk: {
      image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1470&auto=format',
      name: hackerMode ? 'The System Breaker' : 'The Cyber Hacker',
      description: hackerMode
        ? 'A rogue AI hunter exploiting vulnerabilities in the digital frontier.'
        : 'A digital nomad navigating the neon-lit data streams of the web.',
      skills: [
        { name: 'WebGL', level: 90 },
        { name: 'Three.js', level: 85 },
        { name: 'Algorithm Design', level: 80 },
        { name: 'System Architecture', level: 75 }
      ]
    },
    creative: {
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1364&auto=format',
      name: hackerMode ? 'The Neural Artist' : 'The Designer',
      description: hackerMode
        ? 'A visionary harnessing AI to create stunning digital aesthetics.'
        : 'An artist with an eye for detail and a mind for user experience.',
      skills: [
        { name: 'UI/UX Design', level: 90 },
        { name: 'Animation', level: 85 },
        { name: 'Figma', level: 80 },
        { name: 'Creative Direction', level: 75 }
      ]
    }
  };
  
  const activeCharacter = characterStyles[activeStyle as keyof typeof characterStyles];
  
  return (
    <div 
      ref={containerRef}
      className={`min-h-screen py-24 px-4 relative ${hackerMode ? 'bg-manga-black/50' : ''}`}
    >
      <div className="container mx-auto">
        <motion.h2 
          className={`manga-title text-center mb-16 ${hackerMode ? 'text-neon-cyan' : 'text-manga-blue'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {hackerMode ? 'IDENTITY SELECTION' : 'CHARACTER SELECT'}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Character Image */}
          <motion.div 
            className={`panel p-4 relative overflow-hidden h-[500px] ${hackerMode ? 'border-neon-cyan bg-manga-black/70' : ''}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.img 
              src={activeCharacter.image} 
              alt="Character" 
              className={`w-full h-full object-cover ${hackerMode ? 'hue-rotate-180 contrast-125' : ''}`}
              animate={{ 
                filter: powerLevel >= 100 
                  ? hackerMode ? 'brightness(1.5) hue-rotate-180 contrast-125' : 'brightness(1.3)' 
                  : hackerMode ? 'hue-rotate-180 contrast-125' : 'brightness(1)',
                scale: powerLevel >= 100 ? 1.05 : 1
              }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Power level overlay */}
            <div className={`absolute bottom-0 left-0 right-0 ${hackerMode ? 'bg-manga-black/90' : 'bg-manga-black/70'} p-4`}>
              <div className="flex items-center justify-between text-white mb-2">
                <span className="font-manga">{hackerMode ? 'SYSTEM POWER' : 'POWER LEVEL'}</span>
                <span className="font-manga">{powerLevel}%</span>
              </div>
              <div className={`exp-bar-container ${hackerMode ? 'border-neon-cyan' : ''}`}>
                <div 
                  className={`exp-bar ${hackerMode ? 'bg-neon-cyan' : ''}`} 
                  style={{ width: `${powerLevel}%` }}
                />
              </div>
            </div>
            
            {/* Style selector buttons positioned over the image */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button 
                className={`manga-button p-2 ${activeStyle === 'default' 
                  ? hackerMode ? 'bg-neon-pink text-manga-black' : 'bg-manga-red text-white' 
                  : hackerMode ? 'bg-manga-black border-neon-cyan text-neon-cyan' : ''}`}
                onClick={() => setActiveStyle('default')}
                title="Developer Style"
              >
                <Code size={20} />
              </button>
              <button 
                className={`manga-button p-2 ${activeStyle === 'cyberpunk' 
                  ? hackerMode ? 'bg-neon-pink text-manga-black' : 'bg-manga-red text-white' 
                  : hackerMode ? 'bg-manga-black border-neon-cyan text-neon-cyan' : ''}`}
                onClick={() => setActiveStyle('cyberpunk')}
                title="Cyberpunk Style"
              >
                <Globe size={20} />
              </button>
              <button 
                className={`manga-button p-2 ${activeStyle === 'creative' 
                  ? hackerMode ? 'bg-neon-pink text-manga-black' : 'bg-manga-red text-white' 
                  : hackerMode ? 'bg-manga-black border-neon-cyan text-neon-cyan' : ''}`}
                onClick={() => setActiveStyle('creative')}
                title="Creative Style"
              >
                <PaintBucket size={20} />
              </button>
            </div>
          </motion.div>
          
          {/* Character Details */}
          <motion.div 
            className="flex flex-col space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className={`panel p-6 ${hackerMode ? 'border-neon-pink bg-manga-black/70' : ''}`}>
              <h3 className={`panel-title ${hackerMode ? 'text-neon-pink' : 'text-manga-red'} mb-4`}>
                {activeCharacter.name}
              </h3>
              <p className={`font-manga text-lg mb-6 ${hackerMode ? 'text-neon-cyan' : ''}`}>
                {activeCharacter.description}
              </p>
              
              <div className={`speech-bubble ${hackerMode ? 'border-neon-green bg-manga-black/70 text-neon-green' : ''}`}>
                <p className={`${hackerMode ? 'font-mono' : 'font-sans'}`}>
                  {hackerMode 
                    ? '> I transform concepts into digital realities through code and creative innovation.' 
                    : '"I transform ideas into digital experiences through clean code and creative design."'}
                </p>
              </div>
            </div>
            
            <div className={`panel p-6 ${hackerMode ? 'border-neon-cyan bg-manga-black/70' : ''}`}>
              <h3 className={`panel-title ${hackerMode ? 'text-neon-cyan' : 'text-manga-yellow'} mb-4`}>
                {hackerMode ? 'TECH ABILITIES' : 'SKILLS & ABILITIES'}
              </h3>
              
              <div className="space-y-4">
                {activeCharacter.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className={`font-manga ${hackerMode ? 'text-neon-green' : ''}`}>{skill.name}</span>
                      <span className={`font-manga ${hackerMode ? 'text-neon-green' : ''}`}>{skill.level}%</span>
                    </div>
                    <div className={`exp-bar-container ${hackerMode ? 'border-neon-green' : ''}`}>
                      <motion.div 
                        className={`exp-bar ${hackerMode ? 'bg-neon-green' : ''}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Sound effect element */}
        <div 
          ref={soundEffectRef} 
          className={`sound-effect fixed top-1/3 left-1/2 transform -translate-x-1/2 transition-all duration-700 z-20 ${hackerMode ? 'text-neon-green' : 'text-manga-red'}`}
        >
          {hackerMode ? 'LEVEL UP!' : 'POWER UP!'}
        </div>
      </div>
    </div>
  );
};

export default About;
