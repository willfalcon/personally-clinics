<?php
function geocode($id, $address) {
  $mapbox_token = get_field('mapbox_access_token', 'options');
  write_log($mapbox_token);
  $url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' . urlencode($address) . '.json';
  $url .= '?access_token=' . $mapbox_token;
  $url .= '&country=us';
  $url .= '&autocomplete=false';

  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $raw_resp = curl_exec($curl);
  curl_close($curl);
  $resp = json_decode($raw_resp);
  write_log('geocode response: ');
  write_log($resp);
  $location = $resp->features[0]->center;
  
  $newRecord = update_record($id, $location);
  return $newRecord;
  
}