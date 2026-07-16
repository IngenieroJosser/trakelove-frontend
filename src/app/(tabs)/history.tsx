import { CalendarDays, ChevronDown, Clock3, MapPin, Navigation, Route } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, PageHeader, Screen, SectionTitle, StatusPill } from '@/components/lovetrack/ui';
import { timeline } from '@/data/mock';
import { Palette, Radius } from '@/constants/theme';

export default function HistoryScreen() {
  return (
    <Screen>
      <PageHeader
        title="Historial"
        subtitle="Últimas 24 horas con horas, distancias y precisión de cada evento."
        action={<Pressable style={styles.calendarButton}><CalendarDays size={20} color={Palette.primary} /></Pressable>}
      />

      <View style={styles.personFilter}>
        <View style={styles.avatar}><Text style={styles.avatarText}>AM</Text></View>
        <View style={styles.filterCopy}><Text style={styles.filterTitle}>Mi amor</Text><Text style={styles.filterSubtitle}>Hoy · 12:00 a. m. — ahora</Text></View>
        <ChevronDown size={20} color={Palette.inkMuted} />
      </View>

      <Card style={styles.summaryCard}>
        <View style={styles.summaryItem}><Route size={20} color={Palette.primary} /><Text style={styles.summaryValue}>8,7 km</Text><Text style={styles.summaryLabel}>Recorrido</Text></View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}><MapPin size={20} color={Palette.secondary} /><Text style={styles.summaryValue}>4</Text><Text style={styles.summaryLabel}>Lugares</Text></View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}><Clock3 size={20} color={Palette.success} /><Text style={styles.summaryValue}>3 h 16 min</Text><Text style={styles.summaryLabel}>En lugares</Text></View>
      </Card>

      <View style={styles.precisionNotice}>
        <Navigation size={18} color={Palette.primary} />
        <Text style={styles.precisionText}>Las llegadas se confirman con distancia al pin, precisión GPS y lecturas consecutivas.</Text>
      </View>

      <SectionTitle title="Actividad de hoy" action={<StatusPill label="24 horas" tone="primary" dot={false} />} />

      <View style={styles.timeline}>
        {timeline.map((item, index) => {
          const tone = item.tone === 'arrival' ? Palette.success : item.tone === 'departure' ? Palette.secondary : Palette.primary;
          return (
            <View key={item.id} style={styles.timelineRow}>
              <View style={styles.timeColumn}><Text style={styles.time}>{item.time}</Text></View>
              <View style={styles.trackColumn}>
                <View style={[styles.timelineDot, { backgroundColor: tone }]} />
                {index < timeline.length - 1 ? <View style={styles.timelineLine} /> : null}
              </View>
              <View style={styles.eventCard}>
                <View style={styles.eventHeader}><Text style={styles.eventTitle}>{item.title}</Text>{item.duration ? <Text style={styles.duration}>{item.duration}</Text> : null}</View>
                <Text style={styles.eventDetail}>{item.detail}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  calendarButton: { width: 44, height: 44, borderRadius: 15, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  personFilter: { backgroundColor: Palette.white, borderWidth: 1, borderColor: Palette.border, borderRadius: Radius.lg, minHeight: 70, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 11 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: Palette.secondary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: Palette.white, fontWeight: '900', fontSize: 12 },
  filterCopy: { flex: 1 },
  filterTitle: { fontSize: 15, fontWeight: '900', color: Palette.ink },
  filterSubtitle: { fontSize: 11, color: Palette.inkMuted, marginTop: 3 },
  summaryCard: { flexDirection: 'row', alignItems: 'stretch', paddingVertical: 18 },
  summaryItem: { flex: 1, alignItems: 'center', gap: 4 },
  summaryValue: { fontSize: 17, lineHeight: 21, fontWeight: '900', color: Palette.ink },
  summaryLabel: { fontSize: 10, lineHeight: 14, color: Palette.inkMuted },
  divider: { width: 1, backgroundColor: Palette.border, marginVertical: 2 },
  precisionNotice: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: Radius.md, padding: 13, backgroundColor: Palette.lavender },
  precisionText: { flex: 1, fontSize: 12, lineHeight: 17, color: Palette.inkMuted },
  timeline: { gap: 0 },
  timelineRow: { flexDirection: 'row', minHeight: 90 },
  timeColumn: { width: 72, paddingTop: 4 },
  time: { fontSize: 11, lineHeight: 15, fontWeight: '800', color: Palette.inkMuted },
  trackColumn: { width: 24, alignItems: 'center' },
  timelineDot: { width: 12, height: 12, borderRadius: 6, borderWidth: 3, borderColor: Palette.white, marginTop: 4, zIndex: 2 },
  timelineLine: { position: 'absolute', top: 16, bottom: -4, width: 2, backgroundColor: Palette.border },
  eventCard: { flex: 1, backgroundColor: Palette.white, borderWidth: 1, borderColor: Palette.border, borderRadius: Radius.md, padding: 13, marginBottom: 12 },
  eventHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  eventTitle: { flex: 1, fontSize: 14, lineHeight: 18, fontWeight: '900', color: Palette.ink },
  duration: { fontSize: 11, lineHeight: 15, fontWeight: '800', color: Palette.primary },
  eventDetail: { fontSize: 11, lineHeight: 16, color: Palette.inkMuted, marginTop: 5 },
});
