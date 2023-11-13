<?php 
function call_airtable($query) {
  $url = "https://api.airtable.com/v0/" . get_field('airtable_app_id', 'options') . "/Clinics?view=Grid%20view" . $query;
  
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $headers = array(
    "Authorization: Bearer " . get_field( 'airtable_api_key', 'options' ),
  );
  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  $resp = curl_exec($curl);
  curl_close($curl);
  
  return $resp;
}
