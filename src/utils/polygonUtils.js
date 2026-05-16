import * as turf
  from "@turf/turf";

export function detectZone(
  point,
  zones
) {
  if (!point) return null;

  const turfPoint =
    turf.point([
      point.lng,
      point.lat,
    ]);

  for (const zone of zones) {
    try {
      const polygon =
        turf.polygon(
          zone.location.coordinates
        );

      const inside =
        turf.booleanPointInPolygon(
          turfPoint,
          polygon
        );

      if (inside) {
        return zone;
      }

    } catch (error) {
      console.error(
        "Polygon detection error",
        error
      );
    }
  }

  return null;
}