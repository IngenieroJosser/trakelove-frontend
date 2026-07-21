import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  BriefcaseBusiness,
  Church,
  Heart,
  Home,
  MapPin,
  MoreHorizontal,
  Navigation,
  Plus,
  ShieldCheck,
  Users,
} from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, PageHeader, Screen, SectionTitle, StatusPill } from '@/components/lovetrack/ui';
import { Palette, Radius, Shadow } from '@/constants/theme';
import { places } from '@/data/mock';

const categoryIcon = {
  home: Home,
  work: BriefcaseBusiness,
  study: MapPin,
  family: Users,
  other: Church,
};

function HeartPin() {
  return (
    <View style={styles.heartPin}>
      <MapPin size={25} color={Palette.primary} strokeWidth={2.5} />
      <Heart size={9} color={Palette.secondary} fill={Palette.secondary} style={styles.heartInsidePin} />
    </View>
  );
}

export default function PlacesScreen() {
  return (
    <View style={styles.root}>
      <Screen>
        <PageHeader
          title="Lugares"
          subtitle="Define la entrada exacta de cada sitio y evita llegadas falsas cuando hay lugares cercanos."
          action={<StatusPill label={`${places.length} activos`} tone="success" />}
        />

        <LinearGradient
          colors={[`${Palette.secondary}12`, `${Palette.primary}12`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroIcon}>
            <HeartPin />
          </View>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>UBICACIONES PRECISAS</Text>
            <Text style={styles.heroTitle}>Un punto exacto para cada lugar</Text>
            <Text style={styles.heroText}>
              LoveTrack diferencia casa, iglesia, universidad o la casa de un familiar aunque estén a pocos metros.
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.insightRow}>
          <View style={styles.insightCard}>
            <Navigation size={19} color={Palette.primary} />
            <Text style={styles.insightValue}>Entrada exacta</Text>
            <Text style={styles.insightLabel}>Portería, puerta o acceso principal</Text>
          </View>
          <View style={styles.insightCard}>
            <ShieldCheck size={19} color={Palette.success} />
            <Text style={styles.insightValue}>Modo estricto</Text>
            <Text style={styles.insightLabel}>Precisión y permanencia verificadas</Text>
          </View>
        </View>

        <SectionTitle title="Lugares guardados" />
        <View style={styles.list}>
          {places.map((place) => {
            const Icon = categoryIcon[place.category];
            return (
              <Card key={place.id} style={styles.placeCard} onPress={() => router.push('/place-details')}>
                <View style={[styles.placeIcon, { backgroundColor: `${place.color}14` }]}>
                  <Icon size={22} color={place.color} strokeWidth={2.3} />
                </View>
                <View style={styles.placeCopy}>
                  <View style={styles.placeTitleRow}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <View style={styles.activeDot} />
                  </View>
                  <Text style={styles.address} numberOfLines={1}>{place.address}</Text>
                  <View style={styles.ruleRow}>
                    <MapPin size={12} color={Palette.primary} />
                    <Text style={styles.confirmation}>Confirmación a {place.confirmationDistance} m del punto exacto</Text>
                  </View>
                </View>
                <View style={styles.moreButton}>
                  <MoreHorizontal size={20} color={Palette.inkMuted} />
                </View>
              </Card>
            );
          })}
        </View>

        <Pressable onPress={() => router.push('/add-place')} style={({ pressed }) => [styles.secondaryAdd, pressed && styles.pressed]}>
          <View style={styles.plusCircle}><Plus size={21} color={Palette.primary} /></View>
          <View style={styles.addCopy}>
            <Text style={styles.addTitle}>Crear un lugar preciso</Text>
            <Text style={styles.addText}>Selecciona el punto, la entrada y las reglas de confirmación.</Text>
          </View>
        </Pressable>
      </Screen>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Añadir lugar"
        onPress={() => router.push('/add-place')}
        style={({ pressed }) => [styles.fabWrap, pressed && styles.fabPressed]}
      >
        <LinearGradient
          colors={[Palette.secondary, Palette.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fab}
        >
          <Plus size={21} color={Palette.white} strokeWidth={2.8} />
          <Text style={styles.fabText}>Añadir lugar</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Palette.canvas },
  heroCard: { flexDirection: 'row', alignItems: 'center', gap: 14, borderRadius: Radius.xl, padding: 18, borderWidth: 1, borderColor: `${Palette.primary}16` },
  heroIcon: { width: 58, height: 58, borderRadius: 20, backgroundColor: Palette.white, alignItems: 'center', justifyContent: 'center', ...Shadow.soft },
  heartPin: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  heartInsidePin: { position: 'absolute', top: 8 },
  heroCopy: { flex: 1 },
  heroEyebrow: { fontSize: 9, letterSpacing: 1.3, fontWeight: '900', color: Palette.primary },
  heroTitle: { fontSize: 17, lineHeight: 22, fontWeight: '900', color: Palette.ink, marginTop: 4 },
  heroText: { fontSize: 12, lineHeight: 18, color: Palette.inkMuted, marginTop: 5 },
  insightRow: { flexDirection: 'row', gap: 10 },
  insightCard: { flex: 1, minHeight: 112, borderRadius: Radius.lg, backgroundColor: Palette.surface, borderWidth: 1, borderColor: Palette.border, padding: 14 },
  insightValue: { fontSize: 13, lineHeight: 17, fontWeight: '900', color: Palette.ink, marginTop: 10 },
  insightLabel: { fontSize: 10, lineHeight: 15, color: Palette.inkMuted, marginTop: 3 },
  list: { gap: 11 },
  placeCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  placeIcon: { width: 50, height: 50, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  placeCopy: { flex: 1 },
  placeTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  placeName: { fontSize: 15, lineHeight: 19, fontWeight: '900', color: Palette.ink },
  activeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Palette.success },
  address: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 3 },
  ruleRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  confirmation: { flex: 1, fontSize: 10, lineHeight: 14, color: Palette.primary, fontWeight: '700' },
  moreButton: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#F5F2F7', alignItems: 'center', justifyContent: 'center' },
  secondaryAdd: { minHeight: 82, borderRadius: Radius.lg, borderWidth: 1.5, borderStyle: 'dashed', borderColor: `${Palette.primary}45`, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, marginBottom: 24 },
  plusCircle: { width: 46, height: 46, borderRadius: 15, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  addCopy: { flex: 1 },
  addTitle: { fontSize: 14, fontWeight: '900', color: Palette.primary },
  addText: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 3 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
  fabWrap: { position: 'absolute', right: 18, bottom: 94, borderRadius: Radius.pill, ...Shadow.floating },
  fab: { minHeight: 54, borderRadius: Radius.pill, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  fabText: { fontSize: 13, fontWeight: '900', color: Palette.white },
  fabPressed: { opacity: 0.9, transform: [{ scale: 0.97 }] },
});
