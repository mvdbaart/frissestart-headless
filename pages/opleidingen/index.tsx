import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="nl">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#FF8C00" /> {/* Using the orange color from the logo */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}{
  "name": "Frisse Start Opleidingen",
  "short_name": "Frisse Start",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import { getUpcomingCourses, Course } from '../../lib/api';
import { useState } from 'react';

interface OpleidingenProps {
  courses: Course[];
}

export default function Opleidingen({ courses }: OpleidingenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Get unique categories
  const categories = [...new Set(courses.map(course => course.category))];
  
  // Filter courses based on search term and selected category
  const filteredCourses = courses.filter(course => {
    // Check if title and description are strings before using toLowerCase
    const titleStr = typeof course.title === 'string' ? course.title : '';
    const descriptionStr = typeof course.description === 'string' ? course.description : '';
    
    const matchesSearch = searchTerm === '' || 
                          titleStr.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          descriptionStr.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Function to get status badge
  const getStatusBadge = (course: Course) => {
    if (!course.status) return null;
    
    switch(course.status) {
      case 'vol':
        return (
          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            Vol
          </span>
        );
      case 'bijna_vol':
        return (
          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
            Bijna vol
          </span>
        );
      case 'open':
        return (
          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Beschikbaar
          </span>
        );
      default:
        return null;
    }
  };

  // Function to get availability text
  const getAvailabilityText = (course: Course) => {
    if (course.maxParticipants && course.currentParticipants !== undefined) {
      const available = course.maxParticipants - course.currentParticipants;
      if (available <= 0) {
        return "Geen plaatsen beschikbaar";
      } else if (available <= 3) {
        return `Nog ${available} ${available === 1 ? 'plaats' : 'plaatsen'} beschikbaar`;
      } else {
        return `${available} plaatsen beschikbaar`;
      }
    }
    return "";
  };

  return (
    <Layout 
      title="Aankomende Opleidingen - Frisse Start Opleidingen"
      description="Bekijk ons aanbod van aankomende professionele opleidingen en cursussen voor persoonlijke en professionele ontwikkeling."
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
              Aankomende Opleidingen
            </h1>
            <p className="text-xl mb-8">
              Ontdek ons uitgebreide aanbod van professionele opleidingen en cursussen voor persoonlijke en professionele ontwikkeling.
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

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-4 py-2 rounded-full font-medium ${
                  selectedCategory === '' ? 'bg-primary text-white' : 'bg-white text-text-dark hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory('')}
              >
                Alle Opleidingen
              </button>
              {categories.map((category, index) => (
                <button 
                  key={index}
                  className={`px-4 py-2 rounded-full font-medium ${
                    selectedCategory === category ? 'bg-primary text-white' : 'bg-white text-text-dark hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative mt-4 md:mt-0">
              <input 
                type="text" 
                placeholder="Zoek opleidingen..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full md:w-auto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-text-dark">Aankomende Opleidingen</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                <div className="h-48 bg-gray-200 relative">
                  {course.image ? (
                    <Image
                      src={course.image}
                      alt={typeof course.title === 'string' ? course.title : 'Opleiding'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-48 bg-primary-light flex items-center justify-center">
                      <span className="text-white text-lg font-medium">{typeof course.title === 'string' ? course.title : 'Opleiding'}</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(course)}
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-light text-white">
                      {course.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-text-dark">
                    {typeof course.title === 'string' ? course.title : ''}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {typeof course.description === 'string' ? course.description : ''}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-primary mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">
                        {course.tijd ? `${course.tijd}${course.duration ? ` (${course.duration})` : ''}` : course.duration}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-primary mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">{course.startDate}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-primary mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-700">{course.location}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-primary mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium text-primary">{course.price}</span>
                    </div>
                  </div>
                  
                  {course.soobSubsidie && (
                    <div className="mb-4 bg-green-50 border border-green-200 rounded-md p-2 text-sm">
                      <div className="flex items-center text-green-800">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">SOOB subsidie: {course.soobSubsidie}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 mb-4">
                    {getAvailabilityText(course)}
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <Link 
                      href={`/opleidingen/${course.slug}`}
                      className="text-primary hover:text-primary-dark font-medium"
                    >
                      Meer info
                    </Link>
                    {course.status === 'vol' ? (
                      <span className="text-gray-400 cursor-not-allowed px-4 py-2 rounded-md bg-gray-100">
                        Vol
                      </span>
                    ) : (
                      <Link 
                        href={`/opleidingen/${course.slug}#inschrijven`}
                        className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary-dark transition-colors"
                      >
                        Inschrijven
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-lg">Geen opleidingen gevonden die voldoen aan je zoekcriteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('');}}
                className="mt-4 text-primary hover:text-primary-dark font-medium"
              >
                Alle filters wissen
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Niet gevonden wat je zocht?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Neem contact met ons op voor meer informatie over onze opleidingen of voor een persoonlijk adviesgesprek.
          </p>
          <Link href="/contact" className="btn bg-white text-secondary hover:bg-gray-100 px-8 py-3 rounded-md font-bold">
            Neem Contact Op
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-text-dark">Veelgestelde Vragen</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Hoe schrijf ik me in voor een opleiding?",
                answer: "Je kunt je eenvoudig inschrijven via onze website. Ga naar de pagina van de opleiding die je interesseert en klik op de knop 'Inschrijven'. Vul het formulier in en wij nemen binnen 2 werkdagen contact met je op."
              },
              {
                question: "Zijn er financieringsmogelijkheden beschikbaar?",
                answer: "Ja, voor veel van onze opleidingen zijn er financieringsmogelijkheden beschikbaar, zoals STAP-budget, studiefinanciering of betalingsregelingen. Neem contact met ons op voor meer informatie over de mogelijkheden voor jouw specifieke situatie."
              },
              {
                question: "Kan ik een opleiding combineren met mijn werk?",
                answer: "Onze opleidingen zijn zo opgezet dat ze goed te combineren zijn met een baan. We bieden flexibele lestijden, avondcursussen en online modules aan. Bespreek de mogelijkheden met onze studieadviseurs."
              },
              {
                question: "Wat is het verschil tussen een cursus en een opleiding?",
                answer: "Een cursus is meestal korter en gericht op een specifieke vaardigheid, terwijl een opleiding uitgebreider is en een breder scala aan onderwerpen behandelt. Opleidingen leiden vaak tot een erkend diploma of certificaat."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-text-dark">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const courses = await getUpcomingCourses();

  return {
    props: {
      courses,
    },
    // Revalidate every 5 minutes to ensure fresh data
    revalidate: 60 * 5,
  };
};