
import { useState, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import { useIsMobile } from '../hooks/use-mobile';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [hackerMode, setHackerMode] = useState(false);
  const isMobile = useIsMobile();
  
  // Sections references
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({
    home: null,
    about: null,
    projects: null,
    contact: null
  });
  
  // Setup smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureOrientation: 'vertical',
      // Remove smoothTouch as it doesn't exist in the Lenis type
    });
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    // Observer to detect which section is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setCurrentSection(id);
        }
      });
    }, { threshold: 0.5 });
    
    // Observe all sections
    Object.keys(sectionsRef.current).forEach(key => {
      const element = sectionsRef.current[key];
      if (element) observer.observe(element);
    });
    
    return () => {
      lenis.destroy();
      Object.values(sectionsRef.current).forEach(element => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);
  
  // Handle navigation clicks
  const handleNavigate = (section: string) => {
    const element = sectionsRef.current[section];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Toggle hacker mode
  const toggleHackerMode = () => {
    setHackerMode(!hackerMode);
    
    // Apply hacker mode to body
    if (!hackerMode) {
      document.body.classList.add('hacker-mode');
      document.body.classList.add('cyber-grid');
    } else {
      document.body.classList.remove('hacker-mode');
      document.body.classList.remove('cyber-grid');
    }
  };
  
  return (
    <div className="relative">
      {/* Navigation */}
      <Navigation currentSection={currentSection} onNavigate={handleNavigate} hackerMode={hackerMode} />
      
      {/* Hacker mode toggle */}
      <button 
        className={`fixed bottom-4 right-4 z-50 manga-button p-2 ${hackerMode ? 'bg-neon-cyan text-manga-black' : ''}`}
        onClick={toggleHackerMode}
      >
        {hackerMode ? 'NORMAL MODE' : 'HACKER MODE'}
      </button>
      
      {/* Sections */}
      <section 
        id="home" 
        ref={el => sectionsRef.current.home = el}
        className="min-h-screen"
      >
        <Hero onNavigate={handleNavigate} hackerMode={hackerMode} />
      </section>
      
      <section 
        id="about" 
        ref={el => sectionsRef.current.about = el}
        className="min-h-screen"
      >
        <About hackerMode={hackerMode} />
      </section>
      
      <section 
        id="projects" 
        ref={el => sectionsRef.current.projects = el}
        className="min-h-screen"
      >
        <Projects hackerMode={hackerMode} limit={4} />
      </section>
      
      <section 
        id="contact" 
        ref={el => sectionsRef.current.contact = el}
        className="min-h-screen"
      >
        <Contact hackerMode={hackerMode} />
      </section>
    </div>
  );
};

export default Index;
