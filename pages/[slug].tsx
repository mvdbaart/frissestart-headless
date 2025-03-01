import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Layout from '../components/Layout';
import { getAllPages, getPageBySlug, Page } from '../lib/api';

interface PageProps {
  page: Page;
}

export default function GenericPage({ page }: PageProps) {
  if (!page) {
    return (
      <Layout title="Pagina niet gevonden - Frisse Start Opleidingen">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Pagina niet gevonden</h1>
          <p className="mb-8">De pagina die je zoekt bestaat niet of is verwijderd.</p>
        </div>
      </Layout>
    );
  }

  // Get the featured image if available
  const featuredImage = page._embedded?.['wp:featuredmedia']?.[0];

  return (
    <Layout 
      title={`${page.title.rendered} - Frisse Start Opleidingen`}
      description={page.content.rendered.replace(/<[^>]*>/g, '').slice(0, 160)}
    >
      <article className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <header className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
          </h1>
        </header>
        
        {/* Featured Image */}
        {featuredImage && (
          <div className="max-w-4xl mx-auto mb-8 relative aspect-video">
            <Image
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || page.title.rendered}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}
        
        {/* Page Content */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getAllPages();
  
  // Filter out the home page if it exists
  const filteredPages = pages.filter(page => page.slug !== 'home');
  
  const paths = filteredPages.map((page) => ({
    params: { slug: page.slug },
  }));
  
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const page = await getPageBySlug(slug);
  
  if (!page) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      page,
    },
    revalidate: 60 * 10, // Revalidate every 10 minutes
  };
};