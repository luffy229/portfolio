
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Mail, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  hackerMode?: boolean;
}

const Navigation = ({ currentSection, onNavigate, hackerMode = false }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  // Handle scroll event to change nav styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };
  
  // Navigation items with their icons and preview images
  const navItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: <Home size={isMobile ? 22 : 24} />, 
      preview: 'https://images.unsplash.com/photo-1565310022245-13eb49c7f950?q=80&w=200&auto=format',
    },
    { 
      id: 'about', 
      label: 'Character', 
      icon: <User size={isMobile ? 22 : 24} />, 
      preview: 'https://images.unsplash.com/photo-1612036782180-6f0822045d55?q=80&w=200&auto=format',
    },
    { 
      id: 'projects', 
      label: 'Adventures', 
      icon: <Briefcase size={isMobile ? 22 : 24} />, 
      preview: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=200&auto=format',
    },
    { 
      id: 'contact', 
      label: 'Connect', 
      icon: <Mail size={isMobile ? 22 : 24} />, 
      preview: 'https://images.unsplash.com/photo-1563674582-028be77c49f4?q=80&w=200&auto=format',
    },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <div className={`fixed top-0 left-0 right-0 z-40 md:hidden ${isScrolled ? 'bg-white/90 dark:bg-manga-black/90' : ''} ${hackerMode ? 'bg-manga-black/80' : ''} transition-all duration-300 py-3 px-4`}>
        <div className="flex justify-between items-center">
          <motion.h1 
            className={`font-manga text-xl ${hackerMode ? 'text-neon-cyan' : 'text-manga-red'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {hackerMode ? 'CYBER.PORT' : 'MANGA.PORT'}
          </motion.h1>
          <button 
            className={`manga-button p-2 ${hackerMode ? 'bg-neon-cyan text-manga-black' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {isMenuOpen && (
          <motion.div 
            className={`fixed inset-0 ${hackerMode ? 'bg-manga-black/95' : 'bg-manga-black/90'} z-30 flex flex-col items-center justify-center`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-6 w-4/5 max-w-xs">
              {navItems.map(item => (
                <motion.button
                  key={item.id}
                  className={`manga-button flex items-center space-x-3 justify-center ${
                    currentSection === item.id 
                      ? hackerMode 
                        ? 'bg-neon-pink text-manga-black' 
                        : 'bg-manga-red text-white'
                      : hackerMode
                        ? 'bg-manga-black text-neon-cyan border border-neon-cyan'
                        : ''
                  }`}
                  onClick={() => handleNavigate(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span>{hackerMode ? item.label.toUpperCase() : item.label}</span>
                </motion.button>
              ))}
              
              <motion.button
                className={`manga-button flex items-center space-x-2 justify-center ${
                  hackerMode 
                    ? 'bg-neon-green text-manga-black' 
                    : 'bg-manga-yellow text-manga-black'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/projects" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <Briefcase size={18} />
                  <span>{hackerMode ? 'VIEW ADVENTURES' : 'View Adventures'}</span>
                </Link>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Desktop Navigation */}
      <div className={`fixed top-0 left-0 w-full z-40 hidden md:block ${isScrolled ? 'bg-white/90 dark:bg-manga-black/90 py-4' : 'py-6'} ${hackerMode ? 'bg-manga-black/80 border-b border-neon-cyan' : 'border-b-4 border-manga-black'} transition-all duration-300`}>
        <motion.div 
          className="flex justify-center"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex space-x-8">
            {navItems.map(item => (
              <div key={item.id} className="relative perspective">
                <motion.button
                  className={`manga-button flex items-center space-x-2 ${
                    currentSection === item.id 
                      ? hackerMode 
                        ? 'bg-neon-pink text-manga-black' 
                        : 'bg-manga-red text-white'
                      : hackerMode
                        ? 'bg-manga-black text-neon-cyan border border-neon-cyan'
                        : ''
                  }`}
                  onClick={() => handleNavigate(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span>{hackerMode ? item.label.toUpperCase() : item.label}</span>
                </motion.button>
                
                {/* Preview Panel */}
                <motion.div
                  className={`absolute top-full left-0 mt-2 w-40 h-24 opacity-0 pointer-events-none manga-card overflow-hidden ${hackerMode ? 'border border-neon-cyan' : ''}`}
                  style={{
                    transformOrigin: 'top center'
                  }}
                  whileHover={{
                    opacity: 1,
                    y: [10, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  <img 
                    src={item.preview} 
                    alt={item.label} 
                    className={`w-full h-full object-cover ${hackerMode ? 'hue-rotate-180 contrast-125' : ''}`}
                  />
                  <div className="absolute inset-0 bg-manga-black/20 flex items-center justify-center">
                    <span className={`font-manga text-white text-stroke text-xl ${hackerMode ? 'text-neon-cyan' : ''}`}>
                      {hackerMode ? item.label.toUpperCase() : item.label}
                    </span>
                  </div>
                </motion.div>
              </div>
            ))}
            
            <div className="relative perspective">
              <motion.button
                className={`manga-button flex items-center space-x-2 ${
                  hackerMode 
                    ? 'bg-neon-green text-manga-black' 
                    : 'bg-manga-yellow text-manga-black'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/projects" className="flex items-center gap-2">
                  <Briefcase size={18} />
                  <span>{hackerMode ? 'VIEW ADVENTURES' : 'View Adventures'}</span>
                </Link>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Navigation;
