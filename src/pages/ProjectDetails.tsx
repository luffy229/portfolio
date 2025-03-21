
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState(projectsData[0]);
  const [hackerMode, setHackerMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Find the project based on the ID
  useEffect(() => {
    if (id) {
      const foundProject = projectsData.find(p => p.id === parseInt(id));
      if (foundProject) {
        setProject(foundProject);
      }
    }
    
    // Check local storage for hacker mode
    const storedHackerMode = localStorage.getItem('hackerMode');
    if (storedHackerMode === 'true') {
      setHackerMode(true);
    }
    
    // Play page turn sound on load
    const audio = new Audio(hackerMode
      ? 'https://www.soundjay.com/technology/sounds/electronic-4.mp3'
      : 'https://www.soundjay.com/page-flip-sounds/page-flip-03a.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Simulate loading for effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id, hackerMode]);

  // Handle gallery navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === (project.gallery?.length || 1) - 1 ? 0 : prevIndex + 1
    );
    
    // Play sound effect
    const audio = new Audio(hackerMode
      ? 'https://www.soundjay.com/technology/sounds/electronic-1.mp3'
      : 'https://www.soundjay.com/buttons/sounds/button-09.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? (project.gallery?.length || 1) - 1 : prevIndex - 1
    );
    
    // Play sound effect
    const audio = new Audio(hackerMode
      ? 'https://www.soundjay.com/technology/sounds/electronic-2.mp3'
      : 'https://www.soundjay.com/buttons/sounds/button-10.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  // Loading screen
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${hackerMode ? 'bg-manga-black' : 'bg-white'}`}>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className={`font-manga text-3xl mb-4 ${hackerMode ? 'text-neon-cyan' : 'text-manga-blue'}`}>
            {hackerMode ? 'LOADING MISSION DATA...' : 'Loading Project...'}
          </h2>
          <div className={`w-64 h-2 ${hackerMode ? 'bg-manga-black/30' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <motion.div 
              className={`h-full ${hackerMode ? 'bg-neon-pink' : 'bg-manga-red'}`}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${hackerMode ? 'bg-manga-black text-neon-cyan' : 'bg-manga-white'}`}>
      {/* Background elements */}
      <div className={`fixed inset-0 z-0 overflow-hidden ${hackerMode ? 'opacity-20' : 'opacity-10'}`}>
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
        
        {/* Manga panels background */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i + 100}
              className={`absolute border-4 ${hackerMode ? 'border-neon-cyan' : 'border-manga-black'} bg-transparent`}
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                transform: `rotate(${Math.random() * 20 - 10}deg)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Back button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/projects" className="inline-block">
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
              <span>{hackerMode ? 'BACK TO MISSIONS' : 'Back to Projects'}</span>
            </motion.button>
          </Link>
        </motion.div>
        
        {/* Project hero section */}
        <motion.div
          className={`manga-card mb-12 overflow-hidden ${hackerMode ? 'border-neon-pink' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-96">
            <img 
              src={project.image} 
              alt={project.title} 
              className={`w-full h-full object-cover ${hackerMode ? 'opacity-70 hue-rotate-180' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-manga-black/90 to-transparent/20 flex flex-col justify-end p-8">
              <motion.h1 
                className={`manga-title text-white mb-4 ${hackerMode ? 'text-neon-cyan' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {hackerMode ? project.hackerModeTitle || project.title : project.title}
              </motion.h1>
              
              <motion.p 
                className="text-white text-xl mb-6 max-w-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {hackerMode ? project.hackerModeDescription || project.description : project.description}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {project.technologies.map((tech, i) => (
                  <span key={i} className={`${
                    hackerMode ? 'bg-neon-green text-manga-black' : 'bg-manga-yellow text-manga-black'
                  } px-3 py-1 rounded-full text-sm font-bold`}>
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Two-column layout for project details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Project details */}
            <div className={`manga-card p-6 mb-8 ${hackerMode ? 'border-neon-cyan bg-manga-black/60' : ''}`}>
              <h2 className={`panel-title mb-4 ${hackerMode ? 'text-neon-cyan' : 'text-manga-blue'}`}>
                {hackerMode ? 'MISSION DETAILS' : 'Project Overview'}
              </h2>
              <p className={`mb-6 ${hackerMode ? 'text-white' : ''}`}>
                {hackerMode ? project.hackerModeDetails || project.details : project.details}
              </p>
              
              <div className="flex gap-4">
                <a 
                  href={project.links.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`manga-button flex items-center gap-2 ${
                    hackerMode ? 'bg-neon-cyan text-manga-black' : 'bg-manga-red text-white'
                  }`}
                >
                  <ExternalLink size={18} />
                  <span>{hackerMode ? 'ACCESS SYSTEM' : 'Live Demo'}</span>
                </a>
                <a 
                  href={project.links.code} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`manga-button flex items-center gap-2 ${
                    hackerMode ? 'border-neon-pink text-neon-pink' : ''
                  }`}
                >
                  <Code size={18} />
                  <span>{hackerMode ? 'SOURCE CODE' : 'View Code'}</span>
                </a>
              </div>
            </div>
            
            {/* Challenges and Solutions */}
            <div className={`manga-card p-6 ${hackerMode ? 'border-neon-green bg-manga-black/60' : ''}`}>
              <h2 className={`panel-title mb-4 ${hackerMode ? 'text-neon-green' : 'text-manga-red'}`}>
                {hackerMode ? 'OBSTACLES ENCOUNTERED' : 'Challenges & Solutions'}
              </h2>
              
              <div className="mb-6">
                <h3 className={`font-manga text-lg mb-2 ${hackerMode ? 'text-neon-pink' : 'text-manga-blue'}`}>
                  {hackerMode ? 'SYSTEM CHALLENGES' : 'Challenges'}
                </h3>
                <p className={hackerMode ? 'text-white' : ''}>
                  {hackerMode ? project.hackerModeChallenges || project.challenges : project.challenges}
                </p>
              </div>
              
              <div>
                <h3 className={`font-manga text-lg mb-2 ${hackerMode ? 'text-neon-cyan' : 'text-manga-blue'}`}>
                  {hackerMode ? 'IMPLEMENTED SOLUTIONS' : 'Solutions'}
                </h3>
                <p className={hackerMode ? 'text-white' : ''}>
                  {hackerMode ? project.hackerModeSolutions || project.solutions : project.solutions}
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Project gallery */}
            <div className={`manga-card p-6 ${hackerMode ? 'border-neon-pink bg-manga-black/60' : ''}`}>
              <h2 className={`panel-title mb-4 ${hackerMode ? 'text-neon-pink' : 'text-manga-blue'}`}>
                {hackerMode ? 'VISUAL DATA' : 'Project Gallery'}
              </h2>
              
              <div className="relative h-80 mb-4">
                {project.gallery && project.gallery.length > 0 ? (
                  <>
                    <img 
                      src={project.gallery[currentImageIndex]} 
                      alt={`${project.title} screenshot ${currentImageIndex + 1}`} 
                      className={`w-full h-full object-cover rounded-lg ${hackerMode ? 'hue-rotate-180 contrast-125' : ''}`}
                    />
                    
                    {/* Image navigation */}
                    {project.gallery.length > 1 && (
                      <>
                        <button 
                          className={`absolute left-2 top-1/2 transform -translate-y-1/2 manga-button p-2 ${
                            hackerMode ? 'bg-neon-cyan text-manga-black' : 'bg-white text-manga-black'
                          }`}
                          onClick={prevImage}
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 manga-button p-2 ${
                            hackerMode ? 'bg-neon-cyan text-manga-black' : 'bg-white text-manga-black'
                          }`}
                          onClick={nextImage}
                        >
                          <ChevronRight size={20} />
                        </button>
                        
                        {/* Image indicators */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {project.gallery.map((_, index) => (
                            <button
                              key={index}
                              className={`w-3 h-3 rounded-full ${
                                currentImageIndex === index 
                                  ? (hackerMode ? 'bg-neon-pink' : 'bg-manga-red') 
                                  : (hackerMode ? 'bg-white/30' : 'bg-white/50')
                              }`}
                              onClick={() => {
                                setCurrentImageIndex(index);
                                const audio = new Audio(hackerMode
                                  ? 'https://www.soundjay.com/technology/sounds/electronic-1.mp3'
                                  : 'https://www.soundjay.com/buttons/sounds/button-11.mp3');
                                audio.play().catch(e => console.log('Audio play failed:', e));
                              }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className={`w-full h-full flex items-center justify-center rounded-lg ${
                    hackerMode ? 'bg-manga-black border border-neon-cyan' : 'bg-gray-100'
                  }`}>
                    <p className={hackerMode ? 'text-neon-cyan' : ''}>
                      {hackerMode ? 'NO VISUAL DATA AVAILABLE' : 'No gallery images available'}
                    </p>
                  </div>
                )}
              </div>
              
              {project.gallery && project.gallery.length > 0 && (
                <p className={`text-center text-sm ${hackerMode ? 'text-neon-green' : 'text-gray-500'}`}>
                  {hackerMode 
                    ? `IMAGE ${currentImageIndex + 1} OF ${project.gallery.length}` 
                    : `Image ${currentImageIndex + 1} of ${project.gallery.length}`}
                </p>
              )}
            </div>
            
            {/* Next and previous project navigation */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {id && parseInt(id) > 1 && (
                <Link to={`/project/${parseInt(id) - 1}`} className="block">
                  <motion.div
                    className={`manga-card p-4 h-full ${hackerMode ? 'border-neon-cyan bg-manga-black/60' : ''}`}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => {
                      const audio = new Audio(hackerMode
                        ? 'https://www.soundjay.com/technology/sounds/electronic-3.mp3'
                        : 'https://www.soundjay.com/page-flip-sounds/page-flip-01a.mp3');
                      audio.play().catch(e => console.log('Audio play failed:', e));
                    }}
                  >
                    <div className="flex items-center h-full">
                      <ChevronLeft size={20} className={hackerMode ? 'text-neon-pink' : ''} />
                      <div className="ml-2">
                        <p className={`text-sm ${hackerMode ? 'text-neon-green' : 'text-gray-500'}`}>
                          {hackerMode ? 'PREVIOUS MISSION' : 'Previous Project'}
                        </p>
                        <p className={`font-manga truncate ${hackerMode ? 'text-neon-cyan' : ''}`}>
                          {(() => {
                            const prevProject = projectsData.find(p => p.id === parseInt(id) - 1);
                            return hackerMode 
                              ? prevProject?.hackerModeTitle || prevProject?.title || 'Unknown'
                              : prevProject?.title || 'Unknown';
                          })()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )}
              
              {id && parseInt(id) < projectsData.length && (
                <Link to={`/project/${parseInt(id) + 1}`} className="block">
                  <motion.div
                    className={`manga-card p-4 h-full ${hackerMode ? 'border-neon-cyan bg-manga-black/60' : ''}`}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => {
                      const audio = new Audio(hackerMode
                        ? 'https://www.soundjay.com/technology/sounds/electronic-3.mp3'
                        : 'https://www.soundjay.com/page-flip-sounds/page-flip-01a.mp3');
                      audio.play().catch(e => console.log('Audio play failed:', e));
                    }}
                  >
                    <div className="flex items-center justify-end h-full">
                      <div className="mr-2 text-right">
                        <p className={`text-sm ${hackerMode ? 'text-neon-green' : 'text-gray-500'}`}>
                          {hackerMode ? 'NEXT MISSION' : 'Next Project'}
                        </p>
                        <p className={`font-manga truncate ${hackerMode ? 'text-neon-cyan' : ''}`}>
                          {(() => {
                            const nextProject = projectsData.find(p => p.id === parseInt(id) + 1);
                            return hackerMode 
                              ? nextProject?.hackerModeTitle || nextProject?.title || 'Unknown'
                              : nextProject?.title || 'Unknown';
                          })()}
                        </p>
                      </div>
                      <ChevronRight size={20} className={hackerMode ? 'text-neon-pink' : ''} />
                    </div>
                  </motion.div>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
