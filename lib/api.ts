import axios from 'axios';

// WordPress API URL
const WP_API_URL = 'https://opleidingen.frissestart.nl/wp-json/wp/v2';
const CUSTOM_API_URL = 'https://opleidingen.frissestart.nl/wp-json/custom/v1';
const REST_API_URL = 'https://opleidingen.frissestart.nl/wp-json';

// Course type definition
export interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  status?: 'open' | 'bijna_vol' | 'vol';
  maxParticipants?: number;
  currentParticipants?: number;
  tijd?: string;
  duration?: string;
  startDate: string;
  location: string;
  price: string;
  soobSubsidie?: string;
}

// Page type definition
export interface Page {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  status: string;
  link: string;
  date: string;
}

/**
 * Fetch menu by location from WordPress API
 */
export async function getMenuByLocation(location: string) {
  try {
    // Try different possible endpoints for menus
    const endpoints = [
      `${REST_API_URL}/menus/v1/locations/${location}`,
      `${REST_API_URL}/wp-api-menus/v2/menu-locations/${location}`,
      `${CUSTOM_API_URL}/menu/${location}`
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(endpoint);
        
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        console.log(`Error with menu endpoint ${endpoint}:`, error);
        // Continue to next endpoint
      }
    }
    
    // If no endpoints worked, return a default menu
    console.error(`No menu found for location: ${location}`);
    return {
      items: [
        { ID: 1, title: 'Home', url: '/' },
        { ID: 2, title: 'Opleidingen', url: '/opleidingen' },
        { ID: 3, title: 'Over Ons', url: '/over-ons' },
        { ID: 4, title: 'Contact', url: '/contact' }
      ]
    };
  } catch (error) {
    console.error(`Error fetching menu for location ${location}:`, error);
    return {
      items: [
        { ID: 1, title: 'Home', url: '/' },
        { ID: 2, title: 'Opleidingen', url: '/opleidingen' },
        { ID: 3, title: 'Over Ons', url: '/over-ons' },
        { ID: 4, title: 'Contact', url: '/contact' }
      ]
    };
  }
}

/**
 * Fetch all courses from the WordPress API
 */
export async function getCourses(): Promise<Course[]> {
  try {
    // Primaire endpoint voor opleidingen
    const primaryEndpoint = 'https://opleidingen.frissestart.nl/wp-json/wp/v2/opleidingen/table/opleidingen';
    
    try {
      console.log('Fetching courses from primary endpoint...');
      const response = await axios.get(primaryEndpoint, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.data && Array.isArray(response.data)) {
        console.log(`Successfully fetched ${response.data.length} courses from primary endpoint`);
        
        // Map de API-response naar onze Course interface
        return response.data.map((course: any) => {
          // Helper functie om de titel te extraheren
          const extractTitle = (titleData: any) => {
            if (typeof titleData === 'object' && titleData.rendered) {
              return titleData.rendered;
            }
            if (typeof titleData === 'string') {
              return titleData;
            }
            return '';
          };

          // Helper functie om de locatie te formatteren
          const formatLocation = (loc: any) => {
            if (!loc) return 'Online';
            if (typeof loc === 'object' && loc.name) return loc.name;
            if (typeof loc === 'string') return loc;
            return 'Online';
          };

          return {
            id: course.id || course.ID || 0,
            slug: course.slug || course.post_name || `course-${course.id || course.ID || 0}`,
            title: extractTitle(course.title) || course.naam || course.post_title || '',
            description: course.content?.rendered || course.description || course.post_content || course.beschrijving || '',
            image: course.featured_image_url || course.image || course.thumbnail || course.afbeelding || null,
            category: course.category || (course.categories && course.categories[0]?.name) || 'Algemeen',
            status: course.status || 'open',
            maxParticipants: course.max_participants || course.maxParticipants || course.maximum_deelnemers || null,
            currentParticipants: course.current_participants || course.currentParticipants || course.huidige_deelnemers || 0,
            tijd: course.tijd || course.time || course.aanvangstijd || course.starttijd || null,
            duration: course.duration || course.duur || course.tijdsduur || null,
            startDate: course.start_date || course.startDate || course.datum || course.startdatum || 'Nader te bepalen',
            location: formatLocation(course.location || course.locatie || course.plaats || course.vestiging),
            price: course.price || course.prijs || course.kosten || course.tarief || 'Op aanvraag',
            soobSubsidie: course.soob_subsidie || course.soobSubsidie || course.soob || course.subsidie || null,
          };
        });
      }
    } catch (error) {
      console.log('Error fetching from primary endpoint:', error);
    }
    
    // Fallback endpoints als de primaire endpoint faalt
    const fallbackEndpoints = [
      `${REST_API_URL}/frisse-start/v1/opleidingen`,
      `${WP_API_URL}/opleidingen`,
      `${CUSTOM_API_URL}/opleidingen`,
      `${REST_API_URL}/opleidingen/v1/all`,
      `${REST_API_URL}/wp/v2/opleidingen`,
      'https://opleidingen.frissestart.nl/wp-content/themes/frissestart/api/get-opleidingen.php'
    ];

    for (const endpoint of fallbackEndpoints) {
      try {
        console.log(`Trying fallback endpoint: ${endpoint}`);
        const response = await axios.get(endpoint, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          timeout: 8000 // 8 seconden timeout voor fallbacks
        });
        
        if (response.data && Array.isArray(response.data)) {
          console.log(`Successfully fetched ${response.data.length} courses from fallback endpoint ${endpoint}`);
          
          // Map de API-response naar onze Course interface
          return response.data.map((course: any) => ({
            id: course.id || course.ID || 0,
            slug: course.slug || course.post_name || `course-${course.id || course.ID || 0}`,
            title: course.title?.rendered || course.title || course.post_title || '',
            description: course.content?.rendered || course.description || course.post_content || '',
            image: course.featured_image_url || course.image || course.thumbnail || null,
            category: course.category || course.categories?.[0]?.name || 'Algemeen',
            status: course.status || 'open',
            maxParticipants: course.max_participants || course.maxParticipants || null,
            currentParticipants: course.current_participants || course.currentParticipants || 0,
            tijd: course.tijd || null,
            duration: course.duration || null,
            startDate: course.start_date || course.startDate || 'Nader te bepalen',
            location: course.location || course.locatie || 'Online',
            price: course.price || course.prijs || 'Op aanvraag',
            soobSubsidie: course.soob_subsidie || course.soobSubsidie || null,
          }));
        }
      } catch (error) {
        console.log(`Error with fallback endpoint ${endpoint}:`, error);
        // Doorgaan naar de volgende endpoint
      }
    }
    
    // Als geen enkele endpoint werkt, log een fout en retourneer een lege array
    console.error('No valid course data found from any endpoint');
    return [];
    
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

/**
 * Fetch a single course by its slug
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    // Eerst proberen om alle cursussen op te halen
    const courses = await getCourses();
    
    // Zoek de cursus met de overeenkomende slug
    const course = courses.find(c => c.slug === slug);
    
    if (course) {
      return course;
    }
    
    // Als de cursus niet gevonden is in de algemene lijst, probeer deze direct op te halen
    const primaryEndpoint = 'https://opleidingen.frissestart.nl/wp-json/wp/v2/opleidingen/table/opleidingen';
    
    try {
      // Probeer eerst alle cursussen op te halen en filter op slug
      const response = await axios.get(primaryEndpoint, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.data && Array.isArray(response.data)) {
        const matchingCourse = response.data.find((c: any) => c.slug === slug);
        
        if (matchingCourse) {
          return {
            id: matchingCourse.id || 0,
            slug: matchingCourse.slug || slug,
            title: matchingCourse.title || '',
            description: matchingCourse.description || '',
            image: matchingCourse.image || null,
            category: matchingCourse.category || 'Algemeen',
            status: matchingCourse.status || 'open',
            maxParticipants: matchingCourse.max_participants || matchingCourse.maxParticipants || null,
            currentParticipants: matchingCourse.current_participants || matchingCourse.currentParticipants || 0,
            tijd: matchingCourse.tijd || null,
            duration: matchingCourse.duration || null,
            startDate: matchingCourse.start_date || matchingCourse.startDate || 'Nader te bepalen',
            location: matchingCourse.location || matchingCourse.locatie || 'Online',
            price: matchingCourse.price || matchingCourse.prijs || 'Op aanvraag',
            soobSubsidie: matchingCourse.soob_subsidie || matchingCourse.soobSubsidie || null,
          };
        }
      }
    } catch (error) {
      console.log(`Error fetching course with slug ${slug} from primary endpoint:`, error);
    }
    
    // Probeer fallback endpoints als de primaire endpoint niet werkt
    const fallbackEndpoints = [
      `${REST_API_URL}/frisse-start/v1/opleidingen/${slug}`,
      `${WP_API_URL}/opleidingen?slug=${slug}`,
      `${CUSTOM_API_URL}/opleidingen/${slug}`
    ];
    
    for (const endpoint of fallbackEndpoints) {
      try {
        const response = await axios.get(endpoint, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          timeout: 5000
        });
        
        if (response.data) {
          // Als de response een array is, neem het eerste item
          const courseData = Array.isArray(response.data) ? response.data[0] : response.data;
          
          if (courseData) {
            return {
              id: courseData.id || courseData.ID || 0,
              slug: courseData.slug || courseData.post_name || slug,
              title: courseData.title?.rendered || courseData.title || courseData.post_title || '',
              description: courseData.content?.rendered || courseData.description || courseData.post_content || '',
              image: courseData.featured_image_url || courseData.image || courseData.thumbnail || null,
              category: courseData.category || courseData.categories?.[0]?.name || 'Algemeen',
              status: courseData.status || 'open',
              maxParticipants: courseData.max_participants || courseData.maxParticipants || null,
              currentParticipants: courseData.current_participants || courseData.currentParticipants || 0,
              tijd: courseData.tijd || null,
              duration: courseData.duration || null,
              startDate: courseData.start_date || courseData.startDate || 'Nader te bepalen',
              location: courseData.location || courseData.locatie || 'Online',
              price: courseData.price || courseData.prijs || 'Op aanvraag',
              soobSubsidie: courseData.soob_subsidie || courseData.soobSubsidie || null,
            };
          }
        }
      } catch (error) {
        console.log(`Error fetching course with slug ${slug} from fallback endpoint:`, error);
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching course with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Parse a date string in various formats
 */
function parseDate(dateString: string): Date | null {
  if (!dateString || dateString === 'Nader te bepalen' || dateString === 'Flexibel') {
    return null;
  }
  
  let parsedDate: Date | null = null;
  
  // Try DD-MM-YYYY format
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    const [day, month, year] = dateString.split('-').map(Number);
    parsedDate = new Date(year, month - 1, day);
  } 
  // Try YYYY-MM-DD format
  else if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    parsedDate = new Date(dateString);
  }
  // Try DD/MM/YYYY format
  else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    const [day, month, year] = dateString.split('/').map(Number);
    parsedDate = new Date(year, month - 1, day);
  }
  // Try to parse as is
  else {
    parsedDate = new Date(dateString);
  }
  
  // Return null if the date is invalid
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
}

/**
 * Fetch upcoming courses from the WordPress API
 */
export async function getUpcomingCourses(): Promise<Course[]> {
  try {
    // Get all courses from the API
    const allCourses = await getCourses();
    
    // Filter for upcoming courses and sort by start date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for accurate comparison
    
    // Filter out courses with past dates and sort by start date
    const upcomingCourses = allCourses
      .filter(course => {
        // Parse the date
        const courseDate = parseDate(course.startDate);
        
        // If we couldn't parse the date, include the course
        if (!courseDate) {
          return true;
        }
        
        // Include the course if the date is today or in the future
        return courseDate >= today;
      })
      .sort((a, b) => {
        // Parse dates
        const dateA = parseDate(a.startDate);
        const dateB = parseDate(b.startDate);
        
        // Courses with no specific date go to the end
        if (!dateA && !dateB) return a.title.localeCompare(b.title);
        if (!dateA) return 1;
        if (!dateB) return -1;
        
        // Sort by date (earliest first)
        return dateA.getTime() - dateB.getTime();
      })
      // Limit to 5 courses
      .slice(0, 5);
    
    return upcomingCourses;
  } catch (error) {
    console.error('Error fetching upcoming courses:', error);
    return [];
  }
}

/**
 * Fetch all pages from the WordPress API
 */
export async function getAllPages(): Promise<Page[]> {
  try {
    console.log('Fetching all pages from WordPress...');
    
    // Direct aanroepen van de standaard WordPress API endpoint
    const response = await axios.get('https://opleidingen.frissestart.nl/wp-json/wp/v2/pages', {
      params: {
        per_page: 100, // Maximum aantal pagina's per request
        status: 'publish' // Alleen gepubliceerde pagina's
      }
    });
    
    if (response.data && Array.isArray(response.data)) {
      console.log(`Successfully fetched ${response.data.length} pages from WordPress API`);
      
      // Check of er meer pagina's zijn (paginering)
      const totalPages = parseInt(response.headers['x-wp-totalpages'] || '1');
      
      if (totalPages > 1) {
        console.log(`There are ${totalPages} pages of results, fetching all...`);
        
        // Maak requests voor alle pagina's
        const requests = [];
        for (let page = 2; page <= totalPages; page++) {
          requests.push(
            axios.get('https://opleidingen.frissestart.nl/wp-json/wp/v2/pages', {
              params: {
                per_page: 100,
                status: 'publish',
                page: page
              }
            })
          );
        }
        
        // Wacht op alle requests
        const additionalResponses = await Promise.all(requests);
        
        // Combineer alle resultaten
        const allPages = [
          ...response.data,
          ...additionalResponses.flatMap(resp => resp.data)
        ];
        
        console.log(`Total pages fetched: ${allPages.length}`);
        return allPages;
      }
      
      return response.data;
    }
    
    console.error('No valid page data found from WordPress API');
    return [];
  } catch (error) {
    console.error('Error fetching all pages:', error);
    
    // Probeer een alternatieve endpoint als de standaard endpoint faalt
    try {
      console.log('Trying alternative endpoint...');
      const altResponse = await axios.get(`${REST_API_URL}/frisse-start/v1/pages`);
      
      if (altResponse.data && Array.isArray(altResponse.data)) {
        console.log(`Successfully fetched ${altResponse.data.length} pages from alternative endpoint`);
        return altResponse.data;
      }
    } catch (altError) {
      console.error('Error fetching from alternative endpoint:', altError);
    }
    
    return [];
  }
}

/**
 * Fetch a single page by its slug
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await axios.get(`${WP_API_URL}/pages`, {
      params: {
        slug: slug
      },
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0];
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch a single page by its ID
 */
export async function getPageById(id: number): Promise<Page | null> {
  try {
    const response = await axios.get(`${WP_API_URL}/pages/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (response.data) {
      return response.data;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching page with ID ${id}:`, error);
    return null;
  }
}

/**
 * Synchroniseer cursussen met WordPress database (alleen ophalen)
 * Deze functie forceert een verse ophaling van cursussen uit WordPress
 */
export async function synchronizeCoursesWithWordPress(): Promise<{
  success: boolean;
  coursesCount: number;
  message: string;
}> {
  try {
    console.log('Cursussen synchroniseren met WordPress...');
    
    // Forceer een verse ophaling van de primaire endpoint met cache-busting
    const timestamp = new Date().getTime();
    const primaryEndpoint = 'https://opleidingen.frissestart.nl/wp-json/wp/v2/opleidingen/table/opleidingen';
    
    try {
      const response = await axios.get(`${primaryEndpoint}?_=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        timeout: 15000 // 15 seconden timeout voor synchronisatie
      });
      
      if (response.data && Array.isArray(response.data)) {
        const coursesCount = response.data.length;
        console.log(`Succesvol ${coursesCount} cursussen gesynchroniseerd van WordPress`);
        
        return {
          success: true,
          coursesCount,
          message: `Succesvol ${coursesCount} cursussen gesynchroniseerd van WordPress`
        };
      }
    } catch (error) {
      console.log('Error met primaire endpoint tijdens synchronisatie:', error);
    }
    
    // Als primaire endpoint faalt, probeer fallbacks
    const fallbackEndpoints = [
      `${REST_API_URL}/frisse-start/v1/opleidingen`,
      `${WP_API_URL}/opleidingen`,
      `${CUSTOM_API_URL}/opleidingen`,
      `${REST_API_URL}/opleidingen/v1/all`,
      `${REST_API_URL}/wp/v2/opleidingen`
    ];
    
    for (const endpoint of fallbackEndpoints) {
      try {
        const fallbackResponse = await axios.get(`${endpoint}?_=${timestamp}`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
          timeout: 10000
        });
        
        if (fallbackResponse.data && Array.isArray(fallbackResponse.data)) {
          const coursesCount = fallbackResponse.data.length;
          console.log(`Succesvol ${coursesCount} cursussen gesynchroniseerd van fallback endpoint ${endpoint}`);
          
          return {
            success: true,
            coursesCount,
            message: `Succesvol ${coursesCount} cursussen gesynchroniseerd van fallback endpoint`
          };
        }
      } catch (error) {
        console.log(`Error met fallback endpoint ${endpoint} tijdens synchronisatie:`, error);
        // Doorgaan naar de volgende endpoint
      }
    }
    
    return {
      success: false,
      coursesCount: 0,
      message: 'Kon geen cursussen synchroniseren van WordPress endpoints'
    };
  } catch (error) {
    console.error('Error bij het synchroniseren van cursussen met WordPress:', error);
    
    return {
      success: false,
      coursesCount: 0,
      message: `Error bij het synchroniseren van cursussen: ${error.message || 'Onbekende fout'}`
    };
  }
}