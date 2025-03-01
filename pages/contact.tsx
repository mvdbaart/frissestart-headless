import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getPageBySlug, Page } from '../lib/api';

interface ContactProps {
  page: Page | null;
}

export default function Contact({ page }: ContactProps) {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <Layout 
      title="Contact - Frisse Start Opleidingen"
      description="Neem contact op met Frisse Start Opleidingen voor meer informatie over onze opleidingen of voor een persoonlijk adviesgesprek."
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
              Contact
            </h1>
            <p className="text-xl mb-8">
              Heeft u vragen of wilt u meer informatie? Neem gerust contact met ons op.
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

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Information */}
              <div className="lg:w-1/3">
                <h2 className="text-2xl font-bold mb-6 text-text-dark">Contactgegevens</h2>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="flex items-start mb-4">
                    <div className="bg-primary-light p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-text-dark">Telefoon</h3>
                      <p className="text-gray-600">+31 (0)12 345 6789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <div className="bg-primary-light p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-text-dark">E-mail</h3>
                      <p className="text-gray-600">info@frissestart.nl</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-light p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-text-dark">Adres</h3>
                      <p className="text-gray-600">
                        Voorbeeldstraat 123<br />
                        1234 AB Amsterdam<br />
                        Nederland
                      </p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-6 text-text-dark">Openingstijden</h2>
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maandag - Vrijdag</span>
                      <span className="font-medium text-text-dark">09:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zaterdag</span>
                      <span className="font-medium text-text-dark">Gesloten</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zondag</span>
                      <span className="font-medium text-text-dark">Gesloten</span>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-6 text-text-dark">Volg ons</h2>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-primary-light p-3 rounded-full text-white hover:bg-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-primary-light p-3 rounded-full text-white hover:bg-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-primary-light p-3 rounded-full text-white hover:bg-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-primary-light p-3 rounded-full text-white hover:bg-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:w-2/3">
                <h2 className="text-2xl font-bold mb-6 text-text-dark">Stuur ons een bericht</h2>
                
                {formStatus === 'success' ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-bold mb-2">Bedankt voor uw bericht!</h3>
                    <p>We hebben uw bericht ontvangen en zullen zo spoedig mogelijk contact met u opnemen.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-text-dark">
                          Naam *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-text-dark">
                          E-mailadres *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-text-dark">
                          Telefoonnummer
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-text-dark">
                          Onderwerp *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        >
                          <option value="">Selecteer een onderwerp</option>
                          <option value="Informatie over opleidingen">Informatie over opleidingen</option>
                          <option value="Inschrijving">Inschrijving</option>
                          <option value="Samenwerking">Samenwerking</option>
                          <option value="Klacht">Klacht</option>
                          <option value="Anders">Anders</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block mb-2 text-sm font-medium text-text-dark">
                        Bericht *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      ></textarea>
                    </div>
                    
                    <div className="flex items-start mb-6">
                      <input
                        type="checkbox"
                        id="privacy"
                        className="mt-1 mr-2"
                        required
                      />
                      <label htmlFor="privacy" className="text-sm text-gray-600">
                        Ik ga akkoord met de <a href="/privacy" className="text-primary">privacyverklaring</a> en geef toestemming voor het verwerken van mijn gegevens.
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className={`w-full bg-secondary text-white font-bold py-3 px-4 rounded-md transition-colors ${
                        formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-secondary-dark'
                      }`}
                    >
                      {formStatus === 'submitting' ? 'Verzenden...' : 'Verstuur Bericht'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-text-dark">Onze Locatie</h2>
            <div className="bg-white rounded-lg shadow-md p-2 h-96">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.5969246790584!2d4.8908231!3d52.3702157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c78164f111%3A0x95d8e7a0908eac8d!2sAmsterdam!5e0!3m2!1sen!2snl!4v1623245240760!5m2!1sen!2snl" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Frisse Start Opleidingen locatie"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-text-dark">Veelgestelde Vragen</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Hoe kan ik me inschrijven voor een opleiding?",
                answer: "U kunt zich inschrijven via de website door naar de pagina van de gewenste opleiding te gaan en op de knop 'Inschrijven' te klikken. Vul vervolgens het inschrijfformulier in. U kunt zich ook telefonisch of per e-mail inschrijven."
              },
              {
                question: "Wat zijn de betalingsmogelijkheden?",
                answer: "Wij bieden verschillende betalingsmogelijkheden aan, waaronder betaling in termijnen. Na inschrijving ontvangt u een factuur met betalingsinstructies. Voor meer informatie over betalingsmogelijkheden kunt u contact met ons opnemen."
              },
              {
                question: "Kan ik een opleiding annuleren?",
                answer: "Ja, u kunt een opleiding annuleren. De annuleringsvoorwaarden vindt u in onze algemene voorwaarden. In het kort: bij annulering tot 4 weken voor aanvang betaalt u 25% van het cursusgeld, tussen 4 en 2 weken 50%, en binnen 2 weken het volledige bedrag."
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
  const page = await getPageBySlug('contact');
  
  return {
    props: {
      page,
    },
    revalidate: 60 * 10, // Revalidate every 10 minutes
  };
};