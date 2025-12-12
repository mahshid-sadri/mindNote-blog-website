
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  readTime: string;
  featured?: boolean;
  content?: string; // HTML or Portable Text content
}

export interface Category {
  id: string;
  name: string;
  iconName: 'newspaper' | 'wrench' | 'cpu' | 'book-open' | 'trending-up' | 'brain-circuit';
}

export type Page = 'home' | 'blog' | 'topics' | 'about' | 'privacy' | 'terms' | 'saved';
