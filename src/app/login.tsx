import { router } from 'expo-router';
import { ArrowLeft, LogIn } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/components/lovetrack/brand-mark';
import { Field, PrimaryButton, Screen } from '@/components/lovetrack/ui';
import { Palette, Radius, Spacing } from '@/constants/theme';

export default function LoginScreen() {
  return (
    <Screen style={styles.screen}>
      <Pressable onPress={() => router.back()} style={styles.back}><ArrowLeft size={22} color={Palette.ink} /></Pressable>
      <View style={styles.brand}><BrandMark compact /></View>
      <View style={styles.copy}>
        <Text style={styles.title}>Bienvenido de nuevo</Text>
        <Text style={styles.subtitle}>Ingresa para ver y compartir ubicación con tu pareja.</Text>
      </View>
      <View style={styles.form}>
        <Field label="Correo electrónico" placeholder="tu@correo.com" keyboardType="email-address" autoCapitalize="none" />
        <Field label="Contraseña" placeholder="••••••••" secureTextEntry />
        <Pressable><Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text></Pressable>
      </View>
      <PrimaryButton label="Iniciar sesión" icon={LogIn} onPress={() => router.replace('/(tabs)')} />
      <Text style={styles.footer}>¿No tienes cuenta? <Text style={styles.link} onPress={() => router.push('/register')}>Crear cuenta</Text></Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 12, gap: 22 },
  back: { width: 44, height: 44, borderRadius: 15, backgroundColor: Palette.white, borderWidth: 1, borderColor: Palette.border, alignItems: 'center', justifyContent: 'center' },
  brand: { marginTop: 8 },
  copy: { gap: 7 },
  title: { fontSize: 32, lineHeight: 38, fontWeight: '900', color: Palette.ink, letterSpacing: -0.8 },
  subtitle: { fontSize: 15, lineHeight: 23, color: Palette.inkMuted },
  form: { gap: Spacing.four, backgroundColor: Palette.white, borderRadius: Radius.lg, borderWidth: 1, borderColor: Palette.border, padding: Spacing.four },
  forgot: { alignSelf: 'flex-end', color: Palette.primary, fontSize: 13, fontWeight: '800' },
  footer: { textAlign: 'center', fontSize: 14, color: Palette.inkMuted },
  link: { color: Palette.primary, fontWeight: '900' },
});
