
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const [pageTransition, setPageTransition] = useState<'fade' | 'slide' | 'flip'>('fade');
  
  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  // Handle navigation
  const handleNavigate = (section: string) => {
    // Play page turn sound
    const audio = new Audio('https://www.soundjay.com/page-flip-sounds/page-flip-01a.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Set random transition type
    const transitions: Array<'fade' | 'slide' | 'flip'> = ['fade', 'slide', 'flip'];
    const randomTransition = transitions[Math.floor(Math.random() * transitions.length)];
    setPageTransition(randomTransition);
    
    // Update section after a short delay
    setTimeout(() => {
      setCurrentSection(section);
      
      // Scroll to appropriate section
      if (section !== 'home') {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 300);
  };
  
  // Get transition properties based on current transition type
  const getTransitionProps = () => {
    switch (pageTransition) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.3 }
        };
      case 'slide':
        return {
          initial: { x: '100%' },
          animate: { x: 0 },
          exit: { x: '-100%' },
          transition: { duration: 0.3 }
        };
      case 'flip':
        return {
          initial: { rotateY: 90, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
          exit: { rotateY: -90, opacity: 0 },
          transition: { duration: 0.4 }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.3 }
        };
    }
  };

  return (
    <div className="min-h-screen bg-manga-white relative">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>
      
      {/* Main Content */}
      {!isLoading && (
        <>
          {/* Navigation */}
          <Navigation currentSection={currentSection} onNavigate={handleNavigate} />
          
          {/* Home/Hero Section */}
          <AnimatePresence mode="wait">
            {currentSection === 'home' && (
              <motion.div key="home" {...getTransitionProps()}>
                <Hero onNavigate={handleNavigate} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Content Sections */}
          <AnimatePresence mode="wait">
            <motion.div key={currentSection} {...getTransitionProps()}>
              {currentSection === 'about' && <About />}
              {currentSection === 'projects' && <Projects />}
              {currentSection === 'contact' && <Contact />}
            </motion.div>
          </AnimatePresence>
          
          {/* Footer */}
          <footer className="py-6 bg-manga-black text-white text-center">
            <p className="font-manga">© 2023 MANGA PORTFOLIO</p>
            <p className="text-sm mt-2">Created with React, Tailwind CSS & Framer Motion</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default Index;
