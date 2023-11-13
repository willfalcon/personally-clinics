<?php
/*
  Plugin Name: Clinic Finder
  Description: Filterable Clinic Finder Plugin for pulling from shared list of clinics.
  Version: 1.2.4
  Author: Creative Distillery
  Author URI: https://creativedistillery.com
*/


//--- Include ACF Files ---//

// Define path and URL to the ACF plugin.
define( 'CDHQ_ACF_PATH', plugin_dir_path( __FILE__ ) . '/inc/acf/' );
define( 'CDHQ_ACF_URL', plugin_dir_url( __FILE__ ) . '/inc/acf/' );
// Include the ACF plugin.
include_once( CDHQ_ACF_PATH . 'acf.php' );

// Customize the url setting to fix incorrect asset URLs.
add_filter('acf/settings/url', 'CDHQ_acf_settings_url');
function CDHQ_acf_settings_url( $url ) {
    return CDHQ_ACF_URL;
}

//--- Add Options Page ---//

if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page(array(
		'page_title' 	=> 'Clinic Finder',
    'position' => 57.33
	));

}

include_once( plugin_dir_path( __FILE__ ) . '/fields.php' );


//-- Enqueue and manage assets --//
function cdhq_enqueue_menu_assets() {
  $ver = get_plugin_data( plugin_dir_path( __FILE__ ) . 'clinic-finder.php' )['Version'];

  wp_enqueue_style( 'mapbox-styles', 'https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css' );
  // wp_enqueue_style( 'clinic-finder-build-styles', plugin_dir_url( __FILE__)  . 'dist/styles.css', array(), $ver );
  // wp_enqueue_script( 'clinic-finder-build-js', plugin_dir_url( __FILE__)  . 'dist/build.js', array(), $ver, true );
}

add_action( 'wp_enqueue_scripts', 'cdhq_enqueue_menu_assets' );


//-- Pretty Print Function --//
include_once('inc/pp.php');

function clinic_finder_register_blocks() {
  acf_register_block_type(array(
    'name' => 'clinic-finder-block',
    'title' => 'Clinic Finder Block',
    'description' => 'Filterable Clinic Finder',
    'render_template' => plugin_dir_path( __FILE__ ) . 'clinic-finder-block.php',
    // 'category' => 'converge',
    'mode' => 'preview'
  ));
};

if (function_exists('acf_register_block')) {
  add_action('acf/init', 'clinic_finder_register_blocks');
}

if ( ! function_exists('write_log')) {
  function write_log ( $log )  {
     if ( is_array( $log ) || is_object( $log ) ) {
        error_log( print_r( $log, true ) );
     } else {
        error_log( $log );
     }
  }
}

include_once( plugin_dir_path( __FILE__ ) . '/api/index.php' );
include_once( plugin_dir_path( __FILE__ ) . '/api/v2/index.php' );

add_action( 'rest_api_init', function () {
  register_rest_route( 'clinic-finder/v1', '/get-clinics', array(
    'methods' => 'POST',
    'callback' => 'get_clinics',
    'permission_callback' => '__return_true'
  ) );
  register_rest_route( 'clinic-finder/v2', '/get-clinics', array(
    'methods' => 'POST',
    'callback' => 'v2_get_clinics',
    'permission_callback' => '__return_true'
  ) );
  register_rest_route( 'clinic-finder/v1', '/get-fields', array(
    'methods' => 'GET',
    'callback' => 'fetch_fields',
    'permission_callback' => '__return_true'
  ) );
  register_rest_route( 'clinic-finder/v1', '/get-field-options', array(
    'methods' => 'POST',
    'callback' => 'fetch_field_options',
    'permission_callback' => '__return_true'
  ) );
  register_rest_route( 'clinic-finder/v2', '/get-options', array(
    'methods' => 'GET',
    'callback' => 'fetch_options',
    'permission_callback' => '__return_true'
  ) );
  
} );


function set_airtable_field_filters( $field ) {
    
  // reset choices
  $field['choices'] = array();

  $fields = fetch_fields();
  

  foreach($fields as $key => $options) {
                          
      // append to choices
      $field['choices'][ $key ] = $key;
      
  }

  // return the field
  return $field;
  
}

function set_airtable_field_filters_all( $field ) {
    
  // reset choices
  $field['choices'] = array();

  $fields = fetch_fields(true);
  

  foreach($fields as $key => $options) {
                          
      // append to choices
      $field['choices'][ $key ] = $key;
      
  }

  // return the field
  return $field;
  
}

add_filter('acf/load_field/name=airtable_field_filter', 'set_airtable_field_filters');
add_filter('acf/load_field/name=admin_filter_field', 'set_airtable_field_filters');
add_filter('acf/load_field/name=include_airtable_field', 'set_airtable_field_filters_all');

add_action('acf/input/admin_enqueue_scripts', 'set_airtable_field_options');

function set_airtable_field_options() {
  $ver = get_plugin_data( plugin_dir_path( __FILE__ ) . 'clinic-finder.php' )['Version'];
  wp_enqueue_script( 'clinic-finder-option-page-js', plugin_dir_url( __FILE__)  . 'dist/clinic-finder-options.js', array(), $ver, true );
}
