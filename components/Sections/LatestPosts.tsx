
import React from 'react';
import { BlogCard } from '../UI/BlogCard';
import { Button } from '../UI/Button';
import { Page, BlogPost } from '../../types';

interface LatestPostsProps {
  posts: BlogPost[];
  loading: boolean;
  onNavigate?: (page: Page) => void;
  onPostClick?: (postId: string) => void;
}

export const LatestPosts: React.FC<LatestPostsProps> = ({ posts, loading, onNavigate, onPostClick }) => {
  return (
    <section className="py-24 bg-white dark:bg-custom-darkBg transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-baseline mb-16">
          <h2 className="text-3xl font-semibold text-custom-black dark:text-white tracking-tight">Recent Stories</h2>
          <Button 
            variant="ghost" 
            className="hidden sm:inline-flex"
            onClick={() => onNavigate && onNavigate('blog')}
          >
            View Archive
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
             {[1, 2, 3].map(i => (
                <div key={i}>
                   <div className="aspect-[4/3] bg-gray-200 dark:bg-white/5 rounded-2xl animate-pulse mb-4"></div>
                   <div className="h-6 w-3/4 bg-gray-200 dark:bg-white/5 rounded-lg animate-pulse mb-2"></div>
                   <div className="h-4 w-1/2 bg-gray-200 dark:bg-white/5 rounded-lg animate-pulse"></div>
                </div>
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} onClick={onPostClick} />
            ))}
          </div>
        )}

        <div className="mt-20 flex justify-center sm:hidden">
           <Button 
             variant="outline" 
             fullWidth
             onClick={() => onNavigate && onNavigate('blog')}
           >
             View Archive
           </Button>
        </div>
      </div>
    </section>
  );
};
