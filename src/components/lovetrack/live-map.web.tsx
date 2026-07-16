import { MapPin, Navigation } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import type { Person, SavedPlace } from '@/data/mock';
import { Palette, Radius } from '@/constants/theme';

type LiveMapProps = { me: Person; partner: Person; places: SavedPlace[] };

export function LiveMap({ partner, places }: LiveMapProps) {
  return (
    <View style={styles.map}>
      <View style={styles.roadHorizontal} />
      <View style={styles.roadVertical} />
      {places.slice(0, 3).map((place, index) => (
        <View key={place.id} style={[styles.place, { left: `${22 + index * 24}%`, top: `${30 + (index % 2) * 22}%` }]}>
          <MapPin size={22} color={place.color} fill={`${place.color}22`} />
          <Text style={styles.placeText}>{place.name}</Text>
        </View>
      ))}
      <View style={styles.partner}>
        <Text style={styles.partnerText}>{partner.initials}</Text>
        <View style={styles.direction}><Navigation size={10} color={Palette.white} fill={Palette.white} /></View>
      </View>
      <Text style={styles.webHint}>Vista previa del mapa · en Android/iOS usa Google Maps o Apple Maps</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#EAF1ED', overflow: 'hidden' },
  roadHorizontal: { position: 'absolute', top: '48%', left: -80, width: '130%', height: 52, backgroundColor: Palette.white, transform: [{ rotate: '-8deg' }] },
  roadVertical: { position: 'absolute', top: -80, left: '58%', width: 46, height: '130%', backgroundColor: Palette.white, transform: [{ rotate: '12deg' }] },
  place: { position: 'absolute', alignItems: 'center', gap: 2 },
  placeText: { fontSize: 11, fontWeight: '800', color: Palette.ink, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 3 },
  partner: { position: 'absolute', left: '58%', top: '38%', width: 48, height: 48, borderRadius: 24, backgroundColor: Palette.secondary, borderWidth: 4, borderColor: Palette.white, alignItems: 'center', justifyContent: 'center' },
  partnerText: { color: Palette.white, fontWeight: '900' },
  direction: { position: 'absolute', right: -7, bottom: -2, width: 21, height: 21, borderRadius: 11, backgroundColor: Palette.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Palette.white },
  webHint: { position: 'absolute', alignSelf: 'center', bottom: 280, backgroundColor: 'rgba(25,21,40,0.78)', color: Palette.white, fontSize: 11, borderRadius: Radius.pill, paddingHorizontal: 12, paddingVertical: 7 },
});
