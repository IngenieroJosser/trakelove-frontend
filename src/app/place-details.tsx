import { router } from 'expo-router';
import { ArrowLeft, BellRing, CheckCircle2, Clock3, Edit3, MapPin, Navigation, Route, Users } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, PrimaryButton, Screen, SectionTitle, StatusPill } from '@/components/lovetrack/ui';
import { places } from '@/data/mock';
import { Palette, Radius, Shadow } from '@/constants/theme';

const place = places[1];

export default function PlaceDetailsScreen() {
  return (
    <Screen style={styles.screen}>
      <View style={styles.topbar}>
        <Pressable onPress={() => router.back()} style={styles.back}><ArrowLeft size={22} color={Palette.ink} /></Pressable>
        <Text style={styles.title}>Detalle del lugar</Text>
        <Pressable style={styles.edit}><Edit3 size={20} color={Palette.primary} /></Pressable>
      </View>

      <View style={styles.mapPreview}>
        <View style={styles.roadOne} /><View style={styles.roadTwo} />
        <View style={styles.nearbyPin}><MapPin size={20} color={Palette.success} /><Text style={styles.nearbyLabel}>Casa de mi hermana</Text></View>
        <View style={styles.mainPin}><MapPin size={28} color={Palette.white} fill={Palette.secondary} /></View>
        <View style={styles.mapInfo}><Text style={styles.mapInfoTitle}>Pines separados por 41 m</Text><Text style={styles.mapInfoText}>LoveTrack evalúa cada coordenada de forma independiente.</Text></View>
      </View>

      <Card style={styles.placeCard}>
        <View style={[styles.placeIcon, { backgroundColor: `${place.color}18` }]}><MapPin size={25} color={place.color} fill={`${place.color}18`} /></View>
        <View style={styles.placeCopy}><Text style={styles.placeName}>{place.name}</Text><Text style={styles.address}>{place.address}</Text></View>
        <StatusPill label="Activo" tone="success" />
      </Card>

      <Card>
        <View style={styles.dataRow}><Text style={styles.dataLabel}>Coordenadas exactas</Text><Text style={styles.dataValue}>5.694760, -76.657420</Text></View>
        <View style={styles.separator} />
        <View style={styles.dataRow}><Text style={styles.dataLabel}>Confirmación de llegada</Text><Text style={styles.dataValue}>Dentro de {place.confirmationDistance} m</Text></View>
        <View style={styles.separator} />
        <View style={styles.dataRow}><Text style={styles.dataLabel}>Precisión requerida</Text><Text style={styles.dataValue}>±15 m o mejor</Text></View>
        <View style={styles.separator} />
        <View style={styles.dataRow}><Text style={styles.dataLabel}>Lecturas requeridas</Text><Text style={styles.dataValue}>2 consecutivas</Text></View>
      </Card>

      <SectionTitle title="Última visita" />
      <Card style={styles.visitCard}>
        <View style={styles.visitIcon}><CheckCircle2 size={22} color={Palette.success} /></View>
        <View style={styles.visitCopy}>
          <Text style={styles.visitTitle}>Llegada confirmada</Text>
          <Text style={styles.visitTime}>Hoy · 6:42 p. m.</Text>
          <Text style={styles.visitDetail}>A 11 m del pin · precisión ±7 m · 2 lecturas válidas</Text>
        </View>
        <Text style={styles.visitDuration}>36 min</Text>
      </Card>

      <View style={styles.quickGrid}>
        <Quick icon={BellRing} title="Alertas" value="Llegada y salida" />
        <Quick icon={Clock3} title="Visitas" value="4 esta semana" />
        <Quick icon={Route} title="Última ruta" value="2,4 km" />
        <Quick icon={Users} title="Compartido" value="Ambos" />
      </View>

      <PrimaryButton label="Editar punto exacto" icon={Navigation} onPress={() => router.push('/add-place')} />
    </Screen>
  );
}

function Quick({ icon: Icon, title, value }: { icon: typeof BellRing; title: string; value: string }) {
  return (
    <View style={styles.quickCard}><Icon size={20} color={Palette.primary} /><Text style={styles.quickTitle}>{title}</Text><Text style={styles.quickValue}>{value}</Text></View>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 12 },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  back: { width: 44, height: 44, borderRadius: 15, backgroundColor: Palette.white, borderWidth: 1, borderColor: Palette.border, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 17, lineHeight: 22, fontWeight: '900', color: Palette.ink },
  edit: { width: 44, height: 44, borderRadius: 15, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  mapPreview: { height: 210, borderRadius: Radius.xl, backgroundColor: '#EAF1ED', overflow: 'hidden', borderWidth: 1, borderColor: Palette.border, ...Shadow.soft },
  roadOne: { position: 'absolute', width: '130%', height: 42, top: 70, left: -20, backgroundColor: Palette.white, transform: [{ rotate: '-9deg' }] },
  roadTwo: { position: 'absolute', height: '140%', width: 42, left: '64%', top: -30, backgroundColor: Palette.white, transform: [{ rotate: '8deg' }] },
  nearbyPin: { position: 'absolute', left: '31%', top: 52, alignItems: 'center' },
  nearbyLabel: { marginTop: 3, backgroundColor: 'rgba(255,255,255,0.94)', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 3, fontSize: 9, fontWeight: '800', color: Palette.ink },
  mainPin: { position: 'absolute', left: '57%', top: 82, width: 54, height: 54, borderRadius: 20, backgroundColor: Palette.primary, borderWidth: 4, borderColor: Palette.white, alignItems: 'center', justifyContent: 'center', ...Shadow.floating },
  mapInfo: { position: 'absolute', left: 12, right: 12, bottom: 12, borderRadius: 14, backgroundColor: 'rgba(25,21,40,0.86)', padding: 11 },
  mapInfoTitle: { fontSize: 12, fontWeight: '900', color: Palette.white },
  mapInfoText: { fontSize: 10, lineHeight: 14, color: '#E9E4EF', marginTop: 2 },
  placeCard: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  placeIcon: { width: 50, height: 50, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  placeCopy: { flex: 1 },
  placeName: { fontSize: 17, fontWeight: '900', color: Palette.ink },
  address: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 3 },
  dataRow: { minHeight: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14 },
  dataLabel: { flex: 1, fontSize: 12, color: Palette.inkMuted },
  dataValue: { fontSize: 12, fontWeight: '900', color: Palette.ink, textAlign: 'right' },
  separator: { height: 1, backgroundColor: Palette.border },
  visitCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 11 },
  visitIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: Palette.successSoft, alignItems: 'center', justifyContent: 'center' },
  visitCopy: { flex: 1 },
  visitTitle: { fontSize: 14, fontWeight: '900', color: Palette.ink },
  visitTime: { fontSize: 11, fontWeight: '700', color: Palette.primary, marginTop: 3 },
  visitDetail: { fontSize: 10, lineHeight: 15, color: Palette.inkMuted, marginTop: 4 },
  visitDuration: { fontSize: 11, fontWeight: '900', color: Palette.success },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  quickCard: { width: '48%', flexGrow: 1, minHeight: 92, borderRadius: Radius.md, backgroundColor: Palette.white, borderWidth: 1, borderColor: Palette.border, padding: 13, gap: 5 },
  quickTitle: { fontSize: 11, color: Palette.inkMuted },
  quickValue: { fontSize: 13, lineHeight: 17, fontWeight: '900', color: Palette.ink },
});
