import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { getAllPosts, getPageBySlug, Post, Page } from '../lib/api';

interface HomeProps {
  posts: Post[];
  homePage: Page | null;
}

export default function Home({ posts, homePage }: HomeProps) {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frisse Start Opleidingen
            </h1>
            <p className="text-xl mb-8">
              Professionele opleidingen en cursussen voor persoonlijke en professionele ontwikkeling.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/opleidingen" className="btn bg-white text-primary hover:bg-gray-100">
                Bekijk Opleidingen
              </Link>
              <Link href="/contact" className="btn bg-secondary text-white hover:bg-secondary-dark">
                Neem Contact Op
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Home Page Content */}
      {homePage && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                <span dangerouslySetInnerHTML={{ __html: homePage.title.rendered }} />
              </h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: homePage.content.rendered }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Onze Opleidingen</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Course cards would go here - this is a placeholder */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 bg-gray-200 relative">
                  {/* Placeholder for course image */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Opleiding {i}</h3>
                  <p className="text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </p>
                  <Link 
                    href={`/opleidingen/opleiding-${i}`}
                    className="text-primary font-medium hover:text-primary-dark"
                  >
                    Meer informatie &rarr;
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/opleidingen" className="btn btn-primary">
              Alle Opleidingen Bekijken
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Laatste Artikelen</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog" className="btn btn-primary">
              Alle Artikelen Bekijken
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Wat Onze Studenten Zeggen</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial cards */}
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-bold">Student {i}</h3>
                    <p className="text-gray-600 text-sm">Opleiding {i}</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Klaar om te beginnen?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Neem vandaag nog contact met ons op en ontdek hoe onze opleidingen je kunnen helpen je doelen te bereiken.
          </p>
          <Link href="/contact" className="btn bg-white text-primary hover:bg-gray-100">
            Neem Contact Op
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts(1, 3); // Get the 3 most recent posts
  const homePage = await getPageBySlug('home');

  return {
    props: {
      posts,
      homePage,
    },
    revalidate: 60 * 10, // Revalidate every 10 minutes
  };
};