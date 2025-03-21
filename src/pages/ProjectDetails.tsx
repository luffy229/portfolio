
import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Code, ExternalLink, ChevronLeft, ChevronRight, Share2, Clock, Heart, Download, Maximize, Minimize } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { useToast } from '@/hooks/use-toast';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState(projectsData[0]);
  const [hackerMode, setHackerMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [relatedProjects, setRelatedProjects] = useState<typeof projectsData>([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Find the project based on the ID and set up related projects
  useEffect(() => {
    if (id) {
      const foundProject = projectsData.find(p => p.id === parseInt(id));
      if (foundProject) {
        setProject(foundProject);
        
        // Get related projects based on shared technologies
        const related = projectsData
          .filter(p => p.id !== foundProject.id)
          .filter(p => p.technologies.some(tech => 
            foundProject.technologies.includes(tech)
          ))
          .slice(0, 3);
          
        setRelatedProjects(related);
        
        // Reset image index when project changes
        setCurrentImageIndex(0);
      } else {
        // If project not found, redirect to projects page
        navigate('/projects');
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
  }, [id, hackerMode, navigate]);

  // Handle gallery navigation
  const nextImage = () => {
    if (!project.gallery || project.gallery.length <= 1) return;
    
    setCurrentImageIndex((prevIndex) => 
      prevIndex === project.gallery!.length - 1 ? 0 : prevIndex + 1
    );
    
    // Play sound effect
    const audio = new Audio(hackerMode
      ? 'https://www.soundjay.com/technology/sounds/electronic-1.mp3'
      : 'https://www.soundjay.com/buttons/sounds/button-09.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  const prevImage = () => {
    if (!project.gallery || project.gallery.length <= 1) return;
    
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? project.gallery!.length - 1 : prevIndex - 1
    );
    
    // Play sound effect
    const audio = new Audio(hackerMode
      ? 'https://www.soundjay.com/technology/sounds/electronic-2.mp3'
      : 'https://www.soundjay.com/buttons/sounds/button-10.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  // Toggle like
  const toggleLike = () => {
    setLiked(!liked);
    
    // Play sound and show toast
    const audio = new Audio(hackerMode
      ? 'https://www.soundjay.com/technology/sounds/electronic-3.mp3'
      : 'https://www.soundjay.com/buttons/sounds/button-11.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    toast({
      title: liked 
        ? (hackerMode ? "PROJECT UNLIKED" : "Project removed from favorites") 
        : (hackerMode ? "PROJECT LIKED" : "Project added to favorites"),
      description: liked
        ? (hackerMode ? "PROJECT REMOVED FROM FAVORITES DATABASE" : "This project has been removed from your favorites")
        : (hackerMode ? "PROJECT ADDED TO FAVORITES DATABASE" : "This project has been saved to your favorites"),
    });
  };

  // Share project
  const shareProject = () => {
    // Copy the current URL to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      // Play sound effect
      const audio = new Audio(hackerMode
        ? 'https://www.soundjay.com/technology/sounds/electronic-1.mp3'
        : 'https://www.soundjay.com/buttons/sounds/button-37.mp3');
      audio.play().catch(e => console.log('Audio play failed:', e));
      
      toast({
        title: hackerMode ? "LINK COPIED" : "Link Copied",
        description: hackerMode 
          ? "PROJECT URL COPIED TO CLIPBOARD" 
          : "Project link has been copied to your clipboard",
      });
    });
  };

  // Toggle fullscreen gallery
  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
    
    // Play sound effect
    const audio = new Audio(hackerMode
      ? 'https://www.soundjay.com/technology/sounds/electronic-5.mp3'
      : 'https://www.soundjay.com/buttons/sounds/button-14.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  // Add keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreen) {
        if (e.key === 'ArrowRight') nextImage();
        else if (e.key === 'ArrowLeft') prevImage();
        else if (e.key === 'Escape') setFullscreen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreen]);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    },
    exit: { opacity: 0 }
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
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
      <motion.div 
        className="relative z-10 container mx-auto px-4 py-24"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Top navigation bar */}
        <motion.div
          className="flex justify-between items-center mb-8"
          variants={itemVariants}
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
          
          <div className="flex gap-2">
            <motion.button
              className={`manga-button p-2 ${
                liked 
                  ? (hackerMode ? 'bg-neon-pink text-manga-black' : 'bg-manga-red text-white') 
                  : (hackerMode ? 'border border-neon-pink text-neon-pink' : 'border border-manga-red text-manga-red')
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLike}
              aria-label={liked ? "Unlike" : "Like"}
            >
              <Heart size={20} className={liked ? "fill-current" : ""} />
            </motion.button>
            
            <motion.button
              className={`manga-button p-2 ${
                hackerMode ? 'border border-neon-cyan text-neon-cyan' : 'border border-manga-blue text-manga-blue'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={shareProject}
              aria-label="Share"
            >
              <Share2 size={20} />
            </motion.button>
          </div>
        </motion.div>
        
        {/* Project hero section */}
        <motion.div
          className={`manga-card mb-12 overflow-hidden ${hackerMode ? 'border-neon-pink' : ''}`}
          variants={itemVariants}
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

              {/* Project timestamp badge */}
              <div className={`absolute top-8 right-8 ${
                hackerMode ? 'bg-neon-pink text-manga-black' : 'bg-manga-red text-white'
              } px-3 py-1 rounded-full flex items-center gap-2`}>
                <Clock size={16} />
                <span className="font-bold">
                  {hackerMode ? `PROJECT ID: ${project.id}` : `Project #${project.id}`}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Two-column layout for project details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <motion.div variants={itemVariants}>
            {/* Project details */}
            <div className={`manga-card p-6 mb-8 ${hackerMode ? 'border-neon-cyan bg-manga-black/60' : ''}`}>
              <h2 className={`panel-title mb-4 ${hackerMode ? 'text-neon-cyan' : 'text-manga-blue'}`}>
                {hackerMode ? 'MISSION DETAILS' : 'Project Overview'}
              </h2>
              <p className={`mb-6 ${hackerMode ? 'text-white' : ''}`}>
                {hackerMode ? project.hackerModeDetails || project.details : project.details}
              </p>
              
              <div className="flex gap-4 flex-wrap">
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
                <motion.button
                  className={`manga-button flex items-center gap-2 ${
                    hackerMode ? 'bg-neon-green text-manga-black' : 'bg-manga-yellow text-manga-black'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Download project info as JSON
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(project, null, 2));
                    const downloadAnchorNode = document.createElement('a');
                    downloadAnchorNode.setAttribute("href", dataStr);
                    downloadAnchorNode.setAttribute("download", `${project.title.replace(/\s+/g, '-').toLowerCase()}-info.json`);
                    document.body.appendChild(downloadAnchorNode);
                    downloadAnchorNode.click();
                    downloadAnchorNode.remove();
                    
                    // Play sound effect
                    const audio = new Audio(hackerMode
                      ? 'https://www.soundjay.com/technology/sounds/electronic-4.mp3'
                      : 'https://www.soundjay.com/buttons/sounds/button-21.mp3');
                    audio.play().catch(e => console.log('Audio play failed:', e));
                    
                    toast({
                      title: hackerMode ? "DATA DOWNLOADED" : "Project Info Downloaded",
                      description: hackerMode 
                        ? "PROJECT DATA SAVED TO LOCAL SYSTEM" 
                        : "Project information has been downloaded as JSON",
                    });
                  }}
                >
                  <Download size={18} />
                  <span>{hackerMode ? 'DOWNLOAD DATA' : 'Download Info'}</span>
                </motion.button>
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
          <motion.div variants={itemVariants}>
            {/* Project gallery */}
            <div 
              className={`manga-card p-6 mb-8 ${hackerMode ? 'border-neon-pink bg-manga-black/60' : ''}`}
              ref={galleryRef}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className={`panel-title ${hackerMode ? 'text-neon-pink' : 'text-manga-blue'}`}>
                  {hackerMode ? 'VISUAL DATA' : 'Project Gallery'}
                </h2>
                
                {project.gallery && project.gallery.length > 0 && (
                  <motion.button
                    className={`manga-button p-2 ${
                      hackerMode ? 'border border-neon-cyan text-neon-cyan' : 'border border-manga-blue text-manga-blue'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFullscreen}
                    aria-label={fullscreen ? "Exit fullscreen" : "View fullscreen"}
                  >
                    {fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                  </motion.button>
                )}
              </div>
              
              <div className="relative h-80 mb-4">
                {project.gallery && project.gallery.length > 0 ? (
                  <>
                    <img 
                      src={project.gallery[currentImageIndex]} 
                      alt={`${project.title} screenshot ${currentImageIndex + 1}`} 
                      className={`w-full h-full object-cover rounded-lg cursor-pointer ${hackerMode ? 'hue-rotate-180 contrast-125' : ''}`}
                      onClick={toggleFullscreen}
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
                              aria-label={`View image ${index + 1}`}
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
            
            {/* Related projects */}
            {relatedProjects.length > 0 && (
              <div className={`manga-card p-6 ${hackerMode ? 'border-neon-cyan bg-manga-black/60' : ''}`}>
                <h2 className={`panel-title mb-4 ${hackerMode ? 'text-neon-cyan' : 'text-manga-blue'}`}>
                  {hackerMode ? 'RELATED MISSIONS' : 'Related Projects'}
                </h2>
                
                <div className="space-y-4">
                  {relatedProjects.map((relatedProject) => (
                    <Link 
                      key={relatedProject.id} 
                      to={`/project/${relatedProject.id}`}
                      className="block"
                    >
                      <motion.div 
                        className={`flex bg-opacity-20 rounded-lg overflow-hidden ${
                          hackerMode ? 'hover:bg-neon-cyan/10' : 'hover:bg-gray-100'
                        } transition-colors`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-24 h-24 flex-shrink-0">
                          <img 
                            src={relatedProject.image} 
                            alt={relatedProject.title} 
                            className={`w-full h-full object-cover ${hackerMode ? 'hue-rotate-180' : ''}`}
                          />
                        </div>
                        <div className="p-3">
                          <h3 className={`font-manga text-lg ${hackerMode ? 'text-neon-pink' : 'text-manga-red'}`}>
                            {hackerMode ? relatedProject.hackerModeTitle || relatedProject.title : relatedProject.title}
                          </h3>
                          <p className={`text-sm line-clamp-1 ${hackerMode ? 'text-white/80' : 'text-gray-600'}`}>
                            {hackerMode ? relatedProject.hackerModeDescription || relatedProject.description : relatedProject.description}
                          </p>
                          <div className="flex gap-1 mt-1">
                            {relatedProject.technologies.slice(0, 2).map((tech, i) => (
                              <span key={i} className={`${
                                hackerMode ? 'bg-neon-green text-manga-black' : 'bg-manga-yellow text-manga-black'
                              } px-1.5 py-0.5 rounded-full text-xs font-bold`}>
                                {tech}
                              </span>
                            ))}
                            {relatedProject.technologies.length > 2 && (
                              <span className={`text-xs ${hackerMode ? 'text-neon-green' : 'text-gray-500'}`}>
                                +{relatedProject.technologies.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Next and previous project navigation */}
        <motion.div 
          className="mt-12 grid grid-cols-2 gap-4"
          variants={itemVariants}
        >
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
        </motion.div>
      </motion.div>
      
      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {fullscreen && project.gallery && project.gallery.length > 0 && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleFullscreen}
          >
            <motion.div
              className="relative w-full max-w-screen-xl max-h-screen flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative flex-grow flex items-center justify-center">
                <button 
                  className={`absolute top-2 right-2 z-10 manga-button p-2 ${
                    hackerMode ? 'bg-neon-cyan text-manga-black' : 'bg-white text-manga-black'
                  }`}
                  onClick={toggleFullscreen}
                >
                  <Minimize size={24} />
                </button>
                
                <button 
                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 manga-button p-2 ${
                    hackerMode ? 'bg-neon-cyan text-manga-black' : 'bg-white text-manga-black'
                  }`}
                  onClick={prevImage}
                >
                  <ChevronLeft size={24} />
                </button>
                
                <img 
                  src={project.gallery[currentImageIndex]} 
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`} 
                  className={`max-h-[85vh] max-w-full object-contain ${hackerMode ? 'hue-rotate-180 contrast-125' : ''}`}
                />
                
                <button 
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 manga-button p-2 ${
                    hackerMode ? 'bg-neon-cyan text-manga-black' : 'bg-white text-manga-black'
                  }`}
                  onClick={nextImage}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              <div className="mt-4 flex justify-center gap-2">
                {project.gallery.map((_, index) => (
                  <button
                    key={index}
                    className={`w-4 h-4 rounded-full ${
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
              
              <p className={`text-center mt-2 ${hackerMode ? 'text-neon-green' : 'text-white'}`}>
                {hackerMode 
                  ? `IMAGE ${currentImageIndex + 1} OF ${project.gallery.length}` 
                  : `Image ${currentImageIndex + 1} of ${project.gallery.length}`}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetails;
