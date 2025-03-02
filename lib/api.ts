import axios from 'axios';
import fs from 'fs';
import path from 'path';

// WordPress API URL
const WP_API_URL = 'https://opleidingen.frissestart.nl/wp-json/wp/v2';
const CUSTOM_API_URL = 'https://opleidingen.frissestart.nl/wp-json/custom/v1';
const REST_API_URL = 'https://opleidingen.frissestart.nl/wp-json';

// Cache settings
const CACHE_DIR = path.join(process.cwd(), '.cache');
const COURSES_CACHE_FILE = path.join(CACHE_DIR, 'courses.json');
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Course type definition
export interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  category: string;
  status?: 'open' | 'bijna_vol' | 'vol';
  maxParticipants?: number | null;
  currentParticipants?: number;
  tijd?: string | null;
  duration?: string | null;
  startDate: string;
  location: string;
  price: string;
  soobSubsidie?: string | null;
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
 * Check if cache is valid
 */
function isCacheValid(): boolean {
  try {
    if (!fs.existsSync(COURSES_CACHE_FILE)) {
      return false;
    }

    const stats = fs.statSync(COURSES_CACHE_FILE);
    const now = new Date().getTime();
    const modifiedTime = stats.mtime.getTime();

    return now - modifiedTime < CACHE_DURATION;
  } catch (error) {
    console.error('Error checking cache validity:', error);
    return false;
  }
}

/**
 * Read courses from cache
 */
function readCoursesFromCache(): Course[] | null {
  try {
    if (!isCacheValid()) {
      return null;
    }

    const cacheData = fs.readFileSync(COURSES_CACHE_FILE, 'utf-8');
    return JSON.parse(cacheData);
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
}

/**
 * Write courses to cache
 */
function writeCoursesToCache(courses: Course[]): void {
  try {
    fs.writeFileSync(COURSES_CACHE_FILE, JSON.stringify(courses, null, 2));
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
}

/**
 * Fetch course details by ID
 */
async function getCourseDetails(courseId: string): Promise<any> {
  try {
    const response = await axios.get(`https://opleidingen.frissestart.nl/wp-json/opleidingen/v1/table/cursussen/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course details for ID ${courseId}:`, error);
    return null;
  }
}

/**
 * Fetch location details by ID
 */
async function getLocationDetails(locationId: string): Promise<any> {
  try {
    const response = await axios.get(`https://opleidingen.frissestart.nl/wp-json/opleidingen/v1/table/locaties/${locationId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching location details for ID ${locationId}:`, error);
    return null;
  }
}

/**
 * Fetch all courses
 */
async function fetchAllCourses(): Promise<any[]> {
  try {
    const response = await axios.get('https://opleidingen.frissestart.nl/wp-json/opleidingen/v1/table/cursussen');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching all courses:', error);
    return [];
  }
}

/**
 * Fetch all locations
 */
async function fetchAllLocations(): Promise<any[]> {
  try {
    const response = await axios.get('https://opleidingen.frissestart.nl/wp-json/opleidingen/v1/table/locaties');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching all locations:', error);
    return [];
  }
}

/**
 * Format time range
 */
function formatTimeRange(startTime: string, endTime: string): string {
  if (!startTime || !endTime) return '';
  
  // Convert 24-hour format to readable format
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };
  
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}

/**
 * Format date to "day, d month" format in Dutch
 */
function formatDate(dateString: string): string {
  if (!dateString || dateString === 'Nader te bepalen') {
    return 'Nader te bepalen';
  }
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    // Dutch day names (abbreviated)
    const dayNames = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
    
    // Dutch month names (abbreviated)
    const monthNames = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    
    const day = date.getDate();
    const dayOfWeek = dayNames[date.getDay()];
    const month = monthNames[date.getMonth()];
    
    return `${dayOfWeek}, ${day} ${month}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Convert string to slug
 */
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/&/g, '-and-')      // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')    // Remove all non-word characters
    .replace(/\-\-+/g, '-');     // Replace multiple - with single -
}

/**
 * Fetch all courses from the WordPress API
 */
export async function getCourses(): Promise<Course[]> {
  try {
    // Check cache first
    const cachedCourses = readCoursesFromCache();
    if (cachedCourses) {
      console.log('Returning courses from cache');
      return cachedCourses;
    }

    console.log('Cache invalid or not found, fetching fresh data...');
    
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
        
        // Fetch all courses and locations data in one go
        const [allCourses, allLocations] = await Promise.all([
          fetchAllCourses(),
          fetchAllLocations()
        ]);
        
        console.log(`Fetched ${allCourses.length} course details and ${allLocations.length} location details`);
        
        // Create lookup maps for faster access
        const coursesMap = new Map();
        const locationsMap = new Map();
        
        allCourses.forEach(course => {
          coursesMap.set(course.id.toString(), course);
        });
        
        allLocations.forEach(location => {
          locationsMap.set(location.id.toString(), location);
        });
        
        // Map the API-response to our Course interface
        const mappedCourses = response.data.map((course: any) => {
          // Log raw course data for debugging
          console.log('Raw course data:', JSON.stringify(course, null, 2));

          // Get course and location details from maps
          const courseDetails = coursesMap.get(course.cursus_id?.toString());
          const locationDetails = locationsMap.get(course.locatie_id?.toString());
          
          console.log('Course details:', courseDetails);
          console.log('Location details:', locationDetails);
          
          const title = courseDetails?.naam || '';
          
          // Extract slug from link if available, otherwise generate from title
          let slug = '';
          if (courseDetails?.link) {
            // Remove domain from link to get the slug
            const linkUrl = new URL(courseDetails.link);
            slug = linkUrl.pathname.replace(/^\//, '').replace(/\/$/, ''); // Remove leading and trailing slashes
          }
          
          // If no valid slug from link, generate from title
          if (!slug) {
            slug = title ? slugify(title) : `course-${course.id}`;
          }

          const mappedCourse = {
            id: parseInt(course.id) || 0,
            slug: slug,
            title: title,
            description: courseDetails?.beschrijving || '',
            image: courseDetails?.afbeelding || null,
            category: course.branche || 'Algemeen',
            status: parseInt(course.aantal_gereserveerd) >= parseInt(course.maximum_aantal) ? 'vol' : 
                   parseInt(course.aantal_gereserveerd) >= parseInt(course.maximum_aantal) * 0.8 ? 'bijna_vol' : 'open',
            maxParticipants: parseInt(course.maximum_aantal) || null,
            currentParticipants: parseInt(course.aantal_gereserveerd) || 0,
            tijd: formatTimeRange(course.begintijd, course.eindtijd),
            duration: null, // Als er een specifiek veld voor duur is, hier toevoegen
            startDate: formatDate(course.datum) || 'Nader te bepalen',
            location: locationDetails?.naam || 'Online',
            price: course.verkoopprijs ? `€ ${parseFloat(course.verkoopprijs).toFixed(2)}` : 'Op aanvraag',
            soobSubsidie: course.SOOB ? `€ ${parseFloat(course.SOOB).toFixed(2)}` : null,
          };

          // Log mapped course data for debugging
          console.log('Mapped course:', JSON.stringify(mappedCourse, null, 2));

          return mappedCourse;
        });

        // Write to cache
        writeCoursesToCache(mappedCourses);
        
        return mappedCourses;
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
    
    // Als de cursus niet gevonden is, probeer alle cursussen opnieuw op te halen zonder cache
    console.log(`Course with slug ${slug} not found in cache, fetching fresh data...`);
    
    // Verwijder cache bestand als het bestaat
    if (fs.existsSync(COURSES_CACHE_FILE)) {
      fs.unlinkSync(COURSES_CACHE_FILE);
    }
    
    // Haal alle cursussen opnieuw op
    const freshCourses = await getCourses();
    return freshCourses.find(c => c.slug === slug) || null;
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