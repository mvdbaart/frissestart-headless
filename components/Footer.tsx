import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

// Standaard pagina's voor als de API niet werkt
const DEFAULT_PAGES = [
  { id: 1, slug: 'over-ons', title: { rendered: 'Over Ons' } },
  { id: 2, slug: 'contact', title: { rendered: 'Contact' } },
  { id: 3, slug: 'privacy-policy', title: { rendered: 'Privacybeleid' } },
  { id: 4, slug: 'algemene-voorwaarden', title: { rendered: 'Algemene Voorwaarden' } },
  { id: 5, slug: 'veelgestelde-vragen', title: { rendered: 'Veelgestelde Vragen' } },
  { id: 6, slug: 'blog', title: { rendered: 'Blog' } }
];

// Pagina's die we willen uitsluiten van de footer
const EXCLUDED_PAGES = ['privacy-policy', 'contact', 'home', 'algemene-voorwaarden'];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [pages, setPages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      setIsLoading(true);
      try {
        // Direct ophalen van pagina's van WordPress API
        const response = await axios.get('https://opleidingen.frissestart.nl/wp-json/wp/v2/pages', {
          params: {
            per_page: 100,
            status: 'publish'
          }
        });
        
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          // Filter pagina's die we willen tonen in de footer
          const filteredPages = response.data.filter(page => 
            !EXCLUDED_PAGES.includes(page.slug)
          );
          
          console.log('Fetched pages:', filteredPages.length);
          setPages(filteredPages);
        } else {
          // Als er geen pagina's zijn gevonden, gebruik de standaard pagina's
          console.log('No pages found, using default pages');
          const filteredDefaultPages = DEFAULT_PAGES.filter(page => 
            !EXCLUDED_PAGES.includes(page.slug)
          );
          setPages(filteredDefaultPages);
        }
      } catch (error) {
        console.error('Error fetching pages for footer:', error);
        // Bij een fout, gebruik de standaard pagina's
        const filteredDefaultPages = DEFAULT_PAGES.filter(page => 
          !EXCLUDED_PAGES.includes(page.slug)
        );
        setPages(filteredDefaultPages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPages();
  }, []);

  return (
    <footer className="bg-text-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Frisse Start Opleidingen</h3>
            <p className="text-gray-300">
              Professionele opleidingen en cursussen voor persoonlijke en professionele ontwikkeling.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Snelle Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/opleidingen" className="text-gray-300 hover:text-white transition-colors">
                  Opleidingen
                </Link>
              </li>
              <li>
                <Link href="/over-ons" className="text-gray-300 hover:text-white transition-colors">
                  Over Ons
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Pagina's</h3>
            <ul className="space-y-2">
              {isLoading ? (
                <li className="text-gray-400">Laden van pagina's...</li>
              ) : pages.length > 0 ? (
                pages.map(page => (
                  <li key={page.id}>
                    <Link 
                      href={`/${page.slug}`} 
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {page.title?.rendered || page.title || page.slug}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link href="/veelgestelde-vragen" className="text-gray-300 hover:text-white transition-colors">
                      Veelgestelde Vragen
                    </Link>
                  </li>
                  <li>
                    <Link href="/sitemap" className="text-gray-300 hover:text-white transition-colors">
                      Sitemap
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
            <address className="not-italic text-gray-300">
              <p>Email: info@frissestart.nl</p>
              <p>Telefoon: +31 (0)12 345 6789</p>
            </address>
            <div className="mt-4 flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {currentYear} Frisse Start Opleidingen. Alle rechten voorbehouden.</p>
          <p className="mt-2">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacybeleid
            </Link>
            {' | '}
            <Link href="/algemene-voorwaarden" className="hover:text-white transition-colors">
              Algemene Voorwaarden
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;