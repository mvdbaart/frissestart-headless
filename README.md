# Frisse Start Headless WordPress Frontend

This is a modern headless frontend for the WordPress website at https://opleidingen.frissestart.nl. It uses Next.js, React, TypeScript, and TailwindCSS to create a fast, responsive, and user-friendly experience while keeping WordPress as the backend CMS.

## Features

- **Headless WordPress**: Uses the WordPress REST API to fetch content
- **Modern Frontend**: Built with Next.js, React, and TypeScript
- **Responsive Design**: Fully responsive design with TailwindCSS
- **Performance Optimized**: Server-side rendering and static site generation for optimal performance
- **SEO Friendly**: Built-in SEO optimization with Next.js
- **Animations**: Smooth animations with Framer Motion

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- Yarn or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/frissestart-headless.git
   cd frissestart-headless
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## WordPress Setup

To use this frontend with your WordPress site, you need to:

1. Ensure your WordPress site has the REST API enabled
2. Install and activate the following WordPress plugins:
   - [WP REST API Menus](https://wordpress.org/plugins/wp-rest-api-menus/)
   - [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) (if using custom fields)
   - [ACF to REST API](https://wordpress.org/plugins/acf-to-rest-api/) (if using ACF)

## Deployment

This project can be deployed to any hosting platform that supports Next.js, such as:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

## Project Structure

- `/pages`: Next.js pages
- `/components`: React components
- `/lib`: Utility functions and API helpers
- `/styles`: Global styles and TailwindCSS configuration
- `/public`: Static assets

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)