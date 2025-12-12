
import React, { useEffect, useState } from 'react';
import { CATEGORIES } from '../../constants';
import { sanityService } from '../../services/sanity';
import { BlogPost } from '../../types';
import { Newspaper, Wrench, Cpu, BookOpen, TrendingUp, BrainCircuit, ArrowRight, Loader2 } from 'lucide-react';
import { Page } from '../../types';

interface TopicsProps {
  onNavigate: (page: Page, category?: string) => void;
}

const iconMap = {
  'newspaper': Newspaper,
  'wrench': Wrench,
  'cpu': Cpu,
  'book-open': BookOpen,
  'trending-up': TrendingUp,
  'brain-circuit': BrainCircuit,
};

const descriptionMap: Record<string, string> = {
  'AI News': 'Stay updated with the latest breakthroughs and industry announcements.',
  'AI Tools': 'Discover the newest applications that are reshaping productivity.',
  'Automation': 'Learn how to streamline your workflows with intelligent agents.',
  'Tutorials': 'Step-by-step guides for developers and prompt engineers.',
  'Trends': 'Deep analysis of where the artificial intelligence industry is heading.',
  'AI Thoughts': 'Philosophical dives into ethics, safety, and the human impact of AI.',
};

export const Topics: React.FC<TopicsProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await sanityService.getAllPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const getArticleCount = (categoryName: string) => {
    return posts.filter(post => 
      post.category.trim().toLowerCase() === categoryName.trim().toLowerCase()
    ).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center mb-20 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
          Explore Categories
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold text-custom-black dark:text-white tracking-tight">
          Browse by Topic
        </h1>
        <p className="text-lg text-custom-mediumGray dark:text-custom-darkTextMuted max-w-2xl font-light leading-relaxed">
          Dive deep into specific areas of Artificial Intelligence. From technical tutorials to philosophical musings, find exactly what you're looking for.
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((category) => {
          const Icon = iconMap[category.iconName];
          const count = getArticleCount(category.name);
          const description = descriptionMap[category.name] || 'Explore the latest articles in this category.';

          return (
            <button
              key={category.id}
              onClick={() => onNavigate('blog', category.name)}
              className="group flex flex-col items-start p-8 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-3xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/20 hover:-translate-y-1 text-left w-full relative overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>

              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-white/10 text-custom-black dark:text-white mb-6 group-hover:bg-custom-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300 relative z-10">
                <Icon strokeWidth={1.5} className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-medium text-custom-black dark:text-white mb-3 relative z-10">
                {category.name}
              </h3>
              
              <p className="text-custom-mediumGray dark:text-custom-darkTextMuted text-sm leading-relaxed mb-8 flex-grow relative z-10">
                {description}
              </p>

              <div className="w-full flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/10 mt-auto relative z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300">
                  {count} {count === 1 ? 'Article' : 'Articles'}
                </span>
                
                <span className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
                  View Recent Articles <ArrowRight size={16} />
                </span>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
