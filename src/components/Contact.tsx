
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactProps {
  hackerMode?: boolean;
}

const Contact = ({ hackerMode = false }: ContactProps) => {
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
        title: hackerMode ? "Message encrypted and sent!" : "Message sent!",
        description: hackerMode 
          ? "Secure transmission complete. Awaiting response on encrypted channel." 
          : "Thanks for reaching out. I'll get back to you soon!",
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
      const audio = new Audio(hackerMode 
        ? 'https://www.soundjay.com/buttons/sounds/button-43.mp3'
        : 'https://www.soundjay.com/buttons/button-09.mp3');
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
    <div className={`min-h-screen py-24 px-4 ${hackerMode ? 'bg-manga-black/50' : ''}`}>
      <div className="container mx-auto">
        <motion.h2 
          className={`manga-title text-center mb-16 ${hackerMode ? 'text-neon-green' : 'text-manga-blue'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {hackerMode ? 'ESTABLISH CONNECTION' : 'CONNECT WITH ME'}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className={`panel p-8 ${hackerMode ? 'border-neon-cyan bg-manga-black/70' : ''}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className={`panel-title ${hackerMode ? 'text-neon-pink' : 'text-manga-red'} mb-6`}>
              {hackerMode ? 'TRANSMIT MESSAGE' : 'SEND A MESSAGE'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block font-manga mb-2 ${hackerMode ? 'text-neon-cyan' : ''}`}>
                  {hackerMode ? 'YOUR IDENTITY' : 'YOUR NAME'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 ${
                    hackerMode 
                      ? 'bg-manga-black/70 border-4 border-neon-cyan text-neon-green focus:ring-neon-pink' 
                      : 'border-4 border-manga-black focus:ring-manga-red'
                  } focus:outline-none focus:ring-2`}
                />
              </div>
              
              <div>
                <label htmlFor="email" className={`block font-manga mb-2 ${hackerMode ? 'text-neon-cyan' : ''}`}>
                  {hackerMode ? 'YOUR COMM CHANNEL' : 'YOUR EMAIL'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 ${
                    hackerMode 
                      ? 'bg-manga-black/70 border-4 border-neon-cyan text-neon-green focus:ring-neon-pink' 
                      : 'border-4 border-manga-black focus:ring-manga-red'
                  } focus:outline-none focus:ring-2`}
                />
              </div>
              
              <div>
                <label htmlFor="message" className={`block font-manga mb-2 ${hackerMode ? 'text-neon-cyan' : ''}`}>
                  {hackerMode ? 'YOUR DATA PACKET' : 'YOUR MESSAGE'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full p-3 ${
                    hackerMode 
                      ? 'bg-manga-black/70 border-4 border-neon-cyan text-neon-green focus:ring-neon-pink' 
                      : 'border-4 border-manga-black focus:ring-manga-red'
                  } focus:outline-none focus:ring-2`}
                />
              </div>
              
              <button 
                type="submit" 
                className={`manga-button ${
                  hackerMode 
                    ? 'bg-neon-green text-manga-black' 
                    : 'bg-manga-red text-white'
                } flex items-center gap-2`}
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? hackerMode ? 'ENCRYPTING...' : 'SENDING...' 
                  : hackerMode ? 'TRANSMIT DATA' : 'SEND MESSAGE'}
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
            <div className={`panel p-8 ${hackerMode ? 'border-neon-pink bg-manga-black/70' : ''}`}>
              <h3 className={`panel-title ${hackerMode ? 'text-neon-pink' : 'text-manga-yellow'} mb-6`}>
                {hackerMode ? 'OPEN CHANNELS' : 'LET\'S CONNECT'}
              </h3>
              
              <div className={`speech-bubble mb-8 ${hackerMode ? 'border-neon-green bg-manga-black/70 text-neon-green' : ''}`}>
                <p className={`${hackerMode ? 'font-mono' : 'font-manga'} text-lg`}>
                  {hackerMode 
                    ? '> Secure channels available for project collaboration and communication requests.' 
                    : 'Looking to collaborate on a project or just want to say hi? I\'d love to hear from you!'}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`manga-button flex flex-col items-center px-4 py-4 ${
                      hackerMode ? 'border-neon-cyan text-neon-cyan' : ''
                    }`}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: hackerMode ? '0 0 10px rgba(0, 255, 255, 0.8)' : undefined
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                    <span className="mt-2 text-sm">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className={`panel p-8 ${hackerMode ? 'border-neon-cyan bg-manga-black/70' : ''}`}>
              <h3 className={`panel-title ${hackerMode ? 'text-neon-cyan' : 'text-manga-blue'} mb-6`}>
                {hackerMode ? 'SYSTEM STATUS' : 'AVAILABILITY'}
              </h3>
              
              <div className="space-y-4">
                <div className={`flex items-center gap-2 ${hackerMode ? 'text-white' : ''}`}>
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <div>
                    <p className={`font-manga ${hackerMode ? 'text-neon-green' : ''}`}>
                      {hackerMode ? 'CONTRACT STATUS' : 'FREELANCE'}
                    </p>
                    <p>Available for new projects</p>
                  </div>
                </div>
                
                <div className={`flex items-center gap-2 ${hackerMode ? 'text-white' : ''}`}>
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <div>
                    <p className={`font-manga ${hackerMode ? 'text-neon-yellow' : ''}`}>
                      {hackerMode ? 'RESPONSE TIME' : 'RESPONSE TIME'}
                    </p>
                    <p>Usually within 24 hours</p>
                  </div>
                </div>
                
                <div className={`flex items-center gap-2 ${hackerMode ? 'text-white' : ''}`}>
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <div>
                    <p className={`font-manga ${hackerMode ? 'text-neon-cyan' : ''}`}>
                      {hackerMode ? 'LOCATION STATUS' : 'LOCATION'}
                    </p>
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
