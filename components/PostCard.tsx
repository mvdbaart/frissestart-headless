import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
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
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 w-full">
          {featuredImage ? (
            <Image
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || post.title.rendered}
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-gray-200 h-full w-full flex items-center justify-center">
              <span className="text-gray-400">Geen afbeelding</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-6">
        {categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/categorie/${category.slug}`}
                className="text-xs font-medium bg-primary-light text-white px-2 py-1 rounded"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
        
        <h2 className="text-xl font-bold mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Link>
        </h2>
        
        <div className="text-sm text-gray-500 mb-3">
          {formattedDate}
        </div>
        
        <div 
          className="text-gray-600 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        
        <Link 
          href={`/blog/${post.slug}`}
          className="text-primary font-medium hover:text-primary-dark"
        >
          Lees meer &rarr;
        </Link>
      </div>
    </article>
  );
};

export default PostCard;