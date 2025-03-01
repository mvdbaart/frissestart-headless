import { useState } from 'react';
import Layout from '../components/Layout';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // In a real application, you would send this data to your WordPress backend
    // using the WP REST API or a custom endpoint
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setFormStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  return (
    <Layout 
      title="Contact - Frisse Start Opleidingen" 
      description="Neem contact op met Frisse Start Opleidingen voor meer informatie over onze opleidingen en cursussen."
    >
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contactgegevens</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Adres</h3>
                  <address className="not-italic text-gray-600">
                    Frisse Start Opleidingen<br />
                    Voorbeeldstraat 123<br />
                    1234 AB Amsterdam
                  </address>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact</h3>
                  <p className="text-gray-600">
                    Email: <a href="mailto:info@frissestart.nl" className="text-primary">info@frissestart.nl</a><br />
                    Telefoon: <a href="tel:+31123456789" className="text-primary">+31 (0)12 345 6789</a>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Openingstijden</h3>
                  <p className="text-gray-600">
                    Maandag - Vrijdag: 9:00 - 17:00<br />
                    Zaterdag - Zondag: Gesloten
                  </p>
                </div>
              </div>
              
              {/* Map placeholder */}
              <div className="mt-8 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Kaart wordt hier weergegeven</p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Stuur ons een bericht</h2>
              
              {formStatus === 'success' ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  <p>Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.</p>
                </div>
              ) : formStatus === 'error' ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  <p>Er is iets misgegaan bij het versturen van je bericht. Probeer het later opnieuw.</p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Naam *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Onderwerp *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Selecteer een onderwerp</option>
                    <option value="Algemene vraag">Algemene vraag</option>
                    <option value="Informatie over opleidingen">Informatie over opleidingen</option>
                    <option value="Inschrijving">Inschrijving</option>
                    <option value="Samenwerking">Samenwerking</option>
                    <option value="Anders">Anders</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Bericht *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="btn btn-primary w-full"
                  >
                    {formStatus === 'submitting' ? 'Versturen...' : 'Verstuur Bericht'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}