import axios from 'axios';

const API_URL = 'https://opleidingen.frissestart.nl/wp-json/wp/v2';

// Create an axios instance for WordPress API
const wpApi = axios.create({
  baseURL: API_URL,
});

// Types
export interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  slug: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface Page {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Fetch all posts
export async function getAllPosts(page = 1, perPage = 10): Promise<Post[]> {
  try {
    const response = await wpApi.get('/posts', {
      params: {
        page,
        per_page: perPage,
        _embed: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await wpApi.get('/posts', {
      params: {
        slug,
        _embed: true,
      },
    });
    return response.data[0] || null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

// Fetch all pages
export async function getAllPages(): Promise<Page[]> {
  try {
    const response = await wpApi.get('/pages', {
      params: {
        per_page: 100,
        _embed: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

// Fetch a single page by slug
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await wpApi.get('/pages', {
      params: {
        slug,
        _embed: true,
      },
    });
    return response.data[0] || null;
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    return null;
  }
}

// Fetch all categories
export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await wpApi.get('/categories', {
      params: {
        per_page: 100,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch posts by category
export async function getPostsByCategory(categoryId: number, page = 1, perPage = 10): Promise<Post[]> {
  try {
    const response = await wpApi.get('/posts', {
      params: {
        categories: categoryId,
        page,
        per_page: perPage,
        _embed: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for category ${categoryId}:`, error);
    return [];
  }
}

// Fetch menu by location
export async function getMenuByLocation(location: string) {
  try {
    // This requires the WP REST API Menus plugin or similar
    const response = await axios.get(`https://opleidingen.frissestart.nl/wp-json/menus/v1/locations/${location}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching menu for location ${location}:`, error);
    return null;
  }
}