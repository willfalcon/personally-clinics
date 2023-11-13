<?php

function update_record($id, $location) {
  $url = "https://api.airtable.com/v0/" . get_field('airtable_app_id', 'options') . "/Clinics?view=Grid%20view";

  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PATCH');
  
  $headers = array(
    "Authorization: Bearer " . get_field( 'airtable_api_key', 'options' ),
     "Content-Type: application/json",
  );
  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  
  $data = [
    "records" => [
      [
        "id" => $id,
        "fields" => [
          "Location" => join(',', $location)
        ]
      ]
    ]  
  ];

  curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));

  $raw_resp = curl_exec($curl);
  curl_close($curl);
  $resp = json_decode($raw_resp);
  
  return $resp->records[0];

}