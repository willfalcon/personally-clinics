import distance from '@turf/distance';
import { point } from '@turf/helpers';
export default function sortClinics(clinics, toLocation, numResults) {
  if (!toLocation) {
    console.log('no location set. leaving order of clinics as-is');
    return clinics;
  }

  const clinicsWithDistance = clinics
    .filter(clinic => {
      return clinic && !!clinic.fields.Location;
    })
    .map(clinic => {
      const from = point(clinic.fields.Location.split(','));

      const to = point(toLocation);
      const options = { units: 'miles' };
      const dist = distance(from, to, options);
      return {
        ...clinic,
        distance: dist,
      };
    });
  return clinicsWithDistance.sort((a, b) => a.distance - b.distance);
}
