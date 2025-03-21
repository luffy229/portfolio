
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Mail, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const Navigation = ({ currentSection, onNavigate }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };
  
  // Navigation items with their icons and preview images
  const navItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: <Home />, 
      preview: 'https://images.unsplash.com/photo-1565310022245-13eb49c7f950?q=80&w=200&auto=format',
    },
    { 
      id: 'about', 
      label: 'Character', 
      icon: <User />, 
      preview: 'https://images.unsplash.com/photo-1612036782180-6f0822045d55?q=80&w=200&auto=format',
    },
    { 
      id: 'projects', 
      label: 'Adventures', 
      icon: <Briefcase />, 
      preview: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=200&auto=format',
    },
    { 
      id: 'contact', 
      label: 'Connect', 
      icon: <Mail />, 
      preview: 'https://images.unsplash.com/photo-1563674582-028be77c49f4?q=80&w=200&auto=format',
    },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed top-4 right-4 z-40 md:hidden">
        <button 
          className="manga-button p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-manga-black/90 z-30 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-6">
              {navItems.map(item => (
                <motion.button
                  key={item.id}
                  className={`manga-button flex items-center space-x-2 ${
                    currentSection === item.id ? 'bg-manga-red text-white' : ''
                  }`}
                  onClick={() => handleNavigate(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Desktop Navigation */}
      <div className="fixed top-0 left-0 w-full z-40 hidden md:block">
        <motion.div 
          className="flex justify-center py-6 bg-white border-b-4 border-manga-black"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex space-x-8">
            {navItems.map(item => (
              <div key={item.id} className="relative perspective">
                <motion.button
                  className={`manga-button flex items-center space-x-2 ${
                    currentSection === item.id ? 'bg-manga-red text-white' : ''
                  }`}
                  onClick={() => handleNavigate(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
                
                {/* Preview Panel */}
                <motion.div
                  className="absolute top-full left-0 mt-2 w-40 h-24 opacity-0 pointer-events-none manga-card overflow-hidden"
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
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-manga-black/20 flex items-center justify-center">
                    <span className="font-manga text-white text-stroke text-xl">
                      {item.label}
                    </span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Navigation;
