import { Bell, BellRing, Info, MapPinCheck, SlidersHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import { Card, PageHeader, Screen, SectionTitle, SettingsRow, StatusPill } from '@/components/lovetrack/ui';
import { notifications } from '@/data/mock';
import { Palette, Radius } from '@/constants/theme';

export default function AlertsScreen() {
  const [items, setItems] = useState(notifications);
  const [allEnabled, setAllEnabled] = useState(true);

  return (
    <Screen>
      <PageHeader title="Alertas" subtitle="Recibe avisos solo cuando una llegada o salida esté suficientemente confirmada." />

      <Card style={styles.masterCard}>
        <View style={styles.masterIcon}><BellRing size={23} color={Palette.primary} /></View>
        <View style={styles.masterCopy}><Text style={styles.masterTitle}>Notificaciones de lugares</Text><Text style={styles.masterText}>Llegadas, salidas y pérdida de conexión.</Text></View>
        <Switch value={allEnabled} onValueChange={setAllEnabled} trackColor={{ false: '#D5CFDA', true: '#B9A2F7' }} thumbColor={allEnabled ? Palette.primary : '#F7F7F7'} />
      </Card>

      <View style={styles.infoCard}>
        <Info size={20} color={Palette.warning} />
        <Text style={styles.infoText}>No se enviará “Llegó” por una sola lectura imprecisa. LoveTrack espera confirmación antes de notificar.</Text>
      </View>

      <SectionTitle title="Reglas por lugar" action={<StatusPill label="Alta precisión" tone="primary" dot={false} />} />
      <View style={styles.alertList}>
        {items.map((item) => (
          <Card key={item.id} style={styles.alertCard}>
            <View style={styles.alertTop}>
              <View style={styles.alertIcon}><MapPinCheck size={21} color={Palette.primary} /></View>
              <View style={styles.alertCopy}>
                <Text style={styles.alertTitle}>{item.title}</Text>
                <Text style={styles.alertPlace}>{item.place}</Text>
              </View>
              <Switch
                value={item.enabled && allEnabled}
                disabled={!allEnabled}
                onValueChange={(value) => setItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, enabled: value } : entry))}
                trackColor={{ false: '#D5CFDA', true: '#B9A2F7' }}
                thumbColor={item.enabled && allEnabled ? Palette.primary : '#F7F7F7'}
              />
            </View>
            <Text style={styles.alertSubtitle}>{item.subtitle}</Text>
          </Card>
        ))}
      </View>

      <Card>
        <SettingsRow icon={SlidersHorizontal} title="Criterios de confirmación" subtitle="Distancia al pin, precisión mínima y número de lecturas." onPress={() => {}} />
        <View style={styles.separator} />
        <SettingsRow icon={Bell} title="Silenciar temporalmente" subtitle="Pausa todas las alertas sin detener la ubicación." onPress={() => {}} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  masterCard: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  masterIcon: { width: 46, height: 46, borderRadius: 15, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  masterCopy: { flex: 1 },
  masterTitle: { fontSize: 15, fontWeight: '900', color: Palette.ink },
  masterText: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 3 },
  infoCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, borderRadius: Radius.md, backgroundColor: Palette.warningSoft, padding: 13 },
  infoText: { flex: 1, fontSize: 12, lineHeight: 18, color: Palette.inkMuted },
  alertList: { gap: 10 },
  alertCard: { gap: 10, padding: 14 },
  alertTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  alertIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  alertCopy: { flex: 1 },
  alertTitle: { fontSize: 14, lineHeight: 18, fontWeight: '900', color: Palette.ink },
  alertPlace: { fontSize: 11, color: Palette.primary, fontWeight: '700', marginTop: 2 },
  alertSubtitle: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, paddingLeft: 52 },
  separator: { height: 1, backgroundColor: Palette.border },
});
