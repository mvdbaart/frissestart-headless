import { GetStaticProps } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';
import { getAllPosts, getAllCategories, Post, Category } from '../../lib/api';
import { useState } from 'react';

interface BlogProps {
  posts: Post[];
  categories: Category[];
}

export default function Blog({ posts, categories }: BlogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Filter posts based on search term and selected category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.rendered.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || 
                           (post._embedded?.['wp:term']?.[0]?.some(term => term.slug === selectedCategory) || false);
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout 
      title="Blog - Frisse Start Opleidingen"
      description="Lees de laatste artikelen en nieuws over opleidingen, persoonlijke ontwikkeling en professionele groei."
    >
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog
            </h1>
            <p className="text-xl mb-8">
              Ontdek de laatste artikelen en inzichten over opleidingen, persoonlijke ontwikkeling en professionele groei.
            </p>
          </motion.div>
        </div>
        
        {/* Wave SVG at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-4 py-2 rounded-full font-medium ${
                  selectedCategory === '' ? 'bg-primary text-white' : 'bg-white text-text-dark hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory('')}
              >
                Alle Artikelen
              </button>
              {categories.map((category) => (
                <button 
                  key={category.id}
                  className={`px-4 py-2 rounded-full font-medium ${
                    selectedCategory === category.slug ? 'bg-primary text-white' : 'bg-white text-text-dark hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="relative mt-4 md:mt-0">
              <input 
                type="text" 
                placeholder="Zoek artikelen..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full md:w-auto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-lg">Geen artikelen gevonden die voldoen aan je zoekcriteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('');}}
                className="mt-4 text-primary hover:text-primary-dark font-medium"
              >
                Alle filters wissen
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Blijf op de hoogte</h2>
            <p className="text-xl mb-8">
              Schrijf je in voor onze nieuwsbrief en ontvang regelmatig updates over nieuwe artikelen, opleidingen en aanbiedingen.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Je e-mailadres" 
                className="flex-grow px-4 py-3 rounded-md focus:outline-none text-text-dark"
                required
              />
              <button 
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-md font-bold hover:bg-primary-dark transition-colors"
              >
                Inschrijven
              </button>
            </form>
            <p className="text-sm mt-4 text-white text-opacity-80">
              Door je in te schrijven ga je akkoord met onze <Link href="/privacy" className="underline">privacyverklaring</Link>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts(1, 12); // Get 12 most recent posts
  const categories = await getAllCategories();
  
  return {
    props: {
      posts,
      categories,
    },
    revalidate: 60 * 10, // Revalidate every 10 minutes
  };
};