import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import MapFeatures from './MapFeatures';

const MapContext = createContext();
export const useMapContext = () => useContext(MapContext);

export default function App({ mapboxgl, styleUrl, width, mapboxToken, filterOptions, numResults, includeInfo, resultsCta }) {
  const mapContainer = useRef(null);
  const defaultLocation = [-90.185, 32.299];
  const [location, setLocation] = useState(defaultLocation);
  const fieldIds = [];
  const [map, setMap] = useState(null);

  useEffect(() => {
    // initialize map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: styleUrl || 'mapbox://styles/mapbox/streets-v12', // style URL
      center: defaultLocation,
      zoom: 8,
    });

    // Add ScaleControl
    const scale = new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: 'imperial',
    });
    map.addControl(scale, 'bottom-right');

    // Add NavigationControl
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');

    // Add GeolocateControl
    const geolocate = new mapboxgl.GeolocateControl();
    map.addControl(geolocate, 'bottom-right');
    geolocate.on('geolocate', e => {
      setLocation([e.coords.longitude, e.coords.latitude]);
    });
    setMap(map);

    return () => {
      map.remove();
      setMap(null);
    };
  }, []);

  // Effects for when the location changes.
  // const [locationMarker, setLocationMarker] = useState(null);
  useEffect(() => {
    function getLocationMarker() {
      // if (locationMarker) {
      //   return locationMarker;
      // }
      if (map) {
        const marker = new mapboxgl.Marker({ color: '#F26134', draggable: true }).setLngLat(location).addTo(map);
        marker.on('dragend', e => {
          const coords = e.target.getLngLat();
          setLocation([coords.lng, coords.lat]);
        });
        // setLocationMarker(marker);
        return marker;
      }
      return null;
    }
    const marker = getLocationMarker();

    return () => {
      if (marker) {
        marker.remove();
      }
    };
  }, [map, location]);

  const [filtersOpen, setFiltersOpen] = useState(filterOptions ? true : false);

  return (
    <MapContext.Provider
      value={{
        mapboxgl,
        mapboxToken,
        map,
        location,
        setLocation,
        fieldIds,
        filtersOpen,
        setFiltersOpen,
        filterOptions,
        numResults,
        includeInfo,
        resultsCta,
      }}
    >
      <div className="map-wrapper">
        <div
          className="map"
          style={{
            width: filtersOpen ? width - 500 : width - 250,
            left: filtersOpen ? 250 : 0,
            height: Math.round(width / (3 / 2)),
          }}
          ref={mapContainer}
        />
        {map && <MapFeatures filterOptions={filterOptions} map={map} location={location} />}
      </div>
    </MapContext.Provider>
  );
}
