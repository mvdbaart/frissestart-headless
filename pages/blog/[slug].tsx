import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import Layout from '../../components/Layout';
import { getAllPosts, getPostBySlug, Post } from '../../lib/api';

interface PostPageProps {
  post: Post;
  relatedPosts: Post[];
}

export default function PostPage({ post, relatedPosts }: PostPageProps) {
  if (!post) {
    return (
      <Layout title="Artikel niet gevonden - Frisse Start Opleidingen">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Artikel niet gevonden</h1>
          <p className="mb-8">Het artikel dat je zoekt bestaat niet of is verwijderd.</p>
          <Link href="/blog" className="btn btn-primary">
            Terug naar Blog
          </Link>
        </div>
      </Layout>
    );
  }

  // Get the featured image if available
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
  
  // Format the date
  const formattedDate = format(new Date(post.date), 'd MMMM yyyy', { locale: nl });
  
  // Get categories if available
  const categories = post._embedded?.['wp:term']?.[0] || [];

  return (
    <Layout 
      title={`${post.title.rendered} - Frisse Start Opleidingen`}
      description={post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160)}
    >
      <article className="container mx-auto px-4 py-12">
        {/* Post Header */}
        <header className="max-w-4xl mx-auto mb-8">
          {categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link 
                  key={category.id} 
                  href={`/categorie/${category.slug}`}
                  className="text-sm font-medium bg-primary-light text-white px-3 py-1 rounded-full"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-dark">
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </h1>
          
          <div className="text-gray-600 mb-6">
            Gepubliceerd op {formattedDate}
          </div>
        </header>
        
        {/* Featured Image */}
        {featuredImage && (
          <div className="max-w-4xl mx-auto mb-8 relative aspect-video">
            <Image
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || post.title.rendered}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}
        
        {/* Post Content */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
        
        {/* Post Footer */}
        <footer className="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-between items-center">
            <Link href="/blog" className="text-primary hover:text-primary-dark mb-4 md:mb-0">
              &larr; Terug naar alle artikelen
            </Link>
            
            <div className="flex space-x-4">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                </svg>
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title.rendered)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                </svg>
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(post.title.rendered)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </article>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-text-dark">Gerelateerde Artikelen</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => {
                // Get the featured image if available
                const relatedFeaturedImage = relatedPost._embedded?.['wp:featuredmedia']?.[0];
                
                return (
                  <div key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {relatedFeaturedImage ? (
                      <div className="h-48 relative">
                        <Image
                          src={relatedFeaturedImage.source_url}
                          alt={relatedFeaturedImage.alt_text || relatedPost.title.rendered}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-primary-light flex items-center justify-center">
                        <span className="text-white text-lg font-medium">Frisse Start</span>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-text-dark">
                        <span dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }} />
                      </h3>
                      <div 
                        className="text-gray-600 mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: relatedPost.excerpt.rendered }}
                      />
                      <Link 
                        href={`/blog/${relatedPost.slug}`}
                        className="text-primary font-medium hover:text-primary-dark"
                      >
                        Lees meer &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      
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

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts(1, 100); // Get up to 100 posts for pre-rendering
  
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  
  return {
    paths,
    fallback: 'blocking', // Show a loading state for paths not generated at build time
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      notFound: true,
    };
  }
  
  // Get related posts (posts in the same category)
  let relatedPosts: Post[] = [];
  
  if (post._embedded?.['wp:term']?.[0]?.length > 0) {
    const categoryId = post._embedded['wp:term'][0][0].id;
    const allPosts = await getAllPosts(1, 10);
    
    // Filter out the current post and get posts from the same category
    relatedPosts = allPosts
      .filter(p => p.id !== post.id)
      .filter(p => p._embedded?.['wp:term']?.[0]?.some(term => term.id === categoryId))
      .slice(0, 3); // Limit to 3 related posts
  }
  
  return {
    props: {
      post,
      relatedPosts,
    },
    revalidate: 60 * 10, // Revalidate every 10 minutes
  };
};