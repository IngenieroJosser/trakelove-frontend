import { router } from 'expo-router';
import { Check, LocateFixed, MapPin, Minus, Plus, Search, X } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LiveMap } from '../components/lovetrack/live-map';
import { Field, PrimaryButton } from '@/components/lovetrack/ui';
import { me, partner, places } from '@/data/mock';
import { Palette, Radius, Shadow, Spacing } from '@/constants/theme';

export default function AddPlaceScreen() {
  const [distance, setDistance] = useState(20);

  return (
    <View style={styles.container}>
      <View style={styles.mapWrap}>
        <LiveMap me={me} partner={partner} places={places} />
        <SafeAreaView style={styles.mapOverlay} edges={['top', 'left', 'right']} pointerEvents="box-none">
          <View style={styles.topbar}>
            <Pressable onPress={() => router.back()} style={styles.back}><X size={22} color={Palette.ink} /></Pressable>
            <View style={styles.topTitleWrap}><Text style={styles.topTitle}>Nuevo lugar</Text><Text style={styles.topSubtitle}>Mueve el mapa hasta el punto exacto</Text></View>
            <Pressable style={styles.locate}><LocateFixed size={21} color={Palette.primary} /></Pressable>
          </View>
          <View style={styles.searchBar}><Search size={19} color={Palette.inkMuted} /><Text style={styles.searchText}>Buscar dirección o sitio</Text></View>
        </SafeAreaView>
        <View style={styles.centerPinWrap} pointerEvents="none">
          <View style={styles.centerPinShadow} />
          <View style={styles.centerPin}><MapPin size={28} color={Palette.white} fill={Palette.secondary} strokeWidth={2.8} /></View>
          <View style={styles.pinStem} />
        </View>
      </View>

      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.coordinatesRow}>
          <View><Text style={styles.coordinatesLabel}>PUNTO SELECCIONADO</Text><Text style={styles.coordinates}>5.694760, -76.657420</Text></View>
          <View style={styles.accuracyBadge}><Check size={14} color={Palette.success} /><Text style={styles.accuracyText}>±6 m</Text></View>
        </View>

        <Field label="Nombre del lugar" placeholder="Ej. Iglesia, Casa de mi hermana" defaultValue="Iglesia" />
        <Field label="Dirección" placeholder="Dirección o referencia" defaultValue="Carrera 4, Quibdó" />

        <View style={styles.distanceBlock}>
          <View style={styles.distanceHeader}>
            <View><Text style={styles.distanceTitle}>Distancia para confirmar llegada</Text><Text style={styles.distanceHelp}>No se mostrará un círculo en el mapa. Se usa internamente para validar el pin.</Text></View>
          </View>
          <View style={styles.stepper}>
            <Pressable onPress={() => setDistance((value) => Math.max(10, value - 5))} style={styles.stepperButton}><Minus size={19} color={Palette.primary} /></Pressable>
            <View style={styles.distanceValue}><Text style={styles.distanceNumber}>{distance}</Text><Text style={styles.distanceUnit}>metros del pin</Text></View>
            <Pressable onPress={() => setDistance((value) => Math.min(80, value + 5))} style={styles.stepperButton}><Plus size={19} color={Palette.primary} /></Pressable>
          </View>
          <Text style={styles.distanceRecommendation}>Recomendado: 15–25 m para separar sitios cercanos.</Text>
        </View>

        <PrimaryButton label="Guardar lugar exacto" icon={Check} onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.white },
  mapWrap: { flex: 0.47, minHeight: 300, overflow: 'hidden' },
  mapOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, paddingHorizontal: Spacing.four, pointerEvents: 'box-none' },
  topbar: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 8 },
  back: { width: 46, height: 46, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.96)', alignItems: 'center', justifyContent: 'center', ...Shadow.floating },
  topTitleWrap: { flex: 1, minHeight: 50, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.96)', justifyContent: 'center', paddingHorizontal: 14, ...Shadow.floating },
  topTitle: { fontSize: 15, lineHeight: 19, fontWeight: '900', color: Palette.ink },
  topSubtitle: { fontSize: 10, lineHeight: 14, color: Palette.inkMuted, marginTop: 2 },
  locate: { width: 46, height: 46, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.96)', alignItems: 'center', justifyContent: 'center', ...Shadow.floating },
  searchBar: { position: 'absolute', top: 74, left: 16, right: 16, minHeight: 48, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.96)', flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 14, ...Shadow.soft },
  searchText: { fontSize: 13, color: Palette.inkMuted },
  centerPinWrap: { position: 'absolute', left: '50%', top: '50%', marginLeft: -25, marginTop: -48, width: 50, height: 70, alignItems: 'center' },
  centerPinShadow: { position: 'absolute', bottom: 1, width: 26, height: 8, borderRadius: 13, backgroundColor: 'rgba(25,21,40,0.18)' },
  centerPin: { width: 50, height: 50, borderRadius: 18, backgroundColor: Palette.primary, borderWidth: 4, borderColor: Palette.white, alignItems: 'center', justifyContent: 'center', ...Shadow.floating },
  pinStem: { width: 4, height: 15, backgroundColor: Palette.primary, borderBottomLeftRadius: 4, borderBottomRightRadius: 4 },
  sheet: { flex: 0.53, marginTop: -24, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: Palette.white, paddingHorizontal: Spacing.four, paddingTop: 10, paddingBottom: 18, gap: 12, ...Shadow.floating },
  handle: { width: 44, height: 5, borderRadius: 3, backgroundColor: '#D9D3DE', alignSelf: 'center', marginBottom: 2 },
  coordinatesRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  coordinatesLabel: { fontSize: 9, letterSpacing: 1.1, fontWeight: '900', color: Palette.inkMuted },
  coordinates: { fontSize: 13, lineHeight: 18, fontWeight: '800', color: Palette.ink, marginTop: 3 },
  accuracyBadge: { borderRadius: Radius.pill, backgroundColor: Palette.successSoft, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 9, paddingVertical: 6 },
  accuracyText: { fontSize: 11, fontWeight: '900', color: Palette.success },
  distanceBlock: { borderRadius: Radius.md, backgroundColor: '#FAF8FC', borderWidth: 1, borderColor: Palette.border, padding: 13, gap: 11 },
  distanceHeader: { flexDirection: 'row' },
  distanceTitle: { fontSize: 13, lineHeight: 17, fontWeight: '900', color: Palette.ink },
  distanceHelp: { fontSize: 10, lineHeight: 15, color: Palette.inkMuted, marginTop: 3 },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stepperButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  distanceValue: { alignItems: 'center' },
  distanceNumber: { fontSize: 24, lineHeight: 27, fontWeight: '900', color: Palette.primary },
  distanceUnit: { fontSize: 10, color: Palette.inkMuted, marginTop: 2 },
  distanceRecommendation: { textAlign: 'center', fontSize: 10, color: Palette.primary, fontWeight: '700' },
});
