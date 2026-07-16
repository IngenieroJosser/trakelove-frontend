import { router } from 'expo-router';
import { BriefcaseBusiness, Church, Home, MapPin, MoreHorizontal, Plus, Users } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, PageHeader, Screen, SectionTitle, StatusPill } from '@/components/lovetrack/ui';
import { places } from '@/data/mock';
import { Palette, Radius } from '@/constants/theme';

const categoryIcon = {
  home: Home,
  work: BriefcaseBusiness,
  study: MapPin,
  family: Users,
  other: Church,
};

export default function PlacesScreen() {
  return (
    <Screen>
      <PageHeader
        title="Lugares"
        subtitle="Guarda el pin exacto de cada sitio para evitar confundir lugares cercanos."
        action={<Pressable onPress={() => router.push('/add-place')} style={styles.addButton}><Plus size={22} color={Palette.white} /></Pressable>}
      />

      <View style={styles.explanation}>
        <MapPin size={22} color={Palette.primary} fill={`${Palette.primary}16`} />
        <View style={styles.explanationCopy}>
          <Text style={styles.explanationTitle}>Un pin por lugar</Text>
          <Text style={styles.explanationText}>Casa, iglesia y casa de tu hermana se identifican por coordenadas distintas, aunque estén cerca.</Text>
        </View>
      </View>

      <SectionTitle title="Lugares guardados" action={<StatusPill label={`${places.length} activos`} tone="success" />} />
      <View style={styles.list}>
        {places.map((place) => {
          const Icon = categoryIcon[place.category];
          return (
            <Card key={place.id} style={styles.placeCard} onPress={() => router.push('/place-details')}>
              <View style={[styles.placeIcon, { backgroundColor: `${place.color}17` }]}><Icon size={22} color={place.color} strokeWidth={2.3} /></View>
              <View style={styles.placeCopy}>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.address}>{place.address}</Text>
                <Text style={styles.confirmation}>Llegada confirmada dentro de {place.confirmationDistance} m del pin</Text>
              </View>
              <Pressable style={styles.moreButton}><MoreHorizontal size={20} color={Palette.inkMuted} /></Pressable>
            </Card>
          );
        })}
      </View>

      <Pressable onPress={() => router.push('/add-place')} style={styles.addPlaceCard}>
        <View style={styles.plusCircle}><Plus size={22} color={Palette.primary} /></View>
        <View style={styles.addCopy}><Text style={styles.addTitle}>Añadir otro lugar</Text><Text style={styles.addText}>Selecciona el punto exacto directamente sobre el mapa.</Text></View>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  addButton: { width: 46, height: 46, borderRadius: 16, backgroundColor: Palette.primary, alignItems: 'center', justifyContent: 'center' },
  explanation: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, borderRadius: Radius.lg, backgroundColor: Palette.lavender, padding: 15 },
  explanationCopy: { flex: 1 },
  explanationTitle: { fontSize: 14, lineHeight: 18, fontWeight: '900', color: Palette.ink },
  explanationText: { fontSize: 12, lineHeight: 18, color: Palette.inkMuted, marginTop: 4 },
  list: { gap: 12 },
  placeCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  placeIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  placeCopy: { flex: 1 },
  placeName: { fontSize: 15, lineHeight: 19, fontWeight: '900', color: Palette.ink },
  address: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 3 },
  confirmation: { fontSize: 10, lineHeight: 15, color: Palette.primary, fontWeight: '700', marginTop: 5 },
  moreButton: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#F5F2F7', alignItems: 'center', justifyContent: 'center' },
  addPlaceCard: { minHeight: 78, borderRadius: Radius.lg, borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#CFC4E5', flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14 },
  plusCircle: { width: 46, height: 46, borderRadius: 15, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  addCopy: { flex: 1 },
  addTitle: { fontSize: 14, fontWeight: '900', color: Palette.primary },
  addText: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 3 },
});
