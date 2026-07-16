import type { SavedPlace } from '@/data/mock';

export type Coordinate = { latitude: number; longitude: number; accuracy?: number };

export function distanceMeters(a: Coordinate, b: Coordinate): number {
  const radius = 6371e3;
  const p1 = (a.latitude * Math.PI) / 180;
  const p2 = (b.latitude * Math.PI) / 180;
  const dp = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dl = ((b.longitude - a.longitude) * Math.PI) / 180;
  const h = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function placeStatus(position: Coordinate, place: SavedPlace) {
  const distance = distanceMeters(position, place);
  const accuracy = position.accuracy ?? 20;
  const strictLimit = Math.max(10, place.confirmationDistance - accuracy * 0.35);

  if (distance <= strictLimit && accuracy <= place.confirmationDistance) {
    return {
      state: 'inside' as const,
      label: `En ${place.name}`,
      detail: `A ${Math.round(distance)} m del pin · precisión ±${Math.round(accuracy)} m`,
    };
  }

  if (distance <= place.confirmationDistance + accuracy) {
    return {
      state: 'uncertain' as const,
      label: `Cerca de ${place.name}`,
      detail: `A ${Math.round(distance)} m · esperando una lectura más precisa`,
    };
  }

  return {
    state: 'approaching' as const,
    label: `A ${Math.round(distance)} m de ${place.name}`,
    detail: `En camino · precisión ±${Math.round(accuracy)} m`,
  };
}

export function nearestPlace(position: Coordinate, savedPlaces: SavedPlace[]) {
  return savedPlaces
    .map((place) => ({ place, distance: distanceMeters(position, place) }))
    .sort((a, b) => a.distance - b.distance)[0];
}
