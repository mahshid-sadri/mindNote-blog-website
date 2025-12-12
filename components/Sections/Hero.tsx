
import React from 'react';
import { Button } from '../UI/Button';
import { ArrowDown } from 'lucide-react';
import { Page } from '../../types';

interface HeroProps {
  onNavigate?: (page: Page) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen md:min-h-0 lg:min-h-screen flex items-center md:items-start lg:items-center justify-center pt-20 md:pt-32 md:pb-24 lg:pt-20 lg:pb-0 overflow-hidden bg-custom-lightGray dark:bg-custom-darkBg transition-colors duration-500">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-gradient-to-b from-blue-100/40 to-purple-100/40 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-[100px] animate-float opacity-60"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-gradient-to-b from-gray-200/40 to-gray-100/40 dark:from-gray-800/10 dark:to-gray-900/10 rounded-full blur-[80px] animate-float-delayed opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-custom-border dark:border-custom-borderDark mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-medium text-custom-mediumGray dark:text-custom-darkTextMuted tracking-wide uppercase">
              The AI Frontier
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-custom-black dark:text-white tracking-tight leading-[1.1] mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Intelligence, <br />
            <span className="text-custom-mediumGray dark:text-custom-darkTextMuted font-light italic">Reimagined.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-custom-mediumGray dark:text-custom-darkTextMuted leading-relaxed mb-10 max-w-2xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            We explore the intersection of humanity and algorithms. 
            Curated insights for the modern thinker.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              className="h-12 px-8"
              onClick={() => onNavigate && onNavigate('blog')}
            >
              Start Reading
            </Button>
            <Button 
              variant="ghost" 
              className="h-12 px-8"
              onClick={() => onNavigate && onNavigate('about')}
            >
              Our Mission
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce duration-[3000ms] text-custom-mediumGray dark:text-custom-darkTextMuted opacity-50 pointer-events-none md:hidden lg:block">
        <ArrowDown size={20} />
      </div>
    </section>
  );
};
