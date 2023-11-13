<?php

function fetch_fields($all = false) {

  $url = "https://api.airtable.com/v0/" . get_field('airtable_app_id', 'options') . "/Clinics?view=Grid%20view";
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $headers = array(
    "Authorization: Bearer " . get_field( 'airtable_api_key', 'options' ),
  );
  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  $resp = curl_exec($curl);
  curl_close($curl);
  $records = json_decode($resp)->records;

  $fields = array();

  foreach($records as $record) {
    $fields_array = (array) $record->fields;
    // array_push($fields, $fields_array);

    foreach($fields_array as $key => $value) {
      
      if ($all || ($key != 'Name of Clinic' && $key != 'Address' && $key != 'Phone Number' && $key != 'Website' && $key != 'Clinic Open?' && $key != 'Hours Open' && $key != 'Location' && $key != 'lat' && $key != 'lng')) {
        
        if (!array_key_exists($key, $fields)) {
          $fields[$key] = array();
        } 

        if (!in_array($value, $fields[$key])) {
          array_push($fields[$key], $value);
        }

        
      }
    }
  }

  ksort($fields);

  return $fields;
}