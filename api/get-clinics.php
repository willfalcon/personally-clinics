<?php

function get_clinics($request) {
  
  $body = json_decode($request->get_body());
  
  $formula = $body->query;
  
  $query = '';
  if ($formula) {
    $expressions = array_map(function($filter) {
      return '{' . $filter->label . '} = "' . $filter->value . '"';
    }, $formula);

    $query = count($expressions) > 1 ? 'AND(' . join(',', $expressions) . ')' : $expressions[0];  
  }
  $filter_param = '';

  if (!empty($query)) {
    $filter_param = "&filterByFormula=" . urlencode($query);
  }
  $raw_clinics = call_airtable($filter_param);
  $clinics = json_decode($raw_clinics);
  
  if (property_exists($clinics, 'offset')) {
    $raw_more_clinics = call_airtable("&offset=" . $clinics->offset . $filter_param);
    $more_clinics = json_decode($raw_more_clinics);
    $clinics = array_merge($clinics->records, $more_clinics->records);
  } else {
    $clinics = $clinics->records;
  }

  
  $clinics = geo_check_clinics($clinics);
  
  if (property_exists($body, 'location')) {
    $clinics = get_distance_matrix($body->location, $clinics);
    $clinics = get_closest($clinics, $body->numResults);
  }
  return json_encode($clinics);
  
}