import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getAllPages, getPageBySlug } from '../../lib/api';

interface Page {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  modified: string;
}

interface PageProps {
  page: Page;
}

export default function PageDetail({ page }: PageProps) {
  if (!page) {
    return (
      <Layout title="Pagina niet gevonden">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-text-dark">Pagina niet gevonden</h1>
          <p>De opgevraagde pagina bestaat niet of is niet beschikbaar.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${page.title.rendered} - Frisse Start Opleidingen`}>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/" className="text-primary hover:underline font-medium">
            ← Terug naar alle pagina's
          </Link>
        </div>
        <article className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4 text-text-dark">{page.title.rendered}</h1>
          
          <div className="text-sm text-gray-500 mb-6">
            <p>Laatst bijgewerkt: {new Date(page.modified).toLocaleDateString('nl-NL')}</p>
          </div>
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </article>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getAllPages();
  
  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));
  
  return {
    paths,
    fallback: 'blocking', // Show a fallback page while the page is being generated
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
    revalidate: 60, // Revalidate every 60 seconds
  };
};