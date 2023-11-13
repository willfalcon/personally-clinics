<?php


function fetch_options() {
  $mapbox_access_token = get_field( 'mapbox_access_token', 'options' );
  $number_of_results = get_field( 'number_of_results', 'options' );
  $style_url = get_field( 'style_url', 'options' );
  $filter_options = get_field( 'filter_options', 'options' );
  $include_info = get_field( 'include_info', 'options' );
  $results_cta = get_field( 'results_list_cta', 'options' );
  return array(
    'mapbox_access_token' => $mapbox_access_token,
    'number_of_results' => $number_of_results,
    'style_url' => $style_url,
    'filter_options' => $filter_options,
    'include_info' => $include_info,
    'results_cta' => $results_cta
  );
}