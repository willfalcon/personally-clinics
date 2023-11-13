import { useState, useEffect } from 'react';
import clinicFiltersWithinMap from './clinicFiltersWithinMap';
import sortClinics from './sortClinics';
import getClinics from './getClinics';
import getFilters from './getFilters';
import filterClinics from './filterClinics';
import { useMapContext } from '../App';

export default function useClinics(filterOptions, map) {
  // main list of all clinics
  const [clinicStore, setClinicStore] = useState([]);
  const { location } = useMapContext();
  // runs once on first render, gets clinicStore and saves
  useEffect(() => {
    async function initialGetClinics() {
      const clinics = await getClinics();
      setClinicStore(clinics);
      setLocationsList(clinics);
    }
    initialGetClinics();
  }, []);

  // tracks what filers are set in the frontend ui
  const [selectedFilters, setSelectedFilters] = useState({});

  // update locations in bounds after map moves
  useEffect(() => {
    const moveHandler = () => {
      setLocationsList(clinicStore);
    };
    map.on('moveend', moveHandler);

    () => {
      map.off('moveend', moveHandler);
    };
  }, [clinicStore, selectedFilters, location]);

  // locations sent to the map to be rendered
  const [clinics, setClinics] = useState([]);

  function setLocationsList(calledClinics) {
    const filters = getFilters(selectedFilters, filterOptions);

    const filteredClinics = filterClinics(calledClinics, filters);

    const boundedClinics = clinicFiltersWithinMap(filteredClinics, map);
    const sortedBoundedClinics = sortClinics(boundedClinics, location);

    setClinics(sortedBoundedClinics);
  }

  // recalculate clinics rendered to map every time filters change
  useEffect(() => {
    setLocationsList(clinicStore);
  }, [selectedFilters]);

  return { selectedFilters, setSelectedFilters, clinics };
}
