import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../../components/Layout';
import PostCard from '../../../components/PostCard';
import Pagination from '../../../components/Pagination';
import { getAllPosts, getAllCategories, Post, Category } from '../../../lib/api';

interface BlogPageProps {
  posts: Post[];
  categories: Category[];
  totalPages: number;
  currentPage: number;
}

export default function BlogPaginatedPage({ posts, categories, totalPages, currentPage }: BlogPageProps) {
  return (
    <Layout title={`Blog - Pagina ${currentPage} - Frisse Start Opleidingen`} description={`Artikelen en nieuws van Frisse Start Opleidingen - Pagina ${currentPage}`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        
        {/* Categories */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/categorie/${category.slug}`}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors"
            >
              {category.name} ({category.count})
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
              Er zijn momenteel geen artikelen beschikbaar. Kom later terug voor nieuwe content.
            </p>
          </div>
        )}
        
        {/* Pagination */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          basePath="/blog" 
        />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // For simplicity, we'll pre-render only the first 5 pages
  const paths = Array.from({ length: 5 }, (_, i) => ({
    params: { page: String(i + 1) },
  }));
  
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = Number(params?.page) || 1;
  const postsPerPage = 9;
  
  const posts = await getAllPosts(page, postsPerPage);
  const categories = await getAllCategories();
  
  // Get total number of posts to calculate pagination
  // This is a simplification - in a real app, you'd get this from the WordPress API
  const totalPages = 10; // Placeholder value
  
  // If page is out of range, return 404
  if (page > totalPages) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      posts,
      categories,
      totalPages,
      currentPage: page,
    },
    revalidate: 60 * 10, // Revalidate every 10 minutes
  };
};