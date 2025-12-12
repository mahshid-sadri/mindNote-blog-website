
import React from 'react';
import { BlogCard } from '../UI/BlogCard';
import { BlogPost } from '../../types';

interface FeaturedArticlesProps {
  posts: BlogPost[];
  loading: boolean;
  onPostClick?: (postId: string) => void;
}

export const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ posts, loading, onPostClick }) => {
  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 3);

  // Skeleton Loading State
  if (loading) {
    return (
      <section id="editorial" className="py-24 bg-white dark:bg-custom-darkBg transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="h-10 w-48 bg-gray-200 dark:bg-white/5 rounded-lg animate-pulse mb-4"></div>
            <div className="h-6 w-96 bg-gray-200 dark:bg-white/5 rounded-lg animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="aspect-[16/9] bg-gray-200 dark:bg-white/5 rounded-2xl animate-pulse mb-6"></div>
              <div className="h-8 w-3/4 bg-gray-200 dark:bg-white/5 rounded-lg animate-pulse mb-4"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-white/5 rounded-lg animate-pulse"></div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-10">
              {[1, 2].map(i => (
                <div key={i} className="flex flex-col h-full">
                  <div className="aspect-[16/9] bg-gray-200 dark:bg-white/5 rounded-2xl animate-pulse mb-4"></div>
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-white/5 rounded-lg animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!mainPost) {
    return null; // Handle empty state if needed
  }

  return (
    <section id="editorial" className="py-24 bg-white dark:bg-custom-darkBg transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-semibold text-custom-black dark:text-white tracking-tight mb-4">
              Editor's Choice
            </h2>
            <p className="text-custom-mediumGray dark:text-custom-darkTextMuted font-light text-lg">
              Stories that shape our understanding of tomorrow.
            </p>
          </div>
          <div className="hidden md:block h-px flex-grow bg-custom-border dark:bg-custom-borderDark ml-12 mb-2"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Featured Post - Left Side */}
          <div className="lg:col-span-7">
            <BlogCard post={mainPost} featured onClick={onPostClick} />
          </div>

          {/* Secondary Posts - Right Side (Stacked) */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {sidePosts.map((post) => (
              <BlogCard key={post.id} post={post} onClick={onPostClick} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
