export type Person = {
  id: string;
  name: string;
  initials: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  battery: number;
  connected: boolean;
  updatedAt: string;
  speedKmh: number;
};

export type SavedPlace = {
  id: string;
  name: string;
  category: 'home' | 'work' | 'study' | 'family' | 'other';
  address: string;
  latitude: number;
  longitude: number;
  confirmationDistance: number;
  color: string;
};

export const me: Person = {
  id: 'me',
  name: 'Josser',
  initials: 'JC',
  latitude: 5.69294,
  longitude: -76.65688,
  accuracy: 9,
  battery: 82,
  connected: true,
  updatedAt: 'Ahora',
  speedKmh: 0,
};

export const partner: Person = {
  id: 'partner',
  name: 'Mi amor',
  initials: 'AM',
  latitude: 5.69421,
  longitude: -76.65758,
  accuracy: 12,
  battery: 64,
  connected: true,
  updatedAt: 'hace 18 s',
  speedKmh: 14,
};

export const places: SavedPlace[] = [
  {
    id: 'home',
    name: 'Casa',
    category: 'home',
    address: 'Barrio La Yesquita, Quibdó',
    latitude: 5.69518,
    longitude: -76.65814,
    confirmationDistance: 25,
    color: '#7C3AED',
  },
  {
    id: 'church',
    name: 'Iglesia',
    category: 'other',
    address: 'Carrera 4, Quibdó',
    latitude: 5.69476,
    longitude: -76.65742,
    confirmationDistance: 20,
    color: '#FF4D8D',
  },
  {
    id: 'sister',
    name: 'Casa de mi hermana',
    category: 'family',
    address: 'Sector El Jardín, Quibdó',
    latitude: 5.69502,
    longitude: -76.65686,
    confirmationDistance: 18,
    color: '#1F9D6A',
  },
  {
    id: 'work',
    name: 'Trabajo',
    category: 'work',
    address: 'Centro, Quibdó',
    latitude: 5.69188,
    longitude: -76.66019,
    confirmationDistance: 30,
    color: '#D97706',
  },
];

export const timeline = [
  { id: '1', time: '6:42 p. m.', title: 'Llegó a Iglesia', detail: 'A 11 m del pin · precisión ±7 m', duration: '36 min', tone: 'arrival' as const },
  { id: '2', time: '6:06 p. m.', title: 'Salió de Casa de mi hermana', detail: 'Salida confirmada después de 2 lecturas', duration: '8 min', tone: 'departure' as const },
  { id: '3', time: '5:18 p. m.', title: 'Llegó a Casa de mi hermana', detail: 'A 9 m del pin · precisión ±6 m', duration: '48 min', tone: 'arrival' as const },
  { id: '4', time: '4:53 p. m.', title: 'En camino', detail: 'Recorrido de 2,4 km · 25 min', duration: '', tone: 'travel' as const },
  { id: '5', time: '4:21 p. m.', title: 'Salió de Trabajo', detail: 'Última lectura dentro del lugar: 4:20 p. m.', duration: '32 min', tone: 'departure' as const },
];

export const notifications = [
  { id: 'n1', title: 'Llegada a Casa', subtitle: 'Avísame cuando la llegada sea confirmada', enabled: true, place: 'Casa' },
  { id: 'n2', title: 'Salida de Casa', subtitle: 'Requiere dos lecturas fuera del lugar', enabled: true, place: 'Casa' },
  { id: 'n3', title: 'Llegada a Iglesia', subtitle: 'Confirmar dentro de 20 m del pin', enabled: true, place: 'Iglesia' },
  { id: 'n4', title: 'Llegada a Casa de mi hermana', subtitle: 'Confirmar dentro de 18 m del pin', enabled: false, place: 'Casa de mi hermana' },
];
