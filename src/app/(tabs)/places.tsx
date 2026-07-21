import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  BriefcaseBusiness,
  Church,
  Heart,
  Home,
  MapPin,
  MoreHorizontal,
  Plus,
  School,
  ShieldCheck,
  Users,
} from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, PageHeader, SectionTitle, StatusPill } from '@/components/lovetrack/ui';
import { Palette, Radius, Shadow, Spacing } from '@/constants/theme';
import { places } from '@/data/mock';

const categoryIcon = {
  home: Home,
  work: BriefcaseBusiness,
  study: School,
  family: Users,
  other: Church,
};

export default function PlacesScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <PageHeader
          title="Lugares"
          subtitle="Guarda cada entrada como un punto independiente para evitar llegadas falsas entre sitios cercanos."
        />

        <View style={styles.heroCard}>
          <LinearGradient
            colors={[`${Palette.secondary}18`, `${Palette.primary}18`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.heroIcon}>
            <MapPin size={29} color={Palette.primary} strokeWidth={2.5} />
            <Heart size={10} color={Palette.secondary} fill={Palette.secondary} style={styles.heroHeart} />
          </View>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>Un punto exacto por lugar</Text>
            <Text style={styles.heroText}>
              La iglesia, tu casa y la casa de un familiar pueden estar cerca, pero cada una conserva su propia entrada, precisión y regla de confirmación.
            </Text>
          </View>
          <ShieldCheck size={22} color={Palette.success} />
        </View>

        <SectionTitle
          title="Lugares guardados"
          action={<StatusPill label={`${places.length} activos`} tone="success" />}
        />

        <View style={styles.list}>
          {places.map((place) => {
            const Icon = categoryIcon[place.category];
            return (
              <Card
                key={place.id}
                style={styles.placeCard}
                onPress={() => router.push('/place-details')}
              >
                <View style={[styles.placeIcon, { backgroundColor: `${place.color}17` }]}>
                  <Icon size={23} color={place.color} strokeWidth={2.3} />
                </View>
                <View style={styles.placeCopy}>
                  <View style={styles.placeTitleRow}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <StatusPill label="Exacto" tone="primary" dot={false} />
                  </View>
                  <Text style={styles.address}>{place.address}</Text>
                  <View style={styles.metaRow}>
                    <MapPin size={13} color={Palette.primary} />
                    <Text style={styles.confirmation}>
                      Confirmación a {place.confirmationDistance} m del acceso guardado
                    </Text>
                  </View>
                </View>
                <Pressable style={styles.moreButton} hitSlop={8}>
                  <MoreHorizontal size={20} color={Palette.inkMuted} />
                </Pressable>
              </Card>
            );
          })}
        </View>

        <Pressable onPress={() => router.push('/add-place')} style={styles.addPlaceCard}>
          <View style={styles.plusCircle}>
            <Plus size={22} color={Palette.primary} />
          </View>
          <View style={styles.addCopy}>
            <Text style={styles.addTitle}>Añadir otro lugar</Text>
            <Text style={styles.addText}>Selecciona su entrada exacta y configura cómo confirmar la llegada.</Text>
          </View>
        </Pressable>
      </ScrollView>

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
          <Plus size={22} color={Palette.white} strokeWidth={2.8} />
          <Text style={styles.fabText}>Añadir lugar</Text>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Palette.canvas },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: 150,
    gap: Spacing.four,
  },
  heroCard: {
    minHeight: 126,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E4D8F4',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 13,
  },
  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: Palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.soft,
  },
  heroHeart: { position: 'absolute', top: 20 },
  heroCopy: { flex: 1 },
  heroTitle: { fontSize: 15, lineHeight: 20, fontWeight: '900', color: Palette.ink },
  heroText: { fontSize: 12, lineHeight: 18, color: Palette.inkMuted, marginTop: 5 },
  list: { gap: 12 },
  placeCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  placeIcon: { width: 50, height: 50, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  placeCopy: { flex: 1 },
  placeTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  placeName: { fontSize: 15, lineHeight: 19, fontWeight: '900', color: Palette.ink },
  address: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 7 },
  confirmation: { flex: 1, fontSize: 10, lineHeight: 15, color: Palette.primary, fontWeight: '700' },
  moreButton: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#F5F2F7', alignItems: 'center', justifyContent: 'center' },
  addPlaceCard: {
    minHeight: 82,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#CFC4E5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
  },
  plusCircle: { width: 46, height: 46, borderRadius: 15, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  addCopy: { flex: 1 },
  addTitle: { fontSize: 14, fontWeight: '900', color: Palette.primary },
  addText: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 3 },
  fabWrap: {
    position: 'absolute',
    right: 18,
    bottom: 20,
    borderRadius: Radius.pill,
    ...Shadow.floating,
  },
  fab: {
    minHeight: 54,
    borderRadius: Radius.pill,
    paddingHorizontal: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  fabText: { color: Palette.white, fontSize: 14, fontWeight: '900' },
  fabPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
});
