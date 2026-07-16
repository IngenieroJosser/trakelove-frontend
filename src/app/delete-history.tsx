import { router } from 'expo-router';
import { AlertTriangle, ArrowLeft, CheckCircle2, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton, Screen } from '@/components/lovetrack/ui';
import { Palette, Radius, Spacing } from '@/constants/theme';

export default function DeleteHistoryScreen() {
  const [confirmed, setConfirmed] = useState(false);
  const [deleted, setDeleted] = useState(false);

  if (deleted) {
    return (
      <Screen scroll={false} style={styles.successScreen}>
        <View style={styles.successIcon}><CheckCircle2 size={42} color={Palette.success} /></View>
        <Text style={styles.successTitle}>Historial eliminado</Text>
        <Text style={styles.successText}>Se borraron permanentemente ubicaciones, recorridos y eventos guardados.</Text>
        <PrimaryButton label="Volver a ajustes" onPress={() => router.replace('/(tabs)/settings')} />
      </Screen>
    );
  }

  return (
    <Screen style={styles.screen}>
      <Pressable onPress={() => router.back()} style={styles.back}><ArrowLeft size={22} color={Palette.ink} /></Pressable>
      <View style={styles.warningIcon}><AlertTriangle size={38} color={Palette.danger} /></View>
      <View style={styles.copy}>
        <Text style={styles.title}>Eliminar todo el historial</Text>
        <Text style={styles.subtitle}>Esta acción elimina definitivamente tus datos históricos. La ubicación actual seguirá funcionando.</Text>
      </View>

      <View style={styles.dataCard}>
        <Text style={styles.dataTitle}>Se eliminará:</Text>
        {['Ubicaciones de las últimas 24 horas', 'Recorridos y tiempos de permanencia', 'Eventos de llegada y salida', 'Registros históricos de precisión'].map((item) => (
          <View key={item} style={styles.dataRow}><View style={styles.bullet} /><Text style={styles.dataText}>{item}</Text></View>
        ))}
      </View>

      <Pressable onPress={() => setConfirmed((value) => !value)} style={styles.confirmRow}>
        <View style={[styles.checkbox, confirmed && styles.checkboxChecked]}>{confirmed ? <CheckCircle2 size={19} color={Palette.white} fill={Palette.danger} /> : null}</View>
        <Text style={styles.confirmText}>Entiendo que los datos no podrán recuperarse.</Text>
      </Pressable>

      <PrimaryButton label="Eliminar definitivamente" icon={Trash2} tone="danger" disabled={!confirmed} onPress={() => setDeleted(true)} />
      <PrimaryButton label="Cancelar" tone="ghost" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 12, gap: 20 },
  back: { width: 44, height: 44, borderRadius: 15, backgroundColor: Palette.white, borderWidth: 1, borderColor: Palette.border, alignItems: 'center', justifyContent: 'center' },
  warningIcon: { width: 78, height: 78, borderRadius: 26, backgroundColor: Palette.dangerSoft, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 8 },
  copy: { alignItems: 'center', gap: 8 },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '900', color: Palette.ink, textAlign: 'center', letterSpacing: -0.6 },
  subtitle: { maxWidth: 430, fontSize: 14, lineHeight: 21, color: Palette.inkMuted, textAlign: 'center' },
  dataCard: { borderRadius: Radius.lg, backgroundColor: Palette.white, borderWidth: 1, borderColor: Palette.border, padding: Spacing.four, gap: 12 },
  dataTitle: { fontSize: 14, fontWeight: '900', color: Palette.ink },
  dataRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  bullet: { width: 7, height: 7, borderRadius: 4, backgroundColor: Palette.danger },
  dataText: { flex: 1, fontSize: 12, lineHeight: 18, color: Palette.inkMuted },
  confirmRow: { flexDirection: 'row', alignItems: 'center', gap: 11, borderRadius: Radius.md, backgroundColor: '#FAF8FC', borderWidth: 1, borderColor: Palette.border, padding: 14 },
  checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 1.5, borderColor: '#B9B0C2', alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: Palette.danger, borderColor: Palette.danger },
  confirmText: { flex: 1, fontSize: 12, lineHeight: 18, color: Palette.ink },
  successScreen: { justifyContent: 'center', alignItems: 'center', gap: 16, paddingHorizontal: 28 },
  successIcon: { width: 88, height: 88, borderRadius: 30, backgroundColor: Palette.successSoft, alignItems: 'center', justifyContent: 'center' },
  successTitle: { fontSize: 29, lineHeight: 35, fontWeight: '900', color: Palette.ink, textAlign: 'center' },
  successText: { fontSize: 14, lineHeight: 21, color: Palette.inkMuted, textAlign: 'center', maxWidth: 420, marginBottom: 8 },
});
