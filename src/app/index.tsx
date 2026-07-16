import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowRight, LockKeyhole, MapPinCheck, Users } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark } from '@/components/lovetrack/brand-mark';
import { PrimaryButton } from '@/components/lovetrack/ui';
import { Palette, Radius, Shadow, Spacing } from '@/constants/theme';

export default function WelcomeScreen() {
  return (
    <LinearGradient colors={['#FFF8FB', '#F5F0FF', '#EEF7F4']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.top}>
            <BrandMark />
            <View style={styles.heroCopy}>
              <Text style={styles.eyebrow}>UBICACIÓN COMPARTIDA CON CONSENTIMIENTO</Text>
              <Text style={styles.title}>Cerca, incluso cuando están lejos.</Text>
              <Text style={styles.subtitle}>
                Ubicación clara, horas exactas y lugares identificables para ustedes dos.
              </Text>
            </View>
          </View>

          <View style={styles.previewCard}>
            <View style={styles.previewMap}>
              <View style={styles.roadOne} />
              <View style={styles.roadTwo} />
              <View style={[styles.pin, styles.pinHome]}><MapPinCheck size={20} color={Palette.primary} /></View>
              <View style={[styles.pin, styles.pinPartner]}><Text style={styles.initials}>AM</Text></View>
            </View>
            <View style={styles.previewInfo}>
              <View>
                <Text style={styles.previewTitle}>A 92 m de Casa</Text>
                <Text style={styles.previewDetail}>En camino · precisión ±12 m</Text>
              </View>
              <View style={styles.livePill}><View style={styles.liveDot} /><Text style={styles.liveText}>En vivo</Text></View>
            </View>
          </View>

          <View style={styles.values}>
            <Value icon={Users} title="Solo ustedes" detail="Vinculación privada mediante invitación." />
            <Value icon={MapPinCheck} title="Sin falsas llegadas" detail="Distingue estar cerca, en camino o dentro del lugar." />
            <Value icon={LockKeyhole} title="Control total" detail="Pausa, revoca o elimina el historial cuando quieras." />
          </View>

          <View style={styles.actions}>
            <PrimaryButton label="Crear cuenta" icon={ArrowRight} onPress={() => router.push('/register')} />
            <PrimaryButton label="Ya tengo una cuenta" tone="ghost" onPress={() => router.push('/login')} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Value({ icon: Icon, title, detail }: { icon: typeof Users; title: string; detail: string }) {
  return (
    <View style={styles.valueRow}>
      <View style={styles.valueIcon}><Icon size={21} color={Palette.primary} strokeWidth={2.3} /></View>
      <View style={styles.valueCopy}><Text style={styles.valueTitle}>{title}</Text><Text style={styles.valueDetail}>{detail}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: Spacing.five, paddingTop: Spacing.five, paddingBottom: Spacing.four, justifyContent: 'space-between', gap: 20 },
  top: { gap: 28 },
  heroCopy: { gap: 10 },
  eyebrow: { fontSize: 11, lineHeight: 16, fontWeight: '900', letterSpacing: 1.2, color: Palette.primary },
  title: { fontSize: 41, lineHeight: 45, fontWeight: '900', letterSpacing: -1.6, color: Palette.ink, maxWidth: 420 },
  subtitle: { fontSize: 16, lineHeight: 24, color: Palette.inkMuted, maxWidth: 470 },
  previewCard: { backgroundColor: Palette.white, borderRadius: Radius.xl, overflow: 'hidden', borderWidth: 1, borderColor: Palette.border, ...Shadow.floating },
  previewMap: { height: 150, backgroundColor: '#E9F1ED', overflow: 'hidden' },
  roadOne: { position: 'absolute', width: '130%', height: 34, left: -20, top: 56, backgroundColor: Palette.white, transform: [{ rotate: '-8deg' }] },
  roadTwo: { position: 'absolute', width: 34, height: '140%', left: '64%', top: -20, backgroundColor: Palette.white, transform: [{ rotate: '9deg' }] },
  pin: { position: 'absolute', width: 42, height: 42, borderRadius: 15, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: Palette.white, ...Shadow.soft },
  pinHome: { left: '31%', top: 42, backgroundColor: Palette.lavender },
  pinPartner: { right: '21%', top: 68, backgroundColor: Palette.secondary, borderRadius: 21 },
  initials: { color: Palette.white, fontWeight: '900', fontSize: 12 },
  previewInfo: { minHeight: 74, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  previewTitle: { fontSize: 16, lineHeight: 21, fontWeight: '900', color: Palette.ink },
  previewDetail: { fontSize: 12, lineHeight: 17, color: Palette.inkMuted, marginTop: 3 },
  livePill: { backgroundColor: Palette.successSoft, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Palette.success },
  liveText: { color: Palette.success, fontSize: 12, fontWeight: '900' },
  values: { gap: 14 },
  valueRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  valueIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(124,58,237,0.10)', alignItems: 'center', justifyContent: 'center' },
  valueCopy: { flex: 1 },
  valueTitle: { fontSize: 14, lineHeight: 18, fontWeight: '900', color: Palette.ink },
  valueDetail: { fontSize: 12, lineHeight: 17, color: Palette.inkMuted, marginTop: 2 },
  actions: { gap: 10 },
});
