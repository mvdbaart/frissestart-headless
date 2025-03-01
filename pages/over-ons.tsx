import { GetStaticProps } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { getPageBySlug, Page } from '../lib/api';

interface OverOnsProps {
  page: Page | null;
}

export default function OverOns({ page }: OverOnsProps) {
  return (
    <Layout 
      title="Over Ons - Frisse Start Opleidingen"
      description="Leer meer over Frisse Start Opleidingen, onze missie, visie en het team achter onze professionele opleidingen en cursussen."
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
              Over Ons
            </h1>
            <p className="text-xl mb-8">
              Ontdek wie we zijn, waar we voor staan en hoe we jou kunnen helpen je doelen te bereiken.
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

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {page ? (
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content.rendered }}
              />
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-6 text-text-dark">Onze Missie</h2>
                <p className="mb-8 text-gray-700">
                  Bij Frisse Start Opleidingen geloven we in het potentieel van ieder individu. Onze missie is om hoogwaardige, praktijkgerichte opleidingen aan te bieden die mensen helpen hun professionele en persoonlijke doelen te bereiken. We streven ernaar om een leeromgeving te creëren waarin deelnemers worden uitgedaagd, geïnspireerd en ondersteund.
                </p>
                
                <h2 className="text-3xl font-bold mb-6 text-text-dark">Onze Visie</h2>
                <p className="mb-8 text-gray-700">
                  We zien een wereld waarin continu leren en ontwikkelen toegankelijk is voor iedereen. Een wereld waarin mensen de kans krijgen om hun talenten te ontdekken en te ontplooien, ongeacht hun achtergrond of eerdere opleiding. Onze visie is om bij te dragen aan deze wereld door kwalitatief hoogstaande opleidingen aan te bieden die aansluiten bij de behoeften van zowel individuen als organisaties.
                </p>
                
                <div className="my-12 bg-gray-50 p-8 rounded-lg">
                  <h2 className="text-3xl font-bold mb-6 text-text-dark text-center">Onze Kernwaarden</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="bg-primary-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-text-dark">Kwaliteit</h3>
                      <p className="text-gray-700">We streven naar excellentie in alles wat we doen, van de inhoud van onze opleidingen tot de begeleiding van onze deelnemers.</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-text-dark">Flexibiliteit</h3>
                      <p className="text-gray-700">We begrijpen dat iedereen anders leert en verschillende behoeften heeft. Daarom bieden we flexibele leertrajecten aan.</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-text-dark">Persoonlijke Aandacht</h3>
                      <p className="text-gray-700">We geloven in de kracht van persoonlijke begeleiding en zorgen ervoor dat elke deelnemer de aandacht krijgt die hij of zij verdient.</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold mb-6 text-text-dark">Ons Team</h2>
                <p className="mb-8 text-gray-700">
                  Ons team bestaat uit ervaren professionals die niet alleen experts zijn in hun vakgebied, maar ook gepassioneerd zijn over het delen van hun kennis en het begeleiden van anderen. Ze brengen een schat aan praktijkervaring mee, wat zorgt voor relevante en actuele opleidingen.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
                  {[
                    {
                      name: "Jan de Vries",
                      role: "Oprichter & Directeur",
                      image: "https://randomuser.me/api/portraits/men/32.jpg",
                      bio: "Jan heeft meer dan 20 jaar ervaring in het bedrijfsleven en de onderwijssector. Hij richtte Frisse Start Opleidingen op met de visie om praktijkgericht onderwijs toegankelijk te maken voor iedereen."
                    },
                    {
                      name: "Lisa Jansen",
                      role: "Hoofd Opleidingen",
                      image: "https://randomuser.me/api/portraits/women/32.jpg",
                      bio: "Met haar achtergrond in onderwijskunde zorgt Lisa ervoor dat alle opleidingen voldoen aan de hoogste kwaliteitsnormen en aansluiten bij de behoeften van onze deelnemers."
                    },
                    {
                      name: "Mohammed El Amrani",
                      role: "Senior Trainer",
                      image: "https://randomuser.me/api/portraits/men/22.jpg",
                      bio: "Mohammed is gespecialiseerd in leiderschap en communicatie. Zijn interactieve trainingen zijn bekend om hun praktische toepasbaarheid en inspirerende karakter."
                    }
                  ].map((member, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="h-64 relative">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-1 text-text-dark">{member.name}</h3>
                        <p className="text-primary font-medium mb-3">{member.role}</p>
                        <p className="text-gray-700">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h2 className="text-3xl font-bold mb-6 text-text-dark">Onze Aanpak</h2>
                <p className="mb-4 text-gray-700">
                  Wat ons onderscheidt is onze praktijkgerichte aanpak. We geloven dat leren het meest effectief is wanneer theorie direct kan worden toegepast in de praktijk. Daarom bevatten al onze opleidingen praktische opdrachten, casestudies en oefeningen die aansluiten bij de dagelijkse realiteit van onze deelnemers.
                </p>
                <p className="mb-8 text-gray-700">
                  Daarnaast hechten we veel waarde aan persoonlijke begeleiding. Onze groepen zijn bewust klein gehouden, zodat er voldoende ruimte is voor individuele aandacht en feedback. We geloven dat iedereen op zijn of haar eigen manier leert en passen onze begeleiding daarop aan.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Klaar om te beginnen?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ontdek ons aanbod van opleidingen en cursussen en maak vandaag nog een frisse start met je ontwikkeling.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/opleidingen" className="btn bg-white text-secondary hover:bg-gray-100 px-8 py-3 rounded-md font-bold">
              Bekijk Opleidingen
            </a>
            <a href="/contact" className="btn bg-primary text-white hover:bg-primary-dark px-8 py-3 rounded-md font-bold">
              Neem Contact Op
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const page = await getPageBySlug('over-ons');
  
  return {
    props: {
      page,
    },
    revalidate: 60 * 10, // Revalidate every 10 minutes
  };
};