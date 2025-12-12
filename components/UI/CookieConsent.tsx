import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Button } from './Button';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Delay showing it slightly for a smoother experience
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
     localStorage.setItem('cookieConsent', 'false');
     setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:max-w-md z-50 animate-fade-in-up">
      <div className="bg-white/90 dark:bg-custom-darkCard/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-white/10 flex flex-col gap-4 transform transition-all hover:scale-[1.02] duration-300">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
               <Cookie size={20} />
            </div>
            <h3 className="font-semibold text-custom-black dark:text-white">We value your privacy</h3>
          </div>
          <button 
            onClick={handleDecline} 
            className="text-gray-400 hover:text-custom-black dark:hover:text-white transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>
        
        <p className="text-sm text-custom-mediumGray dark:text-custom-darkTextMuted leading-relaxed">
          We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
        </p>
        
        <div className="flex gap-3 mt-2">
          <Button onClick={handleAccept} className="!py-2.5 !px-6 text-sm flex-1 shadow-lg shadow-blue-500/20">
            Accept
          </Button>
          <Button variant="outline" onClick={handleDecline} className="!py-2.5 !px-6 text-sm flex-1">
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};