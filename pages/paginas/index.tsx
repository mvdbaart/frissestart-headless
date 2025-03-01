import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { getAllPages } from '../../lib/api';

interface Page {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
}

interface PagesProps {
  pages: Page[];
}

export default function Pages({ pages }: PagesProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false once the component is mounted
    setIsLoading(false);
  }, []);

  return (
    <Layout title="Frisse Start Opleidingen - Alle Pagina's">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-text-dark">Alle Pagina's</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Pagina's laden...</p>
            </div>
          </div>
        ) : pages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <div key={page.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-2 text-text-dark">
                  <Link href={`/page/${page.slug}`} className="hover:text-primary transition-colors">
                    {page.title.rendered}
                  </Link>
                </h2>
                <div 
                  className="text-gray-600 mb-4"
                  dangerouslySetInnerHTML={{ __html: page.excerpt.rendered }}
                />
                <Link href={`/page/${page.slug}`} className="text-primary hover:underline font-medium">
                  Lees meer
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md">
            <p>Geen pagina's gevonden.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pages = await getAllPages();
  
  return {
    props: {
      pages,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};