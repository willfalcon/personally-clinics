<?php

function geo_check_clinics($clinics) {
  $geo_check_clinics = array_map(function($clinic) {
    if (property_exists($clinic->fields, 'Location')) {
      return $clinic;
    }
    $new_record = geocode($clinic->id, $clinic->fields->Address);
    return $new_record;
  }, $clinics);
  return $geo_check_clinics;
}