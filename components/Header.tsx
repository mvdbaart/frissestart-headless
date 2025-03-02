import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getMenuByLocation } from '../lib/api';

const Header: React.FC = () => {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menu = await getMenuByLocation('primary');
        if (menu && menu.items && menu.items.length > 0) {
          setMenuItems(menu.items);
        } else {
          // Fallback menu items als er geen menu is opgehaald
          setMenuItems([
            { ID: 1, title: 'Home', url: '/' },
            { ID: 2, title: 'Opleidingen', url: '/opleidingen' },
            { ID: 3, title: 'Over Ons', url: '/over-ons' },
            { ID: 4, title: 'Contact', url: '/contact' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
        // Fallback menu items bij een fout
        setMenuItems([
          { ID: 1, title: 'Home', url: '/' },
          { ID: 2, title: 'Opleidingen', url: '/opleidingen' },
          { ID: 3, title: 'Over Ons', url: '/over-ons' },
          { ID: 4, title: 'Contact', url: '/contact' }
        ]);
      }
    };

    fetchMenu();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.asPath]);

  // Helper functie om URL's te normaliseren
  const normalizeUrl = (url: string) => {
    if (!url) return '';
    return url.replace('https://opleidingen.frissestart.nl', '').replace(/\/$/, '');
  };

  return (
    <header>
      {/* Top advantages bar */}
      <div className="bg-secondary text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center text-sm">
            <div className="hidden md:flex items-center space-x-1">
              <a href="tel:+31123456789" className="hover:text-white hover:underline">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +31 (0)12 345 6789
                </span>
              </a>
              <span className="mx-2">|</span>
              <a href="mailto:info@frissestart.nl" className="hover:text-white hover:underline">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@frissestart.nl
                </span>
              </a>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 w-full md:w-auto">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>100% SOOB garantie</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Geen wachttijden</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Professionele ondersteuning</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Direct geregeld</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="/images/logo.png" 
                alt="Frisse Start Opleidingen" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-6 items-center">
              {menuItems.map((item: any) => {
                const url = normalizeUrl(item.url);
                const isActive = router.asPath === url || 
                                (url === '/opleidingen' && router.asPath.startsWith('/opleidingen/'));
                
                // Speciale styling voor Contact knop
                if (item.title === 'Contact') {
                  return (
                    <Link 
                      key={item.ID}
                      href={url} 
                      className={`btn ${
                        isActive
                          ? 'bg-primary-dark text-white'
                          : 'bg-primary text-white hover:bg-primary-dark'
                      }`}
                    >
                      {item.title}
                    </Link>
                  );
                }
                
                return (
                  <Link
                    key={item.ID}
                    href={url}
                    className={`font-medium ${
                      isActive
                        ? 'text-primary-dark'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 space-y-3">
              {menuItems.map((item: any) => {
                const url = normalizeUrl(item.url);
                const isActive = router.asPath === url || 
                                (url === '/opleidingen' && router.asPath.startsWith('/opleidingen/'));
                
                // Speciale styling voor Contact knop in mobiel menu
                if (item.title === 'Contact') {
                  return (
                    <Link 
                      key={item.ID}
                      href={url} 
                      className="block py-2 px-4 bg-primary text-white rounded"
                    >
                      {item.title}
                    </Link>
                  );
                }
                
                return (
                  <Link
                    key={item.ID}
                    href={url}
                    className={`block py-2 px-4 rounded ${
                      isActive
                        ? 'bg-primary-light text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;