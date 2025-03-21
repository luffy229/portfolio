
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Zap } from 'lucide-react';
import Projects from '../components/Projects';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { projectsData } from '../data/projectsData';

const AllProjects = () => {
  const [hackerMode, setHackerMode] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const { toast } = useToast();

  // Get unique tech categories from all projects
  const allTechnologies = Array.from(new Set(
    projectsData.flatMap(project => project.technologies)
  )).sort();

  // Check for hacker mode
  useEffect(() => {
    // Check local storage for hacker mode
    const storedHackerMode = localStorage.getItem('hackerMode');
    if (storedHackerMode === 'true') {
      setHackerMode(true);
    }
  }, []);

  // Toggle filter menu
  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
    
    // Sound effect
    const audio = new Audio(hackerMode
      ? 'https://www.soundjay.com/technology/sounds/electronic-2.mp3'
      : 'https://www.soundjay.com/mechanical/sounds/page-flip-01a.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  // Apply filter
  const applyFilter = (tech: string | null) => {
    setFilter(tech);
    setShowFilterMenu(false);
    
    if (tech) {
      toast({
        title: hackerMode ? "FILTER ACTIVATED" : "Filter Applied",
        description: hackerMode 
          ? `SHOWING PROJECTS WITH ${tech.toUpperCase()} TECHNOLOGY` 
          : `Showing projects using ${tech}`,
        variant: "default",
      });
    } else {
      toast({
        title: hackerMode ? "FILTERS CLEARED" : "All Projects",
        description: hackerMode 
          ? "DISPLAYING ALL AVAILABLE MISSIONS" 
          : "Showing all projects",
        variant: "default",
      });
    }
  };
  
  return (
    <div className={`min-h-screen ${hackerMode ? 'bg-manga-black text-neon-cyan' : 'bg-manga-white'}`}>
      {/* Background effects */}
      <div className={`fixed inset-0 z-0 overflow-hidden ${hackerMode ? 'opacity-30' : 'opacity-10'}`}>
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
                top: `${Math.random() * 100}%`,
                opacity: 0.3,
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
                top: `${Math.random() * 100}%`,
                opacity: 0.5,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center">
              <motion.button
                className={`manga-button flex items-center gap-2 ${
                  hackerMode ? 'bg-neon-cyan text-manga-black' : 'bg-manga-yellow text-manga-black'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Play sound effect
                  const audio = new Audio(hackerMode
                    ? 'https://www.soundjay.com/technology/sounds/electronic-5.mp3'
                    : 'https://www.soundjay.com/page-flip-sounds/page-flip-02a.mp3');
                  audio.play().catch(e => console.log('Audio play failed:', e));
                }}
              >
                <ArrowLeft size={18} />
                <span>{hackerMode ? 'RETURN TO MAIN' : 'Back to Home'}</span>
              </motion.button>
            </Link>
            
            <div className="relative">
              <motion.button
                className={`manga-button flex items-center gap-2 ${
                  hackerMode ? 'bg-neon-pink text-manga-black' : 'bg-manga-blue text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFilterMenu}
              >
                {filter ? (
                  <Zap size={18} />
                ) : (
                  <Filter size={18} />
                )}
                <span>
                  {filter 
                    ? (hackerMode ? `${filter.toUpperCase()} ONLY` : `Filter: ${filter}`) 
                    : (hackerMode ? 'APPLY FILTER' : 'Filter Projects')}
                </span>
              </motion.button>
              
              {/* Filter Menu */}
              {showFilterMenu && (
                <motion.div
                  className={`absolute right-0 mt-2 w-64 z-50 manga-card overflow-hidden ${
                    hackerMode ? 'bg-manga-black border border-neon-cyan' : 'bg-white'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`p-4 ${hackerMode ? 'border-b border-neon-cyan' : 'border-b'}`}>
                    <h3 className={`font-manga text-lg ${hackerMode ? 'text-neon-cyan' : ''}`}>
                      {hackerMode ? 'SELECT TECHNOLOGY' : 'Filter by Technology'}
                    </h3>
                  </div>
                  <div className="p-4 max-h-60 overflow-y-auto">
                    <div 
                      className={`mb-2 cursor-pointer p-2 rounded ${
                        filter === null 
                          ? (hackerMode ? 'bg-neon-green text-manga-black' : 'bg-manga-yellow text-manga-black') 
                          : (hackerMode ? 'hover:bg-manga-black/30' : 'hover:bg-gray-100')
                      }`}
                      onClick={() => applyFilter(null)}
                    >
                      {hackerMode ? 'SHOW ALL MISSIONS' : 'Show All Projects'}
                    </div>
                    {allTechnologies.map(tech => (
                      <div 
                        key={tech}
                        className={`mb-2 cursor-pointer p-2 rounded ${
                          filter === tech 
                            ? (hackerMode ? 'bg-neon-green text-manga-black' : 'bg-manga-yellow text-manga-black') 
                            : (hackerMode ? 'hover:bg-manga-black/30' : 'hover:bg-gray-100')
                        }`}
                        onClick={() => applyFilter(tech)}
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          <h1 className={`manga-title text-center ${hackerMode ? 'text-neon-pink' : 'text-manga-red'}`}>
            {hackerMode ? 'ALL DIGITAL MISSIONS' : 'ALL ADVENTURES & BATTLES'}
          </h1>
          
          {filter && (
            <motion.p 
              className={`text-center mt-4 ${hackerMode ? 'text-neon-cyan' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {hackerMode 
                ? `SHOWING MISSIONS WITH ${filter.toUpperCase()} TECHNOLOGY` 
                : `Showing projects using ${filter}`}
            </motion.p>
          )}
        </motion.div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData
            .filter(project => filter ? project.technologies.includes(filter) : true)
            .map((project, index) => (
              <motion.div 
                key={project.id}
                className={`manga-card overflow-hidden cursor-pointer h-96 ${hackerMode ? 'border-neon-cyan bg-manga-black/60' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: hackerMode 
                    ? '0 0 15px rgba(0, 255, 255, 0.8)' 
                    : '8px 8px 0 rgba(0, 0, 0, 1)' 
                }}
              >
                <Link to={`/project/${project.id}`} className="block relative h-full">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className={`w-full h-full object-cover ${hackerMode ? 'opacity-70 hue-rotate-180' : ''}`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${hackerMode ? 'from-manga-black/90' : 'from-manga-black/80'} to-transparent p-6 flex flex-col justify-end`}>
                    <h3 className={`panel-title text-white mb-2 ${hackerMode ? 'text-neon-cyan' : ''}`}>
                      {hackerMode ? project.hackerModeTitle || project.title : project.title}
                    </h3>
                    <p className="text-white mb-4">
                      {hackerMode ? project.hackerModeDescription || project.description : project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className={`${
                          filter === tech 
                            ? (hackerMode ? 'bg-neon-pink text-manga-black' : 'bg-manga-red text-white')
                            : (hackerMode ? 'bg-neon-green text-manga-black' : 'bg-manga-yellow text-manga-black')
                        } px-2 py-1 rounded-full text-sm font-bold`}>
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className={`${hackerMode ? 'bg-neon-green text-manga-black' : 'bg-manga-yellow text-manga-black'} px-2 py-1 rounded-full text-sm font-bold`}>
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
        
        {/* No results message */}
        {filter && projectsData.filter(project => project.technologies.includes(filter)).length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className={`font-manga text-2xl mb-4 ${hackerMode ? 'text-neon-cyan' : ''}`}>
              {hackerMode ? 'NO MISSIONS FOUND' : 'No Projects Found'}
            </h3>
            <p className={`mb-6 ${hackerMode ? 'text-neon-green' : ''}`}>
              {hackerMode 
                ? `NO PROJECTS USING ${filter.toUpperCase()} TECHNOLOGY FOUND IN DATABASE` 
                : `No projects using ${filter} were found.`}
            </p>
            <button 
              className={`manga-button ${hackerMode ? 'bg-neon-pink text-manga-black' : 'bg-manga-red text-white'}`}
              onClick={() => applyFilter(null)}
            >
              {hackerMode ? 'RESET FILTERS' : 'Show All Projects'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
