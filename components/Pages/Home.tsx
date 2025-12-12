
import React, { useEffect, useState } from 'react';
import { Hero } from '../Sections/Hero';
import { FeaturedArticles } from '../Sections/FeaturedArticles';
import { Categories } from '../Sections/Categories';
import { LatestPosts } from '../Sections/LatestPosts';
import { Newsletter } from '../Sections/Newsletter';
import { Page, BlogPost } from '../../types';
import { sanityService } from '../../services/sanity';

interface HomeProps {
  onNavigate: (page: Page, category?: string) => void;
  onPostClick: (postId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onPostClick }) => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featured, latest] = await Promise.all([
          sanityService.getFeaturedPosts(),
          sanityService.getLatestPosts()
        ]);
        setFeaturedPosts(featured);
        setLatestPosts(latest);
      } catch (error) {
        console.error("Failed to load home data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Hero onNavigate={onNavigate} />
      <FeaturedArticles 
        posts={featuredPosts} 
        loading={loading} 
        onPostClick={onPostClick} 
      />
      <Categories onNavigate={onNavigate} />
      <LatestPosts 
        posts={latestPosts} 
        loading={loading} 
        onNavigate={onNavigate} 
        onPostClick={onPostClick} 
      />
      <Newsletter />
    </>
  );
};
