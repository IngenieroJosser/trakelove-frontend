import { router } from 'expo-router';
import { ArrowLeft, Check, Copy, Link2, QrCode, Send } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton, Screen, StatusPill } from '@/components/lovetrack/ui';
import { Palette, Radius, Shadow, Spacing } from '@/constants/theme';

export default function LinkPartnerScreen() {
  const [mode, setMode] = useState<'invite' | 'code'>('invite');
  const [copied, setCopied] = useState(false);

  return (
    <Screen style={styles.screen}>
      <View style={styles.topbar}>
        <Pressable onPress={() => router.back()} style={styles.back}><ArrowLeft size={22} color={Palette.ink} /></Pressable>
        <Text style={styles.step}>Paso 2 de 2</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>Vincula a tu pareja</Text>
        <Text style={styles.subtitle}>La vinculación solo se completa cuando la otra persona acepta desde su propia cuenta.</Text>
      </View>

      <View style={styles.segment}>
        <Pressable onPress={() => setMode('invite')} style={[styles.segmentButton, mode === 'invite' && styles.segmentActive]}>
          <Send size={17} color={mode === 'invite' ? Palette.primary : Palette.inkMuted} />
          <Text style={[styles.segmentText, mode === 'invite' && styles.segmentTextActive]}>Enviar invitación</Text>
        </Pressable>
        <Pressable onPress={() => setMode('code')} style={[styles.segmentButton, mode === 'code' && styles.segmentActive]}>
          <QrCode size={17} color={mode === 'code' ? Palette.primary : Palette.inkMuted} />
          <Text style={[styles.segmentText, mode === 'code' && styles.segmentTextActive]}>Ingresar código</Text>
        </Pressable>
      </View>

      {mode === 'invite' ? (
        <View style={styles.inviteCard}>
          <StatusPill label="Válido por 15 minutos" tone="primary" />
          <View style={styles.codeWrap}>
            <Text style={styles.code}>LT-8P4-K2M</Text>
            <Pressable onPress={() => setCopied(true)} style={styles.copyButton}>
              {copied ? <Check size={20} color={Palette.success} /> : <Copy size={20} color={Palette.primary} />}
            </Pressable>
          </View>
          <View style={styles.qrPlaceholder}><QrCode size={96} color={Palette.ink} strokeWidth={1.5} /></View>
          <Text style={styles.inviteHelp}>Comparte el enlace o deja que tu pareja escanee este código.</Text>
          <PrimaryButton label="Compartir invitación" icon={Send} onPress={() => setCopied(true)} />
        </View>
      ) : (
        <View style={styles.inviteCard}>
          <Link2 size={44} color={Palette.primary} />
          <Text style={styles.codeTitle}>Código de invitación</Text>
          <View style={styles.codeInputs}>
            {['L', 'T', '8', 'P', '4', 'K'].map((item, index) => <View key={`${item}-${index}`} style={styles.codeCell}><Text style={styles.codeCellText}>{item}</Text></View>)}
          </View>
          <Text style={styles.inviteHelp}>Verifica el nombre y correo antes de aceptar la vinculación.</Text>
        </View>
      )}

      <PrimaryButton label="Continuar al mapa" icon={Check} onPress={() => router.replace('/(tabs)')} />
      <Pressable onPress={() => router.replace('/(tabs)')}><Text style={styles.skip}>Configurar después</Text></Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 12, gap: 20 },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { width: 44, height: 44, borderRadius: 15, backgroundColor: Palette.white, borderWidth: 1, borderColor: Palette.border, alignItems: 'center', justifyContent: 'center' },
  step: { fontSize: 12, fontWeight: '800', color: Palette.inkMuted },
  copy: { gap: 7 },
  title: { fontSize: 32, lineHeight: 38, fontWeight: '900', color: Palette.ink, letterSpacing: -0.8 },
  subtitle: { fontSize: 15, lineHeight: 23, color: Palette.inkMuted },
  segment: { flexDirection: 'row', backgroundColor: '#EEEAF1', borderRadius: Radius.md, padding: 4 },
  segmentButton: { flex: 1, minHeight: 46, borderRadius: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  segmentActive: { backgroundColor: Palette.white, ...Shadow.soft },
  segmentText: { fontSize: 12, fontWeight: '800', color: Palette.inkMuted },
  segmentTextActive: { color: Palette.primary },
  inviteCard: { alignItems: 'center', gap: 18, backgroundColor: Palette.white, borderRadius: Radius.xl, padding: Spacing.five, borderWidth: 1, borderColor: Palette.border, ...Shadow.soft },
  codeWrap: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  code: { fontSize: 28, letterSpacing: 2.4, fontWeight: '900', color: Palette.ink },
  copyButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: Palette.lavender, alignItems: 'center', justifyContent: 'center' },
  qrPlaceholder: { width: 160, height: 160, borderRadius: 22, borderWidth: 1, borderColor: Palette.border, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCFAFE' },
  inviteHelp: { fontSize: 13, lineHeight: 19, color: Palette.inkMuted, textAlign: 'center', maxWidth: 300 },
  codeTitle: { fontSize: 20, fontWeight: '900', color: Palette.ink },
  codeInputs: { flexDirection: 'row', gap: 6 },
  codeCell: { width: 42, height: 52, borderRadius: 13, borderWidth: 1.5, borderColor: Palette.primary, alignItems: 'center', justifyContent: 'center', backgroundColor: Palette.lavender },
  codeCellText: { fontSize: 20, fontWeight: '900', color: Palette.primaryDark },
  skip: { textAlign: 'center', color: Palette.inkMuted, fontSize: 14, fontWeight: '800' },
});
