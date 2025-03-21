
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Play, X } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  // Sample project data
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with payment integration.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format',
      details: 'Built with React, Node.js, and Stripe integration. Features include product search, filtering, user authentication, and order management.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      links: {
        live: 'https://example.com',
        code: 'https://github.com'
      }
    },
    {
      id: 2,
      title: '3D Portfolio Experience',
      description: 'An interactive 3D portfolio using WebGL and Three.js.',
      image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1470&auto=format',
      details: 'Interactive 3D environment that showcases projects in a virtual space. Users can navigate through different rooms representing various skills and projects.',
      technologies: ['Three.js', 'WebGL', 'GSAP', 'React'],
      links: {
        live: 'https://example.com',
        code: 'https://github.com'
      }
    },
    {
      id: 3,
      title: 'AI-Powered Chat App',
      description: 'A messaging platform with AI-powered response suggestions.',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1506&auto=format',
      details: 'Real-time chat application that uses AI to suggest responses and analyze sentiment. Features include group chats, file sharing, and message translation.',
      technologies: ['React', 'Firebase', 'TensorFlow.js', 'WebSockets'],
      links: {
        live: 'https://example.com',
        code: 'https://github.com'
      }
    },
    {
      id: 4,
      title: 'Design System Library',
      description: 'A comprehensive component library for rapid development.',
      image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1374&auto=format',
      details: 'A fully documented design system with 50+ components, theming support, and accessibility features. Used by multiple teams for consistent UI development.',
      technologies: ['React', 'Storybook', 'TypeScript', 'SCSS'],
      links: {
        live: 'https://example.com',
        code: 'https://github.com'
      }
    }
  ];
  
  // Open project detail view
  const openProject = (id: number) => {
    setSelectedProject(id);
    // Add page turn sound effect
    const audio = new Audio('https://www.soundjay.com/page-flip-sounds/page-flip-01a.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };
  
  // Close project detail view
  const closeProject = () => {
    setSelectedProject(null);
    // Add page turn sound effect
    const audio = new Audio('https://www.soundjay.com/page-flip-sounds/page-flip-02a.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };
  
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto">
        <motion.h2 
          className="manga-title text-center mb-16 text-manga-red"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ADVENTURES & BATTLES
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="manga-card overflow-hidden cursor-pointer h-96"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openProject(project.id)}
            >
              <div className="relative h-full">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-manga-black/80 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="panel-title text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="bg-manga-yellow text-manga-black px-2 py-1 rounded-full text-sm font-bold">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-manga-yellow text-manga-black px-2 py-1 rounded-full text-sm font-bold">
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
      
      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div 
            className="fixed inset-0 bg-manga-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
          >
            <motion.div 
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto manga-card"
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
                      className="absolute top-4 right-4 z-10 manga-button p-2"
                      onClick={closeProject}
                    >
                      <X size={24} />
                    </button>
                    
                    <div className="h-64 relative">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-manga-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="panel-title text-white mb-2">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="panel p-4 mb-6">
                        <h4 className="font-manga text-xl mb-2">PROJECT DETAILS</h4>
                        <p>{project.details}</p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-manga text-xl mb-2">TECHNOLOGIES</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="bg-manga-yellow text-manga-black px-3 py-1 rounded-full text-sm font-bold">
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
                          className="manga-button flex items-center gap-2"
                        >
                          <Play size={20} />
                          <span>Live Demo</span>
                        </a>
                        <a 
                          href={project.links.code} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="manga-button flex items-center gap-2"
                        >
                          <Code size={20} />
                          <span>View Code</span>
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
