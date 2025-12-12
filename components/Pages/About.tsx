
import React from 'react';
import { Button } from '../UI/Button';
import { Twitter, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Page } from '../../types';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-fade-in">
      {/* Intro Section */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center mb-24">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-custom-black dark:text-white text-xs font-semibold uppercase tracking-wider mb-6">
            About the Author
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-custom-black dark:text-white tracking-tight leading-tight mb-6">
            Hi, I'm <br/>
            <span className="text-blue-600 dark:text-blue-400">Mahshid Sadri.</span>
          </h1>
          
          <div className="flex items-center justify-center md:justify-start gap-2 text-custom-mediumGray dark:text-custom-darkTextMuted mb-6">
            <MapPin size={18} />
            <span>Netherlands</span>
          </div>

          <p className="text-lg text-custom-mediumGray dark:text-custom-darkTextMuted leading-relaxed mb-8">
            I am an Automation Expert and AI enthusiast. Neural Insight is my digital garden—a place where I breakdown complex AI concepts and automation workflows into 
            clear, human-centric narratives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
            <Button onClick={() => onNavigate('blog')}>Read my writing</Button>
            <div className="flex gap-2 items-center px-4">
              <a 
                href="https://x.com/MahshidSadri50" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-custom-mediumGray hover:text-custom-black dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://github.com/mahshid-sadri" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-custom-mediumGray hover:text-custom-black dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/mahshid-sadri-6b551335a?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-custom-mediumGray hover:text-custom-black dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 max-w-[320px] aspect-[3/4] relative group">
          <div className="absolute inset-0 bg-gray-200 dark:bg-white/5 rounded-[2rem] transform rotate-3 transition-transform duration-500 group-hover:rotate-6"></div>
          <img 
            src="https://picsum.photos/seed/mahshid/400/500" 
            alt="Mahshid Sadri" 
            className="relative w-full h-full object-cover rounded-[2rem] shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>

      {/* Mission / Philosophy */}
      <div className="border-t border-gray-100 dark:border-white/10 pt-20 mb-20">
        <h2 className="text-3xl font-bold text-custom-black dark:text-white mb-12 text-center">Guiding Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Efficiency & Automation', desc: 'I believe in streamlining workflows to save time and reduce error. Automation isn’t just about speed; it’s about freedom.' },
            { title: 'Ethical AI', desc: 'Technology does not exist in a vacuum. We must always question the societal impact of our tools and use them responsibly.' },
            { title: 'Continuous Learning', desc: 'The field moves fast. This blog is a documentation of my own learning journey in real-time.' }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-xl font-semibold text-custom-black dark:text-white mb-4">{item.title}</h3>
              <p className="text-custom-mediumGray dark:text-custom-darkTextMuted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Simple */}
      <div className="bg-custom-black dark:bg-white/5 rounded-3xl p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Let's Connect</h2>
          <p className="text-gray-400 max-w-md">
            Have a project in mind or just want to chat about Automation? Drop me a line.
          </p>
        </div>
        <div className="relative z-10">
          <a 
            href="mailto:mahshidsadri50@gmail.com?subject=Inquiry%20from%20Neural%20Insight" 
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            <Mail size={18} />
            Get in touch
          </a>
        </div>
        
        {/* Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
};
