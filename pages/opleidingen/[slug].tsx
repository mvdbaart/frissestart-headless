import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { getCourses, getCourseBySlug, Course } from '../../lib/api';

interface CourseDetailProps {
  course: Course;
}

export default function CourseDetail({ course }: CourseDetailProps) {
  const [activeTab, setActiveTab] = useState('info');

  if (!course) {
    return (
      <Layout title="Opleiding niet gevonden">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-text-dark">Opleiding niet gevonden</h1>
          <p>De opgevraagde opleiding bestaat niet of is niet beschikbaar.</p>
          <div className="mt-6">
            <Link href="/opleidingen" className="text-primary hover:underline font-medium">
              Terug naar alle opleidingen
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Function to get status badge
  const getStatusBadge = () => {
    if (!course.status) return null;
    
    switch(course.status) {
      case 'vol':
        return (
          <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            Vol
          </span>
        );
      case 'bijna_vol':
        return (
          <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
            Bijna vol
          </span>
        );
      case 'open':
        return (
          <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Beschikbaar
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Layout 
      title={`${course.title} - Frisse Start Opleidingen`}
      description={typeof course.description === 'string' ? course.description.substring(0, 160) : ''}
    >
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8 md:w-1/2">
              <Link href="/opleidingen" className="inline-flex items-center text-white opacity-80 hover:opacity-100 mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Terug naar alle opleidingen
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <div className="flex items-center mb-6">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-white bg-opacity-20 text-white mr-3">
                  {course.category}
                </span>
                {getStatusBadge()}
              </div>
              <div className="prose prose-lg text-white prose-headings:text-white prose-a:text-white max-w-none">
                {typeof course.description === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: course.description.substring(0, 300) + '...' }} />
                ) : (
                  <p>Geen beschrijving beschikbaar</p>
                )}
              </div>
            </div>
            <div className="md:w-1/2 max-w-md">
              <div className="bg-white rounded-lg shadow-lg p-6 text-text-dark">
                <h3 className="text-xl font-bold mb-4">Opleiding Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Startdatum:</span>
                    <span className="font-medium">{course.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duur:</span>
                    <span className="font-medium">{course.tijd || course.duration || 'Niet gespecificeerd'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Locatie:</span>
                    <span className="font-medium">{course.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prijs:</span>
                    <span className="font-medium text-primary">{course.price}</span>
                  </div>
                  {course.soobSubsidie && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">SOOB subsidie:</span>
                      <span className="font-medium text-green-600">{course.soobSubsidie}</span>
                    </div>
                  )}
                  {course.maxParticipants && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Beschikbare plaatsen:</span>
                      <span className="font-medium">
                        {course.maxParticipants - (course.currentParticipants || 0)} / {course.maxParticipants}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  {course.status === 'vol' ? (
                    <button 
                      className="w-full bg-gray-300 text-gray-600 py-3 rounded-md cursor-not-allowed"
                      disabled
                    >
                      Deze opleiding is vol
                    </button>
                  ) : (
                    <a 
                      href="#inschrijven"
                      className="block w-full bg-secondary text-white text-center py-3 rounded-md hover:bg-secondary-dark transition-colors"
                    >
                      Inschrijven
                    </a>
                  )}
                </div>
              </div>
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

      {/* Content Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 border-b border-gray-200">
            <div className="flex flex-wrap -mb-px">
              <button
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-lg ${
                  activeTab === 'info' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('info')}
              >
                Informatie
              </button>
              <button
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-lg ${
                  activeTab === 'programma' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('programma')}
              >
                Programma
              </button>
              <button
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-lg ${
                  activeTab === 'praktisch' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('praktisch')}
              >
                Praktische Info
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeTab === 'info' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-text-dark">Over deze opleiding</h2>
                  <div className="prose prose-lg max-w-none">
                    {typeof course.description === 'string' ? (
                      <div dangerouslySetInnerHTML={{ __html: course.description }} />
                    ) : (
                      <p>Geen beschrijving beschikbaar</p>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'programma' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-text-dark">Programma</h2>
                  <div className="prose prose-lg max-w-none">
                    <p>Het programma voor deze opleiding is momenteel niet beschikbaar. Neem contact met ons op voor meer informatie.</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'praktisch' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-text-dark">Praktische Informatie</h2>
                  <div className="prose prose-lg max-w-none">
                    <h3>Locatie</h3>
                    <p>{course.location}</p>
                    
                    <h3>Data en tijden</h3>
                    <p>Startdatum: {course.startDate}</p>
                    <p>Duur: {course.tijd || course.duration || 'Niet gespecificeerd'}</p>
                    
                    <h3>Kosten</h3>
                    <p>Prijs: {course.price}</p>
                    {course.soobSubsidie && (
                      <p>SOOB subsidie: {course.soobSubsidie}</p>
                    )}
                    
                    <h3>Voorwaarden</h3>
                    <p>Voor meer informatie over onze algemene voorwaarden, annuleringsbeleid en betalingsmogelijkheden, neem contact met ons op.</p>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-text-dark">Heb je vragen?</h3>
                <p className="mb-6">Neem contact met ons op voor meer informatie over deze opleiding of voor een persoonlijk adviesgesprek.</p>
                <Link 
                  href="/contact"
                  className="block w-full bg-primary text-white text-center py-3 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Contact Opnemen
                </Link>
              </div>
              
              {course.image && (
                <div className="mt-6 rounded-lg overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Registration Form */}
      {course.status !== 'vol' && (
        <section id="inschrijven" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-text-dark">Inschrijven voor {course.title}</h2>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
              <p className="mb-6 text-gray-600">
                Vul het onderstaande formulier in om je in te schrijven voor deze opleiding. 
                Na inschrijving nemen wij binnen 2 werkdagen contact met je op.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Voornaam *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Achternaam *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mailadres *</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Bedrijfsnaam</label>
                  <input 
                    type="text" 
                    id="company" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Opmerkingen</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                    Ik ga akkoord met de <a href="/privacy" className="text-primary hover:underline">privacyverklaring</a> en geef toestemming voor het verwerken van mijn gegevens. *
                  </label>
                </div>
                
                <div>
                  <button 
                    type="submit"
                    className="w-full bg-secondary text-white py-3 rounded-md hover:bg-secondary-dark transition-colors"
                  >
                    Inschrijven
                  </button>
                </div>
                
                <p className="text-sm text-gray-500">
                  Velden met een * zijn verplicht. Na inschrijving ontvang je een bevestiging per e-mail.
                </p>
              </form>
            </div>
          </div>
        </section>
      )}
      
      {/* Related Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-text-dark">Gerelateerde Opleidingen</h2>
          <p className="text-gray-600 mb-8">
            Bekijk ook onze andere opleidingen in de categorie {course.category}.
          </p>
          
          <div className="text-center mt-8">
            <Link 
              href="/opleidingen"
              className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
            >
              Bekijk alle opleidingen
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const courses = await getCourses();
  
  const paths = courses.map((course) => ({
    params: { slug: course.slug },
  }));
  
  return {
    paths,
    fallback: 'blocking', // Show a fallback page while the page is being generated
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const course = await getCourseBySlug(slug);
  
  if (!course) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      course,
    },
    // Revalidate every 5 minutes to ensure fresh data
    revalidate: 60 * 5,
  };
};