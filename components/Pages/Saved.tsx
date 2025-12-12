
import React, { useEffect, useState } from 'react';
import { sanityService } from '../../services/sanity';
import { BlogCard } from '../UI/BlogCard';
import { BlogPost } from '../../types';
import { Bookmark, Loader2 } from 'lucide-react';
import { Button } from '../UI/Button';
import { Page } from '../../types';

interface SavedProps {
  onPostClick: (postId: string) => void;
  onNavigate: (page: Page) => void;
}

export const Saved: React.FC<SavedProps> = ({ onPostClick, onNavigate }) => {
  const [savedPosts, setSavedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadSavedPosts = async () => {
      try {
        const savedIds = JSON.parse(localStorage.getItem('savedPosts') || '[]');
        // In a real app, you might fetch specific IDs: client.fetch(`*[_id in $ids]`, { ids: savedIds })
        // Here we fetch all and filter
        const all = await sanityService.getAllPosts();
        const posts = all.filter(post => savedIds.includes(post.id));
        setSavedPosts(posts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadSavedPosts();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Bookmark size={14} />
          Your Library
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold text-custom-black dark:text-white tracking-tight">
          Saved Stories
        </h1>
        <p className="text-lg text-custom-mediumGray dark:text-custom-darkTextMuted max-w-2xl font-light">
          Your personal collection of articles to read at your own pace.
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
           <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      ) : savedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 min-h-[400px]">
          {savedPosts.map((post) => (
            <div key={post.id} className="animate-fade-in-up">
              <BlogCard 
                post={post} 
                onClick={onPostClick} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
          <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-300 dark:text-gray-600 mb-6">
            <Bookmark size={32} />
          </div>
          <h3 className="text-xl font-medium text-custom-black dark:text-white mb-2">No saved stories yet</h3>
          <p className="text-custom-mediumGray dark:text-custom-darkTextMuted mb-8 text-center max-w-sm">
            When you find an article you like, tap the bookmark icon to save it here for later.
          </p>
          <Button onClick={() => onNavigate('blog')}>
            Browse Articles
          </Button>
        </div>
      )}
    </div>
  );
};
