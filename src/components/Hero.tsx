
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, FileText, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  // Handle resume download
  const handleResumeDownload = () => {
    // Create a sample resume URL (in a real app, this would be a real file URL)
    const resumeUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    
    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'portfolio_resume.pdf';
    link.target = '_blank';
    
    // Play sound effect
    const audio = new Audio(hackerMode
      ? 'https://www.soundjay.com/technology/sounds/electronic-3.mp3'
      : 'https://www.soundjay.com/mechanical/sounds/page-flip-01a.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      ref={containerRef} 
      className={`w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden ${hackerMode ? 'bg-manga-black' : ''}`}
    >
      {/* Enhanced background elements with parallax effect */}
      <div className="absolute inset-0">
        <div className={`parallax-layer absolute top-10 left-10 w-32 h-32 ${hackerMode ? 'bg-neon-cyan' : 'bg-manga-yellow'} rounded-full opacity-20 blur-lg`} />
        <div className={`parallax-layer absolute bottom-20 right-20 w-48 h-48 ${hackerMode ? 'bg-neon-pink' : 'bg-manga-blue'} rounded-full opacity-20 blur-lg`} />
        <div className={`parallax-layer absolute bottom-40 left-40 w-24 h-24 ${hackerMode ? 'bg-neon-green' : 'bg-manga-red'} rounded-full opacity-20 blur-lg`} />
        
        {/* Enhanced speed lines */}
        <div className="parallax-layer absolute inset-0 opacity-40">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className={`absolute ${hackerMode ? 'bg-neon-cyan' : 'bg-manga-black'}`}
              style={{
                height: `${Math.random() * 3 + 1}px`,
                width: `${Math.random() * 150 + 100}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>
        
        {/* Dynamic manga dots */}
        <div className="parallax-layer absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i + 100}
              className={`absolute rounded-full ${hackerMode ? 'bg-neon-pink' : 'bg-manga-black'}`}
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
              }}
            />
          ))}
        </div>
        
        {/* Animated manga text floating in background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i + 200}
              className={`absolute font-manga text-9xl font-bold ${hackerMode ? 'text-neon-green' : 'text-manga-black'}`}
              initial={{ y: -100, x: Math.random() * 100 - 50, opacity: 0.1 }}
              animate={{ 
                y: window.innerHeight + 100,
                opacity: [0.1, 0.3, 0.1],
                rotate: Math.random() * 20 - 10
              }}
              transition={{ 
                duration: Math.random() * 20 + 15, 
                repeat: Infinity, 
                delay: i * 5 
              }}
              style={{
                left: `${i * 20}%`,
              }}
            >
              {hackerMode ? 'CYBER' : 'MANGA'}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Main hero content */}
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center">
          <motion.div 
            className={`panel p-8 mb-8 max-w-3xl w-full clip-panel relative ${hackerMode ? 'border-neon-cyan bg-manga-black/80' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Decorative corner elements */}
            <div className={`absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 ${hackerMode ? 'border-neon-pink' : 'border-manga-red'} -translate-x-1 -translate-y-1`}></div>
            <div className={`absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 ${hackerMode ? 'border-neon-pink' : 'border-manga-red'} translate-x-1 -translate-y-1`}></div>
            <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 ${hackerMode ? 'border-neon-pink' : 'border-manga-red'} -translate-x-1 translate-y-1`}></div>
            <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 ${hackerMode ? 'border-neon-pink' : 'border-manga-red'} translate-x-1 translate-y-1`}></div>
            
            {/* Sparkle elements */}
            <motion.div 
              className="absolute -top-4 -right-4"
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              <Sparkles className={`${hackerMode ? 'text-neon-cyan' : 'text-manga-yellow'} w-8 h-8`} />
            </motion.div>
            
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
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
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
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button 
                className={`manga-button flex items-center gap-2 ${hackerMode ? 'bg-neon-green text-manga-black' : 'bg-manga-blue text-white'}`}
                onClick={handleResumeDownload}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText size={18} />
                {hackerMode ? 'DOWNLOAD DATA FILE' : 'DOWNLOAD RESUME'}
              </motion.button>
              
              <motion.button 
                className={`manga-button flex items-center gap-2 ${hackerMode ? 'border-neon-pink text-neon-pink' : 'border-manga-yellow bg-transparent text-manga-black'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Play sound effect
                  const audio = new Audio(hackerMode
                    ? 'https://www.soundjay.com/technology/sounds/electronic-1.mp3'
                    : 'https://www.soundjay.com/mechanical/sounds/page-flip-02a.mp3');
                  audio.play().catch(e => console.log('Audio play failed:', e));
                }}
              >
                <Link to="/projects" className="flex items-center gap-2">
                  {hackerMode ? 'ALL SYSTEM PROJECTS' : 'VIEW ALL PROJECTS'}
                </Link>
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
            className={`sound-effect absolute top-1/4 left-1/2 transform -translate-x-1/2 transition-all duration-700 opacity-0 ${hackerMode ? 'text-neon-pink' : ''}`}
          >
            {hackerMode ? 'SYSTEM ONLINE!' : 'WHOOSH!'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
