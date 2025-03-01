import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Post } from '../lib/api';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Get the featured image if available
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
  
  // Format the date
  const formattedDate = format(new Date(post.date), 'd MMMM yyyy', { locale: nl });
  
  // Get categories if available
  const categories = post._embedded?.['wp:term']?.[0] || [];

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
    >
      {/* Featured Image */}
      <div className="h-48 bg-gray-200 relative">
        {featuredImage ? (
          <Image
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-48 bg-primary-light flex items-center justify-center">
            <span className="text-white text-lg font-medium">Frisse Start</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/categorie/${category.slug}`}
                className="text-xs font-medium bg-primary-light text-white px-2 py-1 rounded-full"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-text-dark">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Link>
        </h3>
        
        {/* Date */}
        <div className="text-sm text-gray-500 mb-3">
          {formattedDate}
        </div>
        
        {/* Excerpt */}
        <div 
          className="text-gray-600 mb-4 line-clamp-3 flex-grow"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        
        {/* Read More Link */}
        <Link 
          href={`/blog/${post.slug}`}
          className="text-primary font-medium hover:text-primary-dark mt-auto inline-block"
        >
          Lees meer &rarr;
        </Link>
      </div>
    </motion.div>
  );
};

export default PostCard;