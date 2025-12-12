
import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Home } from './components/Pages/Home';
import { Blog } from './components/Pages/Blog';
import { Topics } from './components/Pages/Topics';
import { BlogPost } from './components/Pages/BlogPost';
import { About } from './components/Pages/About';
import { Saved } from './components/Pages/Saved';
import { Privacy } from './components/Pages/Privacy';
import { Terms } from './components/Pages/Terms';
import { Footer } from './components/Layout/Footer';
import { ScrollToTopButton } from './components/UI/ScrollToTopButton';
import { CookieConsent } from './components/UI/CookieConsent';
import { Chatbot } from './components/UI/Chatbot';
import { Page } from '../types';

type ViewState = 
  | { page: Page; category?: string } 
  | { page: 'post'; postId: string };

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>({ page: 'home' });

  const handleNavigate = (page: Page, category?: string) => {
    // Always scroll to top when navigating
    window.scrollTo(0, 0);
    
    if (page === 'blog' && category) {
      setCurrentView({ page: 'blog', category });
    } else {
      setCurrentView({ page });
    }
  };

  const handlePostClick = (postId: string) => {
    setCurrentView({ page: 'post', postId });
  };

  const handleSubscribe = () => {
    // If not on home page, go to home page first
    if (currentView.page !== 'home') {
      setCurrentView({ page: 'home' });
      // Wait for route change to complete then scroll
      setTimeout(() => {
        const newsletterSection = document.getElementById('newsletter');
        if (newsletterSection) {
          newsletterSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page
      const newsletterSection = document.getElementById('newsletter');
      if (newsletterSection) {
        newsletterSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Helper to determine the generic 'currentPage' prop for the Header
  const getHeaderPage = (): Page => {
    if (currentView.page === 'post') return 'blog';
    return currentView.page;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-custom-darkBg font-sans text-custom-black dark:text-custom-darkText selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-custom-blue">
      <Header 
        currentPage={getHeaderPage()} 
        onNavigate={handleNavigate} 
        onSubscribe={handleSubscribe}
      />
      
      {/* 
        Key prop forces React to remount the container when the page changes.
        This triggers the CSS 'animate-fade-in' class on the new page, creating a smooth transition effect.
      */}
      <main key={currentView.page + (currentView.page === 'post' ? currentView.postId : '')} className="animate-fade-in">
        {currentView.page === 'home' && (
          <Home 
            onNavigate={handleNavigate} 
            onPostClick={handlePostClick}
          />
        )}
        {currentView.page === 'topics' && (
          <Topics 
            onNavigate={handleNavigate} 
          />
        )}
        {currentView.page === 'blog' && (
          <Blog 
            initialCategory={currentView.category}
            onPostClick={handlePostClick} 
          />
        )}
        {currentView.page === 'saved' && (
          <Saved 
            onPostClick={handlePostClick}
            onNavigate={handleNavigate}
          />
        )}
        {currentView.page === 'post' && (
          <BlogPost 
            postId={currentView.postId} 
            onBack={() => {
               window.scrollTo(0, 0);
               setCurrentView({ page: 'blog' });
            }} 
            onPostClick={handlePostClick}
          />
        )}
        {currentView.page === 'about' && (
          <About 
            onNavigate={handleNavigate}
          />
        )}
        {currentView.page === 'privacy' && (
          <Privacy />
        )}
        {currentView.page === 'terms' && (
          <Terms />
        )}
      </main>
      
      <ScrollToTopButton />
      <Chatbot />
      <CookieConsent />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
