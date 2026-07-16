import { MapPin, Navigation } from 'lucide-react-native';
import MapView, { Marker, Polyline, type Region } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';

import type { Person, SavedPlace } from '@/data/mock';
import { Palette, Shadow } from '@/constants/theme';

type LiveMapProps = {
  me: Person;
  partner: Person;
  places: SavedPlace[];
  onRegionChangeComplete?: (region: Region) => void;
};

export function LiveMap({ me, partner, places, onRegionChangeComplete }: LiveMapProps) {
  const region: Region = {
    latitude: (me.latitude + partner.latitude) / 2,
    longitude: (me.longitude + partner.longitude) / 2,
    latitudeDelta: 0.0065,
    longitudeDelta: 0.0065,
  };

  return (
    <MapView
      style={StyleSheet.absoluteFill}
      initialRegion={region}
      onRegionChangeComplete={onRegionChangeComplete}
      showsUserLocation
      showsMyLocationButton={false}
      showsCompass={false}
      toolbarEnabled={false}
      mapPadding={{ top: 84, right: 20, bottom: 265, left: 20 }}
    >
      <Polyline
        coordinates={[
          { latitude: partner.latitude, longitude: partner.longitude },
          { latitude: places[0].latitude, longitude: places[0].longitude },
        ]}
        strokeColor={Palette.secondary}
        strokeWidth={4}
        lineDashPattern={[10, 8]}
      />

      {places.map((place) => (
        <Marker
          key={place.id}
          coordinate={{ latitude: place.latitude, longitude: place.longitude }}
          title={place.name}
          description={`${place.address} · confirmación exacta a ${place.confirmationDistance} m`}
          tracksViewChanges={false}
        >
          <View style={[styles.placeMarker, { borderColor: place.color }]}>
            <MapPin size={19} color={place.color} fill={`${place.color}22`} strokeWidth={2.6} />
          </View>
        </Marker>
      ))}

      <Marker
        coordinate={{ latitude: partner.latitude, longitude: partner.longitude }}
        title={partner.name}
        description={`Actualizada ${partner.updatedAt} · precisión ±${partner.accuracy} m`}
        tracksViewChanges={false}
      >
        <View style={styles.personMarkerWrap}>
          <View style={styles.personMarkerPulse} />
          <View style={styles.personMarker}>
            <Text style={styles.personInitials}>{partner.initials}</Text>
          </View>
          <View style={styles.directionBadge}>
            <Navigation size={10} color={Palette.white} fill={Palette.white} />
          </View>
        </View>
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  placeMarker: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: Palette.white,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.soft,
  },
  personMarkerWrap: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  personMarkerPulse: { position: 'absolute', width: 58, height: 58, borderRadius: 29, backgroundColor: 'rgba(255,77,141,0.18)' },
  personMarker: { width: 44, height: 44, borderRadius: 22, borderWidth: 4, borderColor: Palette.white, backgroundColor: Palette.secondary, alignItems: 'center', justifyContent: 'center', ...Shadow.floating },
  personInitials: { color: Palette.white, fontWeight: '900', fontSize: 13 },
  directionBadge: { position: 'absolute', right: 3, bottom: 7, width: 22, height: 22, borderRadius: 11, backgroundColor: Palette.primary, borderWidth: 2, borderColor: Palette.white, alignItems: 'center', justifyContent: 'center' },
});
