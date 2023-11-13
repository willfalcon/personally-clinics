import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { polygon } from '@turf/helpers';

export default function clinicFiltersWithinMap(clinics, map) {
  const bounds = map.getBounds();
  const boundsGeometry = polygon([
    [
      [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
      [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
      [bounds.getSouthEast().lng, bounds.getSouthEast().lat],
      [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
      [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
    ],
  ]);
  return clinics.filter(clinic => {
    if (!clinic) return false;
    return booleanPointInPolygon(clinic.fields.Location.split(','), boundsGeometry);
  });
}
