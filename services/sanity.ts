import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { BlogPost, Category } from '../types';
import { ALL_POSTS } from '../constants'; // Fallback data

// --- CONFIGURATION ---
export const client = createClient({
  projectId: 'n9inbpje', 
  dataset: 'production',
  useCdn: true, // true = faster, cached data; false = fresh data
  apiVersion: '2023-10-01', 
});

// Image Builder to transform Sanity image references to URLs
const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  if (!source) return 'https://picsum.photos/800/600'; // Fallback
  return builder.image(source).url();
}

// Helper to format date
function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

// --- REAL SERVICE ---

export const sanityService = {
  // Fetch all posts
  getAllPosts: async (): Promise<BlogPost[]> => {
    try {
      // GROQ Query: Fetch posts, expand category reference, sort by date
      const query = `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        excerpt,
        publishedAt,
        mainImage,
        "category": category->title,
        readTime,
        body
      }`;
      
      const sanityPosts = await client.fetch(query);
      
      // If Sanity has no data yet, return fallback data so the site doesn't look broken
      if (!sanityPosts || sanityPosts.length === 0) {
        console.warn("Sanity returned no posts. Using fallback data.");
        return ALL_POSTS;
      }

      // Map Sanity data format to our App's BlogPost interface
      return sanityPosts.map((p: any) => ({
        id: p._id,
        title: p.title,
        excerpt: p.excerpt || '',
        category: p.category || 'Uncategorized',
        date: formatDate(p.publishedAt),
        imageUrl: urlFor(p.mainImage),
        readTime: p.readTime || '5 min read',
        content: p.body // This is typically Portable Text, handled simply here
      }));

    } catch (error) {
      console.error("Sanity Fetch Error:", error);
      return ALL_POSTS; // Fallback on error
    }
  },

  // Fetch a single post by ID
  getPostById: async (id: string): Promise<BlogPost | undefined> => {
    try {
      const query = `*[_type == "post" && _id == $id][0] {
        _id,
        title,
        excerpt,
        publishedAt,
        mainImage,
        "category": category->title,
        readTime,
        body
      }`;
      
      const p = await client.fetch(query, { id });
      
      if (!p) {
        // Fallback checks
        return ALL_POSTS.find(post => post.id === id);
      }

      return {
        id: p._id,
        title: p.title,
        excerpt: p.excerpt || '',
        category: p.category || 'Uncategorized',
        date: formatDate(p.publishedAt),
        imageUrl: urlFor(p.mainImage),
        readTime: p.readTime || '5 min read',
        content: p.body 
      };

    } catch (error) {
      console.error("Sanity Fetch Error:", error);
      return ALL_POSTS.find(post => post.id === id);
    }
  },

  // Fetch Featured Posts (Top 3)
  getFeaturedPosts: async (): Promise<BlogPost[]> => {
    try {
      // In Sanity, we can just grab the top 3 newest
      const posts = await sanityService.getAllPosts();
      return posts.slice(0, 3);
    } catch (error) {
      return ALL_POSTS.slice(0, 3);
    }
  },

  // Fetch Latest Posts (Offset by 3)
  getLatestPosts: async (): Promise<BlogPost[]> => {
    try {
      const posts = await sanityService.getAllPosts();
      return posts.slice(3, 6);
    } catch (error) {
      return ALL_POSTS.slice(3, 6);
    }
  },

  // Get Categories
  getCategories: async (): Promise<Category[]> => {
    // Currently using constants, but you could fetch *[_type == "category"]
    return import('../constants').then(m => m.CATEGORIES);
  }
};