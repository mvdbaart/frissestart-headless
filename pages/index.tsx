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
      <section className="relative text-white py-20 md:py-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/header.jpg"
            alt="Header background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Professionele Opleidingen voor Transport en Logistiek
                </h1>
                <p className="text-xl mb-8 text-white">
                  Ontwikkel jezelf en je team met onze erkende opleidingen en cursussen. 
                  100% SOOB-subsidie mogelijk.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
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
          </div>
        </div>
        
        {/* Wave SVG at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
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
                    {/* Status badge */}
                    {course.status && (
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          course.status === 'vol' 
                            ? 'bg-red-100 text-red-800' 
                            : course.status === 'bijna_vol' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {course.status === 'vol' 
                            ? 'Vol' 
                            : course.status === 'bijna_vol' 
                              ? 'Bijna vol' 
                              : 'Beschikbaar'}
                        </span>
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
                    
                    {/* Course details */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                      {/* Date */}
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-primary mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700">{course.startDate || 'Flexibele startdatum'}</span>
                      </div>
                      
                      {/* Time */}
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-primary mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">
                          {course.tijd ? `${course.tijd}${course.duration ? ` (${course.duration})` : ''}` : course.duration || 'Flexibele tijden'}
                        </span>
                      </div>
                      
                      {/* Location */}
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-primary mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-700">{course.location || 'Diverse locaties'}</span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-primary mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-primary">{course.price || 'Op aanvraag'}</span>
                      </div>
                    </div>
                    
                    {/* SOOB Subsidy */}
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
                    
                    {/* Availability */}
                    {course.maxParticipants && course.currentParticipants !== undefined && (
                      <div className="text-xs text-gray-500 mb-4">
                        {course.maxParticipants - course.currentParticipants <= 0
                          ? "Geen plaatsen beschikbaar"
                          : course.maxParticipants - course.currentParticipants <= 3
                            ? `Nog ${course.maxParticipants - course.currentParticipants} ${course.maxParticipants - course.currentParticipants === 1 ? 'plaats' : 'plaatsen'} beschikbaar`
                            : `${course.maxParticipants - course.currentParticipants} plaatsen beschikbaar`
                        }
                      </div>
                    )}
                    
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