<?php 
function v2_get_clinics($request) {

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


  // $raw_clinics = call_airtable($filter_param);
  // $clinics = json_decode($raw_clinics);

  // if (property_exists($clinics, 'offset')) {
  //   $raw_more_clinics = call_airtable("&offset=" . $clinics->offset . $filter_param);
  //   $more_clinics = json_decode($raw_more_clinics);
  //   $clinics = array_merge($clinics->records, $more_clinics->records);
  //   if (property_exists($more_clinics, 'offset')) {
  //     $raw_even_more_clinics = call_airtable("&offset=" . $more_clinics->offset . $filter_param);
  //     $even_more_clinics = json_decode($raw_even_more_clinics);
  //     $clinics = array_merge($clinics, $even_more_clinics->records);
  //     // write_log($even_more_clinics);
      
  //   }
  // } else {
  //   $clinics = $clinics->records;
  // }

  function get_all_clinics() {
    $more = true;
    $offset = '';
    $clinics_arr = array();
    while ($more == true) {
      $raw_batch = call_airtable($offset);
      $batch = json_decode($raw_batch);
      $clinics_arr = array_merge($clinics_arr, $batch->records);
      if (!property_exists($batch, 'offset')) {
        $more = false;
      } else {
        $offset = '&offset=' . $batch->offset;
      }
    }
    return $clinics_arr;
  }

  $clinics = get_all_clinics();

  global $admin_filter;
  $admin_filter = get_field('admin_filters', 'options');
  $clinics = $admin_filter ? array_filter($clinics, function($clinic) {
    $fields = (array) $clinic->fields;
    // $admin_filter = get_field('admin_filters', 'options');
    global $admin_filter;
    // write_log($admin_filter);
    // write_log($fields);
    foreach ($admin_filter as $filter) {
      if (! array_key_exists($filter['admin_filter_field'], $fields) || ! in_array($fields[$filter['admin_filter_field']], $filter['admin_filter_field_values'])) {
        return false;
        break;
      }
    }
    return true;
  }) : $clinics; 

  $clinics = array_values($clinics);

  

  $clinics = geo_check_clinics($clinics);
  return $clinics;
};