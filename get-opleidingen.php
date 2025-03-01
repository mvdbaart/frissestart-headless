<?php
/**
 * API Endpoint to fetch courses from wp_opleidingen table
 * 
 * Place this file in the WordPress theme directory: wp-content/themes/frissestart/api/get-opleidingen.php
 */

// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Load WordPress
$wp_load_path = realpath(dirname(__FILE__) . '/../../../../wp-load.php');
if (file_exists($wp_load_path)) {
    require_once($wp_load_path);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'WordPress core not found']);
    exit;
}

// Check if user is allowed to access this endpoint
if (!function_exists('wp_get_current_user')) {
    http_response_code(500);
    echo json_encode(['error' => 'WordPress functions not available']);
    exit;
}

// Function to get courses from the database
function get_courses() {
    global $wpdb;
    
    // Get the table name with prefix
    $table_name = $wpdb->prefix . 'opleidingen';
    
    // Check if the table exists
    $table_exists = $wpdb->get_var("SHOW TABLES LIKE '$table_name'");
    
    if (!$table_exists) {
        return ['error' => 'Table does not exist'];
    }
    
    // Get current date in MySQL format
    $current_date = date('Y-m-d');
    
    // Query to get all courses with start_date >= current date or start_date is empty
    $query = $wpdb->prepare(
        "SELECT * FROM $table_name 
         WHERE (start_date >= %s OR start_date = '' OR start_date IS NULL)
         ORDER BY start_date ASC",
        $current_date
    );
    
    $courses = $wpdb->get_results($query, ARRAY_A);
    
    if (empty($courses)) {
        return [];
    }
    
    // Process courses data
    foreach ($courses as &$course) {
        // Format the data
        $course['id'] = intval($course['id']);
        
        // Generate slug if not present
        if (empty($course['slug'])) {
            $course['slug'] = sanitize_title($course['title']) . '-' . $course['id'];
        }
        
        // Add default image if not present
        if (empty($course['image'])) {
            $course['image'] = 'https://opleidingen.frissestart.nl/wp-content/uploads/2023/06/persoonlijke-ontwikkeling.jpg';
        }
        
        // Format price with euro sign if not empty
        if (!empty($course['price']) && is_numeric($course['price'])) {
            $course['price'] = '€' . number_format((float)$course['price'], 2, ',', '.');
        } else {
            $course['price'] = 'Op aanvraag';
        }
        
        // Set default status if not present
        if (empty($course['status'])) {
            $course['status'] = 'open';
        }
        
        // Convert numeric fields
        if (isset($course['max_participants'])) {
            $course['max_participants'] = intval($course['max_participants']);
        }
        
        if (isset($course['current_participants'])) {
            $course['current_participants'] = intval($course['current_participants']);
        }
    }
    
    return $courses;
}

// Get and return the courses
$courses = get_courses();
echo json_encode($courses);