
import { BlogPost, Category } from './types';

// Source of Truth: All posts in one place
const RAW_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Rise of Multimodal Models',
    excerpt: 'Understanding how models that process text, images, and audio simultaneously are reshaping the landscape of generative AI.',
    category: 'Trends',
    date: 'Oct 12, 2024',
    imageUrl: 'https://picsum.photos/seed/1/800/600',
    readTime: '6 min read',
    featured: true
  },
  {
    id: '2',
    title: 'Optimizing LLMs for Production',
    excerpt: 'A comprehensive guide to reducing latency and cost when deploying Large Language Models in real-world applications.',
    category: 'Tutorials',
    date: 'Oct 10, 2024',
    imageUrl: 'https://picsum.photos/seed/2/800/600',
    readTime: '8 min read',
    featured: true
  },
  {
    id: '3',
    title: 'Ethics in Autonomous Agents',
    excerpt: 'Exploring the safety frameworks necessary as AI agents become more independent and capable of executing complex tasks.',
    category: 'AI Thoughts',
    date: 'Oct 08, 2024',
    imageUrl: 'https://picsum.photos/seed/3/800/600',
    readTime: '5 min read',
    featured: true
  },
  {
    id: '4',
    title: 'Prompt Engineering 101',
    excerpt: 'Master the basics of crafting effective prompts to get the best results from ChatGPT and Claude.',
    category: 'Tutorials',
    date: 'Oct 05, 2024',
    imageUrl: 'https://picsum.photos/seed/4/800/600',
    readTime: '4 min read'
  },
  {
    id: '5',
    title: 'New Tools for October',
    excerpt: 'A roundup of the most exciting AI-powered productivity tools released this month.',
    category: 'AI Tools',
    date: 'Oct 03, 2024',
    imageUrl: 'https://picsum.photos/seed/5/800/600',
    readTime: '3 min read'
  },
  {
    id: '6',
    title: 'Automating Workflows with Zapier & AI',
    excerpt: 'How to build seamless automation pipelines that leverage AI for decision making.',
    category: 'Automation',
    date: 'Sep 28, 2024',
    imageUrl: 'https://picsum.photos/seed/6/800/600',
    readTime: '7 min read'
  },
  {
    id: '7',
    title: 'The Future of Code Generation',
    excerpt: 'Will AI replace programmers, or make them 10x more productive? Analyzing the latest benchmarks.',
    category: 'Trends',
    date: 'Sep 25, 2024',
    imageUrl: 'https://picsum.photos/seed/7/800/600',
    readTime: '5 min read'
  },
  {
    id: '8',
    title: 'Understanding Vector Databases',
    excerpt: 'Why vector databases are the memory backbone of modern AI applications.',
    category: 'Tutorials',
    date: 'Sep 22, 2024',
    imageUrl: 'https://picsum.photos/seed/8/800/600',
    readTime: '9 min read'
  },
  {
    id: '9',
    title: 'AI in Healthcare: Real World Impact',
    excerpt: 'Case studies of how diagnostic models are saving lives in rural hospitals.',
    category: 'AI News',
    date: 'Sep 20, 2024',
    imageUrl: 'https://picsum.photos/seed/9/800/600',
    readTime: '6 min read'
  },
  {
    id: '10',
    title: 'The State of AI 2024 Report',
    excerpt: 'Key takeaways from this year’s most comprehensive analysis of the artificial intelligence ecosystem.',
    category: 'AI News',
    date: 'Sep 15, 2024',
    imageUrl: 'https://picsum.photos/seed/10/800/600',
    readTime: '12 min read'
  },
  {
    id: '11',
    title: 'Building Your Own Chatbot',
    excerpt: 'A beginner-friendly tutorial on creating a custom chatbot using open-source models.',
    category: 'Tutorials',
    date: 'Sep 10, 2024',
    imageUrl: 'https://picsum.photos/seed/11/800/600',
    readTime: '10 min read'
  }
];

// Sort all posts by date (newest first)
// This ensures that whenever you add a post to RAW_POSTS, it automatically flows to the top.
export const ALL_POSTS = RAW_POSTS.sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

// Featured Posts: The top 3 newest posts.
// This section automatically updates when new posts are added.
export const FEATURED_POSTS = ALL_POSTS.slice(0, 3);

// Latest Posts: The next 3 posts (Indices 3, 4, 5).
// This ensures no duplication with Featured, and shows a single row of 3 recent content items on the home page.
export const LATEST_POSTS = ALL_POSTS.slice(3, 6);

export const CATEGORIES: Category[] = [
  { id: '1', name: 'AI News', iconName: 'newspaper' },
  { id: '2', name: 'AI Tools', iconName: 'wrench' },
  { id: '3', name: 'Automation', iconName: 'cpu' },
  { id: '4', name: 'Tutorials', iconName: 'book-open' },
  { id: '5', name: 'Trends', iconName: 'trending-up' },
  { id: '6', name: 'AI Thoughts', iconName: 'brain-circuit' },
];
