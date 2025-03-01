import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { getCourses, Course } from '../lib/api';

interface HomeProps {
  featuredCourses: Course[];
}

export default function Home({ featuredCourses }: HomeProps) {
  return (
    <Layout 
      title="Frisse Start Opleidingen - Professionele Opleidingen voor Transport en Logistiek"
      description="Frisse Start biedt professionele opleidingen en cursussen voor de transport- en logistieksector. Ontdek ons aanbod en start vandaag nog met jouw ontwikkeling."
    >
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Professionele Opleidingen voor Transport en Logistiek
                </h1>
                <p className="text-xl mb-8">
                  Ontwikkel jezelf en je team met onze erkende opleidingen en cursussen. 
                  100% SOOB-subsidie mogelijk.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/opleidingen" 
                    className="btn bg-white text-primary hover:bg-gray-100"
                  >
                    Bekijk Opleidingen
                  </Link>
                  <Link 
                    href="/contact" 
                    className="btn bg-secondary text-white hover:bg-secondary-dark"
                  >
                    Neem Contact Op
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white p-2 rounded-lg shadow-xl">
                  <img 
                    src="https://opleidingen.frissestart.nl/wp-content/uploads/2023/04/hero-image.jpg" 
                    alt="Transport en Logistiek Opleidingen" 
                    className="rounded w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-secondary text-white p-4 rounded-lg shadow-lg">
                  <p className="font-bold">100% SOOB Garantie</p>
                  <p className="text-sm">Voor erkende opleidingen</p>
                </div>
              </motion.div>
            </div>
          </div>
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

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-text-dark">Waarom Kiezen voor Frisse Start?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wij bieden hoogwaardige opleidingen met persoonlijke begeleiding en praktijkgerichte aanpak.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "100% SOOB Garantie",
                description: "Wij garanderen 100% SOOB-subsidie voor al onze erkende opleidingen in de transport en logistiek."
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Geen Wachttijden",
                description: "Direct starten met je opleiding zonder lange wachttijden. Flexibele planning mogelijk."
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Professionele Ondersteuning",
                description: "Onze ervaren docenten bieden persoonlijke begeleiding tijdens je hele opleidingstraject."
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ),
                title: "Direct Geregeld",
                description: "Wij regelen alles voor je, van inschrijving tot subsidieaanvraag. Geen administratieve rompslomp."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-text-dark">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      {featuredCourses && featuredCourses.length > 0 ? (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-text-dark">Populaire Opleidingen</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ontdek onze meest gevraagde opleidingen en cursussen voor de transport- en logistieksector.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  <div className="h-48 bg-gray-200 relative">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-48 bg-primary-light flex items-center justify-center">
                        <span className="text-white text-lg font-medium">Frisse Start</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="mb-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-light text-white">
                        {course.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-text-dark">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                      {typeof course.description === 'string' 
                        ? course.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 120) + "..." 
                        : ''}
                    </p>
                    
                    <div className="mt-auto">
                      <Link 
                        href={`/opleidingen/${course.slug}`}
                        className="block w-full bg-primary text-white text-center py-2 rounded-md hover:bg-primary-dark transition-colors"
                      >
                        Meer Informatie
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link 
                href="/opleidingen"
                className="btn bg-secondary text-white hover:bg-secondary-dark"
              >
                Bekijk Alle Opleidingen
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-text-dark">Onze Opleidingen</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ontdek ons uitgebreide aanbod van professionele opleidingen en cursussen voor de transport- en logistieksector.
              </p>
            </div>
            
            <div className="text-center">
              <Link 
                href="/opleidingen"
                className="btn bg-secondary text-white hover:bg-secondary-dark"
              >
                Bekijk Alle Opleidingen
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-text-dark">Wat Onze Cursisten Zeggen</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lees de ervaringen van cursisten die een opleiding bij Frisse Start hebben gevolgd.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "De opleiding Code 95 bij Frisse Start was zeer praktijkgericht en de docenten waren erg behulpzaam. Ik heb veel geleerd en kon het direct toepassen in mijn werk.",
                author: "Jan Jansen",
                role: "Vrachtwagenchauffeur",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote: "Dankzij de VCA-cursus van Frisse Start heb ik mijn certificaat behaald en kon ik direct aan de slag in mijn nieuwe functie. De begeleiding was top!",
                author: "Petra de Vries",
                role: "Logistiek Medewerker",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                quote: "Als transportbedrijf sturen wij al onze chauffeurs naar Frisse Start voor hun opleidingen. De flexibiliteit en kwaliteit van de cursussen is uitstekend.",
                author: "Robert Bakker",
                role: "Transportmanager",
                image: "https://randomuser.me/api/portraits/men/46.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Klaar om te starten met jouw opleiding?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Neem vandaag nog contact met ons op voor meer informatie over onze opleidingen of voor een persoonlijk adviesgesprek.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/opleidingen" className="btn bg-white text-secondary hover:bg-gray-100">
              Bekijk Opleidingen
            </Link>
            <Link href="/contact" className="btn bg-primary text-white hover:bg-primary-dark">
              Neem Contact Op
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const allCourses = await getCourses();
    
    // Get up to 6 featured courses
    const featuredCourses = allCourses && allCourses.length > 0
      ? allCourses
          .filter(course => course.status !== 'vol')
          .slice(0, 6)
      : [];
    
    return {
      props: {
        featuredCourses,
      },
      revalidate: 60 * 5, // Revalidate every 5 minutes
    };
  } catch (error) {
    console.error('Error fetching courses for homepage:', error);
    return {
      props: {
        featuredCourses: [],
      },
      revalidate: 60 * 5, // Revalidate every 5 minutes
    };
  }
};