<?php

function get_distance_matrix($mylocation, $clinics) {
  write_log('running distance matrix request');
  
  global $location;
  $location = join(',', $mylocation);
  
  $split_destinations = array(array());
  $split_index = 0;
  $i= 0; forEach($clinics as $clinic) {
    array_push($split_destinations[$split_index], $clinic);
    if (($i + 1) % 24 == 0) {
      $split_destinations[] = array();
      $split_index++;
    }
    $i++;
  }
  
  $all_clinics_with_distance = array();

  $arrays_of_clinics = array_map(function($clinics) {

    $destinations = array_map(function($clinic) {
      return $clinic->fields->Location;
    }, $clinics);
    $destinations = join(';', $destinations);
    global $location;
    $url = "https://api.mapbox.com/directions-matrix/v1/mapbox/driving/" . $location . ';' . $destinations;
    $mapbox_token = get_field('mapbox_token', 'options');
    $url .= '?access_token=' . $mapbox_token;
    $url .= '&sources=' . '0';
    $indeces = array();
    $i = 0; foreach($clinics as $clinic) {
      $indeces[$i] = $i + 1;
      $i++;
    }
    $url .= '&destinations=' . join(';', $indeces);
    $url .= '&annotations=distance';
    
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $raw_resp = curl_exec($curl);
    curl_close($curl);
    $matrix = json_decode($raw_resp);
    global $distances;
    $distances = $matrix->distances[0];
    global $i;
    $i = 0;
    return array_map(function($clinic) {
      global $distances;
      global $i;
      
      $clinic->distance = $distances[$i];
      $i++;
      return $clinic;
    }, $clinics);
    
  }, $split_destinations);
  
  
  foreach ($arrays_of_clinics as $array) {
    foreach ($array as $clinic) {
      array_push($all_clinics_with_distance, $clinic);
    }
  }
  return $all_clinics_with_distance;
}