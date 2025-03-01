import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import Layout from '../../components/Layout';
import { getAllPosts, getPostBySlug, Post } from '../../lib/api';

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
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
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
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
          <Link href="/blog" className="text-primary hover:text-primary-dark">
            &larr; Terug naar alle artikelen
          </Link>
        </footer>
      </article>
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
  
  return {
    props: {
      post,
    },
    revalidate: 60 * 10, // Revalidate every 10 minutes
  };
};