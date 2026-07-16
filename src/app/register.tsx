import { router } from 'expo-router';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/components/lovetrack/brand-mark';
import { Field, PrimaryButton, Screen } from '@/components/lovetrack/ui';
import { Palette, Radius, Spacing } from '@/constants/theme';

export default function RegisterScreen() {
  return (
    <Screen style={styles.screen}>
      <View style={styles.topbar}>
        <Pressable onPress={() => router.back()} style={styles.back}><ArrowLeft size={22} color={Palette.ink} /></Pressable>
        <Text style={styles.step}>Paso 1 de 2</Text>
      </View>
      <BrandMark compact />
      <View style={styles.copy}>
        <Text style={styles.title}>Crea tu cuenta</Text>
        <Text style={styles.subtitle}>Cada persona tendrá su propia cuenta y podrá detener el acceso cuando quiera.</Text>
      </View>
      <View style={styles.form}>
        <Field label="Nombre" placeholder="¿Cómo quieres aparecer?" />
        <Field label="Correo electrónico" placeholder="tu@correo.com" keyboardType="email-address" autoCapitalize="none" />
        <Field label="Contraseña" placeholder="Mínimo 8 caracteres" secureTextEntry helper="Incluye una mayúscula, un número y un símbolo." />
      </View>
      <View style={styles.consentCard}>
        <ShieldCheck size={22} color={Palette.success} />
        <View style={styles.consentCopy}>
          <Text style={styles.consentTitle}>Consentimiento independiente</Text>
          <Text style={styles.consentText}>Tu pareja no podrá activar tu ubicación ni reanudarla remotamente.</Text>
        </View>
        <CheckCircle2 size={20} color={Palette.success} />
      </View>
      <PrimaryButton label="Continuar" icon={ArrowRight} onPress={() => router.push('/link-partner')} />
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
  form: { gap: Spacing.four, backgroundColor: Palette.white, borderRadius: Radius.lg, borderWidth: 1, borderColor: Palette.border, padding: Spacing.four },
  consentCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Palette.successSoft, borderRadius: Radius.md, padding: 15 },
  consentCopy: { flex: 1 },
  consentTitle: { fontSize: 13, fontWeight: '900', color: Palette.ink },
  consentText: { fontSize: 12, lineHeight: 17, color: Palette.inkMuted, marginTop: 2 },
});
