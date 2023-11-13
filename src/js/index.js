import React from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';

import './style.scss';
import App from './App';

async function initMap() {
  const res = await fetch('/wp-json/clinic-finder/v2/get-options').then(res => res.json());
  const { mapbox_access_token, number_of_results, style_url, filter_options, include_info, results_cta } = res;
  mapboxgl.accessToken = mapbox_access_token;

  const container = document.querySelector('#clinicfinder');
  const sizes = container.getBoundingClientRect();

  container.style.marginBottom = '50px';
  const root = createRoot(container);

  root.render(
    <App
      mapboxgl={mapboxgl}
      styleURL={style_url}
      width={sizes.width - 40}
      mapboxToken={mapbox_access_token}
      filterOptions={filter_options}
      numResults={number_of_results}
      includeInfo={include_info}
      resultsCta={results_cta}
    />
  );
}

initMap();
