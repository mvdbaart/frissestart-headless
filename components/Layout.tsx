import React from 'react';
import Head from 'next/head';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{title || 'Frisse Start Opleidingen'}</title>
        <meta name="description" content={description || 'Frisse Start Opleidingen - Professionele opleidingen en cursussen voor persoonlijke en professionele ontwikkeling.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
      
      <Footer />
    </>
  );
};

export default Layout;