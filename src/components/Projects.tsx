
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Play, X, Zap } from 'lucide-react';

interface ProjectsProps {
  hackerMode?: boolean;
}

const Projects = ({ hackerMode = false }: ProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [battleAnimation, setBattleAnimation] = useState(false);
  
  // Sample project data
  const projects = [
    {
      id: 1,
      title: hackerMode ? 'E-Commerce System Hack' : 'E-Commerce Platform',
      description: hackerMode ? 'Secured payment gateway with encrypted transactions.' : 'A full-stack e-commerce solution with payment integration.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format',
      details: hackerMode 
        ? 'Engineered a secure transaction system with multi-layer encryption. Implemented advanced security protocols with minimal performance impact.'
        : 'Built with React, Node.js, and Stripe integration. Features include product search, filtering, user authentication, and order management.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      links: {
        live: 'https://example.com',
        code: 'https://github.com'
      }
    },
    {
      id: 2,
      title: hackerMode ? '3D Neural Interface' : '3D Portfolio Experience',
      description: hackerMode ? 'A virtual dimension built on WebGL and neural mapping.' : 'An interactive 3D portfolio using WebGL and Three.js.',
      image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1470&auto=format',
      details: hackerMode
        ? 'Created a digital environment that adapts to user behavior through machine learning algorithms. Neural mapping allows for intuitive navigation through complex data structures.'
        : 'Interactive 3D environment that showcases projects in a virtual space. Users can navigate through different rooms representing various skills and projects.',
      technologies: ['Three.js', 'WebGL', 'GSAP', 'React'],
      links: {
        live: 'https://example.com',
        code: 'https://github.com'
      }
    },
    {
      id: 3,
      title: hackerMode ? 'Neural Network Chat' : 'AI-Powered Chat App',
      description: hackerMode ? 'A neural framework with predictive communication patterns.' : 'A messaging platform with AI-powered response suggestions.',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1506&auto=format',
      details: hackerMode
        ? 'Developed a self-adapting AI system that learns from conversation patterns and predicts optimal responses. Features quantum encryption for secure communications.'
        : 'Real-time chat application that uses AI to suggest responses and analyze sentiment. Features include group chats, file sharing, and message translation.',
      technologies: ['React', 'Firebase', 'TensorFlow.js', 'WebSockets'],
      links: {
        live: 'https://example.com',
        code: 'https://github.com'
      }
    },
    {
      id: 4,
      title: hackerMode ? 'Modular UI Framework' : 'Design System Library',
      description: hackerMode ? 'A dynamic component ecosystem for rapid deployment.' : 'A comprehensive component library for rapid development.',
      image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1374&auto=format',
      details: hackerMode
        ? 'Engineered a self-generating UI framework that adapts to usage patterns and optimizes component relationships. Utilizes machine learning for predictive styling.'
        : 'A fully documented design system with 50+ components, theming support, and accessibility features. Used by multiple teams for consistent UI development.',
      technologies: ['React', 'Storybook', 'TypeScript', 'SCSS'],
      links: {
        live: 'https://example.com',
        code: 'https://github.com'
      }
    }
  ];
  
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
          className={`manga-title text-center mb-16 ${hackerMode ? 'text-neon-pink' : 'text-manga-red'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {hackerMode ? 'DIGITAL MISSIONS' : 'ADVENTURES & BATTLES'}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className={`manga-card overflow-hidden cursor-pointer h-96 ${hackerMode ? 'border-neon-cyan bg-manga-black/60' : ''}`}
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
                <div className={`absolute inset-0 bg-gradient-to-t ${hackerMode ? 'from-manga-black/90' : 'from-manga-black/80'} to-transparent p-6 flex flex-col justify-end`}>
                  <h3 className={`panel-title text-white mb-2 ${hackerMode ? 'text-neon-cyan' : ''}`}>
                    {project.title}
                  </h3>
                  <p className="text-white mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className={`${hackerMode ? 'bg-neon-green text-manga-black' : 'bg-manga-yellow text-manga-black'} px-2 py-1 rounded-full text-sm font-bold`}>
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
              </div>
            </motion.div>
          ))}
        </div>
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
                className={`absolute font-manga text-8xl ${hackerMode ? 'text-neon-cyan' : 'text-manga-red'}`}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: [0, 1.5, 0], rotate: [-20, 0, 20], opacity: [0, 1, 0] }}
                transition={{ duration: 0.8 }}
              >
                {hackerMode ? 'ACCESSING' : 'BATTLE!'}
              </motion.div>
              
              {/* Energy blasts */}
              {[...Array(20)].map((_, i) => (
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
                const project = projects.find(p => p.id === selectedProject);
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
                    
                    <div className="h-64 relative">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className={`w-full h-full object-cover ${hackerMode ? 'hue-rotate-180 opacity-70' : ''}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-manga-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className={`panel-title ${hackerMode ? 'text-neon-cyan' : 'text-white'} mb-2`}>
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className={`p-6 ${hackerMode ? 'text-white' : ''}`}>
                      <div className={`panel p-4 mb-6 ${hackerMode ? 'border-neon-green bg-manga-black/70' : ''}`}>
                        <h4 className={`font-manga text-xl mb-2 ${hackerMode ? 'text-neon-green' : ''}`}>
                          {hackerMode ? 'MISSION DETAILS' : 'PROJECT DETAILS'}
                        </h4>
                        <p>{project.details}</p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className={`font-manga text-xl mb-2 ${hackerMode ? 'text-neon-pink' : ''}`}>
                          {hackerMode ? 'TECH STACK' : 'TECHNOLOGIES'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className={`${
                              hackerMode ? 'bg-neon-green text-manga-black' : 'bg-manga-yellow text-manga-black'
                            } px-3 py-1 rounded-full text-sm font-bold`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <a 
                          href={project.links.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`manga-button flex items-center gap-2 ${
                            hackerMode ? 'bg-neon-cyan text-manga-black' : ''
                          }`}
                        >
                          {hackerMode ? <Zap size={20} /> : <Play size={20} />}
                          <span>{hackerMode ? 'Launch System' : 'Live Demo'}</span>
                        </a>
                        <a 
                          href={project.links.code} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`manga-button flex items-center gap-2 ${
                            hackerMode ? 'border-neon-pink text-neon-pink' : ''
                          }`}
                        >
                          <Code size={20} />
                          <span>{hackerMode ? 'Source Code' : 'View Code'}</span>
                        </a>
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
