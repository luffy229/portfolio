
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Play, X, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { useIsMobile } from '../hooks/use-mobile';

interface ProjectsProps {
  hackerMode?: boolean;
  limit?: number;
}

const Projects = ({ hackerMode = false, limit }: ProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [battleAnimation, setBattleAnimation] = useState(false);
  const isMobile = useIsMobile();
  
  // Filter projects based on limit
  const projects = limit ? projectsData.slice(0, limit) : projectsData;
  
  // Open project detail view with battle animation
  const openProject = (id: number) => {
    // Start battle animation
    setBattleAnimation(true);
    
    // Play battle sound effect
    const audio = new Audio(hackerMode 
      ? 'https://www.soundjay.com/technology/sounds/electronic-4.mp3'
      : 'https://www.soundjay.com/page-flip-sounds/page-flip-01a.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Show battle animation before revealing project
    setTimeout(() => {
      setBattleAnimation(false);
      setSelectedProject(id);
    }, 800);
  };
  
  // Close project detail view
  const closeProject = () => {
    setSelectedProject(null);
    // Add page turn sound effect
    const audio = new Audio(hackerMode
      ? 'https://www.soundjay.com/technology/sounds/electronic-5.mp3'
      : 'https://www.soundjay.com/page-flip-sounds/page-flip-02a.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };
  
  return (
    <div className={`min-h-screen py-24 px-4 ${hackerMode ? 'bg-manga-black/50' : ''}`}>
      <div className="container mx-auto">
        <motion.h2 
          className={`manga-title text-center mb-10 md:mb-16 ${hackerMode ? 'text-neon-pink' : 'text-manga-red'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {hackerMode ? 'DIGITAL MISSIONS' : 'ADVENTURES & BATTLES'}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className={`manga-card overflow-hidden cursor-pointer h-80 md:h-96 ${hackerMode ? 'border-neon-cyan bg-manga-black/60' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openProject(project.id)}
              whileHover={{ 
                scale: 1.02,
                boxShadow: hackerMode 
                  ? '0 0 15px rgba(0, 255, 255, 0.8)' 
                  : '8px 8px 0 rgba(0, 0, 0, 1)' 
              }}
            >
              <div className="relative h-full">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className={`w-full h-full object-cover ${hackerMode ? 'opacity-70 hue-rotate-180' : ''}`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${hackerMode ? 'from-manga-black/90' : 'from-manga-black/80'} to-transparent p-4 md:p-6 flex flex-col justify-end`}>
                  <h3 className={`panel-title text-xl md:text-2xl text-white mb-2 ${hackerMode ? 'text-neon-cyan' : ''}`}>
                    {project.title}
                  </h3>
                  <p className="text-white text-sm md:text-base mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, isMobile ? 2 : 3).map((tech, i) => (
                      <span key={i} className={`${hackerMode ? 'bg-neon-green text-manga-black' : 'bg-manga-yellow text-manga-black'} px-2 py-1 rounded-full text-xs md:text-sm font-bold`}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > (isMobile ? 2 : 3) && (
                      <span className={`${hackerMode ? 'bg-neon-green text-manga-black' : 'bg-manga-yellow text-manga-black'} px-2 py-1 rounded-full text-xs md:text-sm font-bold`}>
                        +{project.technologies.length - (isMobile ? 2 : 3)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {limit && (
          <motion.div 
            className="flex justify-center mt-10 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link to="/projects">
              <motion.button
                className={`manga-button flex items-center gap-2 ${
                  hackerMode ? 'bg-neon-pink text-manga-black' : 'bg-manga-red text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Play sound effect
                  const audio = new Audio(hackerMode
                    ? 'https://www.soundjay.com/technology/sounds/electronic-1.mp3'
                    : 'https://www.soundjay.com/page-flip-sounds/page-flip-01a.mp3');
                  audio.play().catch(e => console.log('Audio play failed:', e));
                }}
              >
                {hackerMode ? 'VIEW ALL MISSIONS' : 'VIEW ADVENTURES'} 
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
      
      {/* Battle Animation Overlay */}
      <AnimatePresence>
        {battleAnimation && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Battle effects */}
              <motion.div
                className={`absolute font-manga text-5xl md:text-8xl ${hackerMode ? 'text-neon-cyan' : 'text-manga-red'}`}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: [0, 1.5, 0], rotate: [-20, 0, 20], opacity: [0, 1, 0] }}
                transition={{ duration: 0.8 }}
              >
                {hackerMode ? 'ACCESSING' : 'BATTLE!'}
              </motion.div>
              
              {/* Energy blasts */}
              {[...Array(isMobile ? 10 : 20)].map((_, i) => (
                <motion.div 
                  key={i}
                  className={`absolute w-1 h-20 ${hackerMode ? 'bg-neon-green' : 'bg-manga-yellow'} rounded-full`}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0,
                    rotate: Math.random() * 360,
                    opacity: 1
                  }}
                  animate={{ 
                    x: (Math.random() - 0.5) * window.innerWidth,
                    y: (Math.random() - 0.5) * window.innerHeight,
                    scale: [0, 1, 0.5, 0],
                    opacity: [1, 1, 0.5, 0]
                  }}
                  transition={{ duration: 0.8 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div 
            className={`fixed inset-0 ${hackerMode ? 'bg-manga-black/80' : 'bg-manga-black/70'} z-50 flex items-center justify-center p-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
          >
            <motion.div 
              className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto manga-card ${
                hackerMode ? 'bg-manga-black border-neon-pink' : 'bg-white'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Find the selected project */}
              {(() => {
                const project = projectsData.find(p => p.id === selectedProject);
                if (!project) return null;
                
                return (
                  <div className="relative">
                    <button 
                      className={`absolute top-4 right-4 z-10 manga-button p-2 ${
                        hackerMode ? 'bg-neon-cyan text-manga-black' : ''
                      }`}
                      onClick={closeProject}
                    >
                      <X size={24} />
                    </button>
                    
                    <div className="h-48 md:h-64 relative">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className={`w-full h-full object-cover ${hackerMode ? 'hue-rotate-180 opacity-70' : ''}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-manga-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className={`panel-title text-2xl md:text-3xl ${hackerMode ? 'text-neon-cyan' : 'text-white'} mb-2`}>
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className={`p-4 md:p-6 ${hackerMode ? 'text-white' : ''}`}>
                      <div className={`panel p-3 md:p-4 mb-4 md:mb-6 ${hackerMode ? 'border-neon-green bg-manga-black/70' : ''}`}>
                        <h4 className={`font-manga text-lg md:text-xl mb-2 ${hackerMode ? 'text-neon-green' : ''}`}>
                          {hackerMode ? 'MISSION DETAILS' : 'PROJECT DETAILS'}
                        </h4>
                        <p className="text-sm md:text-base">{project.details}</p>
                      </div>
                      
                      <div className="mb-4 md:mb-6">
                        <h4 className={`font-manga text-lg md:text-xl mb-2 ${hackerMode ? 'text-neon-pink' : ''}`}>
                          {hackerMode ? 'TECH STACK' : 'TECHNOLOGIES'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className={`${
                              hackerMode ? 'bg-neon-green text-manga-black' : 'bg-manga-yellow text-manga-black'
                            } px-2 py-1 rounded-full text-xs md:text-sm font-bold`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 md:gap-4">
                        <a 
                          href={project.links.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`manga-button flex items-center gap-2 text-sm md:text-base ${
                            hackerMode ? 'bg-neon-cyan text-manga-black' : ''
                          }`}
                        >
                          {hackerMode ? <Zap size={16} /> : <Play size={16} />}
                          <span>{hackerMode ? 'Launch System' : 'Live Demo'}</span>
                        </a>
                        <a 
                          href={project.links.code} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`manga-button flex items-center gap-2 text-sm md:text-base ${
                            hackerMode ? 'border-neon-pink text-neon-pink' : ''
                          }`}
                        >
                          <Code size={16} />
                          <span>{hackerMode ? 'Source Code' : 'View Code'}</span>
                        </a>
                        <Link 
                          to={`/project/${project.id}`} 
                          className={`manga-button flex items-center gap-2 text-sm md:text-base ${
                            hackerMode ? 'bg-neon-green text-manga-black' : 'bg-manga-blue text-white'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            const audio = new Audio(hackerMode
                              ? 'https://www.soundjay.com/technology/sounds/electronic-3.mp3'
                              : 'https://www.soundjay.com/page-flip-sounds/page-flip-03a.mp3');
                            audio.play().catch(e => console.log('Audio play failed:', e));
                          }}
                        >
                          <ExternalLink size={16} />
                          <span>{hackerMode ? 'DETAILS' : 'Full Details'}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
