import React from 'react';
import { Hero } from '../Sections/Hero';
import { FeaturedArticles } from '../Sections/FeaturedArticles';
import { Categories } from '../Sections/Categories';
import { LatestPosts } from '../Sections/LatestPosts';
import { Newsletter } from '../Sections/Newsletter';

interface HomeProps {
  onNavigate: (page: 'home' | 'blog' | 'topics' | 'about') => void;
  onPostClick: (postId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onPostClick }) => {
  return (
    <>
      <Hero />
      <FeaturedArticles onPostClick={onPostClick} />
      <Categories />
      <LatestPosts onNavigate={onNavigate} onPostClick={onPostClick} />
      <Newsletter />
    </>
  );
};