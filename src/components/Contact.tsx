
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      // Show success toast
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon!",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      setIsSubmitting(false);
      
      // Play sound effect
      const audio = new Audio('https://www.soundjay.com/buttons/button-09.mp3');
      audio.play().catch(e => console.log('Audio play failed:', e));
    }, 1500);
  };
  
  // Social media links
  const socialLinks = [
    { icon: <Github size={24} />, url: 'https://github.com', label: 'GitHub' },
    { icon: <Linkedin size={24} />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Twitter size={24} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Mail size={24} />, url: 'mailto:example@example.com', label: 'Email' }
  ];

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto">
        <motion.h2 
          className="manga-title text-center mb-16 text-manga-blue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          CONNECT WITH ME
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="panel p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="panel-title text-manga-red mb-6">
              SEND A MESSAGE
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-manga mb-2">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border-4 border-manga-black focus:outline-none focus:ring-2 focus:ring-manga-red"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block font-manga mb-2">
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border-4 border-manga-black focus:outline-none focus:ring-2 focus:ring-manga-red"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block font-manga mb-2">
                  YOUR MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 border-4 border-manga-black focus:outline-none focus:ring-2 focus:ring-manga-red"
                />
              </div>
              
              <button 
                type="submit" 
                className="manga-button bg-manga-red text-white flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                <Send size={20} />
              </button>
            </form>
          </motion.div>
          
          {/* Contact Info & Social Links */}
          <motion.div 
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="panel p-8">
              <h3 className="panel-title text-manga-yellow mb-6">
                LET'S CONNECT
              </h3>
              
              <div className="speech-bubble mb-8">
                <p className="font-manga text-lg">
                  Looking to collaborate on a project or just want to say hi? I'd love to hear from you!
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="manga-button flex flex-col items-center px-4 py-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                    <span className="mt-2 text-sm">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="panel p-8">
              <h3 className="panel-title text-manga-blue mb-6">
                AVAILABILITY
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <div>
                    <p className="font-manga">FREELANCE</p>
                    <p>Available for new projects</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <div>
                    <p className="font-manga">RESPONSE TIME</p>
                    <p>Usually within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="font-manga">LOCATION</p>
                    <p>Available for remote work worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
