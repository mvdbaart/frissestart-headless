import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getMenuByLocation } from '../lib/api';

const Header: React.FC = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchMenu = async () => {
      const menu = await getMenuByLocation('primary');
      if (menu && menu.items) {
        setMenuItems(menu.items);
      }
    };

    fetchMenu();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.asPath]);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Frisse Start Opleidingen</span>
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
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item: any) => (
              <Link
                key={item.ID}
                href={item.url.replace('https://opleidingen.frissestart.nl', '')}
                className={`font-medium ${
                  router.asPath === item.url.replace('https://opleidingen.frissestart.nl', '')
                    ? 'text-primary-dark'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {item.title}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-primary">
              Contact
            </Link>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3">
            {menuItems.map((item: any) => (
              <Link
                key={item.ID}
                href={item.url.replace('https://opleidingen.frissestart.nl', '')}
                className={`block py-2 px-4 rounded ${
                  router.asPath === item.url.replace('https://opleidingen.frissestart.nl', '')
                    ? 'bg-primary-light text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.title}
              </Link>
            ))}
            <Link href="/contact" className="block py-2 px-4 bg-primary text-white rounded">
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;