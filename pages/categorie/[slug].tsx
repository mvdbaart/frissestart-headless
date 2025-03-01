import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';
import Pagination from '../../components/Pagination';
import { getAllCategories, getPostsByCategory, Post, Category } from '../../lib/api';

interface CategoryPageProps {
  posts: Post[];
  category: Category | null;
  categories: Category[];
}

export default function CategoryPage({ posts, category, categories }: CategoryPageProps) {
  if (!category) {
    return (
      <Layout title="Categorie niet gevonden - Frisse Start Opleidingen">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Categorie niet gevonden</h1>
          <p className="mb-8">De categorie die je zoekt bestaat niet of is verwijderd.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={`${category.name} - Frisse Start Opleidingen`}
      description={`Artikelen in de categorie ${category.name} - Frisse Start Opleidingen`}
    >
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Categorie: {category.name}
        </h1>
        
        {/* Categories */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/categorie/${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                cat.id === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {cat.name} ({cat.count})
            </a>
          ))}
        </div>
        
        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        
        {/* No posts message */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Geen artikelen gevonden</h2>
            <p className="text-gray-600">
              Er zijn momenteel geen artikelen in deze categorie. Bekijk andere categorieën voor meer content.
            </p>
          </div>
        )}
      </div>
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
  const category = categories.find(cat => cat.slug === slug) || null;
  
  if (!category) {
    return {
      notFound: true,
    };
  }
  
  const posts = await getPostsByCategory(category.id);
  
  return {
    props: {
      posts,
      category,
      categories,
    },
    revalidate: 60 * 10, // Revalidate every 10 minutes
  };
};