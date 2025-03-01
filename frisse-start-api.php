<?php
/**
 * Plugin Name: Frisse Start API
 * Description: Custom REST API endpoints for Frisse Start Opleidingen
 * Version: 1.0
 * Author: Frisse Start
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class Frisse_Start_API {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }
    
    /**
     * Register REST API routes
     */
    public function register_routes() {
        register_rest_route('custom/v1', '/opleidingen', [
            'methods' => 'GET',
            'callback' => [$this, 'get_opleidingen'],
            'permission_callback' => '__return_true',
        ]);
    }
    
    /**
     * Get opleidingen from the database
     */
    public function get_opleidingen($request) {
        global $wpdb;
        
        // Get the table name with prefix
        $table_name = $wpdb->prefix . 'opleidingen';
        
        // Check if the table exists
        $table_exists = $wpdb->get_var("SHOW TABLES LIKE '$table_name'");
        
        if (!$table_exists) {
            return new WP_Error('no_table', 'The opleidingen table does not exist', ['status' => 404]);
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
}

// Initialize the plugin
new Frisse_Start_API();