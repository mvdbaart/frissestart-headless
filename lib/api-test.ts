import axios from 'axios';

// API endpoints
const WP_API_URL = 'https://opleidingen.frissestart.nl/wp-json/wp/v2';
const CUSTOM_API_URL = 'https://opleidingen.frissestart.nl/wp-json/custom/v1';
const REST_API_URL = 'https://opleidingen.frissestart.nl/wp-json';

// Function to test different API endpoints
export async function testApiEndpoints() {
  const results: any = {
    standardEndpoints: {},
    customEndpoints: {},
    directAccess: {}
  };

  // Test standard WordPress API endpoints
  try {
    // Get posts
    const postsResponse = await axios.get(`${WP_API_URL}/posts?per_page=1`);
    results.standardEndpoints.posts = {
      status: postsResponse.status,
      count: postsResponse.data.length,
      sample: postsResponse.data[0]?.title?.rendered || 'No posts found'
    };
  } catch (error: any) {
    results.standardEndpoints.posts = { error: error.message };
  }

  try {
    // Get pages
    const pagesResponse = await axios.get(`${WP_API_URL}/pages?per_page=1`);
    results.standardEndpoints.pages = {
      status: pagesResponse.status,
      count: pagesResponse.data.length,
      sample: pagesResponse.data[0]?.title?.rendered || 'No pages found'
    };
  } catch (error: any) {
    results.standardEndpoints.pages = { error: error.message };
  }

  try {
    // Check if opleidingen custom post type exists
    const opleidingenResponse = await axios.get(`${WP_API_URL}/opleidingen?per_page=1`);
    results.standardEndpoints.opleidingen = {
      status: opleidingenResponse.status,
      count: opleidingenResponse.data.length,
      sample: opleidingenResponse.data[0]?.title?.rendered || 'No opleidingen found'
    };
  } catch (error: any) {
    results.standardEndpoints.opleidingen = { error: error.message };
  }

  // Test custom API endpoints
  try {
    // Try custom endpoint for opleidingen
    const customOpleidingenResponse = await axios.get(`${CUSTOM_API_URL}/opleidingen`);
    results.customEndpoints.opleidingen = {
      status: customOpleidingenResponse.status,
      count: Array.isArray(customOpleidingenResponse.data) ? customOpleidingenResponse.data.length : 'Not an array',
      sample: Array.isArray(customOpleidingenResponse.data) && customOpleidingenResponse.data.length > 0 
        ? customOpleidingenResponse.data[0].title || 'No title' 
        : 'No opleidingen found'
    };
  } catch (error: any) {
    results.customEndpoints.opleidingen = { error: error.message };
  }

  // Check available routes
  try {
    const routesResponse = await axios.get(REST_API_URL);
    results.availableRoutes = Object.keys(routesResponse.data.routes).filter(route => 
      route.includes('opleidingen') || route.includes('custom')
    );
  } catch (error: any) {
    results.availableRoutes = { error: error.message };
  }

  // Try direct access to PHP script
  try {
    const directAccessResponse = await axios.get('https://opleidingen.frissestart.nl/wp-content/themes/frissestart/api/get-opleidingen.php');
    results.directAccess.opleidingen = {
      status: directAccessResponse.status,
      count: Array.isArray(directAccessResponse.data) ? directAccessResponse.data.length : 'Not an array',
      sample: Array.isArray(directAccessResponse.data) && directAccessResponse.data.length > 0 
        ? directAccessResponse.data[0] 
        : 'No opleidingen found'
    };
  } catch (error: any) {
    results.directAccess.opleidingen = { error: error.message };
  }

  return results;
}

// Function to get all available routes from the WordPress REST API
export async function getAvailableRoutes() {
  try {
    const response = await axios.get(REST_API_URL);
    return Object.keys(response.data.routes);
  } catch (error) {
    console.error('Error fetching available routes:', error);
    return [];
  }
}

// Function to try to get opleidingen data from various endpoints
export async function getOpleidingenData() {
  const results: any = [];
  
  // Try different possible endpoints
  const endpoints = [
    `${WP_API_URL}/opleidingen`,
    `${CUSTOM_API_URL}/opleidingen`,
    `${REST_API_URL}/opleidingen/v1/all`,
    `${REST_API_URL}/wp/v2/opleidingen`,
    `${REST_API_URL}/frisse-start/v1/opleidingen`,
    'https://opleidingen.frissestart.nl/wp-content/themes/frissestart/api/get-opleidingen.php'
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Trying endpoint: ${endpoint}`);
      const response = await axios.get(endpoint);
      
      if (response.data && (Array.isArray(response.data) || typeof response.data === 'object')) {
        results.push({
          endpoint,
          status: response.status,
          data: response.data
        });
      }
    } catch (error) {
      console.log(`Error with endpoint ${endpoint}:`, error);
      // Continue to next endpoint
    }
  }
  
  return results;
}