import * as Location from 'expo-location';
import { router } from 'expo-router';
import {
  BatteryMedium,
  Crosshair,
  MapPin,
  Navigation,
  Pause,
  RefreshCw,
  Signal,
  Wifi,
} from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LiveMap } from '../../components/lovetrack/live-map';
import { Metric, StatusPill } from '@/components/lovetrack/ui';
import { me as defaultMe, partner, places, type Person } from '@/data/mock';
import { nearestPlace, placeStatus } from '@/lib/location';
import { Palette, Radius, Shadow, Spacing } from '@/constants/theme';

export default function MapScreen() {
  const [me, setMe] = useState<Person>(defaultMe);
  const [sharing, setSharing] = useState(true);
  const [locationMessage, setLocationMessage] = useState('Ubicación en vivo');

  useEffect(() => {
    let mounted = true;
    async function loadLocation() {
      try {
        const permission = await Location.requestForegroundPermissionsAsync();
        if (permission.status !== 'granted') {
          setLocationMessage('Permiso pendiente');
          return;
        }
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        if (!mounted) return;
        setMe((current) => ({
          ...current,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: Math.round(location.coords.accuracy ?? current.accuracy),
          speedKmh: Math.max(0, Math.round((location.coords.speed ?? 0) * 3.6)),
          updatedAt: 'Ahora',
        }));
        setLocationMessage('Ubicación en vivo');
      } catch {
        setLocationMessage('Usando última ubicación');
      }
    }
    loadLocation();
    return () => { mounted = false; };
  }, []);

  const nearest = useMemo(() => nearestPlace(partner, places), []);
  const partnerPlaceStatus = useMemo(() => placeStatus(partner, nearest.place), [nearest]);

  return (
    <View style={styles.container}>
      <LiveMap me={me} partner={partner} places={places} />

      <SafeAreaView style={styles.overlay} edges={['top', 'left', 'right']} pointerEvents="box-none">
        <View style={styles.topbar} pointerEvents="box-none">
          <View style={styles.brandPill}>
            <View style={styles.brandIcon}><MapPin size={18} color={Palette.white} fill={Palette.secondary} /></View>
            <View>
              <Text style={styles.brandName}><Text style={styles.brandLove}>Love</Text>Track</Text>
              <Text style={styles.liveLabel}>{locationMessage}</Text>
            </View>
          </View>
          <Pressable style={styles.centerButton} onPress={() => setLocationMessage('Ubicación actualizada')}>
            <Crosshair size={21} color={Palette.primary} strokeWidth={2.5} />
          </Pressable>
        </View>

        {!sharing ? (
          <View style={styles.pausedBanner}>
            <Pause size={18} color={Palette.danger} fill={Palette.danger} />
            <View style={styles.pausedCopy}>
              <Text style={styles.pausedTitle}>Tu ubicación está pausada</Text>
              <Text style={styles.pausedText}>Tu pareja solo verá tu última actualización.</Text>
            </View>
            <Pressable onPress={() => setSharing(true)}><Text style={styles.resumeText}>Reanudar</Text></Pressable>
          </View>
        ) : (
          <View style={styles.sharingBanner}>
            <View style={styles.sharingDot} />
            <Text style={styles.sharingText}>Estás compartiendo tu ubicación</Text>
            <Pressable onPress={() => setSharing(false)} style={styles.pauseSmall}><Pause size={14} color={Palette.danger} fill={Palette.danger} /></Pressable>
          </View>
        )}

        <View style={styles.bottomSheet}>
          <View style={styles.handle} />
          <View style={styles.personHeader}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{partner.initials}</Text><View style={styles.onlineDot} /></View>
            <View style={styles.personCopy}>
              <View style={styles.nameRow}>
                <Text style={styles.personName}>{partner.name}</Text>
                <StatusPill label={partner.connected ? 'En línea' : 'Sin conexión'} tone={partner.connected ? 'success' : 'danger'} />
              </View>
              <Text style={styles.updated}>Actualizada {partner.updatedAt} · precisión ±{partner.accuracy} m</Text>
            </View>
            <Pressable style={styles.refreshButton}><RefreshCw size={19} color={Palette.primary} /></Pressable>
          </View>

          <View style={[styles.locationStatus, partnerPlaceStatus.state === 'uncertain' && styles.locationStatusWarning]}>
            <View style={styles.locationIcon}><Navigation size={20} color={Palette.primary} fill={`${Palette.primary}22`} /></View>
            <View style={styles.locationCopy}>
              <Text style={styles.locationTitle}>{partnerPlaceStatus.label}</Text>
              <Text style={styles.locationDetail}>{partnerPlaceStatus.detail}</Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <Metric icon={BatteryMedium} value={`${partner.battery}%`} label="Batería" tone={partner.battery > 30 ? Palette.success : Palette.warning} />
            <Metric icon={Wifi} value="Conectada" label="Internet" tone={Palette.primary} />
            <Metric icon={Signal} value={`${partner.speedKmh} km/h`} label="Movimiento" tone={Palette.secondary} />
          </View>

          <View style={styles.sheetActions}>
            <Pressable style={styles.secondaryAction} onPress={() => router.push('/place-details')}>
              <MapPin size={19} color={Palette.primary} />
              <Text style={styles.secondaryActionText}>Ver detalle</Text>
            </Pressable>
            <Pressable style={styles.primaryAction} onPress={() => router.push('/(tabs)/history')}>
              <Navigation size={19} color={Palette.white} />
              <Text style={styles.primaryActionText}>Ver recorrido</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF1ED' },
  overlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, justifyContent: 'space-between', pointerEvents: 'box-none' },
  topbar: { paddingHorizontal: Spacing.four, paddingTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', pointerEvents: 'box-none' },
  brandPill: { minHeight: 54, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.96)', flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10, paddingRight: 14, ...Shadow.floating },
  brandIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: Palette.primary, alignItems: 'center', justifyContent: 'center' },
  brandName: { fontSize: 17, lineHeight: 20, fontWeight: '900', color: Palette.primaryDark, letterSpacing: -0.4 },
  brandLove: { color: Palette.secondary },
  liveLabel: { fontSize: 10, lineHeight: 13, color: Palette.inkMuted, marginTop: 1 },
  centerButton: { width: 50, height: 50, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.96)', alignItems: 'center', justifyContent: 'center', ...Shadow.floating },
  sharingBanner: { position: 'absolute', top: 82, alignSelf: 'center', borderRadius: Radius.pill, backgroundColor: 'rgba(255,255,255,0.96)', flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: 12, paddingRight: 8, paddingVertical: 8, ...Shadow.soft },
  sharingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Palette.success },
  sharingText: { fontSize: 11, fontWeight: '800', color: Palette.ink },
  pauseSmall: { width: 28, height: 28, borderRadius: 14, backgroundColor: Palette.dangerSoft, alignItems: 'center', justifyContent: 'center' },
  pausedBanner: { position: 'absolute', top: 82, left: 16, right: 16, minHeight: 64, borderRadius: Radius.md, backgroundColor: 'rgba(255,255,255,0.98)', flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, ...Shadow.floating },
  pausedCopy: { flex: 1 },
  pausedTitle: { fontSize: 13, fontWeight: '900', color: Palette.danger },
  pausedText: { fontSize: 11, lineHeight: 15, color: Palette.inkMuted, marginTop: 2 },
  resumeText: { fontSize: 12, fontWeight: '900', color: Palette.primary },
  bottomSheet: { backgroundColor: Palette.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: Spacing.four, paddingTop: 10, paddingBottom: 20, gap: 14, ...Shadow.floating },
  handle: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: '#D9D3DE', marginBottom: 2 },
  personHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: Palette.secondary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: Palette.white, fontSize: 14, fontWeight: '900' },
  onlineDot: { position: 'absolute', right: 0, bottom: 1, width: 13, height: 13, borderRadius: 7, borderWidth: 2, borderColor: Palette.white, backgroundColor: Palette.success },
  personCopy: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  personName: { fontSize: 19, lineHeight: 24, fontWeight: '900', color: Palette.ink, letterSpacing: -0.3 },
  updated: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 3 },
  refreshButton: { width: 40, height: 40, borderRadius: 13, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  locationStatus: { borderRadius: Radius.md, backgroundColor: Palette.lavender, minHeight: 67, flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 13 },
  locationStatusWarning: { backgroundColor: Palette.warningSoft },
  locationIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: Palette.white, alignItems: 'center', justifyContent: 'center' },
  locationCopy: { flex: 1 },
  locationTitle: { fontSize: 15, lineHeight: 19, fontWeight: '900', color: Palette.ink },
  locationDetail: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 2 },
  metricsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, borderTopWidth: 1, borderTopColor: Palette.border, paddingTop: 13 },
  sheetActions: { flexDirection: 'row', gap: 10 },
  secondaryAction: { flex: 1, minHeight: 49, borderRadius: 15, backgroundColor: Palette.lavender, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  secondaryActionText: { color: Palette.primary, fontSize: 13, fontWeight: '900' },
  primaryAction: { flex: 1, minHeight: 49, borderRadius: 15, backgroundColor: Palette.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  primaryActionText: { color: Palette.white, fontSize: 13, fontWeight: '900' },
});
