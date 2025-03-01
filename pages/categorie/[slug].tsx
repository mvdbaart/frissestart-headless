import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';
import { getAllCategories, getPostsByCategory, Category, Post } from '../../lib/api';

interface CategoryPageProps {
  category: Category;
  posts: Post[];
  categories: Category[];
}

export default function CategoryPage({ category, posts, categories }: CategoryPageProps) {
  if (!category) {
    return (
      <Layout title="Categorie niet gevonden - Frisse Start Opleidingen">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Categorie niet gevonden</h1>
          <p className="mb-8">De categorie die je zoekt bestaat niet of is verwijderd.</p>
          <Link href="/blog" className="btn btn-primary">
            Terug naar Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={`${category.name} - Frisse Start Opleidingen`}
      description={`Artikelen in de categorie ${category.name}. Ontdek meer over dit onderwerp op de blog van Frisse Start Opleidingen.`}
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
              {category.name}
            </h1>
            <p className="text-xl mb-8">
              Artikelen in de categorie {category.name}
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

      {/* Categories Navigation */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            <Link 
              href="/blog"
              className="px-4 py-2 rounded-full font-medium bg-white text-text-dark hover:bg-gray-100"
            >
              Alle Artikelen
            </Link>
            {categories.map((cat) => (
              <Link 
                key={cat.id}
                href={`/categorie/${cat.slug}`}
                className={`px-4 py-2 rounded-full font-medium ${
                  cat.id === category.id ? 'bg-primary text-white' : 'bg-white text-text-dark hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-lg">Geen artikelen gevonden in deze categorie.</p>
              <Link 
                href="/blog"
                className="mt-4 text-primary hover:text-primary-dark font-medium inline-block"
              >
                Bekijk alle artikelen
              </Link>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getAllCategories();
  
  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));
  
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const categories = await getAllCategories();
  const category = categories.find(cat => cat.slug === slug);
  
  if (!category) {
    return {
      notFound: true,
    };
  }
  
  const posts = await getPostsByCategory(category.id, 1, 12);
  
  return {
    props: {
      category,
      posts,
      categories,
    },
    revalidate: 60 * 10, // Revalidate every 10 minutes
  };
};