import React, { createContext, useContext } from 'react';
import Filters from './Filters/Filters';
import useClinics from './clinicUtils/useClinics';
import ResultsList from './ResultsList/ResultsList';
import SearchBox from './SearchBox';

const MapFeatureContext = createContext();

export const useMapFeatureContext = () => useContext(MapFeatureContext);

export default function MapFeatures({ filterOptions, map, location }) {
  const { selectedFilters, setSelectedFilters, clinics } = useClinics(filterOptions, map, location);

  return (
    <>
      {filterOptions && <Filters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />}
      <ResultsList clinics={clinics} />
      <SearchBox />
    </>
  );
}
