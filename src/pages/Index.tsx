
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import { ArrowUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const [expPoints, setExpPoints] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [konami, setKonami] = useState<string[]>([]);
  const [hackerMode, setHackerMode] = useState(false);
  const { toast } = useToast();
  
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Track scroll position for various effects
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      // Show/hide scroll to top button
      setShowScrollToTop(scroll > window.innerHeight / 2);
      
      // Increase experience points as user scrolls through content
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const newExpPoints = Math.min(100, Math.floor((scroll / maxScroll) * 100));
      setExpPoints(newExpPoints);
      
      // Determine current section based on scroll position
      const aboutSection = document.getElementById('about-section');
      const projectsSection = document.getElementById('projects-section');
      const contactSection = document.getElementById('contact-section');
      
      if (contactSection && scroll >= contactSection.offsetTop - 100) {
        setCurrentSection('contact');
      } else if (projectsSection && scroll >= projectsSection.offsetTop - 100) {
        setCurrentSection('projects');
      } else if (aboutSection && scroll >= aboutSection.offsetTop - 100) {
        setCurrentSection('about');
      } else {
        setCurrentSection('home');
      }
    });

    return () => {
      lenis.destroy();
    };
  }, []);
  
  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  // Handle navigation
  const handleNavigate = (section: string) => {
    // Play page turn sound
    const audio = new Audio('https://www.soundjay.com/page-flip-sounds/page-flip-01a.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Scroll to appropriate section
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
      window.scrollTo({
        top: section === 'home' ? 0 : targetSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Check for stored hacker mode on initial load
  useEffect(() => {
    const storedHackerMode = localStorage.getItem('hackerMode');
    if (storedHackerMode === 'true') {
      setHackerMode(true);
    }
  }, []);

  // Konami code detection (↑↑↓↓←→←→BA)
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKonami = [...konami, e.key];
      if (newKonami.length > konamiCode.length) {
        newKonami.shift();
      }
      setKonami(newKonami);
      
      // Check if konami code is entered
      if (newKonami.join('') === konamiCode.join('')) {
        const newHackerMode = !hackerMode;
        setHackerMode(newHackerMode);
        
        // Save hacker mode to localStorage
        localStorage.setItem('hackerMode', newHackerMode.toString());
        
        const audio = new Audio('https://www.soundjay.com/nature/sounds/magical-effect-1.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));
        
        toast({
          title: newHackerMode ? "Hacker Mode Activated!" : "Hacker Mode Deactivated",
          description: newHackerMode ? "You've unlocked the secret cyber-manga dimension!" : "Returning to normal manga mode",
          variant: "default",
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [konami, hackerMode, toast]);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`min-h-screen ${hackerMode ? 'bg-manga-black text-neon-cyan' : 'bg-manga-white'} relative`}>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>
      
      {/* Background effects */}
      {!isLoading && (
        <div className={`fixed inset-0 z-0 overflow-hidden ${hackerMode ? 'opacity-30' : 'opacity-10'}`}>
          {/* Manga panels background */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className={`absolute border-4 ${hackerMode ? 'border-neon-cyan' : 'border-manga-black'} bg-transparent`}
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 200 + 100}px`,
                  transform: `rotate(${Math.random() * 20 - 10}deg)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 400}%`,
                }}
              />
            ))}
          </div>
          
          {/* Speed lines */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div 
                key={i}
                className={`absolute ${hackerMode ? 'bg-neon-cyan' : 'bg-manga-black'}`}
                style={{
                  height: '2px',
                  width: `${Math.random() * 200 + 100}px`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 400}%`,
                  opacity: 0.5,
                }}
              />
            ))}
          </div>
          
          {/* Manga dots pattern */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <div 
                key={i}
                className={`absolute rounded-full ${hackerMode ? 'bg-neon-pink' : 'bg-manga-black'}`}
                style={{
                  width: `${Math.random() * 5 + 2}px`,
                  height: `${Math.random() * 5 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 400}%`,
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
          
          {/* Cyberpunk city (only visible in hacker mode) */}
          {hackerMode && (
            <div className="absolute inset-0 bg-cover bg-center opacity-20" 
                 style={{backgroundImage: 'url(https://images.unsplash.com/photo-1555788961-19d65a36cfbc?auto=format&fit=crop&w=2000&q=80)'}} />
          )}
        </div>
      )}
      
      {/* Main Content */}
      {!isLoading && (
        <>
          {/* Navigation */}
          <Navigation currentSection={currentSection} onNavigate={handleNavigate} hackerMode={hackerMode} />
          
          {/* Experience Bar */}
          <div className={`fixed bottom-0 left-0 right-0 z-50 px-4 py-2 ${hackerMode ? 'bg-manga-black/80' : 'bg-white/80'}`}>
            <div className="container mx-auto flex items-center">
              <span className={`font-manga text-sm mr-2 ${hackerMode ? 'text-neon-cyan' : 'text-manga-black'}`}>
                EXP
              </span>
              <div className={`exp-bar-container flex-grow ${hackerMode ? 'border-neon-cyan' : ''}`}>
                <div 
                  className={`exp-bar ${hackerMode ? 'bg-neon-cyan' : 'bg-manga-blue'}`} 
                  style={{ width: `${expPoints}%` }}
                />
              </div>
              <span className={`font-manga text-sm ml-2 ${hackerMode ? 'text-neon-cyan' : 'text-manga-black'}`}>
                {expPoints}%
              </span>
            </div>
          </div>
          
          {/* Scroll to top button */}
          <AnimatePresence>
            {showScrollToTop && (
              <motion.button
                className={`fixed bottom-16 right-8 z-50 manga-button p-3 ${hackerMode ? 'bg-neon-cyan text-manga-black' : 'bg-manga-yellow'}`}
                onClick={scrollToTop}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUp size={20} />
              </motion.button>
            )}
          </AnimatePresence>
          
          {/* Hero Section */}
          <section id="home-section">
            <Hero onNavigate={handleNavigate} hackerMode={hackerMode} />
          </section>
          
          {/* About Section */}
          <section id="about-section">
            <About hackerMode={hackerMode} />
          </section>
          
          {/* Projects Section */}
          <section id="projects-section">
            <Projects hackerMode={hackerMode} limit={4} />
          </section>
          
          {/* Contact Section */}
          <section id="contact-section">
            <Contact hackerMode={hackerMode} />
          </section>
          
          {/* Footer */}
          <footer className={`py-6 ${hackerMode ? 'bg-manga-black border-t border-neon-cyan' : 'bg-manga-black'} text-center`}>
            <p className={`font-manga ${hackerMode ? 'text-neon-cyan' : 'text-white'}`}>
              © 2023 {hackerMode ? 'CYBER MANGA' : 'MANGA PORTFOLIO'}
            </p>
            <p className={`text-sm mt-2 ${hackerMode ? 'text-neon-pink' : 'text-white'}`}>
              Created with React, Tailwind CSS & Framer Motion
            </p>
            <p className="text-xs mt-1 text-gray-400">
              Tip: Try the Konami Code ↑↑↓↓←→←→BA
            </p>
          </footer>
        </>
      )}
    </div>
  );
};

export default Index;
