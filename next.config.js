/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['opleidingen.frissestart.nl'], // Allow images from WordPress
  },
  i18n: {
    locales: ['nl'],
    defaultLocale: 'nl',
  },
}

module.exports = nextConfig