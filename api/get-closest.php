<?php

function get_closest($clinics, $numResults) {
  
  usort($clinics, function($a, $b) {
    return $a->distance - $b->distance;
  });
  return array_slice($clinics, 0, $numResults);

}
